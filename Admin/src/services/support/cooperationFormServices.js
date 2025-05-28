import baseRequest from "../baseRequest";

export const cooperationFormServices = {
  getAll: async (data) =>
    baseRequest(data, "/CooperationForm/GetList", "POST", true),
  getById: async (id) =>
    baseRequest(null, "/CooperationForm/GetById/" + id, "GET", true),


};
