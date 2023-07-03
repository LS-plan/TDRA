import Vue from 'vue'
import store from './store'
import App from './App'
import axios from './components/axios'
import Common from './static/js/common.js'
import Config from './static/js/config.js'
import uView from './uni_modules/uview-ui'
Vue.use(uView)

import Json from './Json'
// import request from './utils/request'
// Vue.prototype.request=request

Vue.config.productionTip = false
import verification from './components/active-form/js/verification'
import route from './uni_modules/uview-ui/libs/util/route'


Vue.use(verification)
Vue.prototype.$axios = axios

const msg = (title, duration=1500, mask=false, icon='none')=>{
	//统一提示方便全局修改
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}
const json = type=>{
	//模拟异步请求数据
	return new Promise(resolve=>{
		setTimeout(()=>{
			resolve(Json[type]);
		}, 500)
	})
}

const prePage = ()=>{
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}
Vue.config.productionTip = false
Vue.prototype.$fire = new Vue();
Vue.prototype.$store = store;
Vue.prototype.$api = {msg, json, prePage};

Vue.prototype.$Common = Common
Vue.prototype.$Config = Config



App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()