<template>
  <div class="base-aside">
    <div class="base-aside-logo">
      <div class="logo-glow"></div>
      <span class="logo-text">SmileX-Admin</span>
    </div>
    <div class="base-aside-menu">
      <el-menu :default-active="activeNum" class="menu" unique-opened router ref="menuRef">
        <el-menu-item index="/home">
          <span>首页</span>
        </el-menu-item>
        <el-menu-item index="/codeGen">
          <span>代码生成器</span>
        </el-menu-item>
        <aside-bar-sub-menu
          v-for="item in menus"
          :key="item.id"
          :menu="item"
        >
        </aside-bar-sub-menu>
      </el-menu>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import AsideBarSubMenu from "./AsideBar-sub-menu.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/modules/user";

const router = useRouter();
const userStore = useUserStore();

const activeNum = ref("/home");
const menuRef = ref();

const menus = userStore.getShowMenus;
activeNum.value = router.currentRoute.value.path;
</script>

<style lang="scss" scoped>
.base-aside {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: $S-Aside-Bg;

  &-logo {
    position: relative;
    flex: 0 0 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: linear-gradient(
      135deg,
      $S-Brand-Dark-5 0%,
      $S-Brand-Dark-4 50%,
      $S-Color-Primary 130%
    );
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);

    // 科技感光斑
    .logo-glow {
      position: absolute;
      width: 120px;
      height: 120px;
      right: -40px;
      top: -60px;
      background: radial-gradient(
        circle,
        rgba($S-Color-Primary, 0.4) 0%,
        transparent 70%
      );
      pointer-events: none;
    }

    .logo-text {
      position: relative;
      font-size: 17px;
      font-weight: 700;
      letter-spacing: 2px;
      color: #fff;
      text-shadow: 0 0 14px rgba($S-Color-Primary, 0.55);
      white-space: nowrap;
    }
  }

  &-menu {
    height: 100%;
    background-color: $S-Aside-Bg;
    overflow-y: auto;
    overflow-x: hidden;

    .menu {
      height: 100%;
      border-right: none;
      padding: 8px;
      background-color: transparent;
      // el-menu 主题色统一走变量，不再用字符串属性硬编码
      --el-menu-bg-color: transparent;
      --el-menu-text-color: rgba(255, 255, 255, 0.65);
      --el-menu-active-color: #ffffff;
      --el-menu-hover-bg-color: transparent;

      // 菜单项统一圆角胶囊
      :deep(.el-menu-item),
      :deep(.el-sub-menu__title) {
        height: 44px;
        line-height: 44px;
        border-radius: 8px;
        margin-bottom: 2px;
        transition: all 0.25s;

        &:hover {
          background-color: rgba(255, 255, 255, 0.06) !important;
          color: #fff !important;
        }
      }

      :deep(.el-menu-item.is-active) {
        background: linear-gradient(
          90deg,
          rgba($S-Color-Primary, 0.9) 0%,
          rgba($S-Color-Primary, 0.55) 100%
        ) !important;
        box-shadow: 0 2px 8px rgba($S-Color-Primary, 0.35);

        // 左侧指示条
        &::before {
          content: "";
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 18px;
          border-radius: 2px;
          background: #fff;
        }
      }

      // 子菜单展开区域
      :deep(.el-menu .el-menu-item) {
        background-color: $S-Aside-Bg-Dark !important;

        &:hover {
          background-color: rgba(255, 255, 255, 0.06) !important;
        }

        &.is-active {
          background: linear-gradient(
            90deg,
            rgba($S-Color-Primary, 0.85) 0%,
            rgba($S-Color-Primary, 0.5) 100%
          ) !important;
        }
      }
    }
  }
}
</style>
