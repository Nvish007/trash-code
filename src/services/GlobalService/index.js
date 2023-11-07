import {GoogleApiKey} from '../../utils/config';

const fetchLocationInfo = async (lat, lng) => {
  return new Promise((resolve, reject) => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GoogleApiKey}`,
    )
      .then(async response => {
        const resJson = await response.json();
        // console.log('resJson', resJson.results[0]);
        resolve(resJson.results[0]);
      })
      .catch(err => reject(err));
  });
};

export const globalService = {
  fetchLocationInfo,
};
