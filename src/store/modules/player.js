import Vue from 'vue'

const state = () => ({
  agentList: [],
  credits: [],
  state: {
    isInDialog: false
  }
})

const mutations = {
  updateState (state, payload) {
    if (payload.agentList) {
      Vue.set(state, 'agentList', payload.agentList)
    }

    if (payload.credits) {
      Vue.set(state, 'credits', payload.credits)
    }

    if (payload.state) {
      Vue.set(state, 'state', payload.state)
    }
  },
  emptyState (state) {
    Vue.set(state, 'agentList', [])
    Vue.set(state, 'credits', [])
    Vue.set(state, 'state', {
      isInDialog: false
    })
  }
}

const getters = {
  agentList: state => {
    return state.agentList
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters
}
