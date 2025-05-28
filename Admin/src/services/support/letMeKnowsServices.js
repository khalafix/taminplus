import baseRequest from "../baseRequest";

export const letMeKnowsServices = {
  getAll: async (data) => baseRequest(data, "/LetMeKnow/GetList", "POST", true),
  ExcelReport: async (data) => baseRequest(data, "/LetMeKnow/ExcelReport", "POST", true),
  exportToExcel: async (data) => baseRequest(data, "/LetMeKnow/GetListForExcel", "POST", true, false, null, null, false, null, null, null, true),



  
};
