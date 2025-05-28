import baseRequest from "./baseRequest";

export const organizationUnitService = {
  getAll: async (data) =>
    baseRequest(data, "/OrganizationUnit/GetList", "POST", true),
  get: async (id) =>
    baseRequest(null, "/OrganizationUnit/GetById/" + id, "GET", true),
  insert: async (data) =>
    baseRequest(data, "/OrganizationUnit/Add", "POST", true),
  update: async (data) =>
    baseRequest(data, "/OrganizationUnit/Update", "POST", true),
  delete: async (id) =>
    baseRequest(null, "/OrganizationUnit/Delete/" + id, "DELETE", true),
};
