<template>
  <el-dialog
    v-model="dialogVisible"
    :title="`授权`"
    width="50%"
    :before-close="cancel"
  >
    <el-row>
      <el-col :span="4">
        <el-button @click="allChecked">全选</el-button>
        <el-button @click="resetChecked">清空</el-button>
      </el-col>
    </el-row>
    <br />
    <el-tree
      ref="treeRef"
      :data="tree.info.menus"
      :props="tree.defaultProps"
      show-checkbox
      node-key="id"
      highlight-current
    >
      <template #default="{ data }">
        <div style="width: 100%">
          <el-row :gutter="2">
            <el-col :span="6"> {{ data.menuName }}</el-col>
            <el-col :span="4" v-if="data.menuType == 0">菜单组</el-col>
            <el-col :span="4" v-else-if="data.menuType == 1">菜单</el-col>
            <el-col :span="4" v-else-if="data.menuType == 2">权限</el-col>

            <el-col
              style="text-align: right"
              :span="12"
              v-if="data.menuType == 0"
              >[{{ data.routeUrl }}]</el-col
            >
            <el-col
              style="text-align: right"
              :span="12"
              v-else-if="data.menuType == 1"
              >[{{ data.routeUrl }}]</el-col
            >
            <el-col
              style="text-align: right"
              :span="12"
              v-else-if="data.menuType == 2"
              >[{{ data.perm }}]</el-col
            >
          </el-row>
        </div>
      </template>
    </el-tree>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel()">取消</el-button>
        <el-button type="primary" @click="submit()">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, defineExpose, defineEmits } from "vue";
import { postAction, getAction } from "@/api/manage";
import { dynamicTree } from "@/utils/common";

const emit = defineEmits(["refresh"]);

const dialogVisible = ref(false);
const treeRef = ref();

const tree = reactive({
  id: null,
  info: {
    menus: [],
    roleMenus: [],
  },
  allKeys: [],
  defaultProps: {
    children: "children",
    label: "menuName",
  },
});

const getInfo = () => {
  getAction(`/sys/role/menu/${tree.id}`, {}).then((res) => {
    if (res.success) {
      let temp = dynamicTree(res.data.menus, 0);
      tree.allKeys = getKeys(res.data.menus, "id");
      treeRef.value.setCheckedKeys(res.data.roleMenus, true);
      tree.info = { roleMenus: res.data.roleMenus, menus: temp };
      console.log(tree);
    }
  });
};

const getKeys = (menus, key) => {
  let arr = [];
  for (let i = 0; i < menus.length; i++) {
    arr.push(menus[i][key]);
  }
  return arr;
};

const cancel = () => {
  dialogVisible.value = false;
};

const submit = () => {
  const arr = treeRef.value.getCheckedKeys(false);
  if (arr.length == 0) {
    return;
  }
  postAction(`/sys/role/menu/save`, {
    roleId: tree.id,
    menuIds: arr,
    halfMenuIds: treeRef.value.getHalfCheckedKeys(),
  }).then((res) => {
    if (res.success) {
      emit("refresh");
      cancel();
    }
  });
};

const resetChecked = () => {
  treeRef.value.setCheckedKeys([], false);
};

const allChecked = () => {
  treeRef.value.setCheckedKeys(tree.allKeys, false);
};

const initModel = (id) => {
  dialogVisible.value = true;
  tree.id = id;
  getInfo();
};
defineExpose({ initModel });
</script>


<style lang="scss" scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>