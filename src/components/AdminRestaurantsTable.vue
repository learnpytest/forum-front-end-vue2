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
            :to="{ name: 'admin-restaurant-edit', params: restaurant.id }"
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
export default {
  name: "AdminRestaurantsTable",
  data() {
    return {
      restaurants: [],
    };
  },
  created() {
    //fetch api
    this.fetchAdminRestaurants();
  },
  methods: {
    fetchAdminRestaurants() {
      //fetch api
      this.$store.dispatch("fetchAdminRestaurants");
      this.restaurants = this.$store.state.AdminRestaurants.restaurants;
    },
    deleteRestaurant(id) {
      //todo向後端刪除資料
      this.restaurants = this.restaurants.filter((rest) => rest.id !== id);
    },
  },
};
</script>