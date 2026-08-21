<template>
  <div class="wrapper">
    <div class="login">
      <!-- 装饰层：科技感网格 + 光斑 -->
      <div class="deco-grid"></div>
      <div class="deco-glow deco-glow-1"></div>
      <div class="deco-glow deco-glow-2"></div>
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
          <el-form-item class="remember-item">
            <div class="remember-row">
              <el-checkbox v-model="rememberMe" size="large">记住密码</el-checkbox>
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

// ==================== 记住密码 ====================
// localStorage 持久化，密码仅 base64 混淆（防肩窥，非加密），
// 勾选状态下登录成功才保存；取消勾选后登录成功即清除
const REMEMBER_KEY = "store_login_remember";
const rememberMe = ref(false);

const encodeText = (text) => {
  try {
    return btoa(unescape(encodeURIComponent(text)));
  } catch (e) {
    return "";
  }
};
const decodeText = (text) => {
  try {
    return decodeURIComponent(escape(atob(text)));
  } catch (e) {
    return "";
  }
};

// 进入页面回填已记住的账号密码
const savedLogin = JSON.parse(localStorage.getItem(REMEMBER_KEY) || "null");
if (savedLogin) {
  form.username = savedLogin.username || "";
  form.password = decodeText(savedLogin.password || "");
  rememberMe.value = !!(savedLogin.username && savedLogin.password);
}

const saveOrClearRemember = () => {
  if (rememberMe.value) {
    localStorage.setItem(
      REMEMBER_KEY,
      JSON.stringify({
        username: form.username,
        password: encodeText(form.password),
      })
    );
  } else {
    localStorage.removeItem(REMEMBER_KEY);
  }
};
// ================================================

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
            saveOrClearRemember();
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
  background: linear-gradient(135deg, #050b24 0%, #0a1f4d 45%, #122a6b 100%);
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

// 科技感网格
.deco-grid {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(92, 140, 255, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(92, 140, 255, 0.06) 1px, transparent 1px);
  background-size: 42px 42px;
  mask-image: radial-gradient(ellipse at center, #000 30%, transparent 75%);
  -webkit-mask-image: radial-gradient(ellipse at center, #000 30%, transparent 75%);
  pointer-events: none;
}

// 光斑
.deco-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;

  &-1 {
    width: 420px;
    height: 420px;
    left: -120px;
    top: -140px;
    background: rgba(47, 107, 255, 0.28);
  }

  &-2 {
    width: 360px;
    height: 360px;
    right: -100px;
    bottom: -120px;
    background: rgba(99, 91, 255, 0.22);
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
      box-shadow: 0 0 0 1px #5c8cff inset;
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
    color: #9bc0ff;
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
    box-shadow: 0 0 0 2px rgba(92, 140, 255, 0.35);
  }
}

.captcha-img {
  width: 100%;
  height: 100%;
  object-fit: fill;
  display: block;
}

// 记住密码行：贴近登录按钮，弱化留白
.remember-item {
  margin-bottom: 10px;
}

.remember-row {
  display: flex;
  align-items: center;

  :deep(.el-checkbox__label) {
    color: rgba(255, 255, 255, 0.75);
    font-size: 13px;
  }
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
  background: linear-gradient(135deg, #2f6bff 0%, #635bff 100%);
  box-shadow: 0 8px 20px rgba(47, 107, 255, 0.4);
  transition: all 0.3s;

  &:hover,
  &:focus {
    color: #fff;
    background: linear-gradient(135deg, #4a80ff 0%, #7a72ff 100%);
    box-shadow: 0 10px 26px rgba(47, 107, 255, 0.55);
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
