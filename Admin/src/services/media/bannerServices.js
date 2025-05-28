import baseRequest from "../baseRequest";

export const bannerServices = {
  getAll: async (data) =>
    baseRequest(data, "/Banner/GetList", "POST", true),
  getById: async (id) =>
    baseRequest(null, "/Banner/GetById/" + id, "GET", true),

  add: async (data) => baseRequest(data, "/Banner/Add", "POST", true),
  update: async (data) =>
    baseRequest(data, "/Banner/Update", "POST", true),
  delete: async (id) =>
    baseRequest(null, "/Banner/Delete/" + id, "DELETE", true),


};
