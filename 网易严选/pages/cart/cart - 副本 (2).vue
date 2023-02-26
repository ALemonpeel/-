<template>
	<!-- 设施列表 -->
	<view class="cart">
		<view class="cartlist">
			<scroll-view class="container" scroll-y="true">
				<uni-swipe-action>
					<view class="ke" v-for="(item,index) in goodslist" :key="item.id">
						<uni-swipe-action-item :right-options="options" @click="onDelete(item.id)" show="reight"
							:auto-close="false">
							<view class="goods">
								<view class="gouxuan">
									<image src="../../static/xuanzhong.png" mode="" class="xuanze" v-if='item.gouxuan'
										@click="xuanzhong(index)">
									</image>
									<image src="../../static/weixuanzhong.png" mode="" class="xuanze" v-else
										@click="xuanzhong(index)">
									</image>
								</view>
								<view class="goodsimg">
									<image :src="item.pic" mode="" class="image"></image>
								</view>
								<view class="content">
									<view class="detail">
										<view class="text">{{item.name}}</view>
										<view class="price">￥{{item.price}}</view>
									</view>
									<view class="num">
										<view class="add" @click="add(index)">+</view>
										<view class="quantity">{{item.num}}</view>
										<view class="sub" @click="sub(index)">—</view>
									</view>
								</view>
							</view>
						</uni-swipe-action-item>
					</view>
				</uni-swipe-action>

			</scroll-view>
		</view>
		<view class="goodsfoot">
			<view class="gouxuan">
				<image src="../../static/xuanzhong.png" mode="" class="xuanze" v-if="duoxuan"></image>
				<image src="../../static/weixuanzhong.png" mode="" class="xuanze" v-else></image>
				<view class="jianshu">已选{{goodslist.length}}件</view>
			</view>
			<view class="buy">
				合计：￥122
			</view>
			<view class="addShoppingCart">
				下单
			</view>
		</view>
		<view>
			<!-- 提示窗示例 -->
			<uni-popup ref="alertDialog" type="dialog">
				<uni-popup-dialog type="warn" cancelText="取消" confirmText="确定" title="提示" content="确定要删除该商品吗"
					@confirm="dialogConfirm"></uni-popup-dialog>
			</uni-popup>
		</view>
		<view>
			<!-- 提示信息弹窗 -->
			<uni-popup ref="message" type="message">
				<uni-popup-message type="success" :message="messageText" :duration="2000"></uni-popup-message>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import base from '@/utils/base.js'
	import request from '@/utils/request.js'

	export default {
		data() {
			return {
				//控制多选
				duoxuan: true,
				//商品数据
				goodslist: [],
				//总价格
				zongjia: 0,
				//滑动所需数据
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#EE2437' // 删除按钮背景  红的
					}
				}],
				//要删除的商品id
				id: 0,
				//提示消息
				messageText: ''
			};
		},
		methods: {
			//增加件数
			add(index) {
				this.goodslist[index].num += 1
				this.update(this.goodslist[index].id, this.goodslist[index].num)
			},
			//减少件数
			sub(index) {
				this.goodslist[index].num -= 1
				this.update(this.goodslist[index].id, this.goodslist[index].num)
			},
			//修改购物车内容的数量
			async update(id, num) {
				let res = await request(base.update, {
					id,
					num
				})
				console.log(res);
			},
			//删除滑块的相关方法
			onRoom(item) {
				this.$set(item, 'isOpened', 'none');
				console.log("消失", item)
			},
			setOpened(item) {
				if (item.isOpened == "right") {
					this.$set(item, 'isOpened', 'none');
					console.log("消失", item)
				} else {
					this.$set(item, 'isOpened', 'right');
					console.log("出来", item)
				}
			},
			//获取购物车数据
			async getcart() {
				let res = await request(base.getcart)
				console.log(res);
				this.goodslist = res.data.result
				this.goodslist.forEach(ele => {
					ele["gouxuan"] = true
				})
			},
			//选中标识
			xuanzhong(index) {
				this.goodslist[index].gouxuan = !this.goodslist[index].gouxuan
			},
			//删除购物车内容提示
			onDelete(id) {
				this.$refs.alertDialog.open()
				this.id = id
			},
			//调用接口删除购物车内容
			async dialogConfirm() {
				let id = this.id
				let res = await request(base.deletecart, {
					id
				})
				console.log(res);
				if (res.status === 200) {
					this.messageText = `成功删除该商品`
					this.$refs.message.open()
					this.getcart()
				}
			},
		},
		onLoad() {
			this.getcart()

		}
	}
</script>

<style lang="less" scoped>
	.cart {
		.cartlist {
			padding-bottom: 100rpx;

			.container {
				display: flex;
				height: 100%;
			}

			.goods {
				display: flex;
				flex-wrap: nowrap;
				height: 172rpx;
				width: 100%;
				padding: 20rpx 10rpx;
				border-bottom: 5px solid #efefef;

				//勾选
				.gouxuan {
					flex: .5;
					position: relative;

					.xuanze {
						height: 40rpx;
						width: 40rpx;
						position: absolute;
						top: 50%;
						left: 50%;
						margin-top: -20rpx;
						margin-left: -20rpx;

					}
				}

				//图片
				.goodsimg {
					flex: 2;

					.image {
						display: block;
						width: 172rpx;
						height: 172rpx;
					}
				}

				//商品详情
				.content {
					flex: 4;
					position: relative;

					.detail {
						.text {
							padding: 20rpx 0;
						}

						.price {
							font-size: 40rpx;
							color: #f00;
						}
					}

					.num {
						display: flex;
						width: 200rpx;
						height: 70rpx;
						border: 1rpx solid #efefef;
						position: absolute;
						bottom: 0;
						right: 20px;

						.add {
							width: 30%;
							height: 70rpx;
							border-right: 1rpx solid #efefef;
							text-align: center;
							line-height: 70rpx;
						}

						.quantity {
							width: 40%;
							height: 70rpx;

							text-align: center;
							line-height: 70rpx;
							font-weight: 500;
							font-size: 50rpx;
						}

						.sub {
							width: 30%;
							height: 70rpx;
							border-left: 1rpx solid #efefef;
							text-align: center;
							line-height: 70rpx;
						}
					}


				}
			}
		}

		.goodsfoot {
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 100rpx;
			text-align: center;
			background-color: white;
			display: flex;

			.gouxuan {
				flex: 2;
				position: relative;
				height: 100rpx;

				.xuanze {
					height: 40rpx;
					width: 40rpx;
					position: absolute;
					top: 50%;
					left: 10rpx;
					margin-top: -20rpx;
				}

				.jianshu {
					font-size: 30rpx;
					line-height: 100rpx;
				}
			}

			.buy {
				flex: 2;
				line-height: 100rpx;
				text-align: center;
				font-size: 35rpx;
			}

			.addShoppingCart {
				flex: 2;
				background-color: #bb2c08;
				line-height: 100rpx;
				text-align: center;
				color: white;
				font-size: 35rpx;
			}
		}
	}
</style>
