<template>
  <div>
    <div>
      <div class="breadcrumb-wrap">
        <a href="/history" class="breadcrumb">История</a>
        <a class="breadcrumb"> Расход </a>
      </div>
      <loader v-if="loading === true"></loader>
      <div v-else class="row">
        <div class="col s12 m6">
          <div
            class="card red"
            :class="[record.type === 'income' ? 'green' : 'red']"
          >
            <div class="card-content white-text">
              <p>Описание: {{ record.description }}</p>
              <p>Сумма: {{ record.amount }}</p>
              <p>Категория: {{ category.title }}</p>

              <small>{{ record.date }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '@/components/UI/Loader.vue';
export default {
  components: { Loader },
  data() {
    return {
      record: Object,
      category: Object,
      loading: true,
    };
  },
  async mounted() {
    let currentRecordId = this.$route.params.id;
    this.record = await this.$store.dispatch(
      "fetchRecordById",
      currentRecordId
    );
    this.category = await this.$store.dispatch(
      "fetchCategoryById",
      this.record.categoryID
    );
    console.log(this.record);
    this.loading = false;
  },
};
</script>

<style></style>
