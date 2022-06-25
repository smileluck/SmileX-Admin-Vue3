import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      token: null,
      username: "",
    };
  },
  getters: {
    getToken() {
      return this.token;
    },
  },
  actions: {
    login(token) {
      this.token = token;
    },
    loginOut() {
      this.token = null;
    },
  },
});
