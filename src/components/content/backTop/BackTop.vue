<template>
  <div class="back-top" >
    <img src="~assets/images/common/top.png" alt="">
  </div>
</template>

<script>
  export default {
    name: "BackTop",
    // methods:{
    //   backClick () {
    //     console.log('works')
    //   }
    // }
  }
</script>

<style scoped>
  .back-top {
    position: fixed;
    right: -35px;
    bottom: 60px;
  }

  .back-top img {
    width: 50%;
  }
</style>