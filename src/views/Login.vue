<template>
  <div class="wrapper">
    <div class="login">
      <div class="login-card">
        <div class="login-header">
          <img class="login-logo" src="../assets/logo.svg" alt="logo" />
          <p class="login-title">SmileX-Admin</p>
          <p class="login-subtitle">欢迎回来，请登录您的账号</p>
        </div>
        <el-form ref="formRef" :model="form" :rules="rules" @keyup.enter="onSubmit">
          <el-form-item prop="username">
            <el-input
              v-model="form.username"
              size="large"
              :prefix-icon="User"
              placeholder="请输入账号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              size="large"
              :prefix-icon="Lock"
              type="password"
              show-password
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item prop="captchaCode">
            <div class="captcha-row">
              <el-input
                v-model="form.captchaCode"
                size="large"
                :prefix-icon="Key"
                placeholder="请输入验证码"
                maxlength="4"
              ></el-input>
              <div class="captcha-box" title="点击刷新验证码" @click="captchaGet">
                <img
                  v-if="captchaState === 'success'"
                  class="captcha-img"
                  :src="imgRef"
                  alt="验证码"
                />
                <div v-else class="captcha-holder">
                  <template v-if="captchaState === 'error'">
                    <span>网络异常 · 点击刷新</span>
                  </template>
                  <template v-else>
                    <el-icon class="is-loading"><Loading /></el-icon>
                    <span>加载中</span>
                  </template>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button class="login-btn" size="large" :loading="loading" @click="onSubmit">
              登 录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <p class="login-footer">Copyright © {{ year }} SmileX-Admin</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { postAction, getAction } from "@/api/manage";
import { reactive, ref, toRaw, unref } from "vue";
import { User, Lock, Key, Loading } from "@element-plus/icons-vue";
import { useUserStore } from "@/store/modules/user";
const router = useRouter();

const formRef = ref();
const imgRef = ref("");
// 验证码图片状态：loading 加载中 / success 已加载 / error 网络异常
const captchaState = ref("");
const loading = ref(false);
const year = new Date().getFullYear();
const userStore = useUserStore();

const form = reactive({
  username: "",
  password: "",
  captchaCode: "",
});

const captchaKey = ref(
  new Date().getTime().toString() + "" + Math.random().toString(36).slice(-6)
);

const onSubmit = () => {
  const formEl = unref(formRef);
  if (!formEl) {
    return;
  }
  formEl.validate((result) => {
    if (result) {
      loading.value = true;
      postAction("/sys/login/submit", {
        ...toRaw(form),
        captchaKey: captchaKey.value,
      })
        .then((res) => {
          if (res.success) {
            userStore.login(res.data);
            router.push({
              path: "/",
            });
          } else {
            captchaGet();
          }
        })
        .finally(() => {
          loading.value = false;
        });
    }
  });
};
const captchaGet = () => {
  if (captchaState.value === "loading") {
    return; // 加载中不重复请求
  }
  captchaState.value = "loading";
  getAction(`/sys/login/captcha/${captchaKey.value}`)
    .then((res) => {
      if (res.success) {
        imgRef.value = res.data;
        captchaState.value = "success";
      } else {
        captchaState.value = "error";
      }
    })
    .catch(() => {
      captchaState.value = "error";
    });
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
  captchaCode: [{ required: true, message: "请输入验证码", trigger: "blur" }],
});
captchaGet();
</script>

<style lang="scss" scoped>
.login {
  background: url("../assets/images/login-bg.jpg") center center / cover no-repeat;
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  // 深色遮罩，压暗背景、突出卡片
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse at center,
      rgba(10, 14, 38, 0.2) 0%,
      rgba(8, 10, 30, 0.55) 100%
    );
  }
}

.login-card {
  position: relative;
  z-index: 1;
  width: 400px;
  max-width: calc(100% - 32px);
  padding: 44px 40px 28px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 20px 50px rgba(5, 8, 25, 0.45);
  animation: fade-in-up 0.6s ease both;

  :deep(.el-form-item) {
    margin-bottom: 22px;
  }

  :deep(.el-input__wrapper) {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.2) inset;

    &:hover {
      box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.35) inset;
    }

    &.is-focus {
      box-shadow: 0 0 0 1px #ff7bac inset;
    }
  }

  :deep(.el-input__inner) {
    color: #fff;

    &::placeholder {
      color: rgba(255, 255, 255, 0.45);
    }
  }

  :deep(.el-input__prefix),
  :deep(.el-input__password) {
    color: rgba(255, 255, 255, 0.6);
  }

  :deep(.el-form-item__error) {
    color: #ffb3c8;
  }
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-logo {
  width: 56px;
  height: 56px;
  filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.35));
  margin-bottom: 12px;
}

.login-title {
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 1px;
  color: #fff;
}

.login-subtitle {
  margin-top: 8px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.65);
}

.captcha-row {
  display: flex;
  gap: 12px;
  width: 100%;

  .el-input {
    flex: 1;
  }
}

// 固定尺寸占位，验证码未加载/加载失败时布局不塌陷
.captcha-box {
  width: 118px;
  height: 40px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border-color: rgba(255, 255, 255, 0.45);
    box-shadow: 0 0 0 2px rgba(255, 123, 172, 0.25);
  }
}

.captcha-img {
  width: 100%;
  height: 100%;
  object-fit: fill;
  display: block;
}

.captcha-holder {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 100%;
  height: 100%;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.55);
}

.login-btn {
  width: 100%;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 8px;
  text-indent: 8px;
  color: #fff;
  background: linear-gradient(135deg, #ff6b9d 0%, #b565d8 100%);
  box-shadow: 0 8px 20px rgba(255, 107, 157, 0.35);
  transition: all 0.3s;

  &:hover,
  &:focus {
    color: #fff;
    background: linear-gradient(135deg, #ff85ad 0%, #c47ae0 100%);
    box-shadow: 0 10px 24px rgba(255, 107, 157, 0.45);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
}

.login-footer {
  position: absolute;
  bottom: 24px;
  left: 0;
  right: 0;
  z-index: 1;
  text-align: center;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.55);
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(24px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 480px) {
  .login-card {
    padding: 36px 24px 24px;
  }
}
</style>
