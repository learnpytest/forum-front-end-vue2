import Vue from 'vue'
import store from '../store'
import App from './App.vue'
import router from './router'

import "./assets/reset.css"
import "./assets/application.css"

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')