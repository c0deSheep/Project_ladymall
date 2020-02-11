<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        class="check-button"
        :is-checked="isAllSelected"
        @click.native="selectAll"
      ></check-button>
      <span>全选</span>
    </div>

    <div class="price">
      合计:{{totalPrice}}
    </div>

    <div class="calculate" @click="oderSelect">
      去结算({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'
  export default {
    name: "CartBottomBar",
    components:{
      CheckButton
    },
    data () {
      return {
        warning:'还没有选中商品喔~'
      }
    },
    computed : {
      totalPrice () {
        return '￥' + this.$store.getters.cartList.filter( item => {
          return item.checked
        }).reduce((previousValue,item) => {
          return previousValue +(item.nowPrice * item.count)
        },0).toFixed(2)
      },
      checkLength () {
        return this.$store.state.cartList.filter(item => item.checked).length
      },
      isAllSelected () {
        if (this.$store.getters.cartList.length === 0) return false
        // 4.使用every
        return this.$store.getters.cartList.every(item => item.checked)

        // 1. 使用filter
        //  return !(this.$store.getters.cartList.filter(item => !item.checked).length

        // 2.使用find
        //  return !this.$store.getters.cartList.find(item => !item.checked)

        // 3.普通遍历
        // for (let item of this.cartList) {
        //   if (!item.checked ) {
        //      return false
        //  }
        //}
        // return true

      }
    },
    methods:{
      selectAll () {
        if (this.isAllSelected) {  // 此时为全选中，点击需要全不选
          this.$store.state.cartList.forEach(item => item.checked = false)
        } else {
          this.$store.state.cartList.forEach(item => item.checked = true)
        }
      },
      oderSelect () {

        if (this.$store.state.cartList.every(item => item.checked === false)) {
          this.$toast.show(this.warning)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    display: flex;
    height: 40px;
    line-height: 40px;
    background-color: #f9f9f9;
    font-size: 14px;
  }

  .check-content {
    flex: 1;
    display: flex;
    align-items: center;
    margin-left: 10px;

  }

  .check-button {
    height: 18px;
    width: 18px;
    margin-right: 10px;
  }

  .price {
    /*flex: 1;*/
    width: 30%;
  }

  .calculate {
    margin-left: 50px;
    width: 30%;
    flex:1;
    height: 100%;
    background-color: rgba(255,48,48,0.8);
    color:#fff;
    text-align: center;
    font-size: 16px;
  }
</style>