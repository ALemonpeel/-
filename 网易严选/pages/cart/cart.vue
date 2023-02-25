<template>
	<!-- 设施列表 -->
	<view class="cart">
		<view class="cartlist">
			<view class="ke" v-for="item in goodslist" :key="item.id">
				<uni-swipe-action>
					<uni-swipe-action-item :right-options="options" @click="onDelete(item.id)" show="reight"
						:auto-close="false">
						<view class="goods">
							<view class="gouxuan" @click="xuanzhong">
								<image src="../../static/xuanzhong.png" mode="" class="xuanze" v-if="gouxuan"></image>
								<image src="../../static/weixuanzhong.png" mode="" class="xuanze" v-else></image>
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
									<view class="add">+</view>
									<view class="quantity">{{item.num}}</view>
									<view class="sub">—</view>
								</view>
							</view>
						</view>
					</uni-swipe-action-item>
				</uni-swipe-action>
			</view>
		</view>
		<view class="goodsfoot">
			<view class="gouxuan" @click="xuanzhong">
				<image src="../../static/xuanzhong.png" mode="" class="xuanze" v-if="gouxuan"></image>
				<image src="../../static/weixuanzhong.png" mode="" class="xuanze" v-else></image>
				<view class="jianshu">已选{{goodslist.length}}件</view>
			</view>
			<view class="buy">
				合计：￥122
			</view>
			<view class="addShoppingCart" @click="messageToggle('success')">
				下单
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
				goodslist: [],
				//滑动所需数据
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#EE2437' // 删除按钮背景  红的
					}
				}],
			};
		},
		methods: {
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
			async getcart() {
				let res = await request(base.getcart)
				console.log(res);
				this.goodslist = res.data.result
			},
			xuanzhong() {
				this.gouxuan = !this.gouxuan
			},
			onDelete(id) {
				console.log('要删除的商品------', id);
			}

		},
		onLoad() {
			this.getcart()
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
