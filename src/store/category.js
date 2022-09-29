import { getDatabase, onValue, push, ref, set } from "firebase/database";

export default {
  actions: {
    async createCategory({ commit, dispatch }, { title, limit }) {
      try {
        const uid = await dispatch("getUid");
        const db = getDatabase();
        const categoryRef = ref(db, `/users/${uid}/categories`);
        const category = await push(categoryRef);
        set(category, {
          title,
          limit,
        });
        return { title, limit, id: category.key };
      } catch (error) {
        throw error;
      }
    },
    async fetchCategories({ dispatch }) {
      try {
        let categoriesObjects = [];
        const uid = await dispatch("getUid");
        const db = getDatabase();
        const categoryRef = ref(db, `/users/${uid}/categories`);
        onValue(categoryRef, (snapshot) => {
          let categoriesSnap = snapshot.val() || {};
          let categoriesKeys = Object.keys(categoriesSnap);
          categoriesKeys.forEach((element) => {
            let currentCategory = categoriesSnap[element];
            categoriesObjects.push({
              id: element,
              title: currentCategory.title,
              limit: currentCategory.limit,
            });
          });
        });
        return categoriesObjects;
      } catch (error) {
        throw error;
      }
    },
  },
};
