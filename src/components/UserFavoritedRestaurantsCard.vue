<template>
  <div class="card">
    <div class="card-header">
      <strong>{{ favoritedRestaurants.length }}</strong> 收藏的餐廳
    </div>
    <div class="card-body">
      <a
        href="/restaurants/50"
        v-for="favoritedRestaurant in favoritedRestaurants"
        :key="favoritedRestaurant.id"
      >
        <img
          :src="favoritedRestaurant.image"
          width="60"
          height="60"
          class="avatar"
        />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserFavoritedRestaurantsCard.vue",
  props: {
    favoritedRestaurants: {
      type: Array,
      default: () => [],
    },
  },
};
</script>