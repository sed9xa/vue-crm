<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form>
        <div class="input-field">
          <select ref="select" v-model="current">
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
              {{ cat.title }}
            </option>
          </select>
          <label>Выберите категорию</label>
        </div>
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{ invalid: v$.title.$error }"
          />
          <label for="name">Название</label>
          <span class="helper-text invalid" v-if="v$.title.$error">{{
            v$.title.$errors[0].$message
          }}</span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{ invalid: v$.limit.$error }"
          />
          <label for="limit">Лимит</label>
          <span class="helper-text invalid" v-if="v$.limit.$error">{{
            v$.limit.$errors[0].$message
          }}</span>
        </div>

        <button
          class="btn waves-effect waves-light"
          type="submit"
          @click.prevent="updateHandler"
        >
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, minValue } from "@vuelidate/validators";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      title: "",
      limit: 100,
      current: null,
    };
  },
  methods: {
    async updateHandler() {
      this.v$.$validate();
      try {
        if (this.v$.$errors.length === 0) {
          const data = {
            title: this.title,
            limit: this.limit,
            id: this.current,
          }
          this.$store.dispatch('updateData', data)
          this.$emit('updateCategory', data);


          this.v$.$reset();
        }
      } catch (error) {}
    },
  },
  watch: {
    current(catId) {
      const { title, limit } = this.categories.find(
        (item) => item.id === catId
      );
      this.title = title;
      this.limit = limit;
    },
  },
  created(){
    const {title, limit, id} = this.categories[0];
    this.title = title;
    this.limit = limit;
    this.current = id;
  },
  validations: {
    title: { required },
    limit: { required, minValue: minValue(1) },
  },
  props: {
    categories: {
      required: true,
      type: Array,
    },
  },
  mounted() {
    M.FormSelect.init(this.$refs.select);
    M.updateTextFields();
  },
};
</script>

<style></style>
