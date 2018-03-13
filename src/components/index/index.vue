<template>
  <scroll class="wrapperbox" :data="cartoonlist" :pullup="pullup" @scrollToEnd="loadmore">
    <div id="wrapper" ref="wrapper">
        <swiper :banners = "banners"></swiper>
        <div class="indextitle">今天</div>
        <div class="indexlist">
          <div class="list-item" v-for="cartoon in cartoonlist">
            <div @click='choicecartoon(cartoon.cartoon.id)'>
              <div class="list-title">
                <div class="list-title-icon">
                  <span class="icon-camera"></span>
                </div>
                <div class="list-title-con">
                  <span class="cartoonname">{{cartoon.cartoon.cartoonName}}</span>
                  <span class="cartooneps">{{cartoon.cartoon.updateTile}}</span>
                </div>
                <div class="list-title-author">
                  <span class="icon-my indexicon"></span>
                  <span class="cartoonauthor">{{cartoon.cartoon.cartoonAuthor}}</span>
                </div>
              </div>
              <div class="list-con">
                <div class="list-con-img">
                  <img :src="cartoon.cartoon.mainPhoto" v-lazy="cartoon.cartoon.mainPhoto">
                </div>
                <div class="list-con-icon">
                  <span>关注:</span>
                  <span>{{cartoon.cartoon.followCount}}</span>
                </div>
              </div>
              <div class="list-detail">
                <div class="list-detail-mark" v-for="type in cartoon.cartoonAllType">{{type.carrtoonType.cartoonType}}</div>
                <div class="list-detail-viewer">
                  <span class="list-detail-comment">
                    <span class="icon-discuss"></span>
                    <span>{{cartoon.cartoon.commentCount}}</span>
                  </span>
                  <span class="list-detail-video">
                    <span class="icon-video"></span>
                    <span>{{cartoon.cartoon.playCount}}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="loading" v-if="showloading">
          <loading :loadernone="loadernone"></loading>
        </div>
        <!-- <div class="firstloadview" v-if="showfirstload" @touchmove.prevent>
          <firstload></firstload>
        </div> -->
    </div>
  </scroll>
</template>

