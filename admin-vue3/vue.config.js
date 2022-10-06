const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");
const path = require("path");

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/admin" : "/",
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "~@/assets/styles/variables.scss";`,
      },
    },
  },
  chainWebpack: (config) => {
    const types = ["vue-modules", "vue", "normal-modules", "normal"];
    types.forEach((type) =>
      addStyleResource(config.module.rule("stylus").oneOf(type))
    );
  },
  configureWebpack: {
    plugins: [
      AutoImport({
        imports: ["vue"],
        resolvers: [
          ElementPlusResolver({
            importStyle: "css",
            exclude: new RegExp(/^(?!.*loading-directive).*$/),
          }),
        ],
        dts: "auto-imports.d.ts",
      }),
      Components({
        resolvers: [ElementPlusResolver({ importStyle: "css" })],
        dts: "components.d.ts",
      }),
    ],
  },
};

function addStyleResource(rule) {
  rule
    .use("style-resource")
    .loader("style-resources-loader")
    .options({
      patterns: [path.resolve(__dirname, "./src/styles/imports.styl")],
    });
}
