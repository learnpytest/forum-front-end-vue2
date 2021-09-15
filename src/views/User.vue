<template>
  <div class="container py-5">
    <NavTabs />
    <Spinner v-if="isLoading" />
    <!-- user card UserProfileCard.vue -->
    <template v-else>
      <UserProfileCard
        :user="user"
        :currentUser="currentUser"
        :isAuthenticated="isAuthenticated"
        @after-delete-following="updateViewAfterDeleteFollowing"
        @after-add-following="updateViewAfterAddFollowing"
      />

      <div class="row">
        <div class="col-md-4">
          <!-- UserFollowingsCard.vue -->
          <UserFollowingsCard :followings="followings" />
          <br />
          <!-- UserFollowersCard.vue -->
          <UserFollowersCard :followers="followers" />
        </div>
        <div class="col-md-8">
          <!-- UserCommentsCard.vue -->
          <UserCommentsCard :comments="comments" />
          <br />
          <!-- UserFavoritedRestaurantsCard.vue -->
          <UserFavoritedRestaurantsCard
            :favoritedRestaurants="favoritedRestaurants"
          />
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import NavTabs from "../components/NavTabs.vue";
import UserProfileCard from "../components/UserProfileCard.vue";
import UserFollowingsCard from "../components/UserFollowingsCard.vue";
import UserFollowersCard from "../components/UserFollowersCard.vue";
import UserCommentsCard from "../components/UserCommentsCard.vue";
import UserFavoritedRestaurantsCard from "../components/UserFavoritedRestaurantsCard.vue";
import usersAPI from "../apis/users";
import Spinner from "../components/Spinner";

import { Toast } from "../utils/helpers";
import { mapState } from "vuex";

export default {
  name: "User",
  components: {
    NavTabs,
    UserProfileCard,
    UserFollowingsCard,
    UserFollowersCard,
    UserCommentsCard,
    UserFavoritedRestaurantsCard,
    Spinner,
  },
  data() {
    return {
      user: {
        id: 0,
        name: "",
        email: "",
        favoritedRestaurantsLength: -1,
        commentsLength: -1,
        followersCount: -1,
        followingsCount: -1,
        image: "",
        isFollowed: false,
      },
      followers: [],
      followings: [],
      comments: [],
      favoritedRestaurants: [],
      isLoading: true,
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  created() {
    //todo fetch api
    const { id: userId } = this.$route.params;
    this.fetchUser(userId);
  },
  beforeRouteUpdate(to, from, next) {
    const { id: userId } = to.params;
    this.fetchUser(userId);
    next();
  },
  methods: {
    async fetchUser(userId) {
      //todo fetch api
      try {
        this.isLoading = true;
        const { data, statusText } = await usersAPI.getUser({ userId });
        if (statusText !== "OK") throw new Error(statusText);
        const {
          id,
          name,
          email,
          FavoritedRestaurants,
          Comments,
          Followers,
          Followings,
          image,
        } = data.profile;
        const { isFollowed } = data;
        this.user = {
          ...this.user,
          id,
          name,
          email,
          favoritedRestaurantsLength: FavoritedRestaurants
            ? FavoritedRestaurants.length
            : 0,
          commentsLength: Comments ? Comments.length : 0,
          followersCount: Followers ? Followers.length : 0,
          followingsCount: Followings ? Followings.length : 0,
          image,
          isFollowed,
        };
        this.followers = Followers;
        this.followings = Followings;
        this.comments = Comments;
        this.favoritedRestaurants = FavoritedRestaurants;
        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title: "無法取得使用者資料",
        });
      }
    },
    updateViewAfterDeleteFollowing() {
      this.user.isFollowed = false;
      this.followers = this.followers.filter(
        (follower) => follower.id !== this.currentUser.id
      );
      this.user.followersCount = this.followers.length;
    },
    updateViewAfterAddFollowing() {
      this.user.isFollowed = true;
      this.followers.push(this.currentUser);
      this.user.followersCount = this.followers.length;
    },
  },
};
</script>