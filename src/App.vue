<template>
  <div id="app">
    <!--keep-alive,保持跳转后返回的界面，exclude需要重新刷新的路由-->
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <MainTabBar></MainTabBar>
  </div>
</template>

<script>
  import MainTabBar from 'components/content/maintabbar/MainTabBar'
  export default {
    name: 'app',
    components: {
      MainTabBar,
    }
  }
</script>

<style>
 @import "assets/css/base.css";
</style>
