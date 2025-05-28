import baseRequest, { setToken } from "./baseRequest";
import { getCookie, setCoockie, deleteCoockie } from 'helpers/Helpers';

export const authenticationServices = {
  checkUserIsExsits: async (data) => baseRequest(data, "/authenticate/CheckUserIsExsits", "post"),
  sendSmsAgain: async (data) => baseRequest(data, "/authenticate/SendSmsAgain", "post"),
  checkUserIsExsitsForActive: async (data) => baseRequest(data, "/authenticate/CheckUserIsExsitsForActive", "post"),
  register: async (data) => baseRequest(data, "/authenticate/register", "post"),
  changePassword: async (data) => baseRequest(data, "/authenticate/ChangePasswordForUser", "post"),
  sendPasswordResetLink: async (data) => baseRequest(data, "/authenticate/SendResetPasswordLink", "post"),
  getConfirmation: async (code) => baseRequest(null, "/authenticate/Confirmation/" + code, "post"),
  getResetPasswordConfirmation: async (code) => baseRequest(null, "/authenticate/resetPasswordConfirmation/" + code, "post"),
  login: async (data) => {
    const res = await baseRequest(data, "/authenticate/Login", "post");

    return res;
  },
  logout: async (data) => {
    localStorage.clear();
    deleteCoockie('token', '');
    window.location.reload();
  },
  loginWithToken: async () => {
    const token =  typeof window !== 'undefined' && !!document  ?  getCookie("token") : '';
    const refreshToken =  typeof window !== 'undefined' && !!document  ?  getCookie("refreshToken") : '';

    if (!token) {
      window.location.reload();
    }
    if(token){
      const model = { token: token, refreshToken: refreshToken };
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
