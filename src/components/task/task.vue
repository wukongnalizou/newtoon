<template>
	<div class="taskbox">
		<vhead :title="title"></vhead>
		<!-- <div class="thead">
			<div class="returnbtn" @click="returngo">
				<span class="icon-left"></span>
			</div>
			<div class="title">{{title}}</div>
		</div> -->
		<div class="taskbtn" @click="sign(task[0].buttonState,task[0].id)">{{task[0].buttonState?"已签到":"签到"}}</div>
		<div class="taskbanner">
			<img src="../../assets/task.png" height="234" width="750">
		</div>
		<div class="taskday">
			<ul>
				<li v-for="">
					<div class="taskitem" :class="{'active':realday>0}">
						<div class="itemtitle">连</div>
						<div class="itemname">1天</div>
					</div>
				</li>
				<li>
					<div class="taskitem" :class="{'active':realday>1}">
						<div class="itemtitle">签</div>
						<div class="itemname">2天</div>
					</div>
				</li>
				<li>
					<div class="taskitem" :class="{'active':realday>2}">
						<div class="itemtitle">七</div>
						<div class="itemname">3天</div>
					</div>
				</li>
				<li>
					<div class="taskitem" :class="{'active':realday>3}">
						<div class="itemtitle">天</div>
						<div class="itemname">4天</div>
					</div>
				</li>
				<li>
					<div class="taskitem"  :class="{'active':realday>4}">
						<div class="itemtitle">就</div>
						<div class="itemname">5天</div>
					</div>
				</li>
				<li>
					<div class="taskitem" :class="{'active':realday>5}">
						<div class="itemtitle">送</div>
						<div class="itemname">6天</div>
					</div>
				</li>
				<li>
					<div class="taskitem"  :class="{'active':realday>6}">
						<div class="itemtitle">VIP</div>
						<div class="itemname">7天</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="taskdetail">
			<ul>
				<li>
					<div class="detailitem">
						<div class="icon">
							<span class="icon-medal icons" style="color:#139CEA"></span>
							<span class="mark">每日</span>
						</div>
						<div class="detailcon">
							<div class="taskname">
								<span class="name">每日登录</span>
								<span class="icon-coin icons">
									<span class="path1"></span>
									<span class="path2"></span>
									<span class="path3"></span>
									<span class="path4"></span>
								</span>
								<span class="more">+20咔咔豆</span>
							</div>
							<div class="taskintro">每天都要分享漫画哦</div>
						</div>
						<div class="detailno" :class="[{detailbtn:login == 1},{detailfinish:login == 2}]" @click="tlogin(task[1].id,task[1].buttonState)">{{logincon}}</div>
					</div>
				</li>
				<li>
					<div class="detailitem">
						<div class="icon">
							<span class="icon-medal icons" style="color:#139CEA"></span>
							<span class="mark">每日</span>
						</div>
						<div class="detailcon">
							<div class="taskname">
								<span class="name">分享平台</span>
								<span class="icon-coin icons">
									<span class="path1"></span>
									<span class="path2"></span>
									<span class="path3"></span>
									<span class="path4"></span>
								</span>
								<span class="more">+30咔咔豆</span>
							</div>
							<div class="taskintro">分享咔咔漫画平台送30咔咔豆</div>
						</div>
						<div class="detailno" :class="[{detailbtn:share == 1},{detailfinish:share == 2}]" @click="tshare(task[2].id,task[2].buttonState)">{{sharecon}}</div>
					</div>
				</li>
				<li>
					<div class="detailitem">
						<div class="icon">
							<span class="icon-medal icons" style="color:#139CEA"></span>
							<span class="mark">每日</span>
						</div>
						<div class="detailcon">
							<div class="taskname">
								<span class="name">分享漫画</span>
								<span class="icon-coin icons">
									<span class="path1"></span>
									<span class="path2"></span>
									<span class="path3"></span>
									<span class="path4"></span>
								</span>
								<span class="more">+30咔咔豆</span>
							</div>
							<div class="taskintro">分享精彩漫画可得30咔咔豆</div>
						</div>
						<div class="detailno" :class="[{detailbtn:sharecartoon == 1},{detailfinish:sharecartoon == 2}]" @click="tsharecartoon(task[3].id,task[3].buttonState)">{{sharecartooncon}}</div>
					</div>
				</li>
				<li>
					<div class="detailitem">
						<div class="icon">
							<span class="icon-medal icons" style="color:#139CEA"></span>
							<span class="mark">每日</span>
						</div>
						<div class="detailcon">
							<div class="taskname">
								<span class="name">每日观看</span>
								<span class="icon-coin icons">
									<span class="path1"></span>
									<span class="path2"></span>
									<span class="path3"></span>
									<span class="path4"></span>
								</span>
								<span class="more">+10咔咔豆</span>
							</div>
							<div class="taskintro">每日观看2部漫画</div>
						</div>
						<div class="detailno" :class="[{detailbtn:see == 1},{detailfinish:see == 2}]" @click="tsee(task[4].id,task[4].buttonState)">{{seecon}}</div>
					</div>
				</li>
				<li>
					<div class="detailitem">
						<div class="icon">
							<span class="icon-medal icons"></span>
							<span class="mark">新手</span>
						</div>
						<div class="detailcon">
							<div class="taskname">
								<span class="name">首次充值</span>
								<span class="icon-coin icons">
									<span class="path1"></span>
									<span class="path2"></span>
									<span class="path3"></span>
									<span class="path4"></span>
								</span>
								<span class="more">+200咔咔豆</span>
							</div>
							<div class="taskintro">首次充值任意金额，剧点额外送</div>
						</div>
						<div class="detailno" :class="[{detailbtn:recharge == 1},{detailfinish:recharge == 2}]" @click="trecharge(task[5].id,task[5].buttonState)">{{rechargecon}}</div>
					</div>
				</li>
				<li>
					<div class="detailitem">
						<div class="icon">
							<span class="icon-medal icons"></span>
							<span class="mark">新手</span>
						</div>
						<div class="detailcon">
							<div class="taskname">
								<span class="name">手机绑定</span>
								<span class="icon-coin icons">
									<span class="path1"></span>
									<span class="path2"></span>
									<span class="path3"></span>
									<span class="path4"></span>
								</span>
								<span class="more">+20咔咔豆</span>
							</div>
							<div class="taskintro">绑定手机号码呦</div>
						</div>
						<div class="detailno" :class="[{detailbtn:phone == 1},{detailfinish:phone == 2}]" @click="ttel(task[6].id,task[6].buttonState)">{{phonecon}}</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="sharebox" v-if="showshare" @touchmove.prevent>
			<vshare @shareclose="shareclose"></vshare>
		</div>
		<!-- <div class="alert" v-if="alert" @touchmove.prevent>
			<valert :alertcon="alertcon" @alertclose="alertclose"></valert>
		</div> -->
	</div>
