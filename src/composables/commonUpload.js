import { ref } from "vue";
function Checktype(name, type) {
    if (type == 1) {
        // 图片
        return /\.(gif|jpg|jpeg|png)$/i.test(name)
    } else if (type == 2) {
        // 视频
        return /\.(mp4||wmv|mpg|mpeg|ram|rm)$/i.test(name)
    }
    return true
}
/**
 * 
 * @param maxSize 文件大小，最大多少M
 * @param checkType 验证类型，0不验证，1图片，2视频
 * @returns 
 */
export default function useCommonUpload() {

    /**
     * 
     * @param file 上传文件
     * @returns 
     */
    const handleBeforeUpload = (file, maxSize = 2, checkType = 0) => {
        console.log("before", file);
        if (file.size / 1024 / 1024 > maxSize) {
            ElNotification.error({
                title: "系统提示",
                message: `单张图片大小不能超过${maxSize}MB`,
            });
            return false;
        }
        if (!checkType(file, checkType)) {
            return false
        }
        return true;
    };
    return {
        handleBeforeUpload
    };
}
