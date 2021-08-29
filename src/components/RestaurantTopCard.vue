<template>
  <div class="row no-gutters">
    <!-- Restaurant top card RestaurantTopCard.vue -->
    <div class="col-md-4">
      <a href="#">
        <img class="card-img" :src="restaurantTop.image | emptyImage" />
      </a>
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">{{ restaurantTop.name }}</h5>
        <span class="badge badge-secondary"
          >收藏數：{{ restaurantTop.FavoriteCount }}</span
        >
        <p class="card-text">
          {{ restaurantTop.description }}
        </p>
        <router-link
          :to="{ name: 'restaurant', params: { id: restaurantTop.id } }"
          class="btn btn-primary mr-2"
          >Show</router-link
        >

        <button
          type="button"
          class="btn btn-danger mr-2"
          v-if="restaurantTop.isFavorited"
          @click="deleteFavorite(restaurantTop.id)"
        >
          移除最愛
        </button>
        <button
          type="button"
          class="btn btn-primary"
          v-else
          @click="addFavorite(restaurantTop.id)"
        >
          加到最愛
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { mixinEmptyImage } from "../utils/mixins";

export default {
  name: "RestaurantsTop",
  mixins: [mixinEmptyImage],
  props: {
    restaurantTop: {
      type: Object,
      required: true,
    },
  },
  methods: {
    deleteFavorite(restaurantId) {
      //todo發送api
      this.$emit("after-delete-favorite", restaurantId);
    },
    addFavorite(restaurantId) {
      //todo發送api
      this.$emit("after-add-favorite", restaurantId);
    },
  },
};
</script>