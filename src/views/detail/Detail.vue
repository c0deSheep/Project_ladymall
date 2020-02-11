<template>
  <div id="detail">
    <!--导航栏-->
    <detail-nav-bar class="goods-nav-bar" @titleTo="titleTo" ref="nav"/>
    <scroll class="content" ref="scroll" :probe-type='3' @scroll="contentScroll">
      <div>
        <detail-swiper :top-images="topImages"></detail-swiper>
        <detail-base-info :goods="goods"/>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info ref="good" class="goods" :detail-info="detailInfo" @detailItemImgLoad="imageLoad"></detail-goods-info>
        <detail-param-info ref="param" class="param" :param-info="paramInfo"></detail-param-info>
        <detail-comment-info ref="comment" class="comment" :comment-info="commentInfo"></detail-comment-info>
        <goods-list ref="recommend" class="recommends" :goods="recommends"></goods-list>
      </div>

    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <!--对组件注册事件用.native后缀-->
    <back-top @click.native="backClick" v-show="isScroll"/>

    <!--将toast封装-->
    <!--<toast :toast-content="toastContent" :show="show"></toast>-->
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'

  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "../../network/detail";

  import {debounce} from "common/utils";
  import {backTopMixin} from "common/mixin";

  // 快捷使用vuex的actions中的方法
  import {mapActions} from 'vuex'

  // import Toast from 'components/common/toast/Toast'

  export default {
    name: "detail",
    mixins:[backTopMixin],
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      // Toast
    },
    data () {
      return {
        iid : null,
        topImages:null,
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        themeTopYs:[],
        getThemeTopY:null,
        currentIndex:0,

        // toastContent:'',
        // show:false
      }
    },
    activated () {
      // 激活时获取当前路由的params地址后的参数中的iid
      // 1.保存转入的iid
      // ---------两种方法获取路由参数
      // this.iid = this.$route.params.iid
      this.iid = this.$route.query.iid
      // 2.根据iid请求详情网络数据
      getDetail(this.iid).then(res => {
        const data = res.result
        // 2.1根据不同的页面展示位置保存数据
        this.topImages = data.itemInfo.topImages
        // 2.2 获取商品详情数据
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // 2.3 获取商铺信息
        this.shop = new Shop(data.shopInfo)
        // 2.4 保存商品详情数据
        this.detailInfo = data.detailInfo
        // 2.5 获取参数
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        // 2.6 获取评论
        if (data.rate.cRate !==0 ) {
          //接口原因，只获取一条评论
          this.commentInfo = data.rate.list[0]
        }
      })
      // 3.请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      })

      // 4 tabbar滚轮关联：获取数据时，给tabbar用到的图片函数getThemeTopY赋值
      // 并且对给this.getThemeTopY 赋值防抖
      this.getThemeTopY = debounce(() => {
        //每次应用都要将存储位置的数组清空
        this.themeTopYs = []
        this.themeTopYs.push(this.$refs.good.$el.offsetTop)
        this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
      },200)
    },
    methods:{
      //将vuex中actions的方法遍历到当前的this中，省去this.$store.dispatch('方法名',product)，直接this.方法名(product)
      ...mapActions(['addCart']),

      imageLoad () {
        this.$refs.scroll.refresh()
        // 调用获取图片给tabbar关联做防抖函数
        this.getThemeTopY()
      },
      titleTo (index) {
        // switch (index) {
        //   case 0:
        //     this.$refs.scroll.scrollItem.scrollToElement('.goods',100)
        //     break;
        //   case 1:
        //     this.$refs.scroll.scrollItem.scrollToElement('.param',100)
        //     break;
        //   case 2:
        //     this.$refs.scroll.scrollItem.scrollToElement('.comment',100)
        //     break;
        //   case 3:
        //     this.$refs.scroll.scrollItem.scrollToElement('.recommends',100)
        //     break;
        // }
        // 还需要判断滚轮地方和tabbar位置，所有不用上面方法，用获得位置方法
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
      },
      contentScroll(postion) {
        // 1.获取y值
        const positionY = -postion.y

        // 2.positionY和tabbar记录的y值对比
        let length = this.themeTopYs.length
        for (let i = 0; i < length; i++) {
          // if (this.currentIndex !== i && ((i < length - 1 && positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1])
          //   || (i === length - 1 && positionY > this.themeTopYs[i]))){
          // 优化 : 在数组中添加一个无限大的值，这样每次的比较都是大于i，小于i+1对应的值即可
          if (this.currentIndex !== i && ((positionY > this.themeTopYs[i] ) && (positionY < this.themeTopYs[i+1]))) {
              this.currentIndex = i
              console.log(i)
            // 最后让滚动到的界面的ref="scroll"中的currentIndex与这个currentIndex相等
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
        this.listenShowBackTop(postion)
      },
      addToCart () {
        // 1.获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.iid = this.iid
        product.nowPrice = this.goods.nowPrice
        product.count = 0

        // 2.将商品加入到购物车页面
        // this.$store.dispatch('addCart',product).then(res => {
        //   // 3.添加购物车成功(鉴于action的dispatch是会返回一个promise，所以可以在actions中操作，实现)
        //   console.log(res)
        // })

        // 2.使用mapActions的方法
        // this.addCart(product)
        // this.addCart(product).then(res => {
        //   // 3.添加购物车成功(鉴于action的dispatch是会返回一个promise，所以可以在actions中操作，实现)
        //   this.show = true;
        //   this.toastContent = res;
        //
        //   setTimeout(() => {
        //     this.show = false;
        //     this.toastContent
        //   },1000)
        // })


        // 2.使用mapActions的方法同时，使用封装的toast
        this.addCart(product).then( (res) =>{
          this.$toast.show(res) }
        )
      }
    }
  }
</script>

<style scoped>
  #detail {
    height: 100Vh;
    position: relative;
    background-color: #eee;
    z-index: 1001;
  }

  .content  {
    height: calc(100% - 44px - 49px);
    overflow: hidden;
  }

  .content div {
    background-color: #fff;
  }
</style>