import { get, getDatabase, onValue, push, ref, set } from "firebase/database";

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
        const snapshot = await get(categoryRef);
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
          console.log(categoriesObjects, 'fuck')
        console.log(categoriesObjects);
        return categoriesObjects;
      } catch (error) {
        throw error;
      }
    },
  },
};
