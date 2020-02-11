<template>
  <div >
    <div class="swiper-container"  >
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in banners" >
          <a :href="item.url">
            <div class="swiper-img">
              <img :src="item.image" width="100%"  @load="imageLoad">
            </div>
          </a>
        </div>
      </div>
      <!--<div class="swiper-button-prev"></div>左箭头-->
      <!--<div class="swiper-button-next"></div>右箭头-->
      <div class="swiper-pagination"></div><!--分页器
    <!--//图片的圆点-->
    </div>
  </div>

</template>

<script>

  import Swiper from 'swiper'

  export default {
    name: "Swiper",
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
      initSwiper () {
        //加载一个定时器，为避免数据未加载完毕而导致轮播图不循环
        setTimeout(() => {
          this.swiper = new Swiper('.swiper-container',{
            loop : true,
            autoplay: {
              delay: 2500,
              disableOnInteraction: false,
            },
            autoplayDisableOnInteraction : false,
            preventClicks: false,
            speed: 300,
            observer: true,//修改swiper自己或子元素时，自动初始化swiper
            observeParents: true,//修改swiper的父元素时，自动初始化swiper
            // // notNextTick: true, //notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
            // direction: "vertical", //水平方向移动
            // grabCursor: true, //鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状
            // setWrapperSize: true, //Swiper使用flexbox布局(display: flex)，开启这个设定会在Wrapper上添加等于slides相加的宽或高，在对flexbox布局的支持不是很好的浏览器中可能需要用到。
            // autoHeight: true, //自动高度。设置为true时，wrapper和container会随着当前slide的高度而发生变化
            // slidesPerView: 1, //设置slider容器能够同时显示的slides数量(carousel模式)。可以设置为数字（可为小数，小数不可loop），或者 'auto'则自动根据slides的宽度来设定数量。loop模式下如果设置为'auto'还需要设置另外一个参数loopedSlides。
            // mousewheel: true, //开启鼠标滚轮控制Swiper切换。可设置鼠标选项，默认值false
            // mousewheelControl: true, //同上
            // height: window.innerHeight, // 高度设置，占满设备高度
            // resistanceRatio: 0, //抵抗率。边缘抵抗力的大小比例。值越小抵抗越大越难将slide拖离边缘，0时完全无法拖离。本业务需要
            pagination:{
              el:'.swiper-pagination',
              clickable:true
            },
            onSlideChangeEnd: function(swiper){
              swiper.update()
            }
          })
        },500)


      },

      imageLoad () {
        if (!this.isLoad)
        this.$emit('imageLoaded')
        this.isLoad = true
      }
    },
    mounted () {
        this.initSwiper()
    }
    //1. 使用vue提供的$nextTick()方法
    //     当Vue构造器里的data值被修改完成后会调用这个方法，也相当于一个钩子函数吧，和构造器里的updated生命周期很像。
    // 在数据初始化完毕之后，再初始化swiper就不会出现问题了

  }
</script>

<style>
  @import '../../../../node_modules/swiper/css/swiper.css';

  /*分页器样式*/
  .swiper-pagination .swiper-pagination-bullet {
    background: rgb(255,255,255);
    opacity: 0.7;
  }

  .swiper-pagination .swiper-pagination-bullet-active {
    background-color: rgba(255,48,48,.7);
    opacity: 1;
  }
</style>