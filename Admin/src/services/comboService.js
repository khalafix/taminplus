import baseRequest, { setToken } from "./baseRequest";
import { useIntl, FormattedMessage } from "react-intl";

const comboStorageKey = "index-template-combo";

export const comboServices = {
  getOperatorTitle: (value) => {
    if (
      localStorage.getItem(comboStorageKey) &&
      value !== null &&
      value !== undefined
    ) {
      return JSON.parse(localStorage.getItem(comboStorageKey)).operators.find(
        (q) => q.value === value
      )?.text;
    }
    return "";
  },
  getIndexTemplateCombo: async () => {
    if (localStorage.getItem(comboStorageKey)) {
      return JSON.parse(localStorage.getItem(comboStorageKey));
    }
    const result = await baseRequest(
      null,
      "/ComboInfo/GetDropDownList",
      "get",
      true
    );
    if (result.isSuccess) {
      localStorage.setItem(comboStorageKey, JSON.stringify(result.data));
      return result.data;
    }
  },
  getFeatureCategory: async () => {

    const result = await baseRequest(null, "/ComboInfo/GetFeatureCategory", "get", true);
    if (result.isSuccess) {
      return result.data;
    }
  },


  getSmsType: async () => {

    const result = await baseRequest(null, "/ComboInfo/GetSmsType", "get", true);
    return result;
  },
  getSymbols: async () => {

    const result = await baseRequest(null, "/ComboInfo/GetSymbols", "get", true);
    if (result.isSuccess) {
      return result.data;
    }
  },

  getRolesCombo: async () => {

    const result = await baseRequest(null, "/ComboInfo/GetRolesCombo", "get", true);
    return result;
  },
  getDeliveryType: async () => {

    const result = await baseRequest(null, "/ComboInfo/GetDeliveryType", "get", true);
    return result;
  },
  getCities: async (id) => {

    const result = await baseRequest(null, "/ComboInfo/GetCities/"+id, "get", true);
    return result;
  },
  getOrderStatus: async () => {

    const result = await baseRequest(null, "/ComboInfo/GetOrderStatus", "get", true);
    return result;
  },

  getShowStatus: async () => {

    const result = await baseRequest(null, "/ComboInfo/GetShowStatus", "get", true);
    return result;
  },


  getUserOpinionType: async () => {

    const result = await baseRequest(null, "/ComboInfo/getUserOpinionType", "get", true);
    return result;
  },

  getPagesLinkTypes: async () => {

    const result = await baseRequest(null, "/ComboInfo/GetPagesLinkTypes", "get", true);
    return result.data;
  },

  getPositionPlace: async () => {

    const result = await baseRequest(null, "/ComboInfo/GetPositionPlace", "get", true);
    return result;
  },

  getSaleStatus: async () => {

    const result = await baseRequest(null, "/ComboInfo/GetSaleStatus", "get", true);
    return result;
  },
  getUserTypes: async () => {

    const result = await baseRequest(null, "/ComboInfo/GetUserTypes", "get", true);
    return result.data;
  },
  getProvince: async () => {

    const result = await baseRequest(null, "/ComboInfo/GetProvince", "get", true);
    return result;
  },
  getCountType: async () => {

    const result = await baseRequest(null, "/ComboInfo/GetCountType", "get", true);
    return result;
  },
  getArticles: async (id) => {

    const result = await baseRequest(null, "/ComboInfo/GetArticles/"+id, "get", true);
    return result.data;
  },
  getVideos: async (id) => {

    const result = await baseRequest(null, "/ComboInfo/GetVideos/"+id, "get", true);
    return result.data;
  },
  getOrganizationUnits: async () => {

    const result = await baseRequest(null, "/ComboInfo/GetOrganizationUnits", "get", true);
    if (result.isSuccess) {
      return result.data;
    }
  },
  getOrigins: async () => {

    const result = await baseRequest(null, "/ComboInfo/GetOrigins", "get", true);
    if (result.isSuccess) {
      return result.data;
    }
  },
  getProducts: async (id) => {

    const result = await baseRequest(null, "/ComboInfo/GetProducts/"+id, "get", true);
    if (result.isSuccess) {
      return result.data;
    }
  },
  getBrands: async () => {

    const result = await baseRequest(null, "/ComboInfo/GetBrands", "get", true);
    if (result.isSuccess) {
      return result.data;
    }
  },
  getArticleCategory: async () => {

    const result = await baseRequest(null, "/ComboInfo/GetArticleCategory", "get", true);
    if (result.isSuccess) {
      return result.data;
    }
  },
  getVideoSource: async () => {

    const result = await baseRequest(null, "/ComboInfo/GetVideoSource", "get", true);
    if (result.isSuccess) {
      return result.data;
    }
  },
  getVideoCategory: async () => {

    const result = await baseRequest(null, "/ComboInfo/getVideoCategory", "get", true);
    if (result.isSuccess) {
      return result.data;
    }
  },
};
