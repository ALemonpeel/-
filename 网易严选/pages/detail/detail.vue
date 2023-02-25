<template>
	<view class="goodsitem">
		<view class="goodstitle">{{goodinfo.name}}</view>
		<view class="goods">
			<image :src="goodinfo.listPicUrl" class="img"></image>
			<view class="btn">
				{{goodinfo.promTag}}
			</view>
			<view class="price">
				￥{{goodinfo.retailPrice}}
			</view>
			<view class="descriptionlist">
				<view class="description">1) 100%桑蚕丝填充，丝丝精粹不掺杂</view>
				<view class="description">2) 创新井字拉网工艺，桑蚕丝不易黏连结块</view>
				<view class="description">3) 两种面料可选，贡缎手感细腻，竹棉清爽透气</view>
				<view class="description">4) AB双面设计，多种活性印花不易褪色</view>
			</view>
		</view>
		<view class="goodsfoot">
			<view class="icon">
				<image src="../../static/kefu.png" mode="" class="kefu"></image>
			</view>
			<view class="buy">
				立即购买
			</view>
			<view class="addShoppingCart">
				加入购物车
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodinfo: {}
			}
		},
		onLoad(options) {
			this.goodinfo = JSON.parse(options.url)
			console.log(this.goodinfo);
		},
		methods: {

		}
	}
</script>

<style lang="less" scoped>
	.goodsitem {
		.goodstitle {
			position: fixed;
			top: 0;
			width: 100%;
			height: 90rpx;
			line-height: 90rpx;
			text-align: center;
			background-color: white;
			font-size: 40rpx;
		}

		.goods {
			padding: 90rpx 0;

			.img {
				width: 100%;
				height: 750rpx;
			}

			.btn {
				width: 90%;
				height: 100rpx;
				background-color: #bb2c08;
				margin: 20rpx auto;
				border-radius: 10rpx;
				line-height: 100rpx;
				font-size: 32rpx;
				color: white;
				text-align: center;

			}

			.price {
				margin-left: 5%;
				font-size: 50rpx;
				color: #bb2c08;
			}


			.descriptionlist {
				margin-left: 5%;
				padding: 20rpx 0;

				.description {
					font-size: 25rpx;
					margin: 10rpx 0;
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

			.icon {
				flex: 1;
				height: 100rpx;
				border-right: 1rpx solid #eae2ec;

				.kefu {
					width: 60rpx;
					height: 60rpx;
					margin: 20rpx auto;
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
