import baseRequest from "../baseRequest";

export const productServices = {
  getAllId: async (data) =>
    baseRequest(data, "/UserProduct/GetAllId", "GET", false),

  getAllTitle: async (data) =>
    baseRequest(data, "/UserProduct/GetAllTitle", "GET", false),

  getbyId: async (id) =>
    baseRequest(null, "/UserProduct/GetProductDetail/" + id, "GET", false),

  getbyId: async (id) =>
    baseRequest(null, "/UserProduct/GetProductDetail/" + id, "GET", false),

  getbyTitle: async (title) =>
    baseRequest(
      null,
      "/UserProduct/GetProductDetailByTitle/" + `${encodeURI(title)}`,
      "GET",
      false
    ),

  getUserSimilarProductById: async (id) =>
    baseRequest(
      null,
      "/UserProduct/GetUserSimilarProductById/" + `${encodeURI(title)}`,
      "GET",
      false
    ),

  getUserSimilarProductByTitle: async (title) =>
    baseRequest(
      null,
      "/UserProduct/GetUserSimilarProductByTitle/" + `${encodeURI(title)}`,
      "GET",
      false
    ),

  getAll: async (data) =>
    baseRequest(data, "/UserProduct/GetUserList", "POST", false),

  getProductsForParentItemsMegaMenu: async (data) =>
    baseRequest(
      data,
      "/UserProduct/GetProductsForParentItemsMegaMenu",
      "POST",
      false
    ),

  getTopNewProductList: async (count) =>
    baseRequest(
      null,
      "/UserProduct/GetTopNewProductList/" + count,
      "GET",
      false
    ),

  getTopSaleProductList: async (count) =>
    baseRequest(
      null,
      "/UserProduct/GetTopSaleProductList/" + count,
      "GET",
      false
    ),

  getTopVisitedProductList: async (count) =>
    baseRequest(
      null,
      "/UserProduct/GetTopVisitedProductList/" + count,
      "GET",
      false
    ),

  getSpecialOfferProductList: async (count) =>
    baseRequest(
      null,
      "/UserProduct/GetSpecialOfferProductList/" + count,
      "GET",
      false
    ),

  getSpecialOfferProductCount: async () =>
    baseRequest(null, "/UserProduct/GetSpecialOfferProductCount", "GET", false),

  addFavoriteProduct: async (data) =>
    baseRequest(data, "/Product/AddFavoriteProduct", "POST", true),

  getByIdFavoriteProduct: async (productId) =>
    baseRequest(
      null,
      "/Product/getByIdFavoriteProduct/" + productId,
      "GET",
      true
    ),
  getAllFavoriteProduct: async () =>
    baseRequest(null, "/Product/GetAllFavoriteProduct", "GET", true),
};
