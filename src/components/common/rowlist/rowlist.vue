<template>
<scroll class="wrapperbox" :data="cartoons" :pullup="pullup" @scrollToEnd="loadmore">
	<div class="rankbox" ref="wrapper">
		<div class="rankitem" v-for="(cartoon,index) in cartoons" @click="tcartoon(cartoon.id)">
			<div class="left">
				<div class="imgbox">
					<img :src="cartoon.smallPhoto">
					<div class="imgnum" v-if="!hidindex">{{index+1}}</div>
				</div>		
			</div>
			<div class="right">
				<div class="name">{{cartoon.cartoonName}}</div>
				<div class="author">
					<span>剧主:</span>
					<span class="auimg">
						<!-- <img :src="cartoon.ximg"> -->
					</span>
					<span class="auname">{{cartoon.cartoonAuthor}}</span>
				</div>
				<div class="detail">
					<div class="left">
						<span>播放量:</span>
						<span>{{cartoon.playCount}}</span>
					</div>
					<div class="right">
						<span>关注:</span>
						<span>{{cartoon.followCount}}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="alertinfo" v-if="cartoons.length < 1">暂无数据</div>
		<div class="loading" v-if="showloading">
	      <loading></loading>
	    </div>
	</div>
</scroll>
</template>

<script>
import loading from '../loading/loading.vue';
import scroll from '../scroll/scroll.vue';
	export default {
		data(){
			return {
				pullup:true
			}
		},
		props: ["cartoons","hidindex","showloading"],
		methods: {
			tcartoon: function(id){
				this.$router.push('/cartoon?id='+id);
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
	.rankbox
		padding:0.46rem;
		.rankitem
			display:flex;
			// margin-bottom:0.36rem;
			border-bottom:1px solid #ccc;
			padding:0.36rem 0;
			.left
				// position:relative;
				.imgbox
					position:relative;
					overflow:hidden;
					width:6.82rem;
					height:3.62rem;
					img
						width:100%;
						height:100%;
						border-radius:0.2rem;
					.imgnum
						position:absolute;
						font-size:0.64rem;
						background:rgba(0,0,0,0.4);
						text-align:center;
						width:1.7rem;
						height:0.85rem;
						top:0.46rem;
						left:-0.1rem;
						border-radius:0.1rem;
						color:#fff;		
			.right
				flex:1;
				padding-left:0.46rem;
				.name
					margin-top:0.2rem;
					font-size:0.59rem;
					font-weight:700;
				.author
					display:flex;
					margin-top:0.4rem;
					align-items:center;
					font-size:0.512rem;
					span
						color:#a3a3a3;
					.auimg
						display:inline-block;
						width:1rem;
						height:1rem;
						margin-left:0.2rem;
						img
							width:100%;
							height:100%;
							border-radius:50%;
					.auname
						margin-left:0.2rem;		
				.detail
					position:relative;
					margin-top:0.2rem;
					font-size:0;
					.left
						display:inline-block;
						font-size:0.512rem;
						span
							color:#a3a3a3;
					.right
						display:inline-block;
						position:absolute;
						right:0.46rem;
						font-size:0.512rem;
						span
							color:#a3a3a3;								
		.alertinfo
			text-align:center;
			font-size:0.64rem;					
			color:#b9b9b9;			
</style>