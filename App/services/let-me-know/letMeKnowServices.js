import baseRequest from "../baseRequest";

export const letMeKnowServices = {

  registerWithToken: async (data) =>
    baseRequest(data, "/LetMeKnow/Register", "POST", true),

    register: async (data) =>
    baseRequest(data, "/UserLetMeKnow/Register", "POST", false),
};
