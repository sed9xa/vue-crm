<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <category-create @created = 'addNewCategory'></category-create>
        <category-edit></category-edit>
      </div>
    </section>
  </div>
</template>

<script>
import categoryEdit from "@/components/categoryEdit.vue";
import categoryCreate from "@/components/categoryCreate.vue";

export default {
  data(){
    return{
      categories: []
    }
  },
  methods:{
    addNewCategory(category){
      this.categories.push(category)
      console.log(this.categories);
    }
  },
  components: { categoryEdit, categoryCreate },
};
</script>

<style></style>
