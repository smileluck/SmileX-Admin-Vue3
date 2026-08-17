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
      <el-form-item label="栏目ID" prop="sectionId">
        <el-input
          v-model.trim="form.info.sectionId"
          placeholder="请输入栏目ID"
        />
      </el-form-item>
      <el-form-item label="标签id，以,分割" prop="tagIds">
        <el-input
          v-model.trim="form.info.tagIds"
          placeholder="请输入标签id，以,分割"
        />
      </el-form-item>
      <el-form-item label="文章标题" prop="articleTitle">
        <el-input
          v-model.trim="form.info.articleTitle"
          placeholder="请输入文章标题"
        />
      </el-form-item>
      <el-form-item label="文章简介" prop="articleDigest">
        <el-input
          v-model.trim="form.info.articleDigest"
          placeholder="请输入文章简介"
        />
      </el-form-item>
      <el-form-item label="文章内容" prop="articleContent">
        <el-input
          v-model.trim="form.info.articleContent"
          placeholder="请输入文章内容"
        />
      </el-form-item>
      <el-form-item label="语法类型，1markdown，2html" prop="grammarType">
        <el-input
          v-model.trim="form.info.grammarType"
          placeholder="请输入语法类型，1markdown，2html"
        />
      </el-form-item>
      <el-form-item
        label="访问类型,1通用类型，2统一密码，3独立密码"
        prop="visitType"
      >
        <el-input
          v-model.trim="form.info.visitType"
          placeholder="请输入访问类型,1通用类型，2统一密码，3独立密码"
        />
      </el-form-item>
      <el-form-item label="独立密码" prop="password">
        <el-input
          v-model.trim="form.info.password"
          placeholder="请输入独立密码"
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
    sectionId: "",
    tagIds: "",
    articleTitle: "",
    articleDigest: "",
    articleContent: "",
    grammarType: "",
    visitType: "",
    password: "",
    salt: "",
    publishFlag: "",
  },
});

const rules = reactive({
  tenantId: [{ required: true, message: "请选择租户ID", trigger: "blur" }],
  sectionId: [{ required: true, message: "请选择栏目ID", trigger: "blur" }],
  tagIds: [
    { required: true, message: "请选择标签", trigger: "blur" },
  ],
  articleTitle: [
    { required: true, message: "请选择文章标题", trigger: "blur" },
  ],
  articleDigest: [
    { required: true, message: "请选择文章简介", trigger: "blur" },
  ],
  articleContent: [
    { required: true, message: "请选择文章内容", trigger: "blur" },
  ],
  grammarType: [
    {
      required: true,
      message: "请选择语法类型，1markdown，2html",
      trigger: "blur",
    },
  ],
  visitType: [
    {
      required: true,
      message: "请选择访问类型",
      trigger: "blur",
    },
  ],
  password: [{ required: true, message: "请选择独立密码", trigger: "blur" }],
  salt: [{ required: true, message: "请选择salt", trigger: "blur" }],
  publishFlag: [
    {
      required: true,
      message: "请选择发布状态，0未发布，1已发布",
      trigger: "blur",
    },
  ],
});

const getInfo = () => {
  getAction(`/blog/article/info/${form.info.id}`, {}).then((res) => {
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
      postAction(`/blog/article/${form.info.id != null ? "update" : "save"}`, {
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
