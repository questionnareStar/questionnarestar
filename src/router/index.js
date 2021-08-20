import Vue from 'vue'
import VueRouter from 'vue-router'
import MainLayout from '../layout/MainLayout.vue'
import QuestionnareList from '../views/QuestionnareList.vue'
import Waste from '../views/Waste.vue'
import CreateQuestionnare from '../views/Createquestionnare.vue'
import Register from '../views/Register.vue'
Vue.use(VueRouter)

const MainChildRoutes = [{
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
  },
    {
      path: 'register',
      name: 'register',
      component: Register
    },
]

const routes = [{
    path: '/',
    name: 'MainLayout',
    component: MainLayout,
    children: MainChildRoutes
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
