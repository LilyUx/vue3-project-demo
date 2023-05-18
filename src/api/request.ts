import axios from "axios";
import Storage from "@/utils/storage";
import "@/styles/loading.less";
import { ElMessage, ElNotification } from "element-plus";

const CANCEL_CODE = "Campus-cancel-code";

let cancel: any;

export function getToken() {
  const userinfo = Storage.getValue("userinfo");
  const token = typeof userinfo === "string" ? JSON.parse(userinfo).token : "";
  return token;
}

const axiosInstance = axios.create({
  baseURL: window.location.origin + "/dne/v1.0",
  timeout: 1000 * 5 * 60,
  headers: {
    "Content-Type": "application/json",
  },
  method: "GET",
});

axiosInstance.interceptors.request.use(
  config => {
    if (
      Storage.getValue(CANCEL_CODE) &&
      Storage.getValue(CANCEL_CODE) === 1007
    ) {
      if (typeof cancel === "function") {
        cancel("强制取消了请求");
      }
      config["cancelToken"] = new axios.CancelToken(function (c) {
        cancel = c;
      });
    }
    // TOKEN
    const token = getToken();
    config.headers.Authorization = token;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => {
    cancel = null;
    // 当后端返回的是文件流时
    const headers = response.headers;
    if (
      // 兼容utf8
      headers["content-type"] &&
      (headers["content-type"].includes("application/octet-stream") ||
        headers["content-type"] === "application/vnd.ms-excel;charset=utf8")
    ) {
      return response.data;
    }
    // 一般返回（文件流没有code这个属性）
    if (response.data.code === 0) {
      return response.data;
    }
  },
  error => {
    console.log(error.response);
    cancel = null;
    // 当后端返回的文件流报错时
    if (error.response?.data instanceof Blob) {
      const reader = new FileReader();
      reader.readAsText(error.response?.data, "utf-8");
      reader.onload = function () {
        const readerres: any = reader.result;
        const parseObj = JSON.parse(readerres);
        ElMessage.error(parseObj?.data || "file error");
      };
      return false; // 用于给文件流判断
    }
    if (axios.isCancel(error)) {
      // 中断promise链接
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return new Promise(() => {});
    }
    if (error.response?.status === 504) {
      error.response && ElMessage.error(error.response.statusText);
    } else if (error.response?.status === 500) {
      if (error.response.data && error.response.data.code === 1007) {
        if (!Storage.getValue(CANCEL_CODE)) {
          ElNotification({
            type: "error",
            title: "登录超时",
            message: "登录状态已超时，请重新登录！",
            duration: 6,
          });
        }
        Storage.setValue(CANCEL_CODE, 1007);
        setTimeout(() => {
          Storage.clear();
          window.location.replace("/");
        }, 200);
      } else if (error.response.data && error.response.data.code === 401) {
        error.response &&
          ElMessage.error(
            error.response.data.error || error.response.data.data
          );

        const currentHerf = window.location.href;
        const shouldReplace = currentHerf.includes("#");
        setTimeout(() => {
          Storage.clear();
          shouldReplace && window.location.replace("/");
        }, 200);
      } else {
        error.response &&
          ElMessage.error(
            error.response.data.data ||
              error.response.data.error ||
              error.response.data
          );
      }
    } else if (error.response?.status === 405) {
      error.response && ElMessage.error(error.response.data.error);
    } else {
      ElMessage.error(error.message);
    }
  }
);

export default axiosInstance;
