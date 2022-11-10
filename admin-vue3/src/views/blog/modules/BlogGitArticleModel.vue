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
      <el-form-item label="博客文章ID" prop="blogArticleId">
        <el-input
          v-model.trim="form.info.blogArticleId"
          placeholder="请输入博客文章ID"
        />
      </el-form-item>
      <el-form-item label="内容URL" prop="contentUrl">
        <el-input
          v-model.trim="form.info.contentUrl"
          placeholder="请输入内容URL"
        />
      </el-form-item>
      <el-form-item label="是否更新" prop="updateFlag">
        <dict-select
          dictCode="commonYN"
          v-model="form.info.updateFlag"
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
    blogArticleId: "",
    contentUrl: "",
    updateFlag: "0",
  },
  rules: {
    blogArticleId: [
      { required: true, message: "请输入博客文章ID", trigger: "blur" },
    ],
    contentUrl: [{ required: true, message: "请输入内容URL", trigger: "blur" }],
    updateFlag: [
      { required: true, message: "请选择更新状态", trigger: "blur" },
    ],
  },
});

const getInfo = () => {
  getAction(`/blog/git/article/info/${form.info.id}`, {}).then((res) => {
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
        `/blog/git/article/${form.info.id != null ? "update" : "save"}`,
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
