import baseRequest, { setToken } from "./baseRequest";

export const authenticationServices = {
  register: async (data) => baseRequest(data, "/authenticate/register", "post"),
  changePassword: async (data) => baseRequest(data, "/authenticate/changePassword", "post"),
  sendPasswordResetLink: async (data) => baseRequest(data, "/authenticate/SendResetPasswordLink", "post"),
  getConfirmation: async (code) => baseRequest(null, "/authenticate/Confirmation/" + code, "post"),
  getResetPasswordConfirmation: async (code) => baseRequest(null, "/authenticate/resetPasswordConfirmation/" + code, "post"),
  login: async (data) => {
    const res = await baseRequest(data, "/authenticate", "post");
    if (!res.isSuccess) {
      return res;
    }
    setToken(res.data);
    localStorage.setItem("s-token", res.data.token);
    localStorage.setItem("token", JSON.stringify(res.data));
    localStorage.setItem("user", JSON.stringify(res.data.user));
    localStorage.setItem("lastLoginDate", JSON.stringify(res.data.lastLoginDate));

    return res;
  },
  logout: async (data) => {
    localStorage.clear();
  },
  loginWithToken: async () => {
    const data = JSON.parse(localStorage.getItem("token"));
    if (!data) {
      window.location.reload();
    }
    const model = { token: data.token, refreshToken: data.refreshToken };
    const res = await baseRequest(
      model,
      "/authenticate/NewToken",
      "post",
      false,
      null,
      null,
      false,
      null,
      null,
      null,
      true
    );

    if (res.isSuccess) {
      setToken(res.data);
      localStorage.setItem("token", JSON.stringify(res.data));
      return res;
    }
    return null;
  },
  getUserMenu: async () => {
    const data = JSON.parse(localStorage.getItem("user-menu"));
    if (data) {
      return data;
    }
    const res = await baseRequest(
      null,
      `/Menu/GetMenuAccessForUser`,
      "get",
      true
    );
    if (res.isSuccess) {
      localStorage.setItem("user-menu", JSON.stringify(res.data));
      return res.data;
    }
    return null;
  },
  isAuthenticate: () => (localStorage.getItem("token") ? true : false),
  tempUser: () => {
    return { imageUrl: "", jobTitle: "", fullName: "" };
  },
  userInfo: async () =>
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : { imageUrl: "", jobTitle: "", fullName: "" },
};
