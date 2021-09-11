<template>
  <div class="container py-5">
    <!-- Restaurant's detail RestaurantDetail.vue -->
    <RestaurantDetail
      :initial-restaurant="restaurant"
      @after-add-like="afterAddLike"
      @after-remove-like="afterRemoveLike"
      @after-add-favorite="afterAddFavorite"
      @after-remove-favorite="afterRemoveFavorite"
    />
    <!-- Restaurant's comments RestaurantComments.vue -->
    <RestaurantComments
      :restaurant-comments="restaurantComments"
      @after-delete-comment="afterDeleteComment"
      :currentUser="currentUser"
      :isAuthenticated="isAuthenticated"
    />
    <!-- Create comment for the Restaurant -->
    <CreateComment
      :restaurant-id="restaurant.id"
      @after-create-comment="afterCreateComment"
    />
  </div>
</template>

<script>
import RestaurantDetail from "../components/RestaurantDetail.vue";
import RestaurantComments from "../components/RestaurantComments.vue";
import CreateComment from "../components/CreateComment.vue";
import restaurantsAPI from "../apis/restaurants";
import commentsAPI from "../apis/comments";
import { Toast } from "../utils/helpers";
import { mapState } from "vuex";

export default {
  name: "Restaurant",
  components: {
    RestaurantDetail,
    RestaurantComments,
    CreateComment,
  },
  data() {
    return {
      restaurant: {
        id: -1,
        name: "",
        categoryName: "",
        image: "",
        openingHours: "",
        tel: "",
        address: "",
        description: "",
        isFavorited: false,
        isLiked: false,
      },
      restaurantComments: [],
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  created() {
    //fetch API
    const { id: restaurantId } = this.$route.params;
    this.fetchRestaurantData(restaurantId);
  },
  beforeRouteUpdate(to, from, next) {
    const { id: restaurantId } = to.params;
    this.fetchRestaurantData(restaurantId);
    next();
  },
  methods: {
    afterAddFavorite() {
      this.restaurant = { ...this.restaurant, isFavorited: true };
    },
    afterRemoveFavorite() {
      this.restaurant = { ...this.restaurant, isFavorited: false };
    },
    afterAddLike() {
      this.restaurant = { ...this.restaurant, isLiked: true };
    },
    afterRemoveLike() {
      this.restaurant = { ...this.restaurant, isLiked: false };
    },
    async fetchRestaurantData(restaurantId) {
      try {
        const { data, statusText } = await restaurantsAPI.getRestaurant({
          restaurantId,
        });
        if (statusText !== "OK")
          throw new Error("無法取得餐廳資料，稍後再嘗試");
        const { restaurant, isFavorited, isLiked } = data;
        const {
          id,
          name,
          Category,
          image,
          openingHours,
          tel,
          address,
          description,
          Comments,
        } = restaurant;
        this.restaurant = {
          id,
          name,
          categoryName: Category ? Category.name : "未分類",
          image,
          openingHours,
          tel,
          address,
          description,
          isFavorited,
          isLiked,
        };
        this.restaurantComments = Comments;
      } catch (err) {
        Toast.fire({
          icon: "error",
          title: err,
        });
      }
    },
    async afterDeleteComment(commentId) {
      try {
        const { data } = await commentsAPI.comments.delete({ commentId });
        if (data.status !== "success")
          throw new Error("無法刪除評論資料，稍後再嘗試");
        this.restaurantComments = this.restaurantComments.filter(
          (comment) => comment.id !== commentId
        );
      } catch (err) {
        Toast.fire({
          icon: "error",
          title: err,
        });
      }
    },
    afterCreateComment() {
      const { id: restaurantId } = this.$route.params;
      this.fetchRestaurantData(restaurantId);
    },
  },
};
</script>