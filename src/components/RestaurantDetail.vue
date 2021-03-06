<template>
  <div class="row">
    <div class="col-md-12 mb-3">
      <h1>{{ restaurant.name }}</h1>
      <p class="badge badge-secondary mt-1 mb-3">
        {{ restaurant.categoryName }}
      </p>
    </div>
    <div class="col-lg-4">
      <img
        class="img-responsive center-block"
        :src="restaurant.image | emptyImage"
        style="width: 250px; margin-bottom: 25px"
      />
      <div class="contact-info-wrap">
        <ul class="list-unstyled">
          <li>
            <strong>Opening Hour:</strong>
            {{ restaurant.openingHours }}
          </li>
          <li>
            <strong>Tel:</strong>
            {{ restaurant.tel }}
          </li>
          <li>
            <strong>Address:</strong>
            {{ restaurant.address }}
          </li>
        </ul>
      </div>
    </div>
    <div class="col-lg-8">
      <p>{{ restaurant.description }}</p>
      <router-link
        class="btn btn-primary btn-border mr-2"
        :to="{ name: 'restaurant-dashboard', params: { id: restaurant.id } }"
        >Dashboard</router-link
      >

      <button
        type="button"
        class="btn btn-danger btn-border mr-2"
        v-if="restaurant.isFavorited"
        @click="removeFavorite(restaurant.id)"
        :disabled="workInProcess.work === 'fav'"
      >
        {{ workInProcess.work ? "處理中" : "移除最愛" }}
      </button>
      <button
        type="button"
        class="btn btn-primary btn-border mr-2"
        v-else
        @click="addFavorite(restaurant.id)"
        :disabled="workInProcess.work === 'fav'"
      >
        {{ workInProcess.work ? "處理中" : "加到最愛" }}
      </button>
      <button
        type="button"
        class="btn btn-danger like mr-2"
        v-if="restaurant.isLiked"
        @click="unLike(restaurant.id)"
        :disabled="workInProcess.work === 'like'"
      >
        {{ workInProcess.work ? "處理中" : "Unlike" }}
      </button>
      <button
        type="button"
        class="btn btn-primary like mr-2"
        v-else
        @click="addLike(restaurant.id)"
        :disabled="workInProcess.work === 'like'"
      >
        {{ workInProcess.work ? "處理中" : "Like" }}
      </button>
    </div>
  </div>
</template>

<script>
import { mixinEmptyImage } from "../utils/mixins";
import { Toast } from "../utils/helpers";

import usersAPI from "../apis/users";

import { mapState } from "vuex";

export default {
  name: "RestaurantDetail",
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
  computed: {
    ...mapState(["workInProcess"]),
  },
  watch: {
    initialRestaurant() {
      this.restaurant = this.initialRestaurant;
    },
  },
  methods: {
    async removeFavorite(restaurantId) {
      try {
        this.$store.commit("setWorkInProcess", { work: "fav" });
        const { data } = await usersAPI.deleteFavorite({ restaurantId });
        if (data.status !== "success")
          throw new Error("無法移除最愛餐廳，稍後再嘗試");
        this.$emit("after-remove-favorite");
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
        this.$store.commit("setWorkInProcess", { work: "fav" });
        const { data } = await usersAPI.addFavorite({ restaurantId });
        if (data.status !== "success")
          throw new Error("無法新增最愛餐廳，稍後再嘗試");
        this.$emit("after-add-favorite");
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
        this.$store.commit("setWorkInProcess", { work: "like" });
        const { data } = await usersAPI.unLike({ restaurantId });
        if (data.status !== "success")
          throw new Error("無法取消按讚，稍後再嘗試");
        this.$store.commit("setWorkInProcess", { work: "" });
      } catch (err) {
        this.$store.commit("setWorkInProcess", { work: "" });
        Toast.fire({
          icon: "error",
          title: err,
        });
      }
      this.$emit("after-remove-like");
    },
    async addLike(restaurantId) {
      try {
        this.$store.commit("setWorkInProcess", { work: "like" });
        const { data } = await usersAPI.like({ restaurantId });
        if (data.status !== "success") throw new Error("無法按讚，稍後再嘗試");
        this.$emit("after-add-like");
        this.$store.commit("setWorkInProcess", { work: "" });
      } catch (err) {
        this.$store.commit("setWorkInProcess", { work: "" });
        Toast.fire({
          icon: "error",
          title: err,
        });
      }
    },
  },
};
</script>