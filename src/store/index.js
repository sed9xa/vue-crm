import { createStore } from "vuex";
import auth from "./auth";
import info from "./info";
import category from "./category";
export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async fetchCurrency() {
      const key = process.env.VUE_APP_FIXER;
      let myHeaders = new Headers();
      myHeaders.append("apikey", key);

      let requestOptions = {
        method: "GET",
        redirect: "follow",
        headers: myHeaders,
      };

      let res = await fetch(
        "https://api.apilayer.com/exchangerates_data/latest?symbols=RUB%2C%20EUR%2C%20USD&base=EUR",
        requestOptions
      );

      return await res.json();
    },
  },
  modules: {
    auth,
    info,
    category
  },
});
