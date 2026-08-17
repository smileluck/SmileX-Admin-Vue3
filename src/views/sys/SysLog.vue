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
            <el-form-item label="日志模块" prop="logModule">
              <dict-select
                dictCode="logModule"
                v-model="pageSearchFormModel.logModule"
                :clearable="true"
              /> </el-form-item
          ></el-col>
          <el-col :span="4">
            <el-form-item label="日志标题：" prop="logTitle">
              <el-input
                v-model.trim="pageSearchFormModel.logTitle"
                placeholder="请输入日志标题"
              /> </el-form-item
          ></el-col>
          <el-col :span="4">
            <el-form-item label="日志内容：" prop="logValue">
              <el-input
                v-model.trim="pageSearchFormModel.logValue"
                placeholder="请输入日志内容"
              /> </el-form-item
          ></el-col>
          <el-col :span="4">
            <el-form-item label="日志类型：" prop="logType">
              <dict-select
                dictCode="logType"
                v-model="pageSearchFormModel.logType"
                :clearable="true"
              /> </el-form-item
          ></el-col>
          <el-col :span="4">
            <el-form-item label="用户ID：" prop="userId">
              <el-input
                v-model.trim="pageSearchFormModel.userId"
                placeholder="请输入用户ID"
              /> </el-form-item
          ></el-col>
          <el-col :span="4">
            <el-form-item label="操作类型：" prop="operateType">
              <dict-select
                dictCode="logOperateType"
                v-model="pageSearchFormModel.operateType"
                :clearable="true"
              /> </el-form-item
          ></el-col>
          <el-col :span="4">
            <el-form-item label="IP地址：" prop="ipAddress">
              <el-input
                v-model.trim="pageSearchFormModel.ipAddress"
                placeholder="请输入IP地址"
              /> </el-form-item
          ></el-col>
          <el-col :span="4">
            <el-form-item label="请求方法：" prop="method">
              <el-input
                v-model.trim="pageSearchFormModel.method"
                placeholder="请输入请求方法"
              /> </el-form-item
          ></el-col>
          <el-col :span="4">
            <el-form-item label="请求路径：" prop="requestUrl">
              <el-input
                v-model.trim="pageSearchFormModel.requestUrl"
                placeholder="请输入请求路径"
              /> </el-form-item
          ></el-col>
          <el-col :span="4">
            <el-form-item label="请求类型：" prop="requestType">
              <el-input
                v-model.trim="pageSearchFormModel.requestType"
                placeholder="请输入请求类型"
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
      <el-table-column type="expand">
        <template #default="props">
          <el-space wrap alignment="stretch"
            ><el-card class="box-card" style="min-width: 500px; width: 50%">
              <template #header>
                <div class="card-header">
                  <span>详细信息</span>
                </div>
              </template>
              <div style="width: 800px; padding: 0 20px">
                <div class="text item">
                  操作类型: {{ props.row.operateType }}
                </div>
                <div class="text item">请求方法: {{ props.row.method }}</div>
                <div class="text item">
                  请求url路径: {{ props.row.requestUrl }}
                </div>
                <div class="text item">
                  请求类型: {{ props.row.requestType }}
                </div>
                <div class="text item">
                  请求参数: {{ props.row.requestParams }}
                </div>
                <!-- <el-row :gutter="20"> -->
                <div class="text item">异常信息: {{ props.row.errMsg }}</div>
                <!-- </el-row> -->
                <div class="text item">
                  创建时间: {{ props.row.createTime }}
                </div>
                <div class="text item">创建人: {{ props.row.createBy }}</div>
                <div class="text item">
                  最后更新时间: {{ props.row.updateTime }}
                </div>
                <div class="text item">
                  最后更新人: {{ props.row.updateBy }}
                </div>
              </div>
              <div class="text item">最后更新人: {{ props.row.updateBy }}</div>
            </el-card>
          </el-space>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="logModule" label="日志模块" width="200">
        <template #default="scope">
          <table-column-dict
            dictCode="logModule"
            :value="scope.row.logModule"
          ></table-column-dict>
        </template>
      </el-table-column>
      <el-table-column prop="logTitle" label="日志标题" width="200" />
      <el-table-column prop="logValue" label="日志内容" width="200" />
      <el-table-column prop="logType" label="日志类型" width="200">
        <template #default="scope">
          <table-column-dict
            dictCode="logType"
            :value="scope.row.logType"
          ></table-column-dict>
        </template>
      </el-table-column>
      <el-table-column prop="userId" label="用户ID" width="200" />
      <el-table-column prop="operateType" label="操作类型" width="200">
        <template #default="scope">
          {{ scope.row.operateType }}
          <table-column-dict
            dictCode="logOperateType"
            :value="scope.row.operateType"
          ></table-column-dict>
        </template>
      </el-table-column>
      <el-table-column prop="ipAddress" label="IP地址" width="200" />
      <el-table-column prop="method" label="请求方法" width="200" />
      <el-table-column prop="requestUrl" label="请求url路径" width="200" />
      <el-table-column prop="requestType" label="请求类型" width="200" />
      <el-table-column
        prop="requestParams"
        label="请求参数"
        width="200"
        :show-overflow-tooltip="true"
      />
      <el-table-column prop="costTime" label="耗费时间" width="200" />
      <el-table-column
        prop="errMsg"
        label="异常信息"
        width="200"
        :show-overflow-tooltip="true"
      />
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
    <sys-log-model ref="pageOperaModel" @refresh="pageList"></sys-log-model>
  </div>
</template>

<script setup>
import { Search, RefreshRight } from "@element-plus/icons-vue";
import { reactive } from "vue";
import SysLogModel from "./modules/SysLogModel.vue";
import usePages from "@/composables/pages";

const pageSearchFormModel = reactive({
  id: "",
  logModule: "",
  logTitle: "",
  logValue: "",
  logType: "",
  userId: "",
  operateType: "",
  ipAddress: "",
  method: "",
  requestUrl: "",
  requestType: "",
  requestParams: "",
  costTime: "",
  errMsg: "",
});

const reqPrefix = "/sys/log";

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
