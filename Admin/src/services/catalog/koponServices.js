import baseRequest from "../baseRequest";

export const koponServices = {
  getAll: async (data) =>
    baseRequest(data, "/Kopon/GetList", "POST", true),
  getById: async (id) =>
    baseRequest(null, "/Kopon/GetById/" + id, "GET", true),

  add: async (data) => baseRequest(data, "/Kopon/Add", "POST", true),
  update: async (data) =>
    baseRequest(data, "/Kopon/Update", "POST", true),
  delete: async (id) =>
    baseRequest(null, "/Kopon/Delete/" + id, "DELETE", true),


};
