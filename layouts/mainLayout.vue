<template>
  <div class="app-main-layout">
    <navbar></navbar>
    <sidebar></sidebar>
    <main class="app-content">
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
  components: {
    navbar,
    sidebar,
  },
};
</script>

<style></style>
