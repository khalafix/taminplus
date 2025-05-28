import baseRequest from "../baseRequest";


export const comboServices = {
  getProductsByCategoryIdForUser: async (id) => {

    const result = await baseRequest(null, "/UserComboInfo/GetProductsByCategoryIdForUser/"+id, "get", false);
    return result.data;
  },
  getBrands: async () => {

    const result = await baseRequest(null, "/UserComboInfo/GetBrands", "get", false);
    return result.data;
  },
  getProductCategory: async () => {

    const result = await baseRequest(null, "/UserComboInfo/GetProductCategory", "get", false);
    return result.data;
  },
  getAllProductsForUser: async () => {

    const result = await baseRequest(null, "/UserComboInfo/GetAllProductsForUser", "get", false);
    return result.data;
  },
  getJobOpportunities: async () => {

    const result = await baseRequest(null, "/UserComboInfo/GetJobOpportunities", "get", false);
    return result.data;
  },
  getProvince: async () => {

    const result = await baseRequest(null, "/UserComboInfo/GetProvince", "get", false);
    return result;
  },
  getCities: async (id) => {

    const result = await baseRequest(null, "/UserComboInfo/GetCities/"+id, "get", false);
    return result;
  },
};
