import { ref } from "vue";

/**
 * 
 * @param maxSize 文件大小，最大多少M
 * @returns 
 */
export default function useCommonUpload(maxSize) {
    /**
     * 
     * @param file 上传文件
     * @returns 
     */
    const handleBeforeUpload = (file) => {
        console.log("before", file);
        if (file.size / 1024 / 1024 > maxSize) {
            ElNotification.error({
                title: "系统提示",
                message: `单张图片大小不能超过${maxSize}MB`,
            });
            return false;
        }
        return true;
    };
    return {
        handleBeforeUpload
    };
}
