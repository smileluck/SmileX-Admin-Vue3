<template>
  <el-sub-menu v-if="menu.menuType == 0" :index="menu.routeUrl">
    <template #title>{{ menu.menuName }}</template>
    <aside-bar-sub-menu
      v-for="(item, index) in menus.children"
      :key="item.id"
      :menu="item"
      :index="index"
    >
      <span>{{ item.menuName }}</span>
    </aside-bar-sub-menu>
  </el-sub-menu>
  <el-menu-item v-else-if="menu.menuType == 1" :index="menu.routeUrl">
    <span>{{ menu.menuName }}</span>
  </el-menu-item>
</template>

<script setup>
import { defineProps } from "vue";
import AsideBarSubMenu from "./AsideBar-sub-menu.vue";

defineProps({
  menu: Object,
});
</script>

<style lang="sass" scoped>
</style>