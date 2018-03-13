<template>
	<div class="wrapperbox">
		<div class="dispagebox">
			<header class="title">
				<div class="titleicon">
					<span class="icon-close"></span>
				</div>
				<div class="titlecon">发表评论</div>
				<div class="send">
					<button>发送</button>
				</div>
			</header>
		</div>
	</div>
</template>
<script>
export default{
	data(){
		return {

		}
	}
}	
</script>
<style lang="stylus" scoped>
.wrapperbox
	position:relative;
	height:100%;
	.dispagebox
		// padding-top:2rem;
		position:fixed;
		// background-color:#fff;
		z-index:999;
		top:0;
		left:0;
		width:100%;
		height:100%;
		.title
			display:flex;
			padding:0.42rem;
			text-align:center;
			justify-content:space-between;
			flex-direction: row
			vertical-align:middle
			.titleicon
				font-size:0;
				span
					font-size:0.42rem;
					// color:#fff;
			.titlecon
				font-size:0.64rem;
			.send
				button
					height:1.1rem;
					line-height:1.1rem;
					font-size:0.59rem;
					color:#fff;
					border:1px solid #fff;
					border-radius:4px;
					padding:0 0.34rem;
					background-color:baseColor;			
			
</style>