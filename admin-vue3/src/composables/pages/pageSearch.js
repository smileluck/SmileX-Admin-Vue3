import { ref, unref } from "vue";

export default function usePageSearch(pageList) {
  const pageSearchForm = ref();

  const pageSearchReset = () => {
    unref(pageSearchForm).resetFields();
    pageList();
  };
  return {
    pageSearchForm,
    pageSearchReset,
  };
}
