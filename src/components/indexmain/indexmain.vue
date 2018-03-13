<template>
<div class="indexmainbox">
  <div class="indexhead">
    <nav>
    	<ul>
    		<li>
				<router-link to="/main/indexmain/index" replace>最新</router-link>
			</li>
    		<li>
    			<router-link to="/main/indexmain/find" replace>发现</router-link>
    		</li>
    	</ul>
    </nav>
    <div class="search" @click="tsearch">
    	<span class="icon-search"></span>
    </div>
  </div>
  <transition :name="transitionName">
  	<keep-alive>
  	<router-view :class="{indexrouter:!ios9}"></router-view>
  </keep-alive>
  </transition>
 </div>
</template>

<script>
  export default {
  	data() {
  		return {
  			transitionName:'',
  			ios9:this.$store.state.ios9
  		}
  	},
  	methods: {
  		/*搜索跳转*/
  		tsearch: function(){
  			this.$router.push('/search');
  		},
  	},
  	watch: {
  		'$route' (to,from) {
  			// console.log(from.path);
  			if(!this.$store.state.ios9){
  				if(to.path == '/main/indexmain/find'){
			       this.transitionName = 'slide-left';  
			    }else if(to.path === '/main/indexmain/index'){  
			       this.transitionName = 'slide-right';  
			    } 
  			}
  		}
  	}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
// baseColor = #ffc438;
.indexmainbox
	.indexrouter
		position:absolute;
		width:100%;
		transition: all .8s ease;  
	.slide-left-enter,
	.slide-right-leave-active 
		opacity:0;
		transform: translateX(100%);
	.slide-left-leave-active,
	.slide-right-enter
		opacity:0;
		transform: translateX(-100%);
	.indexhead
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
		nav
			ul
				font-size:0;
				li
					display:inline-block;
					padding:0.2rem 0;
					font-family:PingFang-SC-Bold;
					font-size:0.68rem;
					a
						color:rgba(255,255,255,0.6);
				.router-link-active
					display:inline-block;
					font-family:PingFang-SC-Bold;
					font-size:0.68rem;
					color:#fff;
					border-bottom:2px solid #fff;
				li + li
					margin-left:1rem;
		.search
			position:absolute;
			padding:0 0.46rem;
			right:0.54rem;
			span
				font-size:0.68rem;
				color:#fff;		
		
</style>