import baseRequest from "../baseRequest";

export const videoServices = {
  getAll: async (data) =>
    baseRequest(data, "/Video/GetList", "POST", true),
  getById: async (id) =>
    baseRequest(null, "/Video/GetById/" + id, "GET", true),

  add: async (data) => baseRequest(data, "/Video/Add", "POST", true),
  update: async (data) =>
    baseRequest(data, "/Video/Update", "POST", true),
  delete: async (id) =>
    baseRequest(null, "/Video/Delete/" + id, "DELETE", true),


};
