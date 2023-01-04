import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [{
      path: 'index',
      name: 'index',
      component: () => import('@/views/index/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/users',
    component: Layout,
    redirect: '/users/depart',
    name: 'Users',
    meta: { title: '用户管理', icon: 'example' },
    children: [
      {
        path: 'depart',
        name: 'Depart',
        component: () => import('@/views/users/index'),
        meta: { title: '科室管理', icon: 'table' }
      },
      {
        path: 'bussiness',
        name: 'Bussiness',
        component: () => import('@/views/users/bussiness'),
        meta: { title: '企业用户', icon: 'tree' }
      },
      {
        path: 'visitor',
        name: 'Visitor',
        component: () => import('@/views/users/visitor'),
        meta: { title: '访客用户', icon: 'tree' }
      }
    ]
  },

  {
    path: '/building',
    component: Layout,
    redirect: '/building/house',
    name: 'building',
    meta: { title: '楼宇管理', icon: 'form' },
    children: [
      {
        path: 'house',
        name: 'House',
        component: () => import('@/views/building/house'),
        meta: { title: '房源管理', icon: 'form' }
      },
      {
        path: 'through',
        name: 'Through',
        component: () => import('@/views/building/through'),
        meta: { title: '通行区域', icon: 'form' }
      }
    ]
  },

  {
    path: '/access',
    component: Layout,
    redirect: '/access/index',
    name: 'Access',
    meta: {
      title: '门禁管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/access/index'), // Parent router-view
        name: 'accessIndex',
        meta: { title: '门禁管理' }
      },
      {
        path: 'version',
        component: () => import('@/views/access/version'),
        meta: { title: '门禁版本' }
      },
      {
        path: 'net',
        component: () => import('@/views/access/net'),
        meta: { title: 'ip管理' }
      }
    ]
  },

  {
    path: '/record',
    component: Layout,
    redirect: '/record/index',
    name: 'Record',
    meta: { title: '记录查询', icon: 'form' },
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/record/index'),
        meta: { title: '通行记录', icon: 'form' }
      },
      {
        path: 'attendance',
        name: 'Form',
        component: () => import('@/views/record/attendance'),
        meta: { title: '考勤记录', icon: 'form' }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/index',
    name: 'System',
    meta: { title: '系统管理', icon: 'form' },
    children: [
      {
        path: 'index',
        name: 'systemIndex',
        component: () => import('@/views/system/index'),
        meta: { title: '考勤设置', icon: 'form' }
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/system/role'),
        meta: { title: '角色管理', icon: 'form' }
      },
      {
        path: 'user',
        name: 'systemUser',
        component: () => import('@/views/system/user'),
        meta: { title: '用户管理', icon: 'form' }
      },
      {
        path: 'loginLog',
        name: 'loginLog',
        component: () => import('@/views/system/loginLog'),
        meta: { title: '登录日志', icon: 'form' }
      },
      {
        path: 'logs',
        name: 'Logs',
        component: () => import('@/views/system/logs'),
        meta: { title: '操作日志', icon: 'form' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
