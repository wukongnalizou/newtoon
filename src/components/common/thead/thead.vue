<template>
	<div>
		<div class="thead">
			<div class="returnbtn" @click="returngo" v-if="!hidereturn">
				<span class="icon-left"></span>
			</div>
			<div class="title">{{title}}</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {

			}
		},
		props: ['title','hidereturn'],
		methods: {
			returngo(){
				this.$router.go(-1);
			}
		}
	}
</script>
<style lang="stylus" scoped>
	.thead
		position:relative;
		width:100%;
		height:1.60rem;
		line-height:1.6rem;
		background:baseColor;
		color:#fff;
		.returnbtn
			position:absolute;
			// left:0.46rem;
			padding:0 0.46rem;	
			font-size:0.64rem;
			span
				color:#fff;
		.title
			// display:inline-block;
			text-align:center;
			font-size:0.68rem;	
			color:#fff;
</style>