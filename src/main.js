// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入 时间格式化插件
import moment from 'moment'
// 引入略缩图插件
import VuePreview from 'vue-preview'
// 导入 全局状态管理
import store from './store/store'

// 引入全局样式
import './css/thumbs.scss'

// 引入mui
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'

// 按需引入 mint-ui
import { Button, Header, Swipe, SwipeItem, Lazyload, Switch } from 'mint-ui'
Vue.component(Button.name, Button)
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Switch.name, Switch)
Vue.use(Lazyload)
Vue.use(VuePreview)


Vue.config.productionTip = false


// 定义全局过滤器 格式化时间
Vue.filter('dateFormat', function (dateStr, pattern="YYYY-MM-DD HH:mm:ss") {
  return moment(dateStr).format(pattern)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
