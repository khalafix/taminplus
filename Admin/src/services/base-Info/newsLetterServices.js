import baseRequest from "../baseRequest";

export const newsLetterServices = {
  getAll: async (data) =>
    baseRequest(data, "/NewsLetter/GetList", "POST", true),
    getUserRegisterNewsLetter: async (data) =>
    baseRequest(data, "/NewsLetter/GetUserRegisterNewsLetter", "POST", true),
  getById: async (id) =>
    baseRequest(null, "/NewsLetter/GetById/" + id, "GET", true),

  add: async (data) => baseRequest(data, "/NewsLetter/Add", "POST", true),
  update: async (data) =>
    baseRequest(data, "/NewsLetter/Update", "PUT", true),
  delete: async (id) =>
    baseRequest(null, "/NewsLetter/Delete/" + id, "DELETE", true),


};
