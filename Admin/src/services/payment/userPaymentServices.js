import baseRequest from "../baseRequest";

export const userPaymentServices = {
  getUserAllPayments: async (data) => baseRequest(data, "/UserPayment/GetUserAllPayments", "POST", true),
  getUserPaymentsByUserId: async (data) => baseRequest(data, "/UserPayment/GetUserPaymentsById", "POST", true),


};
