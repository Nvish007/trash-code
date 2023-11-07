import {Platform} from 'react-native';
import Toast from 'react-native-toast-message';

export const isEmailValidate = email => {
  const emailRegex =
    /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/iu;
  return !emailRegex.test(email);
};

export const validatePassword = password => {
  const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{2,}$/u;
  return !passwordRegex.test(password);
};

export const isEmpty = value => {
  return (
    value === null ||
    value === 'undefined' ||
    value === '' ||
    value === undefined
  );
};

export const isIOS = () => Platform.OS === 'ios';

export const showToast = value =>
  Toast.show({
    text1: value,
    visibilityTime: 1000,
  });
