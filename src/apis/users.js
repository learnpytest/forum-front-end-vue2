import {
  apiHelper
} from "../utils/helpers"

export default {
  getUser({
    userId
  }) {
    return apiHelper.get(`/users/${userId}`)
  },
  getTopUsers() {
    return apiHelper.get('/users/top')
  },
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