import baseRequest from "../baseRequest";

export const smsServices = {
  getList: async (data) => baseRequest(data, "/Sms/GetList", "POST", true),
};
