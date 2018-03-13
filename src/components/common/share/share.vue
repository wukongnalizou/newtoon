<template>
	<div class="sharewrapper">
		<div class="sharecon">
			<span>点击</span>
			<span class="icon-threedian icons"></span>
			<span class="hou">分享给好友领取咔咔豆</span>
			<span class="icon-sharearrow sharearrow" ></span>
			<span class="icon-close closeicon" @click="close"></span>
		</div>
	</div>
</template>
<script>
export default {
	methods:{
		close:function(){
			this.$emit('shareclose');
		}
	}
}
</script>
<style lang="stylus">
	.sharewrapper
		position:relative;
		width:100%;
		height:100%;
		.sharecon
			// color:#fff;
			margin-top:2.5rem
			margin-left:3.3rem;	
			height:1rem;
			line-height:1rem;
			font-size:0.64rem;
			span
				color:#fff;
			.icons
				font-size:0.4rem;
			.sharearrow
				margin-left:0.4rem;
				// margin-top:-0.9rem;
				font-size:1.2rem;	
			.closeicon
				display:inline-block;
				position:absolute;
				// top:0;
				bottom:6.4rem;	
				left:7.36rem;
				border:1px solid #fff;
				padding:0.28rem;
				border-radius:50%;		
</style>