<template>
  <div class="table-card">
    <div class="table-search">
      <el-form :inline="true" :model="pageSearchFormModel" ref="pageSearchForm">
        <el-row :gutter="10">
          <el-col :span="4">
            <el-form-item label="表名：">
              <el-input
                v-model.trim="pageSearchFormModel.tableName"
                placeholder="请输入表名"
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
      style="width: 100%"
      @selection-change="pageSelectChange"
    >
      <el-table-column type="selection" width="50" />
      <el-table-column prop="tableName" label="表名" width="200" />
      <el-table-column prop="engine" label="引擎" width="200" />
      <el-table-column prop="tableComment" label="表注释" />
      <el-table-column prop="createTime" label="创建时间" width="200" />
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default>
          <el-button type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <menu-model ref="pageOperaModel" @refresh="pageList"></menu-model>
  </div>
</template>

<script setup>
import { Search, RefreshRight } from "@element-plus/icons-vue";
import { reactive } from "vue";
import MenuModel from "./modules/MenuModel.vue";
import usePages from "@/composables/pages";

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
} = usePages(pageSearchFormModel);

const pageSearchFormModel = reactive({
  tableName: "",
  tableCommene: "",
});

pageList();
</script>