</template>
<script>
import	vhead from '../common/thead/thead.vue'
import vshare from '../common/share/share.vue'
import { MessageBox } from 'mint-ui';
// import valert from '../common/alert/alert.vue'
export default {
	data() {
		return {
			title: "任务中心",
			recharge:"0",
			phone: "0",
			share:"0",
			day:"0",
			see:"0",
			sharecartoon:"0",
			login:"1",
			task:[],
			alert:false,
			alertcon:"",
			showshare:false
		}
	},
	computed: {
		rechargecon: function(){
			if(this.recharge == 0){
				return "去充值"
			}else if(this.recharge == 1){
				return "领奖励"
			}else if(this.recharge == 2){
				return "已完成"
			}
		},
		realday: function(){
			return parseInt(this.day)
		},
		phonecon: function(){
			if(this.phone == 0){
				return "去绑定"
			}else if(this.phone == 1){
				return "领奖励"
			}else if(this.phone == 2){
				return "已完成"
			}
		},
		sharecon: function(){
			if(this.share == 0){
				return "去分享"
			}else if(this.share == 1){
				return "领奖励"
			}else if(this.share == 2){
				return "已完成"
			}
		},
		sharecartooncon: function(){
			if(this.sharecartoon == 0){
				return "去分享"
			}else if(this.sharecartoon == 1){
				return "领奖励"
			}else if(this.sharecartoon == 2){
				return "已完成"
			}
		},
		seecon: function(){
			if(this.see == 0){
				return "去观看"
			}else if(this.see == 1){
				return "领奖励"
			}else if(this.see == 2){
				return "已完成"
			}
		},
		logincon: function(){
			if(this.login == 0){
				return "去登录"
			}else if(this.login == 1){
				return "领奖励"
			}else if(this.login == 2){
				return "已完成"
			}
		}
	},
	created(){
		this.taskstate();
	},
	methods: {
		/*获取任务状态*/
		async taskstate(){
				await this.$axios({
					method: "post",
					data:{
						"userId":this.$store.state.userId
					},
					url: "/qpp/comic/get/cartoon/task/byuserid.do"
				}).then((res)=>{
					this.task = res.data.obj;
					this.login = res.data.obj[1].buttonState;
					this.share = res.data.obj[2].buttonState;
					this.sharecartoon = res.data.obj[3].buttonState;
					this.see = res.data.obj[4].buttonState;
					this.recharge = res.data.obj[5].buttonState;
					this.phone = res.data.obj[6].buttonState;
					this.day = res.data.obj[0].taskState;
					// this.alert = false;
				})
			},
			/*签到*/
			sign:function(state,id){
					// console.log(state)
				if(!state){
					this.signload(id);
				}
			},
			/*签到请求*/
			async signload(id){
				await this.$axios({
					method: "post",
					data:{
						"userId":this.$store.state.userId,
						"id":id
					},
					url: "/qpp/comic/get/cartoon/sign/award.do",
				}).then((res)=>{
					if(res.data.error == 200){
						MessageBox.alert(res.data.msg).then(action => {
						  this.taskstate();
						});
						// this.day = res.data.obj.taskState;
					}
				})
			},
			/*领取奖励*/
			async receive(id){
				await this.$axios({
					method:"post",
					data: {
						"userId":this.$store.state.userId,
						"id":id
					},
					url: "/qpp/comic/get/cartoon/task/award/byuserid.do"
				}).then((res)=>{
					MessageBox.alert(res.data.msg).then(action => {
						  this.taskstate();
						});
					// this.alert= true;
					// this.alertcon = res.data.msg;
					// this.taskstate();
				})
			},
			/*去登录*/
			tlogin:function(id,state){
				if(state == 0){
					alert("去登录");
				}else if(state == 1){
					this.receive(id);
					// alert("弹框");
				}
			},
			/*去分享*/
			tshare:function(id,state){
				if(state == 0){
					// alert("分享");
					this.showshare = true
				}else if(state == 1){
					this.receive(id);
					// alert("弹框");
				}
			},
			/*去分享漫画*/
			tsharecartoon:function(id,state){
				if(state == 0){
					// alert("分享漫画");
					this.$router.push('/main/indexmain/index');
				}else if(state == 1){
					this.receive(id);
					// alert("弹框");
				}
			},
			/*去观看*/
			tsee:function(id,state){
				if(state == 0){
					this.$router.push('/main/indexmain/index');
				}else if(state == 1){
					this.receive(id);
					// alert("弹框");
				}
			},
			/*去首冲*/
			trecharge:function(id,state){
				if(state == 0){
					this.$router.push('/money');
				}else if(state == 1){
					this.receive(id);
					// alert("弹框");
				}
			},
			/*去绑定*/
			ttel:function(id,state){
				if(state == 0){
					// alert("去绑定");
					this.$router.push('/tel?id='+id);
				}else if(state == 1){
					this.receive(id);
					// alert("弹框");
				}
			},
			shareclose:function(){
				this.showshare = false;
				this.taskstate();
			},
			/*判断回退*/
			// returngo(){
			// 	window.history.length > 1
			//         ? this.$router.go(-1)
			//         : this.$router.push('/main/indexmain/index')
			// }
	},
	components: {
		vhead,
		vshare
		// valert
	}
}
</script>
<style lang="stylus">
.taskbox
	position:relative;
	min-height:100%;
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
	.taskbtn
		position:absolute;
		top:0.2rem;
		right:0.46rem;
		width:2rem;
		padding:0.2rem 0;
		text-align:center;
		font-size:0.512rem;
		font-weight:700;
		border:1px solid #fff;
		border-radius:0.4rem;
		color:#fff;
	.taskbanner
		width:100%;
		height:5rem;
		img
			width:100%;
			height:100%;
	.taskday
		background:#fff;
		padding:0.46rem 0;
		ul
			display:flex;
			li
				flex:1;
				.taskitem
					// width:1.92rem;
					// height:1.92rem;
					// border-radius:50%;
					// background:#F0EFF5;
					text-align:center;
					.itemtitle
						width:1.92rem;
						margin:0 auto;
						height:1.92rem;
						border-radius:50%;
						text-align:center;
						line-height:1.92rem;
						background:#F0EFF5;
						font-size:0.85rem;
						color:#989898;
					.itemname
						font-size:0.42rem;
						color:#989898;
				.active		
					.itemtitle
						color:#fff;
						background:baseColor;
					.itemname
						color:baseColor;			
	.taskdetail
		ul
			li
				.detailitem
					font-size:0;
					display:flex;
					padding:0.46rem;
					justify-content:center;
					align-items:center;
					.icon
						position:relative;	
						.icons
							font-size:1.5rem;
							color:#FF7978;
						.mark
							position:absolute;
							top:0.4rem;
							left:0.3rem;
							color:#fff;
							font-size:0.46rem;	
					.detailcon
						margin-left:0.36rem;
						width:50%;
						.taskname
							.name
								font-size:0.64rem;
								margin-right:0.2rem;
							.icons
								span
									font-family:'icomoon';
									font-size:0.58rem;
							.more
								margin-left:0.2rem;
								font-size:0.46rem;
						.taskintro
							font-size:0.46rem;
							color:#989898;
					.detailno
						margin-left:3.5rem;
						width:2.432rem;
						height:0.93rem;
						line-height:0.93rem;
						text-align:center;
						font-size:0.46rem;
						border-radius:0.46rem;
						border:1px solid baseColor;
						color:baseColor;
						background:transparent;
					.detailbtn
						background:baseColor;
						color:#fff;
					.detailfinish
						border:1px solid #989898;
						background:transparent;
						color:#989898									
	.sharebox
		position:fixed
		top:0;
		width:100%;
		height:100%;
		background:rgba(0,0,0,0.4);					
	// .alert
	// 	position:absolute;
	// 	background:rgba(0,0,0,0.4);
	// 	top:0;
	// 	width:100%;
	// 	height:100%;					
												
								
</style>