<template>
  <div class="card">
    <div class="card-header">
      <strong>{{ followers.length }}</strong> followers (追隨者)
    </div>
    <div class="card-body">
      <router-link
        :to="{ name: 'user', params: { id: follower.id } }"
        v-for="follower in followers"
        :key="follower.id"
      >
        <img :src="follower.image" width="60" height="60" class="avatar" />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserFollowersCard",
  props: {
    followers: {
      type: Array,
      required: true,
    },
  },
};
</script>