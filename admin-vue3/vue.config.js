const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");
const path = require("path");

// 生产优化
// 代码压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')


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
    if (isProduction) {
      // 代码压缩
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            //生产环境自动删除console
            warnings: false, // 若打包错误，则注释这行
            compress: {
              drop_debugger: true,
              drop_console: true,
              pure_funcs: ['console.log']
            }
          },
          sourceMap: false,
          parallel: true
        })
      )
      // GZIP压缩
      // const productionGzipExtensions = ['html', 'js', 'css']
      // config.plugins.push(
      //   new CompressionWebpackPlugin({
      //     filename: '[path].gz[query]',
      //     algorithm: 'gzip',
      //     test: new RegExp(
      //       '\\.(' + productionGzipExtensions.join('|') + ')$'
      //     ),
      //     threshold: 10240, // 只有大小大于该值的资源会被处理 10240
      //     minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
      //     deleteOriginalAssets: true // 不删除原文件
      //   })
      // )
    
    }
  },
  // eslint开启
  lintOnSave: !isProduction,
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
