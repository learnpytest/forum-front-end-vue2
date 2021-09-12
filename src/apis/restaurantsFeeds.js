import {
  apiHelper
} from "../utils/helpers";

export default {
  getFeeds() {
    return apiHelper.get('/restaurants/feeds')
  }
}