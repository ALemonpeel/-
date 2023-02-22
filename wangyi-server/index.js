const expres=require('express')
// 创建服务器
const app= expres();
// 引入router
const router=require('./router/index')

app.use('/',router)

//食疗坊数据
const routerfood = require('./router/foods')
app.use('/',routerfood)

app.listen(7788,(res,req)=>{
	console.log('服务器启动成功....');
	console.log('http://localhost:7788');
})


