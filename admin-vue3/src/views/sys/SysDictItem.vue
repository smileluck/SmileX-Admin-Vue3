<template>
    <div class="table-card">
        <div class="table-search">
            <el-form :inline="true" :model="pageSearchFormModel" ref="pageSearchForm">
                <el-row :gutter="10">
                    <el-col :span="4">
                                                <el-form-item label="ID：">
                            <el-input
                                    v-model.trim="pageSearchFormModel.id"
                                    placeholder="请输入ID"
                            /> </el-form-item
                        ></el-col>
                        <el-col :span="4">
                            <el-form-item label="字典ID：">
                                <el-input
                                        v-model.trim="pageSearchFormModel.dictId"
                                        placeholder="请输入字典ID"
                                /> </el-form-item
                            ></el-col>
                        <el-col :span="4">
                            <el-form-item label="字典编码：">
                                <el-input
                                        v-model.trim="pageSearchFormModel.dictCode"
                                        placeholder="请输入字典编码"
                                /> </el-form-item
                            ></el-col>
                        <el-col :span="4">
                            <el-form-item label="数据值：">
                                <el-input
                                        v-model.trim="pageSearchFormModel.dictValue"
                                        placeholder="请输入数据值"
                                /> </el-form-item
                            ></el-col>
                        <el-col :span="4">
                            <el-form-item label="数据显示项：">
                                <el-input
                                        v-model.trim="pageSearchFormModel.dictLabel"
                                        placeholder="请输入数据显示项"
                                /> </el-form-item
                            ></el-col>
                        <el-col :span="4">
                            <el-form-item label="备注：">
                                <el-input
                                        v-model.trim="pageSearchFormModel.remark"
                                        placeholder="请输入备注"
                                /> </el-form-item
                            ></el-col>
                    <el-col :span="4">
                        <el-button type="primary" @click="pageList()">
                            <el-icon class="el-icon"><search /></el-icon>
                            <span>搜索</span></el-button
                        >
                        <el-button type="primary" @click="pageSearchReset()">
                            <el-icon class="el-icon"><refresh-right /></el-icon>
                            <span>重置</span></el-button
                        >
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="table-operate">
            <el-row :gutter="20">
                <el-col :span="1">
                    <el-button type="primary" @click="pageOperaAdd()">新增</el-button>
                </el-col>
                <el-col :span="1" v-show="pageSelectColumn.length > 0">
                    <el-button type="danger" @click="pageOperaRemove()"
                    >批量删除</el-button
                    >
                </el-col>
            </el-row>
        </div>
        <div class="table-selection" v-show="pageSelectColumn.length > 0">
      <span class="selection-span"
      >已选择 <a>{{ pageSelectColumn.length }}</a> 项
      </span>
            <span class="selection-operate">
        <a @click="pageSelectClear()">清空</a>
      </span>
        </div>
        <el-table
                ref="pageTable"
                v-loading="pageLoading"
                element-loading-text="Loading..."
                :data="pageTableData"
                style="width: 100%"
                @selection-change="pageSelectChange"
        >
            <el-table-column type="selection" width="50" />
            <el-table-column prop="id" label="ID" width="" />
            <el-table-column prop="dictId" label="字典ID" width="200" />
            <el-table-column prop="dictCode" label="字典编码" width="200" />
            <el-table-column prop="dictValue" label="数据值" width="200" />
            <el-table-column prop="dictLabel" label="数据显示项" width="200" />
            <el-table-column prop="remark" label="备注" width="200" />
            <el-table-column fixed="right" label="Operations" width="120">
                <template v-slot:default="scope">
                    <el-button type="text" @click="pageOperaAdd(scope.row.id)"
                    >修改</el-button
                    >
                    <el-popconfirm
                            :title="'是否确认删除id=[' + scope.row.id + ']?'"
                            @confirm="pageOperaRemove(scope.row.id)"
                            s
                    >
                        <template #reference>
                            <el-button type="text">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                class="table-card-pagination"
                :page-sizes="[10, 20, 50, 100]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pagePaginationInfo.total"
                :currentPage="pagePaginationInfo.current"
                :page-size="pagePaginationInfo.size"
                @size-change="pagePaginationSizeChange"
                @current-change="pagePaginationCurrentChange"
        >
        </el-pagination>
        <sys-dict-item-model ref="pageOperaModel" @refresh="pageList"></sys-dict-item-model>
    </div>
</template>

<script setup>
    import { Search, RefreshRight } from "@element-plus/icons-vue";
    import { reactive } from "vue";
    import SysDictItemModel from "./modules/SysDictItemModel.vue";
    import usePages from "@/composables/pages";


    const pageSearchFormModel = reactive({
        id:"",
        dictId:"",
        dictCode:"",
        dictValue:"",
        dictLabel:"",
        remark:"",
    });

    const {
        // 组件引用
        pageLoading,
        pageOperaModel,
        pageTable,
        pageSelectColumn,

        pageList,
        pagePaginationInfo,
        pagePaginationSizeChange,
        pagePaginationCurrentChange,
        pageTableData,
        pageSelectChange,
        pageSelectClear,

        pageOperaAdd,
        pageOperaRemove,

        pageSearchForm,
        pageSearchReset,
    } = usePages(pageSearchFormModel);
</script>
