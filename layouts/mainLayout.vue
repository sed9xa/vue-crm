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
  components: {
    navbar,
    sidebar,
  },
};
</script>

<style></style>
