import baseRequest from "services/baseRequest";

export const bidderInterestInvitationService = {
  getAll: async (data) => baseRequest(data, "/BidderInterestInvitationRequest/GetList", "POST", true),
  getById: async (id) =>    baseRequest(null, "/BidderInterestInvitationRequest/GetById/" + id, "GET", true),
  add: async (data) => baseRequest(data, "/BidderInterestInvitationRequest/Add", "POST", true),
  update: async (data) => baseRequest(data, "/BidderInterestInvitationRequest/Update", "PUT", true),
  getBidderInterestInvitationRequestAvlAttchment: async (id) =>    baseRequest(null, "/BidderInterestInvitationRequest/GetBidderInterestInvitationRequestAvlAttchment/" + id, "GET", true),
  addBidderInterestInvitationRequestAvlAttchment: async (data) => baseRequest(data, "/BidderInterestInvitationRequest/AddBidderInterestInvitationRequestAvlAttchment", "POST", true),
  getEmailDescriptionForComapany: async (id) =>    baseRequest(null, "/BidderInterestInvitationRequest/GetEmailDescriptionForComapany/" + id, "GET", true),
  addEmailDescription: async (data) => baseRequest(data, "/BidderInterestInvitationRequest/addEmailDescription", "POST", true),
  sendEmailForCompany: async (data) => baseRequest(data, "/BidderInterestInvitationRequest/SendEmailForCompany", "POST", true),
  getHistoryEmailForCompany: async (id) =>    baseRequest(null, "/BidderInterestInvitationRequest/GetHistoryEmailForCompany/" + id, "GET", true),
  getEmailListForComapany: async (id) =>    baseRequest(null, "/BidderInterestInvitationRequest/GetEmailListForComapany/" + id, "GET", true),
  getAnswerEmailByComapany: async (id , bidderInterestInvitationRequestAvlCompanyId) =>    baseRequest(null, "/BidderInterestInvitationRequest/GetAnswerEmailByComapany/" + id +"/"+bidderInterestInvitationRequestAvlCompanyId, "GET", true),
  replyEmailAvl: async (data) =>    baseRequest(data, "/BidderInterestInvitationRequest/ReplyEmailAvlByOprator" , "PUT", true),
  getAnswerEmailByOprator: async (id) =>    baseRequest(null, "/BidderInterestInvitationRequest/getAnswerEmailByOprator/" + id , "GET", true),
  getBidderInterestInvitationtForUser: async (companyId) =>    baseRequest(null, "/BidderInterestInvitationRequest/GetBidderInterestInvitationtForUser/" + companyId , "GET", true),
  replyEmailByCompany: async (data) => baseRequest(data, "/BidderInterestInvitationRequest/ReplyEmailByCompany", "POST", true),
  updateVisitedEmailByCompany: async (id) =>    baseRequest(null, "/BidderInterestInvitationRequest/updateVisitedEmailByCompany/" + id , "GET", true),
  sendEmailForOneItemForAnswer: async (data) => baseRequest(data, "/BidderInterestInvitationRequest/SendEmailForOneItemForAnswer", "POST", true),
  getBidderInterestInvitationtForCompany: async (companyId) =>    baseRequest(null, "/BidderInterestInvitationRequest/GetBidderInterestInvitationtForCompany/" + companyId , "GET", true),

};
