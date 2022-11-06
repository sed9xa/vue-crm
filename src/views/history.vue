<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <Loader v-if="loading"></Loader>
    <div v-else-if="!items.length">
      <h4>Записей пока нет</h4>
      <router-link to="/record">Добавить запись</router-link>
    </div>

    <section v-else>
      <history-table :records="items"></history-table>

      <paginate
        class="pagination"
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'Назад'"
        :next-text="'Вперед'"
        :container-class="'className'"
      >
      </paginate>
    </section>
  </div>
</template>

<script>
import historyTable from "@/components/historyTable.vue";
import paginationMixin from "@/mixins/pagination.mixin";
export default {
  name: "history",
  mixins: [paginationMixin],
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
    this.setupPagination(
      records.map((record) => {
        return {
          ...record,
          categoryName: this.categories.find((c) => c.id === record.categoryID)
            .title,
          typeClass: record.type === "income" ? "green" : "red",
          typeText: record.type === "income" ? "Доход" : "Расход",
        };
      })
    );

    this.loading = false;
  },

  components: {
    historyTable,
  },
};
</script>

<style></style>
