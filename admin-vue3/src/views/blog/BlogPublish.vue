<template>
  <div ref="editorRef"></div>
</template>

 <script setup>
// 组件：vditor
// https://ld246.com/article/1549638745630#id
import { onMounted, ref, nextTick } from "vue";
import Vditor from "vditor";
import "vditor/dist/index.css";

const editorRef = ref();
const content = ref("");

let instance;
const init = () => {
  instance = new Vditor(editorRef.value, {
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
    upload: {},
  });
};
onMounted(() => {
  nextTick(() => {
    init();
  });
});
</script>
