<template>
    <el-dialog
        v-model="dialogVisible"
        :title='`${form.info.id!= null ? "修改" : "新增"}`'
        width="50%"
        :before-close="handleClose"
    >
        <el-form
                :model="form.info"
                label-width="120px"
                :rules="rules"
                ref="formRef"
        >
            <el-form-item label="字典ID">
            <el-input
                    v-model.trim="form.info.dictId"
                    placeholder="请输入字典ID"
            /> </el-form-item>
            <el-form-item label="字典编码">
            <el-input
                    v-model.trim="form.info.dictCode"
                    placeholder="请输入字典编码"
            /> </el-form-item>
            <el-form-item label="数据值">
            <el-input
                    v-model.trim="form.info.dictValue"
                    placeholder="请输入数据值"
            /> </el-form-item>
            <el-form-item label="数据显示项">
            <el-input
                    v-model.trim="form.info.dictLabel"
                    placeholder="请输入数据显示项"
            /> </el-form-item>
            <el-form-item label="备注">
            <el-input
                    v-model.trim="form.info.remark"
                    placeholder="请输入备注"
            /> </el-form-item>
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
            dictId:"",
            dictCode:"",
            dictValue:"",
            dictLabel:"",
            remark:"",
        },
    });

    const rules = reactive({
        dictId:[ { required: true, message: "请选择字典ID", trigger: "blur" }],
        dictCode:[ { required: true, message: "请选择字典编码", trigger: "blur" }],
        dictValue:[ { required: true, message: "请选择数据值", trigger: "blur" }],
        dictLabel:[ { required: true, message: "请选择数据显示项", trigger: "blur" }],
        remark:[ { required: true, message: "请选择备注", trigger: "blur" }],
    });

    const getInfo = () => {
        getAction(`/sys/dict/item/info/${form.info.id}`, {}).then((res) => {
            if (res.success) {
                form.info = { ...res.data };
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
                postAction(`/sys/menu/${form.info.id != null ? "update" : "save"}`, {
                    ...toRaw(form.info)
                }).then((res) => {
                    if (res.success) {
                        emit("refresh");
                        dialogVisible.value = false;
                    }
                });
            } else {
                console.log("error submit!", fields);
            }
        });
    };

    const initModel = (id) => {
        dialogVisible.value = true;
        if (id != null) {
            form.info.id = id;
            getInfo();
        }
    };
    defineExpose({ initModel });
</script>
