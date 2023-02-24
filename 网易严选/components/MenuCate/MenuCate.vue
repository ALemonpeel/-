<template>
	<view class="show">
		<!-- 轮播图 -->
		<Banner></Banner>
		<!-- 商品列表 -->
		<view class="title">
			<h2>{{cateobj.category.frontDesc}}</h2>
			<h4>{{cateobj.category.frontName}}</h4>
		</view>
		<view class="goodslist">
			<view class="goods" v-for="item in cateobj.itemList" :key="item.id" @click="godetail(item)">
				<image :src="item.listPicUrl" mode="" class="image"></image>
				<view class="goodstitle"> {{item.name}}</view>
				<view class="goodsprice"> ￥{{item.retailPrice}}</view>
			</view>
		</view>
		<view class="fanhui" v-if="show" @click="gotop">
			返回
		</view>
	</view>
</template>

<script>
	import base from '@/utils/base.js'
	import request from '@/utils/request.js'
	import {
		mapMutations
	} from 'vuex'
	export default {
		name: "MenuCate",
		props: ['cateid'],
		data() {
			return {
				showlist: [], //展示数据
				imagelist: [], //发给轮播组件的数据
				show: false, //控制返回顶部按钮是否显示
			};
		},
		created() {
			this.IndexCateList()
			//接收页面滚动的信息
			uni.$on('onPageScroll', data => {
				// console.log(data);
				if (data >= 300) {
					this.show = true
				} else {
					this.show = false
				}
			});
		},
		computed: {
			//与接收id相匹配的数据
			cateobj() {
				let arr = this.showlist.find(ele => ele.category.parentId == this.cateid)
				this.imagelist = arr.category.bannerUrlList
				console.log('arr-------', arr);
				console.log('image--------', this.imagelist);
				return arr
			},
		},
		methods: {
			...mapMutations('menu', ['setimagelist']),
			//调用接口获取分类列表
			async IndexCateList() {
				let res = await request(base.IndexCateList)
				console.log(res);
				if (res.status === 200) {
					this.showlist = res.indexCateList
					console.log(this.showlist);
				}
			},
			//跳转详情界面并将数据一并传输
			godetail(item) {
				uni.navigateTo({
					url: '/pages/detail/detail?url=' + JSON.stringify(item)
				})
			},
			gotop() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 200
				});
			},
		},
		watch: {
			//监听图片数据变化 ，将新数据存入vuex中
			imagelist: {
				handler(newimg, oldimg) {
					this.setimagelist(newimg)
				}
			},
		}
	}
</script>

<style lang="less" scoped>
	.show {
		.title {
			text-align: center;

			h2 {
				font-size: 50rpx;
			}

			h4 {
				font-size: 40rpx;
			}
		}

		.goodslist {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			padding: 20rpx;

			.goods {
				width: 334rpx;
				padding-bottom: 10rpx;

				.image {
					width: 334rpx;
					height: 334rpx;
				}

				.goodstitle {
					padding: 10rpx;
				}

				.goodsprice {
					font-size: 35rpx;
					color: red;
				}
			}
		}

		//返回顶部
		.fanhui {
			position: fixed;
			right: 20rpx;
			bottom: 20rpx;
			background: rgba(0, 0, 0, .3);
			font-size: 8px;
			width: 60rpx;
			height: 60rpx;
			text-align: center;
			line-height: 60rpx;
			border-radius: 50%;
		}
	}
</style>
