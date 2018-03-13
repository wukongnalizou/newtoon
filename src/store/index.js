import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'
Vue.use(Vuex)
const state = {
	userId:"wV26VNx5GdZr2cCKaqPlkw1mzM7VoxqP",//用户id
	username : "",
	enddate:"0000-00-00",
	vip : "0",
	userimg : "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2607835674,2618955313&fm=27&gp=0.jpg",
	money: "0",
	cartoon:Object,//漫画信息
	cartoontype:[],//漫画类型npm r
	followcartoon:0,
	indexstate:"",//登录code
	search:0,
	firstload:"0",//第一次登录
	cartoonid:"",//推送状态漫画id
	cartoonIdurl:'',
	ts:"",//推送状态
	url:"",//分享平台地址
	shareurl:"",//漫画内容分享
	ios9:0,
	pagestate:'',//跳转充值页
	// agree:""
}
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})