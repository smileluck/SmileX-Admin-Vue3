// 数组递归转换树目录结构
export const dynamicTree = (list, pid) => {
    const arr = [];
    list.forEach(item => {
        if (item.parentId == pid) {
            const children = dynamicTree(list, item.id);
            if (children.length != 0) {
                item.children = children
            }
            arr.push(item);
        }
    })
    return arr
}