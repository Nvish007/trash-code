import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  projectNames: null,
  projectStatusForHome: null,
  projectStatusForProject: null,
  projectDetails: null,
  projectInfoFromStatus: [],
  isImageUploading: false,
  isDocumentUploading: false,
};

const projectSlice = createSlice({
  initialState,
  name: 'project',
  reducers: {
    setProjectNames(state, {payload}) {
      state.projectNames = payload;
    },
    setProjectStatusFromHome(state, {payload}) {
      state.projectStatusForHome = payload;
    },
    setProjectStatusFromProject(state, {payload}) {
      state.projectStatusForProject = payload;
    },
    setProjectDetails(state, {payload}) {
      state.projectDetails = payload;
    },
    setProjectInfoFromStatus(state, {payload}) {
      state.projectInfoFromStatus = payload;
    },
    setIsImageUploading(state, {payload}) {
      state.isImageUploading = payload;
    },
    setIsDocumentUploading(state, {payload}) {
      state.isDocumentUploading = payload;
    },
  },
});

export const {
  setProjectNames,
  setProjectStatusFromHome,
  setProjectStatusFromProject,
  setProjectDetails,
  setProjectInfoFromStatus,
  setIsImageUploading,
  setIsDocumentUploading,
} = projectSlice.actions;
export default projectSlice.reducer;
