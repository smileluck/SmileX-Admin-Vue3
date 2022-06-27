import { unref } from "vue";
import { postAction } from "@/api/manage"

export default function usePageOpera(model, pageSelectColumn, pageList) {
  const pageOperaAdd = (id) => {
    unref(model).initModel(id);
  };
  const pageOperaRemove = (id) => {
    let ids = []
    if (id == null || id == undefined) {
      ids = pageSelectColumn.value.map((value) => { return value.id });

    } else {
      ids.push(id)
    }
    postAction("/sys/menu/remove", ids).then((res) => {
      console.log(res);
      if (res.success) {
        pageList();
      }
    })
  };
  return {
    pageOperaAdd,
    pageOperaRemove,
  };
}
