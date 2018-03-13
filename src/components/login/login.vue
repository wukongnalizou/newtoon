<template>
	<div class="loginimg">
		<!-- <img src="http://ox143yv1l.bkt.clouddn.com/jindachui.jpg"> -->
	</div>
</template>
<script  type="text/ecmascript-6">
import {mapMutations} from 'vuex'
export default{
	beforeRouteEnter(to, from, next) {
		next(vm => {
			// alert(vm.$route.query.cartoonId);
			/*if(vm.$route.query.cartoonId){
				vm.RECORD_SHAREURL('/cartoonimg?id='+vm.$route.query.cartoonSetId+'&cartoonId='+vm.$route.query.cartoonId+'&moneyState='+vm.$route.query.moneyState)
			}*/
			if(vm.$store.state.userId != ''){
            	vm.$router.replace('main/indexmain/index')
       		}
			if(vm.$route.query.cartoonId && vm.$route.query.cartoonSetId){
				vm.RECORD_SHAREURL('/cartoonimg?id='+vm.$route.query.cartoonSetId+'&cartoonId='+vm.$route.query.cartoonId+'&moneyState='+vm.$route.query.moneyState)
				// console.log(1)
			}
			if(vm.$route.query.cartoonId && !vm.$route.query.cartoonSetId){
				vm.RECORD_CARTOONIDURL('/cartoon/episode?id='+vm.$route.query.cartoonId)
				// console.log(2)
			}
			if(vm.$route.query.pagestate){
				vm.RECORD_PAGESTATE('/'+vm.$route.query.pagestate)
			}
       		next();
      	})
	},
	created(){
		// this.isIOS9();
		this.decide();
		// this.ceshi();
	},
	methods:{
		...mapMutations([
		       // 'UPDATE_STATE',
		       'GET_STATE',
		       'RECORD_CARTOONIDURL',
		       'RECORD_CARTOONID',
		       'GET_CARTOONID',
		       'RECORD_TS',
		       'GET_TS',
		       'RECORD_URL',
		       'RECORD_SHAREURL',
		       'GET_SHAREURL',
		       'RECORD_USERID',
		       'UPDATE_FIRSTLOAD',
		       'RECORD_STATE',
		       'RECORD_IOS9',
		       'RECORD_PAGESTATE'
		    ]),
		decide:function(){
			if (this.$store.state.userId == '') {
				this.getuser();
				this.ios();
			}else{
				this.$router.replace('main/indexmain/index')
			}
		},
		ios:function(){
			if(this.isIOS9()){
				this.RECORD_IOS9(1)
			}
		},
		async getuser(){
	        await this.$axios({
	          method:"post",
	          data:{
	            "code":this.getUrlParam('code'),
	            "qd":this.$route.query.qd
	          },
	          url:"/servlet/OAuthAPIServlet.do"
	        }).then((res)=>{
	            this.RECORD_USERID(res.data.obj);
	            this.UPDATE_FIRSTLOAD(res.data.spare);
	            this.RECORD_STATE(0);
	            this.GET_SHAREURL();
	            this.tasktable();
	            // alert(this.$store.state.shareurl)
	            if(this.$store.state.userId != ''){
	            	this.$router.replace('main/indexmain/index')
	            }
	            if(this.$store.state.shareurl != null && this.$store.state.shareurl != ''){
	              this.$router.push(this.$store.state.shareurl);
	            }
	            if(this.$store.state.cartoonIdurl != ''){
	              this.$router.push(this.$store.state.cartoonIdurl);
	              // this.RECORD_CARTOONIDURL('')
	            }
	            if(this.$store.state.pagestate != ''){
	              this.$router.push(this.$store.state.pagestate);
	            }
	        })
	      },
	      /*生成任务表*/
			async tasktable(){
				await this.$axios({
					method: "post",
					data:{
						"userId":this.$store.state.userId
					},
					url: "/qpp/comic/add/cartoon/task.do"
				}).then((res)=>{

				})
			},
	      okshare(){
			this.GET_SHAREURL();
			// alert(this.$route.query.fx)
			if(this.$route.query.fx){
				/*判断是否为漫画内容分享*/
				if(this.$route.path == '/cartoonimg'){
					this.RECORD_SHAREURL(this.$route.fullPath)
				}
				// alert(this.$route.path);
				window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx053e2bdaaf81ab7a&redirect_uri=http%3A%2F%2Fwww.kktoon.com%2Fhtd%2F%23%2Flogin%3Fqd%3DPT&response_type=code&scope=snsapi_userinfo&state=state#wechat_redirect'
			}
			},
		   isIOS9:function() {
            //获取固件版本
            var getOsv = function () {
                var reg = /OS ((\d+_?){2,3})\s/;
                if(navigator.userAgent.match(/iPad/i) || navigator.platform.match(/iPad/i) || navigator.userAgent.match(/iP(hone|od)/i) || navigator.platform.match(/iP(hone|od)/i)) {
                    var osv = reg.exec(navigator.userAgent);
                    // console.log(osv)
                    if(osv.length > 0) {
                        return osv[0].replace('OS', '').replace('os', '').replace(/\s+/g, '').replace(/_/g, '.');
                    }
                }
                return '';
            };
            var osv = getOsv();
            var osvArr = osv.split('.');
            //初始化显示ios9引导
            if(osvArr && osvArr.length > 0) {
            	// console.log(osvArr)
            	if(parseInt(osvArr[0]) < 10){
            		return true
            	}
            	if(parseInt(osvArr[0]) == 10 && parseInt(osvArr[1]) < 3){
            		// alert(1)
            		return true
            	}
                // if(parseInt(osvArr[0]) == 9) {
                //     return true
                // }
            }
            return false
        },
		/*微信分享*/
		async getshare(){
			let _this = this
			await this.$axios({
				method: "post",
				data: {
					"url":window.location.href.split("#")[0]
				},
				url: "/get/weixin/fenxiang.do"
			}).then((res)=>{
				// alert(window.location.href);
				let sd = res.data.obj;
				this.RECORD_URL(window.location.href.split("#")[0])
				let links= window.location.href.split("#")[0]+'&fx=1'
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
	// mounted(){
	// 	this.getshare();
	// 	// wxpintai();
	// },
}	
</script>
<style lang="stylus" scoped>
	.loginimg
		font-size:0;
		position:relative;
		width:100%;
		height:100%;
		img
			display:inline-block;
			width:100%;
			height:100%;
</style>