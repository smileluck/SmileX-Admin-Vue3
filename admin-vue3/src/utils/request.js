import axios from "axios";
import router from "@/router";
import { ElNotification } from "element-plus";
import { useUserStore } from "@/store/modules/user";

const http = axios.create({
  baseURL: "http://localhost:7081/smilex",
  // baseURL: "http://localhost:8001/smilex",
  timeout: 1000 * 30,
  withCredentials: true,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

//请求拦截器
http.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const userStore = useUserStore();
    if (userStore.getToken != null) {
      config.headers["X-Access-Token"] = userStore.getToken;
    }
    // if (config.method == "get") {
    //   config.params["t"] = Date.parse(new Date()) / 1000;
    // }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

const err = (error) => {
  if (error.response) {
    // let that = this;
    let data = error.response.data;
    // const token = Vue.ls.get(ACCESS_TOKEN);
    // console.log("------异常响应------", token);
    console.log("------异常响应------", error.response.status);
    switch (error.response.status) {
      case 403:
        ElNotification.error({
          title: "系统提示",
          message: "拒绝访问",
        });
        break;
      case 500:
        ElNotification.error({
          title: "系统提示",
          message: "服务异常!",
        });
        break;
      case 404:
        ElNotification.error({
          title: "系统提示",
          message: "很抱歉，服务未找到!",
        });
        break;
      case 504:
        ElNotification.error({ title: "系统提示", message: "网络超时" });
        break;
      case 401:
        ElNotification.error({
          title: "系统提示",
          message: "未授权，请重新登录",
        });
        router.push({ name: "Login" });
        break;
      default:
        ElNotification.error({
          title: "系统提示",
          message: data.msg,
        });
        break;
    }
  } else {
    ElNotification.error({
      title: "系统提示",
      message: "网路异常",
    });
  }
  return Promise.reject(error);
};
//响应拦截器
http.interceptors.response.use(function (response) {
  console.log(response.data);
  if (response.data && response.data.code === 401) {
    // 401, token失效
    router.push({ name: "Login" });
  }
  //   if (response.status === 200 && response.data.success) {
  //     return response.data;
  //   }
  if (response.data.success) {
    ElNotification({
      title: "系统提示",
      message: response.data.msg,
      type: "success",
    });
  } else {
    if (response.data instanceof Blob) {
      const reader = new FileReader();  //创建一个FileReader实例
      reader.readAsText(response.data, 'utf-8'); //读取文件,结果用字符串形式表示
      reader.onload = function () {//读取完成后,**获取reader.result**
        const { msg } = JSON.parse(reader.result);
        console.log(msg);
        // this.$Message.error(msg); //弹出错误提示
        ElNotification.error({
          title: "系统提示",
          message: msg,
        });
      }
    } else {
      ElNotification({
        title: "异常",
        message: response.data.msg,
        type: "error",
      });
    }
  }
  return response.data;
}, err);

export default http;
