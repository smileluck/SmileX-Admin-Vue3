<template>
  <div class="table-card">
    <div class="table-search">
      <el-form :inline="true" :model="pageSearchFormModel" ref="pageSearchForm">
        <el-row :gutter="10">
          <el-col :span="4">
            <el-form-item label="ID：" prop="id">
              <el-input
                v-model.trim="pageSearchFormModel.id"
                placeholder="请输入ID"
              /> </el-form-item
          ></el-col>
          <el-col :span="4">
            <el-form-item label="文章ID：" prop="articleId">
              <el-input
                v-model.trim="pageSearchFormModel.articleId"
                placeholder="请输入文章ID"
              /> </el-form-item
          ></el-col>
          <el-col :span="4">
            <el-form-item label="发布状态：" prop="publishFlag">
              <dict-select
                dictCode="blogPublishFlag"
                v-model="pageSearchFormModel.publishFlag"
                :clearable="true" /></el-form-item
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
      <el-table-column type="expand">
        <template #default="props">
          <el-space wrap alignment="stretch"
            ><el-card class="box-card" style="min-width: 500px; width: 50%">
              <template #header>
                <div class="card-header">
                  <span>额外信息</span>
                </div>
              </template>
              <div class="text item">创建时间: {{ props.row.createTime }}</div>
              <div class="text item">创建人: {{ props.row.createBy }}</div>
              <div class="text item">
                最后更新时间: {{ props.row.updateTime }}
              </div>
              <div class="text item">最后更新人: {{ props.row.updateBy }}</div>
            </el-card>
          </el-space>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="tenantId" label="租户ID" width="200" />
      <el-table-column prop="articleId" label="文章ID" width="200" />
      <el-table-column prop="articleTitle" label="文章标题" width="200" />
      <el-table-column prop="articleContent" label="文章内容" width="200" />
      <el-table-column prop="publishFlag" label="发布状态" width="200">
        <template #default="scope">
          <table-column-dict
            dictCode="blogPublishFlag"
            :value="scope.row.publishFlag"
          ></table-column-dict>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template v-slot:default="scope">
          <el-button type="primary" link @click="pageOperaAdd(scope.row.id)"
            >修改</el-button
          >
          <el-popconfirm
            :title="'是否确认删除id=[' + scope.row.id + ']?'"
            @confirm="pageOperaRemove(scope.row.id)"
          >
            <template #reference>
              <el-button type="danger" link>删除</el-button>
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
    <blog-article-draft-model
      ref="pageOperaModel"
      @refresh="pageList"
    ></blog-article-draft-model>
  </div>
</template>

<script setup>
import { Search, RefreshRight } from "@element-plus/icons-vue";
import { reactive } from "vue";
import BlogArticleDraftModel from "./modules/BlogArticleDraftModel.vue";
import usePages from "@/composables/pages";

const pageSearchFormModel = reactive({
  id: "",
  articleId: "",
  publishFlag: "",
});

const reqPrefix = "/blog/article/draft";

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
} = usePages(pageSearchFormModel, reqPrefix);
pageList();
</script>
