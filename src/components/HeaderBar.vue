<template>
  <div class="header">
    <div class="left-wrapper">
      <el-tooltip :content="expandAside ? '收起侧边栏' : '展开侧边栏'" placement="bottom">
        <el-icon
          @click="changeExpand"
          :style="{ transform: expandAside ? 'rotateZ(0)' : 'rotateZ(180deg)' }"
          class="expand-btn"
          :size="20"
        >
          <fold />
        </el-icon>
      </el-tooltip>
      <span class="welcome-text">欢迎使用 SmileX-Admin 管理平台</span>
    </div>
    <div class="user-wrapper">
      <el-dropdown trigger="click" @command="handleCommand">
        <div class="user-box">
          <el-avatar :size="32" :src="circleUrl"></el-avatar>
          <span class="user-name">Admin</span>
          <el-icon class="user-arrow"><arrow-down /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout">
              <el-icon><switch-button /></el-icon>退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import { SwitchButton, Fold, ArrowDown } from "@element-plus/icons-vue";
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
};

const handleCommand = (command) => {
  if (command === "logout") {
    userStore.loginOut();
    router.push({
      path: "/login",
    });
  }
};
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 20px;
  background: #fff;

  .left-wrapper {
    display: flex;
    align-items: center;
    color: #1f2937;

    .expand-btn {
      cursor: pointer;
      color: #4b5563;
      padding: 6px;
      border-radius: 8px;
      transition: all 0.25s;

      &:hover {
        color: #2f6bff;
        background: rgba(47, 107, 255, 0.08);
      }
    }

    .welcome-text {
      margin-left: 12px;
      font-size: 14px;
      color: #8a94a6;
    }
  }

  .user-wrapper {
    display: flex;
    align-items: center;
  }

  .user-box {
    display: flex;
    align-items: center;
    padding: 6px 12px;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.25s;

    &:hover {
      background: #f3f5f9;
    }

    .user-name {
      margin-left: 10px;
      font-size: 14px;
      font-weight: 500;
      color: #1f2937;
    }

    .user-arrow {
      margin-left: 4px;
      font-size: 12px;
      color: #8a94a6;
    }
  }
}
</style>
