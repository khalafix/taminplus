import baseRequest from "../baseRequest";

export const userMessageService = {
    getList: async () => baseRequest(null, "/UserMessage/GetList", "POST", true),
    getOutbox:async (data) => baseRequest(data, "/UserMessage/GetOutbox", "POST", true),
    getInbox:async (data) => baseRequest(data, "/UserMessage/GetInbox", "POST", true),
    getNewMessageCount:async (data) => baseRequest(null, "/UserMessage/GetNewMessageCount", "GET", true),
    updateMessageStatus:async (data) => baseRequest(null, "/UserMessage/UpdateMessageVisitedStatus/"+data, "GET", true),
};

