import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {},
  state: {
    operatingQ: {
      id: '',
      code: ''
    }
  },
  mutations: {
    updateOperation(state, data) {
      state.operatingQ.id = data.id
      state.operatingQ.code = data.code
    }
  },
  actions: {}
})
