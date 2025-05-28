import baseRequest from "../baseRequest";

export const pageServices = {
  getAll: async (data) =>
    baseRequest(data, "/Page/GetList", "POST", true),
  getById: async (id) =>
    baseRequest(null, "/Page/GetById/" + id, "GET", true),

  add: async (data) => baseRequest(data, "/Page/Add", "POST", true),
  update: async (data) =>
    baseRequest(data, "/Page/Update", "POST", true),
  delete: async (id) =>
    baseRequest(null, "/Page/Delete/" + id, "DELETE", true),


};
