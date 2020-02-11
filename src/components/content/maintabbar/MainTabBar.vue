<template>
  <div class="main-tab-bar">
    <!--当用驼峰命名法来注册组件时，你在template中引用既可以沿用里注册时的驼峰名，也可以使用小写加横线的形式，不影响使用-->
    <!--<TabBar></TabBar>-->
    <!--<tab-bar></tab-bar>-->
    <!--为避免一个组件中插入太多html组件，所以将可以分离的tabbar和tabbar-item抽离设置对应的组件，则待需要使用时直接可以插入使用-->
    <!--  一个tab-bar 组件-->
    <TabBar>
      <!-- 在tab-bar组件里留有slot插槽，插入四个插入的tab-bar-item组件-->
      <!--在父组件中的tab-bar-item标签中添加path属性，作用是传递数据到子组件中-->
      <!--再在父组件中的tab-bar-item标签中添加activeColor用与设置字体活跃时颜色-->
      <TabBarItem path="/Home" activeColor="#dd4633">
        <!-- 每个tab-bar-item插入三个slot插槽备用，此时插入tabbar-item时使用插槽，改成对应需要的图标标签和文字盒子标签-->
        <use xlink:href="#iconhome-copy1" slot="item-icon"></use>
        <use xlink:href="#iconhome-copy" slot="item-icon-active"></use>
        <div slot="item-text">首页</div>
      </TabBarItem>
      <TabBarItem path="/Category" activeColor="#dd4633">
        <use xlink:href="#iconmarks-copy1" slot="item-icon"></use>
        <use xlink:href="#iconmarks-copy" slot="item-icon-active"></use>
        <div slot="item-text">分类</div>
      </TabBarItem>
      <TabBarItem path="/Cart" activeColor="#dd4633">
        <use xlink:href="#iconcart-copy-copy" slot="item-icon"></use>
        <use xlink:href="#iconcart-copy" slot="item-icon-active"></use>
        <div slot="item-text">购物车</div>
      </TabBarItem>
      <TabBarItem path="/Profile" activeColor="#dd4633">
        <use xlink:href="#iconnickname-copy1" slot="item-icon"></use>
        <use xlink:href="#iconnickname-copy" slot="item-icon-active"></use>
        <div slot="item-text">我的</div>
      </TabBarItem>
    </TabBar>
  </div>
</template>

<script>
  // 引入TabBar和TabBarItem两个组件
  // import TabBar from './tabbar/TabBar'
  // import TabBarItem from './tabbar/TabBarItem'
  //  webpack.base.config.js中有个别名方法可以通过输入别名来对某个文件进行搜索
  // alias: {
  // '@': resolve('src'),
  // }
  // 这样就可以通过输入@来表示src然后一层层路径输入
  import TabBar from 'components/common/tabbar/TabBar'
  import TabBarItem from 'components/common/tabbar/TabBarItem'


    export default {
        name: "MainTabBar",
      components:{
          TabBar,
          TabBarItem,
      }
    }
</script>

<style scoped>

</style>
