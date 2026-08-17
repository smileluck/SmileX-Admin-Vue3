<template>
  <el-dialog
    v-model="dialogVisible"
    :title="`${form.info.id != null ? '修改' : '新增'}`"
    width="50%"
    :before-close="cancelForm"
  >
    <el-form
      :model="form.info"
      label-width="120px"
      :rules="rules"
      ref="formRef"
    >
      <el-form-item label="字典" prop="dictId">
        <el-select v-model="form.info.dictId" placeholder="请选择字典">
          <el-option
            v-for="item in dictList"
            :key="item.id"
            :label="item.dictName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="数据值" prop="dictValue">
        <el-input
          v-model.trim="form.info.dictValue"
          placeholder="请输入数据值"
        />
      </el-form-item>
      <el-form-item label="数据显示项" prop="dictLabel">
        <el-input
          v-model.trim="form.info.dictLabel"
          placeholder="请输入数据显示项"
        />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model.trim="form.info.remark" placeholder="请输入备注" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelForm()">取消</el-button>
        <el-button type="primary" @click="submitForm()">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, unref, reactive, toRaw, defineExpose, defineEmits } from "vue";
import { postAction, getAction } from "@/api/manage";

const emit = defineEmits(["refresh"]);

const dialogVisible = ref(false);
const formRef = ref();

const form = reactive({
  info: {
    id: null,
    dictId: "",
    dictCode: "",
    dictValue: "",
    dictLabel: "",
    remark: "",
  },
});

const rules = reactive({
  dictId: [{ required: true, message: "请输入字典ID", trigger: "blur" }],
  dictValue: [{ required: true, message: "请输入数据值", trigger: "blur" }],
  dictLabel: [{ required: true, message: "请输入数据显示项", trigger: "blur" }],
  remark: [{ required: false, message: "请输入备注", trigger: "blur" }],
});

const getInfo = () => {
  getAction(`/sys/dict/item/info/${form.info.id}`, {}).then((res) => {
    if (res.success) {
      form.info = { ...res.data };
    }
  });
};

let dictList = ref([]);
const getDictInfo = () => {
  getAction(`/sys/dict/item/info/dictList`, {}).then((res) => {
    if (res.success) {
      dictList.value = res.data;
    } else {
      dictList.value = [];
    }
  });
};

const cancelForm = () => {
  formRef.value.resetFields();
  dialogVisible.value = false;
  form.info = {};
};

const submitForm = () => {
  // if (!formEl) return;
  const formEl = unref(formRef);
  if (!formEl) {
    return;
  }
  formEl.validate((valid, fields) => {
    if (valid) {
      postAction(`/sys/dict/item/${form.info.id != null ? "update" : "save"}`, {
        ...toRaw(form.info),
      }).then((res) => {
        if (res.success) {
          emit("refresh");
          cancelForm();
        }
      });
    } else {
      console.log("error submit!", fields);
    }
  });
};

const initModel = (id) => {
  dialogVisible.value = true;
  getDictInfo();
  if (id != null) {
    form.info.id = id;
    getInfo();
  }
};
defineExpose({ initModel });
</script>
