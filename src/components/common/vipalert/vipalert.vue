<template>
	<div class="vipalert">
		<div class="alertbox">
			<div class="alerttitle">
				<span>开通vip</span>
				<span class="icon-close icons" @click="close"></span>
			</div>
			<div class="alertlist">
				<ul>
					<li @click="tobuy(20,1)">
						<span class="icon-vip icons"></span>
						<span class="time">1个月</span>
						<span class="money">20元</span>
					</li>
					<li @click="tobuy(50,3)">
						<span class="icon-vip icons"></span>
						<span class="time">3个月</span>
						<div class="hot">
							<img src="../../../assets/hoticon.png" alt="">
						</div>
						<span class="money">50元</span>
					</li>
					<li @click="tobuy(198,12)">
						<span class="icon-vip icons"></span>
						<span class="time">12个月</span>
						<span class="money">198元</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
import pay from '../../../config/pay.js'
export default {
	data(){
		return {
			money:'',
			body:'',
			describe:'102',
			currency:''
		}
	},
	methods: {
		close:function(){
			this.$emit('vipalertclose');
		},
		tobuy:function(m,d){
			this.money = m;
			this.currency = d;
			if(this.money==20){
				this.body = '1个月会员' 
			}
			if(this.money==50){
				this.body = '3个月会员' 
			}
			if(this.money==198){
				this.body = '12个月会员' 
			}
			let obj = Object;
			obj.userId = this.$store.state.userId
			obj.describe = this.describe
			obj.money = this.money
			obj.body = this.body
			obj.currency = this.currency
			pay.payInfo(obj);
		}
	}
}	
</script>
<style lang="stylus">
.vipalert
	position:relative;
	width:100%;
	.alertbox
		width:11.13rem;
		heigth:7.72rem;
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
		.alertlist
			padding:0.46rem;
			ul
				li
					position:relative;
					padding:0.3rem 0;
					.icons
						font-size:1rem;
						color:#6ed5de;
					.time
						position:absolute;
						margin-left:0.8rem;
						font-size:0.64rem;
					.money
						position:absolute;
						display:inline-block;
						width:2.13rem;
						right:0.46rem;
						text-align:center;
						border:1px solid #6ed5de;
						// padding:0.1rem 0;
						// padding:0.1rem 0.46rem;
						border-radius:0.2rem;
						color:#6ed5de;
						font-size:0.59rem;
					.hot
						display:inline-block
						position:absolute;
						left:3.5rem;
						width:0.8rem;
						img
							width:100%;
							height:100%;				
</style>