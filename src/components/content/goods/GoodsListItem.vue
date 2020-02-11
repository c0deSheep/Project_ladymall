<template>
  <div class="goods-item">
    <!--图片加载完成执行事件用@load="方法名"-->
    <!--<img :src="showImage" alt="" @load="imageLoad" @click="itemClick">-->
    <!--图片懒加载的方法:1安装，2.导入.3.使用use 4.将img的src改成v-lazy-->
    <img v-lazy="showImage" alt="" @load="imageLoad" @click="itemClick">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props:{
      goodsItem:{
        type:Object,
        default () {
          return {}
        }

      }
    },
    computed:{
      showImage(){
        return this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods:{
      imageLoad () {
        // 将图片加载完成发送到Home中可以用vuex也可以用事件总线eventbus
        //事件总线,某个组件发射一个事件,需要用到这个事件的组件接收
        // this.$bus.$emit('方法名') ---发射
        // this.$bus.on('方法名')
        // this.$bus.$emit('itemImageLoad')
        if (this.$route.path.indexOf('/home')) {
          this.$bus.$emit('homeItemImgLoad')
        }else if (this.$route.path.indexOf('/detail')){
          this.$bus.$emit('detailItemImgLoad')
        }
      },

      //点击商品跳转到详情页detail路由
      // 用$router实例朴素一个地址
      itemClick () {
        //this.$router.push('/detail/' + this.goodsItem.iid)
        this.$router.push({
          path:'/detail',
          query:{
            iid:this.goodsItem.iid
          }
        })
      }
    },
  }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
    margin: 0 auto;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    -ms-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color:var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/images/common/collect.svg") 0 0/14px 14px;
  }
</style>