import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

export const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2.5,
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
  },
  errorInputStyle: {
    height: 40,
    borderColor: 'red',
    borderBottomWidth: 1,
  },
  forgotPasswordContainer: {
    color: colors.primary,
    alignItems: 'flex-end',
    marginBottom: 25,
    paddingTop: 10,
  },
  forgotPasswordText: {
    color: colors.primary,
    fontSize: 16,
  },
  loginButtonContainer: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 50,
  },
  loginButtonText: {
    color: colors.white,
    fontSize: 20,
  },
  errorText: {
    color: 'red',
  },
  loaderView: {
    flex: 2,
  },
  passwordIcon: {
    position: 'absolute',
    top: '35%',
    right: '16%',
  },
  image: {
    height: '80%',
    width: '80%',
  },
  modalContainer: {
    zIndex: 1,
    position: 'absolute',
    top: 30,
    right: 20,
  },
});
