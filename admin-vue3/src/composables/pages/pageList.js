import { ref, onMounted, toRaw } from "vue";
import { ElNotification } from "element-plus";
import { getAction } from "@/api/manage";

export default function usePageList(pageSearchFormModel, pageLoading) {
  let pageTableData = ref([]);
  const pageList = () => {
    pageLoading.value = true;
    getAction("/sys/menu/list", toRaw(pageSearchFormModel))
      .then((res) => {
        console.log(res);
        if (res.success) {
          pageTableData.value = res.data.records;
        } else {
          pageTableData.value = [];
          ElNotification({
            title: "系统提示",
            message: res.msg,
            type: "error",
          });
        }
      })
      .finally(() => {
        pageLoading.value = false;
      });
  };
  onMounted(pageList);
  return {
    pageList,
    pageTableData,
  };
}
