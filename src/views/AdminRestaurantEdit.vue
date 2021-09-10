<template>
  <div class="container py-5">
    <!-- 餐廳表單 AdminRestaurantForm -->
    <AdminRestaurantForm
      @after-submit="handleAfterSubmit"
      :initial-restaurant="restaurant"
      :isProcessing="isProcessing"
    />
  </div>
</template>

<script>
import AdminRestaurantForm from "../components/AdminRestaurantForm";
import adminAPI from "../apis/admin";
import { Toast } from "../utils/helpers";

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
      isProcessing: false,
    };
  },
  created() {
    //todo fetch api enter id
    this.fetchRestaurant(this.$route.params.id);
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params;
    this.fetchRestaurant(id);
    next();
  },
  methods: {
    async fetchRestaurant(restaurantId) {
      // this.$store.dispatch("fetchRestaurant");
      try {
        const { data, statusText } = await adminAPI.restaurants.getDetail({
          restaurantId,
        });
        if (statusText !== "OK") throw new Error("無法取得編輯頁面");
        const {
          id,
          name,
          CategoryId: categoryId,
          tel,
          address,
          description,
          image,
          opening_hours: openingHours,
        } = data.restaurant;
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
      } catch (err) {
        Toast.fire({ icon: "error", title: err });
      }
    },
    async handleAfterSubmit(formData) {
      //todo發送給後端
      // for (let [name, value] of formData.entries()) {
      //   console.log(name, value);
      // }
      try {
        this.isProcessing = true;
        const { data } = await adminAPI.restaurants.update({
          restaurantId: this.restaurant.id,
          formData,
        });
        if (data.status !== "success") throw new Error(data.message);
        this.$router.push({ name: "admin-restaurants" });
      } catch (err) {
        this.isProcessing = false;
        Toast.fire({ icon: "error", title: "無法更新餐廳" });
      }
    },
  },
};
</script>