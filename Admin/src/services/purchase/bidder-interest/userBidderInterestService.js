import baseRequest from "services/baseRequest";

export const userBidderInterestService = {
  getConfirmationCode: async (code) =>    baseRequest(null, "/UserBidderInterestRequest/getConfirmationCode/" + code, "GET", false),
  updateBidderInterestAvl: async (data) =>    baseRequest(data, "/UserBidderInterestRequest/UpdateBidderInterestAvl", "POST", false),

};
