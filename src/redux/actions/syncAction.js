import {createAsyncThunk} from '@reduxjs/toolkit';
import {appConstants} from '../../constants/app.constant';
import {syncService} from '../../services/SyncService';
import {setIsLoading} from '../reducers/loadingSlice';
import {HandleSignOut} from './authAction';

export const handleLastSync = createAsyncThunk(
  appConstants.LAST_SYNC_TIME,
  async (params, {rejectWithValue, dispatch}) => {
    dispatch(setIsLoading(true));
    const response = await syncService.LastSyncedUpdate(params);
    if (!response) {
      return rejectWithValue();
    }
    if (response.success === true) {
      dispatch(setIsLoading(false));
      if (params.onSyncApiResponse) {
        params.onSyncApiResponse(response.data, params.data.last_sync_time);
      }
      return;
    }
    if (response.status === 401) {
      dispatch(setIsLoading(false));
      dispatch(HandleSignOut());
      return;
    }
    dispatch(setIsLoading(false));
    console.log('Something went wrong with sync API');
  },
);
