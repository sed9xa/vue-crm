<template>
  <form class="card auth-card">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input id="email" type="text" v-model="email" />
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-for="error in v$.email.$errors"
          :key="error.$uid"
          >{{ error.$message }}</small
        >
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          class="validate"
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
      <div class="input-field">
        <input id="name" type="text" class="validate" v-model="name" />
        <label for="name">Имя</label>
        <small
          class="helper-text invalid"
          v-for="error in v$.name.$errors"
          :key="error.$uid"
          >{{ error.$message }}</small
        >
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="rulesAgree" />
          <span>С правилами согласен</span>
        </label>
      </p>
      <div class="error-message red-text text-darken-2">{{ errorMessage }}</div>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
          @click.prevent="submitHandler"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
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
      name: "",
      errorMessage: "",
      rulesAgree: false,
    };
  },
  validations() {
    return {
      email: { required, email },
      password: { required, min: minLength(6) },
      name: { required },
    };
  },
  methods: {
    async submitHandler() {
      this.v$.$validate();
      let userData = {
        email: this.email,
        password: this.password,
        name: this.name,
      };
      if (!this.v$.email.$errors.length && !this.v$.password.$errors.length && this.rulesAgree){
        try{
            await this.$store.dispatch("signUp", userData);
            this.$router.push("/");
        }
        catch(e){
            this.errorMessage = e
        }
      }
      
    },
  },
};
</script>

<style></style>
