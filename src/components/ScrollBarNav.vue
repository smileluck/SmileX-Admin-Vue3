<template>
  <div class="bars">
    <el-scrollbar class="bars-scroll">
      <div class="bars-content">
        <div
          v-for="item in 60"
          :key="item"
          class="bars-item"
          :class="{ 'bars-item_active': choiceitem == item }"
          @click="clickItemHandler(item)"
        >
          {{ item }}
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { ref } from "vue";

const choiceitem = ref(1);

const clickItemHandler = (key) => {
  choiceitem.value = key;
};
</script>

<style lang="scss" scoped>
.bars {
  height: 54px;
  width: 100%;
  background-color: #fff;
  line-height: 30px;
  // padding: 0 20px;
  // margin: 0 5px;
  // display: flex;
  // align-items: center;
  &-content {
    display: flex;
  }
  &-item {
    padding: 10px 20px;
    text-align: center;
    cursor: pointer;
    margin: 0 5px 0 0;
    &_active {
      border-bottom: 2px solid #1890ff;
    }
  }
  &-scroll {
    // width: 100%;
    margin: 0 5px;
  }
}
</style>
