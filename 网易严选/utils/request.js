/* 
封装网络的请求方法
  url 接口地址
	method 请求地址
	data 参数传递
	loading 是否显示加载动画  布尔值
 
 */
import base from './base.js'

export default function(url, method = 'GET', data = {}, loading = true) {
	return new Promise((resolve, rejects) => {
		//交互动画
		if (loading) {
			uni.showLoading({
				title: "数据加载中"
			})
		}
		uni.request({
			url: base.host + url,
			method,
			data,
			success: (res) => {
				//请求成功
				if (res.data.status === 200) {
					uni.showLoading({
						title: "数据加载完毕"
					})
					resolve(res.data)
				}
			},
			fail: (error) => {
				//请求失败
				rejects(error)
			},
			complete() {
				//成功或失败都执行
				uni.hideLoading()
			}
		})
	})
}
