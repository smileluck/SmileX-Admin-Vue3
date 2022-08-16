<template>
  <el-sub-menu v-if="menu.menuType == 0" :index="menu.routeUrl">
    <template #title>{{ menu.menuName }}</template>
    <!-- <template v-if="menu.children"> -->
    <aside-bar-sub-menu
      v-for="item in menu.children"
      :key="item.id"
      :menu="item"
    ></aside-bar-sub-menu>
    <!-- </template> -->
  </el-sub-menu>
  <el-menu-item v-else-if="menu.menuType == 1" :index="menu.routeUrl">
    <span>{{ menu.menuName }}</span>
  </el-menu-item>
</template>

<script setup>
import { defineProps } from "vue";
// import AsideBarSubMenu from "./AsideBar-sub-menu.vue";

defineProps({
  menu: Object,
});
</script>

<style lang="sass" scoped>
</style>