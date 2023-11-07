import {Alert} from 'react-native';
import {createAsyncThunk} from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';
import {appConstants} from '../../constants/app.constant.js';
import {authService} from '../../services/AuthService/index.js';
import localStorage, {Keys} from '../../utils/localStorage.js';
import {setLoginStatus, setUserInfo} from '../reducers/authSlice';
import {translate} from '../../locales/i18n.js';
import {setIsLoading} from '../reducers/loadingSlice.js';
import {showToast} from '../../utils/validators.js';

export const onLogin = createAsyncThunk(
  appConstants.USER_LOGIN,
  async (params, {rejectWithValue, dispatch}) => {
    dispatch(setIsLoading(true));
    const response = await authService.SignIn(params);
    if (!response) {
      dispatch(setIsLoading(false));
      return rejectWithValue();
    }
    if (response.success === true) {
      dispatch(setIsLoading(false));
      if (response.data?.isFirst === 0) {
        Alert.alert(
          translate('LOGIN.ERROR.agreement'),
          translate('LOGIN.ERROR.textAgree'),
          [
            {
              text: translate('LOGIN.ERROR.no'),
              onPress: () => showToast(translate('HOME.ERROR.Cancel')),
              style: 'cancel',
            },
            {
              text: translate('LOGIN.ERROR.agree'),
              onPress: async () => {
                dispatch(setIsLoading(true));
                const resp = await authService.ConfirmAgreement(
                  response.data.access_token,
                );
                if (resp.success === true) {
                  dispatch(setIsLoading(false));
                  dispatch(setLoginStatus(true));
                  dispatch(setUserInfo(response.data));
                  localStorage.setItem(Keys.EMAIL, response.data.email);
                  localStorage.setItem(Keys.TOKEN, response.data.access_token);
                  localStorage.setItem(Keys.ID, response.data.id.toString());
                  localStorage.setItem(Keys.ROLE, response.data.role);
                  localStorage.setItem(Keys.NAME, response.data.name);
                  localStorage.setItem(Keys.CID, response.data.cId.toString());
                  response.data.disable_location
                    ? localStorage.setItem(
                        Keys.LOCATION,
                        response.data.disable_location,
                      )
                    : '';
                  localStorage.setItem(Keys.SYNC, '0');
                } else {
                  Toast.show({
                    text1: translate('LOGIN.ERROR.requried'),
                  });
                }
              },
              style: 'cancel',
            },
          ],
          {
            cancelable: false,
          },
        );
      } else {
        dispatch(setLoginStatus(true));
        dispatch(setUserInfo(response.data));
        localStorage.setItem(Keys.EMAIL, response.data.email);
        localStorage.setItem(Keys.TOKEN, response.data.access_token);
        localStorage.setItem(Keys.ID, response.data.id.toString());
        localStorage.setItem(Keys.ROLE, response.data.role);
        localStorage.setItem(Keys.NAME, response.data.name);
        localStorage.setItem(Keys.CID, response.data.cId.toString());
        response.data.disable_location
          ? localStorage.setItem(Keys.LOCATION, response.data.disable_location)
          : '';
        localStorage.setItem(Keys.SYNC, '0');
      }
    } else {
      dispatch(setIsLoading(false));
      Toast.show({
        text1: 'Login Failed',
      });
    }
  },
);

export const forgotPassword = createAsyncThunk(
  appConstants.FORGOT_PASSWORD,
  async (params, {rejectWithValue, dispatch}) => {
    dispatch(setIsLoading(true));
    const response = await authService.forgotPassword(params);
    if (!response) {
      return rejectWithValue();
    }
    if (response.success === true) {
      dispatch(setIsLoading(false));
      showToast(response.message);
    } else {
      dispatch(setIsLoading(false));
      showToast(response.message);
    }
  },
);

export const UpdateDeviceToken = createAsyncThunk(
  appConstants.UPDATE_DEVICE_TOKEN,
  async (params, {rejectWithValue, dispatch}) => {
    const response = await authService.UpdateDeviceToken(params);
    if (!response) {
      return rejectWithValue();
    }
    if (response.success === true) {
      console.log('Device Token added');
      return;
    }
    if (response.status === 401) {
      dispatch(HandleSignOut());
      return;
    }
    console.log('Something went wrong with device token');
  },
);

export const HandleSignOut = createAsyncThunk(
  appConstants.USER_LOGOUT,
  async (params, {dispatch}) => {
    dispatch(setIsLoading(true));
    try {
      await authService.SignOut();
      dispatch(setLoginStatus(false));
      dispatch(setIsLoading(false));
      localStorage.setItem(Keys.EMAIL, '');
      localStorage.setItem(Keys.CID, '');
      localStorage.setItem(Keys.TOKEN, '');
      localStorage.setItem(Keys.ID, '');
      localStorage.setItem(Keys.ROLE, '');
      localStorage.setItem(Keys.NAME, '');
      await localStorage.removeItem('@AuthData');
    } catch (err) {
      console.log(err);
      dispatch(setLoginStatus(false));
      dispatch(setIsLoading(false));
      // Alert.alert('Something went wrong');
      localStorage.setItem(Keys.EMAIL, '');
      localStorage.setItem(Keys.TOKEN, '');
      localStorage.setItem(Keys.ID, '');
      localStorage.setItem(Keys.ROLE, '');
      localStorage.setItem(Keys.NAME, '');
      localStorage.setItem(Keys.CID, '');

      await localStorage.removeItem('@AuthData');
    }
  },
);
