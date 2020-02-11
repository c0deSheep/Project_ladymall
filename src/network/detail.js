import {request} from "./reuquest";

// 为获取商品详情发送网络请求
export function getDetail (iid) {
  return request({
    url:'/detail',
    params:{
      iid:iid
    }
  })
}


// 对数据整合，使用对象
// 1.获取商品详情页的参数标题等
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    // desc商品描述
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.nowPrice = itemInfo.highNowPrice;
  }
}
// 2.获取商店参数标题等
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}

// 3.获取商品参数
export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}


// 4.获取推荐商品
export function getRecommend () {
  return request ({
    url:'/recommend'
  })
}
