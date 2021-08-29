<template>
  <div class="card mb-3">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img :src="user.image" width="300px" height="300px" />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{ user.name }}</h5>
          <p class="card-text">{{ user.email }}</p>
          <ul class="list-unstyled list-inline">
            <li>
              <strong>{{ user.commentsLength }}</strong> 已評論餐廳
            </li>
            <li>
              <strong>{{ user.favoritedRestaurantsLength }}</strong> 收藏的餐廳
            </li>
            <li>
              <strong>{{ user.followingsCount }}</strong> followings (追蹤者)
            </li>
            <li>
              <strong>{{ user.followersCount }}</strong> followers (追隨者)
            </li>
          </ul>
          <p>
            <router-link
              :to="`/users/${user.id}/edit`"
              v-if="user.id === currentUser.id"
              ><button type="submit" class="btn btn-primary">
                edit
              </button></router-link
            >
            <button
              type="submit"
              class="btn btn-danger"
              v-else-if="user.isFollowed"
              @click="deleteFollowing"
            >
              取消追蹤
            </button>
            <button
              type="submit"
              class="btn btn-info"
              v-else
              @click="addFollowing"
            >
              追蹤
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "UserProfileCard",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      currentUser: {},
    };
  },
  created() {
    //todo fetch api
    this.fetchCurrentUser();
  },
  methods: {
    fetchCurrentUser() {
      //todo fetch api
      this.$store.dispatch("fetchCurrentUser");
      this.currentUser = this.$store.state.currentUser;
    },
    deleteFollowing() {
      //todo向後端發送api
      this.$emit("after-delete-following");
    },
    addFollowing() {
      //todo向後端發送api
      this.$emit("after-add-following");
    },
  },
};
</script>