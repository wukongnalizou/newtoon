<template>
	<div class="detailbox">
		<div class="introdu">
			<div class="title">作品简介</div>
			<div class="content">{{cartoon.introduc}}</div>
			<div class="author">
				<span>作者:</span>
				<span class="imgbox">
					<img :src="cartoon.cartoonAuthorPic" alt="">
				</span>
				<span class="authorname">{{cartoon.cartoonAuthor}}</span>
			</div>
		</div>
		<div class="like">
			<div class="title">猜你喜欢</div>
			<div class="another" @click="getanother">换一批</div>
			<div class="likebox">
				<div class="likeitem" v-for="like in likes" @click="tcartoon(like.id)">
					<div class="likeimg">
						<img :src="like.midelPhoto" >
					</div>
					<div class="likename">{{like.cartoonName}}</div>
				</div>
			</div>
		</div>
		<!-- <div class="detaildiscuss">
			<div class="title">评论</div>
			<div class="discusstext">
				<div class="inputdis">
					<input type="text" placeholder="请尽情吐槽吧！" v-model="discusscon">
				</div>
				<div class="send" @click="sendmessage">发送</div>
			</div>
			<div class="discusscon">
				<dislist :discusses="discusses" :distotalpage="distotalpage" @goodclick="goodclick" @tdisdetail="tdisdetail" @alldis="alldis"></dislist>
			</div>
		</div> -->
	</div>
</template>
<script>
import { mapState } from 'vuex'
import dislist from '../common/dislist/dislist.vue'
import { Toast } from 'mint-ui'
	export default {
		data() {
			return {
				likes:[],
				discusses: Object,
				likepage:1,
				liketotalpage:"",
				discusscon:"",
				distotalpage:""
			}
		},
		created() {
			this.liketype();
			// this.discuss();
		},
		computed:{
			...mapState([
	        'cartoon'
	      ])
		},
		methods: {
			/*猜你喜欢类型推荐*/
			async liketype(){
				await this.$axios({
					method: "post",
					url : "/qpp/comic/get/cartoon/love.do",
					data: {
						"userId":this.$store.state.userId,
						"nowPage":this.likepage
					}
				}).then((res)=>{
					// document.body.scrolltop=0;
					this.likes = res.data.obj;
					this.likepage = res.data.nowpage+1;
					this.liketotalpage = res.data.totalpage;
				})
			},
			/*换一批*/
			getanother:function(){
				if(this.likepage > this.liketotalpage){
					Toast('暂无更多数据');
				}else{
					this.liketype();
				}
			},
			/*漫话详情评论获取*/
			async discuss(){
				await this.$axios({
					method: "post",
					data:{
						"userId": this.$store.state.userId,
						"cartoonId":this.$route.query.id,
						"nowPage":1,
						"bestNew":0
					},
					url : "/qpp/comic/get/allcomment.do"
				}).then((res)=>{
					this.discusses = res.data.obj;
					this.distotalpage = res.data.totalpage;
					// this.$emit('detaildata',this.discusses);
				})
			},
			/*猜你喜欢跳转*/
			tcartoon:function(id){
				this.$router.replace('/cartoon?id='+id);
			},
			/*全部评论*/
			alldis:function(arg){
				// console.log(id);
				this.$router.push('/discuss?id='+arg[0]);
			},
			/*发送漫画详情评论*/
			async sendmessage(){
				await this.$axios({
					method: "post",
					url: "/qpp/comic/add/allcomment.do",
					data: {
						"userId": this.$store.state.userId,
						"cartoonId":this.$route.query.id,
						"commentInfo":this.discusscon
					}
				}).then((res)=>{
					this.discusscon = "";
					Toast('评论成功');
					this.discuss();
				})
			},
			/*漫画详情评论点赞*/
			async goodclick(cdata){
				let nownode = document.getElementById(cdata[1]).children[1];
				let nowicon = document.getElementById(cdata[1]).children[0];
				let nowdata = document.getElementById(cdata[1]);
				let datastate = nowdata.getAttribute('data-state');
				await this.$axios({
					method: "post",
					url : "/qpp/comic/add/okcount.do",
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
						nownode.innerText = parseInt(nownode.innerText) + 1; 
					}else{
						nowicon.style.color = '#b9b9b9';
						nownode.innerText = parseInt(nownode.innerText) - 1; 
					}
				})
			},
			/*漫画详情评论详情跳转*/
			tdisdetail:function(id){
				this.$router.push('/disdetail?id='+id);
			},
		},
		components: {
			dislist
		},
		watch: {
			'$route' (to, from) {
			    this.discuss();
			    // location.reload();
			    // console.log(to.fullPath)
			    // this.$router.push(to.fullPath);
			}
		}
	}
