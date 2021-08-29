<template>
  <div class="container py-5">
    <NavTabs />
    <!-- user card UserProfileCard.vue -->
    <UserProfileCard
      :user="user"
      @after-delete-Following="handleAfterDeleteFollowing"
      @after-add-Following="handleAfterAddFollowing"
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
  created() {
    //todo fetch api
    this.fetchUser();
  },
  methods: {
    fetchUser() {
      //todo fetch api
      this.$store.dispatch("fetchUser");
      const {
        id,
        name,
        email,
        FavoritedRestaurants,
        Comments,
        Followers,
        Followings,
        image,
      } = this.$store.state.User.profile;
      const { isFollowed } = this.$store.state.User;
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
    },
    handleAfterDeleteFollowing() {
      this.user.isFollowed = false;
    },
    handleAfterAddFollowing() {
      this.user.isFollowed = true;
    },
  },
};
</script>