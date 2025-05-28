import baseRequest from "../baseRequest";

export const projectService = {
  getAll: async (data) => baseRequest(data, "/project/GetList", "POST", true),
  getById: async (id) =>
    baseRequest(null, "/project/GetById/" + id, "GET", true),
  add: async (data) => baseRequest(data, "/project/Add", "POST", true),
  update: async (data) => baseRequest(data, "/project/Update", "PUT", true),
  delete: async (id) =>
    baseRequest(null, "/project/Delete/" + id, "DELETE", true),
};
