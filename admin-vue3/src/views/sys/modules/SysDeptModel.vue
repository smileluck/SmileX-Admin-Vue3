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
      <el-form-item label="租户ID" prop="tenantId">
        <el-input
          v-model.trim="form.info.tenantId"
          placeholder="请输入租户ID"
        />
      </el-form-item>
      <el-form-item label="父级部门，不存在则为0" prop="parentId">
        <el-input
          v-model.trim="form.info.parentId"
          placeholder="请输入父级部门，不存在则为0"
        />
      </el-form-item>
      <el-form-item label="部门名称" prop="deptName">
        <el-input
          v-model.trim="form.info.deptName"
          placeholder="请输入部门名称"
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
    tenantId: "",
    parentId: "",
    deptName: "",
  },
});

const rules = reactive({
  tenantId: [{ required: true, message: "请选择租户ID", trigger: "blur" }],
  parentId: [
    { required: true, message: "请选择父级部门，不存在则为0", trigger: "blur" },
  ],
  deptName: [{ required: true, message: "请选择部门名称", trigger: "blur" }],
});

const getInfo = () => {
  getAction(`/sys/dept/info/${form.info.id}`, {}).then((res) => {
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
      postAction(`/sys/dept/${form.info.id != null ? "update" : "save"}`, {
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
