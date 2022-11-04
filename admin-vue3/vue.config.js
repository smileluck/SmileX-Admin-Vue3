const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");
const path = require("path");

// 是否是生产环境
const isProduction = process.env.NODE_ENV === "production"

module.exports = {
  // 设置根路径与服务器nginx部署路径有关
  publicPath: isProduction ? "/admin" : "/",

  // 优化1 减少打包体积，不生成map文件
  productionSourceMap: isProduction ? false : true,
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
  configureWebpack: config => {
    config.plugins.push(
      AutoImport({
        imports: ["vue"],
        resolvers: [
          ElementPlusResolver({
            importStyle: "css",
            exclude: new RegExp(/^(?!.*loading-directive).*$/),
          }),
        ],
        dts: "auto-imports.d.ts",
      }))

    config.plugins.push(
      Components({
        resolvers: [ElementPlusResolver({ importStyle: "css" })],
        dts: "components.d.ts",
      }))

  },
  // 开发配置
  devServer: {
    port: 3000,
  }
};

function addStyleResource(rule) {
  rule
    .use("style-resource")
    .loader("style-resources-loader")
    .options({
      patterns: [path.resolve(__dirname, "./src/styles/imports.styl")],
    });
}
