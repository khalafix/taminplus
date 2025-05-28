import baseRequest from "../../baseRequest";

export const poFinalEvalutionService = { 
  getHistory: async (purchaseOrderId) =>  baseRequest(null, "/POFinalEvalution/GetHistory/" + purchaseOrderId, "GET", true),
  getQuestions: async (purchaseOrderId) =>  baseRequest(null, "/POFinalEvalution/GetQuestions/" + purchaseOrderId, "GET", true),
  getById: async (id) =>  baseRequest(null, "/POFinalEvalution/GetById/" + id, "GET", true),
  getPoFinalEvaluationForCompany: async (companyId) =>  baseRequest(null, "/POFinalEvalution/GetPOFinalEvaluationForCompany/" + companyId, "GET", true),
  add: async (data) => baseRequest(data, "/POFinalEvalution/Add", "POST", true),
  update: async (data) => baseRequest(data, "/POFinalEvalution/Update", "PUT", true),
};
