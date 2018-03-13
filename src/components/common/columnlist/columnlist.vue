<template>
	<scroll class="wrapperbox" :data="cartoons" :pullup="pullup" @scrollToEnd="loadmore">
		<div class="columnlist" ref="wrapper">
			<div class="columnitem" v-for="cartoon in cartoons" @click="tcartoon(cartoon.cartoon.id)">
				<div class="columnimg">
					<img :src="cartoon.cartoon.midelPhoto" v-lazy="cartoon.cartoon.midelPhoto">
				</div>
				<div class="columnname">{{cartoon.cartoon.cartoonName}}</div>
			</div>
			<div class="loading" v-if="showloading">
		      <loading></loading>
		    </div>
		</div>
	</scroll>
</template>
<script>
import scroll from '../scroll/scroll.vue'
import loading from '../loading/loading.vue'
	export default {
		data(){
			return {
				pullup:true
			}
		},
		props: ["cartoons","showloading"],
		methods: {
			 tcartoon: function(id){
				this.$router.push('/cartoon?id='+id);
			},
			loadmore:function(){
				this.$emit('loadmore');
			}
		},
		components:{
			scroll,
			loading
		},
		watch:{
			cartoons:function(){
				this.$emit('update');
			}
		}
	}
</script>
<style lang="stylus" scoped>
.wrapperbox
	margin-top:1.6rem;
	height:24.128rem;
	.columnlist
		padding:0.46rem;
		padding-bottom:2.13rem;
		display:flex;
		flex-wrap:wrap;
		text-align:center
		.columnitem
			display:inline-block;
			position:relative;
			width:33.33%;
			text-align:center;
			font-size:0;
			.columnimg
				width:90%;
				height:5.97rem;			
				margin:0 auto;
				border-radius:0.2rem;
				box-shadow:0.2rem 0.1rem 0.2rem #888;
				img
					width:100%;
					height:100%;
					border-radius:0.2rem;
			.columnname
				// position:absolute;
				// bottom:0.1rem;
				margin-top:0.2rem;
				margin-bottom:0.4rem;
				font-size:0.46rem;		
</style>