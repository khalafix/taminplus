import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  filters: {}
  //filters: {fromRegisterDate, toRegisterDate},
};

const companySearchSlice = createSlice({
  name: "companySearch",
  initialState,
  reducers: {
    saveCompanySearch(state, action) {
      state.page=action.payload.page;
      state.filters = {...action.payload.filters};
    },
    clearCompanySearch(state, action) {
      state.page=initialState.page;
      state.filters = initialState.filters;
    },
  },
});

export const {
  saveCompanySearch,
  clearCompanySearch,
} = companySearchSlice.actions;

export default companySearchSlice.reducer;
