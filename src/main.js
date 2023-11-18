import Vue from 'vue'
import App from './App.vue'

import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);

import VuePreview from 'vue-preview'
Vue.use(VuePreview)

import axios from 'axios';

axios.defaults.baseURL = 'http://106.52.170.128:8888';

Vue.prototype.$axios = axios;

// 引入vue-router
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// 设置路由规则
import Home from './Pages/Home/Index.vue'
import News from './Pages/News/Index.vue'
import Image from './Pages/Image/Index.vue'
import ImageInfo from './Pages/Image/info.vue'
import Goods from './Pages/Goods/Index.vue'
import ShopCar from './Pages/ShopCar/Index.vue'

const routes = [
  { path: '/', redirect: '/Home' },
  { path: '/Home', component: Home },
  { path: '/News', component: News },
  { path: '/Image', component: Image },
  { path: '/ImageInfo/:imgid', component: ImageInfo },
  { path: '/Goods', component: Goods },
  { path: '/ShopCar', component: ShopCar }
]

let router = new VueRouter({
  mode: 'history',
  routes
})

// // 时间戳
// Vue.filter('dateFormat', (val) => {
//   const dt = new Date(val)
//   const y = dt.getFullYear()
//   const m = (dt.getMonth() + 1 + '').padStart(2, '0')
//   const d = (dt.getDate() + '').padStart(2, '0')
//   const hh = (dt.getHours() + '').padStart(2, '0')
//   const mm = (dt.getMinutes() + '').padStart(2, '0')
//   const ss = (dt.getSeconds() + '').padStart(2, '0')
//   //时间格式年月日、时分秒
//   return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
// })

// 时间戳
Vue.filter('dateFormat', (val) => {
  const dt = new Date(val)
  const y = dt.getFullYear()
  const m = dt.getMonth() + 1
  const d = dt.getDate()
  const hh = dt.getHours()
  const mm = dt.getMinutes()
  const ss = dt.getSeconds()
  //时间格式年月日、时分秒
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
