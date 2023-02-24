<template>
	<view>
		<!-- 轮播图组件 -->
		<Banner></Banner>
		<!-- 品牌信息 -->
		<view class="info">
			<view class="ele" v-for="(item,index) in policyDescList" :key="index">
				<image :src="item.icon" class="icon"></image>
				<text class="tx">{{item.desc}}</text>
			</view>
		</view>
		<!-- 分类导航-->
		<view class="menu">
			<view class="item" v-for="item in navlist" :key="item.L1Id">
				<navigator :url="'/pages/catePage/catePage?url='+item.schemeUrl">
					<image :src="item.picUrl" mode="" class="image"></image>
					<view class="text" :style="{color:'#'+item.textColor}">{{item.text}}</view>
				</navigator>
			</view>
		</view>
		<Show></Show>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		name: "Recommend",
		data() {
			return {

			};
		},
		computed: {
			...mapState('menu', ['policyDescList', 'navlist'])
		}
	}
</script>

<style lang="less" scoped>
	.info {
		display: flex;
		align-items: center;
		margin-top: 5rpx;

		.ele {
			flex: 1;
			text-align: center;

			.icon {
				width: 40rpx;
				height: 40rpx;
				//vertical-align: middle;
			}

			.tx {
				position: relative;
				top: -10rpx;
			}
		}
	}

	.menu {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		.item {
			width: 20%;
			text-align: center;
			margin-bottom: 20rpx;

			.image {
				width: 100rpx;
				height: 100rpx;
			}
		}
	}
</style>
