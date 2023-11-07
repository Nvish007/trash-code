import {LOCAL_API_2} from '../../utils/config';

const fetchProjectDetailFromId = async props => {
  const requestOptions = {
    headers: {
      'Content-type': 'Application/json',
      Authorization: `Bearer ${props.token}`,
    },
    method: 'POST',
    body: JSON.stringify(props.data),
  };

  return new Promise((resolve, reject) => {
    fetch(LOCAL_API_2 + 'project/rest/project-details-from-id', requestOptions)
      .then(async response => {
        const resJson = await response.json();
        if (resJson.success === true) {
          resolve(resJson);
        } else {
          resolve(resJson);
        }
      })
      .catch(err => reject(err));
  });
};

const fetchAllProjectDates = async props => {
  const requestOptions = {
    headers: {
      'Content-type': 'Application/json',
      Authorization: `Bearer ${props.token}`,
    },
    method: 'POST',
    body: JSON.stringify(props.data),
  };

  return new Promise((resolve, reject) => {
    fetch(LOCAL_API_2 + 'project/rest/get-all-project-dates', requestOptions)
      .then(async response => {
        const resJson = await response.json();
        if (resJson.success === true) {
          resolve(resJson);
        } else {
          resolve(resJson);
        }
      })
      .catch(err => reject(err));
  });
};

const fetchProjectItemFromProjectId = async props => {
  const requestOptions = {
    headers: {
      'Content-type': 'Application/json',
      Authorization: `Bearer ${props.token}`,
    },
    method: 'GET',
  };

  return new Promise((resolve, reject) => {
    fetch(LOCAL_API_2 + `project/rest/${props.projectId}`, requestOptions)
      .then(async response => {
        const resJson = await response.json();
        if (resJson.success === true) {
          resolve(resJson);
        } else {
          resolve(resJson);
        }
      })
      .catch(err => reject(err));
  });
};

export const ophalingeService = {
  fetchProjectDetailFromId,
  fetchAllProjectDates,
  fetchProjectItemFromProjectId,
};
