<template>
  <el-select
    v-if="props.type == 1"
    v-model="dictValue"
    :placeholder="props.placeholder"
    @change="dictChange"
    :clearable="props.clearable"
  >
    <el-option
      v-for="item in options.arr"
      :key="item.dictValue"
      :label="item.dictLabel"
      :value="item.dictValue"
    />
  </el-select>
  <el-select
    v-else
    v-model="dictValue"
    :placeholder="props.placeholder"
    @change="dictChange"
    :clearable="props.clearable"
    :multiple="props.multiple"
    :collapse-tags="props.multiple"
    :collapse-tags-tooltip="props.multiple"
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
import { getAction } from "@/api/manage";
import { defineProps, defineEmits, reactive, ref, toRef } from "vue";
import { useCommonStore } from "@/store/modules/common";

const commonStore = useCommonStore();
const dict = ref(commonStore.getDict).value;

const props = defineProps({
  type: {
    //类型 1字典，2接口
    require: false,
    type: Number,
    default: 1,
  },
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
  multiple: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["change", "update:modelValue"]);

let options = reactive({
  arr: [],
});

const dictValue = toRef(props, "modelValue");

if (props.type == 1) {
  if (dict[props.dictCode]) {
    options.arr = dict[props.dictCode];
  }
} else {
  const split = props.dictCode.split(",");
  getAction(split[0], {}).then((res) => {
    const arr = [];
    for (let i = 0; i < res.data.length; i++) {
      arr.push({
        dictValue: res.data[i][split[1]],
        dictLabel: res.data[i][split[2]],
      });
    }
    options.arr = arr;
  });
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