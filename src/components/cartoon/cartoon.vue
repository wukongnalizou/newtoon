<template>
	<!-- <scroll :data="cartoonlist" :pullup="pullup" @scrollToEnd="loadmore" class="scrollbox"> -->
		<div class="cartoonwrapper" ref="wrapper">
			<div class="chead">
				<div class="cheadimg">
					<img :src="cartoon.introduction">
				</div>
				<div class="returnbtn" @click="returnbtn">
					<span class="icon-left"></span>
				</div>
				<div class="concernbtn" @click="concern" :class="[followcartoon==0?'wconcern':'yconcern']">{{followcartoon == 0?'+关注':'已关注'}}</div>
				<div class="headbottom">
					<div class="name">{{cartoon.cartoonName}}</div>
					<div class="typelist">
						<div class="type" v-for="type in cartoontype">{{type.carrtoonType.cartoonType}}</div>
					</div>
					<div class="right">
						<div class="little">已关注:{{cartoon.followCount}}</div>
						<div class="little">总播放:{{cartoon.playCount}}</div>
					</div>
				</div>
			</div>
			<div class="carnav">
				<div class="item">
					<router-link :to="{path:'/cartoon/detail',query:{id:this.$route.query.id}}" replace>详情</router-link>
				</div>
				<div class="item">
					<router-link :to="{path:'/cartoon/episode',query:{id:this.$route.query.id}}" replace>选集</router-link>
				</div>
			</div>
			<div class="carcon">
				<!-- <keep-alive> -->
					<router-view></router-view>
				<!-- </keep-alive> -->
			</div>
			<div class="cartoonbtn">
				<div class="left">
					<span>{{continueitem.titile}}</span>
					<span>{{continueitem.details}}</span>
				</div>
				<div class="right" @click="choicecartoon(continueitem.cartoonId,continueitem.id,continueitem.moneyState)">{{continuestate==1?'开始阅读':'继续阅读'}}</div>
			</div>
			<!-- <div class="epsalert" v-if="epsalert" @touchmove.prevent>
				<epsalert @epsalertclose="epsalertclose"></epsalert>
			</div> -->
		</div>
	<!-- </scroll> -->
