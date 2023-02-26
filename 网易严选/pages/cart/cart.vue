<template>
	<view class="cart">
		<view class="shop-list">

			<view class="item-box" v-for="(item,index) in list" :key='item.id' :class="{active:index==activeIndex}"
				@touchstart='touchStart' @touchend="touchEnd(index,$event)">
				<view class="item">
					<!-- 左侧icon选择 -->
					<view class="check-around-box">
						<icon v-if='!item.selected' @click="changeSelected(index)" type="success_circle"
							color="#51b897" />
						<icon v-else @click="changeSelected(index)" type="circle" />
					</view>
					<!-- 图片 -->
					<view class="item-img-box">
						<image class="item-img" :src="item.pic" />
					</view>
					<!-- 商品介绍 -->
					<view class="item-info-box">
						<view class="item-title">{{item.name}}</view>
						<view class="item-spec">{{item.info}}</view>

						<view class="item-price">¥{{item.price}}</view>

						<view class="num-box">
							<view class="num-desc" @click="reduce(index,item.id)">-</view>
							<input class="item-input" type="number" disabled="boolean" :value="item.num" />
							<view class="num-plus" @click="add(index,item.id)">+</view>

						</view>
					</view>
				</view>
				<view class="remove" @click="deleteGoods(index,item.id)">删除</view>

			</view>

		</view>


		<!-- ----购买 -->
		<view class='bottom'>
			<view class='all'>
				<!-- wx:if 是否全选显示不同图标 -->
				<icon v-if='selectedAll' @click="changeSelectedAll" type="success_circle" />
				<icon v-else @click="changeSelectedAll" type="circle" />
				<text class="check-all">全选</text>

			</view>

			<view class='sum'>
				<text class='he'>合计</text>
				<text>{{totalPrice}}元</text>
			</view>

			<view class='balance' v-if='selectedNum > 0'>结算</view>
			<view class='balance-gray balance' v-else>结算</view>

		</view>
	</view>
</template>

<script>
	import base from '@/utils/base.js'
	import request from '@/utils/request.js'
	import {
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				// selected: -1, //选中商品  item.selected
				selectedAll: true, //全选
				// list:[],//购物车的数据
				activeIndex: -1,
				startX: '', //开始的位置点
				num: 1,
				totalPrice: '', //总价格
				selectedNum: 0,
			}
		},
		computed: {
			...mapState('cart', ['list'])
		},
		onLoad() {
			this.cartList();

		},
		methods: {
			...mapMutations('cart', ['setList', 'deleteCart', 'changeCart', 'changeSelectedStatus', 'changeStatus']),
			//点击全选按钮---取反操作----------------
			changeSelectedAll() {
				//点击选中的状态--目的：取消全选  所有商品列表取消选中状态
				this.selectedAll = !this.selectedAll;
				//判断全选按钮状态--选中还是未选中 ---列表同步操作
				if (this.selectedAll) { //true 全选  所有list里面的selected = false
					this.changeStatus(false);
					this.selectedNum = this.list.length;
				} else {
					//取消全选 --- 所有list里面的selected = true
					this.changeStatus(true)
					this.selectedNum = 0;
				}
				//计算价格----------------
				this.getTotalPrice();
			},
			//点击商品前的选中按钮操作----------------------
			changeSelected(index) {
				// this.selected = this.selected==-1?index:-1;
				// this.list[index].selected = !this.list[index].selected;
				this.changeSelectedStatus(index);
				//价格重新计算
				this.getTotalPrice();
				//统计个数---思路：选中selectedNum+1  取消 selectedNum-1 
				//selectedNum==list.length 全选 /selectedNum!=t.length 取消全选
				if (!this.list[index].selected) { //false 选中
					this.selectedNum += 1
				} else {
					this.selectedNum -= 1
				}
				console.log('选中selectedNum', this.selectedNum);
				//最后
				if (this.selectedNum == this.list.length) { //全选
					this.selectedAll = true;
				} else {
					this.selectedAll = false;
				}

			},
			//获取购物车列表数据----
			//正常情况：访问购物车的数据需要登录 用token字段作为请求头校验
			async cartList() {
				let res = await request(base.getcart)
				let list = [];
				console.log('购物车列表数据----', res);
				if (res.status == 200) {
					list = res.data.result;
				} else {
					list = []
				}
				//存储vuex----------
				this.setList(list);
				//计算价格----------------
				this.getTotalPrice();
				//统计选中的个数-------------
				this.selectedNum = list.length;

			},
			//计算价格----当前的商品选中才去计算价格--------------
			getTotalPrice() {
				let sum = 0;
				this.list.forEach(ele => {
					if (!ele.selected) {
						sum += ele.num * ele.price
					}
				})
				this.totalPrice = sum.toFixed(2);
			},
			//删除购物车数据---------------------
			deleteGoods(index, id) {
				request(base.deletecart, {
						id
					})
					.then(res => {
						console.log('删除数据库---', res);
						//修改删除按钮状态
						this.activeIndex = -1;
						//方法1：删除当前的数据list=[]购物车列表--
						// this.list.splice(index,1);
						//方法3：删除的vuex里面的数据list 
						this.deleteCart({
							index,
							num: 1
						})
						//方法2：
						// if(res.status ==200){
						// 	//更新视图
						// 	this.cartList()
						// }

						//计算价格----------------
						this.getTotalPrice();
					})

			},
			//增加购物车苏数据-----------------------
			add(index, id) {
				//1.点击＋号 数量需要修改  2. 修改的数据量同步数据库
				// this.list[index].num +=1 ;//this.list是vuex数据 不能直接修改 必须mutations
				this.changeCart({
					index,
					n: 1
				});
				//获取仓库数据list[index].num
				//同步后端数据库
				request(base.update, {
					id,
					num: this.list[index].num
				}).then(res => {
					console.log('修改---', res);
				})
				//计算价格----------------
				this.getTotalPrice();

			},
			//减少购物车数据-----------------
			reduce(index, id) {
				// this.list[index].num +=1 ;//this.list是vuex数据 不能直接修改 必须mutations
				if (this.list[index].num <= 1) {
					uni.showToast({
						title: '商品至少1件',
						icon: 'none'
					})
					return;
				}
				this.changeCart({
					index,
					n: -1
				});
				//获取仓库数据list[index].num
				//同步后端数据库
				uni.$http(uni.$base.update, {
					loading: false,
					isShow: false
				}, 'get', {
					id,
					num: this.list[index].num
				}).then(res => {
					console.log('修改---', res);
				})
				//计算价格----------------
				this.getTotalPrice();

			},
			//点击出现删除按钮
			// showDelete(index){
			// 	this.activeIndex= index;
			// },
			//移动列表
			touchStart(e) {
				// console.log('move---',e.touches[0].pageX);
				this.startX = e.touches[0].pageX;
			},
			//触摸结束的时候判断方向--左侧滑动--右侧滑动----
			touchEnd(index, e) {
				// console.log('end----',e.changedTouches[0].pageX);
				let endX = e.changedTouches[0].pageX;
				//左侧移动  pageX不断变小 endX<startX   显示删除按钮
				if (endX < this.startX) {
					this.activeIndex = index;
				}
				//右侧移动  pageX不断变大 startX < endX  隐藏删除按钮
				if (this.startX < endX) {
					this.activeIndex = -1;
				}

			}
		}
	}
