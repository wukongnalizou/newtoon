<template>
  <div class="wrapper">
    <div class="show">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <div class="foot-nav">
      <div class="nav-box" id="navindex">
        <router-link to="/main/indexmain" replace><span class="icon-index"></span>首页</router-link>
      </div>
      <div class="nav-box">
        <router-link to="/bookcase" replace><span class="icon-bookcase"></span>书架</router-link>
      </div>
      <div class="nav-box">
        <router-link to="/circle" replace><span class="icon-circle"></span>混圈</router-link>
      </div>
      <div class="nav-box">
        <router-link to="/my" replace><span class="icon-my"></span>我的</router-link>
      </div>
    </div>
    <div class="firstloadview" v-if="showfirstload == 1" @touchmove.prevent>
      <firstload></firstload>
      <!-- <event></event> -->
    </div>
  </div>
</template>

<script>
import firstload from '../firstload/firstload.vue'
// import event from '../event/event.vue'
  export default {
//    created() {
//      this.$ajax.get('../static/data.json').then((res) => {
//        this.user = res.data.user
//       console.log(res.data.user)
//      })
//    }
    data(){
      return {
        // showfirstload:this.$store.state.firstload,
      }
    },
    // beforeRouteEnter(to, from, next) {
    //   next(vm => {
    //     console.log(vm.$route.query.code)
    //     // vm.$router.push('/cartoonimg?id=5Fs4Wv3hwqRKPqCJwgVCSPmoDLtQ9PIO&cartoonId=YFKRbu5IXnNPggM3rYQQHZeay0tatZxE&moneyState=0&sort=1')
    //   })
    // },
    computed:{
      showfirstload:function(){
        return this.$store.state.firstload
      }
    },
    methods: {

    },
    components:{
      firstload,
      event
    }
    // watch:{
    //   '$route' (to,from) {
    //     console.log(this.$route.path);
    //     console.log(to.path);
    //     // if(to.path == '/main/indexmain/find'){  
    //     //    this.transitionName = 'slide-left';  
    //     // }else if(to.path === '/cartoon/detail'){  
    //     //    this.transitionName = 'slide-right';  
    //     // }  
    //   }
    // }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  /*@import "./style/stylus/index.styl"*/
  body
    // position: relative
    height: 100%;
    display:flex;
    flex-direction:column;
    flex:1;
    background #f2f2f2
    .show
      /*width:100%*/
      min-height: 100%
      padding-bottom 2.13rem
      background #f2f2f2
    .foot-nav
      background #fff
      position: fixed;
      height: 2.13rem
      z-index: 100
      border-top: 1px solid #ccc
      left: 0
      right: 0
      bottom 0
      display: flex
      align-items: center
      .nav-box
        flex: 1
        text-align center
        font-size 0.42rem
        align-items: center
        color: #a9a9a9
        a
          color:#a9a9a9
          span
            color:#a9a9a9
        /*font-weight:700*/
        .router-link-active
          color: baseColor
          span
            color: baseColor
        span
          display: block
          font-size 0.9rem
          padding-bottom 0.21rem
        .icon-index
          display: block
    .firstloadview
      width:100%;
      height:100%;
      background:rgba(0,0,0,0.4)
      position:fixed;
      top:0;            
      z-index:999; 
</style>
