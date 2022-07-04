<template>
    <el-dialog
        v-model="dialogVisible"
        :title='`${form.info.id!= null ? "修改" : "新增"}`'
        width="50%"
        :before-close="cancelForm"
    >
        <el-form
                :model="form.info"
                label-width="120px"
                :rules="rules"
                ref="formRef"
        >
            <el-form-item label="租户ID">
            <el-input
                    v-model.trim="form.info.tenantId"
                    placeholder="请输入租户ID"
            /> </el-form-item>
            <el-form-item label="标签名">
            <el-input
                    v-model.trim="form.info.tagName"
                    placeholder="请输入标签名"
            /> </el-form-item>
            <el-form-item label="是否启用，0禁用1启用">
            <el-input
                    v-model.trim="form.info.enableFlag"
                    placeholder="请输入是否启用，0禁用1启用"
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
            tenantId:"",
            tagName:"",
            enableFlag:"",
        },
    });

    const rules = reactive({
        tenantId:[ { required: true, message: "请选择租户ID", trigger: "blur" }],
        tagName:[ { required: true, message: "请选择标签名", trigger: "blur" }],
        enableFlag:[ { required: true, message: "请选择是否启用，0禁用1启用", trigger: "blur" }],
    });

    const getInfo = () => {
        getAction(`/blog/tag/info/${form.info.id}`, {}).then((res) => {
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
                postAction(`/blog/tag/${form.info.id != null ? "update" : "save"}`, {
                    ...toRaw(form.info)
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
        if (id != null) {
            form.info.id = id;
            getInfo();
        }
    };
    defineExpose({ initModel });
</script>
