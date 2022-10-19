<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>
    <loader v-if="loading"></loader>
    <p v-else-if="!categories.length">
      Категорий пока нет
      <router-link to="/categories">Создать категорию</router-link>
    </p>
    <form class="form" v-else>
      <div class="input-field">
        <select ref="select" v-model="category">
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.title }}
          </option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model="amount"
          :class="{ invalid: v$.amount.$error }"
        />
        <label for="amount">Сумма</label>
        <span class="helper-text invalid" v-if="v$.amount.$error">{{
          v$.amount.$errors[0].$message
        }}</span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{ invalid: v$.description.$error }"
        />
        <label for="description">Описание</label>
        <span class="helper-text invalid" v-if="v$.description.$error">{{
          v$.description.$errors[0].$message
        }}</span>
      </div>

      <button
        class="btn waves-effect waves-light"
        type="submit"
        @click.prevent="submitHandler"
      >
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email, minLength, minValue } from "@vuelidate/validators";
import { mapGetters } from "vuex";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      categories: [],
      loading: true,
      category: null,
      type: "income",
      amount: Number,
      description: "",
    };
  },
  computed: {
    ...mapGetters(["info"]),
    canCreateRecord() {
      if (this.type === "income") {
        return true;
      }
      return this.info.bill >= this.amount;
    },
  },
  methods: {
    async submitHandler() {
      this.v$.$validate();

      if (this.canCreateRecord && !this.v$.$errors.length) {
        try {
          await this.$store.dispatch("createRecord", {
            categoryID: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toLocaleString().replace(",", " "),
          });
        } catch (error) {
          throw error;
        }
        const bill =
          this.type === "income"
            ? this.info.bill + this.amount
            : this.info.bill - this.amount;
        this.$store.dispatch("updateInfo", { bill });
        this.$message("Данные успешно обновлены");
        this.amount = null;
        this.description = "";
        this.v$.$reset();
      } else if (this.v$.$errors.length) {
        this.$message("Вы ввели некорректные данные");
      } else {
        this.$message(
          `Недостаточно средств на счете (${this.amount - this.info.bill})`
        );
      }
    },
  },
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.loading = false;
    if (this.categories.length) {
      this.category = this.categories[0].id;
    }
    setTimeout(() => {
      M.FormSelect.init(this.$refs.select);
    }, 0);
    M.updateTextFields();
  },
  validations: {
    amount: { required, minValue: minValue(1) },
    description: { required },
  },
};
</script>

<style></style>
