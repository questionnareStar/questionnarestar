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
    }
  },
  mutations: {
    updateOperation(state, data) {
      state.operatingQ.id = data.id
      state.operatingQ.code = data.code
      state.operatingQ.isReleased = data.isReleased
    }
  },
  actions: {}
})
