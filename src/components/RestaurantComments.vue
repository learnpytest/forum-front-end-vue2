<template>
  <div>
    <h2 class="my-4">所有評論：</h2>

    <div v-for="comment in restaurantComments" :key="comment.id">
      <blockquote class="blockquote mb-0">
        <button
          type="button"
          class="btn btn-danger float-right"
          style="float: right"
          v-if="currentUser.isAdmin"
          @click.stop.prevent="handleDeleteButtonClick(comment.id)"
        >
          Delete
        </button>
        <h3>
          <router-link :to="{ name: 'user', params: { id: comment.User.id } }">
            {{ comment.User.name }}
          </router-link>
        </h3>
        <p>{{ comment.text }}</p>
        <footer class="blockquote-footer">
          {{ comment.createdAt | fromNow }}
        </footer>
      </blockquote>
      <hr />
    </div>
  </div>
</template>
<script>
import { mixinFromNowFilters } from "../utils/mixins";

export default {
  name: "RestaurantComments",
  props: {
    restaurantComments: {
      type: Array,
      required: true,
    },
  },
  mixins: [mixinFromNowFilters],
  data() {
    return {
      currentUser: {},
    };
  },
  created() {
    this.fetchCurrentUser();
  },
  methods: {
    fetchCurrentUser() {
      //fetch API
      this.$store.dispatch("fetchCurrentUser");
      this.currentUser = this.$store.state.currentUser;
    },
    handleDeleteButtonClick(commentId) {
      //通知後端刪除
      this.$emit("after-delete-comment", commentId);
    },
  },
};
</script>