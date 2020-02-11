import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// 1.安装插件
Vue.use(Vuex)

const state = {
  cartList : []
}

// 2.创建Store对象
const store = new Vuex.Store({
  state,
  mutations,
    // // mutations唯一的目的就是修改state中的状态
    // // mutations中的每个方法尽可能完成的时间比较单一的好
    // addCounter(state,payload) {
    //   payload.count++
    // },
    // addToCart(state,payload) {
    //   state.cartList.push(payload)
    // }
  actions,
    // addCart (context,payload) {
    //   // 1.payload新添加的商品
    //   // 1.查找之前数组中时候有该商品
    //   let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);
    //
    //   // 2.判断oldProduct
    //   if (oldProduct) {
    //     context.commit('addCounter',oldProduct)
    //     // oldProduct.count +=1
    //   }else  {
    //     payload.count = 1
    //     // context.state.cartList.push(payload)
    //     context.commit('addToCart',payload)
    //   }
    //
    // },
  getters
})

// 3.挂载到vue实例中
export default store