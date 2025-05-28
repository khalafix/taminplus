import baseRequest from "../baseRequest";

export const videoServices = {
  getAll: async (data) => baseRequest(data, "/UserVideo/GetList", "POST",false),
  getById: async (id) =>
    baseRequest(null, "/UserVideo/GetById/" + id, "GET", false),
    getLastVideo: async (data) => baseRequest(data, "/UserVideo/GetLastVideo", "GET",false),
    getAllId: async () => baseRequest(null, "/UserVideo/GetAllId", "GET",false),

};
