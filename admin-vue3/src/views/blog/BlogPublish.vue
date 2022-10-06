<template>
  <el-form
    :model="form.info"
    label-width="120px"
    :rules="form.rules"
    ref="formRef"
  >
    <el-form-item label="栏目" prop="sectionId">
      <dict-select
        :type="2"
        dictCode="/blog/common/section,id,sectionName"
        v-model="form.info.sectionId"
        placeholder="请选择栏目"
      />
    </el-form-item>
    <el-form-item label="标签" prop="tagIds">
      <dict-select
        :type="2"
        dictCode="/blog/common/tag,id,tagName"
        v-model="form.info.tagIds"
        placeholder="请选择标签"
        multiple
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
    <el-form-item label="访问类型" prop="visitType">
      <dict-select dictCode="blogVisitType" v-model="form.info.visitType" />
    </el-form-item>
    <el-form-item label="独立密码" prop="password">
      <el-input
        v-model.trim="form.info.password"
        placeholder="请输入独立密码"
      />
    </el-form-item>
    <el-form-item label="文章内容" prop="password">
      <div class="editor" ref="editorRef"></div>
    </el-form-item>
    <el-form-item>
      <el-button @click="cancelForm()">保存草稿箱</el-button>
      <el-button type="primary" @click="submitForm()">确定</el-button>
    </el-form-item>
  </el-form>
</template>

 <script setup>
// 组件：vditor
// https://ld246.com/article/1549638745630#id
import { postAction } from "@/api/manage";
import { onMounted, ref, nextTick, reactive, toRaw } from "vue";
import { useUserStore } from "@/store/modules/user";
import Vditor from "vditor";
import "vditor/dist/index.css";
const userStore = useUserStore();

const formRef = ref();

const form = reactive({
  info: {
    sectionId: "",
    tagIds: [],
    articleTitle: "",
    articleDigest: "",
    articleContent: "",
    visitType: "1",
    password: "",
  },
  rules: {
    sectionId: [{ required: true, message: "请选择栏目ID", trigger: "blur" }],
    tagIds: [
      { required: true, message: "请选择标签id，以,分割", trigger: "blur" },
    ],
    articleTitle: [
      { required: true, message: "请选择文章标题", trigger: "blur" },
    ],
    articleDigest: [
      { required: true, message: "请选择文章简介", trigger: "blur" },
    ],
    visitType: [
      {
        required: true,
        message: "请选择访问类型,1通用类型，2统一密码，3独立密码",
        trigger: "blur",
      },
    ],
    password: [{ required: true, message: "请选择独立密码", trigger: "blur" }],
  },
});

const editorRef = ref();
const content = ref("");

let instance;
const init = () => {
  instance = new Vditor(editorRef.value, {
    width: "100%",
    height: 720,
    mode: "sv",
    toolbarConfig: {
      pin: false,
    },
    outline: {
      enable: true,
    },
    preview: {
      delay: 500,
      markdown: {
        toc: true,
      },
    },
    cache: {
      enable: false,
    },
    after: () => {
      instance.setValue(content.value);
    },
    // 这里写上传
    upload: {
      url: process.env.VUE_APP_BASE_URL + "/sys/demo/file/multi",
      headers: {
        "X-Access-Token": userStore.getToken,
      },
      withCredentials: true,
      validate: (file) => {
        console.log("validate", file);
        return true;
      },
      // handler: (file) => {
      //   console.log("handler", file);
      // },
      // success: (file, resMsg) => {
      //   console.log("success", file, resMsg);
      // },
      format: (files, resMsg) => {
        console.log("format", files, resMsg);
        const obj = {
          msg: "",
          code: 0,
          data: {
            errFiles: [],
            succMap: {},
          },
        };
        const res = JSON.parse(resMsg);
        if (res.success) {
          const succMap = {};
          for (let i = 0; i < res.data.length; i++) {
            let stt = res.data[i];
            stt.substring(stt.lastIndexOf("/") + 1, stt.lastIndexOf("."));
            succMap[stt] =
              "https://smile-sxd.oss-cn-shenzhen.aliyuncs.com/" + res.data[i];
          }
          obj.data.succMap = succMap;
        }
        resMsg = JSON.stringify(obj);
        return resMsg;
      },
    },
  });
};
onMounted(() => {
  nextTick(() => {
    init();
  });
});

const submitForm = () => {
  // if (!formEl) return;
  if (!formRef.value) {
    return;
  }
  formRef.value.validate((valid, fields) => {
    if (valid) {
      postAction(`/blog/article/save`, {
        ...toRaw(form.info),
        tagIds: form.info.tagIds.join(","),
        articleContent: instance.getValue(),
      }).then((res) => {
        console.log(res);
      });
    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>

<style lang="scss" scoped>
.editor {
  :deep(ol){
    list-style: auto !important;
  }
  // ::v-deep ol {
  // }
}
</style>