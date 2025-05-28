import baseRequest from "../baseRequest";

export const pageServices = {

  getByTitle: async (title) =>
    baseRequest(null, `/UserPage/GetByTitle/${encodeURI(title)}`, "GET", false),

    getAllLink: async () =>
    baseRequest(null, "/UserPage/GetAllLink", "GET", false),

    getListUserPages: async () =>
    baseRequest(null, "/UserPage/GetListUserPages", "GET", false),
};
