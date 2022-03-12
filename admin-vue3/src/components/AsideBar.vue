<template>
  <div class="base-aside">
    <div class="base-aside-logo">SmileX-Admin</div>
    <div class="base-aside-menu">
      <el-menu
        default-active="2"
        class="menu"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-sub-menu index="1">
          <template #title>
            <span>系统管理</span>
          </template>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title>item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2" @click="pushPath('/codeGen')">
          <span>代码生成器</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const pushPath = (path) => {
  debugger;
  router.push({
    path: path,
  });
};
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
