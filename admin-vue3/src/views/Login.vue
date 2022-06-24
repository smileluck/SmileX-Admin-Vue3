<template>
  <div class="wrapper">
    <div class="login">
      <div class="login-main">
        <p class="login-title">SmileX-Admin</p>
        <div class="login-model">
          <el-form
            ref="formRef"
            :model="form"
            :rules="rules"
            label-width="40px"
          >
            <el-form-item label="账号" prop="username">
              <el-input
                v-model="form.username"
                type="text"
                placeholder="请输入账号"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                v-model="form.password"
                type="text"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>

            <div style="text-align: center; margin: 0 auto">
              <el-button @click="onSubmit()" type="primary">登录</el-button>
              <el-button @click="onReset()">重置</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { postAction } from "@/api/manage";
import { reactive, ref, toRaw, unref } from "vue";
import { ElNotification } from "element-plus";
const router = useRouter();

const formRef = ref();

const form = reactive({
  username: "",
  password: "",
});

const onSubmit = () => {
  const formEl = unref(formRef);
  if (!formEl) {
    return;
  }
  formEl.validate((result) => {
    if (result) {
      postAction("/sys/login/submit", { ...toRaw(form) }).then((res) => {
        if (res.success) {
          ElNotification({
            title: "系统提示",
            message: res.msg,
            type: "success",
          });
          router.push({
            path: "/",
          });
        } else {
          ElNotification({
            title: "系统提示",
            message: res.msg,
            type: "error",
          });
        }
      });
    }
  });
};
const onReset = () => {
  formRef.value.resetFields();
};

const validateUname = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入账号"));
  } else {
    callback();
  }
};

const validatePwd = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    callback();
  }
};

const rules = reactive({
  username: [
    {
      validator: validateUname,
      trigger: "blur",
    },
  ],
  password: [
    {
      validator: validatePwd,
      trigger: "blur",
    },
  ],
});
</script>

<style lang="scss" scoped>
.login {
  background: url("../assets/images/login-bg.jpg") center center / cover
    no-repeat;
  width: 100%;
  height: 100%;
  position: relative;
  &-main {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
  }
  &-title {
    font-size: 24px;
    text-align: center;
    color: #fff;
  }
  &-model {
    background-color: #f3f3f3;
    width: 300px;
    padding: 40px 30px;
    border-radius: 8px;
    box-shadow: $S-Box-Shadow;
  }
}
</style>
