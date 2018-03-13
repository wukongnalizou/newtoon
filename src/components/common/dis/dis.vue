<template>
	<div class="disbox">
		<div class="discon">
			<textarea placeholder="输入评论内容" v-model="textcon"></textarea>
		</div>
		<div class="disbtn">
			<div class="disbtnbox">
				<button @click="sendmessage">发送</button>
			</div>
		</div>
	</div>
</template>
<script>
import { MessageBox } from 'mint-ui';
export default{
	data(){
		return {
			textcon:""
		}
	},
	methods: {
		sendmessage:function(){
			if(this.textcon == ''){
				MessageBox.alert('评论不能为空')
				return false;
			}
			this.$emit('sendmessage',this.textcon);
		},
		emptymessage:function(){
			this.textcon = "";
		}
	}
}	
</script>
<style lang="stylus" scoped>
	.disbox
		padding:0.42rem 0.42rem 0;
		background:#fff;
		// background:#000;	
		.discon
			border:1px solid #b4b4b4;
			border-radius:0.15rem;
			textarea
				width:100%;
				border:0;
				height:1.7rem;
				padding:0.42rem;
				font-size:0.59rem;
				resize:none;
				display:block;
		.disbtn
			position:relative;
			padding:0.256rem;
			.disbtnbox
				height:1.1rem;
				button
					position:absolute;
					right:0;
					text-align:center;
					height:1.1rem;
					line-height:1.1rem;
					font-size:0.59rem;
					color:#fff;
					border:1px solid #fff;
					border-radius:4px;
					padding:0 0.34rem;
					background-color:baseColor;		
</style>