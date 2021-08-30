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
      const {
        id,
        name,
        CategoryId: categoryId,
        tel,
        address,
        description,
        image,
        opening_hours: openingHours,
      } = this.$store.state.Restaurant.restaurant;
      this.restaurant = {
        id,
        name,
        categoryId,
        tel,
        address,
        description,
        image,
        openingHours,
      };
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