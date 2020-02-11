<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item,index) in cartList" :itemInfo="item" :key="index"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  import Scroll from 'components/common/scroll/Scroll'

  import CartListItem from './CartListItem'
  export default {
    name: "CartList",
    computed : {
      ...mapGetters(['cartList'])
    },
    components:{
      Scroll,
      CartListItem,

    },
    // BS在一开始的时候就记录的content高度，所以需要在重新激活路由时候，刷新，重新计算高度
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 44px - 49px - 40px);
  }

  .content {
    height: 100%;
    overflow: hidden;
  }

</style>