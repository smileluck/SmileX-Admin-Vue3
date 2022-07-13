<template>
  <el-dialog
    v-model="dialogVisible"
    :title="`${form.info.id != null ? '修改' : '新增'}`"
    width="50%"
    :before-close="cancelForm"
  >
    <el-form
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
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelForm()">取消</el-button>
        <el-button type="primary" @click="submitForm()">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, unref, reactive, toRaw, defineExpose, defineEmits } from "vue";
import { postAction, getAction } from "@/api/manage";

const emit = defineEmits(["refresh"]);

const dialogVisible = ref(false);
const formRef = ref();

const form = reactive({
  info: {
    id: null,
    modules: "",
    netPath: "",
    filePath: "",
    fileSize: "",
    fileSuffix: "",
  },
});

const rules = reactive({
  modules: [
    { required: true, message: "请选择模块，alioss,minio", trigger: "blur" },
  ],
  netPath: [{ required: true, message: "请选择网络地址", trigger: "blur" }],
  filePath: [{ required: true, message: "请选择文件地址", trigger: "blur" }],
  fileSize: [{ required: true, message: "请选择文件大小", trigger: "blur" }],
  fileSuffix: [{ required: true, message: "请选择文件后缀", trigger: "blur" }],
});

const getInfo = () => {
  getAction(`/sys/file/info/${form.info.id}`, {}).then((res) => {
    if (res.success) {
      form.info = { ...res.data };
    }
  });
};

const cancelForm = () => {
  formRef.value.resetFields();
  dialogVisible.value = false;
  form.info = {};
};

const submitForm = () => {
  // if (!formEl) return;
  const formEl = unref(formRef);
  if (!formEl) {
    return;
  }
  formEl.validate((valid, fields) => {
    if (valid) {
      postAction(`/sys/file/${form.info.id != null ? "update" : "save"}`, {
        ...toRaw(form.info),
      }).then((res) => {
        if (res.success) {
          emit("refresh");
          cancelForm();
        }
      });
    } else {
      console.log("error submit!", fields);
    }
  });
};

const initModel = (id) => {
  dialogVisible.value = true;
  if (id != null) {
    form.info.id = id;
    getInfo();
  }
};
defineExpose({ initModel });
</script>
