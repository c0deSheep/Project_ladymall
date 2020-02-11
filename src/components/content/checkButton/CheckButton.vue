<template>
  <div class="check-button">
    <!--<img src="~assets/images/cart/tick.svg" alt="">-->
    <div class="dot" v-show="isChecked"></div>
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props:{
      isChecked:{
        type:Boolean,
        default:false
      }
    }
  }
</script>

<style scoped>
  .check-button {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    /*background-color: rgb(255,48,48);*/
    background-color: #fff;
    border: 0.5px solid rgb(255,48,48);
  }



  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: rgb(255,48,48);
    border: 1px solid rgba(255,255,255,.9);
    margin: 0 auto;
    line-height: 16px;
    text-align: center;
    position: relative;
    bottom: -50%;
    transform: translateY(-50%);
  }
</style>