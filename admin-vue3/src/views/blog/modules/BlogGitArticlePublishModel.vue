<template>
  <el-dialog
    v-model="dialogVisible"
    :title="`发布`"
    width="50%"
    :before-close="cancelForm"
  >
    <el-form
      :model="form.info"
      label-width="120px"
      :rules="form.rules"
      ref="formRef"
    >
      <el-form-item label="ID">
        <el-input v-model.trim="form.info.id" disabled />
      </el-form-item>
      <el-form-item label="博客文章ID" v-if="form.info.blogArticleId != null">
        <el-input v-model.trim="form.info.blogArticleId" disabled />
      </el-form-item>
      <template v-else>
        <el-form-item label="栏目" prop="sectionId">
          <dict-select
            :type="2"
            dictCode="/blog/common/section?type=1,id,sectionName"
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
        <el-form-item
          label="独立密码"
          prop="password"
          v-if="form.info.visitType == 3"
        >
          <el-input
            v-model.trim="form.info.password"
            placeholder="请输入独立密码"
          />
        </el-form-item>
      </template>
      <el-form-item label="文章内容" prop="password">
        <div class="editor" ref="editorRef"></div>
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
import { postAction, getAction } from "@/api/manage";
import {
  ref,
  reactive,
  nextTick,
  toRaw,
  defineEmits,
  unref,
  defineExpose,
} from "vue";
import { useUserStore } from "@/store/modules/user";
import Vditor from "vditor";
import "vditor/dist/index.css";
const userStore = useUserStore();

const emit = defineEmits(["refresh"]);

const dialogVisible = ref(false);
const formRef = ref();
const editorRef = ref();

const form = reactive({
  info: {
    id: null,
    sectionId: "",
    tagIds: [],
    articleTitle: "",
    articleDigest: "",
    articleContent: "",
    visitType: "1",
    password: "",
    blogArticleId: null,
    contentText: "",
  },
  rules: {
    sectionId: [{ required: true, message: "请选择栏目ID", trigger: "blur" }],
    tagIds: [{ required: true, message: "请选择标签", trigger: "blur" }],
    articleTitle: [
      { required: true, message: "请选择文章标题", trigger: "blur" },
    ],
    articleDigest: [
      { required: true, message: "请选择文章简介", trigger: "blur" },
    ],
    visitType: [
      {
        required: true,
        message: "请选择访问类型",
        trigger: "blur",
      },
    ],
    password: [{ required: false, message: "请选择独立密码", trigger: "blur" }],
  },
});

const getInfo = () => {
  getAction(`/blog/git/article/info/${form.info.id}`, {}).then((res) => {
    if (res.success) {
      form.info = {
        ...res.data,
        articleTitle: res.data.fileTitle,
        visitType: "1",
      };
      nextTick(() => {
        instance = new Vditor(editorRef.value, {
          width: "100%",
          height: 500,
          mode: "ir",
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
            instance.setValue(form.info.contentText);
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
                    "https://smile-sxd.oss-cn-shenzhen.aliyuncs.com/" +
                    res.data[i];
                }
                obj.data.succMap = succMap;
              }
              resMsg = JSON.stringify(obj);
              return resMsg;
            },
          },
        });
      });
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
      postAction(`/blog/git/article/publish`, {
        ...toRaw(form.info),
        tagIds: form.info.tagIds.join(","),
        articleContent: instance.getValue(),
      }).then(() => {
        emit("refresh");
        cancelForm();
      });
    } else {
      console.log("error submit!", fields);
    }
  });
};

let instance;
const initModel = (id) => {
  dialogVisible.value = true;
  if (id != null) {
    form.info.id = id;
    getInfo();
  }
};
defineExpose({ initModel });
</script>

<style lang="scss" scoped>
.editor {
  :deep(ol) {
    list-style: auto !important;
  }
  // ::v-deep ol {
  // }
}
</style>