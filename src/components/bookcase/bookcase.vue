<template>
	<div>
		<vhead :title="title" :hidereturn="hidereturn" class="title"></vhead>
		<div v-if="caselist.length!=0">
  			<columnlist :cartoons="caselist" @loadmore="loadmore" :showloading="showloading"></columnlist>
  		</div>
  		<div class="nodataview" v-if="caselist.length==0">
  			<nodata></nodata>
  		</div>
	</div>
</template>
<script>
import vhead from '../common/thead/thead.vue'
import columnlist from '../common/columnlist/columnlist.vue'
import nodata from '../common/nodata/nodata.vue'
export default {
	data(){
		return {
			title:"我的关注",
			hidereturn:true,
			casepage:"1",
			totalpage:"",
			caselist:[],
			shownodata:true,
			showloading:false
		}
	},
	created() {
		this.initData();
	},
	methods: {
		/*书架收藏数据*/
		async initData(){
			// history.pushState('url', "", '/cartoon/episode?id=5BtZJlO2JDeQ7eMw2NKZHjHitUePSNig');
			await this.$axios({
				method: "post",
				data:{
					"userId":this.$store.state.userId,
					"nowPage":this.casepage
				},
				url: "/qpp/comic/get/myBookshelf.do"
			}).then((res)=>{
				// this.caselist = res.data.obj;
				if(res.data.error == 200){
		            if(res.data.nowpage == res.data.totalpage && res.data.nowpage != 0){
		              this.showloading = true
		              this.shownodata = false
		            }
		            this.casepage = res.data.nowpage+1;
		            this.totalpage = res.data.totalpage;
		            this.caselist = res.data.obj;
		          }
			})
		},
		async loadmore(){
			if(this.casepage > this.totalpage){
		        return false;
		    }
			await this.$axios({
				method: "post",
				data:{
					"userId":this.$store.state.userId,
					"nowPage":this.casepage
				},
				url: "/qpp/comic/get/myBookshelf.do"
			}).then((res)=>{
				// this.caselist = res.data.obj;
				if(res.data.error == 200){
		            if(res.data.nowpage == res.data.totalpage){
		              this.showloading = true
		              this.shownodata = false
		            }
		            this.casepage = res.data.nowpage+1;
		            this.totalpage = res.data.totalpage;
		            this.caselist =  [...this.caselist,...res.data.obj];
		          }
			})
		}
	},
	components:{
		vhead,
		columnlist,
		nodata
	}
}
</script>
<style lang="stylus" scoped>
	.title
		width:100%;
		height:1.6rem;
		z-index:9;
		position:fixed;
		top:0;
		left:0;
	.nodataview
		padding-top:2.6rem;	
	// .head
	// 	width:100%; 
	// 	height:1.87rem;
	// 	display:flex;
	// 	z-index:999;
	// 	position:fixed;
	// 	top:0;
	// 	left:0;
	// 	align-items:center;
	// 	justify-content:center;
	// 	// line-height: 1.87rem;
	// 	background:#139CEA;
	// 	nav
	// 		ul
	// 			font-size:0;
	// 			li
	// 				display:inline-block;
	// 				padding:0.2rem 0;
	// 				font-family:PingFang-SC-Bold;
	// 				font-size:0.68rem;
	// 				a
	// 					color:#7dc9f3;
	// 			.router-link-active
	// 				display:inline-block;
	// 				font-family:PingFang-SC-Bold;
	// 				font-size:0.68rem;
	// 				color:#fff;
	// 				border-bottom:2px solid #fff;
	// 			li + li
	// 				margin-left:1rem;
</style>