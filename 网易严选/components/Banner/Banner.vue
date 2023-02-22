<template>
	<view>
		<swiper class="banner" autoplay interval='3000' circular indicator-dots>
			<swiper-item v-for="item in imagelist" :key="item.id">
				<image :src="item.pic" mode=""></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	// import base from '@/utils/base.js'
	// import request from '@/utils/request.js'
	import {
		mapState
	} from 'vuex'
	export default {
		name: "Banner",
		data() {
			return {
				// imagelist: []
			};
		},
		computed: {
			...mapState('menu', ['imagelist'])
		},
		methods: {
			/* 	async getRecomBanner() {
					let res = await request(base.RecomBanner)
					console.log('轮播数据-------', res);
					if (res.status === 200) {
						this.imagelist = res.result
						console.log('图片数据', this.imagelist);
					}
				} */
		}
	}
</script>

<style lang="less" scoped>
	.banner {
		width: 100%;
		height: 350rpx;
		margin: 10rpx 0;

		image {
			width: 100%;
			height: 350rpx;
		}
	}
</style>
