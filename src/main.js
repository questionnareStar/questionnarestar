import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './plugin/index.js'
import VeRing from 'v-charts/lib/ring.common'// 环形图
import VCharts from 'v-charts'
Vue.use(VCharts)
Vue.component(VeRing.name, VeRing)
Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
