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
      <el-form-item label="配置名称" prop="configName">
        <el-input
          v-model.trim="form.info.configName"
          placeholder="请输入配置名称"
        />
      </el-form-item>
      <el-form-item label="配置key" prop="configKey">
        <el-input
          v-model.trim="form.info.configKey"
          placeholder="请输入配置key"
        />
      </el-form-item>
      <el-form-item label="配置类型，1text,2json" prop="configType">
        <el-input
          v-model.trim="form.info.configType"
          placeholder="请输入配置类型，1text,2json"
        />
      </el-form-item>
      <el-form-item label="配置信息" prop="configValue">
        <el-input
          v-model.trim="form.info.configValue"
          placeholder="请输入配置信息"
        />
      </el-form-item>
      <el-form-item label="状态" prop="enableFlag">
        <el-switch
          v-model="form.info.enableFlag"
          active-text="启用"
          inactive-text="禁用"
          :active-value="1"
          :inactive-value="0"
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
    configName: "",
    configKey: "",
    configType: "",
    configValue: "",
    enableFlag: "",
  },
});

const rules = reactive({
  configName: [{ required: true, message: "请选择配置名称", trigger: "blur" }],
  configKey: [{ required: true, message: "请选择配置key", trigger: "blur" }],
  configType: [
    { required: true, message: "请选择配置类型，1text,2json", trigger: "blur" },
  ],
  configValue: [{ required: true, message: "请选择配置信息", trigger: "blur" }],
  enableFlag: [
    { required: true, message: "请选择是否启用", trigger: "blur" },
  ],
});

const getInfo = () => {
  getAction(`/sys/config/info/${form.info.id}`, {}).then((res) => {
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
      postAction(`/sys/config/${form.info.id != null ? "update" : "save"}`, {
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
