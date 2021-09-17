<template>
  <div class="container py-5">
    <NavTabs />
    <template>
      <h1 class="mt-5">最新動態</h1>
      <hr />
      <div class="row mt-5">
        <div class="col-md-6">
          <h3>最新餐廳</h3>
          <NewestRestaurants :rests="restaurants" />
        </div>
        <div class="col-md-6">
          <h3>最新評論</h3>
          <NewestComments :comments="comments" />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import NavTabs from "../components/NavTabs.vue";
import NewestRestaurants from "../components/NewestRestaurants.vue";
import NewestComments from "../components/NewestComments.vue";

import restaurantsFeedsAPI from "../apis/restaurantsFeeds";
import { Toast } from "../utils/helpers";

const filterComments = function (comments) {
  return comments.filter((comment) => comment.Restaurant && comment.text);
};

export default {
  name: "restaurants-feeds",
  components: {
    NavTabs,
    NewestRestaurants,
    NewestComments,
  },
  data() {
    return {
      restaurants: [],
      comments: [],
    };
  },
  created() {
    this.fetchFeeds();
  },
  methods: {
    async fetchFeeds() {
      try {
        const { data, statusText } = await restaurantsFeedsAPI.getFeeds();
        if (statusText !== "OK")
          throw new Error("無法取得最新資料，稍後再嘗試");
        const { restaurants, comments } = data;
        this.restaurants = restaurants;
        this.comments = filterComments(comments);
      } catch (err) {
        Toast.fire({ icon: "error", title: err });
      }
    },
  },
};
</script>