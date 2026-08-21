<template>
  <div class="home">
    <!-- 欢迎横幅 -->
    <el-card shadow="never" class="welcome-card">
      <div class="welcome-banner">
        <div class="welcome-glow"></div>
        <div class="welcome-info">
          <el-tag effect="dark" round class="date-tag" size="small">
            {{ dateText }}
          </el-tag>
          <h2 class="welcome-title">{{ greeting }}，Admin</h2>
          <p class="welcome-sub">欢迎回到 SmileX-Admin，今天也请多多指教。</p>
        </div>
        <el-avatar :size="72" shape="square" class="welcome-logo">
          <img src="../assets/logo.svg" alt="logo" />
        </el-avatar>
      </div>
    </el-card>

    <!-- 统计卡片 -->
    <el-row :gutter="16" class="stat-row">
      <el-col
        v-for="item in stats"
        :key="item.title"
        :xs="12"
        :sm="12"
        :md="6"
      >
        <el-card shadow="hover" class="stat-card" @click="router.push(item.path)">
          <div class="stat-body">
            <el-avatar :size="52" shape="square" :style="{ background: item.bg }" class="stat-icon">
              <el-icon :size="24" :color="item.color"><component :is="item.icon" /></el-icon>
            </el-avatar>
            <el-statistic :value="item.value">
              <template #title>
                <span class="stat-title">{{ item.title }}</span>
              </template>
            </el-statistic>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 快捷入口 -->
    <el-card shadow="never" class="shortcut-card">
      <template #header>
        <div class="card-header">
          <span>快捷入口</span>
          <el-link type="primary" :underline="false" @click="router.push('/codeGen')">
            代码生成器 <el-icon><arrow-right /></el-icon>
          </el-link>
        </div>
      </template>
      <el-row :gutter="16">
        <el-col
          v-for="item in shortcuts"
          :key="item.title"
          :xs="8"
          :sm="6"
          :md="3"
        >
          <div class="shortcut-item" @click="router.push(item.path)">
            <el-avatar :size="46" shape="square" :style="{ background: item.bg }">
              <el-icon :size="22" :color="item.color"><component :is="item.icon" /></el-icon>
            </el-avatar>
            <span class="shortcut-title">{{ item.title }}</span>
          </div>
        </el-col>
      </el-row>

      <el-divider />

      <!-- 系统信息 -->
      <el-descriptions :column="3" size="small" border>
        <el-descriptions-item label="系统名称">SmileX-Admin</el-descriptions-item>
        <el-descriptions-item label="前端框架">Vue 3 + Element Plus</el-descriptions-item>
        <el-descriptions-item label="后端框架">Spring Boot</el-descriptions-item>
        <el-descriptions-item label="当前用户">Admin</el-descriptions-item>
        <el-descriptions-item label="当前角色">超级管理员</el-descriptions-item>
        <el-descriptions-item label="运行环境">
          <el-tag size="small" type="success">正常</el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import {
  User,
  Document,
  Tickets,
  Menu,
  Setting,
  Cpu,
  Monitor,
  ArrowRight,
} from "@element-plus/icons-vue";

const router = useRouter();

const greeting = computed(() => {
  const hour = new Date().getHours();
  if (hour < 6) return "夜深了";
  if (hour < 12) return "早上好";
  if (hour < 14) return "中午好";
  if (hour < 18) return "下午好";
  return "晚上好";
});

const dateText = new Date().toLocaleDateString("zh-CN", {
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "long",
});

// 静态占位数据，后续可替换为真实接口
const stats = [
  { title: "用户总数", value: 128, path: "/sys/user", icon: User, color: "#2f6bff", bg: "rgba(47,107,255,0.1)" },
  { title: "文章总数", value: 36, path: "/blog/article", icon: Document, color: "#00b578", bg: "rgba(0,181,120,0.1)" },
  { title: "今日访问", value: 1024, path: "/home", icon: Monitor, color: "#ff8f1f", bg: "rgba(255,143,31,0.1)" },
  { title: "系统日志", value: 3256, path: "/sys/log", icon: Tickets, color: "#635bff", bg: "rgba(99,91,255,0.1)" },
];

const shortcuts = [
  { title: "用户管理", path: "/sys/user", icon: User, color: "#2f6bff", bg: "rgba(47,107,255,0.1)" },
  { title: "角色管理", path: "/sys/role", icon: "User", color: "#00b578", bg: "rgba(0,181,120,0.1)" },
  { title: "菜单管理", path: "/sys/menu", icon: Menu, color: "#ff8f1f", bg: "rgba(255,143,31,0.1)" },
  { title: "部门管理", path: "/sys/dept", icon: "Setting", color: "#635bff", bg: "rgba(99,91,255,0.1)" },
  { title: "系统配置", path: "/sys/config", icon: "Setting", color: "#e0407d", bg: "rgba(224,64,125,0.1)" },
  { title: "系统日志", path: "/sys/log", icon: "Tickets", color: "#00b578", bg: "rgba(0,181,120,0.1)" },
  { title: "代码生成", path: "/codeGen", icon: Cpu, color: "#2f6bff", bg: "rgba(47,107,255,0.1)" },
  { title: "数据字典", path: "/sys/dict", icon: "Menu", color: "#ff8f1f", bg: "rgba(255,143,31,0.1)" },
];
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

// ==================== 欢迎横幅 ====================
.welcome-card {
  border: none;
  border-radius: 12px;
  overflow: hidden;

  :deep(.el-card__body) {
    padding: 0;
  }
}

.welcome-banner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 28px 32px;
  color: #fff;
  background: linear-gradient(120deg, #0a1f4d 0%, #1a3a8f 55%, #2f6bff 120%);
  overflow: hidden;

  .welcome-glow {
    position: absolute;
    width: 300px;
    height: 300px;
    right: 60px;
    top: -150px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(92, 140, 255, 0.45) 0%, transparent 70%);
    pointer-events: none;
  }
}

.welcome-info {
  position: relative;
}

.date-tag {
  margin-bottom: 12px;
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(4px);
}

.welcome-title {
  margin: 0 0 8px;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 1px;
}

.welcome-sub {
  margin: 0;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.75);
}

.welcome-logo {
  position: relative;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  backdrop-filter: blur(4px);
}

// ==================== 统计卡片 ====================
.stat-row {
  margin: 0 !important;
}

.stat-card {
  border: 1px solid #f0f2f5;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.25s;

  &:hover {
    transform: translateY(-3px);
    border-color: var(--el-color-primary-light-7);
  }

  :deep(.el-card__body) {
    padding: 20px;
  }
}

.stat-body {
  display: flex;
  align-items: center;
  gap: 16px;
}

.stat-icon {
  border-radius: 12px;
  flex-shrink: 0;
}

.stat-title {
  font-size: 13px;
  color: #8a94a6;
}

// ==================== 快捷入口 ====================
.shortcut-card {
  border: 1px solid #f0f2f5;
  border-radius: 12px;

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 15px;
    font-weight: 600;
    color: #1f2937;

    .el-link .el-icon {
      margin-left: 2px;
    }
  }

  :deep(.el-card__header) {
    padding: 16px 20px;
  }
}

.shortcut-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 16px 8px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.25s;

  &:hover {
    background: #f6f9ff;
    transform: translateY(-2px);
  }

  .el-avatar {
    border-radius: 12px;
  }
}

.shortcut-title {
  font-size: 13px;
  color: #4b5563;
}
</style>
