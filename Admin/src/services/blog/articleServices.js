import baseRequest from "../baseRequest";

export const articleServices = {
  getAll: async (data) => baseRequest(data, "/Article/GetList", "POST", true),
  getById: async (id) =>
    baseRequest(null, "/Article/GetById/" + id, "GET", true),
  add: async (data) => baseRequest(data, "/Article/Add", "POST", true),
  update: async (data) => baseRequest(data, "/Article/Update", "POST", true),
  delete: async (id) =>
    baseRequest(null, "/Article/Delete/" + id, "DELETE", true),

  
};
