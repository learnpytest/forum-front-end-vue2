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
    fetchUsers() {
      //todo向後端取得users
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