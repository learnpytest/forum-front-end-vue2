<template>
  <div class="container py-5">
    <NavTabs />
    <!-- user card UserProfileCard.vue -->
    <UserProfileCard
      :user="user"
      :currentUser="currentUser"
      :isAuthenticated="isAuthenticated"
      @after-delete-following="handleAfterDeleteFollowing"
      @after-add-following="handleAfterAddFollowing"
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
  },
  data() {
    return {
      user: {
        id: -1,
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
      } catch (err) {
        Toast.fire({
          icon: "error",
          title: "無法取得使用者資料",
        });
      }
    },
    handleAfterDeleteFollowing() {
      this.user.isFollowed = false;
      this.followers = this.followers.filter(
        (follower) => follower.id !== this.currentUser.id
      );
      this.user.followersCount = this.followers.length;
    },
    handleAfterAddFollowing() {
      this.user.isFollowed = true;
      this.followers.push(this.currentUser);
      this.user.followersCount = this.followers.length;
    },
  },
};
</script>