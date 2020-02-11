<!--设置最基础的一个tabbar中一个格子装载内容的标签-->
<template>
  <!--最外面时tab-bar-item盒子，包括三个元素前两个一对为图标标签，后一个为盒子文字标签-->
    <!--在组件里给每个tab-bar-item盒子添加点击事件以切换路由-->
  <div class="tab-bar-item" @click="itemClick">
    <!--下面元素最外面都有个div元素的原因是v-if/v-els和:class等vue操作不能直接绑定在slot插槽中，因为slot被使用时绑定的属性不会替代的标签-->
    <!--前两个图标标签通过用v-if/v-else来判断哪个显示-->
    <div v-if="!isActive">
      <svg class="icon" aria-hidden="true" >
        <!--最里面使用插槽，在App中才决定里面插槽用什么标签-->
        <slot name="item-icon"></slot>
      </svg >
    </div>
    <div v-else>
      <svg class="icon" aria-hidden="true" >
        <!--最里面使用插槽，在App中才决定里面插槽用什么标签-->
        <slot name="item-icon-active"></slot>
      </svg >
    </div>
    <!--这个时盒子文字标签，通过绑定class来决定文字颜色-->
    <div :style="isActiveColor">
      <!--最里面使用插槽，在App中才决定里面插槽用什么标签-->
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
  // 引入图标标签的样式js文件
  import al from '../../../assets/css/icon_font/iconfont.js'
  export default {
      name: "TabBarItem",
      //设置props属性，让父组件传数据到此
      props:{
        // 传入父组件中使用的tab-bar-item标签上设置的path路径属性
        path:String,
        // 传入父组件中使用的tab-bar-item标签上设置的ativeColor路径属性
        activeColor:{
          type:String,
          //并设置一个默认颜色，当无传入时使用之
          default:'#dd4633'
        }
      },
      // data () {
      //     // return {
      //     //   isActive:false
      //     // }
      // },
      computed : {
        // computed中设置isActive函数是因为computed属性中setter和getter的属性省略
        //使用this.$route.path.indexOf(this.path) !== -1;来判断是否是当前活跃路由，是就添加样式
        isActive () {
          //home -> item(/home) = true
          //home -> item(/category) = false
          //home -> item(/cart) = false
          //home -> item(/profile) = false
          return this.$route.path.indexOf(this.path) !== -1;
        },
        //将字体颜色封装起来，通过父传子props来决定字体颜色，再通过计算属性来让盒子字体改变style
        isActiveColor () {
          return this.isActive ? {color:this.activeColor} : {}
        }
      },
      methods:{
          itemClick () {
            //判断当活跃路由的路径不等于点击路径时，切换路径，相等时不操作
            if (this.$route.path != this.path) {
              this.$router.replace(this.path)
            }
          }
      }
    }



</script>

<style scoped>
  .tab-bar-item {
    flex:1;
    /*各自分一份*/
    text-align: center;
    height: 49px;
    font-size: 14px;

  }

  .tab-bar-item svg {
    margin: 0 auto;
    font-size: 32px;


  }

  .tab-bar-item  {
    color:#b9b9b9;
  }

  /*配置文字图标标签*/
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }


</style>
