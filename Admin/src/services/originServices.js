import baseRequest from "./baseRequest";

export const originServices = {
  getAll: async (data) => baseRequest(data, "/Origin/GetList", "POST", true),
  getById: async (id) =>
    baseRequest(null, "/Origin/GetById/" + id, "GET", true),
  add: async (data) => baseRequest(data, "/Origin/Add", "POST", true),
  update: async (data) => baseRequest(data, "/Origin/Update", "PUT", true),
  delete: async (id) =>
    baseRequest(null, "/Origin/Delete/" + id, "DELETE", true),
};
