import baseRequest from "../baseRequest";

export const articleCategoryServices = {
  getAll: async (data) =>
    baseRequest(data, "/ArticleCategory/GetList", "POST", true),
  getById: async (id) =>
    baseRequest(null, "/ArticleCategory/GetById/" + id, "GET", true),

  add: async (data) => baseRequest(data, "/ArticleCategory/Add", "POST", true),
  update: async (data) =>
    baseRequest(data, "/ArticleCategory/Update", "POST", true),
  delete: async (id) =>
    baseRequest(null, "/ArticleCategory/Delete/" + id, "DELETE", true),


};
