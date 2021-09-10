
import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    redirect: "/database/default",
  },
  // 登录注册
  {
    path: "/loginReg",
    name: "loginReg",
    component: () =>
      import(
        /* webpackChunkName: "loginReg" */ "@/views/loginProcess/loginReg.vue"
      ),
    redirect: "/login",
    children: [
      {
        path: "/login",
        name: "login",
        component: () =>
          import(
            /* webpackChunkName: "login" */ "@/views/loginProcess/login.vue"
          ),
      },
      {
        path: "/imlogin",
        name: "imlogin",
        component: () =>
          import(
            /* webpackChunkName: "imlogin" */ "@/views/loginProcess/import_login.vue"
          ),
      },
      {
        path: "/register",
        name: "register",
        component: () =>
          import(
            /* webpackChunkName: "register" */ "@/views/loginProcess/register/register.vue"
          ),
      },
    ],
  },
  // 登录注册初始引导页
  {
    path: "/lead",
    name: "lead-index",
    component: () =>
      import(
        /* webpackChunkName: "lead-index" */ "@/views/guideRegister/index.vue"
      ),
    redirect: "/lead/default",
    children: [
      {
        path: "/lead/default",
        name: "lead-default",
        component: () =>
          import(
            /* webpackChunkName: "lead-default" */ "@/views/guideRegister/default.vue"
          ),
      },
      {
        path: "/lead/choice",
        name: "lead-choice",
        component: () =>
          import(
            /* webpackChunkName: "lead-choice" */ "@/views/guideRegister/choice.vue"
          ),
      },
    ],
  },
  {
    path: "/database/default",
    name: "database-default",
    component: () => import("@/views/template/index.vue"),
  },
  { path: "*", component: () => import("@/views/errorPage/404.vue") },
];

const router = new VueRouter({
  mode: "hash",
  base: "",
  routes,
});
// 前置守卫
router.beforeEach((to, from, next) => {

  to.query.timestamp = new Date().getTime(); // 每次路由都加上参数，确保每次路由都能被拦截
  if (to.path === from.path && Object.keys(to.query).length === 1) {
    store.commit("setIsRouterAlive", false);
  }
  // if (!to.path.includes("/lead/choice") && !sshKey) {
  //   next("/lead/choice");
  // } else if (!to.path.includes("/login") && !passphrase) {
  //   next("/login");
  // } else {
  //   next();
  // }
  next()
});
// 多次点击同一路由控制台抛错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

export default router;
