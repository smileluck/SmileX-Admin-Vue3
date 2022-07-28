import { getAction } from "./manage";

const urlPrefix = "/sys/common"

// 获取字典
export function dictGet() {
    getAction(
        urlPrefix + "/dict"
    ).then(res => {
        console.log(res)
    })
}
