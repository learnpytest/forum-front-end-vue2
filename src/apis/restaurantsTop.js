import {
  apiHelper
} from "../utils/helpers"

const getToken = () => localStorage.getItem('token')

export default {
  getRestaurantsTop() {
    return apiHelper.get('/restaurants/top', {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  }
}