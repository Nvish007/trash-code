import {LOCAL_API_2} from '../../utils/config';

const LastSyncedUpdate = async props => {
  const requestOptions = {
    headers: {
      'Content-type': 'Application/json',
      Authorization: `Bearer ${props.token}`,
    },
    method: 'POST',
    body: JSON.stringify(props.data),
  };
  return new Promise((resolve, reject) => {
    fetch(LOCAL_API_2 + 'project/sync/latest-updates', requestOptions)
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

export const syncService = {
  LastSyncedUpdate,
};
