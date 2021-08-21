import Vue from 'vue'
import VueRouter from 'vue-router'
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

Vue.use(VueRouter)

const MainChildRoutes = [
  {
    path: 'list',
    name: 'list',
    component: QuestionnareList
  },
  {
    path: 'waste',
    name: 'waste',
    component: Waste
  },
  {
    path: 'create',
    name: 'create',
    component: CreateQuestionnare
  }
]

const AuthChildRoutes = [
  {
    path: 'login',
    name: 'login',
    component: Login
  },
  {
    path: 'register',
    name: 'register',
    component: Register
  }
]

const routes = [
  {
    path: '/',
    name: 'MainLayout',
    component: MainLayout,
    children: MainChildRoutes
  },
  {
    path: '/auth',
    name: 'AuthLayout',
    component: AuthLayout,
    children: AuthChildRoutes
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
