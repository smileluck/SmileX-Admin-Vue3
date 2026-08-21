<template>
  <section class="layout">
    <aside :class="['layout-aside', expandAside ? '' : 'layout-aside-hide']">
      <aside-bar></aside-bar>
    </aside>
    <section class="layout layout_vertical">
      <header class="layout-header">
        <header-bar></header-bar>
      </header>
      <main class="layout-main">
        <div class="main-container">
          <router-view />
        </div>
      </main>
    </section>
  </section>
</template>

<script setup>
import { watch, ref } from "vue";
import AsideBar from "@/components/AsideBar.vue";
import { useCommonStore } from "@/store/modules/common";
import HeaderBar from "@/components/HeaderBar.vue";

const commonStore = useCommonStore();
const expandAside = ref(commonStore.getExpandAside);
watch(
  () => {
    return commonStore.getExpandAside;
  },
  (newVal) => {
    expandAside.value = newVal;
  }
);
</script>
<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  position: relative;
  box-sizing: border-box;
  flex: auto;
  overflow-x: hidden;
  &-aside {
    flex: 0 0 220px;
    max-width: 220px;
    min-width: 220px;
    width: 220px;
    height: 100%;
    transition: all 0.3s;
    &-hide {
      width: 0;
      flex: 0 0 0px;
      min-width: 0;
      overflow: hidden;
    }
  }
  &-header {
    flex: 0 0 60px;
    height: 60px;
    width: 100%;
    background-color: $S-Header-Bg;
    border-bottom: 1px solid $S-Border-Color-Light;
    box-shadow: 0 1px 4px rgba(15, 23, 42, 0.04);
    position: relative;
    z-index: 10;
  }
  &-main {
    background: $S-Main-Bg;
    width: 100%;
    height: 100%;
    overflow: auto;
  }
}
.layout_vertical {
  flex-direction: column;
  flex: auto;
  min-width: 0;
}
.main-container {
  margin: 16px;
  height: calc(100% - 32px);
  // 所有页面的白色内容面板
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(15, 23, 42, 0.06);
  padding: 20px;
  overflow-y: auto;

  // 内容区若使用 el-card，统一卡片观感
  :deep(.el-card) {
    border: none;
    border-radius: 10px;
    box-shadow: 0 2px 12px rgba(15, 23, 42, 0.06);
  }
}
</style>
