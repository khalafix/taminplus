import baseRequest from "../baseRequest";

export const socialMediaServices = {
  getAll: async (data) =>
    baseRequest(data, "/SocialMedia/GetList", "POST", true),
  getById: async (id) =>
    baseRequest(null, "/SocialMedia/GetById/" + id, "GET", true),

  add: async (data) => baseRequest(data, "/SocialMedia/Add", "POST", true),
  update: async (data) =>
    baseRequest(data, "/SocialMedia/Update", "PUT", true),
  delete: async (id) =>
    baseRequest(null, "/SocialMedia/Delete/" + id, "DELETE", true),


};
