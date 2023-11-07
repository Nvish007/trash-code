import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

export const styles = StyleSheet.create({
  headerContainer: {
    height: '8%',
    width: '100%',
    backgroundColor: colors.primary,
  },
  headerSubContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 15,
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 10,
  },
  headerText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  viewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  text: {
    fontSize: 14,
    color: colors.white,
    fontWeight: '400',
  },
  title: {
    fontSize: 16,
    color: colors.white,
    fontWeight: 'bold',
  },
  cardView: {
    backgroundColor: colors.background,
    padding: 15,
    borderRadius: 10,
    width: '100%',
  },
});
