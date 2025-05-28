import baseRequest from "../baseRequest";

export const brandServices = {
  getAll: async (data) => baseRequest(data, "/Brand/GetList", "POST", true),
  getById: async (id) =>
    baseRequest(null, "/Brand/GetById/" + id, "GET", true),
  add: async (data) => baseRequest(data, "/Brand/Add", "POST", true),
  update: async (data) => baseRequest(data, "/Brand/Update", "PUT", true),
  delete: async (id) =>
    baseRequest(null, "/Brand/Delete/" + id, "DELETE", true),
    getBrandProductsForDashboard: async () => baseRequest(null, "/Brand/GetBrandProductsForDashboard", "GET", true),

};
