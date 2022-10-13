<template>
  <div class="app-main-layout">
    <navbar @isOpen="isOpen = !isOpen"></navbar>
    <sidebar :isOpen="isOpen"></sidebar>
    <main class="app-content" :class="{ full: !isOpen }">
      <div class="app-page">
        <router-view></router-view>
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large blue" to="/record" v-tooltip="'Добавить новую запись'">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import navbar from "@/components/UI/navbar";
import sidebar from "@/components/UI/sidebar";

export default {
  data() {
    return {
      isOpen: true,
    };
  },
  async mounted() {
    await this.$store.dispatch("fetchInfo");
  },
  components: {
    navbar,
    sidebar,
  },
};
</script>

<style></style>
