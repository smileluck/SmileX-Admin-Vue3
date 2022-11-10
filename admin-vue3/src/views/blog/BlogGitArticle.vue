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
            <el-form-item label="博客文章ID：" prop="blogArticleId">
              <el-input
                v-model.trim="pageSearchFormModel.blogArticleId"
                placeholder="请输入博客文章ID"
              /> </el-form-item
          ></el-col>
          <el-col :span="4">
            <el-form-item label="内容URL：" prop="contentUrl">
              <el-input
                v-model.trim="pageSearchFormModel.contentUrl"
                placeholder="请输入内容URL"
              /> </el-form-item
          ></el-col>
          <el-col :span="4">
            <el-form-item label="是否有更新" prop="updateFlag">
              <dict-select
                dictCode="commonYN"
                v-model="pageSearchFormModel.updateFlag"
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
      <el-table-column prop="blogArticleId" label="博客文章ID" width="180" />
      <el-table-column prop="contentUrl" label="内容URL" />
      <el-table-column prop="updateFlag" label="是否有更新" width="200">
        <template #default="scope">
          <table-column-dict
            dictCode="commonYN"
            :value="scope.row.updateFlag"
          ></table-column-dict>
        </template>
      </el-table-column>
      <el-table-column prop="asyncTime" label="同步时间" width="180" />
      <el-table-column prop="publishTime" label="发布时间" width="180" />
      <el-table-column fixed="right" label="操作" width="200">
        <template v-slot:default="scope">
          <el-button type="primary" link @click="publishOpera(scope.row.id)"
            >发布</el-button
          >
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
    <blog-git-article-model
      ref="pageOperaModel"
      @refresh="pageList"
    ></blog-git-article-model>

    <blog-git-article-publish-model
      ref="pageOperaPublishModel"
      @refresh="pageList"
    ></blog-git-article-publish-model>
  </div>
</template>

<script setup>
import { Search, RefreshRight } from "@element-plus/icons-vue";
import { reactive, ref, unref } from "vue";
import BlogGitArticleModel from "./modules/BlogGitArticleModel.vue";
import BlogGitArticlePublishModel from "./modules/BlogGitArticlePublishModel.vue";
import usePages from "@/composables/pages";

const pageSearchFormModel = reactive({
  id: "",
  blogArticleId: "",
  contentUrl: "",
  updateFlag: "",
});

const reqPrefix = "/blog/git/article";

const pageOperaPublishModel = ref();

const publishOpera = (id) => {
  unref(pageOperaPublishModel).initModel(id);
};

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
