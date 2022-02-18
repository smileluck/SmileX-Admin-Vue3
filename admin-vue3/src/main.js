import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import axios from "@/utils/request"


import "./assets/styles/reset.css";
import "./assets/styles/global.scss";

const app = createApp(App);
// app.config.globalProperties.$http = axios;
app.use(store).use(router).mount("#app");
