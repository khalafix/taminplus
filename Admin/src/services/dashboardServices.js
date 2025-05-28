import baseRequest from "./baseRequest";

export const dashboardServices = {
  getCountData: async () => baseRequest(null, "/Dashboard/GetCountData", "GET", true),

  };