<script>
  import swiper from '../common/swiper/swiper.vue';
  import scroll from '../common/scroll/scroll.vue';
  import loading from '../common/loading/loading.vue';
  // import { Indicator } from 'mint-ui'
  import {mapMutations} from 'vuex'
  export default {
    data(){
      return {
        cartoonlistarray:[],
        banners:[],
        pullup: true,
        transitionName: 'slide-left',
        page:"1",
        totalpage:"",
        loadernone:false,
        showloading:false
        // showfirstload:this.$store.state.firstload
      }
    },
    computed:{
      showfirstload:function(){
        return this.$store.state.firstload
      },
      cartoonlist:function(){
        return this.cartoonlistarray
      }
    },
    created() {
      // this.getuser();
      this.bannerajax();
      this.allcartoon();
      // this.renwu();
      // this.panduan();
    },
    methods: {
      ...mapMutations([
        /*记录漫画信息*/
            'RECORD_USERID',
            'UPDATE_FIRSTLOAD',
            'UPDATE_STATE',
            'GET_STATE',
            'RECORD_STATE',
            'GET_CARTOONID',
            'GET_TS',
            'RECORD_TS'
        ]),
      // getuser:function(){
      //   // this.GET_USERID();
      //   // alert(this.$store.state.userId);

      // },
       // panduan:function(){
       //    this.GET_STATE();
       //    this.GET_CARTOONID();
       //    this.GET_TS();
       //    if(this.$route.query.code && this.$store.state.indexstate == null){
       //      this.getuser();
       //    }else{
            
       //      // if(this.$store.state.cartoonid != '' && this.$store.state.ts == null){
       //      //     this.RECORD_TS(1);
       //      //     alert(this.$store.state.cartoonid)
       //      //     this.$router.push(this.$store.state.cartoonid)
       //      // }else{
       //       this.bannerajax();
       //       this.allcartoon(); 
       //      // }
       //    }
       // }, 
      //  async getuser(){
      //   await this.$axios({
      //     method:"post",
      //     data:{
      //       "code":this.$route.query.code,
      //       "qd":this.$route.query.qd
      //     },
      //     url:"/servlet/OAuthAPIServlet.do"
      //   }).then((res)=>{
      //       this.RECORD_USERID(res.data.obj);
      //       this.UPDATE_FIRSTLOAD(res.data.spare);
      //       this.RECORD_STATE(0);
      //       if(this.$store.state.shareurl != null && this.$store.state.shareurl != ''){
      //         this.$router.push(this.$store.state.shareurl);
      //       }
      //       if(this.$store.state.cartoonid != '' && this.$store.state.ts == null && this.$store.state.cartoonid != null){
      //           this.RECORD_TS(1);
      //           // alert(this.$store.state.cartoonid)
      //           this.$router.push(this.$store.state.cartoonid)
      //       }
      //       this.bannerajax();
      //       this.allcartoon();
      //       // this.RECORD_STATE(0);
      //   })
      // },
      // GetQueryString(name){
      //     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      //     var r = window.location.search.substr(1).match(reg);
      //     if (r != null)
      //       return unescape(r[2]);
      //       return null;
      // },
      //初始化数据
      async allcartoon(){
        // Indicator.open({
        //       text: '加载中...',
        //       spinnerType: 'fading-circle'
        //     });
        await this.$axios({
          method: 'post',
          url:"/qpp/comic/get/allcartoon.do",
          data:{
            "userId":this.$store.state.userId,
            "nowPage":this.page
          }
        }).then((res) => {
          if(res.data.error == 200){
            if(this.page == res.data.totalpage){
              this.showloading = true
            }
            this.page = res.data.nowpage+1;
            this.totalpage = res.data.totalpage;
            this.cartoonlistarray = res.data.obj;
          }
          // Indicator.close();
        });
      },
      //加载更多数据
      async loadmore(){
          if(this.page > this.totalpage){
            return false;
          }
          // Indicator.open({
          //   text: '加载中...',
          //   spinnerType: 'fading-circle'
          // });
            await this.$axios({
            method: 'post',
            url:"/qpp/comic/get/allcartoon.do",
            data:{
              "userId":this.$store.state.userId,
              "nowPage":this.page
            }
          }).then((res) => {
            if(res.data.error == 200){
              if(res.data.nowpage == res.data.totalpage){
                this.showloading = true
              }
              this.page = res.data.nowpage+1;
              this.cartoonlistarray = [...this.cartoonlistarray,...res.data.obj]; 
            }
            // Indicator.close();
            // if(res.data.error == 200){
            //   this.page = res.data.nowpage+1;
            //   this.totalpage = res.data.totalpage;
            //   this.cartoonlistarray = res.data.obj;
            // }
            
          });
        },
        /*漫画详情跳转*/
        choicecartoon(id){
          this.$router.push('/cartoon/detail?id='+id);
        },
        /*banner获取*/
        async bannerajax(){
          await this.$axios({
            method:"post",
            data:{
              'userId':this.$store.state.userId
            },
            url: "/qpp/comic/get/banner.do"
          }).then((res)=>{
              this.banners = res.data.obj;
          })
        },
        async renwu(){
          await this.$axios({
            method:"post",
            data:{
              'userId':this.$store.state.userId
            },
            url: "/qpp/comic/add/cartoon/task.do"
          }).then((res)=>{
              // this.banners = res.data.obj;
          })
        }
    },
    components:{
      // vhead,
      swiper,
      scroll,
      loading
    },
    // watch: {
    //   '$route' (to,from) {
    //     // console.log(this.$route)
    //     // console.log(this.$route.path);
    //     // console.log(to.path);
    //     if(to.path == '/main/indexmain/find'){  
    //        this.transitionName = 'slide-left';  
    //     }else if(to.path === '/cartoon/detail'){  
    //        this.transitionName = 'slide-right';  
    //     }  
    //   }
    // }
    
  }
