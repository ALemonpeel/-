import base from '@/utils/base.js'
import http from '@/utils/request.js'
import Vue from 'vue'
export default{
	namespaced:true,//开启命名空间
	state:{
		list:[],//购物车数据列表
	},
	getters:{
		
	},
	mutations:{
		//购物车列表数据
		setList(state,payload){
			state.list = payload;
		},
		//添加购物车
		addCart(state,payload){
			state.list.push(payload)
		},
		//删除购物车
		deleteCart(state,payload){//payload={index:'',num:''}
			state.list.splice(payload.index,payload.num)
		},
		//修改
		changeCart(state,payload){//payload={index,n}
			//this.list[index].num +=1 ;
			state.list[payload.index].num +=payload.n;
		},
		//修改属性selected 
		changeSelectedStatus(state,index){//payload={index,}
			console.log('index---',index);
			//this.list[index].selected = !this.list[index].selected;
			// state.list[index].selected = !state.list[index].selected;
			//响应式问题 
			Vue.set(state.list[index],'selected',!state.list[index].selected);
			
			console.log('state.list[index].selected',state.list[index].selected);
		},
		//全选操作修改list里面selected状态
		changeStatus(state,status){
			state.list.forEach(ele=>{
				Vue.set(ele,'selected',status);
			})
		}
	},
	actions:{
		//异步请求 --- 可以把请求在actions触发 
		async getCartData({commit}){
			let res = await http(base.cartList)
			console.log('购物车数据-vuex---',res);
			if(res.status==200){
				commit('setList',res.data.result)
			}else{
				commit('setList',[])
			}
		}
	}
}

