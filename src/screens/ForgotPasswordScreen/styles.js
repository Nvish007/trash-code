import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

export const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 3,
  },
  viewContainer: {
    alignItems: 'stretch',
    justifyContent: 'center',
    flex: 4,
    paddingHorizontal: 40,
  },
  inputStyle: {
    height: 40,
    borderColor: colors.button,
    borderBottomWidth: 1,
    color: 'black',
    marginBottom: 15,
  },
  errorInputStyle: {
    color: 'red',
  },
  buttonContainer: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: colors.white,
    fontSize: 20,
  },
  bottomContainer: {
    flex: 2,
  },
  image: {
    height: '80%',
    width: '80%',
  },
  loginContainer: {
    color: colors.primary,
    alignItems: 'center',
    paddingTop: '7%',
  },
  loginText: {
    color: colors.primary,
    fontSize: 16,
  },
});
