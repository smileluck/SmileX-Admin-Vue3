<template>
  <el-dialog
    v-model="dialogVisible"
    :title="'上传文件'"
    width="50%"
    :before-close="cancelForm"
  >
    <!-- <el-form
      :model="form.info"
      label-width="120px"
      :rules="rules"
      ref="formRef"
    >
      <el-form-item label="模块，alioss,minio" prop="modules">
        <el-input
          v-model.trim="form.info.modules"
          placeholder="请输入模块，alioss,minio"
        />
      </el-form-item>
      <el-form-item label="网络地址" prop="netPath">
        <el-input
          v-model.trim="form.info.netPath"
          placeholder="请输入网络地址"
        />
      </el-form-item>
      <el-form-item label="文件地址" prop="filePath">
        <el-input
          v-model.trim="form.info.filePath"
          placeholder="请输入文件地址"
        />
      </el-form-item>
      <el-form-item label="文件大小" prop="fileSize">
        <el-input
          v-model.trim="form.info.fileSize"
          placeholder="请输入文件大小"
        />
      </el-form-item>
      <el-form-item label="文件后缀" prop="fileSuffix">
        <el-input
          v-model.trim="form.info.fileSuffix"
          placeholder="请输入文件后缀"
        />
      </el-form-item>
    </el-form> -->
    <el-upload
      v-model="fileList"
      action="http://127.0.0.1:7081/smilex/sys/demo/file/simple"
      with-credentials
      :headers="headers"
      name="file"
      multiple
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :before-upload="handleBeforeUpload"
    >
      <el-button type="primary">Click to upload</el-button>
      <template #tip>
        <div class="el-upload__tip">
          jpg/png files with a size less than 500KB.
        </div>
      </template>
    </el-upload>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelForm()">取消</el-button>
        <el-button type="primary" @click="cancelForm()">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, defineExpose } from "vue";
import { useUserStore } from "@/store/modules/user";
import { ElNotification } from "element-plus";
const userStore = useUserStore();

const headers = ref({
  "X-Access-Token": userStore.getToken,
});

const dialogVisible = ref(false);
const fileList = ref();

const handleRemove = (file, uploadFiles) => {
  console.log(file, uploadFiles);
};

const handlePreview = (uploadFile) => {
  console.log(uploadFile);
};

const handleSuccess = (res, file, fileList) => {
  console.log(res, file, fileList);
};

const handleBeforeUpload = (file) => {
  console.log("before", file);
  if (file.size / 1024 / 1024 > 0.01) {
    ElNotification.error({
      title: "系统提示",
      message: "单张图片大小不能超过10MB",
    });
    return false;
  }
  return true;
};
const cancelForm = () => {
  dialogVisible.value = false;
};

const initModel = () => {
  dialogVisible.value = true;
};
defineExpose({ initModel });
</script>
