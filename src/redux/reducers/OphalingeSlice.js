import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  allProjectDates: null,
  ophalingeProjectDetails: null,
  projectItemList: null,
};

const OphalingeSlice = createSlice({
  initialState,
  name: 'ophalinge',
  reducers: {
    setOphalingeProjectDetails(state, {payload}) {
      state.ophalingeProjectDetails = payload;
    },
    setAllProjectDates(state, {payload}) {
      state.allProjectDates = payload;
    },
    setProjectItemList(state, {payload}) {
      state.projectItemList = payload;
    },
  },
});

export const {
  setAllProjectDates,
  setOphalingeProjectDetails,
  setProjectItemList,
} = OphalingeSlice.actions;
export default OphalingeSlice.reducer;
