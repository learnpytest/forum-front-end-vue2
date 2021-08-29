<template>
  <div class="container py-5">
    <!-- 餐廳表單 AdminRestaurantForm -->
    <AdminRestaurantForm
      @after-submit="handleAfterSubmit"
      :initial-restaurant="restaurant"
    />
  </div>
</template>

<script>
import AdminRestaurantForm from "../components/AdminRestaurantForm";

export default {
  name: "AdminRestaurantEdit",
  components: {
    AdminRestaurantForm,
  },
  data() {
    return {
      restaurant: {
        id: -1,
        name: "",
        categoryId: -1,
        tel: "",
        address: "",
        description: "",
        image: "",
        openingHours: "",
      },
    };
  },
  created() {
    //todo fetch api enter id
    this.fetchRestaurant();
  },
  methods: {
    fetchRestaurant() {
      this.$store.dispatch("fetchRestaurant");
      this.restaurant = this.$store.state.Restaurant.restaurant;
    },
    handleAfterSubmit(formData) {
      //todo發送給後端
      for (let [name, value] of formData.entries()) {
        console.log(name, value);
      }
    },
  },
};
</script>