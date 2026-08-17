<template>
  <el-dialog
    v-model="dialogVisible"
    title="代码生成"
    width="50%"
    :before-close="handleClose"
  >
    <el-form :model="form" label-width="120px" :rules="rules" ref="formRef">
      <el-form-item label="下载方式" prop="downloadType">
        <el-radio-group
          v-model="form.downloadType"
          class="ml-4"
          @change="downloadTypeChange"
        >
          <el-radio label="1">压缩包</el-radio>
          <el-radio label="2">本地生成</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="包路径" prop="packagePath">
        <el-input v-model.trim="form.packagePath" placeholder="请输入包路径" />
      </el-form-item>
      <el-form-item label="模块名" prop="moduleName">
        <el-input v-model.trim="form.moduleName" placeholder="请输入模块名" />
      </el-form-item>
      <el-form-item
        label="保存位置"
        v-if="form.downloadType == 2"
        prop="savePath"
      >
        <el-input v-model.trim="form.savePath" placeholder="请输入保存位置" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose()">取消</el-button>
        <el-button type="primary" @click="submitForm()">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, unref, reactive, toRaw, defineExpose, defineEmits } from "vue";
import { downloadFile, postAction } from "@/api/manage";

const emit = defineEmits(["refresh"]);

const dialogVisible = ref(false);
const formRef = ref();
const selectArr = [];

const form = reactive({
  downloadType: "1",
  packagePath: "top.zsmile.modules",
  moduleName: "sys",
  savePath: "",
});

const rules = reactive({
  downloadType: [
    { required: true, message: "请选择下载方式", trigger: "blur" },
  ],
  packagePath: [
    { required: true, message: "请选择数据源类型", trigger: "blur" },
  ],
  moduleName: [{ required: true, message: "请输入地址", trigger: "blur" }],
  savePath: [{ required: true, message: "请输入保存地址", trigger: "blur" }],
});

const downloadTypeChange = (val) => {
  console.log(val);
  if (val == 1) {
    rules.savePath[0].required = false;
  } else if (val == 1) {
    rules.savePath[0].required = true;
  }
};

const submitForm = () => {
  // if (!formEl) return;
  const formEl = unref(formRef);
  if (!formEl) {
    return;
  }
  formEl.validate((valid, fields) => {
    if (valid) {
      if (form.downloadType == 1) {
        downloadFile("/generator/genFileByZip", "test.zip", {
          ...toRaw(form),
          tableName: selectArr,
        }).then(() => {
          dialogVisible.value = false;
        });
      } else {
        postAction("/generator/genFileByLocal", {
          ...toRaw(form),
          tableName: selectArr,
        }).then((res) => {
          if (res.success) {
            emit("refresh");
            dialogVisible.value = false;
          }
        });
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};

const handleClose = ()=>{
  
  formRef.value.resetFields();
  dialogVisible.value = false;
}

const initModel = (arr) => {
  dialogVisible.value = true;
  selectArr.length = 0;
  for (let i = 0; i < arr.length; i++) {
    selectArr.push(arr[i].tableName);
  }
};
defineExpose({ initModel });
</script>
