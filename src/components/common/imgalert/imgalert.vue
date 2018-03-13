<template>
	<div class="imgbox">
		<vhead :title="title" class="title"></vhead>
		<div class="kong" @click="close"></div>
		<div class="clickbox">
			<div class="clickitem" @click="prev">
				<span class="icon-left"></span>
				<span>上一话</span>
			</div>
			<div class="clickitem" @click="good">
				<span class="icon-good" v-show="veryOk==0"></span>
				<span class="icon-goodfinish" v-show="veryOk==1"></span>
				<span>点赞</span>
			</div>
			<div class="clickitem" @click="share">
				<span class="icon-share"></span>
				<span>分享</span>
			</div>
			<div class="clickitem" @click="all">
				<span class="icon-epslist"></span>
				<span>全集</span>
			</div>
			<div class="clickitem" @click="next">
				<span class="icon-right"></span>
				<span>下一话</span>
			</div>
		</div>
	</div>
</template>
<script>
import vhead from '../thead/thead.vue'
export default {
	data(){
		return {

		}
	},
	props:['title','veryOk'],
	methods:{
		prev:function(){
			this.$emit('prev')
		},
		good:function(){
			this.$emit('good')
		},
		all:function(){
			this.$emit('all')
		},
		next:function(){
			this.$emit('next')
		},
		share:function(){
			this.$emit('share')
		},
		close:function(){
			this.$emit('close')
		}
	},
	components:{
		vhead
	}
}
</script>
<style lang="stylus" scpoed>
.imgbox
	// display:fixed;
	position:relative;
	display:flex;
	flex-direction:column;
	width:100%;
	height:100%;
	.title
		// width:100%;
	.kong
		flex:1
	.clickbox
		// position:absolute;
		// bottom:0;
		width:100%;
		// height:1.6rem;
		line-height:1rem;
		background:baseColor;
		display:flex;
		align-items:center;
		justify-content:center;
		text-align:center;
		.clickitem
			flex:1;
			// margin-top:0.3rem;
			padding-top:0.3rem;	
			font-size:0.46rem;
			span
				display:block;
				color:#fff;	
</style>