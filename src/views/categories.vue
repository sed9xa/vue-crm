<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <loader v-if="loading"></loader>
      <div class="row" v-else> 
        <category-create @created="addNewCategory"></category-create>
        <category-edit :categories="categories"></category-edit>
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
    };
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
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
