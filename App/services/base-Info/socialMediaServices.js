import baseRequest from "../baseRequest";

export const socialMediaServices = {
  getUserList: async (count) =>
    baseRequest(null, `/UserSocialMedia/getUserList/${count}`, "GET", false),


};
