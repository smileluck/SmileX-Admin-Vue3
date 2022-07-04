<template>
  <v-md-editor
    v-model="text"
    height="600px"
    ref="markdownEditor"
    default-show-toc
    :include-level="[1, 2, 3]"
    :disabled-menus="[]"
    @save="savehandler"
    @upload-image="updateImgHandler"
  ></v-md-editor>
</template>

 <script setup>
import { ref } from "vue";
const text = ref("");
const markdownEditor = ref();

const savehandler = (text, html) => {
  console.log(text, html);
};

const updateImgHandler = (event, insertImage, files) => {
  console.log(event, insertImage, files);
  // 此处只做示例
  insertImage({
    url: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1269952892,3525182336&fm=26&gp=0.jpg",
    desc: "七龙珠",
    // width: 'auto',
    // height: 'auto',
  });
};
</script>
