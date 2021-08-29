  import Moment from "moment";

  export const mixinFromNowFilters = {
    filters: {
      fromNow(datetime) {
        return datetime ? Moment(datetime).fromNow() : "-"
      },
    },
  }

  export const mixinEmptyImage = {
    filters:{
      emptyImage(src){
        return src || 'https://via.placeholder.com/350x220/DFDFDF?text=No+Image'
      }
    }
  }