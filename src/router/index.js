import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  message
} from '../util/inform'
// 布局文件
import MainLayout from '../layout/MainLayout.vue'
import AuthLayout from '../layout/AuthLayout.vue'
// 用户主页面视图
import QuestionnareList from '../views/QuestionnareList.vue'
import Waste from '../views/Waste.vue'
import Edit from '../views/Edit.vue'
import CheckInEdit from '../views/CheckInEdit.vue'
import VotingEdit from '../views/VotingEdit.vue'
import Publish from '../views/Publish.vue'
import Welcome from '../views/Welcome.vue'
import TransitionPage from '../views/TransitionPage.vue'
// 用户登录注册视图
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
//问卷页面
import Questionnare from '../views/Questionnare.vue'
import CheckInQuestionnare from '../views/CheckInQuestionnare.vue'
import Preview from '../views/Preview.vue'
import Finish from '../views/Finish.vue'
import VotingQuestionnare from '../views/VotingQuestionnare.vue'
import VotingSurvey from '../views/VotingSurvey.vue';
import CreateRegistration from '../views/CreateRegistration.vue'
import EditRegistration from '../views/EditRegistration.vue'
Vue.use(VueRouter)

const MainChildRoutes = [{
    path: 'list',
    name: 'list',
    component: QuestionnareList,
    meta: {
      sign: true
    },
  },
  {
    path: 'waste',
    name: 'waste',
    component: Waste,
    meta: {
      sign: true
    },
  },
  {
    path: 'publish',
    name: 'publish',
    component: Publish,
    meta: {
      sign: true
    }
  },
  {
    path: 'welcome',
    name: 'welcome',
    component: Welcome,
    meta: {
      sign: false
    }
  },
  {
    path: 'create',
    name: 'create',
    component: TransitionPage,
    meta: {
      sign: true
    }
  },
  {
    path: '/voting/create',
    name: 'create',
    component: VotingQuestionnare,
    meta: {
      sign: true
    }
  },
  {
    path: '/voting/edit',
    name: 'create',
    component: VotingEdit,
    meta: {
      sign: true
    }
  },
  {
    path: '/registration/edit',
    name: 'edit',
    component: EditRegistration,
    meta: {
      sign: true
    }
  },
  {
    path: '/registration/create',
    name: 'edit',
    component: CreateRegistration,
    meta: {
      sign: true
    }
  },
  {
    path: '/normal/edit',
    name: 'edit',
    component: Edit,
    meta: {
      sign: true
    }
  },
  {
    path: '/checkin/edit',
    name: 'edit',
    component: CheckInEdit,
    meta: {
      sign: true
    }
  }
]

const AuthChildRoutes = [{
    path: 'login',
    name: 'login',
    component: Login,
    meta: {
      sign: false
    },
  },
  {
    path: 'register',
    name: 'register',
    component: Register,
    meta: {
      sign: false
    },
  },
  {
    path: 'validate/:id',
    name: 'validate',
    component: Login,
    meta: {
      sign: false
    }
  }
]

const QuestionnareChildRoutes = [{
  path: '/normal/:id',
}]

const routes = [{
    path: '/',
    name: 'MainLayout',
    component: MainLayout,
    children: MainChildRoutes,
    meta: {
      sign: false
    }
  },
  {
    path: '/auth',
    name: 'AuthLayout',
    component: AuthLayout,
    children: AuthChildRoutes,
    meta: {
      sign: false
    }
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: () => import("../views/statistics.vue"),
    meta: {
      sign: false
    }
  },
  {
    path: '/questionnare/normal/:id',
    name: 'Questionnare',
    component: Questionnare,
    meta: {
      sign: false
    }
  },
  {
    path: '/questionnare/signfor/:id',
    name: 'QuestionnareRegistration',
    component: Questionnare,
    meta: {
      sign: false
    }
  },
  {
    path: '/questionnare/vote/:id',
    name: 'QuestionnareVoting',
    component: VotingSurvey,
    meta: {
      sign: false
    }
  },
  {
    path: '/questionnare/checkin/:id',
    name: 'QuestionnareCheckin',
    component: CheckInQuestionnare,
    meta: {
      sign: false
    }
  },
  {
    // 0 为回收站， 1 为列表
    path: '/preview/:from/:id',
    name: 'Preview',
    component: Preview,
    meta: {
      sign: true
    }
  },
  {
    path: '/finish',
    name: 'Finish',
    component: Finish,
    meta: {
      sign: false
    }
  },
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
