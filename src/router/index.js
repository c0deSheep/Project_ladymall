import Vue from 'vue'
import VueRouter from 'vue-router'

//路由懒加载方式引入包，可以保证网页加载速度，避免不立即需要得网页js页同时加载,通过npm run build打包最终版后可以得到一个包一个js文件
const Home = () => import ('../views/home/Home')
const Cart = () => import ('../views/cart/Cart')
const Category = () => import ('../views/category/Category')
const Profile = () => import ('../views/profile/Profile')
const Detail = () => import ('../views/detail/Detail')

// 1. 安装插件
Vue.use(VueRouter)


// 2. 创建router实例对象
// 2.1 创建routes相关路由的路径配置
const routes = [
  {
    path:'',
    redirect:'/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    name:'Detail',
    // 两个对应的router获取方法
    // path:'/detail/:iid',
    path:'/detail',
    component:Detail
  }
]

const router = new VueRouter ( {
  routes,
  // 浏览器模式
  mode:'history',
} )


export default router