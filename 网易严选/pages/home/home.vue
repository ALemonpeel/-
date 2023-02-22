<template>
	<view class="home">
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
		<!-- 滑动导航栏 -->
		<scroll-view scroll-x="true" enable-flex="true" class="Mynav">
			<view class="item" :class="{active:activeIndex == -1}" @click="dinaji(-1)">
				推荐
			</view>
			<view class='item' :class="{active: index == activeIndex}" v-for="(item,index) in kingKongList"
				:key="item.L1Id" @click="dinaji(index)">{{item.text}}</view>
			<view class="tianchong"></view>
		</scroll-view>
		<!-- 推荐界面 -->
		<Recommend v-if="activeIndex === -1"></Recommend>
		<!-- 显示其他 -->
		<MenuCate v-else></MenuCate>

	</view>
</template>

<script>
	import base from '@/utils/base.js'
	import request from '@/utils/request.js'
	import {
		//mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				kingKongList: [],
				activeIndex: -1
			}
		},
		computed: {
			//...mapState('menu',['navlist'])
		},
		mounted() {
			this.getIndexData()
			this.getRecomBanner()
		},
		methods: {
			//请求首页的动态数据信息
			...mapMutations('menu', ['setNavlist', 'setpolicyDescList', 'setcategoryModule']),
			async getIndexData() {
				let res = await request(base.indeData)
				console.log(base);
				console.log('收到数据--------', res);
				if (res.status === 200) {
					// console.log(res.indexData.kingKongModule.kingKongList);
					this.kingKongList = res.indexData.kingKongModule.kingKongList
					//滑动栏数据存储仓库
					this.setNavlist(this.kingKongList)
					this.setpolicyDescList(res.indexData.policyDescList)
					this.setcategoryModule(res.indexData.categoryModule)
				}
			},
			/* 
			  导航条各项点击事件
				 index 导航项下标
				 data  导航项对应的数据
			 */
			dinaji(index) {
				this.activeIndex = index
			},
			...mapMutations('menu', ['setimagelist']),
			//请求首页轮播图数据
			async getRecomBanner() {
				let res = await request(base.RecomBanner)
				console.log('轮播数据-------', res);
				if (res.status === 200) {
					//存储轮播图数据
					this.setimagelist(res.result)
				}
			}
		}
	}
</script>

<style lang="less" scoped>
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

	//横向滚动条
	.Mynav {
		display: flex;
		height: 50rpx;
		margin-top: 15rpx;
		white-space: nowrap;

		.item {
			//flex: 1;
			display: inline-block;
			font-size: 25rpx;
			//white-space: nowrap;
			margin: 0 10rpx;

			&.active {
				color: #ff5555;
				border-bottom: 1rpx #ff5555 solid;
			}
		}
	}

	.Mynav :last-of-type {
		padding-right: 1rpx !important;
	}
</style>
