import baseRequest from "./baseRequest";

export const organizationChartService = {
  getShowTree: async () =>
    baseRequest(null, "/OrganizationChart/ShowTree", "GET", true),
};
