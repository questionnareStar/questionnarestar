import Vue from 'vue'
import VueRouter from 'vue-router'
import {message} from '../util/inform'
// 布局文件
import MainLayout from '../layout/MainLayout.vue'
import AuthLayout from '../layout/AuthLayout.vue'
// 用户主页面视图
import QuestionnareList from '../views/QuestionnareList.vue'
import Waste from '../views/Waste.vue'
import CreateQuestionnare from '../views/Createquestionnare.vue'
// 用户登录注册视图
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
//问卷页面
import Questionnare from '../views/Questionnare.vue'
import Preview from '../views/Preview.vue'
import Finish from '../views/Finish.vue'

Vue.use(VueRouter)

const MainChildRoutes = [
  {
    path: 'list',
    name: 'list',
    component: QuestionnareList,
    meta: { sign: true },
  },
  {
    path: 'waste',
    name: 'waste',
    component: Waste,
    meta: { sign: true },
  },
  {
    path: 'create',
    name: 'create',
    component: CreateQuestionnare,
    meta: { sign: true },
  }
]

const AuthChildRoutes = [
  {
    path: 'login',
    name: 'login',
    component: Login,
    meta: { sign: false },
  },
  {
    path: 'register',
    name: 'register',
    component: Register,
    meta: { sign: false },
  },
  {
    path: 'validate/:id',
    name: 'Validate',
    component: Login,
    meta: { sign: false }
  }
]

const QuestionnareChildRoutes = [
]

const routes = [
  {
    path: '/',
    name: 'MainLayout',
    component: MainLayout,
    children: MainChildRoutes,
    meta: { sign: true }
  },
  {
    path: '/auth',
    name: 'AuthLayout',
    component: AuthLayout,
    children: AuthChildRoutes,
    meta: { sign: false }
  },
    {
    path: '/statistics',
    name: 'statistics',
    component: () => import("../views/statistics.vue"),
    meta: { sign: false }
  },
  {
    path: '/questionnare/:id',
    name: 'Questionnare',
    component: Questionnare,
    meta: { sign: false }
  },
  {
    path: '/preview/:from/:id',
    name: 'Preview',
    component: Preview,
    meta: { sign: true }
  },
  {
    path: '/finish',
    name: 'Finish',
    component: Finish,
    meta: { sign: false }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.sign) {
    if (JSON.parse(localStorage.getItem('userInfo')) === undefined || JSON.parse(localStorage.getItem('userInfo')) === null) {
      message({
        message: '请先登录',
        type: 'warning'
      })
      next('/auth/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
