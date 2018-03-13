<template>
	<div class="newdis">
		<alldislist :discusses="discusses" @tdisdetail="tdisdetail" @goodclick="goodclick" @loadmore="loadmore" :showloading="showloading"></alldislist>
	</div>
</template>
<script>
import alldislist from '../common/alldislist/alldislist.vue'
export default {
	data() {
		return {
			discussarray:[],
			alldispage:"1",
			totalpage:"",
			showloading:false
		}
	},
	created() {
		this.initData();
	},
	computed:{
		discusses:function(){
			return this.discussarray
		}
	},
	methods: {
		async initData(){
			await this.$axios({
				method: "post",
				data:{
					"userId":this.$store.state.userId,
					"nowPage":this.alldispage,
					"cartoonId":this.$route.query.id,
					"bestNew":1
				},
				url: "/qpp/comic/get/allcomment.do"
			}).then((res)=>{
				document.body.scrollTop = 0;
				if(res.data.error == 200){
					this.alldispage = res.data.nowpage+1;
					this.totalpage = res.data.totalpage;
					this.discussarray = res.data.obj;
				}
			})
		},
		/*评论详情跳转*/
		tdisdetail:function(id){
				this.$router.push('/disdetail?id='+id);
		},
		/*评论点赞*/
		async goodclick(id){
			let nownode = event.currentTarget.children[1];
			let nowicon = event.currentTarget.children[0];
			let nowdata = event.currentTarget;
			let datastate = nowdata.getAttribute('data-state');
			await this.$axios({
				method: "post",
				url : "/qpp/comic/add/okcount.do",
				data: {
					"userId":this.$store.state.userId,
					"id":id,
					"veryOk":datastate
				}
			}).then((res)=>{
				nownode.innerHTML = res.data.obj.cartoonComment.okCount;
				nowdata.setAttribute('data-state',res.data.obj.veryOk);
				if(res.data.obj.veryOk){
					nowicon.style.color = '#ffc438';
					nownode.innerText = parseInt(nownode.innerText) + 1;
				}else{
					nowicon.style.color = '#b9b9b9';
					nownode.innerText = parseInt(nownode.innerText) - 1;
				}
			})
		},
		async loadmore(){
			// if(this.alldispage == this.totalpage){}
			if(this.alldispage > this.totalpage){
				return false;
			}
			await this.$axios({
				method: "post",
				data:{
					"userId":this.$store.state.userId,
					"nowPage":this.alldispage,
					"cartoonId":this.$route.query.id,
					"bestNew":1
				},
				url: "/qpp/comic/get/allcomment.do"
			}).then((res)=>{
				// document.body.scrollTop = 0;
				if(res.data.error == 200){
					if(res.data.nowpage == res.data.totalpage){
						this.showloading = true
					}
					this.alldispage = res.data.nowpage+1;
					this.discussarray = [...this.discussarray,...res.data.obj];
				}
			})
		}
	},
	components: {
		alldislist
	}
}	
</script>
<style lang="stylus">
</style>