<template>
  <div>
  <swiper :options="swiperOption" style="height: 6.4rem;overflow:hidden;">
    <swiper-slide v-for="banner in banners" class="swiperbox">
      <img :src="banner.httpImg" :data-cartoon = "banner.cartoonId" width="750" class="swiperitem" @click="tcartoon(banner.cartoonId)">
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</div>
</template>
<script>
// import 'swiper/dist/css/swiper.css';
  export default {
    name: 'carrousel',
    data() {
      return {
        // banners:[],
        swiperOption: {
          autoplay: 3500,
          setWrapperSize: true,
          pagination: '.swiper-pagination',
          paginationClickable: true,
          mousewheelControl: true,
          observeParents: true
        }
      }
    },
    props:['banners'],
    methods: {
      // async initDate(){
      //   await this.$axios({
      //     method: "get",
      //     url: "/data.json"
      //   }).then((res)=>{
      //     this.banners = res.data.src;
      //   })
      // }
      tcartoon:function(id){
        this.$router.push('/cartoon/detail?id='+id);
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.swiperbox
  display:inline-block;
  .swiperitem
    display: inline-block
    width: 100%
    height: 6.4rem
.swiper-pagination-bullet-active
  background:#F6CA16;
</style>
