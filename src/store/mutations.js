export default {
  // mutations唯一的目的就是修改state中的状态
  // mutations中的每个方法尽可能完成的时间比较单一的好
  addCounter(state,payload) {
    payload.count++
  },
  addToCart(state,payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}