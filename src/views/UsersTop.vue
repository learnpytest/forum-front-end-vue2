<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">美食達人</h1>
    <hr />
    <div class="row text-center">
      <!-- 美食達人卡片UsersTopCard -->
      <UserTopCard
        v-for="user in usersTop"
        :key="user.id"
        :initial-user="user"
      />
    </div>
  </div>
</template>
<script>
import NavTabs from "../components/NavTabs.vue";
import UserTopCard from "../components/UserTopCard.vue";

export default {
  name: "UsersTop",
  components: {
    NavTabs,
    UserTopCard,
  },
  data() {
    return {
      usersTop: [],
    };
  },
  created() {
    //fetch API
    this.$store.dispatch("fetchUsersTop");
    this.usersTop = [...this.$store.state.UsersTop.users];
  },
};
</script>