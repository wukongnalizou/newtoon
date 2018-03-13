<template>
	<div>
		<vhead :title="title"></vhead>
		<div class="firstdis">
			<div class="detailimg">
				<img :src="firstdis.userEntity.headimgurl">
			</div>
			<div class="detailcon">
				<div class="detailname">{{firstdis.userEntity.username}}</div>
				<div class="detailcontent">{{firstdis.cartoonSetComment.commentInfo}}</div>
				<div class="detailbottom">
					<div class="time">{{firstdis.cartoonSetComment.commentDate}}</div>
					<div class="good">
						<span :data-state="firstdis.veryOk" @click="goodclick(firstdis.cartoonSetComment.id)">
							<span class="icon-good" :class="{goodactive:firstdis.veryOk==1}"></span>
							<span class="num">{{firstdis.cartoonSetComment.okCount}}</span>
						</span>	
						<!-- <span class="icon-discuss hou"></span>
						<span>{{firstdis.cartoonSetComment.commentCount}}</span> -->
					</div>
				</div>
			</div>
		</div>
		<div>
			<dis @sendmessage="sendmessage" ref="dis"></dis>
		</div>
		<div class="disdetaillist" v-if="disdetails != ''">
			<div class="disdetailcount">评论:<span>({{firstdis.cartoonSetComment.commentCount}})</span></div>
			<div class="disdetailitem" v-for="disdetail in disdetails">
				<div class="detailimg">
					<img :src="disdetail.user.headimgurl">
				</div>
				<div class="detailcon">
					<div class="detailname">{{disdetail.user.username}}</div>
					<div class="detailcontent">{{disdetail.cartoonComment.commentInfo}}</div>
					<div class="detailbottom">{{disdetail.cartoonComment.commentDate}}</div>
				</div>
			</div>
		</div>
		<div class="nodata" v-else>暂无评论</div>
		<!-- <div class="distext">
			<input type="text" placeholder="评论一下吧!" v-model="discusscon">
			<span class="disbtn" @click="sendmessage">发送</span>
		</div> -->
	</div>
</template>
<script>
import vhead from '../common/thead/thead.vue'
import dis from '../common/dis/dis.vue'
import { Toast } from 'mint-ui'
export default {
	data() {
		return {
			title: "评论详情",
			disdetails:[],
			firstdis:Object,
			discusslistpage:"1",
			discusscon:""
		}
	},
	created() {
		this.initData();
		this.discusslist();
	},
	methods: {
		/*漫画一级评论获取*/
		async initData(){
			await this.$axios({
				method: "post",
				data: {
					"userId": this.$store.state.userId,
					"id":this.$route.query.id
				},
				url: "/qpp/comic/get/allcomment/son/byid.do"
			}).then((res)=>{
				// this.disdetails = res.data.disdetails;
				this.firstdis = res.data.obj;
			})
		},
		/*漫画二级评论获取*/
		async discusslist(){
			await this.$axios({
				method: "post",
				data: {
					"userId":this.$store.state.userId,
					"id":this.$route.query.id,
					"nowPage":this.discusslistpage
				},
				url: "/qpp/comic/get/comment/allcomment/son.do"
			}).then((res)=>{
				this.disdetails = res.data.obj;
			})
		},
		/*发送漫画评论*/
		async sendmessage(discusscon){
			await this.$axios({
				method: "post",
				data: {
					"userId":this.$store.state.userId,
					"id":this.$route.query.id,
					"commentInfo":discusscon
				},
				url: "/qpp/comic/add/comment/comment/son.do"
			}).then((res)=>{
				this.$refs.dis.emptymessage();
				this.discusslist();
				Toast('评论成功');
				this.initData();
			})
		},
		/*漫画评论点赞*/
		async goodclick(id,state){
				let nownode = event.currentTarget.children[1];
				let nowicon = event.currentTarget.children[0];
				let nowdata = event.currentTarget;
				let datastate = nowdata.getAttribute('data-state');
				await this.$axios({
					method: "post",
					url : "/qpp/comic/add/son/okcount.do",
					data: {
						"userId":this.$store.state.userId,
						"id":id,
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
	},
	components:{
		vhead,
		dis
	}
}	
</script>
<style lang="stylus">
	.firstdis
		display:flex;
		padding:0.46rem;
		font-size:0;
		background:#fff;
		.detailimg
			width:1.28rem;
			height:1.28rem;	
			img
				width:100%;
				height:100%;
				border-radius:50%;
		.detailcon
			flex:1;
			margin-left:0.2rem;
			padding-right:0.46rem;
			display:inline-block;
			.detailname
				font-size:0.59rem;
			.detailcontent
				margin-top:0.2rem;
				font-size:0.512rem;
			.detailbottom
				position:relative;
				margin-top:0.4rem;
				.time
					display:inline-block;
					font-size:0.512rem;
					color:#ccc;
				.good
					position:absolute;
					top:0
					right:0.46rem;
					display:inline-block;
					font-size:0.512rem;
					span
						color:#ccc;
					.hou
						margin-left:0.4rem;
					.goodactive
						color:baseColor;			
	.disdetaillist
		margin-top:0.2rem;
		background:#fff;
		.disdetailcount
			padding-top:0.2rem;
			padding-left:0.46rem;
			font-size:0.59rem;
			span
				margin-left:0.2rem;
				color:#989898;
		.disdetailitem
			display:flex;
			padding:0.46rem;
			padding-left:0.86rem;
			font-size:0;
			border-bottom:1px solid #d9d9d9;
			.detailimg
				width:1.28rem;
				height:1.28rem;
				img
					width:100%;
					height:100%;
					border-radius:50%;
			.detailcon							
				flex:1;
				margin-left:0.2rem;
				padding-right:0.46rem;
				display:inline-block;
				.detailname
					font-size:0.59rem;
				.detailcontent
					margin-top:0.2rem;
					font-size:0.512rem;
				.detailbottom
					margin-top:0.4rem;
					font-size:0.512rem;
					color:#ccc;					
	.nodata
		padding:0.46rem;
		text-align:center;
		font-size:0.512rem;					
	.distext
		position:fixed;
		bottom:0;
		left:0;
		width:100%;
		padding:0.2rem;
		padding-left:0.66rem;
		background:#fafafa;
		input
			width:80%;
			padding:0.2rem;
			font-size:0.59rem;
			border:1px solid #ccc;	
		.disbtn
			margin-left:0.26rem;
			padding:0.2rem;
			font-size:0.59rem;				
</style>
