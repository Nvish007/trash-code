import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import {isIOS} from './validators';
import {authService} from '../services/AuthService/index.js';
import {isNetworkAvailable} from '../services/NetInfo';

export const getToken = () =>
  new Promise((resolve, reject) => {
    messaging()
      .getToken()
      .then(token => resolve(token))
      .catch(error => reject(new Error(error)));
  });

const getAndUpdateToken = () =>
  new Promise((resolve, reject) => {
    messaging()
      .getToken()
      .then(token => {
        authService
          .UpdateDeviceToken(token)
          .then(() => resolve())
          .catch(error => reject(new Error(error)));
      })
      .catch(error => reject(new Error(error)));
  });

export const updateToken = async () => {
  const {isConnected} = await isNetworkAvailable();
  if (isConnected) {
    if (isIOS()) {
      // Handle for the iOS after requesting permission
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      if (enabled) {
        getAndUpdateToken();
      }
    } else {
      getAndUpdateToken();
    }
  }
};

export const deleteToken = () =>
  new Promise((resolve, reject) => {
    messaging()
      .deleteToken()
      .then(() => resolve())
      .catch(error => reject(new Error(error)));
  });

export const createLocalChannel = () => {
  if (!isIOS()) {
    PushNotification.createChannel({
      channelId: 'local-notifications',
      channelName: 'Local Notifications',
    });
  }
};

export const showLocalNotification = () => {
  if (!isIOS()) {
    PushNotification.localNotification({
      channelId: 'local-notifications',
      id: undefined, // '4834992'
      message: 'Test Notification',
      smallIcon: 'ic_notification_transparent',
      title: 'Test',
      vibrate: true,
      vibration: 300,
      playSound: true,
      soundName: 'default',
    });
  } else {
    PushNotification.localNotification({
      message: 'Test Notification',
      title: 'Test',
    });
  }
};
