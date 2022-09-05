<template>
  <ul class="sidenav app-sidenav open">
    <li v-for="link in links" :key="link.url">
      <router-link
        active-class="active"
        :exact="link.exact"
        class="waves-effect waves-orange pointer"
        :to="link.url"
        >{{ link.name }}</router-link
      >
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      links: [
        { name: "Счет", url: "/", exact: true },
        { name: "История", url: "/history" },
        { name: "Планирование", url: "/planning" },
        { name: "Новая запись", url: "/record" },
        { name: "Категории", url: "/categories" },
      ],
    };
  },
};
</script>

<style>
.router-link-exact-active{
    background-color: rgb(241, 241, 241);
}
</style>
