import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeTagId: "dashboard",
  tags: [
    {
      path: "/",
      label: "Dashboard",
      id: "dashboard",
      closable: false,
      isSidebar:false
    },
  ],
};

const tagsViewSlice = createSlice({
  name: "tagsView",
  initialState,
  reducers: {
    setActiveTag(state, action) {
      state.activeTagId = action.payload;
    },
    setInitialTag(state, action) {},
    addTag(state, action) {
      if (!state.tags.find((tag) => tag.id === action.payload.id)) {
        state.tags.push(action.payload);
      }
      state.activeTagId = action.payload.id;
    },
    removeTag(state, action) {
      const targetKey = action.payload;
      // dashboard cloud't be closed
      if (targetKey === state.tags[0].id) {
        return;
      }

      let activeTagId = state.activeTagId;
      let lastIndex = 0;

      state.tags.forEach((tag, i) => {
        if (tag.id === targetKey) {
          state.tags.splice(i, 1);
          lastIndex = i - 1;
        }
      });
      const tagList = state.tags.filter((tag) => tag.id !== targetKey);
      if (tagList.length && activeTagId === targetKey) {
        if (lastIndex >= 0) {
          state.activeTagId = tagList[lastIndex].id;
        } else {
          state.activeTagId = tagList[0].id;
        }
      }
    },
    removeAllTag(state) {
      state.activeTagId = state.tags[0].id;
      state.tags = [state.tags[0]];
    },
    removeOtherTag(state) {
      const activeTag = state.tags.find((tag) => tag.id === state.activeTagId);
      const activeIsDashboard = activeTag === state.tags[0].id;

      state.tags = activeIsDashboard
        ? [state.tags[0]]
        : [state.tags[0], activeTag];
    },
  },
});

export const {
  setActiveTag,
  addTag,
  removeTag,
  removeAllTag,
  removeOtherTag,
  setInitialTag,
} = tagsViewSlice.actions;

export default tagsViewSlice.reducer;
