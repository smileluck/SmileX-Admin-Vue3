<template>
  <el-select
    v-model="dictValue"
    :placeholder="props.placeholder"
    @change="dictChange"
  >
    <el-option
      v-for="item in options.arr"
      :key="item.dictValue"
      :label="item.dictLabel"
      :value="item.dictValue"
    />
  </el-select>
</template>

<script setup>
import { defineProps, defineEmits, reactive, ref } from "vue";
import { useCommonStore } from "@/store/modules/common";

const commonStore = useCommonStore();
const dict = ref(commonStore.getDict).value;

const props = defineProps({
  value: {
    required: true,
    default: null,
  },
  dictCode: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "请选择",
  },
});

const emits = defineEmits(["change"]);

let options = reactive({
  arr: [],
});

console.log("prop", props.value);

const dictValue = ref(props.value);
if (dict[props.dictCode]) {
  options.arr = dict[props.dictCode];
}

const dictChange = (value) => {
  dictValue.value = value;
  // console.log(value);
  emits("change", value);
};
</script>

<style>
</style>