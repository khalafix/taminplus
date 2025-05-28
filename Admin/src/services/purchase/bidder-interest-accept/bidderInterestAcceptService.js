import baseRequest from "services/baseRequest";

export const bidderInterestAcceptService = {
  getInquiryMRCodes: async (projectId, disciplineId) => baseRequest(null, "/BidderInterestAcceptRequest/GetInquiryMRCodes/" + projectId + "/" + disciplineId, "GET", true),
  getAll: async (data) => baseRequest(data, "/BidderInterestAcceptRequest/GetList", "POST", true),
  getById: async (id) =>    baseRequest(null, "/BidderInterestAcceptRequest/GetById/" + id, "GET", true),
  add: async (data) => baseRequest(data, "/BidderInterestAcceptRequest/Add", "POST", true),
  update: async (data) => baseRequest(data, "/BidderInterestAcceptRequest/Update", "PUT", true),
  getListAvlForMrCodes: async (data) => baseRequest(data, "/BidderInterestAcceptRequest/GetListAvlForMrCodes", "POST", true),
  getBidderInterestRequestAcceptMRAvlAttchment: async (id) =>    baseRequest(null, "/BidderInterestAcceptRequest/GetBidderInterestAcceptRequestMRAvlAttchment/" + id, "GET", true),
  addBidderInterestAcceptRequestMRAvlAttchment: async (data) => baseRequest(data, "/BidderInterestAcceptRequest/AddBidderInterestAcceptRequestMRAvlAttchment", "POST", true),
  getEmailDescriptionForComapany: async (id) =>    baseRequest(null, "/BidderInterestAcceptRequest/GetEmailDescriptionForComapany/" + id, "GET", true),
  addEmailDescription: async (data) => baseRequest(data, "/BidderInterestAcceptRequest/AddEmailDescription", "POST", true),
  sendEmailForCompany: async (data) => baseRequest(data, "/BidderInterestAcceptRequest/SendEmailForCompany", "POST", true),
  getHistoryEmailForCompany: async (id) =>    baseRequest(null, "/BidderInterestAcceptRequest/GetHistoryEmailForCompany/" + id, "GET", true),
  getListAvlForBidderInterestRequestAccept: async (id) =>    baseRequest(null, "/BidderInterestAcceptRequest/GetListAvlForBidderInterestRequestAccept/" + id, "GET", true),
  getEmailListForComapany: async (id) =>    baseRequest(null, "/BidderInterestAcceptRequest/GetEmailListForComapany/" + id, "GET", true),
  getShortListFromBidderInterestAccept: async (data) => baseRequest(data, "/BidderInterestAcceptRequest/GetShortListFromBidderInterestAccept", "POST", true),
  getShortListFromBidderInterestAcceptDetails: async (id) =>    baseRequest(null, "/BidderInterestAcceptRequest/GetShortListFromBidderInterestAcceptDetails/" + id, "GET", true),

};
