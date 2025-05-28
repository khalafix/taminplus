import { contextType } from "react-grid-layout";
import baseRequest from "../baseRequest";

export const productServices = {
  getListUserLogSearchForProduct: async (data) => baseRequest(data, "/Product/GetListUserLogSearchForProduct", "POST", true),
  exportToExcelForUserLogSearch: async (data) => baseRequest(data, "/Product/GetListUserLogSearchForExcel", "POST", true, false, null, null, false, null, null, null, true),
  importPriceListWithExcel: async (data) => baseRequest(data, "/Product/ImportPriceListWithExcel", "POST",  true),

  getAll: async (data) => baseRequest(data, "/Product/GetList", "POST", true),
  exportToExcel: async (data) => baseRequest(data, "/Product/GetListForExcel", "POST", true, false, null, null, false, null, null, null, true),
  getById: async (id) =>
    baseRequest(null, "/Product/GetById/" + id, "GET", true),
  getAllWithCategoryId: async (id) =>
    baseRequest(null, "/Product/GetListWithCategory/" + id, "POST", true),
  add: async (data) => baseRequest(data, "/Product/Add", "POST", true),
  update: async (data) => baseRequest(data, "/Product/Update", "POST", true),
  delete: async (id) =>
    baseRequest(null, "/Product/Delete/" + id, "DELETE", true),
  deleteAttachment: async (id) =>
    baseRequest(null, "/Product/DeleteAttachment/" + id, "DELETE", true),
  getProductAttachment: async (id) =>
    baseRequest(null, "/Product/GetProductAttachment/" + id, "GET", true),
  updateProductAttachment: async (data) => baseRequest(data, "/Product/UpdateProductAttachment", "POST", true),

  addArticleProduct: async (data) => baseRequest(data, "/Product/AddArticleProduct", "POST", true),
  getArticleProductById: async (id) =>
    baseRequest(null, "/Product/GetArticleProductById/" + id, "GET", true),

  addVideoProduct: async (data) => baseRequest(data, "/Product/AddVideoProduct", "POST", true),
  getVideoProductById: async (id) =>
    baseRequest(null, "/Product/GetVideoProductById/" + id, "GET", true),

  addSimilarProduct: async (data) => baseRequest(data, "/Product/AddSimilarProduct", "POST", true),
  getSimilarProductById: async (id) =>
    baseRequest(null, "/Product/GetSimilarProductById/" + id, "GET", true),

    getFinancialProductList: async (id) => baseRequest(null, "/Product/GetFinancialProductList/"+id, "GET", true),
    getFinancialProductById: async (id) =>
    baseRequest(null, "/Product/GetFinancialProductById/" + id, "GET", true),
    updateFinancialProduct: async (data) => baseRequest(data, "/Product/UpdateFinancialProduct", "POST", true),


    getDeliveryProduct: async (data) =>
    baseRequest(data, "/Product/GetDeliveryProduct", "POST", true),

    getDeliveryProductById: async (id) =>
    baseRequest(null, "/Product/GetDeliveryProductById/" + id, "GET", true),

    updateDeliveryProduct: async (data) => baseRequest(data, "/Product/UpdateDeliveryProduct", "POST", true),
    addDeliveryProduct: async (data) => baseRequest(data, "/Product/AddDeliveryProduct", "POST", true),

    deleteDeliveryProduct: async (id) =>
    baseRequest(null, "/Product/DeleteDeliveryProduct/" + id, "DELETE", true),


};
