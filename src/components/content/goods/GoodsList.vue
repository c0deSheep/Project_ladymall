<template>
  <div class="goods">
    <!--遍历30个对象数据-->
    <goods-list-item v-for="item in goods" :goods-item="item" :key="item.id"/>
  </div>
</template>

<script>
  // 引入单个商品组件
  import GoodsListItem from './GoodsListItem'

  export default {
    name: "GoodList",
    components:{
      GoodsListItem
    },
  //  从Home中获取数据
    props:{
      goods:{
        type:Array,
        default () {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    background-color: #fff;
  }


</style>