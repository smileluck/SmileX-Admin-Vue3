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
            <el-form-item label="角色id">
            <el-input
                    v-model.trim="form.info.roleId"
                    placeholder="请输入角色id"
            /> </el-form-item>
            <el-form-item label="菜单id">
            <el-input
                    v-model.trim="form.info.menuId"
                    placeholder="请输入菜单id"
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
            roleId:"",
            menuId:"",
        },
    });

    const rules = reactive({
        roleId:[ { required: true, message: "请选择角色id", trigger: "blur" }],
        menuId:[ { required: true, message: "请选择菜单id", trigger: "blur" }],
    });

    const getInfo = () => {
        getAction(`/sys/role/menu/info/${form.info.id}`, {}).then((res) => {
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
