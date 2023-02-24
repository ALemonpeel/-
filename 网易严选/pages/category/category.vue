<template>
	<view class="category">
		<!-- 搜索栏区域 -->
		<view class="myHeader">
			<!-- logo -->
			<image src="../../static/images/logo.png" class="image"></image>
			<!-- 输入框 -->
			<view class="search">
				<i class="iconfont icon-sousuo"></i>
				<input type="text" placeholder="请输入">
			</view>
			<!-- 按钮 -->
			<view class="btn">搜索</view>
		</view>
		<view class="show">
			<view class="left">
				<scroll-view scroll-y="true" class="scroll-Y">
					<view class="item" :class="{active:index == activeIndex}" v-for="(item,index) in list"
						:key="item.id" @click="genghuan(index,item.id)">{{item.name}}</view>
				</scroll-view>
			</view>
			<view class="reight">
				<scroll-view scroll-y="true" @scroll="scrollhandle" class="scroll-Y" :scroll-top="top"
					scroll-with-animation="true">
					<image :src="showlist.imgUrl" mode="" class="topimg"></image>
					<view class="imglist">
						<view class="img" v-for="item in showlist.subCateList" :key="item.id">
							<image :src="item.wapBannerUrl"></image>
							<view class="text">{{item.name}}</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="fanhui" v-if="isshow" @click="gotop">
			返回
		</view>
	</view>
</template>

<script>
	import base from '@/utils/base.js'
	import request from '@/utils/request.js'
	export default {
		data() {
			return {
				list: [], //接收的数据
				activeIndex: 0, //更换高亮显示
				id: 1005000, //当前高亮id
				isshow: false, //控制返回顶部按钮是否显示
				top: 0
			}
		},
		mounted() {
			this.IndexCateList()
		},
		computed: {
			//获取高亮导航对应的数据
			showlist() {
				let arr = this.list.find(ele => ele.id == this.id)
				console.log('arr------', arr);
				return arr
			}
		},
		methods: {
			//调用接口获取数据
			async IndexCateList() {
				let res = await request(base.CategoryDatas)
				console.log(res);
				this.list = res.categoryDatas
			},
			//点击导航高亮
			genghuan(index, id) {
				this.activeIndex = index
				this.id = id
				//切换界面时重置顶部距离
				this.top = this.top == 0 ? 1 : 0;
			},
			scrollhandle(e) {
				//console.log(e.detail, e.detail.scrollTop);
				if (e.detail.scrollTop >= 94) {
					this.isshow = true
				} else {
					this.isshow = false
				}
			},
			//返回顶部
			gotop() {
				this.top = this.top == 0 ? 1 : 0;

			}
		}
	}
</script>

<style lang="less" scoped>
	.category {

		.show {
			border-top: 1rpx solid black;
			height: 100%;
			display: flex;

			//左侧导航
			.left {
				width: 20%;
				height: 100%;
				display: block;

				.item {
					height: 60rpx;
					line-height: 60rpx;
					font-size: 27rpx;
					text-align: center;

					&.active {
						color: #ff5555;
						border-left: 1rpx #ff5555 solid;
					}
				}
			}

			//右侧内容
			.reight {
				width: 80%;
				border-left: 1rpx solid black;

				.scroll-Y {
					height: calc(100vh);
				}

				.topimg {
					width: 520rpx;
					height: 200rpx;
					display: block;
					margin: 10rpx auto;
				}

				.imglist {
					display: flex;
					flex-wrap: wrap;
					justify-content: space-around;

					.img {
						image {
							width: 160rpx;
							height: 120rpx;
						}

						.text {
							text-align: center;
							padding: 10rpx 0;
						}
					}
				}
			}
		}

		//头部区域
		.myHeader {
			display: flex;
			padding: 10rpx;
			align-items: center;
			font-size: 28rpx;

			.image {
				height: 40rpx;
				width: 140rpx;
				margin: 10rpx;
			}


			.search {
				display: flex;
				align-items: center;
				border: 1px #eee solid;
				flex: 1;
				margin: 0 10rpx;
				border-radius: 10px;
				padding-left: 15rpx;
			}

			.btn {
				width: 180rpx;
				text-align: center;

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
