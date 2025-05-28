import baseRequest from "../baseRequest";

export const articleCategoryServices = {
  getAll: async (data) =>
    baseRequest(data, "/UserArticleCategory/GetUserList", "GET", false),
  getById: async (id) =>
    baseRequest(null, "/UserArticleCategory/GetById/" + id, "GET", false),



};
