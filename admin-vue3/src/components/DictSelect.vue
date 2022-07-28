<template>
  <el-select v-model="value" class="m-2" placeholder="Select">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script setup>
import { defineProps } from "vue";
defineProps({
  dictCode: String,
});
const arr = [];
</script>

<style>
</style>