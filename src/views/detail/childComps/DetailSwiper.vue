<template>
    <swiper >
      <swiper-item v-for="item in topImages" class="detail-swiper">
          <img :src="item" alt="">
      </swiper-item>
    </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/content/swiper/index'

  export default {
    name: "HomeSwiper",
    components:{
      Swiper,
      SwiperItem
    },
    props:{
      topImages:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return {
        swiper : null,
      }
    },
    methods:{
    },
  }
</script>

<style scoped>
  .detail-swiper{
    height: 300px;
    width: 100%;
    overflow: hidden;
  }

  .detail-swiper img {
    width: 100%;
  }
</style>