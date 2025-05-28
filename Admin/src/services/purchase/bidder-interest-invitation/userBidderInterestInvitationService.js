import baseRequest from "services/baseRequest";

export const userBidderInterestInvitationService = {
  getWithConfirmationCode: async (code) =>    baseRequest(null, "/UserBidderInterestInvitationRequest/GetWithConfirmationCode/" + code, "GET", false),
  updateBidderInterestAvl: async (data) =>    baseRequest(data, "/BidderInterestInvitationRequest/RegisterInvitationUserAnswer", "POST", false),
};
