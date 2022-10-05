import { getDatabase, ref, set, onValue, update } from "firebase/database";

export default {
  state: {
    info: {},
  },
  getters: {
    info: (state) => state.info,
  },
  mutations: {
    clearInfo(state) {
      state.info = {};
    },
    setInfo(state, payload) {
      state.info = payload;
    },
  },
  actions: {
    async fetchInfo({ commit, dispatch }) {
      const db = getDatabase();
      const uid = await dispatch("getUid");
      try {
        const userInfo = await ref(db, `/users/${uid}/info`);
        onValue(userInfo, (snapshot) => {
          const data = snapshot.val();
          commit("setInfo", data);
        });
      } catch (e) {
        throw e;
      }
    },
    async updateInfo({dispatch, commit}, toUpdate){
      const uid = await dispatch('getUid');
      const db = getDatabase();
      const userInfo = ref(db, `/users/${uid}/info/`)
      return update(userInfo, toUpdate)
    }
  },
};
