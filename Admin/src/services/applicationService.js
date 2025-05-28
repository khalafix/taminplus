import baseRequest from "./baseRequest";
import {SERVER_ADDRESS} from 'constants/configs';

export const applicationService = {
  getCaptchaUrl : (captcahKey) => `${SERVER_ADDRESS}/captcha/${captcahKey}`,
  get: async () => baseRequest(null, "/ApplicationConfig/Get", "GET", true),
  update: async (data) =>
    baseRequest(data, "/ApplicationConfig/Update", "POST", true),
  getAppConfig: async () => {
    if (localStorage.getItem("config")) {
      return JSON.parse(localStorage.getItem("config"));
    }

    const result = await baseRequest(
      null,
      "/ApplicationConfig/Get",
      "GET",
      false
    );

    if (result.isSuccess) {
      localStorage.setItem("config", JSON.stringify(result.data));
      return result.data;
    }
  },
};