</script>
<style lang="stylus" scoped>
.detailbox
	.introdu
		width:100%;
		// height:7.36rem;
		padding: 0.46rem 0.64rem;
		border-bottom:4px solid #f0eef9;
		.title
			font-size:0.68rem;
			font-family:PingFang-SC-Bold;
			font-weight:600;
			color:#000;
		.content
			margin-top:0.512rem;
			font-size:0.512rem;
			font-weight:600;
		.author
			display:flex;
			align-items:center;
			font-size:0.512rem;
			margin-top:0.3rem;
			.imgbox
				// margin-top:0.3rem;
				// margin-left:0.2rem;
				display:inline-block;
				width: 1rem;
				height:1rem;
				img
					// display:inline-block;
					width: 100%;
					height:100%;
					border-radius:50%;	
			.authorname
				margin-left:0.2rem;
	.like
		position:relative;
		.title
			margin-top:0.46rem;
			padding-left:0.46rem;
			width:100%;
			height:0.64rem;
			border-left:2px solid baseColor;
			font-size:0.46rem;
			font-family:PingFang-SC-Bold;
			font-weight:700;
		.another
			position:absolute;
			font-size:0.46rem;
			top:0;
			right:0.46rem;
			padding:0.2rem;
			margin-top:-0.2rem;	
		.likebox
			// font-size:0;
			margin-top:0.46rem;
			display:flex
			.likeitem
				// display:inline-block;
				flex:1;	
				text-align:center;
				width:33.33%;
				font-size:0.46rem;
				font-family:PingFang-SC-Bold;
				font-weight:700;
				.likeimg
					width:4.48rem;
					height:6.4rem;
					margin:0 auto;
					img
						width:100%;
						height:100%;		
	.detaildiscuss
		.title
			margin-top:0.46rem;
			padding-left:0.46rem;
			width:100%;
			height:0.64rem;
			border-left:2px solid baseColor;
			font-size:0.46rem;
			font-family:PingFang-SC-Bold;
			font-weight:700;
		.discusstext
			width:100%;
			height:1.70rem;
			margin-top:0.2rem;
			background:#fff;
			font-size:0;
			.inputdis
				position:relative;
				display:inline-block;
				margin-left:0.64rem;
				width:77%;
				height:1.2rem;
				border:1px solid #ccc;
				border-radius:0.512rem;
				font-size:0;
				// padding-top:0.05rem;
				padding-left:0.3rem;
				input
					width:98%;
					padding-left:0.46rem;
					padding-right:0.46rem;
					height:1.1rem;
					font-size:0.512rem;			
			.send
				margin-left:0.2rem;
				display:inline-block;
				border:1px solid baseColor;
				border-radius:0.8rem;
				padding:0.20rem 0.40rem;
				font-size:0.512rem;
				color:baseColor;		
		.discusscon
			font-size:0;
		// 	.dislist
		// 		.disitem
		// 			padding:0.46rem 0.64rem;
		// 			border-bottom:1px solid #d9d9d9;
		// 			.itemtop
		// 				.imgbox
		// 					display:inline-block;
		// 					width:1rem;
		// 					height:1rem;
		// 					img
		// 						width:100%;
		// 						height:100%;
		// 						border-radius:50%;
		// 				.perbox
		// 					display:inline-block;
		// 					font-size:0;
		// 					.itemname
		// 						font-size:0.512rem;
		// 					.itemdate
		// 						font-size:0.42rem;
		// 						color:#b9b9b9;
		// 			.itemcon
		// 				font-size:0.512rem;
		// 			.itemmark
		// 				position:relative;
		// 				height:0.512rem;
		// 				font-size:0.512rem;
		// 				.markbox
		// 					position:absolute;
		// 					vertical-align:middle;
		// 					right:0.46rem;
		// 					span
		// 						color:#b9b9b9;
		// 					.hou
		// 						margin-left:0.2rem;
						
				
</style>