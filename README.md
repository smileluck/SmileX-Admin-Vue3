# admin-vue3

## 包管理器约定

- **依赖安装统一使用 pnpm**（唯一锁文件 `pnpm-lock.yaml`，已通过 `preinstall` 守卫禁止 npm/yarn/bun 安装依赖）
- **运行脚本推荐使用 bun**（速度更快），`pnpm run <script>` 等价可用

## Project setup
```
pnpm install
```

### Compiles and hot-reloads for development
```
bun run serve
```

### Compiles and minifies for production
```
bun run build
```

### Lints and fixes files
```
bun run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
