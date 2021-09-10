<template>
  <div class="col-3">
    <a href="#">
      <img :src="user.image | emptyImage" width="140px" height="140px" />
    </a>
    <h2>{{ user.name }}</h2>
    <span class="badge badge-secondary bg-secondary" style="color: black"
      >追蹤人數：{{ user.followerCount }}</span
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
import usersAPI from "../apis/users";
import { Toast } from "../utils/helpers";

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
    async cancelFollowing() {
      try {
        const { data } = await usersAPI.deleteFollowing({
          userId: this.user.id,
        });
        if (data.status !== "success") throw new Error("無法刪除追蹤");
        this.user = {
          ...this.user,
          isFollowed: false,
          followerCount: this.user.followerCount - 1,
        };
      } catch (err) {
        Toast.fire({ icon: "error", title: err });
      }
    },
    async addFollowing() {
      try {
        const { data } = await usersAPI.addFollowing({ userId: this.user.id });
        if (data.status !== "success") throw new Error("無法加入追蹤");
        this.user = {
          ...this.user,
          isFollowed: true,
          followerCount: this.user.followerCount + 1,
        };
      } catch (err) {
        Toast.fire({ icon: "error", title: err });
      }
    },
  },
};
</script>