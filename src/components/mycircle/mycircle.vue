<template>
	<div class="mycirclewrapper">
		<vhead :title="title" class="title"></vhead>
		<!-- <div class="mymain">
			<div class="myimg">
				<img src="">
			</div>
			<div class="myname">hahha</div>
		</div> -->
		<mycirclelist :circlelist="circlelist" :user="circleuser" @delnode="delnode" @loadmore="loadmore" :showloading="showloading"></mycirclelist>
		<div class="nodataview" v-if="circlelist.length==0">
  			<nodata></nodata>
  		</div>
	</div>
</template>
<script>
import vhead from '../common/thead/thead.vue'
import nodata from '../common/nodata/nodata.vue'
import mycirclelist from '../common/mycirclelist/mycirclelist.vue'
import { MessageBox } from 'mint-ui';
export default {
	data() {
		return {
			title: "我的混圈",
			circlepage:"1",
			totalpage:"",
			circlelist:[],
			circleuser:Object,
			showloading:false
		}
	},
	created(){
		this.initData();
	},
	methods: {
		async initData(){
			await this.$axios({
				method: "post",
				data: {
					"userId":this.$store.state.userId,
					"nowPage":this.circlepage
				},
				url: "/qpp/comic/get/my/allfriendcircle.do"
			}).then((res)=>{
				if(res.data.error == 200){
		            if(res.data.nowpage == res.data.totalpage){
		              this.showloading = true
		            }
		            this.circlepage = res.data.nowpage+1;
		            this.totalpage = res.data.totalpage;
		            this.circlelist = res.data.obj;
		            this.circleuser = res.data.spare;
		          }
			})	
		},
		async loadmore(){
			if(this.circlepage > this.totalpage){
		        return false;
		    }
		    await this.$axios({
				method: "post",
				data: {
					"userId":this.$store.state.userId,
					"nowPage":this.circlepage
				},
				url: "/qpp/comic/get/my/allfriendcircle.do"
			}).then((res)=>{
				if(res.data.error == 200){
		            if(res.data.nowpage == res.data.totalpage){
		              this.showloading = true
		            }
		            this.circlepage = res.data.nowpage+1;
		            this.totalpage = res.data.totalpage;
		            this.circlelist =  [...this.circlelist,...res.data.obj];
		            this.circleuser = res.data.spare;
		          }
			})
		},
		delnode:function(id){
			// document.body.scrollTop = 0;
			// this.showalert = true;
			// this.alertcon = data[0];
			let idnode = document.getElementById(id);
			idnode.style.display="none";
		},
		alertclose:function(){
			this.showalert = false;
		}
	},
	components: {
		vhead,
		mycirclelist,
		nodata
	}
}
</script>
<style lang="stylus" scoped>
	.title
		width:100%;
		height:1.6rem;
		z-index:999;
		position:fixed;
		top:0;
		left:0;
</style>