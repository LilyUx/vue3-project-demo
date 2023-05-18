import { createRouter, createWebHashHistory } from "vue-router";
import Storage from "../utils/storage";
import routes from "./config";

/****处理路由数据****/
export const getNavRoutes = (flattenRoutes: any[]) => {
  const newTree = flattenRoutes.filter(route => {
    const isNav = route.meta && route.meta.isNav;
    if (isNav) {
      return true;
    } else {
      return false;
    }
  });
  return newTree;
};

export const flattenRoutes = (routes: any[]) => {
  const arr: any[] = [];

  function dfs(routes: any[]) {
    routes.forEach(route => {
      const { children } = route;
      if (children && children.length > 0) dfs(children);
      arr.push({ ...route });
    });
  }

  dfs(routes);
  return arr;
};
/****处理路由数据****/

export const Navs = getNavRoutes(flattenRoutes(routes));

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, form, next) => {
  const loginPath = "/login";
  const toPath = to.path;
  const userinfo = Storage.getValue("userinfo");
  const isLogin =
    typeof userinfo === "string" ? Boolean(JSON.parse(userinfo).token) : false;

  if (isLogin || toPath === loginPath) {
    next();
  } else {
    console.warn("请先登录");
    next(loginPath);
  }
});

export default router;
