import { getDatabase, onValue, push, ref, set } from "firebase/database";

export default {
  actions: {
    async createCategory({commit, dispatch }, {title, limit}){
        try {
            const uid = await dispatch('getUid')
            const db = getDatabase();
            const categoryRef = ref(db, `/users/${uid}/categories`)
            const category = await push(categoryRef)
            set(category, {
                title,
                limit
            })
            return {title, limit, id: category.key}
        } catch (error) {
            throw error
        }
    }
  },
};
