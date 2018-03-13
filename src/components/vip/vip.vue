<template>
	<div class="vipbox">
		<vhead :title="title"></vhead>
		<div class="vipbanner">
			<img src="../../assets/vipbanner.jpg" alt="">
		</div>
		<div class="mydetail">
			<div class="myimg">
				<img :src="headimg">
			</div>
			<div class="myinfo">
				<div class="name">
					<span class="nametext">{{username}}</span>
					<span class="icon-vip" :class="{active:vipId==1}"></span>
					<span class="stop" v-if="vipId==1">{{endDate}}到期</span>
				</div>
				<div class="moneybox">
					<span class="money">开通vip，观看七折</span>
				</div>
			</div>
		</div>
		<div class="vipbtn">
			<span @click="showalert">开通vip,观看七折</span>
		</div>
		<div class="viplist">
			<ul>
				<li>
					<div class="vipitem">
						<div class="vipimg">
							<span class="icon-book"></span>
						</div>
						<div class="vipdetail">
							<h1>观看漫画特权</h1>
							<p>仅限七折观看所有漫画</p>
						</div>
						<!-- <div class="vipnext">
							<span class="icon-right"></span>
						</div> -->
					</div>
				</li>
			</ul>
		</div>
		<div class="vipalertbox" v-if="alert" @touchmove.prevent>
			<vipalert @vipalertclose="vipalertclose"></vipalert>
		</div>
	</div>
</template>
<script>
import vhead from '../common/thead/thead.vue'
import vipalert from '../common/vipalert/vipalert.vue'
import {mapState} from 'vuex'
export default {
	data() {
		return {
			title: "vip特权",
			alert:false,
			headimg:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2607835674,2618955313&fm=27&gp=0.jpg",
			username:"",
			vipId:"",
			endDate:"",
		}
	},
	// computed: {
	//       ...mapState([
	//         'username',
	//         'userimg',
	//         'vip',
	//         'enddate'
	//       ])
 //   	},
   	created(){
   		this.initData();
   	},
   	methods: {
   		tfreecartoon: function(){
   			this.$router.push('freecartoon');
   		},
   		vipalertclose: function(){
   			this.alert = false;
   		},
   		showalert: function(){
   			this.alert = true;
   		},
   		async initData(){
			await this.$axios({
				method: "post",
				data:{
					"userId":this.$store.state.userId
				},
				url: "/qpp/user/get/userinfo/byuserid.do"
			}).then((res)=>{
				this.headimg = res.data.obj.headimgurl;
				this.username = res.data.obj.username;
				this.vipId = res.data.obj.vipId;
				this.endDate = res.data.obj.endDate;
			})
		},
   	},
	components: {
		vhead,
		vipalert
	}
}
</script>
<style lang="stylus">
.vipbox
	height:100%;
	background:#fff;
	.vipbanner
		width:100%;
		height:5rem;
		img
			width:100%;
			height:100%;
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
			flex:1;
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
			.stop
				margin-left:0.2rem;
				font-size:0.49rem;
				color:#ccc;				
	.vipbtn
		width:100%;
		padding-bottom:0.86rem;
		text-align:center;
		background:#fff;
		span
			display:inline-block;
			width:80%;
			height:1.4rem;
			line-height:1.4rem;
			background:#FEC40B;
			border-radius:0.4rem;
			font-size:0.59rem;
			color:#fff;			
	.viplist
		margin-top:0.46rem;
		font-size:0;
		ul
			li
				background:#fff;
				.vipitem
					display:flex;
					position:relative;
					padding:0.46rem;
					align-items:center;
					.vipimg
						span
							font-size:2.13rem;
					.vipdetail
						margin-left:0.46rem;
						h1
							font-size:0.64rem;
						p
							margin-top:0.2rem;
							font-size:0.512rem;
							color:#989898;
					.vipnext
						position:absolute;
						right:0.46rem;
						font-size:0.89rem;
						span
							color:#989898;						
	.vipalertbox
		// display:none;
		position:absolute;
		background:rgba(0,0,0,0.4);
		top:0;
		width:100%;
		height:100%;					
</style>