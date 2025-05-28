import baseRequest from "../baseRequest";
//comment
export const customerService = {
  getAll: async (data) => baseRequest(data, "/Customer/GetCustomers", "post", true),
  getbyId: async (id) =>
    baseRequest(null, "/Customer/GetCustomerById/" + id, "get", true),
  add: async (data) => baseRequest(data, "/Customer/AddCustomer", "post", true),
  update: async (data) =>
    baseRequest(data, "/Customer/UpdateCustomer", "post", true),
  delete: async (id) =>
    baseRequest(null, "/Customer/DeleteCustomer/" + id, "delete", true),
 
};
