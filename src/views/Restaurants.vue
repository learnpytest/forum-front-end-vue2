<template>
  <div class="container py-5">
    <!-- NavTabs -->
    <NavTabs />

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
      :page="page"
      :totalPage="totalPage"
      :prev="prev"
      :next="next"
      :category-id="categoryId"
    />
  </div>
</template>

<script>
import NavTabs from "../components/NavTabs.vue";
import RestaurantCard from "../components/RestaurantCard.vue";
import NavPills from "../components/NavPills.vue";
import RestaurantsPagination from "../components/RestaurantsPagination.vue";

export default {
  name: "restaurants",
  components: {
    NavTabs,
    RestaurantCard,
    NavPills,
    RestaurantsPagination,
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
    };
  },
  created() {
    //fetch API
    this.$store.dispatch("fetchRestaurants");

    const { restaurants, categories, categoryId, page, totalPage, prev, next } =
      this.$store.state.Restaurants;
    [
      this.restaurants,
      this.categories,
      this.categoryId,
      this.page,
      this.totalPage,
      this.prev,
      this.next,
    ] = [restaurants, categories, categoryId, page, totalPage, prev, next];
  },
};
</script>