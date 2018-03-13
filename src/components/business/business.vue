<template>
	<div class="businesswrapper">
		<vhead :title="title" class="vhead"></vhead>
		<div class="businessbox">
			<div class="businessinfo">
				<div class="businessitem">
					<div class="title">商务合作</div>
					<div class="namebox">
						<span class="name">联系人:</span>
						<span class="text">吴小姐</span>
					</div>
					<div class="namebox">
						<span class="name">邮&nbsp;&nbsp;&nbsp;&nbsp;箱:</span>
						<span class="text">xingaoys@163.com</span>
					</div>
				</div>
				<div class="businessitem">
					<div class="title">广告合作</div>
					<div class="namebox">
						<span class="name">联系人:</span>
						<span class="text">李先生</span>
					</div>
					<div class="namebox">
						<span class="name">邮&nbsp;&nbsp;&nbsp;&nbsp;箱:</span>
						<span class="text">sialx@qq.com</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import	vhead from '../common/thead/thead.vue'
export default{
	data(){
		return {
			title:"商务合作"
		}
	},
	components:{
		vhead
	}
}	
</script>
<style lang="stylus" scoped>
.businesswrapper
	.vhead
		position:absolute;
		width:100%;
		z-index:9;
	.businessbox
		position:absolute;
		top:0;
		z-index:1;
		width:100%;
		height:100%;
		background-image:url('../../assets/businessbg.png');
		background-repeat: no-repeat;
		background-size:100%;
		background-position:50% 50%;
		.businessinfo
			margin-top:12.8rem;
			margin-left:5rem;
			.businessitem
				margin-top:1rem;
				.title
					color:#fff;
					font-size:0.64rem;
				.namebox
					.name
						font-size:0.59rem;
						color:#fff;
					.text
						font-size:0.59rem;
						color:#fff;			
</style>