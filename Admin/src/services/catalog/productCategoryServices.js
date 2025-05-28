import baseRequest from "../baseRequest";

export const productCategoryServices = {
  getAll: async () =>
    baseRequest(null, "/ProductCategory/GetTree", "GET", true),
  getTree: async (id) => {
    let data;
    if (id) {
      data = baseRequest(null, "/ProductCategory/GetTree/" + id, "GET", true);
    } else {
      data = baseRequest(null, "/ProductCategory/GetTree", "GET", true);
    }
    return data;
  },
  getById: async (id) =>
    baseRequest(null, "/ProductCategory/GetById/" + id, "GET", true),

  getProductCategoryFeatures: async (id) => baseRequest(null, "/ProductCategory/GetFeaturesForFilter/" + id, "GET", true),
  add: async (data) => baseRequest(data, "/ProductCategory/Add", "POST", true),
  update: async (data) =>
    baseRequest(data, "/ProductCategory/Update", "POST", true),
  delete: async (id) =>
    baseRequest(null, "/ProductCategory/Delete/" + id, "DELETE", true),
    search: async (data) => baseRequest(data, "/ProductCategory/Search", "POST", true),

    getProductForCompany: async (id) =>
    baseRequest(null, "/ProductCategory/getProductForCompany/" + id, "GET", true),

    searchFeaturesForCompany: async (data) =>
    baseRequest(data, "/ProductCategory/searchFeaturesForCompany", "POST", true),


    getProductForFilterCompany: async (data) =>
    baseRequest(data, "/ProductCategory/GetProductForFilterCompany", "POST", true),

    getProductCategoryForDashboard: async () => baseRequest(null, "/ProductCategory/GetProductCategoryForDashboard", "GET", true),

    
    getFeaturesForFilter: async (id) =>
    baseRequest(null, "/ProductCategory/getFeaturesForFilter/" + id, "GET", true),    
};
