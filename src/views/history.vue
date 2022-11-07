<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <pie-chart :chartData="chartData"></pie-chart>

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
import PieChart from "@/components/UI/PieChart.vue";
import category from "@/store/category";
export default {
  name: "history",
  mixins: [paginationMixin],
  data() {
    return {
      loading: true,
      categories: [],
      records: [],
      chartData: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [],
          },
        ],
      },
    };
  },
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.records = await this.$store.dispatch("fetchRecords");
    this.setup();
    this.setupChartData();

    this.loading = false;
  },
  methods: {
    setupChartData() {
      let chartData = {};
      let data = [];
      this.records.forEach((record) => {
        if (record.type === "outcome") {
          if (chartData[record.categoryName]) {
            chartData[record.categoryName] += record.amount;
          } else if (!chartData[record.categoryName]) {
            chartData[record.categoryName] = record.amount;
            this.chartData.datasets[0].backgroundColor.push(
              this.getRandomColor()
            );
          }
        }
      });
      for (let item in chartData) {
        this.chartData.labels.push(item);
        data.push(chartData[item]);
      }
      this.chartData.datasets[0].data = data;
    },
    getRandomColor() {
      return "#" + Math.floor(Math.random() * 16777215).toString(16);
    },
    setup() {
      let records = this.records.map((record) => {
        return {
          ...record,
          categoryName: this.categories.find((c) => c.id === record.categoryID)
            .title,
          typeClass: record.type === "income" ? "green" : "red",
          typeText: record.type === "income" ? "Доход" : "Расход",
        };
      });
      this.records = records;
      this.setupPagination(records);
    },
  },
  components: {
    historyTable,
    PieChart,
  },
};
</script>

<style></style>
