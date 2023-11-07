import NetInfo from '@react-native-community/netinfo';

export const isNetworkAvailable = async function () {
  const info = await NetInfo.fetch();
  return info;
};
