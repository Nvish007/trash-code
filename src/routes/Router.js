/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import LoadingScreen from '../components/LoadingScreen';
import {useDispatch, useSelector} from 'react-redux';
import {isEmpty, isIOS, showToast} from '../utils/validators';
import {isNetworkAvailable} from '../services/NetInfo';
import localStorage, {Keys} from '../utils/localStorage';
import {setLoginStatus} from '../redux/reducers/authSlice';
import {translate} from '../locales/i18n';
// import {isEmpty} from '../utils/validators';
// import localStorage, {Keys} from '../utils/localStorage';
// import {authService} from '../services/AuthService/index.js';

const Router = () => {
  const dispatch = useDispatch();
  const {isLoggedIn} = useSelector(state => state.auth);
  const {isLoading} = useSelector(state => state.loading);
  const [isTokenValid, setIsTokenValid] = useState(false);

  const checkTokenValidity = async () => {
    const token = await localStorage.getItem(Keys.TOKEN);
    if (!isEmpty(token)) {
      dispatch(setLoginStatus(true));
      SplashScreen.hide();
      return;
      // authService.checkTokenIsValid(token).then(res => {
      //   if (res.success === true) {
      //     setIsTokenValid(true);
      //     return;
      //   }
      //   setIsTokenValid(false);
      // });
    }
    dispatch(setLoginStatus(false));
    SplashScreen.hide();
  };

  const loadStorageData = async () => {
    const {isConnected} = await isNetworkAvailable();

    if (isConnected) {
      showToast(translate('LOGIN.connected'));
      return;
    }
    showToast(translate('LOGIN.ERROR.networkError'));
  };

  useEffect(() => {
    checkTokenValidity();
    loadStorageData();
  }, []);

  if (isLoggedIn === null) {
    return <LoadingScreen isVisible={true} />;
  }

  return (
    <>
      <NavigationContainer>
        {!isIOS() && <LoadingScreen isVisible={isLoading} />}
        {isLoggedIn ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
      <Toast position="bottom" bottomOffset={20} />
    </>
  );
};

export default Router;
