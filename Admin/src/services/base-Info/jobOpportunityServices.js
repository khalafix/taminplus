import baseRequest from "../baseRequest";

export const jobOpportunityServices = {
  getAll: async (data) =>
    baseRequest(data, "/JobOpportunity/GetList", "POST", true),
  getById: async (id) =>
    baseRequest(null, "/JobOpportunity/GetById/" + id, "GET", true),

  add: async (data) => baseRequest(data, "/JobOpportunity/Add", "POST", true),
  update: async (data) =>
    baseRequest(data, "/JobOpportunity/Update", "PUT", true),
  delete: async (id) =>
    baseRequest(null, "/JobOpportunity/Delete/" + id, "DELETE", true),


};
