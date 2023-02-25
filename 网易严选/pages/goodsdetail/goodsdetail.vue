<template>
	<view class="goodsitem">
		<view class="goodstitle">{{goodsinfo.name}}</view>
		<view class="goods">
			<image :src="goodsinfo.pic" class="img"></image>
			<view class="btn">
				{{goodsinfo.name}}
			</view>
			<view class="price">
				￥{{goodsinfo.price}}
			</view>
			<view class="city">
				发货地址：{{goodsinfo.city}}
			</view>
			<view class="specification">
				{{goodsinfo.description}}
			</view>
			<view class="descriptionlist">
				<view class="description">{{goodsinfo.details}}</view>
			</view>
		</view>
		<view class="goodsfoot">
			<view class="icon">
				<image src="../../static/kefu.png" mode="" class="kefu"></image>
			</view>
			<view class="buy">
				立即购买
			</view>
			<view class="addShoppingCart" @click="messageToggle('success')">
				加入购物车
			</view>
			<view>
				<!-- 提示信息弹窗 -->
				<uni-popup ref="message" type="message">
					<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
				</uni-popup>
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
				//商品信息
				goodsinfo: [],
				id: 0,
				//弹窗提示消息
				messageText: '',
				msgType: ''
			}
		},
		onLoad(options) {
			console.log(options.url);
			this.id = options.url
		},
		methods: {
			async getgoodsdetail(id) {
				let res = await request(base.goodsdetail, {
					id
				})
				console.log(res);
				if (res.status === 200) {
					this.goodsinfo = res.data[0]
				}
			},
			//加入购物车
			messageToggle(type) {
				const val = this.goodsinfo
				this.addcart(val, type)
			},
			async addcart(val, type) {
				let res = await request(base.addcart, {
					name: val.name,
					pic: val.pic,
					num: val.num,
					info: val.info,
					price: val.price
				})
				console.log(res);
				if (res.status = 200) {
					this.msgType = type
					this.messageText = '加入购物车成功'
					this.$refs.message.open()
				}
			}
		},
		watch: {
			id: {
				handler(val) {
					console.log(val);
					this.getgoodsdetail(val)
				}
			}
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

			.city {
				margin-left: 5%;
				font-size: 30rpx;
			}

			.specification {
				margin-left: 5%;

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
