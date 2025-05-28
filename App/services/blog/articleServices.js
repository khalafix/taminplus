import baseRequest from "../baseRequest";

export const articleServices = {
  getAll: async (data) => baseRequest(data, "/UserArticle/GetList", "POST",false),
  getById: async (id) =>
    baseRequest(null, "/UserArticle/GetById/" + id, "GET", false),
    getLastArticle: async (data) => baseRequest(data, "/UserArticle/GetLastArticle", "GET",false),
    getAllId: async () => baseRequest(null, "/UserArticle/GetAllId", "GET",false),

  
};
