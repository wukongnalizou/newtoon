<template>
	<div class="alert">
		<div class="alertbox">
			<div class="alerttitle">
				<span>系统提示</span>
			</div>
			<div class="alertcon">{{alertcon}}</div>
			<div class="alertbtn" @click="alertclose">朕知道了</div>
		</div>
	</div>
</template>
<script>
export default {
	props:['alertcon'],
	methods: {
		alertclose:function(){
			this.$emit("alertclose");
		}
	}
}
</script>
<style lang="stylus">
	.alert
		position:relative;
		width:100%;
		height:100%;
		.alertbox
			width:9.5rem;
			// heigth:7.72rem;
			margin:0 auto;
			font-size:0;
			margin-top:50%;
			background:#fff;
			border-radius:0.3rem;
			.alerttitle
				position:relative;
				height:1.28rem;
				line-height:1.28rem;
				text-align:center;
				font-size:0.64rem;
				border-bottom:1px solid #f5f5f5;
				span
					color:#989898;
				.icons
					position:absolute;
					padding:0.4rem;
					top:0;
					right:0;
					font-size:0.46rem;
					color:#ccc;
					font-weight:700;
			.alertcon
				padding:0.46rem;
				min-height:2.6rem;
				font-size:0.59rem;
				text-align:center;
			.alertbtn
				padding:0.26rem;
				text-align:center;
				font-size:0.59rem;
				border-bottom-left-radius:0.3rem;
				border-bottom-right-radius:0.3rem;
				background:baseColor;
				color:#fff;
</style>