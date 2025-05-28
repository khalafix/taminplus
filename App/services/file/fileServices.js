import baseRequest from "../baseRequest";

export const fileServices = {
  getById: async (id , companyType) =>
  companyType?  baseRequest(null, "/File/GetById/" + id + "/" + companyType, "GET", true) : baseRequest(null, "/File/GetById/" + id , "GET", true),
}
