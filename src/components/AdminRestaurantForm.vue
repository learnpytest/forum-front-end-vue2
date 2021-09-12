<template>
  <form @submit.stop.prevent="handleSumbit" v-show="!isLoading">
    <div class="form-group">
      <label for="name">Name</label>
      <input
        id="name"
        type="text"
        class="form-control"
        name="name"
        placeholder="Enter name"
        required
        v-model="restaurant.name"
      />
    </div>

    <div class="form-group">
      <label for="categoryId">Category</label>
      <select
        id="categoryId"
        class="form-control"
        name="categoryId"
        required
        v-model="restaurant.categoryId"
      >
        <option value="" selected disabled>--請選擇--</option>
        <option
          :value="category.id"
          v-for="category in categories"
          :key="category.id"
        >
          {{ category.name }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="tel">Tel</label>
      <input
        id="tel"
        type="text"
        class="form-control"
        name="tel"
        placeholder="Enter telephone number"
        v-model="restaurant.tel"
      />
    </div>

    <div class="form-group">
      <label for="address">Address</label>
      <input
        id="address"
        type="text"
        class="form-control"
        placeholder="Enter address"
        name="address"
        v-model="restaurant.address"
      />
    </div>

    <div class="form-group">
      <label for="opening-hours">Opening Hours</label>
      <input
        id="opening-hours"
        type="time"
        class="form-control"
        name="opening_hours"
        v-model="restaurant.openingHours"
      />
    </div>

    <div class="form-group">
      <label for="description">Description</label>
      <textarea
        id="description"
        class="form-control"
        rows="3"
        name="description"
        v-model="restaurant.description"
      />
    </div>

    <div class="form-group">
      <label for="image" style="display: block; margin: 20px 0 10px"
        >Image</label
      >
      <img
        :src="restaurant.image"
        alt="image preview"
        class="d-block img-thumbnail mb-3"
        width="200px"
        height="200px"
        v-if="restaurant.image"
      />
      <input
        id="image"
        type="file"
        name="image"
        accept="image/*"
        class="form-control-file"
        @change="handleFileChange"
      />
    </div>

    <button type="submit" class="btn btn-primary mt-3" :disabled="isProcessing">
      {{ isProcessing ? "處理中" : "送出" }}
    </button>
  </form>
</template>
<script>
import adminAPI from "../apis/admin";
import { Toast } from "../utils/helpers";

export default {
  name: "AdminRestaurantForm",
  props: {
    initialRestaurant: {
      type: Object,
      default: () => {
        return {
          name: "",
          categoryId: "",
          tel: "",
          address: "",
          description: "",
          image: "",
          openingHours: "",
        };
      },
    },
    isProcessing: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      restaurant: {
        ...this.initialRestaurant,
      },
      categories: [],
      isLoading: true,
    };
  },
  created() {
    this.fetchCategories();
  },
  watch: {
    initialRestaurant(newValue) {
      this.restaurant = { ...this.restaurant, ...newValue };
    },
  },
  methods: {
    async fetchCategories() {
      //fetch api
      try {
        const { data, statusText } = await adminAPI.categories.get();
        if (statusText !== "OK") throw new Error("無法取得餐廳類別");
        this.categories = data.categories;
        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;
        Toast.fire({ icon: "error", title: err });
      }
    },
    handleFileChange(e) {
      const files = e.target.files;
      if (files.length === 0) {
        this.restaurant.image = "";
        return;
      }
      const imgUrl = window.URL.createObjectURL(files[0]);
      this.restaurant.image = imgUrl;
    },
    handleSumbit(e) {
      if (!this.restaurant.name) {
        Toast.fire({ icon: "warning", title: "餐廳名稱必填" });
        return;
      } else if (!this.restaurant.categoryId) {
        Toast.fire({ icon: "warning", title: "餐廳類別必填" });
        return;
      }
      const form = e.target;
      const formData = new FormData(form);
      this.$emit("after-submit", formData);
    },
  },
};
</script>