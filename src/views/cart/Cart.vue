<template>
  <div class="cart">
    <!--导航-->
    <nav-bar class="nav-bar">
      <div slot="center">
        购物车({{cartLength}})
      </div>
    </nav-bar>

    <!--列表-->
    <cart-list></cart-list>

    <!--底部汇总-->
    <cart-bottom-bar></cart-bottom-bar>

  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  import CartList from './childComps/CartList'
  import CartBottomBar from './childComps/CartBottomBar'


  import {mapGetters} from 'vuex'
  export default {
    name: "Cart",
    computed:{
      // cartLength(){
      //   return this.$store.getters.cartLength
      // }
      // mapGetters的两种语法，可以获取getters中的元素
      // 1.以数组的元素获取方式
      //...mapGetters(['cartLength'])
      // 2.以对象的元素获取方式
      ...mapGetters({
        cartLength:'cartLength'
      })
    },
    components:{
      NavBar,
      CartList,
      CartBottomBar
    }
  }
</script>

<style scoped>
  .cart {
    height: 100Vh;
  }

  .nav-bar {
    color: rgba(255,255,255,.9);
    background-color: rgb(255,48,48);
  }

</style>
