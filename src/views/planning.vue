<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{ info.bill }}</h4>
    </div>
    <loader v-if="loading"></loader>
    <p v-else-if="!categories.length">
      Категорий пока нет
      <router-link to="/categories">Создать категорию</router-link>
    </p>
    <section v-else>
      <div v-for="cat in categories" :key="cat.id">
        <p>
          <strong>{{ cat.title }}</strong>
          {{ cat.spend }} RUB из {{ cat.limit }} RUB
        </p>
        <div class="progress">
          <div
            class="determinate"
            :class="[cat.progressColor]"
            :style="{ width: cat.progressPercent + '%' }"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      loading: true,
      categories: [],
    };
  },
  async mounted() {
    this.loading = false;
    const records = await this.$store.dispatch("fetchRecords");
    const categories = await this.$store.dispatch("fetchCategories");
    this.categories = categories.map((cat) => {
      const spend = records
        .filter((r) => r.categoryID === cat.id)
        .filter((r) => r.type === "outcome")
        .reduce((total, record) => {
          return (total += record.amount);
        }, 0);
      const percent = (100 * spend) / cat.limit;
      const progressPercent = percent > 100 ? 100 : percent;
      const progressColor =
        percent < 60 ? "green" : percent < 100 ? "yellow" : "red";
      return {
        ...cat,
        progressPercent,
        progressColor,
        spend,
      };
    });
  },
  computed: {
    ...mapGetters(["info"]),
  },
};
</script>

<style></style>
