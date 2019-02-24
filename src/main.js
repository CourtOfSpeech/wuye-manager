import Vue from 'vue' //引入vue实例

import 'normalize.css/normalize.css'// A modern alternative to CSS resets  动态路由

import ElementUI from 'element-ui'   //导入ElementUI
import 'element-ui/lib/theme-chalk/index.css' //导入ElementUI的css样式
import locale from 'element-ui/lib/locale/lang/zh-CN' //导入ElementUI的国际化组件

import '@/styles/index.scss' // global css  全局css

import App from './App' //导入APP组件
import router from './router' //启用路由管理
import store from './store'  //启用状态管理

import '@/icons' // icon  icon 图标库
import '@/permission' // permission control  认证控制，就是拉取用户信息，看是不是这个人

Vue.use(ElementUI, { locale })  //让vue实例使用ElementUI
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
