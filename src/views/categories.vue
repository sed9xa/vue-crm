<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      
      <loader v-if="loading"></loader>
      <div class="row" v-else>
        <category-create @created="addNewCategory"></category-create>
        <category-edit
          :key="categories.length + updateKey"
          :categories="categories"
          @updateCategory="updateCategory"
        ></category-edit>
      </div>
    </section>
  </div>
</template>

<script>
import categoryEdit from "@/components/categoryEdit.vue";
import categoryCreate from "@/components/categoryCreate.vue";
import Loader from "@/components/UI/Loader.vue";

export default {
  data() {
    return {
      loading: true,
      categories: [],
      updateKey: 0,
    };
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
    },
    updateCategory(data) {
      const index = this.categories.findIndex((item) => item.id === data.id);
      this.categories[index].title = data.title;
      this.categories[index].limit = data.limit;
      this.updateKey++
    },
  },
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.loading = false;
  },
  components: { categoryEdit, categoryCreate, Loader },
};
</script>

<style></style>
