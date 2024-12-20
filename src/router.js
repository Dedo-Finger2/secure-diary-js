import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import ConfigPage from "./pages/ConfigPage.vue";
import NotFoundPage from "./pages/NotFoundPage.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
    beforeEnter: () => {
      const userData = localStorage.getItem("userData");
      if (!userData) {
        router.push("/config");
      }
    },
  },
  {
    path: "/config",
    name: "config",
    component: ConfigPage,
  },
  {
    path: "/:catchAll(.*)*",
    name: "notFound",
    component: NotFoundPage,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
