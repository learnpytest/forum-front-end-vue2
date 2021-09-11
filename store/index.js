import Vue from "vue"
import Vuex from "vuex"

import usersAPI from "../src/apis/users"
import Toast from "../src/utils/helpers"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      name: '',
      email: '',
      image: '',
      isAdmin: false
    },
    isAuthenticated: false
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      this.state.currentUser = {
        ...this.state.currentUser,
        ...currentUser
      }
      this.state.isAuthenticated = true
    }
  },
  actions: {
    async getCurrentUser({
      commit
    }) {
      try {
        const {
          data,
          statusText
        } = await usersAPI.getCurrentUser()
        if (statusText !== 'OK') throw new Error('無法取得現在使用者')
        commit('setCurrentUser', data)
      } catch (err) {
        Toast.fire({
          icon: 'error',
          title: err
        })
      }

    }

  }
})