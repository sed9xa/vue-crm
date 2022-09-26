<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>
    <Loader></Loader>
    <div class="row">
      <home-bill></home-bill>
      <home-currency></home-currency>
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
  components: {
    homeBill,
    homeCurrency,
  },
};
</script>

<style></style>
