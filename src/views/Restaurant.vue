<template>
  <div class="container py-5">
    <!-- Restaurant's detail RestaurantDetail.vue -->
    <RestaurantDetail :initial-restaurant="restaurant" />
    <!-- Restaurant's comments RestaurantComments.vue -->
    <RestaurantComments
      :restaurant-comments="restaurantComments"
      @after-delete-comment="afterDeleteComment"
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
      currentUser: {},
    };
  },
  created() {
    //fetch API
    const { id: restaurantId } = this.$route.params;
    this.fetchRestaurantData(restaurantId);
  },
  methods: {
    fetchRestaurantData() {
      this.$store.dispatch("fetchRestaurant");
      const { restaurant, isFavorited, isLiked } = this.$store.state.Restaurant;
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
    },
    afterDeleteComment(commentId) {
      this.restaurantComments = this.restaurantComments.filter(
        (comment) => comment.id !== commentId
      );
    },
    afterCreateComment(payload) {
      //fetch API currentUser
      this.$store.dispatch("fetchCurrentUser");
      this.currentUser = this.$store.state.currentUser;
      this.restaurantComments.push({
        ...payload,
        User: {
          id: this.currentUser.id,
          name: this.currentUser.name,
        },
      });
    },
  },
};
</script>