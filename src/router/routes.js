
const routes = [
  {
    path: "/",
    component: () => import("pages/LoginPage.vue"),
  },
  {
    path: "/home",
    component: () => import("layouts/MainLayout.vue"),
    meta: {
      authRequired: "true",
    },
    children: [
      {
        path: "/home",
        component: () => import("pages/IndexPage.vue"),
        meta: {
          authRequired: "true",
        },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];


export default routes;
