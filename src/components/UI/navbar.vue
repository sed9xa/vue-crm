<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('isOpen')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ date }}</span>
      </div>
      <ul class="nav__items">
        <li class="nav__item">
          <router-link href="#" class="black-text" to="/profile">
            <i class="material-icons">account_circle</i>Профиль
          </router-link>
        </li>
        <li class="nav__item">
          <a @click="logOut" class="black-text">
            <i class="material-icons">assignment_return</i>Выйти
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      date: new Date().toLocaleString().replace(",", " "),
      dateInterval: "",
    };
  },
  methods: {
    async logOut() {
      try {
        await this.$store.dispatch("logOut");
        this.$router.push("/login?message=logout");
        this.$message("Вы вышли из системы");
      } catch (e) {
        console.log(e);
      }
    },
  },
  computed: {
    userName() {
      return this.$store.getters.info.username;
    },
  },
  mounted() {
    this.dateInterval = setInterval(() => {
      this.date = new Date().toLocaleString().replace(",", " ");
    }, 1000);
  },
  beforeUnmount() {
    clearInterval(this.dateInterval);
  },
};
</script>

<style>
.black-text {
  display: flex;
  gap: 5px;
}
</style>
