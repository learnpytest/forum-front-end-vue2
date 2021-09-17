<template>
  <div class="container py-5">
    <!-- 1. 使用先前寫好的 AdminNav -->
    <AdminNav />

    <form class="my-4">
      <div class="form-row">
        <div class="col-auto">
          <input
            type="text"
            class="form-control"
            placeholder="新增餐廳類別..."
            v-model="newCategoryName"
          />
        </div>
        <div class="col-auto">
          <button
            type="button"
            class="btn btn-primary"
            @click.stop.prevent="createCategory"
            :disabled="isProcessing"
          >
            新增
          </button>
        </div>
      </div>
    </form>
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col" width="60">#</th>
          <th scope="col">Category Name</th>
          <th scope="col" width="210">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.id">
          <th scope="row">
            {{ category.id }}
          </th>
          <td class="position-relative">
            <div v-show="!category.isEditing" class="category-name">
              {{ category.name }}
            </div>
            <input
              v-show="category.isEditing"
              v-model="category.name"
              type="text"
              class="form-control"
            />
            <span
              v-show="category.isEditing"
              class="cancel"
              @click.stop.prevent="handleCancelEditing(category.id)"
            >
              ✕
            </span>
          </td>
          <td class="d-flex justify-content-between">
            <button
              v-show="!category.isEditing"
              type="button"
              class="btn btn-link mr-2"
              @click.stop.prevent="toggleEditing(category.id)"
            >
              Edit
            </button>
            <button
              v-show="category.isEditing"
              type="button"
              class="btn btn-link mr-2"
              @click.stop.prevent="
                updateCategory({
                  categoryId: category.id,
                  name: category.name,
                })
              "
            >
              Save
            </button>
            <button
              type="button"
              class="btn btn-link mr-2"
              @click.stop.prevent="destroyCategory(category.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminNav from "../components/AdminNav.vue";

import adminAPI from "../apis/admin";

import { Toast } from "../utils/helpers";

export default {
  name: "AdminCategories",
  components: {
    AdminNav,
  },
  data() {
    return {
      categories: [],
      newCategoryName: "",
      isProcessing: false,
    };
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        const { data, statusText } = await adminAPI.categories.get();
        if (statusText !== "OK")
          throw new Error("無法取得餐廳類別，稍後再嘗試");
        this.categories = data.categories.map((category) => ({
          ...category,
          isEditing: false,
          nameCashed: "",
        }));
      } catch (err) {
        Toast.fire({
          icon: "error",
          title: err,
        });
      }
    },
    async createCategory() {
      //todo向後端新增類別取得類別id
      try {
        if (!this.newCategoryName.trim().length) return;
        this.isProcessing = true;
        const { data } = await adminAPI.categories.create({
          name: this.newCategoryName,
        });
        if (data.status !== "success") throw new Error(data.message);
        this.fetchCategories();
        this.newCategoryName = "";
        this.isProcessing = false;
      } catch (err) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "無法新增餐廳類別，稍後再嘗試",
        });
      }
    },
    async destroyCategory(categoryId) {
      //todo向後端刪除類別確認刪除
      try {
        const { data } = await adminAPI.categories.delete({
          categoryId,
        });
        if (data.status !== "success") throw new Error(data.message);
        this.categories = this.categories.filter(
          (category) => category.id !== categoryId
        );
      } catch (err) {
        Toast.fire({
          icon: "error",
          title: "無法刪除餐廳類別，稍後再嘗試",
        });
      }
    },
    toggleEditing(categoryId) {
      this.categories = this.categories.map((category) => {
        return category.id === categoryId
          ? {
              ...category,
              isEditing: !category.isEditing,
              nameCashed: category.name,
            }
          : category;
      });
    },
    async updateCategory({ categoryId, name }) {
      //todo向後端修改資料
      try {
        const { data } = await adminAPI.categories.update({
          categoryId,
          name,
        });
        if (data.status !== "success") throw new Error(data.message);
      } catch (err) {
        Toast.fire({
          icon: "error",
          title: "無法更新餐廳類別，稍後再嘗試",
        });
      }
      this.toggleEditing(categoryId);
    },
    handleCancelEditing(categoryId) {
      this.categories = this.categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            isEditing: !category.isEditing,
            name: category.nameCashed,
          };
        }
        return category;
      });
    },
  },
};
</script>
<style scoped>
.category-name {
  padding: 0.375rem 0.75rem;
  border: 1px solid transparent;
  outline: 0;
  cursor: auto;
}

.btn-link {
  width: 62px;
}

.cancel {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border: 1px solid #aaaaaa;
  border-radius: 50%;
  user-select: none;
  cursor: pointer;
  font-size: 12px;
}
</style>