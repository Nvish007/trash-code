import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

export const styles = StyleSheet.create({
  changeLanguageView: {
    position: 'absolute',
    top: 0,
    right: '5%',
    flexDirection: 'row',
    alignContent: 'center',
    flex: 0.2,
    zIndex: 10,
  },
  changeLanguageText: {
    color: colors.shadowColor,
    fontSize: 16,
    fontweight: 'bold',
  },
});
