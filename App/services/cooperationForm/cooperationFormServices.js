import baseRequest from "../baseRequest";

export const cooperationFormServices = {

  add: async (data) =>
    baseRequest(data, "/UserCooperationForm/Add", "POST", true),

};
