import baseRequest from "../baseRequest";

export const bannerServices = {
  getAll: async (positionPlace) =>
    baseRequest(null, "/UserBanner/GetUserList/"+positionPlace, "GET", false),
};
