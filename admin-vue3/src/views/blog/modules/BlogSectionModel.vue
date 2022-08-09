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
      <el-form-item label="上级栏目" prop="parentId">
        <dict-select
          :type="2"
          dictCode="/blog/common/section,id,sectionName"
          v-model="form.info.sectionId"
          placeholder="请选择栏目"
        />
      </el-form-item>
      <el-form-item label="栏目名称" prop="sectionName">
        <el-input
          v-model.trim="form.info.sectionName"
          placeholder="请输入栏目名称"
        />
      </el-form-item>
      <el-form-item label="访问类型" prop="visitType">
        <dict-select
          dictCode="blogVisitType"
          v-model="form.info.visitType"
          @change="menuTypeChange"
        />
      </el-form-item>
      <el-form-item label="排序" prop="orderNum">
        <el-input v-model.trim="form.info.orderNum" placeholder="请输入排序" />
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
    sectionName: "",
    visitType: "",
    orderNum: "1",
  },
});

const rules = reactive({
  parentId: [
    { required: false, message: "请选择父ID,最上级为0", trigger: "blur" },
  ],
  sectionName: [{ required: true, message: "请选择栏目名称", trigger: "blur" }],
  visitType: [
    {
      required: true,
      message: "请选择访问类型，1无限制，2统一密码访问",
      trigger: "blur",
    },
  ],
  orderNum: [{ required: true, message: "请选择排序", trigger: "blur" }],
});

const getInfo = () => {
  getAction(`/blog/section/info/${form.info.id}`, {}).then((res) => {
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
      postAction(`/blog/section/${form.info.id != null ? "update" : "save"}`, {
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
