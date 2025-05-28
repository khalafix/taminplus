import baseRequest from "../baseRequest";

export const smsServices = {
  getList: async (data) => baseRequest(data, "/Sms/GetList", "POST", true),
  checkCodeSmSForPhoneNumber: async (code) => baseRequest(null, "/Sms/CheckCodeSmSForPhoneNumber/"+code, "GET", true),
  sendSmsForConfirmPhoneNumber: async (phoneNumber) => baseRequest(null, "/Sms/SendSmsForConfirmPhoneNumber/"+phoneNumber, "GET", true),
  sendSmsForRegisterUser: async (phoneNumber) => baseRequest(null, "/UserSms/SendSmsForRegisterUser/"+phoneNumber, "GET", false),
  checkCodeSmSForRegisterUser: async (code , phoneNumber) => baseRequest(null, "/UserSms/CheckCodeSmSForRegisterUser/"+code +"/"+phoneNumber, "GET", false),
  checkCodeSmSForForgetPasswordUser: async (code , userName) => baseRequest(null, "/UserSms/CheckCodeSmSForForgetPasswordUser/"+code +"/"+userName, "GET", false),
  checkCodeSmSForActiveUser: async (code , phoneNumber) => baseRequest(null, "/UserSms/CheckCodeSmSForActiveUser/"+code +"/"+phoneNumber, "GET", false),

};
