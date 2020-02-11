<template>
  <div>
    <swiper>
      <swiper-item  v-for="item in banners" >
        <a :href="item.url">
          <div class="swiper-img">
            <img :src="item.image" width="100%" @load="imageLoad">
          </div>
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  // import Swiper from 'components/content/swiper/Swiper'
  // import SwiperItem from 'components/content/swiper/SwiperItem'
  import {Swiper, SwiperItem} from 'components/content/swiper/index'


  export default {
    name: "HomeSwiper",
    components:{
      Swiper,
      SwiperItem
    },
    props:{
      banners:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return {
        swiper : null,
        isLoad:false,
      }
    },
    methods:{
      imageLoad () {
        if (!this.isLoad)
          this.$emit('imageLoaded')
        this.isLoad = true
      }
    },
  }
</script>

<style scoped>

</style>