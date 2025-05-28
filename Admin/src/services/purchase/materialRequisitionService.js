import baseRequest from "../baseRequest";

export const materialRequisitionService = {
  getAll: async (data) => baseRequest(data, "/MaterialRequisition/GetList", "POST", true),
  getById: async (id) =>    baseRequest(null, "/MaterialRequisition/GetById/" + id, "GET", true),
  show: async (id) =>    baseRequest(null, "/MaterialRequisition/Show/" + id, "GET", true),
 getMRCodes: async (projectId) =>  baseRequest(null, "/MaterialRequisition/GetMRCodes/" + projectId , "GET", true),
  add: async (data) => baseRequest(data, "/MaterialRequisition/Add", "POST", true),
  update: async (data) => baseRequest(data, "/MaterialRequisition/Update", "PUT", true),
  delete: async (id) =>
    baseRequest(null, "/MaterialRequisition/Delete/" + id, "DELETE", true),
    getList: async (data) => baseRequest(data, "/MaterialRequisition/GetListForDashboard", "POST", true),
};
