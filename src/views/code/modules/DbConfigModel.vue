<template>
  <el-dialog
    v-model="dialogVisible"
    title="数据源配置"
    width="50%"
    :before-close="handleClose"
  >
    <el-form :model="form" label-width="120px" :rules="rules" ref="formRef">
      <el-form-item label="类型" prop="type">
        <el-select v-model="form.type" placeholder="请选择数据源类型">
          <el-option label="Mysql" value="mysql" />
        </el-select>
      </el-form-item>
      <el-form-item label="连接地址" required>
        <el-col :span="14">
          <el-form-item prop="address">
            <el-input v-model.trim="form.address" placeholder="请输入地址" />
          </el-form-item>
        </el-col>
        <el-col :span="2">端口</el-col>
        <el-col :span="8">
          <el-form-item prop="port">
            <el-input-number
              v-model.number="form.port"
              :min="0"
              :max="65535"
              :step="1"
              placeholder="请输入端口"
            />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="数据库名称" prop="databaseName">
        <el-input
          v-model.trim="form.databaseName"
          placeholder="请输入连接数据库名称"
        />
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model.trim="form.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model.trim="form.password"
          placeholder="请输入用户密码"
          type="password"
        />
      </el-form-item>
      <el-form-item label="连接参数" prop="params">
        <el-input v-model.trim="form.params" placeholder="请输入连接参数" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose()">取消</el-button>
        <el-button type="primary" @click="submitForm()">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, unref, reactive, toRaw, defineExpose, defineEmits } from "vue";
import { postAction } from "@/api/manage";

const emit = defineEmits(["refresh"]);

const dialogVisible = ref(false);
const formRef = ref();
const form = reactive({
  type: "mysql",
  address: "",
  port: 3306,
  username: "",
  password: "",
  params:
    "useUnicode=true&characterEncoding=UTF-8&useSSL=false&serverTimezone=Asia/Shanghai",
  databaseName: "",
});

const validatePort = (rule, value, callback) => {
  if (value > 65535 || value < 0) {
    callback(new Error("端口需在0~65535之间"));
  } else {
    callback();
  }
};

const rules = reactive({
  type: [{ required: true, message: "请选择数据源类型", trigger: "blur" }],
  address: [{ required: true, message: "请输入地址", trigger: "blur" }],
  port: [
    { required: true, message: "请输入端口", trigger: "blur" },
    { type: "number", message: "请输入数字", trigger: "blur" },
    { validator: validatePort, trigger: "blur" },
  ],
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入用户密码", trigger: "blur" }],
  params: [{ required: true, message: "请输入连接参数", trigger: "blur" }],
  databaseName: [
    { required: true, message: "请输入数据库名称", trigger: "blur" },
  ],
});

const submitForm = () => {
  // if (!formEl) return;
  const formEl = unref(formRef);
  if (!formEl) {
    return;
  }
  formEl.validate((valid, fields) => {
    if (valid) {
      postAction("/generator/connect", toRaw(form)).then((res) => {
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

const handleClose = () => {
  formRef.value.resetFields();
  dialogVisible.value = false;
  form.address = "";
  form.username = "";
  form.password = "";
  form.databaseName = "";
};

const initModel = () => {
  dialogVisible.value = true;
};
defineExpose({ initModel });
</script>
