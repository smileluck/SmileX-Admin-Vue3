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
      <el-form-item label="租户名称" prop="tenantName">
        <el-input
          v-model.trim="form.info.tenantName"
          placeholder="请输入租户名称"
        />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model.trim="form.info.password" placeholder="请输入密码" />
      </el-form-item>
      <el-form-item label="salt" prop="salt">
        <el-input v-model.trim="form.info.salt" placeholder="请输入salt" />
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
    tenantName: "",
    password: "",
    salt: "",
  },
});

const rules = reactive({
  tenantName: [{ required: true, message: "请选择租户名称", trigger: "blur" }],
  password: [{ required: true, message: "请选择密码", trigger: "blur" }],
  salt: [{ required: true, message: "请选择salt", trigger: "blur" }],
});

const getInfo = () => {
  getAction(`/sys/tenant/info/${form.info.id}`, {}).then((res) => {
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
      postAction(`/sys/tenant/${form.info.id != null ? "update" : "save"}`, {
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
