import {createAsyncThunk} from '@reduxjs/toolkit';
import {appConstants} from '../../constants/app.constant';
import {submitFornService} from '../../services/SubmitFormService';
import {
  setIsDocumentUploading,
  setIsImageUploading,
  setProjectDetails,
  setProjectInfoFromStatus,
  setProjectNames,
  setProjectStatusFromHome,
  setProjectStatusFromProject,
} from '../reducers/projectSlice';
import {HandleSignOut} from './authAction';
import {setIsLoading} from '../reducers/loadingSlice';

export const fetchProjectDetails = createAsyncThunk(
  appConstants.FETCH_PROJECT_DETAILS,
  async (params, {rejectWithValue, dispatch}) => {
    console.log('projnames called service');
    // dispatch(setIsLoading(true));
    const response = await submitFornService.fetchProjectDetails(params);
    if (!response) {
      return rejectWithValue();
    }
    dispatch(setIsLoading(false));
    if (response.success === true) {
      dispatch(setIsLoading(false));
      dispatch(setProjectDetails(response.data));
      return;
    }
    if (response.status === 401) {
      dispatch(setIsLoading(false));
      dispatch(HandleSignOut());
      return;
    }
    dispatch(setIsLoading(false));
    console.log('Something went wrong with fetchProjectDetails');
  },
);

export const fetchProjectStatus = createAsyncThunk(
  appConstants.FETCH_PROJECT_STATUS,
  async (params, {rejectWithValue, dispatch}) => {
    const response = await submitFornService.fetchStatus(params);
    if (!response) {
      return rejectWithValue();
    }
    dispatch(setIsLoading(false));
    if (response.success === true) {
      if (params.data.type === 'home') {
        dispatch(setIsLoading(false));
        dispatch(setProjectStatusFromHome(response.data));
        return;
      }
      if (params.onFetchStatusResponse) {
        params.onFetchStatusResponse(response.data);
      }
      dispatch(setProjectStatusFromProject(response.data));
      return;
    }
    if (response.status === 401) {
      dispatch(setIsLoading(false));
      dispatch(HandleSignOut());
      return;
    }
    dispatch(setIsLoading(false));
    console.log('Something went wrong with fetchProjectStatus');
  },
);

export const fetchProject = createAsyncThunk(
  appConstants.FETCH_PROJECT,
  async (params, {rejectWithValue, dispatch}) => {
    // dispatch(setIsLoading(true));
    console.log('FETCH PROJECT called service');
    const response = await submitFornService.fetchProject(params);
    if (!response) {
      return rejectWithValue();
    }
    if (response.success === true) {
      dispatch(setIsLoading(false));
      dispatch(setProjectNames(response.data));

      if (params.onFetchProjectResponse) {
        params.onFetchProjectResponse(response.data);
      }
      return;
    }
    if (response.status === 401) {
      dispatch(setIsLoading(false));
      dispatch(HandleSignOut());
      return;
    }
    dispatch(setIsLoading(false));
    console.log('Something went wrong with fetchProject');
  },
);

export const UpdateProjectInfo = createAsyncThunk(
  appConstants.UPDATE_PROJECT,
  async (params, {rejectWithValue, dispatch}) => {
    dispatch(setIsLoading(true));
    console.log('FETCH PROJECT called service');
    const response = await submitFornService.updateProject(params);
    if (!response) {
      return rejectWithValue();
    }
    if (response.success === true) {
      dispatch(setIsLoading(false));
      if (params.uploadImage) {
        params.uploadImage(0, response.data.id);
      }
      return;
    }
    if (response.status === 401) {
      dispatch(setIsLoading(false));
      dispatch(HandleSignOut());
      return;
    }
    dispatch(setIsLoading(false));
    console.log('Something went wrong with UpdateProjectInfo');
  },
);

export const UpdateLocalProjectInfo = createAsyncThunk(
  appConstants.UPDATE_PROJECT_LOCAL,
  async (params, {rejectWithValue, dispatch}) => {
    dispatch(setIsLoading(true));
    console.log('FETCH PROJECT called service');
    const response = await submitFornService.updateProject(params);
    if (!response) {
      return rejectWithValue();
    }
    if (response.success === true) {
      dispatch(setIsLoading(false));
      if (params.onProjectItemResponse) {
        params.onProjectItemResponse(params.item, response.data);
      }
      return;
    }
    if (response.status === 401) {
      dispatch(setIsLoading(false));
      dispatch(HandleSignOut());
      return;
    }
    dispatch(setIsLoading(false));
    if (params.onProjectItemResponse) {
      params.onProjectItemResponse(false);
    }
    console.log('Something went wrong with AddProjectInfo');
  },
);

export const addProjectInfo = createAsyncThunk(
  appConstants.ADD_PROJECT,
  async (params, {rejectWithValue, dispatch}) => {
    dispatch(setIsLoading(true));
    console.log('FETCH PROJECT called service');
    const response = await submitFornService.addProject(params);
    if (!response) {
      return rejectWithValue();
    }
    if (response.success === true) {
      dispatch(setIsLoading(false));
      if (params.uploadImage) {
        params.uploadImage(0, response.data.id);
      }
      return;
    }
    if (response.status === 401) {
      dispatch(setIsLoading(false));
      dispatch(HandleSignOut());
      return;
    }
    console.log('response', response);
    dispatch(setIsLoading(false));
    console.log('Something went wrong with AddProjectInfo');
  },
);

