<template>
	<div class="circlebox">
		<vhead :title="title" :hidereturn="hidereturn" class="title"></vhead>
		<div class="upcircle" @click="tupcircle">
			<span class="icon-camera"></span>
		</div>
		<keep-alive>
			<circlelist :circlelist="circlelist" @loadmore="loadmore" :showloading="showloading"></circlelist>
		</keep-alive>
	</div>
</template>
<script>
import vhead from '../common/thead/thead.vue'
import circlelist from '../common/circlelist/circlelist.vue'
// import { Indicator } from 'mint-ui'
export default {
	data() {
		return {
			title: "混圈",
			hidereturn:true,
			newHot:"1",
			circlepage:"1",
			totalpage:"",
			circlelist:[],
			showloading:false
		}
	},
	created() {
		this.circledata();
	},
	methods: {
		async circledata(){
			// Indicator.open({
	  //           text: '加载中...',
	  //           spinnerType: 'fading-circle'
	  //         });
			await this.$axios({
				method: "post",
				data: {
					"userId":this.$store.state.userId,
					"newHot":this.newHot,
					"nowPage":this.circlepage
				},
				url: "/qpp/comic/get/allfriendcircle.do"
			}).then((res)=>{
				if(res.data.error == 200){
		            if(res.data.nowpage == res.data.totalpage){
		              this.showloading = true
		            }
		            this.circlepage = res.data.nowpage+1;
		            this.totalpage = res.data.totalpage;
		            this.circlelist = res.data.obj;
		          }
		          // Indicator.close();
			})
		},
		async loadmore(){
			if(this.circlepage > this.totalpage){
		        return false;
		    }
		    // Indicator.open({
	     //        text: '加载中...',
	     //        spinnerType: 'fading-circle'
	     //      });
			await this.$axios({
				method: "post",
				data: {
					"userId":this.$store.state.userId,
					"newHot":this.newHot,
					"nowPage":this.circlepage
				},
				url: "/qpp/comic/get/allfriendcircle.do"
			}).then((res)=>{
				// if(res.data.error == 200){
				// 	this.circlelist = res.data.obj;
				// }
				if(res.data.error == 200){
		            if(res.data.nowpage == res.data.totalpage){
		              this.showloading = true
		            }
		            this.circlepage = res.data.nowpage+1;
		            this.totalpage = res.data.totalpage;
		            this.circlelist =  [...this.circlelist,...res.data.obj];
		          }
		          // Indicator.close();
			})
		},
		/*跳转发送混圈*/
		tupcircle: function(){
			this.$router.push('/upcircle');
		},
		
	},
	components: {
		vhead,
		circlelist
	}
}
</script>
<style lang="stylus" scoped>
.circlebox
	position:absolute;
	width:100%;
	.title
		width:100%;
		height:1.6rem;
		z-index:9;
		position:fixed;
		top:0;
		left:0;
	.upcircle
		position:absolute;
		padding:0 0.46rem;
		top:0;
		right:0rem;
		z-index:99;
		span
			font-size:0.64rem;
			color:#fff;	
</style>