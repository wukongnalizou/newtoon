<template>
	<div>
		<vhead :title="title" :hidereturn="hidereturn"></vhead>
		<div class="mydetail">
			<div class="myimg">
				<img :src="userimg">
			</div>
			<div class="myinfo">
				<div class="name">
					<span class="nametext">{{username}}</span>
					<span class="icon-vip" :class="{active:vip==1}"></span>
				</div>
				<div class="moneybox">
					<span class="money">咔咔豆:</span>
					<span class="num">{{money}}</span>
				</div>
			</div>
		</div>
		<div class="hr"></div>
		<div class="mylist">
			<div class="myitem" @click="tvip" style="border-bottom:none">
				<div class="title">
					<span class="icon-vip icons"></span>
					<span class="name">VIP特权</span>
				</div>
				<div class="detail">
					<span class="ldetail">七折观看，所有漫画</span>
					<span class="icon-right icons"></span>
				</div>
			</div>
			<div class="hr-ltitle"></div>
			<div class="myitem" @click="tmoney">
				<div class="title">
					<span class="icon-money icons"></span>
					<span class="name">充值</span>
				</div>
				<div class="detail">
					<span class="ldetail">充值送咔咔豆</span>
					<span class="icon-right icons"></span>
				</div>
			</div>
			<div class="myitem" @click="ttask" style="border-bottom:none">
				<div class="title">
					<span class="icon-task icons"></span>
					<span class="name">任务中心</span>
				</div>
				<div class="detail">
					<span class="ldetail">做任务得咔咔豆</span>
					<span class="icon-right icons"></span>
				</div>
			</div>
			<div class="hr-ltitle"></div>
			<div class="myitem" @click="tmycircle">
				<div class="title">
					<span class="icon-mycircle icons"></span>
					<span class="name">我的混圈</span>
				</div>
				<div class="detail">
					<span class="ldetail"></span>
					<span class="icon-right icons"></span>
				</div>
			</div>
			<div class="myitem" @click="tmessage">
				<div class="title">
					<span class="icon-message icons"></span>
					<span class="name">我的消息</span>
				</div>
				<div class="detail">
					<span class="ldetail"></span>
					<span class="icon-right icons"></span>
				</div>
			</div>
			<div class="myitem" @click="thistory"  style="border-bottom:none">
				<div class="title">
					<span class="icon-history icons"></span>
					<span class="name">历史记录</span>
				</div>
				<div class="detail">
					<span class="ldetail"></span>
					<span class="icon-right icons"></span>
				</div>
			</div>
			<div class="hr-ltitle"></div>
			<div class="myitem" @click="tbusiness">
				<div class="title">
					<span class="icon-business icons"></span>
					<span class="name">商务合作</span>
				</div>
				<div class="detail">
					<span class="ldetail"></span>
					<span class="icon-right icons"></span>
				</div>
			</div>
			<div class="myitem" @click="tfeedback" style="border-bottom:none">
				<div class="title">
					<span class="icon-feedback icons"></span>
					<span class="name">投诉建议</span>
				</div>
				<div class="detail">
					<span class="ldetail"></span>
					<span class="icon-right icons"></span>
				</div>
			</div>
			<div class="hr"></div>
		</div>
			<!-- <transition :name="transitionName">
				<router-view class="indexrouter"></router-view>
			</transition> -->
	</div>
</template>
<script>
	import vhead from '../common/thead/thead.vue'
	import {mapMutations} from 'vuex'
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				title: '我的',
				hidereturn:true,
				// ismy:0,
				// transitionName:''
			}
		},
		computed: {
	      ...mapState([
	        'username',
	        'userimg',
	        'vip',
	        'money'
	      ])
   		 },
		created() {
			this.initData();
			// this.tasktable();
		},
		methods: {
			...mapMutations([
		        'RECORD_MYINFO'
		    ]),
			async initData(){
				await this.$axios({
					method: "post",
					data:{
						"userId":this.$store.state.userId
					},
					url: "/qpp/user/get/userinfo/byuserid.do"
				}).then((res)=>{
					this.RECORD_MYINFO(res.data.obj);
				})
			},
			// /*生成任务表*/
			// async tasktable(){
			// 	await this.$axios({
			// 		method: "post",
			// 		data:{
			// 			"userId":this.$store.state.userId
			// 		},
			// 		url: "/qpp/comic/add/cartoon/task.do"
			// 	}).then((res)=>{

			// 	})
			// },
			tvip:function(){
				this.$router.push('/vip');
			},
			tmoney:function(){
				this.$router.push('/money');
			},
			ttask:function(){
				this.$router.push('/task');
			},
			thistory:function(){
				this.$router.push('/history');
			},
			tmycircle:function(){
				this.$router.push('/mycircle');
			},
			tmessage:function(){
				this.$router.push('/message');
			},
			tfeedback:function(){
				this.$router.push('/feedback');
			},
			tbusiness:function(){
				this.$router.push('/business');
			}
		},
		components: {
			vhead
		},
		// watch: {
		//   '$route' (to, from) {
		//     const toDepth = to.path.split('/').length
		//     const fromDepth = from.path.split('/').length
		//     this.ismy = toDepth < fromDepth ? 0 : 1;
		//     this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
		//   }
		// }
	}
</script>
<style  lang="stylus" scoped>
	.mydetail
		background:#fff;
		height:3.2rem;
		padding:0.46rem 0.86rem;
		font-size:0;
		display:flex;
		align-items:center;
		.myimg
			width:1.92rem;
			height:1.92rem;
			img
				width:100%;
				height:100%;
				border-radius:50%;
		.myinfo
			margin-left:0.4rem;
			.name
				.nametext
					font-size:0.64rem;
					font-weight:700;
				.icon-vip
					margin-left:0.3rem;
					font-size:0.64rem;
					color:#ccc;
				.active
					color:#ffa400;
			.moneybox
				margin-top:0.2rem;
				.money
					color:#ccc;
					font-size:0.512rem;
				.num
					margin-left:0.2rem;
					color:#ccc;
					font-size:0.64rem;					
	.hr-ltitle
		width:100%;
		height:0.768rem;
		background:#f2f2f2;
		margin-top:-1px;
	.mylist
		font-size:0;
		background:#fff;
		.myitem
			position:relative;
			display:flex;
			align-items:center;
			padding:0.46rem 0;
			margin:0 0.46rem;
			border-bottom:1px solid #ccc; 
			box-sizing:border-box;
			.title
				.icons
					font-size:0.768rem;
					vertical-align:middle;
				.icon-vip
					color:#6ed5de;
				.name
					margin-left:0.46rem;
					font-size:0.58rem;
					font-weight:700;
					vertical-align:middle;
			.detail
				position:absolute;
				right:0.46rem;
				.ldetail
					font-size:0.512rem;
					color:#ccc;
				.icons
					margin-left:0.46rem;
					font-size:0.512rem;	
					color:#ccc;
	// .indexrouter
	// 	position:absolute;
	// 	top:0;
	// 	z-index:999;
	// 	width:100%;
	// 	transition: all .5s ease;  
	// .slide-left-enter,
	// .slide-right-leave-active 
	// 	opacity:1;
	// 	transform: translateX(100%);
	// .slide-left-leave-active,
	// .slide-right-enter
	// 	opacity:1;
	// 	transform: translateX(100%);					
								
</style>