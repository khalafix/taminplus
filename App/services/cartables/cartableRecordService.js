import baseRequest from "../baseRequest";

export const cartableRecordService = {
    getList: async () => baseRequest(null, "/CartableRecord/GetList", "GET", true),
    update: async (id) => baseRequest(null, "/CartableRecord/update/"+id, "POST", true),

};

