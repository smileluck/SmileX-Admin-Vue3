import { ref } from "vue";

export default function usePageSearch(pageList) {
  const pageSearchForm = ref(null);

  const pageSearchReset = () => {
    pageSearchForm.value.resetFields();
    pageList();
  };
  return {
    pageSearchForm,
    pageSearchReset,
  };
}
