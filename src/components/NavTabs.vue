<template>
  <ul class="nav nav-tabs mb-4">
    <li class="nav-item" v-for="tab in tabs" :key="tab.id">
      <router-link :to="tab.path" class="nav-link">
        {{ tab.name }}
      </router-link>
    </li>
  </ul>
</template>
<script>
import { v4 as uuidv4 } from "uuid";

export default {
  name: "NavTabs",
  data() {
    return {
      tabs: [
        {
          id: uuidv4(),
          name: "首頁",
          path: "/restaurants",
        },
        {
          id: uuidv4(),
          name: "最新動態",
          path: "/restaurants/feeds",
        },
        {
          id: uuidv4(),
          name: "TOP 10 人氣餐廳",
          path: "/restaurants/top",
        },
        {
          id: uuidv4(),
          name: "美食達人",
          path: "/users/top",
        },
      ],
    };
  },
};
</script>