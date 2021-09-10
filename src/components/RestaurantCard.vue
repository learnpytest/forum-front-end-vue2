<template>
  <div class="col-md-6 col-lg-4">
    <div class="card mb-4">
      <img
        class="card-img-top"
        :src="restaurant.image | emptyImage"
        alt="Card image cap"
        width="286px"
        height="180px"
      />
      <div class="card-body">
        <p class="card-text title-wrap">
          <router-link
            :to="{ name: 'restaurant', params: { id: restaurant.id } }"
          >
            {{ restaurant.name }}
          </router-link>
        </p>
        <span class="badge badge-secondary bg-secondary" style="color: black">{{
          restaurant.Category ? restaurant.Category.name : "未分類"
        }}</span>
        <p class="card-text text-truncate">
          {{ restaurant.description }}
        </p>
      </div>
      <div class="card-footer">
        <button
          type="button"
          class="btn btn-danger btn-border favorite mr-2"
          v-if="restaurant.isFavorited"
          @click.stop.prevent="deleteFavorite(restaurant.id)"
        >
          移除最愛
        </button>
        <button
          type="button"
          class="btn btn-primary btn-border favorite mr-2"
          v-else
          @click.stop.prevent="addFavorite(restaurant.id)"
        >
          加到最愛
        </button>
        <button
          type="button"
          class="btn btn-danger like mr-2"
          v-if="restaurant.isLiked"
          @click.stop.prevent="unLike(restaurant.id)"
        >
          Unlike
        </button>
        <button
          type="button"
          class="btn btn-primary like mr-2"
          v-else
          @click.stop.prevent="addLike(restaurant.id)"
        >
          Like
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mixinEmptyImage } from "../utils/mixins";
import usersAPI from "../apis/users";
import { Toast } from "../utils/helpers";

export default {
  name: "RestaurantCard",
  mixins: [mixinEmptyImage],
  props: {
    initialRestaurant: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      restaurant: this.initialRestaurant,
    };
  },
  methods: {
    async deleteFavorite(restaurantId) {
      try {
        const { data } = await usersAPI.deleteFavorite({ restaurantId });
        if (data.status !== "success")
          throw new Error("無法移除最愛餐廳，稍後再嘗試");
        this.restaurant = {
          ...this.restaurant,
          isFavorited: false,
        };
      } catch (err) {
        Toast.fire({
          icon: "error",
          title: err,
        });
      }
    },
    async addFavorite(restaurantId) {
      try {
        const { data } = await usersAPI.addFavorite({ restaurantId });
        if (data.status !== "success")
          throw new Error("無法新增最愛餐廳，稍後再嘗試");
        this.restaurant = {
          ...this.restaurant,
          isFavorited: true,
        };
      } catch (err) {
        Toast.fire({
          icon: "error",
          title: err,
        });
      }
    },
    async unLike(restaurantId) {
      try {
        const { data } = await usersAPI.unLike({ restaurantId });
        if (data.status !== "success") throw new Error("無法取消讚");
        this.restaurant.isLiked = false;
      } catch (err) {
        Toast.fire({ icon: "error", title: err });
      }
    },
    async addLike(restaurantId) {
      try {
        const { data } = await usersAPI.like({ restaurantId });
        if (data.status !== "success") throw new Error("無法按讚");
        this.restaurant.isLiked = true;
      } catch (err) {
        Toast.fire({ icon: "error", title: err });
      }
    },
  },
};
</script>