<template>
  <form class="card auth-card">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          class="validate"
          v-model="email"
          :class="{ invalid: v$.email.$errors.length }"
        />
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-for="error in v$.email.$errors"
          :key="error.$uid"
          >{{ error.$message }}
        </small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          class="validate"
          :class="{ invalid: v$.email.$errors.length > 0 }"
          v-model="password"
        />
        <label for="password">Пароль</label>
        <small
          class="helper-text invalid"
          v-for="error in v$.password.$errors"
          :key="error.$uid"
          >{{ error.$message }}</small
        >
      </div>
      <div class="error-message red-text text-darken-2">{{ errorMessage }}</div>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
          @click.prevent="submitHandler"
        >
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/registration">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  validations() {
    return {
      email: { required, email },
      password: { required, min: minLength(6) },
    };
  },
  methods: {
    async submitHandler() {
      this.v$.$validate();
      let userData = {
        email: this.email,
        password: this.password,
      };
      if (!this.v$.email.$errors.length && !this.v$.password.$errors.length) {
        try {
          await this.$store.dispatch("signIn", userData);
          this.$router.push("/");
        } catch (e) {
          this.errorMessage = e.message.split("/")[1].replace(").", " ");
        }
      }
    },
  },
};
</script>

<style></style>