</template>
<script>
// import epsalert from '../common/epsalert/epsalert.vue'
import scroll from '../common/scroll/scroll.vue'
import { mapState } from 'vuex'
import {mapMutations} from 'vuex'
	export default {
		data() {
			return {
				detail: Object,
				// continuename:'',
				// continuetitle:'',
				// continueid:'',
				continueitem:Object,
				continuestate:"",
				pullup:true,
				// isconcern:'0',
				alert:true
			}
		},
		computed:{
			...mapState([
	        'cartoon',
	        'cartoontype',
	        'followcartoon',
	        'indexstate'
	      ])
		},
		created() {
			this.initData();
			this.continuesee();
			// this.computedh();                                                        
		},
		methods: {
			...mapMutations([
				/*记录漫画信息*/
		        'RECORD_CARTOON',
		        'RECORD_CARTOONTYPE',
		        'RECORD_FOLLOWCARTOON',
		        'UPDATE_STATE'
		    ]),
		    /*获取漫画信息*/
			async initData(){
				await this.$axios({
					method: "post",
					url: "/qpp/comic/get/cartoon/head.do",
					data: {
						"userId":this.$store.state.userId,
						"id":this.$route.query.id
					}
				}).then((res)=>{
					// this.detail = res.data.obj;
					// this.isconcern = res.data.obj.followCartoon;
					this.RECORD_CARTOON(res.data.obj.cartoon);
					this.RECORD_CARTOONTYPE(res.data.obj.cartoonAllType);
					this.RECORD_FOLLOWCARTOON(res.data.obj.followCartoon);
					// var cart = res.data.page;
					// for(let i=0; i<cart.length;i++){
					// 	if(cart[i].watchState == 1){
					// 		this.continuename = cart[i].details;
					// 		this.continuetitle = cart[i].titile;
					// 		this.continueid = cart[i].id;
					// 	}
					// }
				})
				this.$nextTick(() => {
					window.scrollTo(0, 1)
					window.scrollTo(0, 0)
				})
			},
			// async loadmore(){
			// 	console.log(1)
			// },
			// computedh:function(){
			// 	// console.log(document.body.scrollTop)
			// 	let scrollbox = document.querySelector('.cartoonwrapper');
			// 	document.addEventListener('scroll',function(e){
			// 		if(document.documentElement.clientHeight+document.documentElement.scrollTop == document.documentElement.scrollHeight){
			// 			// console.log(e.scrollHeight);
			// 		}
			// 	})
			// },
			/*继续阅读跳转*/
			choicecartoon(cartoonId,id,state){
          		this.$router.push('/cartoonimg?id='+id+'&cartoonId='+cartoonId+'&moneyState='+state);
        	},
        	/*路由回退*/
			returnbtn(){
				// if(this.indexstate == 1){
				// 	this.UPDATE_STATE(0);
				// 	this.$router.push('/main/indexmain/index')
				// }else{
					this.$router.go(-1);
				// }
			},
			/*漫画关注*/
			async concern(){
				await this.$axios({
					method: "post",
					url: "/qpp/comic/follow/cartoon.do",
					data: {
						"userId":this.$store.state.userId,
						"id":this.$route.query.id,
						"followState":this.followcartoon
					}
				}).then((res)=>{
					this.RECORD_FOLLOWCARTOON(res.data.obj.followCartoon);
				})
			},
			/*获取继续阅读数据*/
			async continuesee(){
				await this.$axios({
					method: "post",
					url: "/qpp/comic/get/goon/myhistoryRecord.do",
					data: {
						"userId":this.$store.state.userId,
						"id":this.$route.query.id
					}
				}).then((res)=>{
					// this.isconcern = res.data.obj.followCartoon;
					this.continueitem = res.data.obj;
					this.continuestate = res.data.msg;
				})
			},
			epsalertclose: function(){
   				this.alert = false;
   			},
   			showalert: function(){
   				this.alert = true;
   				document.addEventListener('touchmove',false);
   			}
		},
		components:{
			// epsalert
			scroll
		},
		// mounted(){
		// 	this.computedh();
		// },
		watch: {
			/*获取路由状态改变，子路由切换重新获取数据*/
			'$route' (to, from) {
			    this.initData();
			    document.body.scrollTop = 0;
			    // location.reload();
			    // console.log(to.fullPath)
			    // this.$router.push(to.fullPath);
			}
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
// .scrollbox
// 	height:100%;
	.cartoonwrapper
		// position:absolute;
		position:relative;	
		top:0;
		left:0;
		z-index:5;
		width:100%;
		height:100%;
		// overflow: scroll;
		// -webkit-overflow-scrolling: touch;
		background:#fff;
		.chead
			position:relative;
			width: 100%;
			height:9.4rem;
			.cheadimg
				position:absolute;
				width: 100%;
				height: 100%;
				img
					width: 100%;
					height: 100%;
			.returnbtn
				position:absolute;
				padding: 0.46rem 0.64rem;
				span
					font-size:0.64rem;
					color:#fff;
			.concernbtn
				position:absolute;
				top: 0.76rem;
				right:0.64rem;
				width:2.35rem;
				height:0.9rem;
				line-height:0.9rem;
				text-align:center;
				color:#fff;
				font-size:0.42rem;
				border-radius: 0.5rem;
			.wconcern
				background:baseColor;	
			.yconcern
				background:rgba(204,204,204,0.7);	
			.headbottom
				position:absolute;
				bottom:0;
				padding-left:0.42rem;
				width:100%;
				height:3.41rem;
				background:-webkit-gradient(linear, 0 0, 0 bottom, from(rgba(3,0,0,0)), to(rgba(0,0,0,0.8)));
				.name
					margin-top:0.42rem;
					font-size:0.768rem;
					color:#fff;
				.typelist
					display:flex;
					.type
						margin-top:0.44rem;
						width:2.13rem;
						height:1.06rem;
						margin-left:0.2rem;
						line-height:1.06rem;
						border-radius:0.53rem;
						border:1px solid #fff;
						font-size:0.512rem;
						text-align:center;
						color:#fff;	
				.right
					position:absolute;
					bottom:0.42rem;
					right:0.64rem;
					.little
						font-size:0.512rem;
						color:#fff;
		.carnav
			display:flex;
			width:100;
			// height:1.71rem;
			justify-content:center;
			align-items:center;
			box-sizing:border-box;
			-moz-box-sizing:border-box;
			-webkit-box-sizing:border-box;
			background:rgba(240,239,245,1);
			border-bottom: 1px solid #ccc;
			.item
				font-size:0;
				flex:1;
				text-align:center
				box-sizing:border-box;
				a
					display:inline-block;
					// padding:
					width:4.26rem;
					padding:0.4rem 0rem;
					box-sizing:border-box;
					// -moz-box-sizing:border-box;
					// -webkit-box-sizing:border-box;
					font-size:0.68rem;
					font-family:PingFang-SC-Bold;
					color:#78777a;
				.router-link-active
					color:#000;
					box-sizing:border-box;
					-moz-box-sizing:border-box;
					-webkit-box-sizing:border-box;
					border-bottom:2px solid baseColor;	
		.carcon
			padding-bottom:2rem;
			background:#fff;			
		.cartoonbtn
			position:fixed;
			bottom:0;
			left:0;
			z-index:99;
			display:flex;
			align-items:center;
			justify-content:center;
			text-align:center;
			font-size:0;
			width:100%;
			// border-top:1px solid #ccc;
			// box-sizing:border-box;
			// height:2.09rem;	
			.left
				width:65%;
				padding: 0.47rem 0;
				font-size:0.64rem;
				background:#F8F9FB;
			.right
				width:35%;
				padding: 0.47rem 0;
				font-size:0.64rem;
				background:	baseColor;
				color:#fff;		
		.epsalert
			position:absolute;
			background:rgba(0,0,0,0.4);
			top:0;
			width:100%;
			height:100%;		
</style>