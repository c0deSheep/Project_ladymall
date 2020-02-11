// 对首页层的网络请求再做一层封装，view中的home直接导入

import {request} from "./reuquest";

export const RECOMMEND = 'recommend'

export function getHomeMultidata () {
  return request({
    url:'/home/multidata'
  })
}

// 获取商品的方法
export function getHomeGoods (type,page) {
  return request ({
    url:'/home/data',
    params:{
      type,
      page,
    }
  })
}