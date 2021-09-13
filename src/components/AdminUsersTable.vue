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
            @click.stop.prevent="setRole(user.id, user.isAdmin)"
            v-if="currentUser.id !== user.id"
          >
            {{ user.isAdmin ? "set as user" : "set as admin" }}
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import adminAPI from "../apis/admin";
import { Toast } from "../utils/helpers";
import { mapState } from "vuex";

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
  computed: {
    ...mapState(["currentUser"]),
  },
  beforeRouteUpdate() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      //向後端取得users
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
    },
    async setRole(userId, isAdmin) {
      try {
        const isAdminString = isAdmin ? "false" : "true";
        const { data } = await adminAPI.users.update({
          userId,
          isAdmin: isAdminString,
        });
        if (data.status !== "success") throw new Error(data.message);
        this.users = this.users.map((user) => {
          return user.id === userId ? { ...user, isAdmin: !isAdmin } : user;
        });
      } catch (err) {
        Toast.fire({ icon: "error", title: "無法更新使用者資料" });
      }
    },
  },
};
</script>