<template>
  <el-sub-menu>
    <el-menu-item-group title="Group Two">
      <el-menu-item index="1" @click="pushPath('/menu')">
        <span>菜单管理</span>
      </el-menu-item>
    </el-menu-item-group>
    <el-sub-menu index="1-4">
      <template #title>item four</template>
      <el-menu-item index="1-4-1">item one</el-menu-item>
    </el-sub-menu>
  </el-sub-menu>
</template>

<script setup>
const props = withDefaults(
  defineProps({
    menus: Array,
  }),
  {
    menus: [],
  }
);
</script>

<style lang="sass" scoped>
</style>