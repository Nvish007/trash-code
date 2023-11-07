import Geolocation from 'react-native-geolocation-service';
import checkPermissionAndRequest from './checkPermission';

export const getCurrentLocation = async () => {
  await checkPermissionAndRequest('location');
  Geolocation.getCurrentPosition(
    position => {
      return position;
    },
    error => {
      console.log(error.code, error.message);
    },
    {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  );
};