</script>

<style lang="stylus" scoped>
.wrapperbox
    // height:100%;
    // height:26.8586rem;
    height:24.128rem;
    margin-top:1.6rem;  
    // background:#fff;
  #wrapper
    position:relative;
    // pointer-events:auto;
    background:#f2f2f2;
    padding-bottom:2.13rem;
    .indextitle
      display:inline-block;
      padding-left:0.312rem;
      height:0.512rem;
      line-height:0.512rem;
      border-left:4px solid baseColor;
      font-size:0.512rem;
    .indexlist
      // padding-bottom:2rem;
      .list-item
        width:92%;
        margin:0 auto;
        margin-bottom:0.42rem;
        // border:1px solid #000;
        border-radius:0.3rem;
        font-size:0;
        .list-title
          position:relative;
          height:1.49rem;
          font-size:0.512rem;
          line-height:1.49rem;
          background:#fff;
          font-family:PingFang-SC-Medium;
          border-radius:0.256rem 0.256rem 0 0;
          .list-title-icon
            margin-left:0.2rem;
            span
              font-size:0.64rem;
              color:baseColor;
              font-family:PingFang-SC-Medium;
          .list-title-con
            font-size:0.512rem;
            color:#000;  
            font-family:PingFang-SC-Medium;
            .cartoonname
              font-size:0.59rem;
            .cartooneps
              font-size:0.43rem;  
          .list-title-author
            position:absolute;
            right:0.512rem;
            span
              font-size:0.512rem;
              font-family:PingFang-SC-Medium;
              color:rgba(0,0,0,0.5);
            .indexicon
              font-size:0.43rem;
              color:rgba(0,0,0,0.5);
            .cartoonauthor
              font-size:0.43rem;
              opacity:0.6;  
        .list-title>div
          display:inline-block;
        .list-con
          position:relative;
          height:6.272rem;
          .list-con-img
            position:absolute;
            width:100%;
            img
              width:100%;
              height:6.272rem;
          .list-con-icon
            position:absolute;
            background:#000;
            background:rgba(0,0,0,0.4);
            text-align:center;
            border-radius:0 0 0 0.256rem;
            z-index:5;
            width:3.28rem;
            height:0.72rem;
            top:0rem;
            right:0rem;
            font-size:0.42rem;
            span
              // color:#fff;
              color:rgba(255,255,255,0.8);
        .list-detail
          position:relative;
          height:1.49rem;
          font-size:0.512rem;
          line-height:1.49rem;
          background:#fff;
          font-family:PingFang-SC-Medium;
          border-radius:0 0 0.256rem 0.256rem;
        .list-detail
          position:relative;
          div
            display:inline-block;  
          .list-detail-mark
            display:inline-block;
            width:1.78rem;
            height:1rem;
            margin-left:0.2rem;
            line-height:1rem;
            text-align:center;
            font-size:0.42rem;
            border-radius:0.4rem;
            border:1px solid baseColor;
            color:baseColor;
          .list-detail-viewer
            position:absolute;
            right:0.312rem;
            .list-detail-comment
              display:inline-block;
              margin-right:0.2rem;
              span
                color:#a3a3a3;
            .list-detail-video
              display:inline-block;
              span
                color:#a3a3a3;
    .loading
      // margin-bottom:4rem;
      // display:none; 
      margin-top 1rem;
      // padding-bottom 4rem;
      // width:100%;
      // height:1.28rem;
      // text-align:center;
      // font-size:0.64rem;
      // line-height:1.28rem;
    // .firstloadview
    //   width:100%;
    //   height:26.858666rem;
    //   background:rgba(0,0,0,0.4)
    //   position:fixed;
    //   top:0;            
    //   z-index:99;  
</style>
