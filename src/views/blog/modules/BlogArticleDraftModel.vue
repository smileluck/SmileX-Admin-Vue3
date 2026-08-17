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
      <el-form-item label="文章ID" prop="articleId">
        <el-input
          v-model.trim="form.info.articleId"
          placeholder="请输入文章ID"
        />
      </el-form-item>
      <el-form-item label="文章标题" prop="articleTitle">
        <el-input
          v-model.trim="form.info.articleTitle"
          placeholder="请输入文章标题"
        />
      </el-form-item>
      <el-form-item label="文章内容" prop="articleContent">
        <el-input
          v-model.trim="form.info.articleContent"
          placeholder="请输入文章内容"
        />
      </el-form-item>
      <el-form-item label="发布状态，0未发布，1已发布" prop="publishFlag">
        <el-input
          v-model.trim="form.info.publishFlag"
          placeholder="请输入发布状态，0未发布，1已发布"
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
    articleId: "",
    articleTitle: "",
    articleContent: "",
    publishFlag: "",
  },
});

const rules = reactive({
  tenantId: [{ required: true, message: "请选择租户ID", trigger: "blur" }],
  articleId: [{ required: true, message: "请选择文章ID", trigger: "blur" }],
  articleTitle: [
    { required: true, message: "请选择文章标题", trigger: "blur" },
  ],
  articleContent: [
    { required: true, message: "请选择文章内容", trigger: "blur" },
  ],
  publishFlag: [
    {
      required: true,
      message: "请选择发布状态，0未发布，1已发布",
      trigger: "blur",
    },
  ],
});

const getInfo = () => {
  getAction(`/blog/article/draft/info/${form.info.id}`, {}).then((res) => {
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
      postAction(
        `/blog/article/draft/${form.info.id != null ? "update" : "save"}`,
        {
          ...toRaw(form.info),
        }
      ).then((res) => {
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
