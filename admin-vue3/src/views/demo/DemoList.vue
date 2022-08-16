<template>
  <el-collapse v-model="activeNames">
    <el-collapse-item title="文件上传示例" name="1">
      <el-row :gutter="20">
        <el-col :span="1">
          <el-button type="primary" @click="showModel(demoFileModelRef)"
            >单文件上传</el-button
          >
        </el-col>
      </el-row>
      <demo-file-model ref="demoFileModelRef"></demo-file-model>
    </el-collapse-item>
  </el-collapse>
</template>

<script setup>
import DemoFileModel from "./modules/DemoFileModel.vue";
import { ref } from "vue";

const activeNames = ref([]);
const demoFileModelRef = ref();

const showModel = (model) => {
  model.initModel();
};
</script>
