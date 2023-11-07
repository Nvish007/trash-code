import {createAsyncThunk} from '@reduxjs/toolkit';
import {appConstants} from '../../constants/app.constant';
import {submitFornService} from '../../services/SubmitFormService';
import {setIsLoading} from '../reducers/loadingSlice';
import {setImageSubTags, setTags} from '../reducers/tagSlice';
import {HandleSignOut} from './authAction';

export const fetchTag = createAsyncThunk(
  appConstants.FETCH_TAG,
  async (params, {rejectWithValue, dispatch}) => {
    dispatch(setIsLoading(true));
    const response = await submitFornService.fetchTag(params);
    if (!response) {
      return rejectWithValue();
    }
    if (response.success === true) {
      dispatch(setIsLoading(false));
      dispatch(setTags(response.data));
      if (params.onFetchTagResponse) {
        params.onFetchTagResponse(response.data);
      }
      return;
    }
    if (response.status === 401) {
      dispatch(setIsLoading(false));
      dispatch(HandleSignOut());
      return;
    }
    dispatch(setIsLoading(false));
    console.log('Something went wrong with fetchTag');
  },
);

export const fetchImageSubTag = createAsyncThunk(
  appConstants.FETCH_TAG,
  async (params, {rejectWithValue, dispatch}) => {
    dispatch(setIsLoading(true));
    const response = await submitFornService.fetchImageSubTag(params);
    if (!response) {
      return rejectWithValue();
    }
    if (response.success === true) {
      dispatch(setIsLoading(false));
      dispatch(setImageSubTags(response.data));
      // if (params.onFetchTagResponse) {
      //   params.onFetchTagResponse(response.data);
      // }
      return;
    }
    if (response.status === 401) {
      dispatch(setIsLoading(false));
      dispatch(HandleSignOut());
      return;
    }
    dispatch(setIsLoading(false));
    console.log('Something went wrong with fetchTag');
  },
);
