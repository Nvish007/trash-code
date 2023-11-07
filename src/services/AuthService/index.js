import {LOCAL_API_2} from '../../utils/config';
import localStorage, {Keys} from '../../utils/localStorage';

const SignIn = async loginObj => {
  const requestOptions = {
    headers: {
      'Content-type': 'Application/json',
    },
    method: 'POST',
    body: JSON.stringify(loginObj),
  };
  console.log('loginObj', requestOptions);
  return new Promise((resolve, reject) => {
    fetch(LOCAL_API_2 + 'login', requestOptions)
      .then(async response => {
        const resJson = await response.json();
        if (resJson.success === true) {
          resolve(resJson);
        } else {
          resolve(resJson);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

const checkTokenIsValid = async token => {
  const requestOptions = {
    headers: {
      'Content-type': 'Application/json',
      Authorization: `Bearer ${token}`,
    },
    method: 'GET',
  };

  return new Promise((resolve, reject) => {
    fetch(LOCAL_API_2 + 'check-token', requestOptions)
      .then(async response => {
        const resJson = await response.json();
        if (resJson.success === true) {
          resolve(resJson);
        } else {
          resolve(resJson);
        }
      })
      .catch(err => {
        reject(new Error('Error in check token', err));
      });
  });
};

const ConfirmAgreement = async token => {
  const requestOptions = {
    headers: {
      'Content-type': 'Application/json',
      Authorization: `Bearer ${token}`,
    },
    method: 'GET',
  };

  return new Promise((resolve, reject) => {
    fetch(LOCAL_API_2 + 'agreement-confirm', requestOptions)
      .then(async response => {
        const resJson = await response.json();
        if (resJson.success === true) {
          resolve(resJson);
        } else {
          reject(new Error('User agreement rejected'));
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

const forgotPassword = async params => {
  const requestOptions = {
    headers: {
      'Content-type': 'Application/json',
    },
    method: 'POST',
    body: JSON.stringify(params),
  };

  return new Promise((resolve, reject) => {
    fetch(LOCAL_API_2 + 'forgot-password', requestOptions)
      .then(async response => {
        const resJson = await response.json();
        if (resJson.success === true) {
          resolve(resJson);
        } else {
          resolve(resJson);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

const SignOut = async () => {
  const token = await localStorage.getItem(Keys.TOKEN);
  const requestOptions = {
    headers: {
      'Content-type': 'Application/json',
      Authorization: `Bearer ${token}`,
    },
    method: 'GET',
  };

  return new Promise((resolve, reject) => {
    fetch(LOCAL_API_2 + 'logout', requestOptions)
      .then(async response => {
        const resJson = await response.json();
        if ((resJson.success = true)) {
          resolve(resJson);
        } else {
          resolve(resJson);
        }
      })
      .catch(err => reject(err));
  });
};

const UpdateDeviceToken = async deviceToken => {
  const token = await localStorage.getItem(Keys.TOKEN);
  const data = {
    device_token: deviceToken,
  };
  const requestOptions = {
    headers: {
      'Content-type': 'Application/json',
      Authorization: `Bearer ${token}`,
    },
    method: 'POST',
    body: JSON.stringify(data),
  };

  return new Promise((resolve, reject) => {
    fetch(LOCAL_API_2 + 'add-device-token', requestOptions)
      .then(async response => {
        const resJson = await response.json();
        if (resJson.success === true) {
          resolve(resJson);
        } else {
          resolve(resJson);
        }
      })
      .catch(err => {
        reject(new Error('Something went wrong with device token', err));
      });
  });
};

export const authService = {
  checkTokenIsValid,
  ConfirmAgreement,
  forgotPassword,
  SignIn,
  SignOut,
  UpdateDeviceToken,
};
