import baseRequest from "../baseRequest";

export const contactFormServices = {

  add: async (data) =>
    baseRequest(data, "/UserContactForm/Add", "POST", true),

};
