import { unref } from "vue";

export default function usePageOpera(model) {
  const pageOperaAdd = () => {
    unref(model).initModel();
  };
  const pageOperaRemove = () => {};
  return {
    pageOperaAdd,
    pageOperaRemove,
  };
}
