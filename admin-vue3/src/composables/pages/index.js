import { ref } from "vue";
import usePageList from "./pageList";
import usePageOpera from "./pageOpera";
import usePageSearch from "./pageSearch";

export default function usePages(pageSearchFormModel) {
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

  const { pageList, pageTableData } = usePageList(
    pageSearchFormModel,
    pageLoading
  );
  const { pageOperaAdd, pageOperaRemove } = usePageOpera(pageOperaModel);
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
    // 操作
    pageOperaAdd,
    pageOperaRemove,
    // 查询
    pageSearchForm,
    pageSearchReset,
  };
}
