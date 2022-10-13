<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>
    <Loader v-if="loading"></Loader>
    <div class="row plates" v-else>
      <home-bill :rates="currency.rates"></home-bill>
      <home-currency :currency="currency"></home-currency>
    </div>
  </div>
</template>

<script>
import homeBill from "@/components/homeBill.vue";
import homeCurrency from "@/components/homeCurrency.vue";

export default {
  data() {
    return {
      loading: true,
      currency: null,
    };
  },
  async mounted() {
    this.currency = await this.$store.dispatch("fetchCurrency");
    this.loading = false;
    
  },
  methods: {
   async refresh() {
      this.loading = true;
      this.currency = await this.$store.dispatch("fetchCurrency");
      this.loading = false;
    },
  },
  components: {
    homeBill,
    homeCurrency,
  },
};
</script>

<style>
.plates{
  display: flex;
  flex-wrap: wrap;
}
</style>
