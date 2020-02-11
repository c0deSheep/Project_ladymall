<template>
  <div class="recommend">
    <a href="http://act.mogujie.com/zzlx67">
      <img src="~assets/images/home/recommend_bg.jpg" alt="">
    </a>
  </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props:{
      recommends:{
        type:Array,
      }
    }
  }
</script>

<style scoped>
  .recommend img {
    width: 100%;
  }

</style>