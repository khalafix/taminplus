import baseRequest from "../baseRequest";

export const mrCheckWithManagerService = {
  getAll: async (data) => baseRequest(data, "/MRCheckWithManager/GetList", "POST", true),
  getById: async (id) =>
    baseRequest(null, "/MRCheckWithManager/GetById/" + id, "GET", true),
  add: async (data) => baseRequest(data, "/MRCheckWithManager/Add", "POST", true),
  update: async (data) => baseRequest(data, "/MRCheckWithManager/Update", "PUT", true),
  delete: async (id) =>
    baseRequest(null, "/MRCheckWithManager/Delete/" + id, "DELETE", true),
};
