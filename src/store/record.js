import { getDatabase, ref, set, push } from "firebase/database";

export default {
  state: {},
  actions: {
    async createRecord({ dispatch, commit }, record) {
      try {
        const uid = await dispatch("getUid");
        const db = getDatabase();
        const recordsRef = await ref(db, `/users/${uid}/records`);
        const recordId = await push(recordsRef);
        await set(recordId, record);
      } catch (error) {
        throw error;
      }
    },
  },
};
