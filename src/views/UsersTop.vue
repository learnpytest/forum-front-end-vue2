<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">美食達人</h1>
    <hr />
    <Spinner v-if="isLoading" />
    <div class="row text-center" v-else>
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
import usersAPI from "../apis/users";
import Spinner from "../components/Spinner";

import { Toast } from "../utils/helpers";

export default {
  name: "UsersTop",
  components: {
    NavTabs,
    UserTopCard,
    Spinner,
  },
  data() {
    return {
      usersTop: [],
      isLoading: true,
    };
  },
  created() {
    //fetch API
    this.fetchTopUsers();
  },
  methods: {
    async fetchTopUsers() {
      try {
        this.isLoading = true;
        const { data, statusText } = await usersAPI.getTopUsers();
        if (statusText !== "OK")
          throw new Error("無法取得美食達人資料,稍後再嘗試");
        this.usersTop = data.users.map((user) => ({
          id: user.id,
          image: user.image,
          name: user.name,
          followerCount: user.FollowerCount,
          isAdmin: user.isAdmin,
          isFollowed: user.isFollowed,
        }));
        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;
        Toast.fire({ icon: "error", title: err });
      }
    },
  },
};
</script>