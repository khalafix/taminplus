import baseRequest from "../baseRequest";

export const userOpinionsServices = {
  getAll: async (data) => baseRequest(data, "/UserOpinion/GetAll", "POST", true),
  getById: async (id) =>
    baseRequest(null, "/UserOpinion/GetById/" + id, "GET", true),
  update: async (data) => baseRequest(data, "/UserOpinion/Update", "PUT", true),


  
};
