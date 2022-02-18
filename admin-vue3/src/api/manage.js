import Vue from "vue";
import axios from '@/utils/request'


//post
export function postAction(url, parameter) {
    return axios.request({
        url: url,
        method: 'post',
        data: parameter,
    })
}

//post method= {post | put}
export function httpAction(url, parameter, method) {
    return axios.request({
        url: url,
        method: method,
        data: parameter,
    })
}

//put
export function putAction(url, parameter) {
    return axios.request({
        url: url,
        method: 'put',
        data: parameter
    })
}

//get
export function getAction(url, parameter) {
    return axios.request({
        url: url,
        method: 'get',
        params: parameter,
    })
}

//deleteAction
export function deleteAction(url, parameter) {
    return axios.request({
        url: url,
        method: 'delete',
        params: parameter
    })
}

/**
 * 文件上传 用于富文本上传图片
 * @param url
 * @param parameter
 * @returns {*}
 */
export function uploadAction(url, parameter) {
    return axios.request({
        url: url,
        data: parameter,
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data',  // 文件上传
        },
    })
}



/**
 * 下载文件 用于excel导出
 * @param url
 * @param parameter
 * @returns {*}
 */
export function downFile(url, parameter) {
    return axios.request({
        url: url,
        params: parameter,
        method: 'get',
        responseType: 'blob'
    })
}

/**
 * 下载文件
 * @param url 文件路径
 * @param fileName 文件名
 * @param parameter
 * @returns {*}
 */
export function downloadFile(url, fileName, parameter) {
    return downFile(url, parameter).then((data) => {
        if (!data || data.size === 0) {
            Vue.prototype['$message'].warning('文件下载失败')
            return
        }
        if (typeof window.navigator.msSaveBlob !== 'undefined') {
            window.navigator.msSaveBlob(new Blob([data]), fileName)
        } else {
            let url = window.URL.createObjectURL(new Blob([data]))
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
            link.setAttribute('download', fileName)
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link) //下载完成移除元素
            window.URL.revokeObjectURL(url) //释放掉blob对象
        }
    })
}