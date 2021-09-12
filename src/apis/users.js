import {
  apiHelper
} from "../utils/helpers"

export default {
  getCurrentUser() {
    return apiHelper.get('/get_current_user')
  },
  addFavorite({
    restaurantId
  }) {
    return apiHelper.post(`/favorite/${restaurantId}`, null)
  },
  deleteFavorite({
    restaurantId
  }) {
    return apiHelper.delete(`/favorite/${restaurantId}`)
  },
  like({
    restaurantId
  }) {
    return apiHelper.post(`/like/${restaurantId}`, null)
  },
  unLike({
    restaurantId
  }) {
    return apiHelper.delete(`/like/${restaurantId}`)

  },
  getTopUsers() {
    return apiHelper.get('/users/top')
  },
  addFollowing({
    userId
  }) {
    return apiHelper.post(`/following/${userId}`, null)
  },
  deleteFollowing({
    userId
  }) {
    return apiHelper.delete(`/following/${userId}`)
  },

}