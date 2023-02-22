<template>
	<view>
		<view class="show" v-for="(item,index) in categoryModule" :key="index">
			<image class="image" :src="item.titlePicUrl"></image>
			<scroll-view scroll-x enable-flex class="showmenu">
				<view class="item" v-for="item1 in item.itemList" :key="item1.id">
					<image :src="item1.listPicUrl" mode="" class="image"></image>
					<view class="text">{{item1.name}}</view>
				</view>
				<!-- <view class="item">
					<image src="../../static/logo.png" mode="" class="image"></image>
					<view class="text">测试测试测试测试测试测试测试测试测试测试</view>
				</view> -->
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		name: "Show",
		data() {
			return {

			};
		},
		computed: {
			...mapState('menu', ['categoryModule'])
		}
	}
</script>

<style lang="less" scoped>
	.show {
		.image {
			width: 100%;
			height: 370rpx;
		}

		.showmenu {
			display: flex;
			flex-wrap: nowrap;
			height: 280rpx;
			padding: 10rpx 0;

			.item {
				flex: 1;
				text-align: center;
				margin-left: 10rpx;
				padding: 0 5rpx;

				.text {
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2; // 控制多行的行数
					-webkit-box-orient: vertical;

				}

				.image {
					width: 200rpx;
					height: 200rpx;
				}
			}
		}
	}
</style>
