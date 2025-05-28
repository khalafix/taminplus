import axios from "axios";
import { authenticationServices } from "./authenticationServices";
import { SERVER_ADDRESS } from "../constants/configs";
import { toastAnyWhere } from "../constants/functions";
import { message } from "antd";

const TIMEOUT_DELAY = 100000;

let token = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : undefined;

export const setToken = (_token) => {
  token = _token;
};

export default async function baseRequest(
  data,
  path,
  method,
  needAuthenticated,
  wwwHeaderType = false,
  params,
  otherOptions,
  isFormData,
  absolutePath,
  getCancelToken,
  retry,
  downloadExcel = false,
) {
  let timeout = null;
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  getCancelToken && getCancelToken(source);
  timeout = setTimeout(() => {
    source.cancel();
  }, TIMEOUT_DELAY);
  const API = absolutePath ? "" : SERVER_ADDRESS;
  if (needAuthenticated && !token)
    return Promise.reject({ isTimeout: false, error: 401 });
  let formData = null;
  if (isFormData) {
    formData = new FormData();
    Reflect.ownKeys(data).forEach((key) => {
      if (data[key]) {
        formData.append(key, data[key]);
      }
    });
  }


  const defaultHeaders = needAuthenticated
    ? {
        "content-type": wwwHeaderType
          ? "application/x-www-form-urlencoded"
          : "application/json",
        Authorization: "Bearer " + token.token,
      }
    : { "content-type": "application/json" };

  const headersForExcel = needAuthenticated
    ? {
        "content-type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "content-disposition": "attachment; filename=template.xlsx",
        Authorization: "Bearer " + token.token,
      }
    : {
        "content-disposition": "attachment; filename=template.xlsx",
        "content-type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      };

  const headers = downloadExcel ? defaultHeaders : defaultHeaders;

  try {
    const response = await axios({
      url: `${API}${path}`,
      method: method === "get" && data ? "POST" : method,
      headers:
        method === "get" && data
          ? { ...headers, "X-HTTP-Method-Override": method.toUpperCase() }
          : headers,
      cancelToken: source.token,
      responseType: downloadExcel ? "blob": "application/json" ,
      data: isFormData ? formData : data,
      params,
      ...otherOptions,
    });

    if (response && response.status >= 200 && response.status < 300) {
      if (timeout) clearTimeout(timeout);
      response.data.message &&
        toastAnyWhere.show(
          response.data.message,
          response.data.isSuccess ? "success" : "error"
        );
      return downloadExcel ? response : response.data;
    } else {
      if (timeout) clearTimeout(timeout);
      return Promise.reject({ isTimeout: false, error: 101 });
    }
  } catch (error) {
    if (timeout) clearTimeout(timeout);
    if (!axios.isCancel(error)) {
      error.response && toastAnyWhere.show("خطا در دریافت توکن", "error");
      if (error && error.response && error.response.status === 401) {
        if (retry) {
          await authenticationServices.logout();
        }
        const refreshTokenResult =
          await authenticationServices.loginWithToken();
        if (refreshTokenResult && refreshTokenResult.data) {
          localStorage.setItem(
            "token",
            JSON.stringify(refreshTokenResult.data)
          );
          token = refreshTokenResult.data.token;
        }

        return baseRequest(
          data,
          path,
          method,
          needAuthenticated,
          params,
          otherOptions,
          isFormData,
          null,
          null,
          true
        );
      } else if (error.response.status === 500) {
        message.error(error?.response?.data?.message ? error?.response?.data?.message : "خطا در بر قراری ارتباط" )
      } else if (
        error.response.status === 404 ||
        error.response.status === 400 ||
        error.response.status === 415
      ) {
        message.error("خطایی رخ داده است !");
      }
    }
    // return Promise.reject({
    //   isTimeout: axios.isCancel(error),
    //   response: error.response && error.response.data,
    //   status: error.response && error.response.status,
    //   isSuccess: error.response?.data?.isSuccess,
    //   message:error?.response?.data?.message,
    //   data: []
    // });

    return {
      isTimeout: axios.isCancel(error),
      response: error.response && error.response.data,
      status: error.response && error.response.status,
      isSuccess: error.response?.data?.isSuccess,
      message: error.response ? "" : "خطایی رخ داده است ! ",
      data: [],
    };
  }
}
