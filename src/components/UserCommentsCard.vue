<template>
  <div class="card">
    <div class="card-header">
      <strong>{{ comments.length }}</strong> 已評論餐廳
    </div>
    <div class="card-body">
      <router-link
        :to="{ name: 'restaurant', params: { id: comment.RestaurantId } }"
        v-for="comment in comments"
        :key="comment.id"
      >
        <img
          :src="comment.Restaurant.image"
          width="60"
          height="60"
          class="avatar"
        />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserCommentsCard",
  props: {
    comments: {
      type: Array,
      default: () => ({
        id: -1,
        image: "",
      }),
    },
  },
};
</script>