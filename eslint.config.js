const js = require("@eslint/js");
const pluginVue = require("eslint-plugin-vue");
const skipFormatting = require("@vue/eslint-config-prettier/skip-formatting");
const globals = require("globals");

module.exports = [
  {
    ignores: ["dist/**", "auto-imports.d.ts", "components.d.ts"],
  },
  js.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  skipFormatting,
  {
    languageOptions: {
      // 等价旧 eslintrc 的 env: { browser: true, node: true }
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
      // About/Home/Login/404 等为路由页面组件，允许单词命名
      "vue/multi-word-component-names": "off",
    },
  },
];
