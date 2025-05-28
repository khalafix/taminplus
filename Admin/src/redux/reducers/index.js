import { combineReducers } from "@reduxjs/toolkit";
import { connectRouter } from "connected-react-router";

import SettingsReducer from "./settings";
import tagsViewReducer from "./tagView";
import breadcrumbDashboardReducer from "./breadcrumbDashboard";
import companySearchReducer from "./companySearch";

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    setting: SettingsReducer,
    tagsView: tagsViewReducer,
    breadcrumb: breadcrumbDashboardReducer,
    companySearch: companySearchReducer,
  });
