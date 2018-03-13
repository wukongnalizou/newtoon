// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'
// import wx from 'weixin-js-sdk'
// import {wxpingtai} from './config/sharep.js'
import FastClick from 'fastclick'
import Swiper from 'vue-awesome-swiper'
import axios from './config/axios.js'
import store from './store/'
import './config/rem'
import lrz from 'lrz'
import VueLazyLoad from 'vue-lazyload'
import VuePreview from 'vue-preview'
import './style/stylus/index.styl'
import './style/stylus/swiper.min.css'
import 'mint-ui/lib/style.css'
// import { InfiniteScroll } from 'mint-ui';
// import animate from 'animate.css'
Vue.prototype.$axios = axios
// Vue.prototype.wxpingtai = axios
// import './swiper/dist/css/swiper.css'
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body)
  }, false)
}
/*退出监听*/
// window.addEventListener("popstate",function(){
// 	alert('hh')
// },false)
Vue.config.productionTip = false
Vue.use(VueLazyLoad,{
	error : "static/rank.png",
	loading: "static/rank.png"
})
// Vue.use(wx)
// Vue.use(InfiniteScroll)
// var VConsole = require('vconsole')
// var vConsole = new VConsole();
Vue.use(VuePreview)
Vue.use(VueRouter)
Vue.use(Swiper)
// Vue.use(animate)
const router = new VueRouter({
  // mode:'history',
  routes
})
// router.beforeEach((to,from,next)=>{
// 	if(to.path == '/circle' || to.path == '/mycircle'){
// 		// alert(1)
// 		window.addEventListener("popstate",function(){
// 			vm.$preview.close()
// 		},false)
// 	}
// 	next();
// })
/* eslint-disable no-new */
var vm = new Vue({
  router,
  store
})
vm.$mount('#app')