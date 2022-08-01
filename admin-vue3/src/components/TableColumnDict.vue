<template>
  <el-tag effect="plain" :type="tagType">{{ showLabel }}</el-tag>
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

if (dictTree[props.dictCode]) {
  tagType.value = "";
  showLabel.value = dictTree[props.dictCode][props.value];
}
</script>
