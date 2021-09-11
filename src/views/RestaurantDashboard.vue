<template>
  <div class="container py-5">
    <div>
      <h1>{{ restaurant.name }}</h1>
      <span class="badge badge-secondary mt-1 mb-3">
        {{ restaurant.categoryName }}
      </span>
    </div>

    <hr />

    <ul>
      <li>評論數： {{ restaurant.commentsLength }}</li>
      <li>瀏覽次數： {{ restaurant.viewCounts }}</li>
    </ul>

    <button type="button" class="btn btn-link" @click="$router.back()">
      回上一頁
    </button>
  </div>
</template>
<script>
import restaurantsAPI from "../apis/restaurants";
import { Toast } from "../utils/helpers";

export default {
  name: "RestaurantDashboard",
  data() {
    return {
      restaurant: {
        id: -1,
        name: "",
        viewCounts: -1,
        commentsLength: -1,
        categoryName: "",
      },
    };
  },
  created() {
    //fetch API
    const { id: restaurantId } = this.$route.params;
    this.fetchRestaurantDashboardData(restaurantId);
  },
  methods: {
    async fetchRestaurantDashboardData(restaurantId) {
      // this.$store.dispatch("fetchRestaurantDashboardData");
      try {
        const { data, statusText } = await restaurantsAPI.getRestaurant({
          restaurantId,
        });
        if (statusText !== "OK")
          throw new Error("無法取得餐廳資料，稍後再嘗試");
        const { id, name, viewCounts, Category, Comments } = data.restaurant;
        console.log("data", data);

        this.restaurant = {
          ...this.restaurant,
          id,
          name,
          viewCounts,
          categoryName: Category ? Category.name : "未分類",
          commentsLength: Comments.length,
        };
      } catch (err) {
        Toast.fire({
          icon: "error",
          title: err,
        });
      }
    },
  },
};
</script>