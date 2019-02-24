import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/table',
    name: 'user',
    meta: { title: '基本信息管理', icon: 'base-info'},
    children: [
      { path: 'admin', name: 'admin', component: () => import('@/views/table/admin'), meta: { title: '管理员', icon: 'admin' }},
      { path: 'house', name: 'house', component: () => import('@/views/table/house'), meta: { title: '房屋', icon: 'house' }},
      { path: 'user', name: 'user', component: () => import('@/views/table/user'), meta: { title: '用户', icon: 'user-info' }},
    ]
  },
  {
    path: '/dynamic',
    component: Layout,
    redirect: '/dynamic/table',
    name: 'Dynamic',
    meta: { title: '公告管理', icon: 'dynamic' },
    children: [
      { path: 'dynamic', name: 'dynamic', component: () => import('@/views/table/dynamic'), meta: { title: '公告管理', icon: 'dynamic-1' }},
    ]
  },
  {
    path: '/charge',
    component: Layout,
    redirect: '/charge/table',
    name: 'Charge',
    meta: { title: '费用管理', icon: 'charge' },
    children: [
      { path: 'charge', name: 'charge', component: () => import('@/views/table/charge'), meta: { title: '费用管理', icon: 'charge-1' }},

    ]
  },
  {
    path: '/feedback',
    component: Layout,
    redirect: '/feedback/table',
    name: 'Feedback',
    meta: { title: '反馈管理', icon: 'feedback' },
    children: [
      { path: 'feedback', name: 'feedback', component: () => import('@/views/table/feedback'), meta: { title: '反馈管理', icon: 'feedback-1' }},
    ]
  },
  {
    path: '/repair',
    component: Layout,
    redirect: '/repair/table',
    name: 'Repair',
    meta: { title: '报修管理', icon: 'repair' },
    children: [
      { path: 'repair', name: 'repair', component: () => import('@/views/table/repair'), meta: { title: '报修管理', icon: 'repair-1' }},
    ]
  },
  {
    path: '/spitslot',
    component: Layout,
    redirect: '/spitslot/table',
    name: 'Spitslot',
    meta: { title: '吐槽管理', icon: 'spitslot' },
    children: [
      { path: 'spitslot', name: 'spitslot', component: () => import('@/views/table/spitslot'), meta: { title: '吐槽管理', icon: 'spitslot-1' }},
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

