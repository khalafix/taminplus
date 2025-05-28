import baseRequest from "../baseRequest";

export const purchaseOrderService = {
  getAll: async (data) => baseRequest(data, "/PurchaseOrder/GetList", "POST", true),
  getById: async (id) =>  baseRequest(null, "/PurchaseOrder/GetById/" + id, "GET", true),
  add: async (data) => baseRequest(data, "/PurchaseOrder/Add", "POST", true),
  update: async (data) => baseRequest(data, "/PurchaseOrder/Update", "PUT", true),
  delete: async (id) =>   baseRequest(null, "/PurchaseOrder/Delete/" + id, "DELETE", true),
  getList: async (data) => baseRequest(data, "/PurchaseOrder/GetListForDashboard", "POST", true),
  show: async (id) =>    baseRequest(null, "/PurchaseOrder/Show/" + id, "GET", true),
  gePurchaseOrdersForCompany: async (id) =>  baseRequest(null, "/PurchaseOrder/GePurchaseOrdersForCompany/" + id, "GET", true),

};
