import {createAsyncThunk} from '@reduxjs/toolkit';
import {appConstants} from '../../constants/app.constant';
import {ophalingeService} from '../../services/ophalingeServices';
import {setIsLoading} from '../reducers/loadingSlice';
import {
  setAllProjectDates,
  setOphalingeProjectDetails,
  setProjectItemList,
} from '../reducers/OphalingeSlice';
import {HandleSignOut} from './authAction';

export const fetchProjectDetailFromId = createAsyncThunk(
  appConstants.FETCH_PROJECT,
  async (params, {rejectWithValue, dispatch}) => {
    console.log('fetchProjectDetailFromId called service');
    // dispatch(setIsLoading(true));
    const response = await ophalingeService.fetchProjectDetailFromId(params);
    if (!response) {
      return rejectWithValue();
    }
    if (response.success === true) {
      dispatch(setIsLoading(false));
      dispatch(setOphalingeProjectDetails(response.data));
      return;
    }
    if (response.status === 401) {
      dispatch(setIsLoading(false));
      dispatch(HandleSignOut());
      return;
    }
    dispatch(setIsLoading(false));
    console.log('Something went wrong with fetchProjectDetailFromId');
  },
);

export const fetchAllProjectDates = createAsyncThunk(
  appConstants.FETCH_PROJECT,
  async (params, {rejectWithValue, dispatch}) => {
    console.log('fetchAllProjectDates called service');
    // dispatch(setIsLoading(true));
    const response = await ophalingeService.fetchAllProjectDates(params);
    if (!response) {
      return rejectWithValue();
    }
    if (response.success === true) {
      dispatch(setIsLoading(false));
      dispatch(setAllProjectDates(response.data));
      return;
    }
    if (response.status === 401) {
      dispatch(setIsLoading(false));
      dispatch(HandleSignOut());
      return;
    }
    dispatch(setIsLoading(false));
    console.log('Something went wrong with fetchAllProjectDates');
  },
);

export const fetchProjectItemFromProjectId = createAsyncThunk(
  appConstants.FETCH_PROJECT,
  async (params, {rejectWithValue, dispatch}) => {
    // dispatch(setIsLoading(true));
    const response = await ophalingeService.fetchProjectItemFromProjectId(
      params,
    );
    if (!response) {
      return rejectWithValue();
    }
    if (response.success === true) {
      dispatch(setIsLoading(false));
      dispatch(setProjectItemList(response.data));
      return;
    }
    if (response.status === 401) {
      dispatch(setIsLoading(false));
      dispatch(HandleSignOut());
      return;
    }
    dispatch(setIsLoading(false));
    console.log('Something went wrong with fetchAllProjectDates');
  },
);
