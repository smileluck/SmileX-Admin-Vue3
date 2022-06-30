import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/store/modules/user";
import { getAction } from "@/api/manage";

console.log("env,", process.env.NODE_ENV)

const _import = require('./import-' +process.env.NODE_ENV)

// 全局路由
const globalRoutes = [{
  path: "/login",
  name: "login",
  component: () => import("@/views/Login.vue"),
}, {
  path: "/404",
  name: "404",
  component: () => import("@/views/common/404.vue"),
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
      // {
      //   path: "/table",
      //   name: "table",
      //   component: () =>
      //     import("@/views/demo/TableDemo.vue"),
      // },
      {
        path: "/menu",
        name: "menu",
        component: () => import("@/views/sys/SysMenu.vue")
      },
      {
        path: "/codeGen",
        name: "codeGen",
        component: () =>
          import("@/views/code/CodeGen.vue"),
      }
    ],
    beforeEnter: (to, from, next) => {
      console.debug("to:", to, ",from:", from)
      const userStore = useUserStore();
      const token = userStore.getToken
      if (token == null) {
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
  console.debug("to:", to, ",from:", from)
  const userStore = useUserStore();
  if (userStore.isLogin()) {
    console.log("getDynamicMenuState", userStore.getDynamicMenuState)
    if (userStore.getDynamicMenuState) {
      next();
    } else {
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
      });
    }
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
  const storeMenus = dynamicRouterMenusTree(menus, 0);
  return storeMenus;
}

// 数组递归转换数结构
const dynamicRouterMenusTree = (list, pid) => {
  const arr = [];
  list.forEach(item => {
    if (item.parentId == pid) {
      const children = dynamicRouterMenusTree(list, item.id);
      if (children.length != 0) {
        item.children = children
      }
      arr.push(item);
    }
  })
  return arr
}

export default router;
