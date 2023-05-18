const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/",
    redirect: "/home/config",
  },
  {
    path: "/home",
    name: "Home",
    redirect: "/home/config",
    component: () => import("@/views/home/index.vue"),
    children: [
      {
        path: "/home/config",
        name: "Config",
        component: () => import("@/views/config/index.vue"),
        meta: { isNav: true, title: "便捷配置" },
      },
      {
        path: "/home/tool",
        name: "Tool",
        component: () => import("@/views/tool/index.vue"),
        meta: { isNav: true, title: "实用工具" },
      },
      {
        path: "/home/question",
        name: "Question",
        component: () => import("@/views/question/index.vue"),
        meta: { isNav: true, title: "问题反馈" },
      },
    ],
  },
];

export default routes;
