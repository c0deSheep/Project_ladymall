<template>
  <div id="home">
    <!--顶部栏-->
    <nav-bar class="home-nav-bar" ref="NavBar1">
      <!--替换中间的插槽-->
      <div slot="center">
        <p>购物街</p>
      </div>
    </nav-bar >

    <!--吸顶的另一个思路,复制固定-->
    <tab-control :titles="titles"
                 @tabClick="tabClick"
                 ref="tabControlCopy"
                 v-show="isTabFixed"
                 class="fixed"

    ></tab-control>

    <!--将内容放入滚动组件中-->
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="scroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <div>
        <div class="hide"><p>你发现我啦！ Σ(っ °Д °;)っ
        </p></div>

        <home-swiper :banners="banners" @imageLoaded="imageLoaded"></home-swiper>
        <feature-view :features="recommends" ></feature-view>
        <recommend-view ></recommend-view>
        <tab-control :titles="titles"
                     @tabClick="tabClick"
                     ref="tabControl"
        ></tab-control>
        <good-list :goods="showGoods"></good-list>
      </div>
    </scroll>

    <!--对组件注册事件用.native后缀-->
    <back-top @click.native="backClick" v-show="isScroll"/>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  // import BackTop from 'components/content/backTop/BackTop'


  import {
    getHomeMultidata,
    getHomeGoods
  } from 'network/home'

  import {
    debounce
  } from "common/utils";
  import {
    backTopMixin
  } from 'common/mixin'

  export default {
    name: "Home",
    mixins:[backTopMixin],
    data () {
      return {
        banners: [],
        recommends: [],
        titles:['流行','新款','精选'],
        goods:{
          'pop':{page : 0, list : []},
          'new': {page : 0 , list : []},
          'sell': {page : 0, list: []}
        },
        currentType:'pop',
        // isScroll:null,
        tabOffsetTop:0,
        isTabFixed:false,
        //保存页面位置
        saveY:0
      }
    },
    computed : {
      // 计算属性，将有关过长属性绑定到此
      // 1.切换流行/新款/精选栏的计算属性
      showGoods () {
        return this.goods[this.currentType].list
      },
    },
    components:{
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodList,
      Scroll,
      // BackTop
    },
    // 添加生命周期函数，一旦创建home就发送请求
    created () {
        // 1. 请求多个数据
      this.getHomeMultidata()

        // 2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    mounted () {
      //  1.监听商品列表图片加载完成
      // //使用事件总线,这里后接收一个事件,GoodListItem中发射的事件
      // this.$bus.$on('itemImageLoad', ()=>{
      //   // 然后使滚轮scroll方法中的刷新,
      //   //this.$refs.scroll.scrollItem.refresh()
      //   // 将其封装到对应的组件中
      //   this.$refs.scroll.refresh()
      //
      // })
      // 但是上面的方法需要加载30张图,每张加载完成都进行刷新,加大渲染压力,所以用防抖
      const refresh = debounce(this.$refs.scroll.refresh,200)

      // 执行防抖函数
      this.$bus.$on('homeItemImgLoad', ()=>{
        refresh()
      })

      //  2.监听tabbar的位置,按需固定
      // 所有的组件都有一个属性$el,用于获取组件中的元素
      // this.tabOffsetTop = this.$refs.TabControl.$el.offsetTop
    },
    methods:{
      /**
       * 事件监听的相关方法
       * */
      // // 图片加载滚动条刷新防抖动函数,需要封装到common中
      // debounce (func, delay=200){
      //   let timer =null
      //
      //   return function (...args) {
      //     if (timer) clearTimeout(timer)
      //
      //     timer = setTimeout(() => {
      //       //这里用apply传入this,是因为箭头函数没有this,传入this让this指向vue
      //       func.apply(this,args)
      //     },delay)
      //   }
      // },

      // 1.流行/新款/精选栏切换
      tabClick (index) {
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;
        }

        // 让两个tabbar同步点击
        this.$refs.tabControl.currentIndex = index;
        this.$refs.tabControlCopy.currentIndex = index;
      },

      // 2.返回顶部按钮方法,将该方法封装到mixin中，方便其他需要的运用
      // backClick () {
      //   // 在父组件中可以通过$refs来访问各子组件中的对应ref
      //   // 这里的scroll是在父组件使用的scroll组件的ref属性,scrollItem是scroll组件中的data
      //   //scrollTo是BScroll插件的对象方法,返回顶部,参数为X,Y,需要事件
      //   // this.$refs.scroll.scrollItem.scrollTo(0,0,500)
      //   // 但是上面方法在Home中表达过于臃肿,可以封装到Scroll组件methods中
      //   this.$refs.scroll.scrollTo(0,0)
      //
      // },
      // listenShowBackTop (postion) {
      //   this.isScroll = - postion.y > 1000
      // },

      // 3.返回顶部按钮的选择出现位置
      scroll (postion) {
         // 3.1 判断backtop是否显示,----抽离到mixin
         // this.isScroll = - postion.y > 1000
        this.listenShowBackTop(postion)

         // 3.2 p判断tabControl是否吸顶fixed,是否高出它的高度,
          this.isTabFixed =  postion.y <= - this.tabOffsetTop

      },

      // 4.上拉加载更多
      loadMore () {
          //调用加载页面商品方法
        this.getHomeGoods(this.currentType)
      },

      // 5. tabbar吸顶 imagesLoaded,只有轮播图片加载完成后才是准确的高度
      imageLoaded () {
        // 注意：offset系列需要在定位机制下才能工作
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
      },
      /**
      * 网络请求的相关方法
      * */
      // 1.请求页面数据,并分类存放
      getHomeMultidata() {
        getHomeMultidata()
          .then(res => {
            // 箭头函数的this是会往上寻找，找的的是created的this，created的this就是这个vue
            this.banners = res.data.banner.list;
            this.recommends = res.data.recommend.list;
          })
      },


      // 2.设置加载商品的网络请求
      getHomeGoods  (type) {
        // 默认加载第一页 ,设置常量page0 + 1
        const page =this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
          //arr.push(...nums),前3个点意味着将后面的内容（数组）解构成元素push到arr中
          //arr.concat（）返回可以将内容组合到原数组，返回新数组
          // 下面两个返回亦可
          this.goods[type].list.push(...res.data.list)
          // this.goods[type].list = this.goods[type].list.concat(res.data.list)
          // 加载完数据，页码默认+1
          this.goods[type].page += 1

          // 每次完成上拉加载要执行这个finishPullUp,否则只拉一次
          this.$refs.scroll.finishPullUp()

        })
      }
    },
    // 激活时运行位置
    activated () {
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0,this.saveY,0)
    },
    // 离开页面时候保存位置
    deactivated () {

      //BScroll中有一个属性y记录纵坐标
      //将此方法封装到Scroll
      this.saveY =   this.$refs.scroll.getScrollY()
    }
  }
</script>

<!--scoped作用域，只有在这个vue文档起作用-->
<style scoped>

  .home-nav-bar {
    color: rgba(255,255,255,.9);
    background-color: rgb(255,48,48);

    /*在使用浏览器原生滚动时,为了让导航不跟随一起滚动设置下面样式,但用BScroll后不需要*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 2;*/
  }

  #home {
    /*padding-top: 44px;*/
    background-color: #eee;
    height: 100vh;
  }

  .content {
    /*计算高度calc用100Vh表示100%高度*/
    height: calc(100% - 93px);
    overflow: hidden;
    position: relative;
  }
  
  .hide{
    font-size: 10px;
    position: absolute;
    top: -16px;
    left: 50%;
    transform: translateX(-50%);
  }

  .fixed {
    position: fixed;
    left: 0;
    right: 0;
  }

</style>
