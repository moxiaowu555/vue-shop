import Vue from 'vue'
import Router from 'vue-router'
// 导入tabbar栏组件
import Home from '../components/tabbar/HomeContainer.vue'
import Member from '../components/tabbar/MemberContainer.vue'
import Shopcar from '../components/tabbar/ShopcarContainer.vue'
import Search from '../components/tabbar/SearchContainer.vue'
import NewsList from '../components/news/NewsList.vue'
import PhotoList from '../components/photos/PhotoList.vue'
import NewsInfo from '@/components/news/NewsInfo.vue'
import PhotoInfo from '@/components/photos/PhotoInfo.vue'
import GoodsList from '@/components/goods/GoodsList.vue'
import GoodsInfo from '@/components/goods/GoodsInfo.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/member',
      name: 'Member',
      component: Member
    },
    {
      path: '/shopcar',
      name: 'Shopcar',
      component: Shopcar
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/home/news',
      component: NewsList
    },
    {
      path: '/home/newsinfo/:id',
      component: NewsInfo
    },
    {
      path: '/home/photos',
      component: PhotoList
    },
    {
      path: '/home/photoinfo/:id',
      component: PhotoInfo,
      props: true
    },
    {
      path: '/home/goodslist',
      component: GoodsList
    },
    {
      path: '/home/goodsinfo/:id',
      name: 'goodsInfo',
      component: GoodsInfo,
      props: true
    }
  ],
  linkActiveClass: 'mui-active'
})
