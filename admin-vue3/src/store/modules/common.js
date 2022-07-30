import { defineStore } from "pinia";


export const useCommonStore = defineStore("common", {
    state: () => {
        return {
            expandAside: localStorage.store_common_expandAside != null ? localStorage.store_common_expandAside : true,
            dict: {},
            dictTree: {}
        };
    },
    getters: {
        getExpandAside(state) {
            return state.expandAside;
        },
        getDict(state) {
            return state.dict
        },
        getDictTree(state) {
            return state.dictTree
        }
    },
    actions: {
        setExpandAside(expandAside) {
            this.expandAside = expandAside;
            localStorage.store_common_expandAside = expandAside;
        },
        setDict(dictObj) {
            this.dict = dictObj
            this.dictTree = ChangeDictTrees(dictObj);
        }
    },
});

const ChangeDictTrees = (dictObj) => {
    const dictTree = {};
    const keys = Object.keys(dictObj);
    for (let i = 0; i < keys.length; i++) {
        const dict = {};
        let arr = dictObj[keys[i]];
        for (let j = 0; j < arr.length; j++) {
            let item = arr[j];
            dict[item.dictValue] = item.dictLabel;
        }
        dictTree[keys[i]] = dict;
    }
    return dictTree;
}
