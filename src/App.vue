<template>
  <div id="restaurant-forum">
    <Navbar />
    <main role="main" class="px-5" style="margin-top: 50px">
      <router-view />
    </main>
  </div>
</template>

<script>
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "../src/components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar,
  },
};
</script>