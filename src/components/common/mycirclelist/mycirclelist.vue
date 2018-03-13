<template>
	<scroll :data="circlelist" :pullup="pullup" @scrollToEnd="loadmore" class="wrapperbox">
		<div ref="wrapper">
			<div class="circleitem" v-for="circleitem in circlelist" :id="circleitem.friendsCircle.id">
				<div class="circleicon" @click="tdetail(circleitem.friendsCircle.id)">
					<img :src="user.headimgurl">
				</div>
				<div class="circleinfo">
					<div class="circlename"  @click="tdetail(circleitem.friendsCircle.id)">{{user.username}}</div>
					<div class="circlecon" @click="tdetail(circleitem.friendsCircle.id)">{{circleitem.friendsCircle.releaseInfo}}</div>
					<div class="circleimgbox">
						<!-- <div class="circleimg square" v-if="total==1">
							<img src="http://p0oqd5s9w.bkt.clouddn.com/1513651544302@qinruida-VLQdVjKO.jpg">		
						</div> -->
						<div class="circleimg more">
							<ul>
								<li v-for="(img,index) in circleitem.photo"  class="moreimg" :class="{oneimg:circleitem.photo.length == 1}">
									<div class="liimg" :class="img.w < img.h?'shuimg':'hengimg'">
										<img :src="img.src" class="preview-img" @click="$preview.open(index,circleitem.photo)">
									</div>
								</li>
							</ul>
						</div>
					</div>
					<div class="circledetail">
						<div class="circletime">{{circleitem.friendsCircle.releaseDate}}</div>
						<div class="circledel" @click="delconfirm(circleitem.friendsCircle.id)">删除</div>
						<div class="circlegood">
							<span :data-state="circleitem.veryOk" :id="circleitem.friendsCircle.id+'good'" @click="goodclick(circleitem.friendsCircle.id)">
								<span class="icon-good" :class="{active:circleitem.veryOk == 1}"></span>
								<span>{{circleitem.friendsCircle.okCount}}</span>
							</span>
							<span class="icon-discuss icons"  @click="tdetail(circleitem.friendsCircle.id)"></span>
							<span  @click="tdetail(circleitem.friendsCircle.id)">{{circleitem.friendsCircle.commentCount}}</span>
						</div>
					</div>
				</div>
				<!-- <div class="circledel">
					<span class="icon-del" @click="delconfirm(circleitem.friendsCircle.id)"></span>
				</div> -->
			</div>
			<div class="loading" v-if="showloading">
		      <loading></loading>
		    </div>
		</div>
	</scroll>
</template>
<script>
import { MessageBox } from 'mint-ui';
import scroll from '../scroll/scroll.vue'
import loading from '../loading/loading.vue'
export default {
	data() {
		return {
			total:"1",
			pullup:true
		}
	},
	props:["circlelist","user","showloading"],
	methods: {
		/*点赞*/
		async goodclick(id){
			let nownode = document.getElementById(id+'good').children[1];
			let nowicon = document.getElementById(id+'good').children[0];
			let nowdata = document.getElementById(id+'good');
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
		/*确认删除*/
		delconfirm:function(id){
			MessageBox.confirm('确定删除?').then(action => {
			  	this.del(id);
			});
		},
		/*删除*/
		async del(id){
			await this.$axios({
				method: "post",
				data: {
					"userId":this.$store.state.userId,
					"id":id
				},
				url: "/qpp/comic/delete/friendcircle/byid.do",
			}).then((res)=>{
				this.$emit('delnode',id);
			})
		},
		tdetail:function(id){
			this.$router.push('circledetail?id='+id);
		},
		loadmore:function(){
			this.$emit('loadmore');
		}
	},
	components:{
		scroll,
		loading
	}
}
</script>
<style lang="stylus" scoped>
.wrapperbox
	margin-top:1.6rem;
	height:24.128rem;
	.circleitem
		// width:100%;
		display:flex;
		padding:0.46rem;
		border:4px solid #f9f9f9;
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
				padding:0.2rem;
				font-size:0.59rem;
			.circleimgbox
				margin-top:0.2rem;
				.circleimg
					// img
					// 	width:100%;
					// 	height:100%;
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
				display:flex;
				margin-top:0.2rem;
				.circletime
					margin-top:0.2rem;
					font-size:0.42rem;
					color:#B2B2B2;
				.circledel
					margin-top:0.2rem;
					margin-left:0.4rem;
					font-size:0.42rem;
					color:baseColor;	
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
		.circledel
			display:inline-block;
			span
				display:inline-block;
				padding:0.2rem;
				font-size:0.52rem;				
								
</style>