<template>
  <div class="container py-5">
    <!-- 餐廳表單 AdminRestaurantForm -->
    <AdminRestaurantForm
      @after-submit="handleAfterSubmit"
      :isProcessing="isProcessing"
    />
  </div>
</template>
<script>
import AdminRestaurantForm from "../components/AdminRestaurantForm";
import adminAPI from "../apis/admin";
import { Toast } from "../utils/helpers";

export default {
  name: "AdminRestaurantNew",
  components: {
    AdminRestaurantForm,
  },
  data() {
    return {
      isProcessing: false,
    };
  },
  methods: {
    async handleAfterSubmit(formData) {
      //todo發送給後端
      // for (let [name, value] of formData.entries()) {
      //   console.log(name, value);
      // }
      try {
        this.isProcessing = true;
        const { data } = await adminAPI.restaurants.create({ formData });
        if (data.status !== "success") throw new Error(data.message);
        this.$router.push("/admin/restaurants");
      } catch (err) {
        this.isProcessing = false;
        Toast.fire({ icon: "error", title: "無法新增餐廳" });
      }
    },
  },
};
</script>