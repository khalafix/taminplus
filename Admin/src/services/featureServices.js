import baseRequest from "./baseRequest";

export const featureServices = {
  getAll: async (data) => baseRequest(data, "/Feature/GetList", "POST", true),
  getById: async (id) =>
    baseRequest(null, "/Feature/GetById/" + id, "GET", true),
    getByFeaturesCategoryId: async (id) =>
    baseRequest(null, "/Feature/GetByFeaturesCategoryId/" + id, "GET", true),
  add: async (data) => baseRequest(data, "/Feature/Add", "POST", true),
  update: async (data) => baseRequest(data, "/Feature/Update", "POST", true),
  delete: async (id) =>
    baseRequest(null, "/Feature/Delete/" + id, "DELETE", true),
};
