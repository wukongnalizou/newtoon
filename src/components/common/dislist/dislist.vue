<template>
	<div class="dislistwrapper">
		<div class="dislist" v-if="discusses != ''">
			<div class="disitem" v-for="(discuss,index) in discusses">
				<div class="itemtop">
					<div class="imgbox">
						<img :src="discuss.user.headimgurl">
					</div>
					<div class="perbox">
						<div class="itemname">{{discuss.user.username}}</div>
						<div class="itemdate">{{discuss.cartoonComment.commentDate}}</div>
					</div>
				</div>
				<div class="itemcon" @click="tdisdetail(discuss.cartoonComment.id)">{{discuss.cartoonComment.commentInfo}}</div>
				<div class="itemconson"  @click="tdisdetail(discuss.cartoonComment.id)">
					<div class="sonitem" v-for="son in discuss.list">
						<div class="sondetail">
							<span class="name">{{son.user.username}}:</span>
							<span class="detail">{{son.cartoonCommentson.commentInfo}}</span>
						</div>
					</div>
					<div class="sonnum" v-if="discuss.cartoonComment.commentCount > 2">共{{discuss.cartoonComment.commentCount}}条回复></div>
				</div>
				<div class="itemmark">
					<div class="markboxde">
						<span @click="goodclick(index,discuss.cartoonComment.id)" :data-state="discuss.veryOk" :id="discuss.cartoonComment.id">
							<span class="icon-good" :class="[{'goodactive':discuss.veryOk==1}]"></span>
							<span class="clicknum">{{discuss.cartoonComment.okCount}}</span>
						</span>
						<span class="icon-discuss hou" @click="tdisdetail(discuss.cartoonComment.id)"></span>
						<span @click="tdisdetail(discuss.cartoonComment.id)">{{discuss.cartoonComment.commentCount}}</span>
					</div>
				</div>
			</div>
			<div class="alldis" @click="alldis(discusses[0].cartoonComment.cartoonId,discusses[0].cartoonComment.cartoonSetId)" v-if="distotalpage > 1">全部评论</div>
		</div>
		<div class="nodis" v-else>暂无精彩评论</div>
	</div>
</template>
<script>
export default {
	props: ["discusses","distotalpage"],
	methods: {
		tdisdetail: function(id){
			this.$emit("tdisdetail",id);
			// this.$router.push('/disdetail?id='+id);
		},
		goodclick:function(index,id){
			this.$emit("goodclick",[index,id]);
		},
		alldis:function(id,setid){
			// console.log(id);
			// console.log(setid);
			this.$emit("alldis",[id,setid]);
		}
	}
}	
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.dislistwrapper
	.dislist
		.disitem
			padding:0.46rem 0.64rem;
			border-bottom:1px solid #d9d9d9;
			.itemtop
				.imgbox
					display:inline-block;
					width:1rem;
					height:1rem;
					img
						width:100%;
						height:100%;
						border-radius:50%;
				.perbox
					display:inline-block;
					font-size:0;
					margin-left:0.2rem;
					.itemname
						font-size:0.512rem;
					.itemdate
						font-size:0.42rem;
						color:#b9b9b9;
			.itemcon
				margin-left:0.2rem;
				padding-left:1rem;
				font-size:0.512rem;
			.itemconson
				// padding:0.2rem;
				padding-left:1rem;
				margin-left:0.2rem;
				margin-top:0.2rem;
				margin-bottom:0.2rem;
				background:#fafafa;
				.sonitem
					padding:0.1rem;
					.sondetail
						width:12.9rem;
						font-size:0.46rem;
						overflow:hidden;
						text-overflow:ellipsis;
						white-space:nowrap;
						.name
							color:#ccc;
						.detail
							margin-left:0.2rem;
				.sonnum
					margin-top:0.2rem;
					font-size:0.46rem;
					color:#4990E2;			
			.itemmark
				position:relative;
				height:0.512rem;
				font-size:0.512rem;
				.markboxde
					position:absolute;
					vertical-align:middle;
					right:0.46rem;
					span
						color:#b9b9b9;
					.goodactive
						color:baseColor;	
					.hou
						margin-left:0.2rem;		
		.alldis
			padding:0.46rem;
			text-align:center;
			font-size:0.512rem;
			border-bottom:1px solid #d9d9d9;				
	.nodis
		padding:0.46rem;
		text-align:center;
		font-size:0.512rem;						
</style>