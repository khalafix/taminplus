import baseRequest from "services/baseRequest";

export const bidderInterestService = {
  getInquiryMRCodes: async (projectId, disciplineId) => baseRequest(null, "/BidderInterestRequest/GetInquiryMRCodes/" + projectId + "/" + disciplineId, "GET", true),
  getAll: async (data) => baseRequest(data, "/BidderInterestRequest/GetList", "POST", true),
  getById: async (id) =>    baseRequest(null, "/BidderInterestRequest/GetById/" + id, "GET", true),
  add: async (data) => baseRequest(data, "/BidderInterestRequest/Add", "POST", true),
  update: async (data) => baseRequest(data, "/BidderInterestRequest/Update", "PUT", true),
  getListAvlForMrCodes: async (data) => baseRequest(data, "/BidderInterestRequest/GetListAvlForMrCodes", "POST", true),
  getBidderInterestRequestMRAvlAttchment: async (id) =>    baseRequest(null, "/BidderInterestRequest/GetBidderInterestRequestMRAvlAttchment/" + id, "GET", true),
  addBidderInterestRequestMRAvlAttchment: async (data) => baseRequest(data, "/BidderInterestRequest/AddBidderInterestRequestMRAvlAttchment", "POST", true),
  getEmailDescriptionForComapany: async (id) =>    baseRequest(null, "/BidderInterestRequest/GetEmailDescriptionForComapany/" + id, "GET", true),
  addEmailDescription: async (data) => baseRequest(data, "/BidderInterestRequest/addEmailDescription", "POST", true),
  sendEmailForCompany: async (data) => baseRequest(data, "/BidderInterestRequest/SendEmailForCompany", "POST", true),
  getHistoryEmailForCompany: async (id) =>    baseRequest(null, "/BidderInterestRequest/GetHistoryEmailForCompany/" + id, "GET", true),
  getListAvlForBidderInterestRequest: async (id) =>    baseRequest(null, "/BidderInterestRequest/GetListAvlForBidderInterestRequest/" + id, "GET", true),
  getEmailListForComapany: async (id) =>    baseRequest(null, "/BidderInterestRequest/GetEmailListForComapany/" + id, "GET", true),
  getAnswerEmailByComapany: async (id) =>    baseRequest(null, "/BidderInterestRequest/GetAnswerEmailByComapany/" + id, "GET", true),
  getBidderInterestForUser: async (id) =>    baseRequest(null, "/BidderInterestRequest/GetBidderInterestForUser/" + id, "GET", true),
  getBidderInterestForCompany: async (id) =>    baseRequest(null, "/BidderInterestRequest/GetBidderInterestForCompany/" + id, "GET", true),

};
