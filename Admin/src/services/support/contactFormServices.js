import baseRequest from "../baseRequest";

export const contactFormServices = {
  getAll: async (data) =>
    baseRequest(data, "/ContactForm/GetList", "POST", true),
  getById: async (id) =>
    baseRequest(null, "/ContactForm/GetById/" + id, "GET", true),


};
