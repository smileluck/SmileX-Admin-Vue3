<template>
  <div class="table-card">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="tableName" label="表名" width="200" />
      <el-table-column prop="engine" label="引擎" width="200" />
      <el-table-column prop="tableComment" label="表注释" />
      <el-table-column prop="createTime" label="创建时间" width="200" />
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default>
          <el-button type="text">查看列</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { getAction } from "@/api/manage";
import "./modules/CodeGenModel.vue";

let tableData = reactive([]);
getAction("/generator/list", {}).then((res) => {
  tableData.value = res.data;
});
</script>

