const initialState = {
  isLogin: false,
  isCompany: false,
  userName: "",
  sidebarCollapsed: false,
  chartTheme: "kelly",
};

const settings = (state = initialState, { type, payload, ...rest }) => {
  switch (type) {
    case "login":
      return {
        ...state,
        isLogin: payload.isLogin,
        isCompany: payload.isCompany,
        sidebarCollapsed: false,
        ...rest,
      };
    case "logout":
      return { ...state, isLogin: false, userName: "", ...rest };
    case "sidebar":
      return { ...state, sidebarCollapsed: !state.sidebarCollapsed, ...rest };
    case "chartTheme":
      return { ...state, chartTheme: payload, ...rest };
    default:
      return state;
  }
};

export default settings;
