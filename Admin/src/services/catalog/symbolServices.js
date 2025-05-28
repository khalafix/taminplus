import baseRequest from "../baseRequest";

export const symbolServices = {
  getAll: async (data) => baseRequest(data, "/Symbol/GetList", "POST", true),
  getById: async (id) =>
    baseRequest(null, "/Symbol/GetById/" + id, "GET", true),
  add: async (data) => baseRequest(data, "/Symbol/Add", "POST", true),
  update: async (data) => baseRequest(data, "/Symbol/Update", "PUT", true),
  delete: async (id) =>
    baseRequest(null, "/Symbol/Delete/" + id, "DELETE", true),
    getTree: async () =>
    baseRequest(null, "/Symbol/GetTree" , "GET", true),
};
