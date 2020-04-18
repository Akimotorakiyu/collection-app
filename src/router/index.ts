import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import TheLayout from "@/TheLayout.vue";
import TheAppLayout from "@/views/TheAppLayout.vue";

import Home from "@/views/Calendar/Index.vue";

Vue.use(VueRouter);

export const nav: RouteConfig[] = [
  {
    path: "",
    name: "主页",
    meta: {
      icon: "el-icon-s-claim",
      nickName: "主页"
    },
    component: Home
  }
];

const routes: RouteConfig[] = [
  {
    path: "/",
    component: TheLayout,
    children: [
      {
        path: "",
        component: TheAppLayout,
        children: nav
      }
    ]
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

router.afterEach(to => {
  document.title = to.meta?.nickName ?? to.meta?.name ?? to.meta?.title ?? "";
});
