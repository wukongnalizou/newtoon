<template>
	<div class="firstloadbox">
		<div class="head">
			<img src="../../../static/tiger.png">
		</div>
		<div class="content">
			<h1>每日</h1>
			<p>登录奖励</p>
			<div class="sharecon">快去领取奖励吧！</div>
			<div class="quan">
				<img src="../../../static/quan.png">
			</div>
			<h1 v-if="cartoons.length>0">更新提醒</h1>
			<ul v-if="cartoons.length>0">
				<li v-for="cartoon in cartoons" @click="tocartoon(cartoon.cartoon.id)">
					<div>
						<img :src="cartoon.cartoon.midelPhoto">
					</div>
				</li>
				<!-- <li @click="tocartoon(cartoon.cartoon.id)">
					<div>
						<img :src="cartoon.cartoon.midelPhoto">
					</div>
				</li> -->
			</ul>
			<div class="morebtn" @click="moretask">更多任务</div>
			<div class="sharecon">*分享得更多剧点</div>
		</div>
		<span class="icon-close icondel" @click="close"></span>
	</div>
</template>
<script>
import {mapMutations} from 'vuex'
export default {
	data(){
		return {
			cartoons:[]
		}
	},
	created(){
		this.getconcern();
	},
	methods:{
		...mapMutations([
        /*记录漫画信息*/
            'UPDATE_FIRSTLOAD'
        ]),
		close:function(){
			this.UPDATE_FIRSTLOAD("0");
		},
		moretask:function(){
			this.UPDATE_FIRSTLOAD("0");
			this.$router.replace('/my');
		},
		async getconcern(){
			await this.$axios({
				method: "post",
				data:{
					"userId":this.$store.state.userId
				},
				url: "/qpp/comic/get/myBookshelf/news.do",
			}).then((res)=>{
				this.cartoons = res.data.obj;
			})
		},
		tocartoon:function(id){
			this.$router.push('/cartoon/detail?id='+id);
		}
	}
}
</script>
<style lang="stylus">
.firstloadbox
	width:100%;
	height:100%;
	position:relative;
	.head
		position:absolute;
		top:2.9rem;
		left:6.2rem;
		z-index:999;
		width:4.068rem;
		height:4.068rem;
		img
			width:100%;
			height:100%;
	.content
		position:absolute;
		padding-bottom:0.4rem;
		top:6rem;
		// bottom:5rem;
		width:9.8rem;
		// height:14.3rem;
		left:3.09rem;
		// margin:0 auto;
		background:#fff;
		border-radius:0.4rem;
		h1
			margin-top:0.34rem;
			font-size:0.68rem;
			color:#ffc438;
			font-weight:200;
			text-align:center;
		p
			font-size:0.68rem;
			color:#ffc438;
			font-weight:200;
			text-align:center;
		.quan
			width:8.448rem;
			height:2.935rem;
			margin:0 auto;
			margin-top:0.2rem;
			img
				width:100%;
				height:100%;
		ul
			width:9.17rem;
			margin:0 auto;
			display:flex;
			li
				flex:1;
				div
					width:2.47rem;
					height:3.623rem;
					margin:0 auto;
					img
						width:100%;
						height:100%;
		.morebtn
			width:8.448rem;
			height:1.28rem;
			margin:0 auto;
			margin-top:0.4rem;
			line-height:1.28rem;
			border-radius:0.2rem;
			color:#fff;
			background:#ffc438;
			text-align:center;
			font-size:0.59rem;
		.sharecon
			margin-top:0.2rem;
			margin-left:0.68rem;
			font-size:0.42rem;
			color:#ffc438;										
	.icondel
		position:absolute;
		padding:0.2rem;
		right:2.2rem;
		top:5rem;
		font-weight:700;
		color:#fff;
		font-size:0.64rem;
				
</style>