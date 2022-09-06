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
          :class="{ invalid: v$.email.$errors.length > 0 }"
        />
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-for="error in v$.email.$errors"
          :key="error.$uid"
          >{{ error.$message }}
          </small
        >
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
        <a href="/">Зарегистрироваться</a>
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
    };
  },
  validations() {
    return {
      email: { required, email },
      password: { required, min: minLength(6) },
    };
  },
  methods: {
    submitHandler() {
      this.v$.$validate();
    },
  },
};
</script>

<style></style>
