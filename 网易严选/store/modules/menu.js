export default {
	namespaced: true,
	state: {
		navlist: [], //存储导航信息 
		imagelist: [], //存储轮播图
		policyDescList: [], //存储描述数据
		categoryModule: [], //存储好物列表数据
	},
	getters: {

	},
	mutations: {
		setNavlist(state, payload) {
			state.navlist = payload;
		},
		setimagelist(state, payload) {
			state.imagelist = payload;
		},
		setpolicyDescList(state, payload) {
			state.policyDescList = payload;
		},
		setcategoryModule(state, payload) {
			state.categoryModule = payload;
		},

	},
	actions: {
		//可以做异步请求
	}

}
