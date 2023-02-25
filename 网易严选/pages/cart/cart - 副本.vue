<template>
	<view class="cart">
		<view class="cartlist">

			<view class="goods">
				<view class="gouxuan" @click="xuanzhong">
					<image src="../../static/xuanzhong.png" mode="" class="xuanze" v-if="gouxuan"></image>
					<image src="../../static/weixuanzhong.png" mode="" class="xuanze" v-else></image>
				</view>
				<view class="goodsimg">
					<image src="../../static/logo.png" mode="" class="image"></image>
				</view>
				<view class="content">
					<view class="detail">
						<view class="text">测试</view>
						<view class="price">￥1222</view>
					</view>
					<view class="num">
						<view class="add">+</view>
						<view class="quantity">66</view>
						<view class="sub">—</view>
					</view>
				</view>
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
				//控制是否勾选
				gouxuan: false,
				//商品数据
				goodslist: []
			}
		},
		onLoad() {
			this.getcart()
		},
		methods: {
			async getcart() {
				let res = await request(base.getcart)
				console.log(res);
				this.goodslist = res.data.result
			},
			xuanzhong() {
				this.gouxuan = !this.gouxuan
			}
		}
	}
</script>

<style lang="less" scoped>
	.cart {
		.cartlist {

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
	}
</style>
