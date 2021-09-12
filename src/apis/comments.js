import {
  apiHelper
} from "../utils/helpers"

export default {
  comments: {
    create({
      formData
    }) {
      return apiHelper.post('/comments', formData)
    },
    delete({
      commentId
    }) {
      return apiHelper.delete(`/comments/${commentId}`)
    }
  }
}