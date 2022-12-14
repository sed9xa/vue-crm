import { get, getDatabase, update, push, ref, set } from "firebase/database";

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
        return categoriesObjects;
      } catch (error) {
        throw error;
      }
    },

    async fetchCategoryById({ dispatch }, id) {
      try {
        const uid = await dispatch("getUid");
        const db = getDatabase();
        const categoryRef = ref(db, `/users/${uid}/categories`);
        const snapshot = await get(categoryRef);
        let categoriesSnap = snapshot.val() || {};
        return categoriesSnap[id] || 'Not Found'
      } catch (error) {
        throw error;
      }
    },

    async updateData({ dispatch }, { title, limit, id }) {
      try {
        const uid = await dispatch("getUid");
        const db = getDatabase();
        const categoryRef = ref(db, `/users/${uid}/categories`);
        const updates = {};
        updates[`/${id}/title`] = title;
        updates[`/${id}/limit`] = limit;
        update(categoryRef, updates);
      } catch (error) {
        throw error;
      }
    },
  },
};
