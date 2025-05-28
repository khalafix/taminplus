import baseRequest from "../baseRequest";

export const deliveryLocationService = {             
  getAll: async (data) => baseRequest(data, "/DeliveryLocation/GetList", "POST", true),
  getById: async (id) => baseRequest(null, "/DeliveryLocation/GetById/" + id, "GET", true),
  getForCombo: async () => baseRequest(null, "/DeliveryLocation/GetForCombo" , "GET", true),
  add: async (data) => baseRequest(data, "/DeliveryLocation/Add", "POST", true),
  update: async (data) => baseRequest(data, "/DeliveryLocation/Update", "PUT", true),
  delete: async (id) =>
    baseRequest(null, "/DeliveryLocation/Delete/" + id, "DELETE", true),
};
