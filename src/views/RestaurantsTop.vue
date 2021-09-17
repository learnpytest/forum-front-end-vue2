<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">人氣餐廳</h1>

    <hr />
    <div class="card mb-3" style="max-width: 540px; margin: auto">
      <!-- Restaurant top card RestaurantTopCard.vue -->
      <RestaurantTopCard
        v-for="restaurantTop in restaurantsTop"
        :key="restaurantTop.id"
        :restaurant-top="restaurantTop"
        @after-delete-favorite="updateViewAfterDeleteFavorite"
        @after-add-favorite="updateViewAfterAddFavorite"
      />
    </div>
  </div>
</template>

<script>
import NavTabs from "../components/NavTabs.vue";
import RestaurantTopCard from "../components/RestaurantTopCard.vue";

import { Toast } from "../utils/helpers";

import restaurantsTopAPI from "../apis/restaurantsTop";

export default {
  name: "restaurants-top",
  components: {
    NavTabs,
    RestaurantTopCard,
  },
  data() {
    return {
      restaurantsTop: [],
    };
  },
  created() {
    //fetch api restaurants top
    this.fetchRestaurantsTop();
  },
  methods: {
    async fetchRestaurantsTop() {
      //fetch api restaurants top
      try {
        const { data, statusText } =
          await restaurantsTopAPI.getRestaurantsTop();
        if (statusText !== "OK") throw new Error("無法取得人氣餐廳");
        this.restaurantsTop = [...data.restaurants];
      } catch (err) {
        Toast.fire({ icon: "error", title: err });
      }
    },
    updateViewAfterDeleteFavorite(restaurantId) {
      this.restaurantsTop = this.restaurantsTop.map((rest) =>
        rest.id === restaurantId ? { ...rest, isFavorited: false } : rest
      );
    },
    updateViewAfterAddFavorite(restaurantId) {
      this.restaurantsTop = this.restaurantsTop.map((rest) =>
        rest.id === restaurantId ? { ...rest, isFavorited: true } : rest
      );
    },
  },
};
</script>