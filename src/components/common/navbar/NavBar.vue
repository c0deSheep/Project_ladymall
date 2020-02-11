<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NavBar"
  }
</script>

<style scoped>
  .nav-bar {
    /*display: flex;*/
    /*height: 44px;*/
    /*line-height: 44px;*/
    /*position: relative;*/
    /*z-index: 999*/
    position: relative;
    z-index: 2000;
    background-color: #fff;
    box-shadow: 0 0 1px 1px rgba(0,0,0,0.1);
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;

  }

  .left, .right {
    width: 60px;
  }

  /*flex布局下，当其他部分用px设置时，剩下的可以用flex份额来表示*/
  .center {
    flex: 1;
    text-align: center;
  }
</style>