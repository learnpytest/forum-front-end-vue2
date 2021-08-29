<template>
  <div class="col-3">
    <a href="#">
      <img :src="user.image | emptyImage" width="140px" height="140px" />
    </a>
    <h2>{{ user.name }}</h2>
    <span class="badge badge-secondary bg-secondary" style="color: black"
      >追蹤人數：{{ user.FollowerCount }}</span
    >
    <p class="mt-3">
      <button
        type="button"
        class="btn btn-danger"
        v-if="user.isFollowed"
        @click.stop.prevent="cancelFollowing"
      >
        取消追蹤
      </button>
      <button
        type="button"
        class="btn btn-primary"
        v-else
        @click.stop.prevent="addFollowing"
      >
        追蹤
      </button>
    </p>
  </div>
</template>
<script>
import { mixinEmptyImage } from "../utils/mixins";

export default {
  name: "UserTopCard",
  mixins: [mixinEmptyImage],
  props: {
    initialUser: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      user: this.initialUser,
    };
  },
  methods: {
    cancelFollowing() {
      this.user = {
        ...this.initialUser,
        isFollowed: false,
      };
    },
    addFollowing() {
      this.user = {
        ...this.initialUser,
        isFollowed: true,
      };
    },
  },
};
</script>