<template>
  <table class="table">
    <Spinner v-if="isLoading" />
    <thead class="thead-dark" v-else>
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
import Spinner from "../components/Spinner.vue";

import adminAPI from "../apis/admin";
import { Toast } from "../utils/helpers";

export default {
  name: "AdminRestaurantsTable",
  components: {
    Spinner,
  },
  data() {
    return {
      restaurants: [],
      isLoading: true,
    };
  },
  created() {
    //fetch api
    this.fetchAdminRestaurants();
  },
  methods: {
    async fetchAdminRestaurants() {
      //fetch api
      try {
        this.isLoading = true;
        const { data, statusText } = await adminAPI.restaurants.get();
        if (statusText !== "OK") throw new Error(data.message);
        this.restaurants = data.restaurants;
        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;
        Toast.fire({ icon: "warning", title: "無法取得餐廳列表" });
      }
    },
    async deleteRestaurant(id) {
      //todo向後端刪除資料
      try {
        const { data, statusText } = await adminAPI.restaurants.delete({ id });
        if (statusText !== "OK") throw new Error(data.message);
        this.restaurants = this.restaurants.filter((rest) => rest.id !== id);
      } catch (err) {
        Toast.fire({ icon: "error", title: "無法刪除餐廳" });
      }
    },
  },
};
</script>