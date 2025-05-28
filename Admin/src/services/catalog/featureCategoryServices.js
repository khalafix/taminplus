import baseRequest from "../baseRequest";

export const featureCategoryServices = {
  getAll: async (data) => baseRequest(data, "/FeatureCategory/GetList", "POST", true),
  getById: async (id) =>
    baseRequest(null, "/FeatureCategory/GetById/" + id, "GET", true),
  add: async (data) => baseRequest(data, "/FeatureCategory/Add", "POST", true),
  update: async (data) => baseRequest(data, "/FeatureCategory/Update", "PUT", true),
  delete: async (id) =>
    baseRequest(null, "/FeatureCategory/Delete/" + id, "DELETE", true),
};
