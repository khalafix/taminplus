import baseRequest from "../baseRequest";

export const userPaymentServices = {

  getBankResult: async (refId) =>
    baseRequest(null, "/UserPayment/GetBankResult/" + refId, "GET", true),

  addUserPayment: async (data) =>
    baseRequest(data, "/UserPayment/AddUserPayment", "POST", true),

    getUserAllPaymentsForUser: async () =>
    baseRequest(null, "/UserPayment/GetUserAllPaymentsForUser" , "GET", true),
};
