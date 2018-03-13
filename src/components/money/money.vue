<template>
	<div class="moneybox">
		<vhead :title="title"></vhead>
		<div class="moneyhistory" @click="trecord">充值记录</div>
		<div class="moneybanner">
			<img src="../../assets/money.jpg" alt="">
		</div>
		<div class="moneylist">
			<ul>
				<li>
					<div class="moneyitem" @click="tobuy(26,26,0)">
						<!-- <del>12元</del> -->
						<div class="price">
							<span>26元</span>
						</div>
						<div class="money">2600咔咔豆</div>
					</div>
				</li>
				<li>
					<div class="moneyitem" @click="tobuy(36,40,0)">
						<div class="price">
							<span>36元</span>
							<del>40元</del>
						</div>
						<div class="money">
							<span class="bean">4000咔咔豆</span>
							<span class="discount">9.0折</span>
							<!-- <div class="backimg">+300</div>
							<div class="bianbox">
								<img src="../../assets/bianpao.png" alt="">
							</div> -->
						</div>
					</div>
				</li>
				<li>
					<div class="moneyitem active" @click="tobuy(68,98,0)">
						<div class="price">
							<span>68元</span>
							<del>98元</del>
						</div>
						<div class="money">
							<span class="bean">9800咔咔豆</span>
							<span class="discount">6.9折</span>
							<!-- <div class="backimg">+500</div>
							<div class="bianbox">
								<img src="../../assets/bianpao.png" alt="">
							</div> -->
						</div>
						<div class="hot">
							<img src="../../assets/hoticon.png" alt="">
						</div>
					</div>
				</li>
				<li>
					<div class="moneyitem" @click="tobuy(188,218,0)">
						<div class="price">
							<span>188元</span>
							<del>218元</del>
						</div>
						<div class="money">
							<span class="bean">21800咔咔豆</span>
							<span class="discount">8.6折</span>
							<!-- <div class="backimg">+2000</div>
							<div class="bianbox">
								<img src="../../assets/bianpao.png" alt="">
							</div> -->
						</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="moneybtn" @click="tovip">开通vip，观看七折</div>
		<div class="moneydetail">
			<h3 class="moneytitle">温馨提示</h3>
			<p>1.咔咔豆为虚拟商品，兑换比例为1元兑换100，仅限本书城使用，一经购买不得退换。为了保证您的合法权益，请使用咔咔漫画H5平台购买咔咔豆。</p>
			<p>2.请勿短时间内多次购买同一商品！购买后，账户余额若长时间无变化，请记录好您的账户后联系客服<a href="tel:024-31272260" style="color:#3a83ff">Tel：024-31272260</a>，Wx: 13066798436</p>
			<!-- <p>3.咔咔豆兑换比例为1元兑换100</p> -->
		</div>
	</div>
</template>
<script>
import pay from '../../config/pay.js'
import	vhead from '../common/thead/thead.vue'
export default {
	data() {
		return {
			title: "充值中心",
			money:'',
			body:'',
			describe:'101',
			currency:''
		}
	},
	methods:{
		trecord: function(){
			this.$router.push('/moneyrecord');
		},
		tobuy:function(m,d,md){
			this.money = m;
			this.body=d*100+"咔咔豆";
			this.currency =d*100+md; 
			let obj = Object;
			obj.userId = this.$store.state.userId
			obj.describe = this.describe
			obj.money = this.money
			obj.body = this.body
			obj.currency = this.currency
			pay.payInfo(obj);
		},
		tovip:function(){
			this.$router.replace('/vip');
		},
		randomString: function(len) {
			len = len || 32;
			var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
			var maxPos = $chars.length;
			var pwd = '';
			for (let i = 0; i < len; i++) {
			pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
				}
			return pwd;
			}
	},
	components: {
		vhead
	}
}
</script>
<style lang="stylus">
	.moneybox
		position:relative;
		background:#fff;
		.moneyhistory
			position:absolute;
			top:0.46rem;
			right:0.46rem;
			color:#fff;
			font-weight:200;
			font-size:0.512rem;
		.moneybanner
			width:100%;
			height:5rem;
			img
				width:100%;
				height:100%;	
		.moneylist
			font-size:0;
			padding:0.46rem;
			ul
				li
					display:inline-block;
					width:50%;
					.moneyitem
						width:7rem;
						position:relative;
						margin:0 auto;
						margin-bottom:0.46rem;
						background:#F0EFF5;
						text-align:left;
						padding-left:0.4rem;
						font-size:0.68rem;
						border-radius:0.2rem;
						overflow:hidden;
						.price
							margin-left:0.6rem;
							padding-top:0.4rem;
							span
								color:#e61414;
							del
								font-size:0.49rem;
								color:#9b9b9b;
							.morebean
								color:#ffc438;
								font-size:0.64rem;	
						.money
							margin-left:0.6rem;
							margin-top:0.4rem;
							padding-bottom:0.4rem;
							font-size:0.59rem;
							.discount
								background:#e61414;
								padding:0.1rem 0.2rem;
								color:#fff;
								border-radius:0.2rem;
								font-size:0.42rem;
						.backimg
							position:absolute;
							top:0;
							right:-0.7rem;
							transform: rotate(30deg);
							width:4rem;
							height:1rem;
							padding-left:0.5rem;
							text-align:center;
							background:#e61414;
							color:#fff;
						.bianbox
							position:absolute;
							width:1.2rem;
							height:1.8rem;
							top:1.2rem;
							right:0;
							img
								width:100%;
								height:100%;			
						.hot
							position:absolute
							width:1rem;
							top:0;
							left:0;
							img
								width:100%;
								height:100%;
					.active
						border:1px solid #e61414		
		.moneybtn
			width:80%;
			margin:0 auto;
			padding:0.3rem 0;
			background:baseColor;
			color:#fff;
			text-align:center;
			font-size:0.59rem;
			border-radius:0.4rem;
		.moneydetail
			padding:0.46rem;
			.moneytitle
				font-weight:700;
				line-height:1rem;
				font-size:0.59rem;
			p
				line-height:0.7rem;
				font-size:0.512rem;	
									
</style>