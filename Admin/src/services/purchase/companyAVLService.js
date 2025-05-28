import baseRequest from "../baseRequest";

export const companyAVLService = {
  getAVLAll: async (data) => baseRequest(data, "/CompanyAVL/GetAvlFeatureValues", "POST", true),
  getAVLById: async (id) => baseRequest(null, "/CompanyAVL/GetAvlFeatureValues/" + id, "GET", true),
  GetCompanyAVLsForCombo: async () => baseRequest(null, "/CompanyAVL/GetCompanyAVLsForCombo/" , "GET", true),
  };
