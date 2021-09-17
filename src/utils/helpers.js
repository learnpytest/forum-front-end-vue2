import axios from "axios"
import Swal from "sweetalert2"
import store from "../../store"

// const baseURL = 'https://forum-express-api.herokuapp.com/api'
const baseURL = 'http://localhost:3000/api'

const axiosInstance = axios.create({
  baseURL
})

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  if (!store.state.workInProcess.work) {
    store.commit('setPreloader', true)
  }
  return config
}, err => Promise.reject(err))

axiosInstance.interceptors.response.use(response => {
  store.commit('setPreloader', false)
  return response
}, err => Promise.reject(err))

export const apiHelper = axiosInstance

export const Toast = Swal.mixin({
  toast: true,
  position: "center",
  showConfirmButton: false,
  timer: 3000
})