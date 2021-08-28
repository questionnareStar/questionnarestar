import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {},
  state: {
    operatingQ: {
      id: '',
      code: '',
      isReleased: false
    },
    stamp: undefined,// 1普通问卷 2投票问卷 3报名问卷 4疫情打卡问卷
  },
  mutations: {
    updateOperation(state, data) {
      state.operatingQ.id = data.id
      state.operatingQ.code = data.code
      state.operatingQ.isReleased = data.isReleased
    },
    setStamp(state, data) {
      state.stamp = data
    }
  },
  actions: {}
})
