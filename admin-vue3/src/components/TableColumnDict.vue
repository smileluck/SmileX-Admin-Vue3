<template>
  <el-tag effect="plain">{{ showLabel }}</el-tag>
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

const showLabel = ref("匹配失败");

console.log(dictTree);
showLabel.value = dictTree[props.dictCode][props.value];
</script>
