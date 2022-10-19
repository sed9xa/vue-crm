import { getDatabase, ref, set, push, get } from "firebase/database";

export default {
  state: {},
  actions: {
    async createRecord({ dispatch }, record) {
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
    async fetchRecords({ dispatch }) {
      try {
        let recordsObjects = [];
        const uid = await dispatch("getUid");
        const db = getDatabase();
        const categoryRef = ref(db, `/users/${uid}/records`);
        const snapshot = await get(categoryRef);
        let recordsSnap = snapshot.val() || {};
        let recordsKeys = Object.keys(recordsSnap);
        recordsKeys.forEach((element) => {
          let currentCategory = recordsSnap[element];
          recordsObjects.push({
            categoryID: currentCategory.categoryID,
            amount: currentCategory.amount,
            date: currentCategory.date,
            description: currentCategory.description,
            type: currentCategory.type,
          });
        });
        return recordsObjects;
      } catch (error) {
        throw error;
      }
    },
  },
};
