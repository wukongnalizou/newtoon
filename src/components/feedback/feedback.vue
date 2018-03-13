<template>
	<div>
		<vhead :title="title"></vhead>
		<div class="feedbackcon">
			<textarea name="" id="feedcon" cols="30" rows="10" v-model="feedcon" placeholder="吐槽下我们的产品并留下联系方式吧！"></textarea>
		</div>
		<div class="feedbtn" @click="sendcon">提交反馈</div>
		<div class="erweibox">
			<div class="erweicon">
				<img src="../../assets/erweima.jpg">
			</div>
			<div class="erweiinfo">长按或扫描上方二维码关注客服微信 vx:13066798436 客服电话:<a href="tel:024-31272260" style="color:#3a83ff">Tel：024-31272260</a></div>
			<div class="erweifeed">请留下您的联系方式以便和您尽快联系并解决问题</div>
			<div class="example">例如：购买会员后无法免费观看，还需购买咔咔豆，我的联系方式是138********。</div>
		</div>
	</div>
</template>
<script>
import	vhead from '../common/thead/thead.vue'
import { MessageBox } from 'mint-ui';
export default {
	data() {
		return {
			title: "投诉建议",
			feedcon:""
		}
	},
	methods: {
		/*发送反馈信息*/
		async sendcon(){
			if(this.feedcon == ""){
				MessageBox.alert('内容不能为空');
				return false;
			}
			let _this = this;
			await this.$axios({
				method: "post",
				data: {
					"userId":this.$store.state.userId,
					"content":this.feedcon
				},
				url: "/qpp/comic/add/my/feedback.do"
			}).then((res)=>{
				if(res.data.error == 200){
					MessageBox.alert('反馈成功').then(action => {
					  	this.$router.go(-1);
					});
				}	
			})
		}
	},
	components: {
		vhead
	}
}
</script>
<style lang="stylus">
	.feedbackcon
		width:100%;
		#feedcon
			width:100%;
			padding:0.46rem;
			height:7.76rem;
			font-size:0.59rem;
			background:#fff;
			resize:none;
		#feedcon::-webkit-input-placeholder
			color:#F6CA16;
	.feedbtn
		width:80%;
		margin:0 auto;
		margin-top:0.86rem;
		padding:0.3rem 0;
		background:baseColor;
		color:#fff;
		text-align:center;
		font-size:0.59rem;
		border-radius:0.4rem;
	.erweibox
		padding:1rem;
		.erweicon
			// margin-top:1rem;
			// margin-left:1rem;
			width:5.54rem;
			height:5.54rem;
			margin:0 auto;
			img
				width:100%;
				height:100%;
		.erweiinfo
			// margin-left:1rem;
			margin-top:0.2rem;
			font-size:0.59rem;
			word-break:break-all;
		.erweifeed
			// margin-left:1rem;
			font-size:0.59rem;
			color:baseColor;	
		.example
			// margin-left:1rem;
			font-size:0.59rem;
			color:#878787;
			word-break:break-all;
			// word-wrap:normal;						
</style>