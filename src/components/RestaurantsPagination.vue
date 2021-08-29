<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <!-- 前一頁 previousPage -->
      <li :class="['page-item', { disabled: currentPage === 1 }]">
        <router-link
          class="page-link"
          aria-label="Previous"
          :to="{ name: 'restaurants', query: { page: prev } }"
        >
          <span aria-hidden="true">&laquo;</span>
        </router-link>
      </li>

      <li
        :class="['page-item', { active: p === page }]"
        v-for="p in totalPage"
        :key="p"
      >
        <router-link
          :to="{ name: 'restaurants', query: { page: p, categoryId } }"
          class="page-link"
        >
          {{ p }}
        </router-link>
      </li>

      <!-- 後一頁 nextPage -->
      <li :class="['page-item', { disabled: page === totalPage.length }]">
        <router-link
          class="page-link"
          aria-label="Next"
          :to="{ name: 'restaurants', query: { page: next } }"
        >
          <span aria-hidden="true">&raquo;</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "RestaurantsPagination",
  props: {
    categoryId: {
      type: [Number, String],
      default: "",
    },
    page: {
      type: Number,
      default: 1,
    },
    totalPage: {
      type: Array,
      required: true,
    },
    prev: {
      type: Number,
      required: true,
    },
    next: {
      type: Number,
      required: true,
    },
  },
};
</script>