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
            <el-form-item label="栏目ID：" prop="sectionId">
              <el-input
                v-model.trim="pageSearchFormModel.sectionId"
                placeholder="请输入栏目ID"
              /> </el-form-item
          ></el-col>
          <el-col :span="4">
            <el-form-item label="文章标题：" prop="articleTitle">
              <el-input
                v-model.trim="pageSearchFormModel.articleTitle"
                placeholder="请输入文章标题"
              /> </el-form-item
          ></el-col>
          <el-col :span="4">
            <el-form-item label="语法类型：" prop="grammarType">
              <dict-select
                dictCode="blogGrammarType"
                v-model="pageSearchFormModel.grammarType"
                :clearable="true"
              /> </el-form-item
          ></el-col>
          <el-col :span="4">
            <el-form-item label="访问类型：" prop="visitType">
              <dict-select
                dictCode="blogVisitType"
                v-model="pageSearchFormModel.visitType"
                :clearable="true"
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
            <el-form-item label="置顶状态：" prop="topFlag">
              <dict-select
                dictCode="blogTopFlag"
                v-model="pageSearchFormModel.topFlag"
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
                  <span>文章信息</span>
                </div>
              </template>
              <div class="text item">
                文章简介: {{ props.row.articleDigest }}
              </div>
              <div class="text item">
                文章内容: {{ props.row.articleContent }}
              </div>
            </el-card>
            <el-card class="box-card" style="min-width: 500px; width: 50%">
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
      <el-table-column prop="sectionId" label="栏目ID" width="200" />
      <el-table-column prop="tagIds" label="标签id，以,分割" width="200" />
      <el-table-column prop="articleTitle" label="文章标题" width="200" />
      <el-table-column prop="grammarType" label="语法类型" width="200">
        <template #default="scope">
          <table-column-dict
            dictCode="blogGrammarType"
            :value="scope.row.grammarType"
          ></table-column-dict>
        </template>
      </el-table-column>
      <el-table-column prop="visitType" label="访问类型" width="200">
        <template #default="scope">
          <table-column-dict
            dictCode="blogVisitType"
            :value="scope.row.visitType"
          ></table-column-dict>
        </template>
      </el-table-column>
      <el-table-column prop="publishFlag" label="发布状态" width="200">
        <template #default="scope">
          <table-column-dict
            dictCode="blogPublishFlag"
            :value="scope.row.publishFlag"
          ></table-column-dict>
        </template>
      </el-table-column>
      <el-table-column prop="topFlag" label="置顶状态" width="200">
        <template #default="scope">
          <table-column-dict
            dictCode="blogTopFlag"
            :value="scope.row.topFlag"
          ></table-column-dict>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template v-slot:default="scope">
          <el-button
            type="primary"
            v-if="scope.row.publishFlag == 0"
            link
            @click="articlePublishHandle(scope.row.id, 1)"
            >发布</el-button
          >
          <el-button
            type="danger"
            v-else
            link
            @click="articlePublishHandle(scope.row.id, 0)"
            >撤回</el-button
          >
          <el-button
            type="primary"
            v-if="scope.row.topFlag == 0"
            link
            @click="articleTopHandle(scope.row.id, 1)"
            >置顶</el-button
          >
          <el-button
            type="danger"
            v-else
            link
            @click="articleTopHandle(scope.row.id, 0)"
            >取消置顶</el-button
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
    <blog-article-model
      ref="pageOperaModel"
      @refresh="pageList"
    ></blog-article-model>
  </div>
</template>

<script setup>
import { postAction } from "@/api/manage";
import { Search, RefreshRight } from "@element-plus/icons-vue";
import { reactive } from "vue";
import BlogArticleModel from "./modules/BlogArticleModel.vue";
import usePages from "@/composables/pages";

const pageSearchFormModel = reactive({
  id: "",
  sectionId: "",
  articleTitle: "",
  grammarType: "",
  visitType: "",
  publishFlag: "",
  topFlag: "",
});

const reqPrefix = "/blog/article";

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

/**
 * 文章置顶
 * @Param id 文章id
 * @Param flag  0取消置顶，1置顶
 */
const articleTopHandle = (id, flag) => {
  postAction(reqPrefix + "/top", {
    id: id,
    topFlag: flag,
  }).then((res) => {
    if (res.success) {
      pageList();
    }
  });
};

/**
 * 文章发布
 * @Param id 文章id
 * @Param flag  0取消发布，1发布
 */
const articlePublishHandle = (id, flag) => {
  postAction(reqPrefix + "/publish", {
    id: id,
    publishFlag: flag,
  }).then((res) => {
    if (res.success) {
      pageList();
    }
  });
};
</script>
