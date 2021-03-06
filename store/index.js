import Vue from "vue"
import Vuex from "vuex"

import usersAPI from "../src/apis/users"
import Toast from "../src/utils/helpers"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: 0,
      name: '',
      email: '',
      image: '',
      isAdmin: false
    },
    token: "",
    isAuthenticated: false,
    preloader: false,
    workInProcess: {
      work: "",
    }
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      }
      state.token = localStorage.getItem('token')
      state.isAuthenticated = true
    },
    revokeAuthentication(state) {
      state.currentUser = {}
      state.isAuthenticated = false
      state.token = ""
      localStorage.removeItem('token')
    },
    setPreloader(state, payload) {
      state.preloader = payload
    },
    setWorkInProcess(state, payload) {
      state.workInProcess = payload
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
        return true
      } catch (err) {

        Toast.fire({
          icon: 'error',
          title: err
        })
        commit('revokeAuthentication')
        return false
      }

    }

  }
})