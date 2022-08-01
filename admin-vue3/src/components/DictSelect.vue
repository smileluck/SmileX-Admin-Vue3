<template>
  <el-select
    v-model="dictValue"
    :placeholder="props.placeholder"
    @change="dictChange"
    :clearable="props.clearable"
  >
    {{ props.modelValue }}
    <el-option
      v-for="item in options.arr"
      :key="item.dictValue"
      :label="item.dictLabel"
      :value="item.dictValue"
    />
  </el-select>
</template>

<script setup>
import { defineProps, defineEmits, reactive, ref, toRef } from "vue";
import { useCommonStore } from "@/store/modules/common";

const commonStore = useCommonStore();
const dict = ref(commonStore.getDict).value;

const props = defineProps({
  modelValue: {
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
  clearable: {
    defalt: false,
  },
});

const emits = defineEmits(["change", "update:modelValue"]);

let options = reactive({
  arr: [],
});

// watch(
//   () => props.modelValue,
//   (newVal) => {
//     console.log("watch", newVal);
//     // dictValue.value = newVal;
//   }
// );
// const dictValue = ref(props.modelValue);

const dictValue = toRef(props, "modelValue");

if (dict[props.dictCode]) {
  options.arr = dict[props.dictCode];
}

const dictChange = (value) => {
  console.log(value);
  dictValue.value = value;
  emits("update:modelValue", value);
  emits("change", value);
};
</script>

<style>
</style>