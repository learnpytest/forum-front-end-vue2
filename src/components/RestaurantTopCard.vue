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
          :disabled="workInProcess.work === 'fav' + restaurantTop.id"
        >
          {{
            workInProcess.work === "fav" + restaurantTop.id
              ? "處理中"
              : "移除最愛"
          }}
        </button>
        <button
          type="button"
          class="btn btn-primary"
          v-else
          @click="addFavorite(restaurantTop.id)"
          :disabled="workInProcess.work === 'fav' + restaurantTop.id"
        >
          {{
            workInProcess.work === "fav" + restaurantTop.id
              ? "處理中"
              : "加到最愛"
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
  name: "RestaurantsTop",
  mixins: [mixinEmptyImage],
  props: {
    restaurantTop: {
      type: Object,
      required: true,
    },
  },
  computed: { ...mapState(["workInProcess"]) },
  methods: {
    async deleteFavorite(restaurantId) {
      //todo發送api
      try {
        this.$store.commit("setWorkInProcess", {
          work: "fav" + restaurantId,
        });
        const { data } = await usersAPI.deleteFavorite({ restaurantId });
        if (data.status !== "success") throw new Error("無法刪除最愛");
        this.$emit("after-delete-favorite", restaurantId);
        this.$store.commit("setWorkInProcess", {
          work: "",
        });
      } catch (err) {
        this.$store.commit("setWorkInProcess", {
          work: "",
        });
        Toast.fire({ icon: "error", title: err });
      }
    },
    async addFavorite(restaurantId) {
      //todo發送api
      try {
        this.$store.commit("setWorkInProcess", {
          work: "fav" + restaurantId,
        });
        const { data } = await usersAPI.addFavorite({ restaurantId });
        if (data.status !== "success") throw new Error("無法新增最愛");
        this.$emit("after-add-favorite", restaurantId);
        this.$store.commit("setWorkInProcess", {
          work: "",
        });
      } catch (err) {
        this.$store.commit("setWorkInProcess", {
          work: "",
        });
        Toast.fire({ icon: "error", title: err });
      }
    },
  },
};
</script>