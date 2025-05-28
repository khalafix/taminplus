import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeBreadcrumb: "",
  breadcrumb: [],
};

const breadcrumbSlice = createSlice({
  name: "breadcrumbDashboard",
  initialState,
  reducers: {
    addBreadcrumb(state, action) {
      if (!state.breadcrumb.find((x) => x.path === action.payload.path)) {
        state.breadcrumb.push(action.payload);
      } else {
        let indexBreadcrumb = state.breadcrumb.findIndex(
          (x) => x.path === action.payload.path
        );
        if (indexBreadcrumb) {
          state.breadcrumb = state.breadcrumb.splice(0, indexBreadcrumb + 1);
        }
      }

      state.activeBreadcrumb = action.payload.paths;
    },
    resetBreadcrumb(state, action) {
      state.breadcrumb = [];
      state.activeBreadcrumb = "";
    },
  },
});

export const { addBreadcrumb, resetBreadcrumb } = breadcrumbSlice.actions;

export default breadcrumbSlice.reducer;
