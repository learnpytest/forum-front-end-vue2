<template>
  <div id="restaurant-forum">
    <Navbar />
    <Spinner v-if="preloader" />
    <main role="main" class="px-5" style="margin-top: 50px" v-show="!preloader">
      <router-view />
    </main>
  </div>
</template>

<script>
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "../src/components/Navbar.vue";
import Spinner from "../src/components/Spinner.vue";

import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    Navbar,
    Spinner,
  },
  computed: {
    ...mapState(["preloader"]),
  },
};
</script>