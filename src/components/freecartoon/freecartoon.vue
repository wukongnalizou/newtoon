<template>
	<div>
		<vhead :title="title"></vhead>
		<div class="freecon">
			<h1>观看真人漫画</h1>
			<p>面向用户:&nbsp;&nbsp;VIP用户</p>
			<p>可免费观看所有漫画,现有大量精彩漫画,每日不断更新，在会员期间均可免费试读。</p>
			<div class="freelist">
				<ul>
					<li>
						<div class="left">
							<div class="imgbox">
								<img src="http://cover.u17i.com/2017/05/12232819_1494312667_SNWSS1We6Vs6.small.jpg">
							</div>		
						</div>
						<div class="right">
							<div class="name">婚途陌路</div>
							<div class="author">
								<span>剧主:</span>
								<span class="auimg">
									<img src="http://cover.u17i.com/2016/05/4891691_1462776706_131k8O7egeD1.small.jpg">
								</span>
								<span class="auname">东北陈语嫣</span>
							</div>
							<div class="detail">
								<div class="left">
									<span>播放量:</span>
									<span>2622</span>
								</div>
								<div class="right">
									<span>关注:</span>
									<span>12213</span>
								</div>
							</div>
						</div>
					</li>
					<li>
						<div class="left">
							<div class="imgbox">
								<img src="http://cover.u17i.com/2017/05/12232819_1494312667_SNWSS1We6Vs6.small.jpg">
							</div>		
						</div>
						<div class="right">
							<div class="name">婚途陌路</div>
							<div class="author">
								<span>剧主:</span>
								<!-- <span class="auimg">
									<img src="http://cover.u17i.com/2016/05/4891691_1462776706_131k8O7egeD1.small.jpg">
								</span> -->
								<span class="auname">东北陈语嫣</span>
							</div>
							<div class="detail">
								<div class="left">
									<span>播放量:</span>
									<span>2622</span>
								</div>
								<div class="right">
									<span>关注:</span>
									<span>12213</span>
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
import vhead from '../common/thead/thead.vue'
export default {
	data() {
		return {
			title: "vip特权"
		}
	},
	components: {
		vhead
	}
}	
</script>
<style lang="stylus">
	.freecon
		h1
			padding:0 0.46rem;
			margin-top:0.46rem;
			font-size:0.768rem;
		p
			padding:0 0.46rem;
			margin-top:0.36rem;
			font-size:0.59rem;
			color:#989898;
		.freelist
			margin-top:0.46rem;	
			background:#fff;
			ul
				li
					display:flex;
					padding:0.46rem;
					.left
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
</style>