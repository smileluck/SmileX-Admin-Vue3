<template>
  <div class="base-aside">
    <div class="base-aside-logo">SmileX-Admin</div>
    <div class="base-aside-menu">
      <el-menu default-active="999" class="menu">
        <el-menu-item index="999" @click="pushPath('/home')">
          <span>首页</span>
        </el-menu-item>
        <el-menu-item index="2" @click="pushPath('/codeGen')">
          <span>代码生成器</span>
        </el-menu-item>
        <!-- <el-sub-menu index="1-4">
          <template #title>item four</template>
          <el-sub-menu index="1-6">
            <template #title>item 1</template>
            <el-menu-item index="2" @click="pushPath('/codeGen')">
              <span>1111</span>
            </el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="1-99">
            <template #title>item 1</template>
            <el-menu-item index="2" @click="pushPath('/codeGen')">
              <span>1111</span>
            </el-menu-item>
          </el-sub-menu>
        </el-sub-menu> -->
        <sub-menu
          v-for="(item, index) in menus"
          :menu="itme"
          :key="index"
        ></sub-menu>
      </el-menu>
    </div>
  </div>
</template>

<script setup>
import SubMenu from "./AsideBar-sub-menu.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/modules/user";

const router = useRouter();
const userStore = useUserStore();

const menus = userStore.getMenus;

const pushPath = (path) => {
  console.log(router);
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
