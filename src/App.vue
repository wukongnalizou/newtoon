<template>
  <div class="app">
  	<!-- <keep-alive>
   		<router-view v-if="$route.meta.keepAlive"></router-view>
   	</keep-alive>
   	<router-view v-if="!$route.meta.keepAlive"></router-view>	 -->
   	<router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
// import {wxpintai,test} from './config/sharep.js'
import {mapMutations} from 'vuex'
import { Indicator } from 'mint-ui'
import { Toast } from 'mint-ui'
import wx from 'weixin-js-sdk'
export default {
	// data(){
	// 	return {
	// 		showfirstload:true
	// 	}
	// },
	beforeRouteEnter(to,from,next){
		next(vm => {
			// alert(vm.getUrlParam('code'));
			// alert(vm.$route.query.qd);
			if(vm.$route.query.fx == 1 || vm.getUrlParam('fx') == 1){
				if(vm.$route.path == '/cartoonimg'){
					vm.RECORD_SHAREURL(vm.$route.fullPath)
				}
				next('/login');
				window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx053e2bdaaf81ab7a&redirect_uri=http%3A%2F%2Fwww.kktoon.com%2Fhtd%2F%23%2Flogin%3Fqd%3DPT&response_type=code&scope=snsapi_userinfo&state=state#wechat_redirect"
				// return false;
			}
			// next();
		})
	},
	created(){
		// this.hh();
	},
	methods:{
		...mapMutations([
		       // 'GET_STATE',
		       // 'RECORD_CARTOONID',
		       // 'GET_CARTOONID',
		       // 'RECORD_TS',
		       // 'GET_TS',
		       'RECORD_URL',
		       'RECORD_SHAREURL',
		       // 'GET_SHAREURL',
		       // 'RECORD_USERID',
		       // 'UPDATE_FIRSTLOAD',
		       // 'RECORD_STATE',
		       // 'GET_URL'
		    ]),
		// hh(){
		// 	alert(vm.getUrlParam('code'));
		// 	alert(vm.$route.query.code);
		// },
		/*微信登录*/
		// load:function(){
		// 	this.GET_STATE();
		// 	this.GET_SHAREURL();
		// 	// alert(this.getUrlParam('code'));
		// 	// alert(this.$route.query.qd);
		// 	// alert('fxg='+this.getUrlParam('fx'))
		// 	// alert('fx$='+this.$route.query.fx)
		// 	if(this.getUrlParam('fx') == 1 || this.$route.query.fx == 1){
		// 		// alert(this.$route.fullPath)
		// 		if(this.$route.path == '/cartoonimg'){
		// 			this.RECORD_SHAREURL(this.$route.fullPath)
		// 			// alert(this.$store.state.shareurl);
		// 		}
		// 		window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx053e2bdaaf81ab7a&redirect_uri=http%3A%2F%2Fwww.kktoon.com%2Fhtd%2F%23%2F%3Fqd%3DPT&response_type=code&scope=snsapi_userinfo&state=state#wechat_redirect"
		// 		return false;
		// 	}
		// 	if(this.getUrlParam('code') && this.$store.state.indexstate == null){
	 //            this.getuser();
	 //        }
		// },
		// async getuser(){
	 //        await this.$axios({
	 //          method:"post",
	 //          data:{
	 //            "code":this.getUrlParam('code'),
	 //            "qd":this.$route.query.qd
	 //          },
	 //          url:"/servlet/OAuthAPIServlet.do"
	 //        }).then((res)=>{
	 //            this.RECORD_USERID(res.data.obj);
	 //            this.UPDATE_FIRSTLOAD(res.data.spare);
	 //            this.RECORD_STATE(0);
	 //            // alert(this.$store.state.shareurl)
	 //            if(this.$store.state.shareurl != null && this.$store.state.shareurl != ''){
	 //              this.$router.push(this.$store.state.shareurl);
	 //            }
	 //            // if(this.$store.state.cartoonid != '' && this.$store.state.ts == null && this.$store.state.cartoonid != null){
	 //            //     this.RECORD_TS(1);
	 //            //     this.$router.push(this.$store.state.cartoonid)
	 //            // }
	 //        })
	 //      },
		/*判断是否为分享用户*/
		// okshare(){
		// 	this.GET_SHAREURL();
		// 	// alert(this.$route.query.fx)
		// 	if(this.$route.query.fx){
		// 		/*判断是否为漫画内容分享*/
		// 		if(this.$route.path == '/cartoonimg'){
		// 			this.RECORD_SHAREURL(this.$route.fullPath)
		// 		}
		// 		// alert(this.$route.path);
		// 		window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx053e2bdaaf81ab7a&redirect_uri=http%3A%2F%2Fwww.kktoon.com%2FUserLoginWX.html%3Fqd%3DPT&response_type=code&scope=snsapi_userinfo&state=state#wechat_redirect'
		// 	}
		// },
		/*公众号底部推送*/
		// okts(){
		// 	this.GET_CARTOONID();
		// 	if(this.$route.query.ts == 1 && this.$store.state.cartoonid == null){
		// 		this.RECORD_CARTOONID(this.$route.fullPath);
		// 		window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx053e2bdaaf81ab7a&redirect_uri=http%3A%2F%2Fwww.kktoon.com%2FUserLoginWX.html%3Fqd%3DPT&response_type=code&scope=snsapi_userinfo&state=state#wechat_redirect'
		// 	}
		// },
		/*微信分享*/
		async getshare(){
			let _this = this
			await this.$axios({
				method: "post",
				data: {
					"url":window.location.href.split('#')[0]
				},
				url: "/get/weixin/fenxiang.do"
			}).then((res)=>{
				// alert(window.location.href);
				let sd = res.data.obj;
				this.RECORD_URL(window.location.href.split('#')[0])
				// this.GET_URL();
				let links= window.location.href.split('#')[0]+'&fx=1'
				// let links = +'&fx=1'
				// alert(links)
				let title="有毒!咔咔漫画真有毒";
				let desc="一个真人漫画平台";
				let imgurl = "http://p0opk9dxj.bkt.clouddn.com/xiaoshuo%20logo.png";
				// alert(wx.__proto__)
				wx.config({
					debug: false,
					appId: sd.appid,
					timestamp: sd.timestamp,
					nonceStr: sd.nonceStr,
					signature: sd.signature,
					jsApiList: [
						'checkJsApi','onMenuShareTimeline','onMenuShareAppMessage'
					]
				})
				// alert(links);
				wx.ready(function(){
					wx.checkJsApi({
						jsApiList : [ 'getNetworkType',
								'previewImage' ],
						success : function(res) {
							/* alert(JSON.stringify(res)); */
						}
					});
					wx.onMenuShareAppMessage({
						title: title,
						link: links,
						desc: desc,
						imgUrl : imgurl,
						success: function(){
							// alert('分享朋友成功')
							_this.sharesuccess();
						},
						cancel: function(){
							// alert('取消分享')
						}
					})
					wx.onMenuShareTimeline({
						title: title,
						link: links,
						desc: desc,
						imgUrl : imgurl,
						success: function(){
							// alert('分享到朋友圈成功')
							_this.sharesuccess();
						},
						cancel: function(){
							// alert('取消朋友分享')
						}
					})
				})
				wx.error(function(res){
					// alert('分享失败');
				})
			})
		},
		/*分享朋友成功*/
		async sharesuccess(){
			await this.$axios({
				method: "post",
				data: {
					"userId":this.$store.state.userId
				},
				url: "/app/back/share.do"
			}).then((res)=>{
				Toast('分享成功');
				Indicator.close();
			})
		},
		getUrlParam:function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
			var r = window.location.search.substr(1).match(reg); //匹配目标参数
			if (r != null)
				return unescape(r[2]);
			return null; //返回参数值
		}
	},
	mounted(){
		this.getshare();
	},
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.app
		width:100%;
		height:100%;
		position:absolute;
		// overflow:scroll;
		// -webkit-overflow-scrolling: touch;
		top:0;
		left:0;
		// overflow:scroll;
		background:#f2f2f2;
		
</style>
