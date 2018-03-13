<template>
	<div class="telwrapper">
		<vhead :title="title"></vhead>
		<div class="logoimg">
			<img src="../../assets/tellogo.png">
		</div>
		<div class="logoname">咔咔漫画</div>
		<div class="formcon">
			<div class="telcon" :class="{active:telfocus}">
				<span class="icon-tel icons" :class="{iconactive:telfocus}"></span>
				<input type="text" placeholder="请输入手机号" v-model="tel" @focus="telconfocus" @blur="telconblur">
				<div class="sendcode" @click="getcode">{{codestate?'已发送':'获取验证码'}}</div>
				<!-- <div class="imgbox">
					<img src="../../assets/blue.png">
				</div> -->
			</div>
			<div class="codecon" :class="{active:codefocus}">
				<span class="icon-code icons" :class="{iconactive:codefocus}"></span>
				<input type="text" placeholder="请输入验证码" v-model="code" @focus="codeconfocus" @blur="codeconblur">
			</div>
		</div>
		<div class="telbtn" @click="bindtel">绑定手机</div>
		<!-- <div class="alertbtna" @touchmove.prevent v-if="showalert">
			<valert :alertcon="alertcon" @alertclose="alertclose"></valert>
		</div> -->
	</div>
</template>
<script>
import vhead from '../common/thead/thead.vue'
// import valert from '../common/alert/alert.vue'
import { MessageBox } from 'mint-ui';
export default {
	data() {
		return {
			title:"绑定手机",
			codestate:false,
			showalert:false,
			alertcon:"",
			tel:"",
			code:"",
			telfocus:true,
			codefocus:false,
			codeid:""
		}
	},
	methods:{
		telconfocus:function(){
			this.telfocus = true;
			this.codefocus = false;
		},
		telconblur:function(){
			this.telfocus = false;
			this.codefocus = true;
		},
		codeconfocus:function(){
			this.telfocus = false;
			this.codefocus = true;
		},
		codeconblur:function(){
			this.telfocus = true;
			this.codefocus = false;
		},
		/*获取验证码*/
		async getcode(){
			if(this.tel != ''){
				this.codestate = true;
				await this.$axios({
					method: "post",
					data: {
						"userId":this.$store.state.userId,
						"phone" : this.tel
					},
					url: "/app/send/register/code.do"
				}).then((res)=>{
					this.codeid = res.data.obj;
				})
			}else{
				// alert("不能为空");
				MessageBox.alert('电话不能为空');
			}
			
		},
		/*绑定手机*/
		async bindtel(){
			if(this.tel != ''){
				await this.$axios({
					method: "post",
					data: {
						"userId":this.$store.state.userId,
						"truePhone" : this.tel,
						"code":this.code,
						"id":this.codeid
					},
					url: "/app/user/update/phone.do"
				}).then((res)=>{
					if(res.data.error == 200){
						MessageBox.alert(res.data.msg).then(action => {
						  this.$router.go(-1);
						});
					}
					// alert("验证码已发送");
				})
			}else{
				MessageBox.alert('电话不能为空');
			}
			
		},
		/*关闭弹出框事件*/
		alertclose:function(){
			this.$router.go(-1);
		}
	},
	components:{
		vhead,
		// valert
	}
}
</script>
<style lang="stylus">
	.telwrapper
		position:relative;
		width:100%;
		height:100%;
		// min-height:100%;
		background:#fff;
		.logoimg
			width:3.79rem;
			height:3.79rem;
			margin:0 auto;
			margin-top:3.2rem;
			img
				width:100%;
				height:100%;
				border-radius:0.4rem;
		.logoname
			text-align:center;
			font-size:1rem;
		.formcon
			margin-top:2.56rem;
			background:#fff;
			// text-align:center;
			.telcon
				position:relative;
				display:flex;
				// justify-content:center;
				align-items:center;	
				width:13.2rem;
				height:1.28rem;
				line-height:1.28rem;
				font-size:0;
				margin:0 auto;
				padding-bottom:0.2rem;
				border-bottom:1px solid #CDCDCD;
				// background:url('../../assets/blue.png') no-repeat fixed bottom;
				// background-size:100%;
				.icons
					margin-left:0.096rem;
					font-size:0.94rem;
					color:#cdcdcd;
				.iconactive
					color:baseColor;	
					// color:#31c27c;
				input
					margin-left:0.296rem;
					padding:0.2rem;
					font-size:0.64rem;	
				.sendcode
					position:absolute;
					width:3.5rem;
					height:1.12rem;
					line-height:1.12rem;
					text-align:center;
					border-radius:0.6rem;
					top:0;
					right:0.2rem;
					font-size:0.512rem;
					background:baseColor;
					color:#fff;	
				.imgbox	
					width:13.2rem;
					height:4px;
					img
						width:100%;
						height:100%;
			.active
				border-bottom:1px solid baseColor;				
			.codecon
				width:13.2rem;
				display:flex;
				// justify-content:center;
				align-items:center;
				margin:0 auto;
				margin-top:0.4rem;
				height:1.28rem;
				line-height:1.28rem;
				font-size:0;
				padding-bottom:0.2rem;
				border-bottom:1px solid #CDCDCD;
				// background:url('../../assets/gray.png') no-repeat fixed center;
				.icons
					font-size:0.94rem;
					color:#cdcdcd;
				.iconactive
					color:#31c27c;	
					// color:#31c27c;	
				// background-size:100%;
				input
					margin-left:0.2rem;
					padding:0.2rem;
					font-size:0.64rem;
			.active
				border-bottom:1px solid baseColor;					
		.telbtn
			font-size:0.64rem;
			width:13.2rem;
			margin:0 auto;
			margin-top:1.2rem;
			padding:0.4rem 0;
			text-align:center;
			// height:1.12rem;
			// line-height:1.12rem;
			border-radius:0.8rem;
			background:baseColor;
			color:#fff;
		.alertbtna
			position:absolute;
			background:rgba(0,0,0,0.4);
			top:0;
			width:100%;
			height:100%;	
</style>