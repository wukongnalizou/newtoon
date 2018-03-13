<template>
	<div class="cartoonimg">
		<vhead :title="ctitle"></vhead>
		<!-- <div class="clickbox" :class="{seethis:toggle}">
			<div class="prev">
				<span class="icon-left"></span>
				<span>上一话</span>
			</div>
			<div class="all">全集</div>
			<div class="next">
				<span>下一话</span>
				<span class="icon-right"></span>
			</div>
		</div> -->
		<div class="cartoonimgbox" v-for="cartoonimg in cartoonimgs" @click="menutoggle">
			<img :src="cartoonimg.src" v-lazy="cartoonimg.src">
		</div>
		<!-- <div class="page">
			<div class="left">
				<span class="icon-left icons"></span>
				<span @click="nextcartoon(0)">上一话</span>
			</div>
			<div class="right">
				<span @click="nextcartoon(1)">下一话</span>
				<span class="icon-right icons"></span>
			</div>
		</div>
		<div class="carcontent">
			<div class="good" @click="epsclick(veryOk)">
				<span class="icon-good icons" :class="veryOk == 1?'active':''"></span>
				<span class="">赞{{cartoon["good"]}}</span>
			</div>
			<div class="concern">
				<span class="icon-concern icons" :class="concern == 1?'active':''"></span>
				<span>关注</span>
			</div>
			<div class="share" @click="toshare">
				<span class="icon-share icons"></span>
				<span>分享</span>
			</div>
		</div> -->
		<!-- <div class="carauthor">
			<div class="title">
				<div class="des">作者</div>
			</div>
			<div class="con">
				<div class="authorimg">
					<img :src="cartoon.author.imgx">
				</div>
				<div class="name">{{cartoon["author"]["author"]}}</div>
			</div>
		</div> -->
		
		<!-- <div class="cardiscusscon">
			<div class="title">
				<div class="des">评论</div>
			</div>
			<div>
				<dis @sendmessage="sendmessage" ref="dis"></dis>
			</div>
			<dislist :discusses="discusses" :distotalpage="distotalpage" @goodclick="goodclick" @tdisdetail="tdisdetail" @alldis="alldis"></dislist>
		</div> -->
		<div class="clickbox">
			<div class="clickitem" @click="nextcartoon(0)">
				<span class="icon-left"></span>
				<span>上一话</span>
			</div>
			<div class="clickitem" @click="epsclick(veryOk)">
				<span class="icon-good" v-show="veryOk==0"></span>
				<span class="icon-goodfinish" v-show="veryOk==1"></span>
				<span>点赞</span>
			</div>
			<div class="clickitem" @click="toshare">
				<span class="icon-share"></span>
				<span>分享</span>
			</div>
			<div class="clickitem" @click="all">
				<span class="icon-epslist"></span>
				<span>全集</span>
			</div>
			<div class="clickitem" @click="nextcartoon(1)">
				<span class="icon-right"></span>
				<span>下一话</span>
			</div>
		</div>
		<!-- <div class="distext">
			<input type="text" placeholder="评论一下吧!" v-model="discusscon" @focus="computeheigth">
			<span class="disbtn" @click="senddiscon">发送</span>
		</div> -->
		<div class="epsalert" v-if="epsalert" @touchmove.prevent>
			<epsalert @epsalertclose="epsalertclose" :priceinfo="priceinfo" :cartoonId="cartoonId" :cartoonSetId="cartoonSetId" @alertclose="alertclose"></epsalert>
		</div>
		<div class="sharebox" v-if="showshare" @touchmove.prevent>
			<vshare @shareclose="shareclose"></vshare>
		</div>
		<div class="imgalertbox" v-show="imgclick">
			<imgalert :title="ctitle" @prev="nextcartoon(0)" @next="nextcartoon(1)" @all="all" @good="epsclick(veryOk)" @share="toshare" :veryOk="veryOk" @close="close"></imgalert>
		</div>
	</div>
