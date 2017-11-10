import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter)
import Login from '@/view/login'
import home from '@/view/home/home'
import adpage from '@/view/home/adpage'
import test from '@/view/test'
import basechange from '@/view/cushead/basechange'
import changehead from '@/view/cushead/changehead'
import share from '@/view/cushead/share'

// 根目录
const rootPath = ''

var routes = [
  {
    path: '/test', 
    component: test, 
    name: 'test',
  },
  {
    path: '/home', alias: '/', 
    component: home, 
    name: 'home',
  },
	{
    path: '/adpage',
    component: adpage, 
    name: 'adpage',
  },
  {
    path: '/basechange',
    component: basechange, 
    name: 'basechange',
  },
  {
    path: '/changehead',
    component: changehead, 
    name: 'changehead',
  },
  {
    path: '/share',
    component: share, 
    name: 'share',
	}
].map(route => {
  route.path = rootPath + route.path
  return route
})

const router = new VueRouter({
  mode: 'history',
  base: process.env.NODE_ENV == 'development' ? '': '/love',
  routes
})

// router.beforeEach((to, from, next) => {
//     next() // 确保一定要调用 next()
// })

// import wxApi from './utils/wxApi.js'
// router.afterEach(route => {
//     var currentPage = route.fullPath.substring(1)
//     if (currentPage && currentPage.substring(0,1) != '?') //当跳转到根路径时不记录
//       localStorage.page = route.fullPath.substring(1); //保存当前路由 刷新的时候用
//     if (process.env.NODE_ENV == 'development') return;
//     window.setTimeout(wxApi.init.bind(this,route.meta.share),50)  //加个延时 要不location.href 还是旧的路由
    
// })


export default router
