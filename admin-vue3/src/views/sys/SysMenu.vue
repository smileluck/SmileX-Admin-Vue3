<template>
  <div class="table-card">
    <div class="table-search">
      <el-form :inline="true" :model="pageSearchFormModel" ref="pageSearchForm">
        <el-row :gutter="10">
          <el-col :span="4">
            <el-form-item label="ID：">
              <el-input
                v-model.trim="pageSearchFormModel.id"
                placeholder="请输入ID"
              /> </el-form-item
          ></el-col>
          <el-col :span="4">
            <el-form-item label="父ID,最上级则为0：">
              <el-input
                v-model.trim="pageSearchFormModel.parentId"
                placeholder="请输入父ID,最上级则为0"
              /> </el-form-item
          ></el-col>
          <el-col :span="4">
            <el-form-item label="菜单名称：">
              <el-input
                v-model.trim="pageSearchFormModel.menuName"
                placeholder="请输入菜单名称"
              /> </el-form-item
          ></el-col>
          <el-col :span="4">
            <el-form-item label="菜单icon：">
              <el-input
                v-model.trim="pageSearchFormModel.menuIcon"
                placeholder="请输入菜单icon"
              /> </el-form-item
          ></el-col>
          <el-col :span="4">
            <el-form-item label="路由地址：">
              <el-input
                v-model.trim="pageSearchFormModel.routeUrl"
                placeholder="请输入路由地址"
              /> </el-form-item
          ></el-col>
          <el-col :span="4">
            <el-form-item label="路由视图：">
              <el-input
                v-model.trim="pageSearchFormModel.routeView"
                placeholder="请输入路由视图"
              /> </el-form-item
          ></el-col>
          <el-col :span="4">
            <el-form-item label="菜单类型(0:菜单组; 1:子菜单; 2:按钮权限)：">
              <el-input
                v-model.trim="pageSearchFormModel.menuType"
                placeholder="请输入菜单类型(0:菜单组; 1:子菜单; 2:按钮权限)"
              /> </el-form-item
          ></el-col>
          <el-col :span="4">
            <el-form-item label="权限标识：">
              <el-input
                v-model.trim="pageSearchFormModel.perm"
                placeholder="请输入权限标识"
              /> </el-form-item
          ></el-col>
          <el-col :span="4">
            <el-form-item label="排序：">
              <el-input
                v-model.trim="pageSearchFormModel.orderNum"
                placeholder="请输入排序"
              /> </el-form-item
          ></el-col>
          <el-col :span="4">
            <el-form-item label="是否启用，0禁用1启用：">
              <el-input
                v-model.trim="pageSearchFormModel.enableFlag"
                placeholder="请输入是否启用，0禁用1启用"
              /> </el-form-item
          ></el-col>
          <el-col :span="4">
            <el-button type="primary" @click="pageList()">
              <el-icon class="el-icon"><search /></el-icon>
              <span>搜索</span></el-button
            >
            <el-button type="primary" @click="pageSearchReset()">
              <el-icon class="el-icon"><refresh-right /></el-icon>
              <span>重置</span></el-button
            >
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="table-operate">
      <el-row :gutter="20">
        <el-col :span="1">
          <el-button type="primary" @click="pageOperaAdd()">新增</el-button>
        </el-col>
        <el-col :span="1" v-show="pageSelectColumn.length > 0">
          <el-button type="danger" @click="pageOperaRemove()"
            >批量删除</el-button
          >
        </el-col>
      </el-row>
    </div>
    <div class="table-selection" v-show="pageSelectColumn.length > 0">
      <span class="selection-span"
        >已选择 <a>{{ pageSelectColumn.length }}</a> 项
      </span>
      <span class="selection-operate">
        <a @click="pageSelectClear()">清空</a>
      </span>
    </div>
    <el-table
      ref="pageTable"
      v-loading="pageLoading"
      element-loading-text="Loading..."
      :data="pageTableData"
      row-key="id"
      style="width: 100%"
      @selection-change="pageSelectChange"
    >
      <el-table-column type="selection" width="50" />
      <!-- <el-table-column prop="id" label="ID" width="210" /> -->
      <!-- <el-table-column prop="parentId" label="父ID,最上级则为0" width="200" /> -->
      <el-table-column prop="menuName" label="菜单名称" width="200" />
      <el-table-column prop="menuIcon" label="菜单icon" width="200" />
      <el-table-column prop="routeUrl" label="路由地址" width="200" />
      <el-table-column prop="routeView" label="路由视图" width="200" />
      <el-table-column
        prop="menuType"
        label="菜单类型(0:菜单组; 1:子菜单; 2:按钮权限)"
        width="200"
      />
      <el-table-column prop="perm" label="权限标识" width="200" />
      <el-table-column prop="orderNum" label="排序" width="200" />
      <el-table-column
        prop="enableFlag"
        label="是否启用，0禁用1启用"
        width="200"
      />
      <el-table-column fixed="right" label="Operations" width="120">
        <template v-slot:default="scope">
          <el-button type="primary" link @click="pageOperaAdd(scope.row.id)"
            >修改</el-button
          >
          <el-popconfirm
            :title="'是否确认删除id=[' + scope.row.id + ']?'"
            @confirm="pageOperaRemove(scope.row.id)"
            s
          >
            <template #reference>
              <el-button type="danger" link>删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination
      class="table-card-pagination"
      :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagePaginationInfo.total"
      :currentPage="pagePaginationInfo.current"
      :page-size="pagePaginationInfo.size"
      @size-change="pagePaginationSizeChange"
      @current-change="pagePaginationCurrentChange"
    >
    </el-pagination> -->
    <sys-menu-model ref="pageOperaModel" @refresh="pageList"></sys-menu-model>
  </div>
</template>

<script setup>
import { Search, RefreshRight } from "@element-plus/icons-vue";
import { reactive } from "vue";
import SysMenuModel from "./modules/SysMenuModel.vue";
import usePages from "@/composables/pages";

const pageSearchFormModel = reactive({
  id: "",
  parentId: "",
  menuName: "",
  menuIcon: "",
  routeUrl: "",
  routeView: "",
  menuType: "",
  perm: "",
  orderNum: "",
  enableFlag: "",
});

const reqPrefix = "/sys/menu";

const {
  // 组件引用
  pageLoading,
  pageOperaModel,
  pageTable,
  pageSelectColumn,

  pageList,
  pageTableData,
  pageSelectChange,
  pageSelectClear,

  pageOperaAdd,
  pageOperaRemove,

  pageSearchForm,
  pageSearchReset,
} = usePages(pageSearchFormModel, reqPrefix, () => {
  pageTableData.value = dynamicRouterMenusTree(pageTableData.value, 0);
});
pageList();

// 数组递归转换数结构
const dynamicRouterMenusTree = (list, pid) => {
  const arr = [];
  list.forEach((item) => {
    if (item.parentId == pid) {
      const children = dynamicRouterMenusTree(list, item.id);
      if (children.length != 0) {
        item.children = children;
      }
      arr.push(item);
    }
  });
  return arr;
};
</script>
