<template>
  <div class="swiper-slide">
    <slot></slot>
  </div>
</template>

<script>


  export default {
    name: "SwiperItem"
  }
</script>

<style scoped>
  @import '../../../../node_modules/swiper/css/swiper.css';
</style>