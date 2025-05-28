import baseRequest from "../baseRequest";

export const userOpinionServices = {
  getByProductId: async (productId) =>
    baseRequest(null, "/UserOpinion/GetByProductId/" + productId, "GET", false),
  addUserOpinion: async (data) =>
    baseRequest(data, "/UserOpinion/Add", "POST", true),
    getByArticleId: async (articleId) =>
    baseRequest(null, "/UserOpinion/GetByArticleId/" + articleId, "GET", false),
};
