import AsyncStorage from '@react-native-async-storage/async-storage';

export const Keys = {
  LANGUAGE: 'Language',
  EMAIL: 'email',
  TOKEN: 'access_token',
  ID: 'id',
  ROLE: 'role',
  NAME: 'name',
  CID: 'cId',
  LOCATION: 'disable_location',
  SYNC: 'sync',
  LAST_SYNC: 'last_sync_time',
};

const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    // Handle error
  }
};

const getItem = async key => {
  let value = null;
  try {
    value = await AsyncStorage.getItem(key);
  } catch (error) {
    // Handle error
  }
  return value;
};

const clear = async () => {
  const language = await getItem(Keys.LANGUAGE);
  await AsyncStorage.clear();
  await setItem(Keys.LANGUAGE, language);
};

const removeItem = async key => {
  await AsyncStorage.removeItem(key);
};

export default {
  clear,
  getItem,
  setItem,
  removeItem,
};
