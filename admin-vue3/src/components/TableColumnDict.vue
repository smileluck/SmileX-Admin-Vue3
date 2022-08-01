<template>
  <div>
    <el-tag effect="plain" :type="tagType">{{ showLabel[props.value] }}</el-tag>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";
import { useCommonStore } from "@/store/modules/common";

const commonStore = useCommonStore();
const dictTree = ref(commonStore.getDictTree).value;
const props = defineProps({
  dictCode: {
    type: String,
    required: true,
  },
  value: {
    required: true,
  },
});

const tagType = ref("warning");
const showLabel = ref("匹配失败");

tagType.value = "";
showLabel.value = dictTree[props.dictCode];
</script>
