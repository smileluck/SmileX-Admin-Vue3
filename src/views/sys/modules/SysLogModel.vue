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
      <el-form-item label="日志模块，sys,blog" prop="logModule">
        <el-input
          v-model.trim="form.info.logModule"
          placeholder="请输入日志模块，sys,blog"
        />
      </el-form-item>
      <el-form-item label="日志标题" prop="logTitle">
        <el-input
          v-model.trim="form.info.logTitle"
          placeholder="请输入日志标题"
        />
      </el-form-item>
      <el-form-item label="日志内容" prop="logValue">
        <el-input
          v-model.trim="form.info.logValue"
          placeholder="请输入日志内容"
        />
      </el-form-item>
      <el-form-item
        label="日志类型1:登录日志;2:操作日志;3:定时任务;4:异常日志;"
        prop="logType"
      >
        <el-input
          v-model.trim="form.info.logType"
          placeholder="请输入日志类型1:登录日志;2:操作日志;3:定时任务;4:异常日志;"
        />
      </el-form-item>
      <el-form-item label="用户ID" prop="userId">
        <el-input v-model.trim="form.info.userId" placeholder="请输入用户ID" />
      </el-form-item>
      <el-form-item label="操作类型" prop="operateType">
        <el-input
          v-model.trim="form.info.operateType"
          placeholder="请输入操作类型"
        />
      </el-form-item>
      <el-form-item label="IP地址" prop="ipAddress">
        <el-input
          v-model.trim="form.info.ipAddress"
          placeholder="请输入IP地址"
        />
      </el-form-item>
      <el-form-item label="请求方法" prop="method">
        <el-input
          v-model.trim="form.info.method"
          placeholder="请输入请求方法"
        />
      </el-form-item>
      <el-form-item label="请求url路径" prop="requestUrl">
        <el-input
          v-model.trim="form.info.requestUrl"
          placeholder="请输入请求url路径"
        />
      </el-form-item>
      <el-form-item label="请求类型" prop="requestType">
        <el-input
          v-model.trim="form.info.requestType"
          placeholder="请输入请求类型"
        />
      </el-form-item>
      <el-form-item label="请求参数" prop="requestParams">
        <el-input
          v-model.trim="form.info.requestParams"
          placeholder="请输入请求参数"
        />
      </el-form-item>
      <el-form-item label="耗费时间" prop="costTime">
        <el-input
          v-model.trim="form.info.costTime"
          placeholder="请输入耗费时间"
        />
      </el-form-item>
      <el-form-item label="异常信息" prop="errMsg">
        <el-input
          v-model.trim="form.info.errMsg"
          placeholder="请输入异常信息"
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
    logModule: "",
    logTitle: "",
    logValue: "",
    logType: "",
    userId: "",
    operateType: "",
    ipAddress: "",
    method: "",
    requestUrl: "",
    requestType: "",
    requestParams: "",
    costTime: "",
    errMsg: "",
  },
});

const rules = reactive({
  logModule: [
    { required: true, message: "请选择日志模块，sys,blog", trigger: "blur" },
  ],
  logTitle: [{ required: true, message: "请选择日志标题", trigger: "blur" }],
  logValue: [{ required: true, message: "请选择日志内容", trigger: "blur" }],
  logType: [
    {
      required: true,
      message: "请选择日志类型1:登录日志;2:操作日志;3:定时任务;4:异常日志;",
      trigger: "blur",
    },
  ],
  userId: [{ required: true, message: "请选择用户ID", trigger: "blur" }],
  operateType: [{ required: true, message: "请选择操作类型", trigger: "blur" }],
  ipAddress: [{ required: true, message: "请选择IP地址", trigger: "blur" }],
  method: [{ required: true, message: "请选择请求方法", trigger: "blur" }],
  requestUrl: [
    { required: true, message: "请选择请求url路径", trigger: "blur" },
  ],
  requestType: [{ required: true, message: "请选择请求类型", trigger: "blur" }],
  requestParams: [
    { required: true, message: "请选择请求参数", trigger: "blur" },
  ],
  costTime: [{ required: true, message: "请选择耗费时间", trigger: "blur" }],
  errMsg: [{ required: true, message: "请选择异常信息", trigger: "blur" }],
});

const getInfo = () => {
  getAction(`/sys/log/info/${form.info.id}`, {}).then((res) => {
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
      postAction(`/sys/log/${form.info.id != null ? "update" : "save"}`, {
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
