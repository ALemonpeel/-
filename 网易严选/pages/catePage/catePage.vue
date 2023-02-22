<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: ''
			}
		},
		onLoad(options) {
			console.log(options);
			this.url = options.url
		},
		methods: {

		}
	}
</script>

<style>

</style>
