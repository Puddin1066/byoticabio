import { createRouter, createWebHistory } from "vue-router";
import ByoticaBioLandingView from "../views/ByoticaBioLandingView.vue";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: ByoticaBioLandingView,
    },
    {
      path: "/byoticabio",
      name: "byoticabio",
      component: ByoticaBioLandingView,
    },
    {
      path: "/consulting",
      name: "consulting",
      component: () => import("../views/ConsultingLandingView.vue"),
    },
    // Internal BTE services routes (for internal operations)
    {
      path: "/bte",
      name: "bte",
      component: HomeView,
    },
    {
      path: "/try-it",
      name: "try",
      component: () => import("../views/Try.vue"),
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: ByoticaBioLandingView,
    },
  ],
  linkActiveClass: "route-active",
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export default router;
