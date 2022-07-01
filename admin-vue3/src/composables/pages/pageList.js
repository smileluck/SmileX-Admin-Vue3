import { ref, toRaw, reactive } from "vue";
import { getAction } from "@/api/manage";

export default function usePageList(pageSearchFormModel, pageLoading, reqPrefix) {
  let pageTableData = ref([]);
  let pagePaginationInfo = reactive({
    current: 1,
    size: 10,
    total: 1,
    pages: 1
  })
  const pagePaginationCurrentChange = (val) => {
    console.log(val)
    pagePaginationInfo.current = val;
    pageList();
  };

  const pagePaginationSizeChange = (val) => {
    console.log(val)
    pagePaginationInfo.size = val
    pagePaginationInfo.current = 1
    pageList();
  };

  const pageList = (callback) => {
    pageLoading.value = true;
    getAction(reqPrefix + "/list", {
      ...toRaw(pageSearchFormModel),
      size: pagePaginationInfo.size,
      page: pagePaginationInfo.current,
    })
      .then((res) => {
        console.log(res);
        if (res.success) {
          pageTableData.value = res.data.records;
          pagePaginationInfo.current = res.data.current
          pagePaginationInfo.size = res.data.size
          pagePaginationInfo.total = res.data.total
          pagePaginationInfo.pages = res.data.pages
          console.log(pagePaginationInfo)
          if (typeof callback === 'function') {
            callback();
          }
        } else {
          pageTableData.value = [];
          pagePaginationInfo.current = 1
          pagePaginationInfo.size = 10
          pagePaginationInfo.total = 1
          pagePaginationInfo.pages = 1
        }
      })
      .finally(() => {
        pageLoading.value = false;
      });
  };
  return {
    pageList,
    pagePaginationInfo,
    pagePaginationSizeChange,
    pagePaginationCurrentChange,
    pageTableData,
  };
}
