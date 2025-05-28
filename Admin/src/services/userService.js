import baseRequest, { setToken } from "./baseRequest";
//comment
export const userService = {
  getUsers: async (data) => baseRequest(data, "/user/GetUser", "get", true),
  getuserbyId: async (id) =>
    baseRequest(null, "/user/GetUserById/" + id, "get", true),
  addUser: async (data) => baseRequest(data, "/user/AddUser", "post", true),
  updateUser: async (data) =>
    baseRequest(data, "/user/UpdateUser", "post", true),
  deleteUser: async (id) =>
    baseRequest(null, "/user/DeleteUser/" + id, "delete", true),
  getRoles: async (data) => baseRequest(data, "/Role/GetTree", "get", true),
  getRoleById: async (id) =>
    baseRequest(null, "/Role/GetById/" + id, "get", true),
  addRole: async (data) => baseRequest(data, "/Role/Add", "post", true),
  updateRole: async (data) => baseRequest(data, "/Role/Update", "post", true),
  deleteRole: async (id) =>
    baseRequest(null, "/Role/Delete/" + id, "delete", true),
  updatePassword: async (data) =>
    baseRequest(data, "/user/UpdatePassword", "post", true),
  changePassword: async (data) =>
    baseRequest(data, "/user/ChangePassword", "post", true),
    changeEmailSignature: async (data) =>
    baseRequest(data, "/user/ChangeEmailSignature", "post", true),
    
  getRolePermissions: async (roleId) =>
    baseRequest(null, "/Role/GetRolePermissions/" + roleId, "get", true),
  updateRolePermissions: async (data) =>
    baseRequest(
      data.body,
      "/Role/UpdateRolePermissions/" + data.roleId,
      "post",
      true
    ),
  getRoleDashboards: async (roleId) =>
    baseRequest(null, "/Role/GetRoleDashboards/" + roleId, "get", true),
  updateRoleDashboards: async (data) =>
    baseRequest(
      data.body,
      "/Role/UpdateRoleDashboards/" + data.roleId,
      "post",
      true
    ),
  getDisciplines: async (roleId) =>
    baseRequest(null, "/Role/GetDisciplines/" + roleId, "get", true),
  getDisciplinesWithOrganizationUnits: async (data) =>
    baseRequest(
      data,
      "/Role/GetDisciplinesWithOrganizationUnits",
      "post",
      true
    ),
  getCurrentUser: async () =>baseRequest(null, "/user/GetCurrentUser", "get", true),
  getEmailSignuature: async () =>baseRequest(null, "/user/GetEmailSignuature", "get", true),
  getListForCombo: async () =>
    baseRequest(null, "/user/GetListForCombo", "POST", true),
  getUsersInfoForCombo: async () =>
    baseRequest(null, "/user/GetUsersInfoForCombo", "POST", true),
};
