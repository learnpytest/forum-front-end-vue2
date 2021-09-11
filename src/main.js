import Vue from 'vue'
import store from '../store'
// import {
//   RestaurantsFeeds,
//   Restaurants,
//   UsersTop,
//   Restaurant,
//   CurrentUser,
//   RestaurantsTop,
//   RestaurantDashboardData,
//   Users,
//   User,
//   AdminRestaurants,
//   AdminRestaurant,
//   Categories
// } from '../store/dummyData'

import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// const store = new Vuex.Store({
//   state: {
//     restaurantsFeeds: []
//   },
//   actions: {
//     mutationFetchRestaurantsFeeds(context) {
//       context.commit('mutationFetchRestaurantsFeeds', RestaurantsFeeds)
//     },
//     fetchRestaurants(context) {
//       context.commit('mutationFetchRestaurants', Restaurants)
//     },
//     fetchUsersTop(context) {
//       context.commit('mutationfetchUsersTop', UsersTop)
//     },
//     fetchRestaurant(context) {
//       context.commit('mutationfetchRestaurant', Restaurant)
//     },
//     fetchCurrentUser(context) {
//       context.commit('mutationfetchCurrentUser', CurrentUser)
//     },
//     fetchRestaurantsTop(context) {
//       context.commit('mutationfetchRestaurantsTop', RestaurantsTop)
//     },
//     fetchRestaurantDashboardData(context) {
//       context.commit('mutationfetchRestaurantDashboardData', RestaurantDashboardData)
//     },
//     fetchUsers(context) {
//       context.commit('mutationfetchUsers', Users)
//     },
//     fetchUser(context) {
//       context.commit('mutationfetchUser', User)
//     },
//     fetchAdminRestaurants(context) {
//       context.commit('mutationfetchAdminRestaurants', AdminRestaurants)
//     },
//     fetchAdminRestaurant(context) {
//       context.commit('mutationfetchAdminRestaurant', AdminRestaurant)
//     },
//     fetchCategories(context) {
//       context.commit('mutationfetchCategories', Categories)
//     },
//   },
//   mutations: {
//     mutationFetchRestaurantsFeeds(state, RestaurantsFeeds) {
//       state.restaurantsFeeds = RestaurantsFeeds
//     },
//     mutationFetchRestaurants(state, Restaurants) {
//       state.Restaurants = Restaurants
//     },
//     mutationfetchUsersTop(state, UsersTop) {
//       state.UsersTop = UsersTop
//     },
//     mutationfetchRestaurant(state, Restaurant) {
//       state.Restaurant = Restaurant
//     },
//     mutationfetchCurrentUser(state, currentUser) {
//       state.currentUser = currentUser
//     },
//     mutationfetchRestaurantsTop(state, RestaurantsTop) {
//       state.RestaurantsTop = RestaurantsTop
//     },
//     mutationfetchRestaurantDashboardData(state, RestaurantDashboardData) {
//       state.RestaurantDashboardData = RestaurantDashboardData
//     },
//     mutationfetchUsers(state, Users) {
//       state.Users = Users
//     },
//     mutationfetchUser(state, User) {
//       state.User = User
//     },
//     mutationfetchAdminRestaurants(state, AdminRestaurants) {
//       state.AdminRestaurants = AdminRestaurants
//     },
//     mutationfetchAdminRestaurant(state, AdminRestaurant) {
//       state.AdminRestaurant = AdminRestaurant
//     },
//     mutationfetchCategories(state, Categories) {
//       state.Categories = Categories
//     }
//   }
// })

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')