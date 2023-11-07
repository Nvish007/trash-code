import {StyleSheet} from 'react-native';
import {isIOS} from '../../utils/validators';

export default StyleSheet.create({
  container: {
    alignSelf: 'center',
    borderRadius: 20,
    height: '50%',
    justifyContent: 'center',
    width: '100%',
  },
  loadingIndicator: {
    alignSelf: isIOS() ? 'flex-start' : 'center',
    height: '50%',
    width: '80%',
    marginLeft: isIOS() ? '15%' : 0,
  },
});
