<template>
  <div>
    <el-tag effect="plain" :type="dictTree[props.dictCode] ? '' : 'warning'">{{
      dictTree[props.dictCode]
        ? dictTree[props.dictCode][props.value]
        : "匹配失败"
    }}</el-tag>
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

</script>
