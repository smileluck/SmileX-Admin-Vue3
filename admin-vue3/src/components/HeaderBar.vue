<template>
  <div class="header">
    <div class="left-wrapper">
      <el-icon
        @click="changeExpand"
        :style="{ transform: expandAside ? 'rotateZ(180deg)' : 'rotateZ(0)' }"
        class="expand-btn"
        :size="30"
      >
        <!-- v-if="expandAside" -->
        <fold />
        <!-- <expand v-else /> -->
      </el-icon>
      <span>欢迎使用 SmileX-Admin 管理平台</span>
    </div>
    <div class="user-wrapper">
      <div class="user-box">
        <el-avatar :size="30" :src="circleUrl"></el-avatar>
        <span>Admin</span>
      </div>
      <div class="user-box" style="cursor: pointer" @click="loginOut">
        <el-icon :size="30"><switch-button /></el-icon>
        <span>退出登录</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import { SwitchButton, Fold } from "@element-plus/icons-vue";
import { useUserStore } from "@/store/modules/user";
import { useCommonStore } from "@/store/modules/common";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();
const commonStore = useCommonStore();
const expandAside = ref(commonStore.getExpandAside);

const changeExpand = () => {
  expandAside.value = !expandAside.value;
  commonStore.setExpandAside(expandAside.value);
  console.log("changeExpand", expandAside.value);
};

const loginOut = () => {
  userStore.loginOut();
  router.push({
    path: "/login",
  });
};
</script>

<style lang="scss" scoped>
.header {
  //   width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 10px;
  .left-wrapper {
    display: flex;
    align-items: center;
    color: #fff;
    > span {
      margin-left: 10px;
    }
  }
  .user-wrapper {
    display: flex;
  }
  .user-box {
    margin: 0 10px;
    display: flex;
    align-items: center;
    > span {
      margin-left: 10px;
    }
    color: #fff;
  }
  .expand-btn {
    cursor: pointer;
    transition: all 0.3s;
  }
}
</style>
