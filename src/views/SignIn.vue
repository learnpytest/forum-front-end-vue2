<template>
  <div class="container py-5">
    <form class="w-100" @submit.stop.prevent="handleSubmit">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">Sign In</h1>
      </div>

      <div class="form-label-group mb-2">
        <label for="email">email</label>
        <input
          id="email"
          v-model="email"
          name="email"
          type="email"
          class="form-control"
          placeholder="email"
          autocomplete="email"
          required
          autofocus
        />
      </div>

      <div class="form-label-group mb-3">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          name="password"
          type="password"
          class="form-control"
          placeholder="Password"
          autocomplete="current-password"
          required
        />
      </div>

      <button
        class="btn btn-lg btn-primary btn-block mb-3"
        type="submit"
        :disabled="isProcessing"
      >
        Submit
      </button>

      <div class="text-center mb-3">
        <p>
          <router-link to="/signup">Sign Up</router-link>
        </p>
      </div>

      <p class="mt-5 mb-3 text-muted text-center">&copy; 2017-2018</p>
    </form>
  </div>
</template>
<script>
import authorizationAPI from "../apis/authorizationAPI";
import { Toast } from "../utils/helpers";

export default {
  data() {
    return {
      email: "",
      password: "",
      isProcessing: false,
    };
  },
  methods: {
    async handleSubmit() {
      //via authorizationAPI
      try {
        if (!this.email || !this.password) {
          Toast.fire({
            icon: "warning",
            title: "沒有輸入帳號密碼",
          });
          return;
        }
        this.isProcessing = true;
        const { data } = await authorizationAPI.signIn({
          email: this.email,
          password: this.password,
        });
        if (data.status !== "success") throw new Error(data.message);
        localStorage.setItem("token", data.token);
        //將currentUser存入vuex
        this.$store.commit("setCurrentUser", data.user);

        this.$router.push("/restaurants");
      } catch (err) {
        this.isProcessing = false;
        this.password = "";
        Toast.fire({
          icon: "warning",
          title: "請確認您輸入了正確的帳號密碼",
        });
      }
    },
  },
};
</script>