import baseRequest from "../../baseRequest";

export const poWarrantyEvalutionService = { 
  getHistory: async (purchaseOrderId) =>  baseRequest(null, "/POWarrantyEvalution/GetHistory/" + purchaseOrderId, "GET", true),
  getQuestions: async (purchaseOrderId) =>  baseRequest(null, "/POWarrantyEvalution/GetQuestions/" + purchaseOrderId, "GET", true),
  getById: async (id) =>  baseRequest(null, "/POWarrantyEvalution/GetById/" + id, "GET", true),
  getPOWarrantyEvaluationForCompany: async (companyId) =>  baseRequest(null, "/POWarrantyEvalution/GetPOWarrantyEvaluationForCompany/" + companyId, "GET", true),
  add: async (data) => baseRequest(data, "/POWarrantyEvalution/Add", "POST", true),
  update: async (data) => baseRequest(data, "/POWarrantyEvalution/Update", "PUT", true),
};
