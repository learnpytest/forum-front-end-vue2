<template>
  <div class="container py-5">
    <!-- AdminNav Component -->
    <AdminNav />

    <!-- Admin users table AdminUsers.vue -->
    <AdminUsersTable />
  </div>
</template>

<script>
import AdminNav from "../components/AdminNav.vue";
import AdminUsersTable from "../components/AdminUsersTable.vue";

export default {
  name: "AdminUsers",
  components: {
    AdminNav,
    AdminUsersTable,
  },
};
</script>