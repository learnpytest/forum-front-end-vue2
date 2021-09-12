import {
  apiHelper
} from "../utils/helpers"

export default {
  getRestaurantsTop() {
    return apiHelper.get('/restaurants/top')
  }
}