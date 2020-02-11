<!--scroll插件使用需要在组件标签中设置高度-->
<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "scroll",
    props:{
      probeType:{
        type:Number,
        default:0
      },
      pullUpLoad:{
        type:Boolean,
        deafault:false
      }
    },
    data() {
      return {
        scrollItem:null,
      }
    },
    methods:{
        scrollContent () {
          // 1.创建BScroll对象
          this.scrollItem = new BScroll (this.$refs.wrapper, {
            //封装思想,为避免一概监听侦测,将这个probeType和pullUpLoad以props传入
            probeType:this.probeType,
            pullUpLoad:this.pullUpLoad,
            click:true
          });

          // 2.监听滚动的位置
          this.scrollItem.on('scroll',(postion) => {
          //  这个postion就是位置坐标轴
          //  将坐标以scroll事件发射出去,哪个使用这个组件的再监听这个事件即可
            this.$emit('scroll',postion)
          });

          // 3.监听拉到底的事件
          this.scrollItem.on('pullingUp',() => {
            this.$emit('pullingUp')
          })
        },

        // 将使用此组件的返回顶部方法封装回scroll组件
        // scrollTo (x, y, time) {  ---time=300为es6语法,默认传300
        scrollTo (x, y, time = 300) {
          this.scrollItem.scrollTo(x,y,time)
        },


        // 将使用此组件的中的下拉加载更多的完成方法封装到此
        finishPullUp () {
          this.scrollItem.finishPullUp()
        },

        // 将使用此组件的中滚动刷新方法封装到此
        refresh () {
          this.scrollItem.refresh()
        },

        // 将保持页面位置的方法封装到此
        getScrollY () {
          return this.scrollItem ? this.scrollItem.y :0
        }


    },
    mounted () {
      this.scrollContent ()
    }
  }
</script>

<style scoped>

</style>