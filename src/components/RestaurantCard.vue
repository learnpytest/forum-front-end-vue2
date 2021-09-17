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
          :disabled="workInProcess.work === 'fav' + restaurant.id"
        >
          {{
            workInProcess.work === "fav" + restaurant.id ? "處理中" : "移除最愛"
          }}
        </button>
        <button
          type="button"
          class="btn btn-primary btn-border favorite mr-2"
          v-else
          @click.stop.prevent="addFavorite(restaurant.id)"
          :disabled="workInProcess.work === 'fav' + restaurant.id"
        >
          {{
            workInProcess.work === "fav" + restaurant.id ? "處理中" : "加到最愛"
          }}
        </button>
        <button
          type="button"
          class="btn btn-danger like mr-2"
          v-if="restaurant.isLiked"
          @click.stop.prevent="unLike(restaurant.id)"
          :disabled="workInProcess.work === 'like' + restaurant.id"
        >
          {{
            workInProcess.work === "like" + restaurant.id ? "處理中" : "Unlike"
          }}
        </button>
        <button
          type="button"
          class="btn btn-primary like mr-2"
          v-else
          @click.stop.prevent="addLike(restaurant.id)"
          :disabled="workInProcess.work === 'like' + restaurant.id"
        >
          {{
            workInProcess.work === "like" + restaurant.id ? "處理中" : "Like"
          }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mixinEmptyImage } from "../utils/mixins";
import { Toast } from "../utils/helpers";

import usersAPI from "../apis/users";

import { mapState } from "vuex";

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
  computed: { ...mapState(["workInProcess"]) },
  methods: {
    async deleteFavorite(restaurantId) {
      try {
        this.$store.commit("setWorkInProcess", { work: "fav" + restaurantId });
        const { data } = await usersAPI.deleteFavorite({ restaurantId });
        if (data.status !== "success")
          throw new Error("無法移除最愛餐廳，稍後再嘗試");
        this.restaurant = {
          ...this.restaurant,
          isFavorited: false,
        };

        this.$store.commit("setWorkInProcess", { work: "" });
      } catch (err) {
        this.$store.commit("setWorkInProcess", { work: "" });
        Toast.fire({
          icon: "error",
          title: err,
        });
      }
    },
    async addFavorite(restaurantId) {
      try {
        this.$store.commit("setWorkInProcess", { work: "fav" + restaurantId });
        const { data } = await usersAPI.addFavorite({ restaurantId });
        if (data.status !== "success")
          throw new Error("無法新增最愛餐廳，稍後再嘗試");
        this.restaurant = {
          ...this.restaurant,
          isFavorited: true,
        };
        this.$store.commit("setWorkInProcess", { work: "" });
      } catch (err) {
        this.$store.commit("setWorkInProcess", { work: "" });
        Toast.fire({
          icon: "error",
          title: err,
        });
      }
    },
    async unLike(restaurantId) {
      try {
        this.$store.commit("setWorkInProcess", { work: "like" + restaurantId });
        const { data } = await usersAPI.unLike({ restaurantId });
        if (data.status !== "success") throw new Error("無法取消讚");
        this.restaurant.isLiked = false;
        this.$store.commit("setWorkInProcess", { work: "" });
      } catch (err) {
        this.$store.commit("setWorkInProcess", { work: "" });
        Toast.fire({ icon: "error", title: err });
      }
    },
    async addLike(restaurantId) {
      try {
        this.$store.commit("setWorkInProcess", { work: "like" + restaurantId });
        const { data } = await usersAPI.like({ restaurantId });
        if (data.status !== "success") throw new Error("無法按讚");
        this.restaurant.isLiked = true;
        this.$store.commit("setWorkInProcess", { work: "" });
      } catch (err) {
        this.$store.commit("setWorkInProcess", { work: "" });
        Toast.fire({ icon: "error", title: err });
      }
    },
  },
};
</script>