<template>
	<div>
		<vhead :title="title"></vhead>
		<div class="circleitem">
			<div class="circleicon">
				<img :src="circleuser.headimgurl">
			</div>
			<div class="circleinfo">
				<div class="circlename">{{circleuser.username}}</div>
				<div class="circlecon">{{circleitem.releaseInfo}}</div>
				<div class="circleimgbox">
					<!-- <div class="circleimg square" v-if="total==1">
						<img src="http://p0oqd5s9w.bkt.clouddn.com/1513651544302@qinruida-VLQdVjKO.jpg">		
					</div> -->
					<div class="circleimg more">
						<ul>
							<li v-for="(img,index) in photos" class="moreimg" :class="{oneimg:photos.length == 1}">
								<div class="liimg" :class="img.w < img.h?'shuimg':'hengimg'">
									<img :src="img.src" class="preview-img" @click="$preview.open(index,photos)">
								</div>
							</li>
						</ul>
					</div>
				</div>
				<div class="circledetail">
					<div class="circletime">{{circleitem.releaseDate}}</div>
					<div class="circlegood">
						<span :data-state="veryOk" :id="circleitem.id" @click="goodclick(circleitem.id)">
							<span class="icon-good" :class="{active:veryOk == 1}"></span>
							<span>{{circleitem.okCount}}</span>
						</span>
						<!-- <span class="icon-discuss icons"></span>
						<span>{{circleitem.commentCount}}</span> -->
					</div>
				</div>
			</div>
		</div>
		<div>
			<dis @sendmessage="sendmessage" ref="dis"></dis>
		</div>
		<div class="circledis">
			<div class="disdetaillist" v-if="disdetails != ''">
				<div class="disdetailcount">评论:<span>({{discount}})</span></div>
				<div class="disdetailitem" v-for="disdetail in disdetails">
					<div class="detailimg">
						<img :src="disdetail.user.headimgurl">
					</div>
					<div class="detailcon">
						<div class="detailname">{{disdetail.user.username}}</div>
						<div class="detailcontent">{{disdetail.friendsComment.commentInfo}}</div>
						<div class="detailbottom">{{disdetail.friendsComment.commentDate}}</div>
					</div>
				</div>
			</div>
			<div class="nodata" v-else>暂无评论</div>
			<!-- <div class="distext">
				<input type="text" placeholder="评论一下吧!" v-model="discusscon">
				<span class="disbtn" @click="sendmessage">发送</span>
			</div> -->
		</div>
	</div>
</template>
<script>
import vhead from '../common/thead/thead.vue'
import dis from '../common/dis/dis.vue'
import { Toast } from 'mint-ui'
export default {
	data() {
		return {
			title: "详情",
			circleitem:Object,
			circleuser:Object,
			disdetails:[],
			photos:[],
			discount:"0",
			page:"1",
			discusscon:"",
			veryOk:""
		}
	},
	created(){
		this.circledata();
		this.disdata();
	},
	methods: {
		/*混圈内容详情*/
		async circledata(){
			await this.$axios({
				method: "post",
				data: {
					"userId":this.$store.state.userId,
					"id":this.$route.query.id
				},
				url: "/qpp/comic/get/friendscomment/Byid.do"
			}).then((res)=>{
				this.circleitem = res.data.obj.friendsCircle;
				this.circleuser = res.data.obj.user;
				this.veryOk = res.data.obj.veryOk;
				this.photos = res.data.obj.photo;
			})
		},
		/*混圈评论列表*/
		async disdata(){
			await this.$axios({
				method: "post",
				data: {
					"userId":this.$store.state.userId,
					"id":this.$route.query.id,
					"nowPage":this.page
				},
				url: "/qpp/comic/get/this/comments.do"
			}).then((res)=>{
				this.disdetails = res.data.obj;
				this.discount = res.data.spare;
			})
		},
		// sendmessage:function(data){
		// 	console.log(data)
		// },
		/*发送混圈评论*/
		async sendmessage(discusscon){
			await this.$axios({
				method: "post",
				data: {
					"userId":this.$store.state.userId,
					"friendCircleId":this.$route.query.id,
					"commentInfo":discusscon
				},
				url: "/qpp/comic/release/friendscomment.do"
			}).then((res)=>{
				// this.discusscon="";
				this.$refs.dis.emptymessage();
				this.disdata();
				Toast('评论成功');
			})
		},
		/*混圈点赞*/
		async goodclick(id){
			let nownode = document.getElementById(id).children[1];
			let nowicon = document.getElementById(id).children[0];
			let nowdata = document.getElementById(id);
			let datastate = nowdata.getAttribute('data-state');
			// console.log(datastate);
			await this.$axios({
				method: "post",
				data: {
					"userId":this.$store.state.userId,
					"id":id,
					"veryOk":datastate
				},
				url: "/qpp/comic/add/friendscomment/veryOk.do"
			}).then((res)=>{
				nownode.innerHTML = res.data.obj.okCount;
				nowdata.setAttribute('data-state',res.data.obj.veryOk);
				if(res.data.obj.veryOk){
					nowicon.style.color = '#ffc438';
				}else{
					nowicon.style.color = '#b9b9b9';
				}
			})
		},
	},
	components: {
		vhead,
		dis
	}
}	
</script>
<style lang="stylus">
	.circleitem
		// width:100%;
		display:flex;
		padding:0.46rem;
		border:1px solid #d9d9d9;
		background:#fff;
		.circleicon
			display:inline-block;
			width:1.7rem;
			height:1.7rem;
			img
				width:100%;
				height:100%;
				border-radius:50%;
		.circleinfo
			display:inline-block;
			margin-left:0.4rem;
			width:12rem;
			.circlename
				font-size:0.59rem;
				font-weight:700;
			.circlecon
				margin-top:0.2rem;
				font-size:0.59rem;
			.circleimgbox
				margin-top:0.2rem;
				.circleimg
					img
						width:100%;
						height:100%;
				.square
					width:7.68rem;
					height:7.68rem;
				.more
					ul
						display:flex;
						flex-wrap:wrap;
						.moreimg
								width:33.33%;
								margin-top:0.2rem;
								.liimg
									width:94%;
									height:3.37rem;
									margin:0 auto;
									img
										width:100%;
										height:100%;
										object-fit: cover;
							.oneimg
								.shuimg
									width:4.3rem;
									height:7.65rem;
									img
										width:100%;
										height:100%;
								.hengimg
									width:7.65rem;
									height:4.3rem;
									img
										width:100%;
										height:100%;		
			.circledetail
				position:relative;
				margin-top:0.2rem;
				.circletime
					font-size:0.42rem;
					color:#B2B2B2;
				.circlegood
					position:absolute;
					top:0;
					right:0.46rem;
					font-size:0.42rem;
					span
						color:#B2B2B2;
					.icons
						margin-left:0.6rem;
					.active
						color:baseColor;
	.circledis
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