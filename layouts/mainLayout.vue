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
      <a class="btn-floating btn-large blue" href="#">
        <i class="large material-icons">add</i>
      </a>
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
  //1) info data just vanishing when im reloading page
  //2) i can passing by login form, despite that user dont logged in, app dont catch the error some reason

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
