import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/store/modules/user";
import { getAction } from "@/api/manage";
import { dictGet } from "@/api/common"
import { dynamicTree } from "@/utils/common"

console.log("env,", process.env.NODE_ENV)

/*
 * 开发环境不能使用 import 动态加载组件，这里开发环境用require替代，否则将会白屏不渲染界面
 * 生产环境可以使用 import 动态懒加载组件。
 */
const _import = require('./import-' + process.env.NODE_ENV)

// 全局路由
const globalRoutes = [{
  path: "/login",
  name: "login",
  component: () => import("@/views/Login.vue"),
}, {
  path: "/404",
  name: "404",
  component: () => import("@/views/common/404.vue"),
}, {
  path: '/:pathMatch(.*)', redirect: '/404', hidden: true
}]

// 进入主页后的路由
const baseRouters = [
  {
    name: "baseLayout",
    path: "/",
    redirect: { path: '/home' },
    component: () => import("@/layout/BaseLayout.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        component: () =>
          import("@/views/Home.vue"),
      },
      {
        path: "/codeGen",
        name: "codeGen",
        component: () =>
          import("@/views/code/CodeGen.vue"),
      }
    ],
    beforeEnter: (to, from, next) => {
      // console.debug("to:", to, ",from:", from)
      const userStore = useUserStore();
      if (!userStore.isLogin()) {
        next({ path: '/login' })
      }
      next();
    }
  }
];

// 初始化router
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  isDynamicRouterStatus: false,
  routes: baseRouters.concat(globalRoutes),
  scrollBehavior: () => ({ y: 0 }),
});

// router 前置容器
router.beforeEach((to, from, next) => {
  // console.debug("to:", to, ",from:", from)
  const userStore = useUserStore();
  if (userStore.isLogin()) {
    // console.log("getDynamicMenuState", userStore.getDynamicMenuState)
    if (userStore.getDynamicMenuState) {
      next();
    } else {
      console.log("===============初始化路由===============")
      getAction(`/sys/menu/perms`).then((res) => {
        if (res.success) {
          const menus = res.data.menus
          const perms = res.data.perms
          userStore.menusAndPerms(menus, perms)
          userStore.setShowMenus(dynamicRouterMenus(menus))
          next({ ...to, replace: true });
        } else {
          userStore.menusAndPerms([], [])
          userStore.setShowMenus([])
          next()
        }
      }).catch(ex => {
        console.error(ex);
        userStore.menusAndPerms([], [])
        userStore.setShowMenus([])
        next()
      });

      console.log("===============初始化字典===============")
      dictGet();
    }
  } else {
    next();
  }
  // return next.fullPath
})


const dynamicRouterMenus = (menus) => {
  for (let i = menus.length - 1; i >= 0; i--) {
    // 将菜单添加到路由里面，menuType=1为菜单
    let menu = menus[i]
    if (menu.menuType == 1) {
      router.addRoute("baseLayout", {
        path: menu.routeUrl,
        name: menu.id,
        component: () =>
          _import(menu.routeView),
      })
    }
  }
  // router.addRoute()
  const storeMenus = dynamicTree(menus, 0);
  return storeMenus;
}

export default router;