export const addLocalProjectInfo = createAsyncThunk(
  appConstants.ADD_PROJECT_LOCAL,
  async (params, {rejectWithValue, dispatch}) => {
    // dispatch(setIsLoading(true));
    console.log('FETCH PROJECT called service');
    const response = await submitFornService.addProject(params);
    if (!response) {
      return rejectWithValue();
    }
    if (response.success === true) {
      dispatch(setIsLoading(false));
      if (params.onProjectResponse) {
        params.onProjectResponse(params.item, response.data);
      }
      return;
    }
    if (response.status === 401) {
      dispatch(setIsLoading(false));
      dispatch(HandleSignOut());
      return;
    }
    console.log('response', response);
    dispatch(setIsLoading(false));
    if (params.onProjectResponse) {
      params.onProjectResponse(false);
    }
    console.log('Something went wrong with UpdateProjectInfo');
  },
);

export const fetchProjectFromStatus = createAsyncThunk(
  appConstants.FETCH_PROJECT_FROM_STATUS,
  async (params, {rejectWithValue, dispatch}) => {
    console.log('FETCH PROJECT from status called service');
    const response = await submitFornService.fetchProjectFromStatus(params);
    if (!response) {
      return rejectWithValue();
    }
    if (response.success === true) {
      dispatch(setIsLoading(false));
      dispatch(setProjectInfoFromStatus(response.data));
      return;
    }
    if (response.status === 401) {
      dispatch(setIsLoading(false));
      dispatch(HandleSignOut());
      return;
    }
    dispatch(setIsLoading(false));
    console.log('Something went wrong with fetchProjectFromStatus');
  },
);

export const handleUploadImages = createAsyncThunk(
  appConstants.UPLOAD_IMAGES,
  async (params, {rejectWithValue, dispatch}) => {
    dispatch(setIsImageUploading(true));
    console.log('UPLOAD IMAGES called service');
    const response = await submitFornService.uploadImage(params);
    if (!response) {
      return rejectWithValue();
    }
    if (response.success === true) {
      if (params.onUploadImageResponse) {
        params.onUploadImageResponse(response, params.index);
      }
      // dispatch(setProjectInfoFromStatus(response.data));
      return;
    }
    if (response.status === 401) {
      dispatch(setIsImageUploading(false));
      return;
    }
    dispatch(setIsImageUploading(false));
    console.log('Something went wrong with handleUploadImages');
  },
);

export const handleUploadImagesFromLocal = createAsyncThunk(
  appConstants.UPLOAD_IMAGES_LOCAL,
  async (params, {rejectWithValue, dispatch}) => {
    // dispatch(setIsImageUploading(true));
    console.log('UPLOAD IMAGES called service');
    const response = await submitFornService.uploadImage(params);
    if (!response) {
      return rejectWithValue();
    }
    if (response.success === true) {
      if (params.onResponseFromAddLocal) {
        params.onResponseFromAddLocal(params.item);
      }
      // dispatch(setProjectInfoFromStatus(response.data));
      return;
    }
    if (response.status === 401) {
      // dispatch(setIsImageUploading(false));
      return;
    }
    // dispatch(setIsImageUploading(false));
    if (params.onResponseFromAddLocal) {
      params.onResponseFromAddLocal(false);
    }
    console.log('Something went wrong with handleUploadImages');
  },
);

export const handleUploadDocument = createAsyncThunk(
  appConstants.UPLOAD_DOCUMENT,
  async (params, {rejectWithValue, dispatch}) => {
    dispatch(setIsDocumentUploading(true));
    console.log('UPLOAD Doc called service');
    const response = await submitFornService.uploadDocument(params);
    if (!response) {
      return rejectWithValue();
    }
    if (response.success === true) {
      if (params.onUploadDocumentResponse) {
        params.onUploadDocumentResponse(response.success);
      }
      // dispatch(setProjectInfoFromStatus(response.data));
      return;
    }
    if (response.status === 401) {
      dispatch(setIsDocumentUploading(false));
      return;
    }
    dispatch(setIsDocumentUploading(false));
    console.log('Something went wrong with handleUploadDocument');
  },
);

export const handleUploadDocumentFromLocal = createAsyncThunk(
  appConstants.UPLOAD_DOCUMENT,
  async (params, {rejectWithValue, dispatch}) => {
    // dispatch(setIsDocumentUploading(true));
    console.log('UPLOAD Doc called service');
    const response = await submitFornService.uploadDocument(params);
    if (!response) {
      return rejectWithValue();
    }
    if (response.success === true) {
      if (params.onUploadDocumentResponse) {
        params.onUploadDocumentResponse(params.item);
      }
      // dispatch(setProjectInfoFromStatus(response.data));
      return;
    }
    if (response.status === 401) {
      // dispatch(setIsDocumentUploading(false));
      return;
    }
    // dispatch(setIsDocumentUploading(false));
    if (params.onUploadDocumentResponse) {
      params.onUploadDocumentResponse();
    }
    console.log('Something went wrong with handleUploadDocument');
  },
);
