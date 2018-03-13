<template>
	<div>
		<vhead :title="title" class="title"></vhead>
		<scroll class="scrollbox" :data="messages" :pullup="pullup" @scrollToEnd="loadmore">
			<div class="messagelist">
				<div class="messageitem" v-for="message in messages">
					<div class="messagetitle">{{message.title}}</div>
					<div class="messagecon">{{message.content}}</div>
					<div class="messagetime">{{message.sendDate}}</div>
				</div>
				<div class="loading" v-if="showloading">
			      <loading></loading>
			    </div>
			</div>
			<div class="alertinfo" v-if="messages.length == ''">暂无消息</div>
		</scroll>
	</div>
</template>
<script>
import loading from '../common/loading/loading.vue'
import scroll from '../common/scroll/scroll.vue'
import	vhead from '../common/thead/thead.vue'
export default {
	data() {
		return {
			title: "我的消息",
			messages:[],
			messagepage:"1",
			totalpage:"",
			pullup:true,
			showloading:false
		}
	},
	created() {
		this.initData();
	},
	methods: {
		/*系统消息获取*/
		async initData(){
			await this.$axios({
				method: "post",
				data: {
					"userId":this.$store.state.userId,
					"nowPage":this.messagepage
				},
				url: "/qpp/comic/get/allNews232.do"
			}).then((res)=>{
				// this.messages = res.data.obj;
				if(res.data.error == 200){
		            if(res.data.nowpage == res.data.totalpage){
		              this.showloading = true
		            }
		            this.messagepage = res.data.nowpage+1;
		            this.totalpage = res.data.totalpage;
		            this.messages = res.data.obj;
		          	}
			})
		},
		async loadmore(){
			if(this.messagepage > this.totalpage){
	            return false;
	        }
			await this.$axios({
				method: "post",
				data: {
					"userId":this.$store.state.userId,
					"nowPage":this.messagepage
				},
				url: "/qpp/comic/get/allNews232.do"
			}).then((res)=>{
				// this.messages = res.data.obj;
				if(res.data.error == 200){
		            if(res.data.nowpage == res.data.totalpage){
		              this.showloading = true
		            }
		            this.messagepage = res.data.nowpage+1;
		            this.messages = [...this.messages,...res.data.obj];
		            // this.messagepage = res.data.nowpage+1;
		            // this.totalpage = res.data.totalpage;
		            // this.messages = res.data.obj;
		          	}
			})
		}
	},
	components: {
		vhead,
		scroll,
		loading
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
	.scrollbox
		margin-top:1.6rem;
		height:24.128rem;	
		.messagelist
			padding:0.46rem 0.86rem;
			// padding-bottom:0.46rem;
			.messageitem
				border-bottom:1px solid #ccc;
				.messagetitle
					margin-top:0.2rem;
					font-size:0.59rem;
					color:#F6CA16;
				.messagecon
					// font-size:0.64rem;
					font-size:0.59rem;
					color:#989898;
				.messagetime
					font-size:0.54rem;
					margin-top:0.2rem;
					margin-bottom:0.2rem;
					color:#989898;
		.alertinfo
			text-align:center;
			font-size:0.64rem;
			color:#b9b9b9;
</style>