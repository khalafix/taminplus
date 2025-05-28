import baseRequest from "../baseRequest";

export const mrCheckWithCommissionService = {
  getAll: async (data) => baseRequest(data, "/MRCheckWithCommission/GetList", "POST", true),
  getById: async (id) =>
    baseRequest(null, "/MRCheckWithCommission/GetById/" + id, "GET", true),
  add: async (data) => baseRequest(data, "/MRCheckWithCommission/Add", "POST", true),
  update: async (data) => baseRequest(data, "/MRCheckWithCommission/Update", "PUT", true),
  delete: async (id) =>
    baseRequest(null, "/MRCheckWithCommission/Delete/" + id, "DELETE", true),
};
