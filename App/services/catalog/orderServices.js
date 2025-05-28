import baseRequest from "../baseRequest";

export const orderServices = {
  getDetailById: async (code) =>
    baseRequest(null, "/UserOrder/GetDetailById", "GET", true),

  checkKopon: async (code) =>
    baseRequest(null, "/UserOrder/CheckKopon/" + code, "GET", true),

    addOrder: async (data) =>
    baseRequest(data, "/UserOrder/AddOrder", "POST", true),

    returnOrderByCustomer: async (data) =>
    baseRequest(data, "/UserOrder/ReturnOrderByCustomer", "POST", true),
};
