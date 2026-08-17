import { createApp } from "vue";
import App from "./App.vue";
import store from "@/store";

// import axios from "@/utils/request"

import "./assets/styles/reset.css";
import "./assets/styles/global.scss";
import "element-plus/theme-chalk/index.css";


// import mdEditorConfig from "./config/mdEditorConfig";

const app = createApp(App);
// 自定义组件
import TableColumnDict from "@/components/TableColumnDict.vue";
import DictSelect from "@/components/DictSelect.vue";
app.component('dict-select', DictSelect)
app.component("table-column-dict", TableColumnDict)

app.use(store);

// mdEditorConfig(app);

import router from "./router";
app.use(router).mount("#app");