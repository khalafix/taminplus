import baseRequest from "../baseRequest";

export const newsLetterServices = {

  registerWithToken: async (data) =>
    baseRequest(data, "/NewsLetter/Register", "POST", true),

    register: async (data) =>
    baseRequest(data, "/UserNewsLetter/Register", "POST", false),
};
