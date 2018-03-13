<template>
	<scroll class="wrapperbox" :data="ranks" :pullup="pullup">
		<div id="wrapper">
			<div class="hotcartoon">
				<div class="hottitle">
					<div class="left">
						<span class="icon-hot"></span>
						<span>热门漫画</span>
					</div>
					<div class="right" @click="hotmore">
						<span>全部类型</span>
						<span class="icon-right"></span>
					</div>
				</div>
				<div class="hotcon">
					<div class="hotitem" v-for="hot in hotes" @click="choice(hot.id)">
						<div class="hotimgbox">	
							<div class="hotimg">
								<div class="hotimgtitle">已更新至{{hot.updateTile}}</div>
								<img :src="hot.midelPhoto">
							</div>
						</div>
						<div class="hotimgname">{{hot.cartoonName}}</div>
					</div>
				</div>
			</div>
			<div class="cutapart"></div>
			<div class="rankcartoon">
				<div class="ranktitle">
					<div class="left">
						<span class="icon-rank icons">
							<span class="path1"></span>
							<span class="path2"></span>
							<span class="path3"></span>
							<span class="path4"></span>
						</span>
						<span class="rank">排行榜</span>
					</div>
					<div class="right" @click="rankmore">
						<span>查看更多</span>
						<span class="icon-right"></span>
					</div>
				</div>
				<div class="rankcon">
					<div class="rankitemw" v-for="(rank,index) in ranks" @click="choice(rank.cartoon.id)">
						<div class="rankboxw">
							<div class="rankimg">
								<img :src="rank.cartoon.smallPhoto">
							</div>
							<div class="rankdetail" :class="[{'rankfirst':index == 0},{'ranksecond':index == 1},{'rankthree' :index == 2}]">
								<div class="name">{{rank.cartoon.cartoonName}}</div>
								<div class="eps">{{rank.cartoon.updateTile}}</div>
								<div class="concern">
									<span class="icon-video"></span>
									<span class="videonum">{{rank.cartoon.playCount}}</span>
								</div>
								<div class="num">{{'0'+(index+1)}}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</scroll>
</template>
<script>
import scroll from '../common/scroll/scroll.vue';
export default {
	data() {
		return {
			hotes:[],
			ranks:[],
			pullup:false
		}
	},
	created() {
		this.hotcartoon();
		this.rankcartoon();
	},
	methods: {
		/*热门漫画信息*/
		async hotcartoon(){
			await this.$axios({
				method: "post",
				data:{
					"userId":this.$store.state.userId
				},
				url: "/qpp/comic/get/hot/cartoon.do"
			}).then((res)=>{
				this.hotes = res.data.obj;
				// this.ranks = res.data.rank;
			})
		},
		/*排行榜漫画信息*/
		async rankcartoon(){
			await this.$axios({
				method: "post",
				data:{
					"userId":this.$store.state.userId
				},
				url: "/qpp/comic/get/cartoon/rankinglist/three.do"
			}).then((res)=>{
				this.ranks = res.data.obj;
				// this.ranks = res.data.rank;
			})
		},
		/*全部类型跳转*/
		hotmore(){
			this.$router.push('/hotmore');
		},
		/*全部排行榜跳转*/
		rankmore(){
			this.$router.push('/rankmore');
		},
		/*漫画详情跳转*/
		choice(id){
			this.$router.push('/cartoon?id='+id);
		}
	},
	components:{
		scroll
	}

}
</script>
<style lang="stylus" scoped>
.wrapperbox
	height:22.628rem;
    // margin-top:1.6rem;
	#wrapper
		margin-top:1.6rem;
		.hotcartoon
			padding:0.46rem 0.46rem;
			.hottitle
				position:relative;
				font-size:0;
				.left
					display:inline-block;
					font-weight:700;
					padding:0.2rem;
					font-size:0.512rem;
				.right
					display:inline-block;
					position:absolute;
					right:0.2rem;
					padding:0.2rem;
					font-size:0.512rem;
					span	
						// color:#b3b2b6;
						color:baseColor;	
			.hotcon
				display:flex;
				padding-top:0.46rem;
				.hotitem
					flex:1;
					text-align:center;
					.hotimgbox
						position: relative;
						.hotimg
							position: relative;
							width:90%;
							height:5.97rem;
							margin: 0 auto;
							border-radius:0.2rem;
							.hotimgtitle
								position:absolute;
								width:100%;
								background:rgba(0,0,0,0.4);
								font-size:0.42rem;
								color:#fff;
								border-radius:0.2rem;
							img
								width:100%;
								height:100%;	
								border-radius:0.2rem;
					.hotimgname
						font-size:0.59rem;		
		.cutapart
			width:100%;
			height:0.4rem;
			background:#e4e3e3;
		.rankcartoon
			padding:0.46rem 0.46rem;
			.ranktitle
				position:relative;
				font-size:0;
				.left
					display:inline-block;
					font-weight:700;
					padding:0.2rem;
					.icons
						span
							font-size:0.512rem;
							font-family:icomoon;
							
					.rank
						margin-left:0.2rem;
						font-size:0.512rem;		
				.right
					display:inline-block;
					position:absolute;
					right:0.2rem;
					padding:0.2rem;
					font-size:0.512rem;
					span	
						// color:#b3b2b6;
						color:baseColor;						
			.rankcon
				padding:0.46rem;
				padding-bottom:2rem;
				.rankitemw
					margin-bottom:0.2rem;
					.rankboxw
						display:flex;
						border-radius:0.2rem;
						.rankimg
							display:inline-block;
							width:48%;
							height:3.6rem;
							img
								width:100%;
								height:100%;
								border-top-left-radius:0.2rem;
								border-bottom-left-radius:0.2rem;		
						.rankdetail
							display:inline-block;
							flex:1;
							position:relative;
							padding-left:0.46rem;
							// background:#FAD23C;
							border-top-right-radius:0.2rem;
							border-bottom-right-radius:0.2rem;	
							.name
								margin-top:0.4rem;
								font-size:0.59rem;
								color:#fff;
							.eps
								margin-top:0.1rem;
								font-size:0.512rem;
								color:#fff;
							.concern
								margin-top:0.4rem;
								// margin-left:5rem;
								height:0.68rem;
								line-height:0.68rem;
								font-size:0.512rem;
								span
									color:#fff;
								.videonum
									font-size:0.6rem;
									margin-left:0.2rem;	
							.num
								position:absolute;
								top:30%;
								right:1.5rem;
								color:#ccc;
						.rankfirst
							background:#FAD23C;		
						.ranksecond
							background:#AED5F4;
						.rankthree
							background:#F8A44C;			
				.rankitem + .rankitem
					margin-top:0.3rem;				
										
								
</style>		