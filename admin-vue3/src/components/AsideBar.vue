<template>
  <div class="base-aside">
    <div class="base-aside-logo">SmileX-Admin</div>
    <div class="base-aside-menu">
      <el-menu
        default-active="1"
        class="menu"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-sub-menu index="1">
          <template #title>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group title="Group One">
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item one</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title>item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
      </el-menu>
    </div>
  </div>
</template>

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
