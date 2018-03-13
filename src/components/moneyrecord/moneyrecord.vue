<template>
	<div class="recordbox">
		<vhead :title="title"></vhead>
		<div class="recordlist">
			<div class="recorditem" v-for="record in records">
				<div class="num">
					<span>订单编号:</span>
					<span class="numcon">{{record.orderNum}}</span>
				</div>
				<div class="con">{{record.orderRemarks}}</div>
				<div class="time">{{record.orderDate}}</div>
			</div>
		</div>
	</div>
</template>
<script>
import vhead from '../common/thead/thead.vue'
export default {
	data() {
		return {
			title:"充值记录",
			nowpage:"1",
			records:[]
		}
	},
	created() {
		this.initData();
	},
	methods: {
		async initData(){
			await this.$axios({
				method: "post",
				data:{
					"userId":this.$store.state.userId,
					"nowPage":this.nowpage
				},
				url: "/qpp/comic/get/allorder232.do"
			}).then((res)=>{
				this.records = res.data.obj
			})
		}
	},
	components: {
		vhead
	}
}	
</script>
<style lang="stylus">
.recordbox
	min-height:100%;
	.recordlist
		.recorditem
			margin-top:0.2rem;
			background:#fff;
			padding:0.46rem 0.46rem;
			.num
				padding-left:0.46rem;
				font-size:0.512rem;
				color:#989898
				border-bottom:1px solid #ccc;
				.numcon
					margin-left:0.2rem;
			.con
				margin-top:0.46rem;
				padding-left:0.46rem;
				font-size:0.59rem;
				font-weight:700;
			.time
				margin-top:0.46rem;
				padding-left:0.46rem;
				font-size:0.512rem;
				color:#989898			
</style>