import baseRequest from "../baseRequest";

export const sliderServices = {
  getAll: async (data) =>
    baseRequest(data, "/Slider/GetList", "POST", true),
  getById: async (id) =>
    baseRequest(null, "/Slider/GetById/" + id, "GET", true),

  add: async (data) => baseRequest(data, "/Slider/Add", "POST", true),
  update: async (data) =>
    baseRequest(data, "/Slider/Update", "POST", true),
  delete: async (id) =>
    baseRequest(null, "/Slider/Delete/" + id, "DELETE", true),


};
