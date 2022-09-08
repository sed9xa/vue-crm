import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "materialize-css/dist/js/materialize.min";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDRuheaEivL3m2kqSYAZPhhPdUjbCJyyUA",
  authDomain: "vue-crm-bbf0d.firebaseapp.com",
  projectId: "vue-crm-bbf0d",
  storageBucket: "vue-crm-bbf0d.appspot.com",
  messagingSenderId: "353745810736",
  appId: "1:353745810736:web:526328f907ef3893b4c4f5",
  measurementId: "G-72HRMPCZDQ",
  dataBaseURL: "https://vue-crm-bbf0d-default-rtdb.firebaseio.com",
};
initializeApp(firebaseConfig);
const auth = getAuth();

auth.onAuthStateChanged((user) => {
  /* console.log(user.uid); */
  console.log("changed");
});

createApp(App).use(store).use(router).mount("#app");
