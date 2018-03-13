<template>
	<div class="epsalert">
		<div class="alertbox">
			<div class="alerttitle">
				<span>提示</span>
				<span class="icon-close icons" @click="close"></span>
			</div>
			<div class="alertcon">观看本集需要<span>{{priceinfo.price}}</span>咔咔豆</div>
			<div class="alertdetail">
				<div class="myeps">我的咔咔豆<span>{{priceinfo.integral}}</span></div>
				<div class="myclock" @click.once="buy">解锁</div>
			</div>
			<div class="alertno">没有咔咔豆了?</div>
			<div class="alertshare" @click="totask">做任务可得咔咔豆</div>
			<div class="alertvip" @click="tomoney">没豆了？快去充值吧！</div>
		</div>
	</div>
</template>
<script>
export default {
	props:['priceinfo','cartoonId','cartoonSetId'],
	methods: {
		close:function(){
			this.$emit('alertclose');
		},
		tomoney:function(){
			this.$router.push('/money');
		},
		totask:function(){
			this.$router.push('task');
		},
		async buy(){
			await this.$axios({
				method: "post",
				data: {
					"userId":this.$store.state.userId,
					"price":this.priceinfo.price,
					"integral":this.priceinfo.integral,
					"cartoonId":this.cartoonId,
					"cartoonSetId":this.cartoonSetId
				},
				url:"/qpp/comic/buy/this/cartoonset.do"
			}).then((res)=>{
				if(res.data.error == 200){
					this.$emit('epsalertclose');
				}
			})
		}
	}
}	
</script>
<style lang="stylus">
	.epsalert
		position:relative;
		width:100%;
		.alertbox
			width:11.13rem;
			// heigth:7.72rem;
			margin:0 auto;
			font-size:0;
			margin-top:50%;
			background:#fff;
			border-radius:0.3rem;
			text-align:center;
			.alerttitle
				position:relative;
				height:1.28rem;
				line-height:1.28rem;
				text-align:center;
				font-size:0.68rem;
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
				margin-top:0.46rem;
				font-size:0.59rem;
				span
					color:baseColor;
			.alertdetail
				margin-top:0.4rem;
				height:1.06rem;
				font-size:0;
				.myeps
					display:inline-block;
					width:5rem;
					height:1.06rem;
					line-height:1.06rem;
					font-size:0.42rem;
					background:#F5F5F5;
					span
						padding-left:0.2rem;
						color:baseColor;
				.myclock
					display:inline-block;
					width:2.56rem;
					height:1.06rem;
					line-height:1.06rem;
					font-size:0.42rem;
					background:#989898;
					color:#fff;
					font-weight:200;
			.alertno
				margin-top:0.2rem;
				font-size:0.512rem;
			.alertshare
				display:inline-block;
				margin-top:0.2rem;
				padding:0.2rem 0;
				width:6.4rem;
				border:1px solid baseColor;
				border-radius:0.2rem;
				font-size:0.512rem;
				color:baseColor;
			.alertvip
				display:inline-block;
				margin-top:0.2rem;
				margin-bottom:0.4rem;
				padding:0.2rem 0;
				width:6.4rem;
				background:#FF7978;
				color:#fff;
				border:1px solid #FF7978;
				border-radius:0.2rem;
				font-size:0.512rem;								
</style>