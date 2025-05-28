import baseRequest from "../baseRequest";

export const orderServices = {
  getAll: async (data) => baseRequest(data, "/Order/GetList", "POST", true),
  getById: async (id) =>
    baseRequest(null, "/Order/GetById/" + id, "GET", true),
  update: async (data) => baseRequest(data, "/Order/Update", "PUT", true),
  exportToExcel: async (data) => baseRequest(data, "/Order/GetListForExcel", "POST", true, false, null, null, false, null, null, null, true),

};
