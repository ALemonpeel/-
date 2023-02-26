import Vue from 'vue'
import Vuex from 'vuex'
//导入模块
import menu from "./modules/menu.js"
import cart from "./modules/cart.js"

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {

	},
	getters: {

	},
	mutations: {

	},
	actions: {

	},
	modules: {
		menu,
		cart
	}
})
export default store
