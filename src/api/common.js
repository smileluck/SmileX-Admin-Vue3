import { getAction } from "./manage";
import { useCommonStore } from "@/store/modules/common";

const urlPrefix = "/sys/common"

// 获取字典
export function dictGet() {
    const commonStore = useCommonStore();
    getAction(
        urlPrefix + "/dict"
    ).then(res => {
        if (res.success) {
            let obj = {}
            for (let i = 0; i < res.data.length; i++) {
                let item = res.data[i]
                if (obj[item.dictCode]) {
                    obj[item.dictCode].push({
                        id: item.id,
                        dictLabel: item.dictLabel,
                        dictValue: item.dictValue,
                    })
                } else {
                    obj[item.dictCode] = [{
                        id: item.id,
                        dictLabel: item.dictLabel,
                        dictValue: item.dictValue,
                    }]
                }
            }
            commonStore.setDict(obj)
        } else {
            commonStore.setDict({})
        }
    })
}
