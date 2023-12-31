import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {isIOS} from './validators';

function requestPermission(PERMISSION) {
  return new Promise((resolve, reject) => {
    request(PERMISSION).then(result => {
      if (result === RESULTS.GRANTED) {
        resolve();
        return;
      }
      reject(new Error('The permission is denied and not requestable anymore'));
    });
  });
}

function getPermissionName(permission) {
  let permissionName = '';
  switch (permission) {
    case 'camera':
      permissionName = isIOS()
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA;
      break;
    case 'location':
      permissionName = isIOS()
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
      break;
    default:
      break;
  }
  return permissionName;
}

function checkPermissionAndRequest(permission) {
  return new Promise((resolve, reject) => {
    const PERMISSION = getPermissionName(permission);
    check(PERMISSION)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            reject(
              new Error(
                'This feature is not available (on this device / in this context)',
              ),
            );
            break;
          case RESULTS.DENIED:
            resolve(requestPermission(PERMISSION));
            break;
          case RESULTS.LIMITED:
            reject(
              new Error('The permission is limited: some actions are possible'),
            );
            break;
          case RESULTS.GRANTED:
            resolve();
            break;
          case RESULTS.BLOCKED:
            reject(
              new Error('The permission is denied and not requestable anymore'),
            );
            break;
          default:
            reject(new Error('No result'));
            break;
        }
      })
      .catch(error => reject(error));
  });
}

export default checkPermissionAndRequest;
