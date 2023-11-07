import {LOCAL_API_2} from '../../utils/config';

const fetchTag = async props => {
  const requestOptions = {
    headers: {
      'Content-type': 'Application/json',
      Authorization: `Bearer ${props.token}`,
    },
    method: 'POST',
    body: JSON.stringify(props.data),
  };
  return new Promise((resolve, reject) => {
    fetch(LOCAL_API_2 + 'tag/rest/fetch-tag', requestOptions)
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

const fetchProjectDetails = async props => {
  const requestOptions = {
    headers: {
      'Content-type': 'Application/json',
      Authorization: `Bearer ${props.token}`,
    },
    method: 'POST',
    body: JSON.stringify(props.data),
  };

  return new Promise((resolve, reject) => {
    fetch(LOCAL_API_2 + 'project/rest/project-details', requestOptions)
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

const fetchProject = async props => {
  const requestOptions = {
    headers: {
      'Content-type': 'Application/json',
      Authorization: `Bearer ${props.token}`,
    },
    method: 'POST',
    body: JSON.stringify(props.data),
  };
  return new Promise((resolve, reject) => {
    fetch(LOCAL_API_2 + 'project/rest/fetch-project', requestOptions)
      .then(async response => {
        const resJson = await response.json();
        if (resJson.success === true) {
          resolve(resJson);
        } else {
          resolve(resJson);
        }
      })
      .catch(err => {
        console.log('err', err);
        reject(err);
      });
  });
};

const fetchStatus = async props => {
  const requestOptions = {
    headers: {
      'Content-type': 'Application/json',
      Authorization: `Bearer ${props.token}`,
    },
    method: 'POST',
    body: JSON.stringify(props.data),
  };

  return new Promise((resolve, reject) => {
    fetch(LOCAL_API_2 + 'status/rest/fetch-status', requestOptions)
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

const fetchImageSubTag = async props => {
  const requestOptions = {
    headers: {
      'Content-type': 'Application/json',
      Authorization: `Bearer ${props.token}`,
    },
    method: 'GET',
  };

  return new Promise((resolve, reject) => {
    fetch(LOCAL_API_2 + `project/sub-tags/${props.projectID}`, requestOptions)
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

const fetchProjectFromStatus = async props => {
  const requestOptions = {
    headers: {
      'Content-type': 'Application/json',
      Authorization: `Bearer ${props.token}`,
    },
    method: 'POST',
    body: JSON.stringify(props.data),
  };

  return new Promise((resolve, reject) => {
    fetch(
      LOCAL_API_2 + 'project/rest/fetch-project-from-status',
      requestOptions,
    )
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

const addProject = async props => {
  const requestOptions = {
    headers: {
      'Content-type': 'Application/json',
      Authorization: `Bearer ${props.token}`,
    },
    method: 'POST',
    body: JSON.stringify(props.data),
  };
  return new Promise((resolve, reject) => {
    fetch(LOCAL_API_2 + 'project/rest/add-project', requestOptions)
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

const updateProject = async props => {
  const requestOptions = {
    headers: {
      'Content-type': 'Application/json',
      Authorization: `Bearer ${props.token}`,
    },
    method: 'POST',
    body: JSON.stringify(props.data),
  };
  return new Promise((resolve, reject) => {
    fetch(LOCAL_API_2 + 'project/rest/add-project-item', requestOptions)
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

const uploadImage = async props => {
  const requestOptions = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${props.token}`,
    },
    method: 'POST',
    body: props.data,
  };
  return new Promise((resolve, reject) => {
    fetch(LOCAL_API_2 + 'project/upload', requestOptions)
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

const uploadDocument = async props => {
  const requestOptions = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${props.token}`,
    },
    method: 'POST',
    body: props.data,
  };
  return new Promise((resolve, reject) => {
    fetch(LOCAL_API_2 + 'project/upload-file', requestOptions)
      .then(async response => {
        const resJson = await response.json();
        console.log('file resJson', resJson);
        if (resJson.success === true) {
          resolve(resJson);
        } else {
          resolve(resJson);
        }
      })
      .catch(err => reject(err));
  });
};

// const fetchStatusLocal = (type, _DB) => {
//   console.log('Called LOCAL STATUS');
//   if (type === 'home') {
//     let qry =
//       'SELECT * FROM tbl_status where isVisibleHome = ? AND isDeleted = ?';
//     let qryData = [0, 0];
//   }
// };

export const submitFornService = {
  addProject,
  fetchProject,
  fetchProjectDetails,
  fetchProjectFromStatus,
  fetchStatus,
  fetchTag,
  uploadImage,
  uploadDocument,
  updateProject,
  fetchImageSubTag,
};
