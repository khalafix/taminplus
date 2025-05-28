import baseRequest, { setToken } from "./baseRequest";
//comment
export const userService = {
  getuserbyId: async () =>
    baseRequest(null, "/Customer/GetCustomerByUser", "get", true),
  updateUser: async (data) =>
    baseRequest(data, "/Customer/UpdateCustomerByUser", "post", true),
  updatePassword: async (data) =>
    baseRequest(data, "/user/UpdatePassword", "post", false),
  changePassword: async (data) =>
    baseRequest(data, "/user/ChangePassword", "post", false),
    updateCustomerInfo: async (data) =>
    baseRequest(data, "/Customer/UpdateCustomerInfoByUser", "post", true),
};
