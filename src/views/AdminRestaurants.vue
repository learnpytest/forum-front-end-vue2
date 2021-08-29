<template>
  <div class="container py-5">
    <!-- 後臺導覽頁籤 AdminNav.vue -->
    <AdminNav />

    <router-link :to="'/admin/restaurants/new'" class="btn btn-primary mb-4">
      New Restaurant
    </router-link>
    <!-- 後臺餐廳列表 AdminRestaurantsTable.vue -->
    <AdminRestaurantsTable />
  </div>
</template>
<script>
import AdminNav from "../components/AdminNav.vue";
import AdminRestaurantsTable from "../components/AdminRestaurantsTable.vue";

export default {
  name: "AdminRestaurants",
  components: {
    AdminNav,
    AdminRestaurantsTable,
  },
};
</script>