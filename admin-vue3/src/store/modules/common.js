import { defineStore } from "pinia";


export const useCommonStore = defineStore("common", {
    state: () => {
        return {
            expandAside: localStorage.store_common_expandAside != null ? localStorage.store_common_expandAside : true
        };
    },
    getters: {
        getExpandAside(state) {
            return state.expandAside;
        },
    },
    actions: {
        setExpandAside(expandAside) {
            this.expandAside = expandAside;
            localStorage.store_common_expandAside = expandAside;
        }
    },
});
