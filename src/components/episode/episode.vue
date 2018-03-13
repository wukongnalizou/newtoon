<template>
	<!-- <scroll :data="episodes" :pullup="pullup" @scrollToEnd="loadmore" class="scrollbox"> -->
	<div class="wrapper" ref="wrapper">
		<div class="episodebox">
			<div class="episodetop">
				<div class="episodeinfo">{{type}}<span v-if="finishstate==1">(更新至{{refreshstate}})</span></div>
				<div class="episodeorder" @click="qiehuan">
					<span>{{epsmode == 0?'正序':'倒叙'}}</span>
					<!-- <span class="icon-order"></span> -->
				</div>
			</div>
			<div class="episodelist">
				<div class="episodeitem" v-for="episode in episodes" @click="tepscartoon(episode.cartoonSet.moneyState,episode.cartoonSet.id,episode.cartoonSet.cartoonId,episode.cartoonSet.sort)">
					<div class="imgbox">
						<img :src="episode.cartoonSet.showPhoto" v-lazy="episode.cartoonSet.showPhoto">
					</div>
					<div class="detail" :class="[{'activeeps':episode.watchState == 2}]">
						<div class="name">
							<span>{{episode.cartoonSet.titile}}</span>
							<span class="title">{{episode.cartoonSet.details}}</span>
							<span class="icon-bean icons" v-if="episode.watchState == 0"></span>
						</div>
						<div class="goodbox">
							<div class="time">{{episode.cartoonSet.updateDate}}</div>
							<!-- <div class="play">
								<span class="icon-video"></span>
								<span>{{episode.cartoonSet.playCount}}</span>
							</div> -->
							<!-- <div class="good">
								<span class="icon-good"></span>
								<span>{{episode.cartoonSet.okCount}}</span>
							</div> -->
						</div>
					</div>
					<div class="mark" v-if="episode.watchState == 2">
						<span class="icon-clock"></span>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- </scroll> -->
</template>
<script>
	import scroll from '../common/scroll/scroll.vue';
	import {mapMutations} from 'vuex'
	export default {
		data() {
			return {
				episodes:[],
				detail:Object,
				alert:false,
				vipid:"",
				epspage:"1",
				totalpage:"1",
				epsmode:0,
				refreshstate:this.$store.state.cartoon.updateTile,
				finishstate:this.$store.state.cartoon.serialState,
				pullup: true
			}
		},
		computed: {
			type:function(){
				if(this.$store.state.cartoon.serialState == 1){
					return "连载中";
				}else{
					return "完结";
				}
			}
		},
		created() {
			this.epsDate()
		},
		methods: {
			...mapMutations([
		        'RECORD_EPSALERT'
		    ]),
		    /*获取剧集数据*/
			async epsDate(){
				if(this.epspage > this.totalpage){
					return false;
				}
				let _this = this;
				await this.$axios({
					method: "post",
					data: {
						"userId":this.$store.state.userId,
						"id":this.$route.query.id,
						"nowPage":this.epspage,
						"mode":this.epsmode
					},
					url: "/qpp/comic/get/cartoon/byid.do"
				}).then((res)=>{
					// setTimeout(function(){
					// 		_this.epsDate();
					// 	},500)
					this.totalpage = res.data.totalpage;
					this.epspage = res.data.nowpage+1;
					this.episodes = [...this.episodes,...res.data.obj];
					this.epsDate();
				})
			},
			qiehuan:function(){
				this.epsmode = !this.epsmode
				if(this.epsmode){
					this.epsmode = 1;
				}else{
					this.epsmode = 0;
				}
				this.epspage = 1;
				this.episodes = [];
				this.epsDate();
				// this.episodes = this.episodes.reverse();
			},
			/*剧集漫画跳转*/
			tepscartoon: function(moneyState,id,cartoonId,sort){
				this.$router.push('/cartoonimg?id='+id+'&cartoonId='+cartoonId+'&moneyState='+moneyState+'&sort='+sort);
			},
			// computedh:function(){
			// 	// console.log(document.body.scrollTop)
			// 	let scrollbox = document.querySelector('.cartoonwrapper');
			// 	document.addEventListener('scroll',function(e){
			// 		if(document.documentElement.clientHeight+document.documentElement.scrollTop == document.documentElement.scrollHeight){
			// 			console.log(1)
			// 			// console.log(e.scrollHeight);
			// 		}
			// 	})
			// },
		},
		// mounted(){
		// 	this.computedh();
		// },
		components:{
			scroll
		}
		// beforeRouteLeave(to,from,next){
		// 	// to.meta.keepAlive = true;
		// 	// console.log(from)
		// 	if(to.path == '/cartoonimg'){
		// 		if(to.meta.keepAlive){
		// 			to.meta.keepAlive = false;
		// 		}else{
		// 			to.meta.keepAlive = true;
		// 		}
		// 		// to.meta.keepAlive = false;
		// 	}
		// 	next();
		// },
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
// .scrollbox
// 	height:23.936rem;
	.episodebox
		padding:0 0.46rem;
		.episodetop
			position:relative;
			width:100%;
			height:1.7rem;
			line-height:1.7rem;
			font-size:0.512rem;
			.episodeinfo
				display:inline-block;
				position:absolute;
			.episodeorder
				display:inline-block;
				position:absolute;
				padding:0 0.46rem;
				right:0.46rem;	
		.episodelist
			width:100%;
			.episodeitem
				width:100%;
				display:flex;
				position:relative;
				margin-bottom:0.46rem;
				.isopacity
					opacity:0.5;
				.activeeps
					span
						color:baseColor;	
				.imgbox
					font-size:0;
					width:5.97rem;
					height:3.2rem;
					img
						width:100%;
						height:100%;
						border-radius:0.3rem;
				.detail
					position:relative;
					flex:1;
					font-size:0;
					padding: 0 0.4rem;
					.name
						margin-top:0.3rem;
						span
							font-size:0.59rem;
							font-weight:700;
						.title
							margin-left:0.3rem;
						.icons
							margin-left:0.2rem;
							font-size:0.46rem;		
					.goodbox
						position:absolute;
						display:flex;
						width:100%;
						height:0.64rem;
						bottom:0.3rem;
						font-size:0.512rem;
						.play
							margin-left:2rem;
							color:#b9b9b9;
							span
								color:#b9b9b9;
						.time
							// position:absolute;
							display:inline-block;
							color:#b9b9b9;
						.good
							// position:absolute;
							margin-left:0.4rem;
							display:inline-block;
							right:0.64rem;
							span
								color:#b9b9b9;	
				.mark
					font-size:0;
					margin-top:0.4rem;
					position:absolute;
					right:0;
					display:flex;
					width : 1.17rem;
					height:0.768rem;
					justify-content:center;
					align-items:center;
					background:	#f6ca16;
					border-top-left-radius:2rem;
					border-bottom-left-radius:2rem;	
					span
						font-size:0.512rem;
						color:#fff;		
					
</style>