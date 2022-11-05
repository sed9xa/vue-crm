<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <Loader v-if="loading"></Loader>
    <div v-else-if="!records.length">
      <h4>Записей пока нет</h4>
      <router-link to="/record">Добавить запись</router-link>
      </div>

    <section v-else>
      <history-table :records="records"></history-table>
    </section>
  </div>
</template>

<script>
import historyTable from "@/components/historyTable.vue";
export default {
  name: "history",
  data() {
    return {
      loading: true,
      categories: [],
      records: [],
    };
  },
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    const records = await this.$store.dispatch("fetchRecords");
    this.records = records.map((record) => {
      return {
        ...record,
        categoryName: this.categories.find((c) => c.id === record.categoryID)
          .title,
        typeClass: record.type === "income" ? "green" : "red",
        typeText: record.type === "income" ? "Доход" : "Расход",
      };
    });

    this.loading = false;
  },

  components: {
    historyTable,
  },
};
</script>

<style></style>