</template>
<script>
	import vhead from '../common/thead/thead.vue';
	import dislist from '../common/dislist/dislist.vue';
	import epsalert from '../common/epsalert/epsalert.vue'
	import vshare from '../common/share/share.vue'
	import dis from '../common/dis/dis.vue'
	import imgalert from '../common/imgalert/imgalert.vue'
	import axios from 'axios'
	import qs from 'qs'
	import { MessageBox } from 'mint-ui';
	import { Toast } from 'mint-ui'
	import { Indicator } from 'mint-ui'
	import {mapMutations} from 'vuex'
	import wx from 'weixin-js-sdk'
	export default {
		data() {
			return {
				ctitle: '',
				veryOk:"",
				concern:"",
				cartoonimgs:[],
				cartoon:Object,
				discusses:[],
				toggle:false,
				distotalpage:"0",
				discusscon:"",
				cartoonimgpage:"1",
				totalpage:"1",
				epsalert:false,
				priceinfo:"",
				imgclick:false,
				showshare:false,
				cartoonId:this.$route.query.cartoonId,
				cartoonSetId:this.$route.query.id
			}
		},
		created() {
			// this.addinterceptors();
			this.initData();
			// this.dislistdata();
			// console.log(22)
		},
		methods: {
			...mapMutations([
	            'GET_URL',
	            'GET_SHAREURL'
	        ]),
	        /*单个组件拦截器*/
	   //      addinterceptors:function(){
	   //      	var instance = axios.create();
	   //      	instance.interceptors.request.use(
				//     config => { 
				//       if (config.method === 'post') {
				//         config.data = qs.stringify(config.data);
				//       }
				//       return config;
				//     },
				//     error => {
				//       return Promise.reject(error);
				//     });
				// //添加响应拦截器
				// instance.interceptors.response.use(
				//     response => {
				//       return response;
				//     },
				//     error => {
				//       if (error.response) {
				//         return Promise.reject(error)
				//     }
				// });
	   //      },
			/*获取漫画内容*/
			async initData(){
				if(this.cartoonimgpage > this.totalpage){
					return false;
				}
				var instance = axios.create();
	        	instance.interceptors.request.use(
				    config => { 
				      if (config.method === 'post') {
				        config.data = qs.stringify(config.data);
				      }
				      return config;
				    },
				    error => {
				      return Promise.reject(error);
				    });
				//添加响应拦截器
				instance.interceptors.response.use(
				    response => {
				      return response;
				    },
				    error => {
				      if (error.response) {
				        return Promise.reject(error)
				    }
				});
				let _this = this;
				await instance({
					method: "post",
					url : "/qpp/comic/get/cartoonphoto.do",
					data: {
						"userId":this.$store.state.userId,
						"nowPage":this.cartoonimgpage,
						"cartoonId":this.cartoonId,
						"cartoonSetId":this.cartoonSetId,
						"moneyState":this.$route.query.moneyState,
					}
				}).then((res)=>{
					// document.body.scrollTop = 0;
					if(res.data.error == 300){
						this.epsalert = true;
						this.priceinfo = res.data.spare;
					}
					if(res.data.error == 200){
						setTimeout(function(){
							_this.initData();
						},500)
					}
					this.totalpage = res.data.totalpage;
					this.cartoonimgpage = res.data.nowpage+1;
					// this.cartoonimgs = res.data.obj;
					this.cartoonimgs = [...this.cartoonimgs,...res.data.obj];
					this.ctitle = res.data.spare.titile;
					this.veryOk = res.data.spare.veryOk;
					this.concern = res.data.spare.followCartoon;
				})
			},
			menutoggle:function(){
				this.imgclick = true;
			},
			/*获取上/下一集漫画*/
			async nextcartoon(state){
				let _this = this;
				await this.$axios({
					method: "post",
					url : "/qpp/comic/get/cartoonphoto/up/down.do",
					data: {
						"userId":this.$store.state.userId,
						"nowPage":1,
						"cartoonId":this.cartoonId,
						"cartoonSetId":this.cartoonSetId,
						"up":state
					}
				}).then((res)=>{
					if(res.data.error == 300){
						this.cartoonimgs = [];
						document.body.scrollTop = 0;
						this.epsalert = true;
						this.priceinfo = res.data.spare;
						this.cartoonSetId = res.data.spare.cartoonSetId;
						this.ctitle = res.data.spare.titile;
						this.veryOk = res.data.spare.veryOk;
						this.concern = res.data.spare.followCartoon;
						this.totalpage = res.data.totalpage;
						this.cartoonimgpage = res.data.nowpage+1;
						this.cartoonimgs = [...this.cartoonimgs,...res.data.obj];
					}
					if(res.data.error == 200){
						this.cartoonimgs = [];
						document.body.scrollTop = 0;
						this.ctitle = res.data.spare.titile;
						this.veryOk = res.data.spare.veryOk;
						this.concern = res.data.spare.followCartoon;
						this.totalpage = res.data.totalpage;
						this.cartoonimgpage = res.data.nowpage+1;
						this.cartoonSetId = res.data.spare.cartoonSetId;
						this.cartoonimgs = [...this.cartoonimgs,...res.data.obj];
						this.dislistdata();
						this.initData();
					}
					if(res.data.error == 500){
						MessageBox.alert(res.data.msg);
					}	
				})
			},
			/*获取漫画评论*/
			async dislistdata(){
				await this.$axios({
					method: "post",
					url : "/qpp/comic/get/allcomment/son.do",
					data: {
						"userId":this.$store.state.userId,
						"nowPage":1,
						"cartoonId":this.$route.query.cartoonId,
						"cartoonSetId":this.cartoonSetId,
						"bestNew":"0"
					}
				}).then((res)=>{
					this.discusses = res.data.obj;
					this.distotalpage = res.data.totalpage;
					// document.body.scrollTop = 0;
					// if(res.data.error == 300){
					// 	this.epsalert = true;
					// 	this.priceinfo = res.data.spare;
					// 	this.cartoonSetId = res.data.obj[0].cartoonSetId;
					// }
					// this.cartoonimgs = res.data.obj;
					// this.ctitle = res.data.spare.titile;
				})
			},
			/*发送漫画评论*/
			async sendmessage(discusscon){
				await this.$axios({
					method: "post",
					url : "/qpp/comic/add/allcomment/son.do",
					data: {
						"userId":this.$store.state.userId,
						"cartoonId":this.$route.query.cartoonId,
						"cartoonSetId":this.cartoonSetId,
						"commentInfo":discusscon
					}
				}).then((res)=>{
					// this.discusscon = "";
					this.$refs.dis.emptymessage();
					Toast('评论成功');
					this.dislistdata();
				})
			},
			/*每集漫画点赞*/
			async epsclick(veryOk){
				// let nownode = document.getElementById(cdata[1]).children[1];
				// let nowicon = document.getElementById(cdata[1]).children[0];
				// let nowdata = document.getElementById(cdata[1]);
				// let datastate = nowdata.getAttribute('data-state');
				await this.$axios({
					method: "post",
					url : "/qpp/comic/bysetid/okcount.do",
					data: {
						"userId":this.$store.state.userId,
						"id":this.cartoonSetId,
						"veryOk":veryOk
					}
				}).then((res)=>{
					this.veryOk = res.data.spare.veryOk;
					// nownode.innerHTML = res.data.obj.cartoonComment.okCount;
					// nowdata.setAttribute('data-state',res.data.obj.veryOk);
					// if(res.data.obj.veryOk){
					// 	nowicon.style.color = '#31c27c';
					// }else{
					// 	nowicon.style.color = '#b9b9b9';
					// }
				})
			},
			/*漫画评论点赞*/
			async goodclick(cdata){
				let nownode = document.getElementById(cdata[1]).children[1];
				let nowicon = document.getElementById(cdata[1]).children[0];
				let nowdata = document.getElementById(cdata[1]);
				let datastate = nowdata.getAttribute('data-state');
				await this.$axios({
					method: "post",
					url : "/qpp/comic/add/son/okcount.do",
					data: {
						"userId":this.$store.state.userId,
						"id":cdata[1],
						"veryOk":datastate
					}
				}).then((res)=>{
					nownode.innerHTML = res.data.obj.cartoonComment.okCount;
					nowdata.setAttribute('data-state',res.data.obj.veryOk);
					if(res.data.obj.veryOk){
						nowicon.style.color = '#ffc438';
					}else{
						nowicon.style.color = '#b9b9b9';
					}
				})
			},
			/*漫画评论详情跳转*/
			tdisdetail:function(id){
				this.$router.push('/cartoondisdetail?id='+id);
			},
			/*漫画全部评论*/
			alldis:function(arg){
				this.$router.push('/cartoondiscuss?id='+arg[0]+'&setid='+arg[1]);
			},
			/*漫画解锁弹框*/
			epsalertclose: function(){
   				this.epsalert = false;
   				this.initData();
   			},
   			alertclose:function(){
   				this.$router.go(-1);
   			},
   			/*获取焦点，计算window高度*/
   			computeheigth:function(){
   				let interval = setTimeout(function () {
					document.body.scrollTop = document.body.scrollHeight;
					}, 300);
   					clearInterval(interval);
   			},
   			/*去分享*/
   			toshare:function(){
   				this.showshare = true
   			},
   			shareclose:function(){
   				this.showshare = false
   			},
   			all:function(){
   				this.GET_SHAREURL();
   				if(this.$store.state.shareurl != null && this.$store.state.shareurl != ''){
	              this.$router.replace('/cartoon/episode?id='+this.cartoonId);
	            }else{
	            	this.$router.go(-1);
	            }
   			},
   			close:function(){
   				this.imgclick = false;
   			},
   			handleScroll:function(){
   				// console.log(1)
   				this.imgclick = false;
   			},
   			async imgshare(){
   				let _this = this
   				await this.$axios({
   					method:"post",
   					data:{
   						"url":window.location.href
   					},
   					url:"/get/weixin/fenxiang.do"
   				}).then((res)=>{
   					let sd = res.data.obj;
					let links= window.location.href+'&fx=1'
					// alert(links);
					let title=_this.$store.state.cartoon.cartoonName;
					let desc=_this.$store.state.cartoon.introduc;
					let imgurl =_this.$store.state.cartoon.sharePhoto;
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
					// alert(1)
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
								_this.sharecartoonsuccess();
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
								_this.sharecartoonsuccess();
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
   			async indexshare(){
   				let _this = this
   				this.GET_URL();
   				await this.$axios({
   					method:"post",
   					data:{
   						"url":this.$store.state.url
   					},
   					url:"/get/weixin/fenxiang.do"
   				}).then((res)=>{
   					let sd = res.data.obj;
					let links= this.$store.state.url+'&fx=1'
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
   			/*漫画分享成功*/
   			async sharecartoonsuccess(){
   				// alert(1)
				await this.$axios({
					method: "post",
					data: {
						"userId":this.$store.state.userId
					},
					url: "/app/comic/back/share.do"
				}).then((res)=>{
					// alert(res.data);
					Toast('分享成功');
					Indicator.close();
				})
			},
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
			}
		},
		mounted(){
			window.addEventListener('scroll',this.handleScroll);
			this.imgshare();
		},
		beforeRouteLeave(to,from,next){
			this.indexshare();
			next();
		},
		// activated(){
		// 	this.initData();
		// 	this.dislistdata();
		// 	console.log(1)
		// },
		// beforeRouteLeave(to,from,next){
		// 	// to.meta.keepAlive = true;
		// 	console.log(from.meta.keepAlive)
		// 	if(to.path == '/cartoon/episode'){
		// 		from.meta.keepAlive = false
		// 		// this.$destory();
		// 	}
		// 	next();
		// },
		components: {
			vhead,
			dislist,
			epsalert,
			vshare,
			dis,
			imgalert
		},
		// watch:{
		// 	'$route':function(to,from){
		// 		// console.log(from.path)
		// 		// console.log(to.path)
		// 		if(from.path == '/cartoon/episode' && to.path == '/cartoonimg'){
		// 			// this.cartoonId=this.$route.query.cartoonId,
		// 			// this.cartoonSetId=this.$route.query.id
		// 			// this.initData();
		// 			// this.dislistdata();
		// 		}
		// 	}
		// }
	}
</script>
<style lang="stylus" scoped>
.cartoonimg
	// height:100%;
	position:relative;
	// padding-bottom:2rem;
	// pointer-events:none;	
	background:#fff;
	font-size:0;
	// .clickbox
	// 	position:absolute;
	// 	bottom:0;
	// 	visibility:hidden;	
	// 	background:#f9f9f9;
	// 	display:flex;
	// 	justify-content:space-between;
	// 	item-aligns:center;
	// 	text-align:center;
	// 	width:100%;
	// 	height:1.6rem;
	// 	line-height:1.6rem;
	// 	font-size:0.59rem;
	// 	.prev
	// 		width:33.3333%;
	// 	.all
	// 		width:33.3333%;
	// 		border-left:1px solid #f1f1f1;
	// 		border-right:1px solid #f1f1f1;
	// 	.next
	// 		width:33.3333%;		
	.cartoonimgbox
		width:100%;
		// font-size:0;
		// line-height:0;
		// overflow:hidden;
		img
			// margin:0;
			// padding:0;
			display:block;
			width:100%;
			// vertical-align:top;
	.page
		display:flex;
		width:100%;
		margin:0.2rem 0;
		padding:0.4rem 0;	
		.left,.right
			flex:1;	
			heigth:1rem;
			text-align:center;
			font-size:0.64rem;
			.icons
				color:#ccc;
		.left
			border-right:1px solid #ccc;
	.carcontent
		display:flex;
		text-align:center;
		border-bottom:3px solid #f0eef9;
		padding-bottom:0.6rem;
		div
			flex:1;
			.icons
				font-size:0.78rem;
			.active
				color:baseColor;	
			span
				font-size:0.512rem;
				display:block;
	.carauthor
		.title
			padding:0.46rem 0;
			border-bottom: 1px solid #ccc;
			.des
				padding-left:0.46rem;
				width:100%;
				height:0.64rem;
				border-left:2px solid baseColor;
				font-size:0.46rem;
				font-family:PingFang-SC-Bold;
				font-weight:700;
		.con
			display:flex;
			padding:0.46rem;
			border-bottom:3px solid #f0eef9;
			.authorimg
				display:inline-block;
				width:1rem;
				height:1rem;
				border-radius:50%;
				img
					width:100%;
					height:100%;
					border-radius:50%;
			.name
				display:inline-block;
				margin-left:0.46rem;
				justify-content:center;
				font-size:0.512rem;
				// vertical-align:middle;
				line-height:1rem;			
	.cardiscusscon
		// padding-bottom:1.5rem;
		.title
			padding:0.46rem 0;
			border-bottom: 1px solid #ccc;
			.des
				padding-left:0.46rem;
				width:100%;
				height:0.64rem;
				border-left:2px solid baseColor;
				font-size:0.46rem;
				font-family:PingFang-SC-Bold;
				font-weight:700;					
	// .distext
	// 	position:fixed;
	// 	// position:absolute;	
	// 	bottom:0;
	// 	left:0;
	// 	width:100%;
	// 	z-index:99;
	// 	padding:0.2rem;
	// 	padding-left:0.66rem;
	// 	background:#fafafa;
	// 	input
	// 		width:80%;
	// 		padding:0.2rem;
	// 		font-size:0.59rem;
	// 		border:1px solid #ccc;	
	// 	.disbtn
	// 		margin-left:0.26rem;
	// 		padding:0.2rem;
	// 		font-size:0.59rem;
	.clickbox
		// position:absolute;
		// bottom:0;
		width:100%;
		// z-index:9;
		// height:1.6rem;
		line-height:1rem;
		background:baseColor;
		display:flex;
		align-items:center;
		justify-content:center;
		text-align:center;
		.clickitem
			flex:1;
			// margin-top:0.3rem;
			padding-top:0.3rem;	
			font-size:0.46rem;
			span
				display:block;
				color:#fff;							
	.epsalert
		position:fixed;
		background:rgba(0,0,0,0.4);
		top:0;
		z-index:999;
		width:100%;
		height:100%;
	.sharebox
		position:fixed
		top:0;
		z-index:999;
		width:100%;
		height:100%;
		background:rgba(0,0,0,0.4);
	.imgalertbox
		position:fixed;
		top:0;
		z-index:99;
		width:100%;
		height:100%;	
</style>