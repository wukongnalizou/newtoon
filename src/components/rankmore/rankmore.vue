<template>
	<div>
		<vhead :title="title" class="ranktitle"></vhead>
		<rowlist :cartoons="cartoons" @loadmore="loadmore" :showloading="showloading"></rowlist>
	</div>
</template>
<script>
	import vhead from '../common/thead/thead.vue'
	import rowlist from '../common/rowlist/rowlist.vue'
	export default {
		data() {
			return {
				title:'排行榜',
				cartoons:[],
				rankpage:"1",
				totalpage:"",
				showloading:false
			}
		},
		created() {
			this.initData();
		},
		methods: {
			/*全部排行榜数据*/
			async initData(){
				await this.$axios({
					method: "post",
					url: "/qpp/comic/get/more/cartoon/rankinglist.do",
					data: {
						"userId":this.$store.state.userId,
						"nowPage":this.rankpage
					}
				}).then((res)=>{
					// this.cartoons = res.data.obj;
					if(res.data.error == 200){
			            if(res.data.nowpage == res.data.totalpage){
			              this.showloading = true
			            }
			            this.rankpage = res.data.nowpage+1;
			            this.totalpage = res.data.totalpage;
			            this.cartoons = res.data.obj;
			          }
				})
			},
			async loadmore(){
				if(this.rankpage > this.totalpage){
		            return false;
		          }
				await this.$axios({
					method: "post",
					url: "/qpp/comic/get/more/cartoon/rankinglist.do",
					data: {
						"userId":this.$store.state.userId,
						"nowPage":this.rankpage
					}
				}).then((res)=>{
					// this.cartoons = res.data.obj;
					if(res.data.error == 200){
		              if(res.data.nowpage == res.data.totalpage){
		                this.showloading = true
		              }
		              this.rankpage = res.data.nowpage+1;
		              this.cartoons = [...this.cartoons,...res.data.obj];
		            }
				})
			}
		},
		components: {
			vhead,
			rowlist,
		}
	}
</script>
<style  lang="stylus" rel="stylesheet/stylus" scoped>
.ranktitle
	width:100%; 
	height:1.6rem;
	display:flex;
	z-index:999;
	position:fixed;
	top:0;
	left:0;
	align-items:center;
	justify-content:center;
	// line-height: 1.87rem;
	background:baseColor;
</style>