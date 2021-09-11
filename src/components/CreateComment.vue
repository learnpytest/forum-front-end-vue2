<template>
  <form @submit.stop.prevent="handleSubmit">
    <div class="form-group mb-4">
      <label for="text">留下評論：</label>
      <textarea class="form-control" rows="3" name="text" v-model="text" />
    </div>
    <div class="d-flex align-items-center justify-content-between">
      <button type="button" class="btn btn-link" @click="$router.back()">
        回上一頁
      </button>
      <button type="submit" class="btn btn-primary mr-0">Submit</button>
    </div>
  </form>
</template>
<script>
import commentsAPI from "../apis/comments";
import { Toast } from "../utils/helpers";

export default {
  name: "CreateComment",
  props: {
    restaurantId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      text: "",
    };
  },
  methods: {
    async handleSubmit() {
      const payload = {
        text: this.text,
        restaurantId: this.restaurantId,
      };
      try {
        const { statusText } = await commentsAPI.comments.create({
          formData: payload,
        });
        if (statusText !== "OK") throw new Error("無法新增評論");
        this.$emit("after-create-comment");
      } catch (err) {
        Toast.fire({
          icon: "error",
          title: err,
        });
      }

      this.text = "";
    },
  },
};
</script>