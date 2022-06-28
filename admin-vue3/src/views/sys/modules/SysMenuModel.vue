<template>
  <el-dialog
    v-model="dialogVisible"
    :title="`${form.info.id != null ? '修改' : '新增'}`"
    width="50%"
    :before-close="handleClose"
  >
    <el-form
      :model="form.info"
      label-width="120px"
      :rules="rules"
      ref="formRef"
    >
      <el-form-item label="父ID,最上级则为0">
        <el-input
          v-model.trim="form.info.parentId"
          placeholder="请输入父ID,最上级则为0"
        />
      </el-form-item>
      <el-form-item label="菜单名称">
        <el-input
          v-model.trim="form.info.menuName"
          placeholder="请输入菜单名称"
        />
      </el-form-item>
      <el-form-item label="菜单icon">
        <el-input
          v-model.trim="form.info.menuIcon"
          placeholder="请输入菜单icon"
        />
      </el-form-item>
      <el-form-item label="路由地址">
        <el-input
          v-model.trim="form.info.routeUrl"
          placeholder="请输入路由地址"
        />
      </el-form-item>
      <el-form-item label="路由视图">
        <el-input
          v-model.trim="form.info.routeView"
          placeholder="请输入路由视图"
        />
      </el-form-item>
      <el-form-item label="菜单类型(0:一级菜单; 1:子菜单:2:按钮权限)">
        <el-input
          v-model.trim="form.info.menuType"
          placeholder="请输入菜单类型(0:一级菜单; 1:子菜单:2:按钮权限)"
        />
      </el-form-item>
      <el-form-item label="权限标识">
        <el-input v-model.trim="form.info.perm" placeholder="请输入权限标识" />
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model.trim="form.info.orderNum" placeholder="请输入排序" />
      </el-form-item>
      <el-form-item label="状态  0：正常   1:禁用">
        <el-input
          v-model.trim="form.info.enableFlag"
          placeholder="请输入状态  0：正常   1:禁用"
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
    parentId: "",
    menuName: "",
    menuIcon: "",
    routeUrl: "",
    routeView: "",
    menuType: "",
    perm: "",
    orderNum: "",
    enableFlag: "",
  },
});

const rules = reactive({
  parentId: [
    { required: true, message: "请选择父ID,最上级则为0", trigger: "blur" },
  ],
  menuName: [{ required: true, message: "请选择菜单名称", trigger: "blur" }],
  menuIcon: [{ required: true, message: "请选择菜单icon", trigger: "blur" }],
  routeUrl: [{ required: true, message: "请选择路由地址", trigger: "blur" }],
  routeView: [{ required: true, message: "请选择路由视图", trigger: "blur" }],
  menuType: [
    {
      required: true,
      message: "请选择菜单类型(0:一级菜单; 1:子菜单:2:按钮权限)",
      trigger: "blur",
    },
  ],
  perm: [{ required: true, message: "请选择权限标识", trigger: "blur" }],
  orderNum: [{ required: true, message: "请选择排序", trigger: "blur" }],
  enableFlag: [
    {
      required: true,
      message: "请选择状态  0：正常   1:禁用",
      trigger: "blur",
    },
  ],
});

const getInfo = () => {
  getAction(`/sys/menu/info/${form.info.id}`, {}).then((res) => {
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
      postAction(`/sys/menu/${form.info.id != null ? "update" : "save"}`, {
        ...toRaw(form.info),
      }).then((res) => {
        if (res.success) {
          emit("refresh");
          dialogVisible.value = false;
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
