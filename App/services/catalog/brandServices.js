import baseRequest from "../baseRequest";

export const brandServices = {

  getUserList: async (count) =>
    baseRequest(null, "/UserBrand/GetUserList/" + count, "GET", false),

    getBrandMenu: async () =>
    baseRequest(null, "/UserBrand/GetBrandMenu", "GET", false),

    getAllBrandMegaMenu: async () =>
    baseRequest(null, "/UserBrand/GetAllBrandMegaMenu", "GET", false),

    getUserProductCategoryByBrandId: async (brandId) =>
    baseRequest(null, "/UserBrand/GetUserProductCategoryByBrandId/" + brandId, "GET", false),

    getUserProductCategoryByBrandTitle: async (brand) =>
    baseRequest(null, "/UserBrand/GetUserProductCategoryByBrandTitle/" + `${encodeURI(brand)}`, "GET", false),

    getUserListByProductCategoryId: async (category) =>
    baseRequest(null, "/UserBrand/GetUserListByProductCategoryId/" + `${encodeURI(category)}`, "GET", false),
};
