import baseRequest from "../baseRequest";

export const cityServices = {
  getAll: async (data) =>
    baseRequest(data, "/City/GetList", "POST", true),
  getById: async (id) =>
    baseRequest(null, "/City/GetById/" + id, "GET", true),

  add: async (data) => baseRequest(data, "/City/Add", "POST", true),
  update: async (data) =>
    baseRequest(data, "/City/Update", "PUT", true),
  delete: async (id) =>
    baseRequest(null, "/City/Delete/" + id, "DELETE", true),


};
