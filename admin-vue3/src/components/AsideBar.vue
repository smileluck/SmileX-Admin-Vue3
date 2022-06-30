<template>
  <div class="base-aside">
    <div class="base-aside-logo">SmileX-Admin</div>
    <div class="base-aside-menu">
      <el-menu
        :default-active="activeNum"
        class="menu"
        unique-opened
        router
        ref="menuRef"
      >
        <el-menu-item index="/home">
          <span>首页</span>
        </el-menu-item>
        <el-menu-item index="/codeGen">
          <span>代码生成器</span>
        </el-menu-item>
        <el-sub-menu
          v-for="item in menus"
          :key="item.id"
          :index="item.routeUrl"
        >
          <template #title>{{ item.menuName }}</template>
          <aside-bar-sub-menu
            v-for="(item2, index2) in item.children"
            :menu="item2"
            :key="index2"
          ></aside-bar-sub-menu>
        </el-sub-menu>
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
  &-logo {
    flex: 0 0 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    color: #fff;
    background-color: #1890ff;
  }
  &-menu {
    height: 100%;
    background-color: #fff;
    // border-right: 1px solid #d1d1d1;
    .menu {
      height: 100%;
    }
  }
}
</style>
