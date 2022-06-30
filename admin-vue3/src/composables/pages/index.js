import { ref } from "vue";
import usePageList from "./pageList";
import usePageOpera from "./pageOpera";
import usePageSearch from "./pageSearch";

export default function usePages(pageSearchFormModel, reqPrefix) {
  const pageLoading = ref();
  const pageOperaModel = ref();
  const pageTable = ref();
  const pageSelectColumn = ref([]);
  const pageSelectChange = (val) => {
    console.log(val);
    pageSelectColumn.value = val;
  };

  const pageSelectClear = () => {
    pageTable.value.clearSelection();
  };

  const { pageList, pageTableData,
    pagePaginationInfo,
    pagePaginationSizeChange,
    pagePaginationCurrentChange, } = usePageList(
      pageSearchFormModel,
      pageLoading,
      reqPrefix
    );
  const { pageOperaAdd, pageOperaRemove } = usePageOpera(pageOperaModel, pageSelectColumn, pageList);
  const { pageSearchForm, pageSearchReset } = usePageSearch(pageList);
  return {
    // 组件引用
    pageLoading,
    pageOperaModel,
    pageTable,
    pageSelectColumn,
    // table相关
    pageList,
    pageTableData,
    pageSelectChange,
    pageSelectClear,
    // 分页

    pagePaginationInfo,
    pagePaginationSizeChange,
    pagePaginationCurrentChange,
    // 操作
    pageOperaAdd,
    pageOperaRemove,
    // 查询
    pageSearchForm,
    pageSearchReset,
  };
}
