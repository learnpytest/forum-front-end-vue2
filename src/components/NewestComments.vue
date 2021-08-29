<template>
  <div class="card">
    <div class="card-header">最新評論</div>
    <div class="card-body">
      <div v-for="comment in comments" :key="comment.id">
        <h4>
          <router-link
            :to="{ name: 'restaurant', params: { id: comment.Restaurant.id } }"
            >{{ comment.Restaurant.name }}
          </router-link>
        </h4>
        <p>{{ comment.text }}</p>
        by
        <router-link to="#"> {{ comment.User.name }} </router-link>
        at {{ comment.createdAt | fromNow }}
        <hr />
      </div>
    </div>
  </div>
</template>
<script>
import { mixinFromNowFilters } from "../utils/mixins";

export default {
  name: "NewestComments",
  props: {
    comments: {
      type: Array,
      required: true,
    },
  },
  mixins: [mixinFromNowFilters],
};
</script>