<template>
  <div class="container py-5">
    <form @submit.stop.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          class="form-control"
          placeholder="Enter Name"
          required
          v-model="user.name"
        />
      </div>
      <div class="form-group mt-3">
        <label for="image">Image</label>
        <div>
          <img
            class="d-block img-thumbnail mb-3"
            width="200"
            height="200"
            :src="user.image"
            v-if="user.image"
          />
        </div>
        <input
          id="image"
          type="file"
          name="image"
          accept="image/*"
          class="form-control-file"
          @change="handleImageFileChange"
        />
      </div>

      <button
        type="submit"
        class="btn btn-primary mt-3"
        style="margin-right: 10px"
      >
        Update
      </button>
      <button type="button" class="btn btn-danger mt-3">Cancel</button>
    </form>
  </div>
</template>
<script>
import { mapState } from "vuex";
import usersAPI from "../apis/users";
import { Toast } from "../utils/helpers";

export default {
  name: "UserEdit",
  data() {
    return {
      user: {
        id: "-1",
        name: "",
        image: "",
      },
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  created() {
    this.getUser();
  },
  beforeRouteUpdate() {
    this.getUser();
  },
  methods: {
    getUser() {
      this.user = {
        ...this.user,
        name: this.currentUser.name,
        image: this.currentUser.image,
      };
    },
    async handleSubmit(e) {
      try {
        if (!this.user.name.trim()) throw new Error("名稱為必填");
        const formData = new FormData(e.target);
        console.log(Number(this.$route.params.id) === this.currentUser.id);

        if (Number(this.$route.params.id) !== this.currentUser.id)
          throw new Error("沒有更新權限");
        const { data } = await usersAPI.editUser({
          userId: this.currentUser.id,
          formData,
        });
        if (data.status !== "success")
          throw new Error("無法更新使用者資料，稍後再嘗試");
        this.$router.push(`/users/${this.currentUser.id}`);
      } catch (err) {
        console.log("err", err);
        Toast.fire({
          icon: "error",
          title: err,
        });
      }
    },
    handleImageFileChange(e) {
      const { files } = e.target;
      if (files.length === 0) {
        this.user.image = "";
        return;
      }
      const blobURL = window.URL.createObjectURL(files[0]);
      this.user.image = blobURL;
    },
  },
};
</script>