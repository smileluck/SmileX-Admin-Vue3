import { defineStore } from "pinia";


export const useUserStore = defineStore("user", {
  state: () => {
    return {
      token: localStorage.store_user_token != null ? localStorage.store_user_token : null,
      username: localStorage.store_user_username != null ? localStorage.store_user_username : null,
      dynamicMenuState: false,
      menus: [],
      perms: [],
      showMenus: [],
    };
  },
  getters: {
    getToken(state) {
      return state.token;
    },
    getMenus(state) {
      return state.menus;
    },
    getDynamicMenuState(state) {
      return state.dynamicMenuState
    },
    getShowMenus(state) {
      return state.showMenus
    }
  },
  actions: {
    login(token) {
      this.token = token;
      localStorage.store_user_token = token;
    },
    loginOut() {
      this.token = null;
      localStorage.store_user_token = null;
    },
    isLogin() {
      return this.token != null && this.token != "null";
    },
    menusAndPerms(menus, perms) {
      this.dynamicMenuState = true;
      this.menus = menus;
      this.perms = perms;
    },
    setShowMenus(menus) {
      this.showMenus = menus;
    }
  },
});
