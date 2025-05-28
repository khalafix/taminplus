import baseRequest from "../baseRequest";

export const productCategoryServices = {
  getAll: async () =>
    baseRequest(null, "/ProductCategory/GetTree", "GET", false),

  getById: async (id) =>
    baseRequest(null, "/ProductCategory/GetById/" + id, "GET", false),


  getUserList: async (count) =>
    baseRequest(null, "/UserProductCategory/GetUserList/" + count, "GET", false),

    getUserAllList: async () =>
    baseRequest(null, "/UserProductCategory/GetUserAllList", "GET", false),

    getCategoriesForMegaMenu: async (count) =>
    baseRequest(null, "/UserProductCategory/GetCategoriesForMegaMenu", "GET", false),



    getFeaturesForSearch: async (id) =>
    baseRequest(null, "/UserProductCategory/GetFeaturesForSearch/" + id, "GET", false),



    getUserByParentId: async (count , category) =>
    baseRequest(null, "/UserProductCategory/GetUserByParentId/" + count +"/"+`${encodeURI(category)}`, "GET", false),


    getUserById: async (id) =>
    baseRequest(null, "/UserProductCategory/getUserById/" + id, "GET", false),

    getFeatureOptionByCategoryId: async (categoryId ) =>
    baseRequest(null, "/UserProductCategory/GetFeatureOptionByCategoryId/" + categoryId  , "GET", false),

    getFeatureOptionByCategory: async (category ) =>
    baseRequest(null, "/UserProductCategory/GetFeatureOptionByCategory/" + `${encodeURI(category)}`  , "GET", false),



    getCategoryByParentId: async (category ) =>
    baseRequest(null, "/UserProductCategory/GetCategoryByParentId/" + `${encodeURI(category)}`  , "GET", false),

    getCategoryWithBrands: async (category ) =>
    baseRequest(null, "/UserProductCategory/GetCategoryWithBrands/" + `${encodeURI(category)}`  , "GET", false),

    getFeaturesByCategoryId: async (categoryId , brandId) =>
    baseRequest(null, "/UserProductCategory/getFeaturesByCategoryId/" + categoryId + "/" +brandId , "GET", false),

    getFeaturesByCategoryAndBrand: async (category , brand) =>
    baseRequest(null, "/UserProductCategory/GetFeaturesByCategoryAndBrand/" +`${encodeURI(category)}`  + "/" +`${encodeURI(brand)}` , "GET", false),


    getSubCategoryByCategoryAndBrand: async (category , brand) =>
    baseRequest(null, "/UserProductCategory/GetSubCategoryByCategoryAndBrand/" +`${encodeURI(category)}`  + "/" +`${encodeURI(brand)}` , "GET", false),

    getFeaturesBySubCategoryIdAndBrand: async (category , brand , subCategory) =>
    baseRequest(null, "/UserProductCategory/GetFeaturesBySubCategoryIdAndBrand/" +`${encodeURI(category)}`  + "/" +`${encodeURI(brand)}` + "/"+`${encodeURI(subCategory)}` , "GET", false),




    getCategoryWithBrands: async (title) =>
    baseRequest(null, `/UserProductCategory/GetCategoryWithBrands/${encodeURI(title)}`, "GET", false),


    getFeaturesByTitle: async (category) => baseRequest(null, "/UserProductCategory/GetFeaturesByTitle/" +  `${encodeURI(category)}`, "GET", false),
   

    // getFeatureOptionByCategory: async (category) => baseRequest(null, "/UserProductCategory/GetFeatureOptionByCategory/" +  `${encodeURI(category)}`, "GET", false),

};
