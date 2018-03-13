<template>
	<div class="wrapper">
		<div class="shead">
			<div class="returnbtn" @click="returnbtn">
				<span class="icon-left"></span>
			</div>
			<div class="searchtext">
				<div class="inputbox">
					<input type="text" id="search" @focus="focustext" @blur="blurtext" v-model="searchtext">
					<span class="icon-search" id="sicon" @click="texthide"></span>
					<span id="searchdetail" @click="texthide">搜索漫画</span>
				</div>		
			</div>
			<div class="searchbtn" @click="clicksearch">搜索</div>
		</div>
		<div class="hotrecommend" v-if="ishot">
			<div class="hottitle">
				<div class="title">大家都在搜</div>
			</div>
			<div class="hotlist">
				<div class="hotitem" v-for="recommend in recommends" @click="tsearchlist(recommend)">{{recommend}}</div>
			</div>
		</div>
		<div class="recommendlist" v-else>
			<div class="recommenditem" v-for="history in historys" @click="tsearchlist(history)" v-if="!showlist">
				<span class="icon-clock"></span>
				<span class="name">{{history}}</span>
			</div>
		</div>
		<div class="searchlist" v-if="showlist">
			<rowlist :cartoons="searchlist" :hidindex="hideindex"></rowlist>
		</div>
	</div>
</template>
<script>
import {mapMutations} from 'vuex'
import { mapState } from 'vuex'
import rowlist from '../common/rowlist/rowlist.vue'
	export default {
		data() {
			return {
				ishot:true,
				recommends:[],
				historys:[],
				showlist:false,
				hideindex:true,
				searchtext:"",
				searchlist:[]
			}
		},
		computed: {
			...mapState([
		        'search'
		      ])
		},
		created() {
			this.hotsearch();
		},
		methods: {
			...mapMutations([
	        /*记录漫画信息*/
	            'UPDATE_SEARCH_STATE'
	        ]),
			/*热门搜索推荐*/
			async hotsearch(){
				this.$axios({
					method: "post",
					data:{
						"userId":this.$store.state.userId
					},
					url : "/app/search/initialization.do"
				}).then((res)=>{
					this.recommends = res.data.obj;
				})
			},
			/*点击搜索*/
			async clicksearch(){
				if(this.searchtext != ""){
					await this.$axios({
						method: "post",
						data:{
							"userId":this.$store.state.userId,
							"content":this.searchtext
						},
						url : "/app/search.do"
					}).then((res)=>{
						this.searchlist = res.data.obj;
						this.showlist = true;
					})
				}
				
			},
			/*历史搜索*/
			async gethistory(){
				this.$axios({
					method: "post",
					data: {
						"userId":this.$store.state.userId
					},
					url : "/app/search/initialization/his.do"
				}).then((res)=>{
					this.historys = res.data.obj;
				})
			},
			returnbtn: function(){
				// if(this.search == 1){
				// 	this.UPDATE_SEARCH_STATE(0);
				// 	this.$router.push('/main/indexmain/index');
				// }else{
					this.$router.go(-1);
				// }
			},
			/*搜索获取焦点*/
			focustext: function(){
				this.ishot = false;
				let icon = document.getElementById("sicon");
				let text = document.getElementById("searchdetail");
				icon.style.display="none";
				text.style.display="none";
				this.gethistory();
			},
			/*搜索失去焦点*/
			blurtext: function(){
				if(this.isnull()){
					let icon = document.getElementById("sicon");
					let text = document.getElementById("searchdetail");
					icon.style.display="block";
					text.style.display="block";
					this.ishot = !this.ishot;
					this.showlist = false;
				}
			},
			/*搜索提示隐藏*/
			texthide: function(){
					let oTxt = document.getElementById('search').focus();
					this.focustext();
			},
			/*点击自动搜索*/
			tsearchlist: function(name){
				this.focustext();
				this.searchtext = name;
				this.clicksearch();
			},
			/*判断搜索是否为空*/
			isnull: function(){
				let otext = document.getElementById("search").value;
				let str = otext.replace(/(^\s*)|(\s*$)/g, '');
				if (str == '' || str == undefined || str == null) {
					return true;
				}else{
					return false;
				}
			}
		},
		components: {
			rowlist
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	.shead
		width:100%; 
		height:1.87rem;
		line-height: 1.87rem;
		background:baseColor;
		font-size:0;
		.returnbtn
			position:absolute;
			// left:0.46rem;
			padding:0 0.46rem;	
			font-size:0.64rem;
			span
				color:#fff;
		.searchtext
			display:flex;
			align-items:center;
			// justify-content:center;
			margin-left:2rem;
			font-size:0;
			.inputbox
				position:relative;
				flex:1;
				height:1.87rem;
				display:inline-block;
				input
					display:inline-block;
					padding:0.16rem;
					padding-left:0.4rem;
					margin-top:0.36rem;
					background:#F6CA16;
					width:80%;
					font-size:0.64rem;
					color:#fff;
					border-radius:0.4rem;
				#sicon
					display:inline-block;
					position:absolute;
					top:0.74rem;
					left:0.4rem;
					font-size:0.512rem;
				#searchdetail
					// display:inline-block;
					line-height:0.512rem;
					position:absolute;
					top:0.74rem;
					left:1.2rem;
					font-size:0.512rem;
					color:#fff;	
		.searchbtn
			display:inline-block;
			position:absolute;
			top:0;
			right:0.86rem;
			font-size:0.64rem;
			color:#fff;					
	.hotrecommend
		.hottitle
			padding:0.46rem 0;
			background:#fff;
			border-bottom: 1px solid #ccc;
			.title
				padding-left:0.46rem;
				width:100%;
				height:0.64rem;
				border-left:2px solid baseColor;
				font-size:0.46rem;
				font-family:PingFang-SC-Bold;
				font-weight:700;
		.hotlist
			padding:0.46rem;
			background:#fff;
			display:flex;
			flex-wrap:wrap;
			.hotitem
				margin-left:0.3rem;
				margin-bottom:0.3rem;
				padding:0.2rem;
				border-radius:0.2rem;
				font-size:0.512rem;
				background:#F0EFF5;
	.recommendlist
		padding:0 0.46rem;
		background:#fff;
		.recommenditem
			padding:0.46rem 0;
			font-size:0.512rem;
			border-bottom: 1px solid #ccc;
			.name
				margin-left:0.2rem;
</style>