import { defineStore } from "pinia";


export const useCommonStore = defineStore("common", {
    state: () => {
        return {
            expandAside: localStorage.store_common_expandAside != null ? localStorage.store_common_expandAside : true,
            dict: [],
        };
    },
    getters: {
        getExpandAside(state) {
            return state.expandAside;
        },
        getDict(state) {
            return state.dict
        }
    },
    actions: {
        setExpandAside(expandAside) {
            this.expandAside = expandAside;
            localStorage.store_common_expandAside = expandAside;
        },
        setDict(dictList) {
            this.dict = dictList
        }
    },
});
