<template>
	<div class="upcirclebox">
		<vhead :title="title"></vhead>
		<div class="upload" @click="sendmessage">发送</div>
		<div class="textcon">
			<textarea name="" id="textcon" placeholder="说些什么吧~" v-model="textcon"></textarea>
		</div>
		<div class="upimg">
			<ul id="imglist">
				<li id="hah" v-if="imgs.length<9">
					<div class="addbtn">
						<span class="icon-add icons"></span>
					</div>
					<input type="file" name="image" id="imgfile" accept="image/*" @change="checkuser">
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import vhead from '../common/thead/thead.vue'
import { MessageBox } from 'mint-ui';
import { Indicator } from 'mint-ui'
export default {
	data() {
		return {
			title:"",
			hidereturn:true,
			textcon:"",
			imgs:[]
		}
	},
	methods: {
		/*图片上传获取数据*/
		checkuser:function(){
			Indicator.open({
		        text: '上传中...',
		        spinnerType: 'fading-circle'
		      });
			let _this = this;
			var fileObj = document.getElementById('imgfile').files[0];
			lrz(fileObj).then((res)=>{
				_this.ajaxload(res.formData);
			})
		},
		/*图片上传*/
		ajaxload(formData){
			let _this = this;
			let url = "http://www.kakamanhua.com/Comic/app/uplodUpdate/multipartFile.do";
			let box = document.getElementById('imglist');
			let old = document.getElementById("hah");
			let xhr = new XMLHttpRequest();
			xhr.open("post", url, true);
			xhr.send(formData);
			xhr.onload = function(response){
				let img = JSON.parse(xhr.response);
				var li = document.createElement("li");
				li.innerHTML=`<div class="imgbox">
								<img src="${img.obj[0].src}">
			 			   	 </div>`;
			 	box.insertBefore(li,old);
			 	let str =img.obj[0].src+','+img.obj[0].w+','+img.obj[0].h;
			 	_this.imgs.push(str);
			 	Indicator.close();
	        };
		},
		/*发送混圈信息*/
		async sendmessage(){
			if((this.textcon == '') && (this.imgs.length == 0)){
				MessageBox.alert('不能为空');
				return false
			}else{
				let str = "";
				let length = this.imgs.length;
				let mark = "|";
				for(let i=0;i<this.imgs.length;i++){
					if(i == length-1){
						mark = "";
					}
					str += this.imgs[i]+mark;
				}
				await this.$axios({
					method: "post",
					data: {
						"userId":this.$store.state.userId,
						"releaseInfo":this.textcon,
						"condition":str
					},
					url: "/qpp/comic/release/friendcircle.do",
				}).then((res)=>{
					if(res.data.error == 200){
						this.$router.push('/circle');
					}	
				})
			}
		}
	},
	components:{
		vhead
	}
}	
</script>
<style lang="stylus">
	.upcirclebox
		position:relative;
		.upload
			position:absolute;
			padding:0.2rem 0.46rem;
			top:0.2rem;
			right:0.4rem;
			border-radius:0.3rem;
			background:#fff;
			color:#F6CA16;
			font-size:0.58rem;
		.textcon
			width:100%;
			#textcon
				width:100%;
				height:5.48rem;
				padding:0.46rem;
				font-size:0.64rem;
				resize:none;
		.upimg
			ul
				font-size:0;
				display:flex;
				flex-wrap:wrap;
				width:100%;
				li
					position:relative;
					font-size:0;
					width:25%;
					margin-top:0.2rem;
					text-align:center;
					.imgbox
						width:3.2rem;
						height:3.2rem;
						margin: 0 auto;
						img
							width:100%;
							height:100%;
							object-fit: cover;
					.addbtn
						display:flex;
						align-items:center;
						justify-content:center;
						width:3.2rem;
						height:3.2rem;
						margin:0 auto;
						line-height:3.2rem;
						border:2px solid #ccc;
						background:transparent;
						.icons
							font-size:1.2rem;
					#imgfile
						width:3.2rem;
						height:3.2rem;
						opacity:0;
						position:absolute;
						top:0;
						left:0;		
</style>