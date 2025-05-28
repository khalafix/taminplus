import baseRequest from "../baseRequest";

export const emailTemplateService = {
  getAll: async (data) => baseRequest(data, "/EmailTemplate/GetList", "POST", true),
  getById: async (id) => baseRequest(null, "/EmailTemplate/GetById/" + id, "GET", true),
  resetTemplate: async (id) => baseRequest(null, "/EmailTemplate/ResetTemplate/" + id, "GET", true),
  getTemplateTypes: async () => baseRequest(null, "/EmailTemplate/GetForCombo", "GET", true),
  add: async (data) => baseRequest(data, "/EmailTemplate/Add", "POST", true),
  update: async (data) => baseRequest(data, "/EmailTemplate/Update", "PUT", true),
  delete: async (id) => baseRequest(null, "/EmailTemplate/Delete/" + id, "DELETE", true),
};
