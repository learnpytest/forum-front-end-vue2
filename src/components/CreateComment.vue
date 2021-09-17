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
      <button
        type="submit"
        class="btn btn-primary mr-0"
        :disabled="workInProcess.work === 'submitComment'"
      >
        {{ workInProcess.work === "submitComment" ? "處理中" : "Submit" }}
      </button>
    </div>
  </form>
</template>
<script>
import commentsAPI from "../apis/comments";
import { Toast } from "../utils/helpers";

import { mapState } from "vuex";

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
  computed: {
    ...mapState(["workInProcess"]),
  },
  methods: {
    async handleSubmit() {
      const payload = {
        text: this.text,
        restaurantId: this.restaurantId,
      };
      try {
        this.$store.commit("setWorkInProcess", { work: "submitComment" });
        const { statusText } = await commentsAPI.comments.create({
          formData: payload,
        });
        if (statusText !== "OK") throw new Error("無法新增評論");
        this.$emit("after-create-comment");
        this.$store.commit("setWorkInProcess", { work: "" });
      } catch (err) {
        this.$store.commit("setWorkInProcess", { work: "" });
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