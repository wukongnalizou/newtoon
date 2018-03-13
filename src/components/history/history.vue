<template>
	<div>
		<vhead :title="title" class="title"></vhead>
		<rowlist :cartoons="historys" :hidindex="hidindex" @loadmore="loadmore" :showloading="showloading"></rowlist>
	</div>
</template>
<script>
import	vhead from '../common/thead/thead.vue'
import rowlist from '../common/rowlist/rowlist.vue'
export default {
	data() {
		return {
			title: "历史记录",
			historys:[],
			hidindex:true,
			historypage:"1",
			totalpage:"",
			showloading:false
		}
	},
	created() {
		this.initData();
	},
	methods: {
		/*获取观看历史*/
		async initData(){
			await this.$axios({
				method: "post",
				data: {
					"userId":this.$store.state.userId,
					"nowPage":this.historypage
				},
				url: "/qpp/comic/get/myhistoryRecord.do"
			}).then((res)=>{
				// this.historys = res.data.obj
				if(res.data.error == 200){
		            if(res.data.nowpage == res.data.totalpage){
		              this.showloading = true
		            }
		            this.historypage = res.data.nowpage+1;
		            this.totalpage = res.data.totalpage;
		            this.historys = res.data.obj;
		          }
			})
		},
		async loadmore(){
		  if(this.historypage > this.totalpage){
	            return false;
	      }
          await this.$axios({
			method: "post",
			data: {
				"userId":this.$store.state.userId,
				"nowPage":this.historypage
			},
			url: "/qpp/comic/get/myhistoryRecord.do"
			}).then((res)=>{
				if(res.data.error == 200){
	              if(res.data.nowpage == res.data.totalpage){
	                this.showloading = true
	              }
	              this.historypage = res.data.nowpage+1;
	              this.historys = [...this.historys,...res.data.obj];
	              }
			})
		}
	},
	components: {
		vhead,
		rowlist
	}
}
</script>
<style lang="stylus" scoped>
.title
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
	// background:#31c27c;	
</style>