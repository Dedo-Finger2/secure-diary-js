import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import NotFoundPage from "./pages/NotFoundPage.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
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