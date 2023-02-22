const express = require('express')
const router = express.Router()

// Node 入口
var Fly = require("flyio/src/node")
var fly = new Fly;

var jwt = require('jsonwebtoken');



router.get('/test', (req, res) => {
	res.send('测试成功')
})

// 加载首页分类数据----滑块
const indexData = require('../datas/index.json')
// 加载首页分类数据----滑块
router.get('/getIndexData', (req, res) => {
	// console.log(req)
	res.send({
		status: 200,
		indexData
	})
})

//首页轮播接口数据、
router.get('/getRecomBanner', (req, res) => {
	res.send({
		status: 200,
		result: [{
			id: '101',
			pic: 'https://yanxuan.nosdn.127.net/89ddc38903cee9923e7d998a8a88ed08.jpg?type=webp&imageView&quality=75&thumbnail=750x0'
		}, {
			id: '102',
			pic: 'https://yanxuan.nosdn.127.net/static-union/165406787637b102.jpg?type=webp&imageView&quality=75&thumbnail=750x0'
		}, {
			id: '102',
			pic: 'https://yanxuan.nosdn.127.net/static-union/165339174537b102.jpg?type=webp&imageView&quality=75&thumbnail=750x0'
		}]
	})
})


// 首页里-分类列表
const indexCateList = require('../datas/indexCateList.json')
// 首页里-分类列表
router.get('/getIndexCateList', (req, res) => {
	// console.log(req)
	res.send({
		status: 200,
		indexCateList
	})
})


// tabBar  分类
const categoryDatas = require('../datas/categoryDatas.json')
// 首页里-分类列表
router.get('/getCategoryDatas', (req, res) => {
	// console.log(req)
	res.send({
		status: 200,
		categoryDatas
	})
})


router.get('/getOpenId', async (req, res) => {
	// 1、接受请求参数
	const code = req.query.code;
	// 2、整合数据对接微信服务器
	const appId = '';
	const appSecret = '';

	// 请求微信接口 的链接
	const url =
		`https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`;
	// 对接微信服务器
	const result = await fly.get(url);

	const openId = JSON.parse(result.data).openid;
	console.log('openid', openId)
	// 3、接收到微信服务器返回的openId，结合当前用户数据，加密生成token
	const info = {
		openId,
		name: 'Doraemon',
		age: 17
	}
	var token = jwt.sign({
		foo: info
	}, 'shhhhh');
	console.log(token);
	// 解密：
	// const res2=jwt.verify(token,'shhhhh');
	// console.log(res2)

	// 4、返回给浏览器当前用户加密后的标识
	res.send({
		token
	})

})




module.exports = router;
