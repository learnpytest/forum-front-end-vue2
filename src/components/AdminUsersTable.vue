<template>
  <table class="table">
    <thead class="thead-dark">
      <tr>
        <th scope="col">#</th>
        <th scope="col">Email</th>
        <th scope="col">Role</th>
        <th scope="col" width="140">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.id">
        <th scope="row">{{ user.id }}</th>
        <td>{{ user.email }}</td>
        <td>{{ user.isAdmin ? "admin" : "user" }}</td>
        <td>
          <button
            type="button"
            class="btn btn-link"
            @click.stop.prevent="setRole(user.id)"
            v-if="user.isAdmin"
          >
            set as user
          </button>
          <button
            type="button"
            class="btn btn-link"
            @click.stop.prevent="setRole(user.id)"
            v-if="!user.isAdmin"
          >
            set as admin
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import adminAPI from "../apis/admin";
import { Toast } from "../utils/helpers";

export default {
  name: "AdminUsersTable",
  data() {
    return {
      users: [],
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      //todo向後端取得users
      try {
        const { data, statusText } = await adminAPI.users.get();
        if (statusText !== "OK") throw new Error(statusText);
        this.users = [...data.users];
      } catch (err) {
        Toast.fire({
          icon: "error",
          title: "無法取得使用者資料",
        });
      }
      this.$store.dispatch("fetchUsers");
      this.users = this.$store.state.Users.users;
    },
    setRole(userId) {
      this.users = this.users.map((user) => {
        return user.id === userId ? { ...user, isAdmin: !user.isAdmin } : user;
      });
    },
  },
};
</script>