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
      :rules="form.rules"
      ref="formRef"
    >
      <el-form-item label="年份" prop="year">
        <el-date-picker
          v-model="form.info.year"
          type="year"
          placeholder="请选择年份"
          value-format="YYYY"
        />
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input
          v-model.trim="form.info.title"
          maxlength="30"
          show-word-limit
          placeholder="请输入标题"
        />
      </el-form-item>
      <el-form-item label="说明" prop="description">
        <el-input
          type="textarea"
          :rows="4"
          maxlength="300"
          show-word-limit
          v-model.trim="form.info.description"
          placeholder="请输入说明"
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
import {
  ref,
  unref,
  reactive,
  toRaw,
  defineExpose,
  defineEmits,
  nextTick,
} from "vue";
import { postAction, getAction } from "@/api/manage";

const emit = defineEmits(["refresh"]);

const dialogVisible = ref(false);
const formRef = ref();

const form = reactive({
  info: {
    id: null,
    year: "",
    title: "",
    description: "",
  },
  rules: {
    year: [{ required: true, message: "请输入年份", trigger: "change" }],
    title: [{ required: true, message: "请输入标题", trigger: "blur" }],
    description: [{ required: true, message: "请输入说明", trigger: "blur" }],
  },
});

const getInfo = () => {
  getAction(`/blog/timeline/info/${form.info.id}`, {}).then((res) => {
    if (res.success) {
      form.info = { ...res.data };
    }
  });
};

const cancelForm = () => {
  dialogVisible.value = false;
  formRef.value.resetFields();
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
      postAction(`/blog/timeline/${form.info.id != null ? "update" : "save"}`, {
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
