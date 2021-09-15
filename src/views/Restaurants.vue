<template>
  <div class="container py-5">
    <!-- NavTabs -->
    <NavTabs />
    <Spinner v-if="isLoading" />

    <template v-else>
      <!-- 餐廳類別標籤 -->
      <NavPills :categories="categories" />

      <div class="row">
        <!-- 餐廳清單 RestaurantCard-->
        <RestaurantCard
          v-for="restaurant in restaurants"
          :initial-restaurant="restaurant"
          :key="restaurant.id"
        />
      </div>
      <!-- 餐廳分頁 -->
      <RestaurantsPagination
        v-if="totalPage.length > 1"
        :page="page"
        :totalPage="totalPage"
        :prev="prev"
        :next="next"
        :category-id="categoryId"
      />
    </template>
  </div>
</template>

<script>
import NavTabs from "../components/NavTabs.vue";
import RestaurantCard from "../components/RestaurantCard.vue";
import NavPills from "../components/NavPills.vue";
import RestaurantsPagination from "../components/RestaurantsPagination.vue";
import restaurantsAPI from "../apis/restaurants";
import Spinner from "../components/Spinner.vue";

import { Toast } from "../utils/helpers";

export default {
  name: "restaurants",
  components: {
    NavTabs,
    RestaurantCard,
    NavPills,
    RestaurantsPagination,
    Spinner,
  },
  data() {
    return {
      restaurants: [],
      categories: [],
      categoryId: -1,
      page: 1,
      totalPage: [],
      prev: -1,
      next: -1,
      isLoading: true,
    };
  },
  created() {
    //fetch API
    const { page = "", categoryId = "" } = this.$route.query;
    this.fetchRestaurants({ queryPage: page, queryCategoryId: categoryId });
  },
  methods: {
    async fetchRestaurants({ queryPage, queryCategoryId }) {
      try {
        this.isLoading = true;
        const { data, statusText } = await restaurantsAPI.getRestaurants({
          page: queryPage,
          categoryId: queryCategoryId,
        });
        if (statusText !== "OK")
          throw new Error("無法取得餐廳資料，稍後再嘗試");
        const {
          restaurants,
          categories,
          categoryId,
          page,
          totalPage,
          prev,
          next,
        } = data;

        [
          this.restaurants,
          this.categories,
          this.categoryId,
          this.page,
          this.totalPage,
          this.prev,
          this.next,
        ] = [restaurants, categories, categoryId, page, totalPage, prev, next];
        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title: err,
        });
      }
    },
  },
  beforeRouteUpdate(to, from, next) {
    const { page = "", categoryId = "" } = to.query;
    this.fetchRestaurants({ queryPage: page, queryCategoryId: categoryId });
    next();
  },
};
</script>