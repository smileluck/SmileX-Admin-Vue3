<template>
  <el-sub-menu v-if="menu.menuType == 0" :index="menu.id">
    <template #title>{{ menu.menuName }}</template>
    <sub-menu v-for="item in menus.children" :key="item.id" :index="item.id">
      <span>{{ item.menuName }}</span>
    </sub-menu>
  </el-sub-menu>
  <el-menu-item v-else-if="menu.menuType == 1" :index="menu.id">
    <span>{{ menu.menuName }}</span>
  </el-menu-item>
</template>

<script setup>
import { defineProps } from "vue";

import SubMenu from "./AsideBar-sub-menu.vue";

const props = defineProps({
  menu: Object,
});

console.log(props);
</script>

<style lang="sass" scoped>
</style>