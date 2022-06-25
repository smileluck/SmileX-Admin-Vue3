import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { setupStore } from "@/store";
// import axios from "@/utils/request"

import "./assets/styles/reset.css";
import "./assets/styles/global.scss";
import "element-plus/theme-chalk/index.css";

const app = createApp(App);
setupStore(app);
app.use(router).mount("#app");
