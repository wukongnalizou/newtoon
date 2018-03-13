<template>
  <div class="loading">
    <!-- <div class="loader-more" v-show="!loadernone">正在加载更多...</div> -->
    <!-- <div class="loader-none" v-show="loadernone">暂无更多数据</div> -->
    <div class="loader-none">我们是有底线的</div>
  </div>
</template>

<script>
export default {
  name: 'loading',
  data () {
    return {

    }
  },
  // props: {
  //   loadernone: {
  //       type: Boolean,
  //       default: false
  //   },
  // },
  methods: {

  }
}
</script>

<style lang="stylus">
.loading
  width:100%;
  // background:#fff;
  .loader-none
    padding-top:0.4rem;
    text-align:center;
    font-size:0.54rem;
    color:#b9b9b9;
</style>
