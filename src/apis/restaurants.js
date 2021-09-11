import {
  apiHelper
} from "../utils/helpers"

const getToken = () => localStorage.getItem('token')

export default {
  getRestaurant({
    restaurantId
  }) {
    return apiHelper.get(`/restaurants/${restaurantId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  },
  getRestaurants({
    page,
    categoryId
  }) {
    const searchParams = new URLSearchParams({
      page,
      categoryId
    })
    return apiHelper.get(`/restaurants?${searchParams.toString()}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  }
}