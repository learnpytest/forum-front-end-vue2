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
              @click="deleteFollowing(user.id)"
            >
              取消追蹤
            </button>
            <button
              type="submit"
              class="btn btn-info"
              v-else
              @click="addFollowing(user.id)"
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
import usersAPI from "../apis/users";
import { Toast } from "../utils/helpers";

export default {
  name: "UserProfileCard",
  props: {
    user: {
      type: Object,
      required: true,
    },
    currentUser: {
      type: Object,
      default: () => ({}),
    },
    isAuthenticated: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    async deleteFollowing(userId) {
      //todo向後端發送api
      try {
        const { data } = await usersAPI.deleteFollowing({ userId });
        if (data.status !== "success") throw new Error(data.message);
        this.$emit("after-delete-following");
      } catch (err) {
        Toast.fire({
          icon: "error",
          title: "無法取消追蹤",
        });
      }
    },
    async addFollowing(userId) {
      //todo向後端發送api
      try {
        const { data } = await usersAPI.addFollowing({ userId });
        if (data.status !== "success") throw new Error(data.message);
        this.$emit("after-add-following");
      } catch (err) {
        Toast.fire({
          icon: "error",
          title: "無法加入追蹤",
        });
      }
    },
  },
};
</script>