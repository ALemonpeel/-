<template>
	<view class="goodslist">
		<view class="goods">
			<view class="detail" v-for="item in goodlist" :key="item.id" @click="gogoodsdetail(item.id)">
				<image :src="item.pic" mode="" class="img"></image>
				<view class="price">￥{{item.price}}</view>
				<view class="text">{{item.name}}</view>
				<view class="index">{{item.description}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import base from '@/utils/base.js'
	import request from '@/utils/request.js'
	export default {
		data() {
			return {
				goodlist: []
			}
		},
		onLoad(val) {
			//console.log(val.url);
			//动态获取列表名称
			uni.setNavigationBarTitle({
				title: val.url
			})
			//根据id获取商品数据 注：后台数据有限只有一组数据
			this.getgoodslist()
		},
		methods: {
			async getgoodslist() {
				let res = await request(base.goodlist)
				console.log('商品列表数据------', res);
				if (res.status === 200) {
					this.goodlist = res.data.result
				}
			},

			gogoodsdetail(id) {
				uni.navigateTo({
					url: '/pages/goodsdetail/goodsdetail?url=' + id
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.goodslist {
		padding: 10rpx 20rpx;

		.goods {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			.detail {
				width: 334rpx;
				padding-bottom: 10rpx;

				.img {
					width: 334rpx;
					height: 334rpx;
				}

				.price {
					font-size: 40rpx;
					color: red;
					padding: 10rpx;
				}

				.text {
					padding-bottom: 10rpx;
					font-size: 28rpx;
					font-weight: bold;
				}

				.index {
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 1; // 控制多行的行数
					-webkit-box-orient: vertical;
				}
			}
		}
	}
</style>
