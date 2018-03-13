<template>
	<div class="discussbox">
		<div class="discusshead">
		    <nav>
		    	<ul>
		    		<li>
						<router-link :to="{path:'/discuss/newdis',query:{id:cartoonId}}" replace>最新评论</router-link>
					</li>
		    		<li>
		    			<router-link :to="{path:'/discuss/hotdis',query:{id:cartoonId}}" replace>最热评论</router-link>
		    		</li>
		    	</ul>
		    </nav>
		    <span class="icon-left icons" @click="returngo"></span>
	  	</div>
	  	<div class="discussview">
	  		<keep-alive>
	  			<router-view></router-view>
	  		</keep-alive>
	  	</div>
	  	<!-- <div class="dispagewrapper">
	  		<dispage></dispage>
	  	</div> -->
	  	<!-- <div class="distext">
			<input type="text" placeholder="评论一下吧!" v-model="discon">
			<span class="disbtn" @click="sendmessage">发送</span>
		</div> -->
	</div>
</template>
<script>
import { Toast } from 'mint-ui'
import dispage from '../common/dispage/dispage.vue'
	export default {
		data(){
			return {
				cartoonId:this.$route.query.id,
				discon:""	
			}
		},
		methods: {
			returngo: function(){
				this.$router.go(-1);
			},
			async sendmessage(){
				await this.$axios({
					method: "post",
					data: {
						"userId":this.$store.state.userId,
						"cartoonId":this.cartoonId,
						"commentInfo":this.discon
					},
					url: "/qpp/comic/add/allcomment.do"
				}).then((res)=>{
					this.discon="";
					Toast('评论成功');
				})
			}
		},
		components:{
			dispage
		}
	}
</script>
<style lang="stylus" scoped>
.discussbox
	position:relative;
	width:100%;
	height:100%;
	background:#fff;	
	.discusshead
		width:100%; 
		height:1.6rem;
		display:flex;
		z-index:999;
		position:fixed;
		top:0;
		left:0;
		align-items:center;
		justify-content:center;
		background:baseColor;
		nav
			ul
				font-size:0;
				li
					display:inline-block;
					padding:0.2rem 0;
					font-family:PingFang-SC-Bold;
					font-size:0.68rem;
					a
						color:rgba(255,255,255,0.6);
				.router-link-active
					display:inline-block;
					font-family:PingFang-SC-Bold;
					font-size:0.68rem;
					color:#fff;
					border-bottom:2px solid #fff;
				li + li
					margin-left:1rem;
		.icons
			position:absolute;
			padding:0.2rem;
			left:0.26rem;
			color:#fff;
			font-size:0.64rem;
	.discussview
		// padding-top:1.6rem;
		// margin-top:1.6rem;
		// padding-bottom:2rem;				
	// .dispagewrapper
	// 	// display:none;
	// 	// pointer-events:none;
	// 	// position:absolute;
	// 	// z-index:99;
	// 	// top:0;
	// 	// width:100%;
	// 	// height:100%;		
	// .distext
	// 	position:fixed;
	// 	bottom:0;
	// 	left:0;
	// 	width:100%;
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
</style>