<template>
  <section class="layout">
    <aside class="layout-aside">
      <aside-bar></aside-bar>
    </aside>
    <section class="layout layout_vertical">
      <header class="layout-header">
        <header-bar></header-bar>
      </header>
      <main class="layout-main">
        <scroll-bar-nav></scroll-bar-nav>
        <el-card class="box-card">
          <router-view />
        </el-card>
      </main>
    </section>
  </section>
</template>

<script setup>
import ScrollBarNav from "@/components/ScrollBarNav.vue";
import AsideBar from "@/components/AsideBar.vue";
import HeaderBar from "@/components/HeaderBar.vue";
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
    width: 200px;
    height: 100%;
    flex: 0 0 200px;
    max-width: 200px;
    min-width: 200px;
    width: 200px;
  }
  &-header {
    flex: 0 0 60px;
    height: 60px;
    width: 100%;
    background-color: #1890ff;
  }
  &-main {
    background: #f6f6f6;
    width: 100%;
    height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
  }
}
.layout_vertical {
  flex-direction: column;
  flex: auto;
}
.box-card {
  margin: 10px;
  height: 100%;
  overflow-y: auto;
}
</style>
