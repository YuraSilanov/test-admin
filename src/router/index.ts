import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/user";
import type { RouteLocationNormalized } from "vue-router";
import type { NavigationGuardNext } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "PageDashbord",
      component: () => import("@/views/dashboard/PageDashboard.vue"),
    },
    {
      path: "/login",
      name: "PageLogin",
      component: () => import("@/views/login/PageLogin.vue"),
    },
  ],
});

router.beforeEach(
  (
    to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const userStore = useUserStore();

    if (to.name !== "PageLogin" && !userStore.auth) {
      next({ name: "PageLogin" });
    } else {
      next();
    }
  }
);

export default router;
