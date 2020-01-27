import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      session: null
    }),
    mutations: {
      updateSession(state, key) {
        state.session = key
      }
    }
  })
}

export default createStore
