import { createRouter, createWebHistory } from "vue-router";
import FormPage from "../components/FormPage.vue";
import PreviewPage from "../components/PreviewPage.vue";

const routes = [
  {
    path: "/",
    name: "FormPage",
    component: FormPage,
  },
  {
    path: "/preview",
    name: "PreviewPage",
    component: PreviewPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
