import baseRequest from "../baseRequest";

export const videoCategoryServices = {
  getAll: async (data) =>
    baseRequest(data, "/VideoCategory/GetList", "POST", true),
  getById: async (id) =>
    baseRequest(null, "/VideoCategory/GetById/" + id, "GET", true),

  add: async (data) => baseRequest(data, "/VideoCategory/Add", "POST", true),
  update: async (data) =>
    baseRequest(data, "/VideoCategory/Update", "POST", true),
  delete: async (id) =>
    baseRequest(null, "/VideoCategory/Delete/" + id, "DELETE", true),


};
