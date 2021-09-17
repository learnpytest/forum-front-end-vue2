<template>
  <div class="container py-5">
    <!-- 餐廳表單 AdminRestaurantForm -->
    <AdminRestaurantForm @after-submit="handleAfterSubmit" />
  </div>
</template>
<script>
import AdminRestaurantForm from "../components/AdminRestaurantForm";

import { Toast } from "../utils/helpers";

import adminAPI from "../apis/admin";

import { mapState } from "vuex";

export default {
  name: "AdminRestaurantNew",
  components: {
    AdminRestaurantForm,
  },
  computed: {
    ...mapState(["workInProcess"]),
  },
  methods: {
    async handleAfterSubmit(formData) {
      //todo發送給後端
      // for (let [name, value] of formData.entries()) {
      //   console.log(name, value);
      // }
      try {
        this.$store.commit("setWorkInProcess", {
          work: "submitRestaurantForm",
        });
        const { data } = await adminAPI.restaurants.create({ formData });
        if (data.status !== "success") throw new Error(data.message);
        this.$router.push("/admin/restaurants");
        this.$store.commit("setWorkInProcess", { work: "" });
      } catch (err) {
        this.$store.commit("setWorkInProcess", { work: "" });
        Toast.fire({ icon: "error", title: "無法新增餐廳" });
      }
    },
  },
};
</script>