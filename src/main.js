import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import fastcilck from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

// 弹出小加载盒子
import toast from 'components/common/toast'



//使用封装的toast
Vue.use(toast)

//使用图片懒加载插件
Vue.use(VueLazyLoad)


Vue.config.productionTip = false

// 全局事件总线,要到设置一个创建全局EventBus,用一个vue实例
Vue.prototype.$bus = new Vue()


new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')


// 解决移动端300ms延迟问题使用插件fastclick
fastcilck.attach(document.body);