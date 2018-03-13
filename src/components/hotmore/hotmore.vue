<template>
	<div class="hotmorebox">
		<vhead :title="title" class="title"></vhead>
		<div class="cartoontype">
			<scroll :data="cartoontypes" :scrollX="scrollX" class="scrollxbox">
				<div class="scrollxwrapper" ref="wrapper">
					<ul>
						<li v-for="(cartoontype,index) in cartoontypes" @click="selected(cartoontype.cartoonType,cartoontype.id,index)" :class="{active:activeName == cartoontype.cartoonType}">{{cartoontype.cartoonType}}</li>
					</ul>
				</div>
			</scroll>
		</div>
		<div class="typelistbox">
			<columnlist :cartoons="cartoons" update="choicecartoon" :showloading="showloading" @loadmore="loadmore"></columnlist>
		</div>
	</div>
</template>
<script>
	import scroll from '../common/scroll/scroll.vue'
	import vhead from '../common/thead/thead.vue'
	import columnlist from '../common/columnlist/columnlist.vue'
	export default {
		data() {
			return {
				title:'更多',
				typepage:"1",
				cartoons:[],
				cartoontypes:[],
				type:"",
				page:"1",
				totalpage:"",
				activeName:"全部",
				scrollX:true,
				showloading:false,
				typeid:"",
			}
		},
		created() {
			this.initData();
			// this.choicecartoon();
		},
		methods: {
			/*获取全部类型漫画*/
			async initData(){
				await this.$axios({
					method: "post",
					data:{
						"userId":this.$store.state.userId,
						"nowPage":this.page
					},
					url: "/qpp/comic/get/cartoon/type.do"
				}).then((res)=>{
					this.cartoontypes = res.data.obj;
					this.typeid = res.data.obj[0].id;
					this.choicecartoon(this.typeid)
				})
			},
			/*根据类型选择漫画*/
			async choicecartoon(id,index){
				let sendid = id;
				if(this.typeid != id){
					this.page = 1;
					this.totalpage = "";
				}
				await this.$axios({
					method: "post",
					data:{
						"userId":this.$store.state.userId,
						"cartoonType":id,
						"nowPage":this.page
					},
					url: "/qpp/comic/get/more/cartoon.do"
				}).then((res)=>{
					if(res.data.error == 200){
						this.typeid = sendid;
						if(res.data.nowpage == res.data.totalpage){
			              	this.showloading = true
			            }else{
			            	this.showloading = false
			            }
						this.totalpage = res.data.totalpage;
						this.page = res.data.nowpage+1;
						this.cartoons = res.data.obj;
					}
				})
			},
			selected:function(name,id,index){
				this.activeName = name;
				this.choicecartoon(id,index);
			},
			async loadmore(){
				if(this.page > this.totalpage){
		            return false;
		        }
				await this.$axios({
					method: "post",
					data: {
						"userId":this.$store.state.userId,
						"cartoonType":this.typeid,
						"nowPage":this.page
					},
					url: "/qpp/comic/get/more/cartoon.do"
				}).then((res)=>{
					if(res.data.error == 200){
		              if(res.data.nowpage == res.data.totalpage){
		                this.showloading = true
		              }
		              this.page = res.data.nowpage+1;
		              this.cartoons = [...this.cartoons,...res.data.obj];
		            }
				})
			}
		},
		components: {
			vhead,
			columnlist,
			scroll
		}
	}
</script>
<style  lang="stylus" scoped>
.hotmorebox
	width:100%;
	min-height:100%;
	background:#fff;
	.title
		width:100%;
		height:1.6rem;
		z-index:9;
		position:fixed;
		top:0;
		left:0;
	.cartoontype
		margin-top:1.6rem;
		padding:0 0.46rem;
		position:fixed;
		z-index:9;
		top:0;
		width:100%;
		background:#fff;
		.scrollxbox
			position:relative
			width:14.976rem;
			height:1.8rem;
			overflow:hidden;
			.scrollxwrapper
				position:absolute;
				ul
					margin-top:0.2rem;
					white-space:nowrap;
					li
						display:inline-block;
						width:2.346rem;
						padding:0.15rem 0.4rem;	
						text-align:center;
						border:1px solid transparent;
						box-sizing:border-box;
						margin-left:0.2rem;
						font-size:0.512rem;
						color:#A3A3A3;
					.active
						color:baseColor;
						border:1px solid baseColor;
						border-radius:0.8rem;	
	.typelistbox
		margin-top:3rem;					
</style>