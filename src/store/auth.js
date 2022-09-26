import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async signIn({ dispatch, commit }, { email, password }) {
      const auth = getAuth();
      try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log("Signed in");
      } catch {
        (error) => {
          throw error;
        };
      }
    },
    async signUp({ dispatch, commit }, { email, password, name }) {
      const auth = getAuth();
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("Signed up");
        const userUid = await dispatch("getUid");
        const db = getDatabase();
        await set(ref(db, `users/${userUid}/info`), {
          username: name,
          bill: 10000,
        });
      } catch {
        (error) => {
          throw error;
        };
      }
    },
    getUid() {
      const auth = getAuth();
      const user = auth.currentUser;
      return user ? user.uid : null;
    },
    async logOut({ dispatch, commit }) {
      const auth = getAuth();
      await signOut(auth);
      commit('clearInfo')
    },
  },
  modules: {},
};
