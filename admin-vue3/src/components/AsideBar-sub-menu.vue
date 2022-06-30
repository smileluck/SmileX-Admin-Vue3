<template>
  <el-sub-menu v-if="menu.menuType == 0" :index="menu.id">
    <template #title>{{ menu.menuName }}</template>
    <aside-bar-sub-menu
      v-for="item in menus.children"
      :key="item.id"
      :index="`'${item.id}'`"
    >
      <span>{{ item.menuName }}</span>
    </aside-bar-sub-menu>
  </el-sub-menu>
  <el-menu-item
    v-else-if="menu.menuType == 1"
    :index="`'${menu.id}'`"
    @click="pushPath(menu.routeUrl)"
  >
    <span>{{ menu.menuName }}</span>
  </el-menu-item>
</template>

<script setup>
import { defineProps } from "vue";
import AsideBarSubMenu from "./AsideBar-sub-menu.vue";
import { useRouter } from "vue-router";

const router = useRouter();

defineProps({
  menu: Object,
});

const pushPath = (path) => {
  router.push({
    path: path,
  });
};
</script>

<style lang="sass" scoped>
</style>