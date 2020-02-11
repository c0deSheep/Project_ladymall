export default {
  addCart (context,payload) {
    return new Promise((resolve, reject) => {
      // 1.payload新添加的商品
      // 1.查找之前数组中时候有该商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);

      // 2.判断oldProduct
      if (oldProduct) {
        context.commit('addCounter',oldProduct)
        // oldProduct.count +=1


        //  2.5实现uiTotast方法
        resolve('已添加至购物车')


      }else  {
        payload.count = 1
        // context.state.cartList.push(payload)
        context.commit('addToCart',payload)


        //  2.5实现uiTotast方法
        resolve('已添加至购物车')


      }
    })

  },
}