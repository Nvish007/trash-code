import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

export const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    alignSelf: 'center',
    width: '60%',
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
  },
  centerText: {
    textAlign: 'center',
  },
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
  headerContainer: {
    height: '8%',
    width: '100%',
    backgroundColor: colors.primary,
  },
  headerSubContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
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
  headerRightButton: {
    position: 'absolute',
    right: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  listContainer: {
    // paddingTop: '10%',
    flex: 0.6,
  },
  logoContainer: {
    flex: 0.5,
  },
  viewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '30%',
    right: '25%',
    backgroundColor: colors.white,
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: colors.button,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    // alignSelf: 'center',
    width: '60%',
    paddingVertical: 15,
    marginTop: 10,
    flexDirection: 'row',
    zIndex: 10,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 10,
  },
  modalContainer: {
    zIndex: 11,
    position: 'absolute',
    top: 10,
    right: 5,
  },
  modalView: {
    top: 80,
  },
});
