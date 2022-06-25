<template>
  <div class="table-card">
    <div class="table-search">
      <el-form :inline="true" :model="searchFormModel" ref="searchForm">
        <el-row :gutter="10">
          <el-col :span="4">
            <el-form-item label="表名：">
              <el-input
                v-model.trim="searchFormModel.tableName"
                placeholder="请输入表名"
              /> </el-form-item
          ></el-col>
          <el-col :span="4">
            <el-button type="primary" @click="list()">
              <el-icon class="el-icon"><search /></el-icon>
              <span>搜索</span></el-button
            >
            <el-button type="primary" @click="resetSearch()">
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
          <el-button type="primary" @click="addHandler()">新增</el-button>
        </el-col>
        <el-col :span="1" v-show="selectColumn.length > 0">
          <el-button type="danger" @click="removeHandler()">批量删除</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="table-selection" v-show="selectColumn.length > 0">
      <span class="selection-span"
        >已选择 <a>{{ selectColumn.length }}</a> 项
      </span>
      <span class="selection-operate">
        <a @click="handleSelectionClear()">清空</a>
      </span>
    </div>
    <el-table
      ref="table"
      v-loading="loading"
      element-loading-text="Loading..."
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
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
    <menu-model ref="menuModel" @refresh="list"></menu-model>
  </div>
</template>

<script setup>
import { Search, RefreshRight } from "@element-plus/icons-vue";
import { ref, reactive, toRaw, unref } from "vue";
import { getAction } from "@/api/manage";
import MenuModel from "./modules/MenuModel.vue";
import { ElNotification } from "element-plus";

let tableData = ref([]);
const loading = ref(false);
const table = ref();
const configModel = ref();
const searchForm = ref();

const selectColumn = ref([]);

const searchFormModel = reactive({
  tableName: "",
  tableCommene: "",
});

const handleSelectionChange = (val) => {
  console.log(val);
  selectColumn.value = val;
};

const handleSelectionClear = () => {
  table.value.clearSelection();
};

const list = () => {
  loading.value = true;
  getAction("/sys/menu/list", toRaw(searchFormModel))
    .then((res) => {
      if (res.success) {
        tableData.value = res.data;
      } else {
        tableData.value = [];
        ElNotification({
          title: "系统提示",
          message: res.msg,
          type: "error",
        });
      }
    })
    .finally(() => {
      loading.value = false;
    });
};
const addHandler = () => {
  unref(configModel).initModel();
};
const removeHandler = () => {};

const resetSearch = () => {
  unref(searchForm).resetFields();
  list();
};
</script>
