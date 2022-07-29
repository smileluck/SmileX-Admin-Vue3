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
      {{ form.info.menuType }}
      <el-form-item label="上级菜单" prop="parentId">
        <el-input v-model.trim="form.info.parentId" placeholder="上级菜单" />
      </el-form-item>
      <el-form-item label="菜单名称" prop="menuName">
        <el-input
          v-model.trim="form.info.menuName"
          placeholder="请输入菜单名称"
        />
      </el-form-item>
      <el-form-item
        v-if="form.info.menuType == 0 || form.info.menuType == 1"
        label="菜单icon"
        prop="menuIcon"
      >
        <el-input
          v-model.trim="form.info.menuIcon"
          placeholder="请输入菜单icon"
        />
      </el-form-item>
      <el-form-item
        v-if="form.info.menuType == 0 || form.info.menuType == 1"
        label="路由地址"
        prop="routeUrl"
      >
        <el-input
          v-model.trim="form.info.routeUrl"
          placeholder="请输入路由地址"
        />
      </el-form-item>
      <el-form-item
        v-if="form.info.menuType == 1"
        label="路由视图"
        prop="routeView"
      >
        <el-input
          v-model.trim="form.info.routeView"
          placeholder="请输入路由视图"
        />
      </el-form-item>
      <el-form-item label="菜单类型" prop="menuType">
        <dict-select
          dictCode="sysMenuType"
          :value="form.info.menuType"
          @change="menuTypeChange"
        />
      </el-form-item>
      <el-form-item v-if="form.info.menuType == 2" label="权限标识" prop="perm">
        <el-input v-model.trim="form.info.perm" placeholder="请输入权限标识" />
      </el-form-item>
      <el-form-item label="排序" prop="orderNum">
        <el-input v-model.trim="form.info.orderNum" placeholder="请输入排序" />
      </el-form-item>
      <el-form-item label="状态" prop="enableFlag">
        <el-switch
          v-model="form.info.enableFlag"
          active-text="启用"
          inactive-text="禁用"
          active-value="1"
          inactive-value="0"
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
} from "vue";
import { postAction, getAction } from "@/api/manage";
import DictSelect from "@/components/DictSelect";

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
    menuType: "0",
    perm: "",
    orderNum: 9,
    enableFlag: "1",
  },
  rules: {
    parentId: [
      {
        required: false,
        message: "上级菜单",
        trigger: "blur",
      },
    ],
    menuName: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
    menuIcon: [{ required: true, message: "请选择菜单icon", trigger: "blur" }],
    routeUrl: [{ required: true, message: "请输入路由地址", trigger: "blur" }],
    menuType: [
      {
        required: true,
        message: "请选择菜单类型(0:菜单组; 1:子菜单; 2:按钮权限)",
        trigger: "blur",
      },
    ],
    orderNum: [{ required: true, message: "请选择排序", trigger: "blur" }],
    enableFlag: [
      {
        required: true,
        message: "请选择是否启用",
        trigger: "blur",
      },
    ],
  },
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
      if (form.info.parentId == "") {
        form.info.parentId = 0;
      }
      postAction(`/sys/menu/${form.info.id != null ? "update" : "save"}`, {
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

const menuTypeChange = (value) => {
  console.log(value);
  form.info.menuType = value;
  switch (value) {
    //0:菜单组; 1:子菜单; 2:按钮权限
    case 0: //菜单组
      form.rules = {
        parentId: [
          {
            required: false,
            message: "上级菜单",
            trigger: "blur",
          },
        ],
        menuName: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
        ],
        menuIcon: [
          { required: true, message: "请选择菜单icon", trigger: "blur" },
        ],
        routeUrl: [
          { required: true, message: "请选择路由地址", trigger: "blur" },
        ],
        menuType: [
          {
            required: true,
            message: "请选择菜单类型",
            trigger: "blur",
          },
        ],
        orderNum: [{ required: true, message: "请选择排序", trigger: "blur" }],
        enableFlag: [
          {
            required: true,
            message: "请选择是否启用",
            trigger: "blur",
          },
        ],
      };
      break;
    case 1: //子菜单
      form.rules = {
        parentId: [
          {
            required: true,
            message: "请选择父ID,最上级则为0",
            trigger: "blur",
          },
        ],
        menuName: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
        ],
        menuIcon: [
          { required: true, message: "请选择菜单icon", trigger: "blur" },
        ],
        routeUrl: [
          { required: true, message: "请选择路由地址", trigger: "blur" },
        ],
        routeView: [
          { required: true, message: "请选择路由视图", trigger: "blur" },
        ],
        menuType: [
          {
            required: true,
            message: "请选择菜单类型",
            trigger: "blur",
          },
        ],
        orderNum: [{ required: true, message: "请选择排序", trigger: "blur" }],
        enableFlag: [
          {
            required: true,
            message: "请选择是否启用",
            trigger: "blur",
          },
        ],
      };
      break;
    case 2: //按钮权限
      form.rules = {
        parentId: [
          {
            required: true,
            message: "请选择父ID,最上级则为0",
            trigger: "blur",
          },
        ],
        menuName: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
        ],
        menuType: [
          {
            required: true,
            message: "请选择菜单类型",
            trigger: "blur",
          },
        ],
        perm: [{ required: true, message: "请选择权限标识", trigger: "blur" }],
        orderNum: [{ required: true, message: "请选择排序", trigger: "blur" }],
        enableFlag: [
          {
            required: true,
            message: "请选择是否启用",
            trigger: "blur",
          },
        ],
      };
      break;
  }
};

defineExpose({ initModel });
</script>