</script>

<style lang="scss" scoped>
	.cart {
		background-color: #f5f5f5;
		min-height: calc(100vh);
	}

	.shop-list {
		display: flex;
		flex-direction: column;
		padding-bottom: 160rpx;
	}

	.item-box {
		margin-top: 20rpx;
		position: relative;
		font-size: 28rpx;
		display: flex;
		justify-content: space-between;
		width: 100%;
		overflow: hidden;
		background: #fff;
	}

	.item {
		display: flex;
		align-items: center;
		padding: 20rpx;
		position: relative;
		width: 100%;
		margin-right: 0;
		transition: all 0.4s;
		-webkit-transition: all 0.4s;
		-webkit-transform: translateX(90px);
		transform: translateX(90px);
		margin-left: -90px;
	}

	.item-img-box {
		margin-left: 10rpx;
	}

	.item .item-img {
		width: 180rpx;
		height: 180rpx;
		border-radius: 5rpx;
		border: 1rpx solid #eee;
		padding-left: 10rpx;
	}

	.item .item-info-box {
		width: 420rpx;
		height: 200rpx;
		margin-left: 20rpx;
		position: relative;
	}

	.item-info-box .item-title {
		font-size: 30rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		word-break: break-all;
	}

	.item-info-box .item-spec {
		color: #888;
		margin-top: 15rpx;
		font-size: 12px;
		text-align: justify;
		line-height: 40rpx;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.item-info-box .item-price {
		margin-top: 15rpx;
		color: red;
	}

	.item-info-box .num-box {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		font-size: 30rpx;
		position: absolute;
		right: 0;
		bottom: 0rpx;

	}

	.num-box .num-desc {
		padding: 0 10rpx;
		color: #999;
		border: 4rpx solid #999;
	}

	.num-box .item-input {
		width: 80rpx;
	}

	.item-input {
		text-align: center;
	}

	.num-box .num-plus {
		padding: 0 10rpx;
		color: #fff;
		background-color: #000;
		border: 4rpx solid #000;
	}

	.remove {
		background-color: orangered;
		width: 180rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #fff;
		-webkit-transform: translateX(90px);
		transform: translateX(90px);
		-webkit-transition: all 0.4s;
		transition: all 0.4s;
	}

	.active .item,
	.active .remove {
		-webkit-transform: translateX(0);
		transform: translateX(0);
	}

	/* 结算 */

	.bottom {
		position: fixed;
		background: #fff;
		display: flex;
		bottom: 0;
		left: 0;
		right: 0;
	}

	.all {
		display: flex;
		align-items: center;
		padding-left: 20rpx;
	}

	.sum text {
		color: #51b897;
	}

	.sum {
		flex: 1;
		padding-top: 20rpx;
		text-align: right;
	}

	.sum .he {
		color: #000;
		margin-right: 10rpx;
	}

	.sum .small {
		font-size: 24rpx;
		color: #999;
		margin-left: 10rpx;
	}

	.balance {
		margin-left: 10rpx;
		padding: 20rpx;
		text-align: right;
		background: #51b897;
		color: #fff;
	}

	.balance-gray {
		background: #999;
	}
</style>
