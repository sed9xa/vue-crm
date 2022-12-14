import { createRouter, createWebHistory } from "vue-router";
import { getAuth } from "firebase/auth";
import record from "@/store/record";
const routes = [
  {
    path: "/",
    name: "home",
    meta: {
      layout: "main",
      auth: true,
    },
    component: () => import("../views/home"),
  },
  {
    path: "/login",
    name: "login",
    meta: {
      layout: "empty",
    },
    component: () => import("../views/login"),
  },
  {
    path: "/registration",
    name: "registration",
    meta: {
      layout: "empty",
    },
    component: () => import("@/views/registration"),
  },
  {
    path: "/categories",
    name: "categories",
    meta: {
      layout: "main",
      auth: true,
    },
    component: () => import("@/views/categories"),
  },
  {
    path: "/history",
    name: "history",
    meta: {
      layout: "main",
      auth: true,
    },
    component: () => import("@/views/history"),
  },
  {
    path: "/planning",
    name: "planning",
    meta: {
      layout: "main",
      auth: true,
    },
    component: () => import("@/views/planning"),
  },
  {
    path: "/profile",
    name: "profile",
    meta: {
      layout: "main",
      auth: true,
    },
    component: () => import("@/views/profile"),
  },
  {
    path: "/detail/:id",
    name: "detail",
    meta: {
      layout: "main",
      auth: true,
    },
    component: () => import("@/views/detail"),
  },
  {
    path: "/record",
    name: "record",
    meta: {
      layout: "main",
      auth: true,
    },
    component: () => import("@/views/record"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const requireAuth = to.matched.some((record) => record.meta.auth);
  if (requireAuth && !currentUser) {
    next("/login");
  } else {
    next();
  }
});

export default router;
