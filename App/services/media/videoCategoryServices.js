import baseRequest from "../baseRequest";

export const videoCategoryServices = {
  getAll: async (data) =>
    baseRequest(data, "/UserVideoCategory/GetUserList", "GET", false),
  getById: async (id) =>
    baseRequest(null, "/UserVideoCategory/GetById/" + id, "GET", false),



};
