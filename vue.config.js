const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");

// 是否是生产环境
const isProduction = process.env.NODE_ENV === "production"


module.exports = {
  // 设置根路径与服务器nginx部署路径有关
  publicPath: isProduction ? "/admin" : "/",

  // 优化1 减少打包体积，不生成map文件
  productionSourceMap: isProduction ? false : true,

  // 生产构建使用 webpack5 内置 terser 压缩
  chainWebpack: (config) => {
    // thread-loader 的 worker 进程在 Node 17+ (OpenSSL 3) 下触发 md4 报错
    // error:0308010C:digital envelope routines::unsupported，
    // 项目规模小，改为在主进程执行 babel，无感知性能影响
    config.module.rule("js").uses.delete("thread-loader");

    // webpack 默认 hashFunction 为 md4，OpenSSL 3 (Node 17+) 不再支持原生 md4，
    // babel-loader 缓存等组件会经 outputOptions.hashFunction 触发；
    // 改用 sha256 从根源规避
    config.output.hashFunction("sha256");

    // 统一站点标题（html-webpack-plugin 默认取 package.json 的 name）
    config.plugin("html").tap((args) => {
      args[0].title = "SmileX-Admin";
      return args;
    });

    // cli-plugin-eslint 会给 eslint-webpack-plugin 传入 eslint 9+ 已移除的
    // extensions 选项（报 Invalid Options: Unknown options: extensions），
    // 在此剥离
    if (config.plugins.has("eslint")) {
      config.plugin("eslint").tap((args) => {
        delete args[0].extensions;
        return args;
      });
    }

    if (isProduction) {
      config.optimization.minimizer("terser").tap((args) => {
        const terserOptions = args[0].terserOptions;
        terserOptions.compress = {
          ...terserOptions.compress,
          // 生产环境自动删除debugger与console
          drop_debugger: true,
          drop_console: true,
          pure_funcs: ["console.log"],
        };
        return args;
      });
    }
  },

  css: {
    loaderOptions: {
      sass: {
        // Dart Sass 3.0 将移除 @import，统一使用 @use（as * 保持变量全局可用）
        additionalData: `@use "@/assets/styles/variables.scss" as *;`,
      },
    },
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
  // eslint开启
  lintOnSave: !isProduction,
  // 开发配置
  devServer: {
    port: 8001,
    // 本地开发代理：浏览器同源请求 /sys/** → 后端 /sys/sys/**
    // 后端 context-path 为 /sys，Controller 内部路径又带 /sys 前缀，实际是双前缀
    proxy: {
      "/sys": {
        target: "http://localhost:8081",
        changeOrigin: true,
        pathRewrite: { "^/sys": "/sys/sys" },
      },
    },
    client: {
      overlay: {
        // 编译错误仍全屏提示；警告与运行时错误（如后端未启动时的
        // 请求 Network Error）不弹 overlay，仅保留控制台输出
        errors: true,
        warnings: false,
        runtimeErrors: false,
      },
    },
  }
};
