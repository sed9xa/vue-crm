<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form>
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
          @click.prevent="submitHandler"
        >
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email, minLength, minValue } from "@vuelidate/validators";
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      title: "",
      limit: 100,
    };
  },
  methods: {
    async submitHandler() {
      this.v$.$validate();
      try {
        if (this.v$.$errors.length === 0) {
          const category = await this.$store.dispatch("createCategory", {
            title: this.title,
            limit: this.limit,
          });
        this.title = ''
        this.limit = 100
        this.$emit('created', category)
        this.$v.reset();
        }
        
      } catch (error) {}
    },
  },
  validations: {
    title: { required },
    limit: { required, minValue: minValue(1) },
  },
  mounted() {
    M.updateTextFields();
  },
};
</script>

<style></style>
