import baseRequest from "../baseRequest";

export const currencyService = {
  getAll: async (data) => baseRequest(data, "/Currency/GetList", "POST", true),
  getById: async (id) =>
    baseRequest(null, "/Currency/GetById/" + id, "GET", true),
    GetForCombo: async () =>
    baseRequest(null, "/Currency/GetForCombo" , "GET", true),
  add: async (data) => baseRequest(data, "/Currency/Add", "POST", true),
  update: async (data) => baseRequest(data, "/Currency/Update", "PUT", true),
  delete: async (id) =>
    baseRequest(null, "/Currency/Delete/" + id, "DELETE", true),
};
