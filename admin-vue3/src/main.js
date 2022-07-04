import { createApp } from "vue";
import App from "./App.vue";
import store from "@/store";

// import axios from "@/utils/request"

import "./assets/styles/reset.css";
import "./assets/styles/global.scss";
import "element-plus/theme-chalk/index.css";

import mdEditorConfig from "./config/mdEditorConfig";

const app = createApp(App);
app.use(store);

mdEditorConfig(app);

import router from "./router";
app.use(router).mount("#app");