<template>
  <table class="table">
    <thead class="thead-dark">
      <tr>
        <th scope="col">#</th>
        <th scope="col">Category</th>
        <th scope="col">Name</th>
        <th scope="col" width="300">操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="restaurant in restaurants" :key="restaurant.id">
        <th scope="row">
          {{ restaurant.id }}
        </th>
        <td>{{ restaurant.Category ? restaurant.Category.name : "未分類" }}</td>
        <td>{{ restaurant.name }}</td>
        <td class="d-flex justify-content-between">
          <router-link
            :to="{ name: 'admin-restaurant', params: { id: restaurant.id } }"
            class="btn btn-link"
            >Show</router-link
          >

          <router-link
            :to="{
              name: 'admin-restaurant-edit',
              params: { id: restaurant.id },
            }"
            class="btn btn-link"
            >Edit</router-link
          >

          <button
            type="button"
            class="btn btn-link"
            @click="deleteRestaurant(restaurant.id)"
          >
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { Toast } from "../utils/helpers";

import adminAPI from "../apis/admin";

import { mapState } from "vuex";

export default {
  name: "AdminRestaurantsTable",
  data() {
    return {
      restaurants: [],
    };
  },
  computed: {
    ...mapState(["workInProcess"]),
  },
  created() {
    //fetch api
    this.fetchAdminRestaurants();
  },
  methods: {
    async fetchAdminRestaurants() {
      //fetch api
      try {
        const { data, statusText } = await adminAPI.restaurants.get();
        if (statusText !== "OK") throw new Error(data.message);
        this.restaurants = data.restaurants;
      } catch (err) {
        Toast.fire({ icon: "warning", title: "無法取得餐廳列表" });
      }
    },
    async deleteRestaurant(id) {
      try {
        this.$store.commit("setWorkInProcess", { work: "deleteRestaurant" });
        const { data, statusText } = await adminAPI.restaurants.delete({ id });
        if (statusText !== "OK") throw new Error(data.message);
        this.restaurants = this.restaurants.filter((rest) => rest.id !== id);
        this.$store.commit("setWorkInProcess", { work: "" });
      } catch (err) {
        this.$store.commit("setWorkInProcess", { work: "" });
        Toast.fire({ icon: "error", title: "無法刪除餐廳" });
      }
    },
  },
};
</script>