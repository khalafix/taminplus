import baseRequest from "../../baseRequest";

export const poMidTermEvalutionService = { 
  getHistory: async (purchaseOrderId) =>  baseRequest(null, "/POMidTermEvalution/GetHistory/" + purchaseOrderId, "GET", true),
  getQuestions: async (purchaseOrderId) => purchaseOrderId ?
    baseRequest(null, "/POMidTermEvalution/GetQuestions/" + purchaseOrderId, "GET", true) :
    baseRequest(null, "/POMidTermEvalution/GetQuestions" , "GET", true) ,
  getById: async (id) =>  baseRequest(null, "/POMidTermEvalution/GetById/" + id, "GET", true),
  getPurchaseOrderMidTermEvaluationForCompany: async (companyId) =>  baseRequest(null, "/POMidTermEvalution/GetPurchaseOrderMidTermEvaluationForCompany/" + companyId, "GET", true),
  add: async (data) => baseRequest(data, "/POMidTermEvalution/Add", "POST", true),
  update: async (data) => baseRequest(data, "/POMidTermEvalution/Update", "PUT", true),
  delete: async (id) =>   baseRequest(null, "/POMidTermEvalution/Delete/" + id, "DELETE", true),
};
