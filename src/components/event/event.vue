<template>
	<div class="firstloadbox">
		<div class="eventimg">
			<img src="http://ox143yv1l.bkt.clouddn.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20180213160130.jpg">
		</div>
		<div class="eventbtnbox">
			<div class="eventbtn" @click="tomoney">解锁新年福利</div>
			<div class="eventdetail">新年福利送送送</div>
		</div>
		<!-- <div class="head">
			<img src="../../../static/tiger.png">
		</div>
		<div class="content">
			<h1>每日111</h1>
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
			</ul>
			<div class="morebtn" @click="moretask">更多任务</div>
			<div class="sharecon">*分享得更多剧点</div>
		</div> -->
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
		// this.getconcern();
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
		},
		tomoney:function(){
			this.$router.push('/money');
		}
	}
}
</script>
<style lang="stylus" scoped>
.firstloadbox
	width:100%;
	height:100%;
	position:relative;
	margin-top:2.6rem;
	.eventimg
		width:12.608rem;
		height:14.12rem;
		margin:0 auto;
		img
			width:100%;
			height:100%;
	.eventbtnbox
		padding-top:0.85rem;
		width:12.608rem;
		height:4.69rem;
		margin:0 auto;
		background:#ffde97;
		border-bottom-right-radius:0.8rem;
		border-bottom-left-radius:0.8rem;
		.eventbtn
			width:9rem;
			margin:0 auto;
			height:1.92rem;
			line-height:1.92rem;
			background:#ff2323;
			border-radius:0.4rem;
			color:#fff;
			font-size:0.68rem;
			font-weight:700;
			text-align:center;
		.eventdetail
			width:9rem;
			margin:0 auto;
			text-align:center;
			margin-top:0.2rem;
			font-size:0.54rem;
			color:#fff;	
	.icondel
		position:absolute;
		top:0;
		padding:0.2rem;
		right:1.8rem;
		color:#fff;
		font-size:0.59rem;
		font-weight:700;				
</style>