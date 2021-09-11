import {
  apiHelper
} from "../utils/helpers"

const getToken = () => localStorage.getItem('token')

export default {
  getCurrentUser() {
    return apiHelper.get('/get_current_user', {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  },
  addFavorite({
    restaurantId
  }) {
    return apiHelper.post(`/favorite/${restaurantId}`, null, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  },
  deleteFavorite({
    restaurantId
  }) {
    return apiHelper.delete(`/favorite/${restaurantId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  },
  like({
    restaurantId
  }) {
    return apiHelper.post(`/like/${restaurantId}`, null, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  },
  unLike({
    restaurantId
  }) {
    return apiHelper.delete(`/like/${restaurantId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })

  },
  getTopUsers() {
    return apiHelper.get('/users/top', {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  },
  addFollowing({
    userId
  }) {
    return apiHelper.post(`/following/${userId}`, null, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  },
  deleteFollowing({
    userId
  }) {
    return apiHelper.delete(`/following/${userId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  },

}