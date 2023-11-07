import {StyleSheet, StatusBar} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import colors from '../../constants/colors';

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const deviceHasNotch = DeviceInfo.hasNotch();

export const commonStyles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 15,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.button,
  },
  container: {
    flex: 1,
  },
  statusBar: {
    height: deviceHasNotch ? 20 : STATUSBAR_HEIGHT,
  },
  centeredViewModal: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    position: 'absolute',
    top: 60,
    right: 0,
    width: '45%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    marginTop: 22,
  },
  elWrap: {
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 22,
    height: 50,
    flexDirection: 'row',
    backgroundColor: colors.background,
    marginBottom: 20,
  },
  elBttonWrap: {
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: 20,
    // borderRadius: 22,
    // height: 50,
    flexDirection: 'row',
    marginBottom: 10,
  },
  buttonWrap: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 22,
    paddingHorizontal: 20,
    // flex: 1,
    width: '49%',
    // justfyContent: 'center',
    // alignContent: 'center',
    alignItems: 'center',
  },
  buttonWrapUnSelect: {
    backgroundColor: colors.background,
    padding: 10,
    borderRadius: 22,
    paddingHorizontal: 20,
    // flex: 1,
    width: '49%',
    // justfyContent: 'center',
    // alignContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
  homeContainer: {
    backgroundColor: colors.content,
    flex: 1,
    paddingTop: 0,
  },
  formContainer: {
    backgroundColor: colors.white,
    flex: 1,
    padding: 20,
  },
  lblStyle: {
    color: colors.white,
    fontSize: 16,
  },
  fBtn: {
    borderRightWidth: 1,
    borderRightColor: colors.white,
    paddingRight: 10,
  },
  item: {
    backgroundColor: colors.white,
    paddingVertical: 18,
    paddingHorizontal: 10,
    marginVertical: 2,
    marginHorizontal: 2,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  drawerItem: {
    borderBottomWidth: 1,
    borderBottomColor: colors.button,
  },
  drawerLabel: {
    fontSize: 18,
    paddingRight: 0,
  },
  f09: {
    flex: 0.9,
  },
  f01: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    opacity: 0.6,
  },
  searchBtn: {
    flex: 1,
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'green',
  },
  txtWhite: {
    color: colors.white,
  },
  navBtns: {
    flex: 0.5,
    alignItems: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: colors.button,
    borderBottomWidth: 1,
    borderBottomColor: colors.button,
    borderRightWidth: 1,
    borderRightColor: colors.button,
    backgroundColor: colors.white,
  },

  link: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 4,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  txtStyle: {
    borderBottomColor: colors.button,
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 20,
  },
  labelStyle: {
    fontSize: 20,
    color: colors.blue,
    marginTop: 20,
  },
  modalView: {
    //marginVertical: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: 10,
    alignItems: 'stretch',
    shadowColor: colors.shadowColor,
    margin: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: colors.subText,
    fontSize: 18,
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    color: colors.button,
    textAlign: 'center',
  },
  horzScrol: {
    flexDirection: 'row',
    height: 110,
    backgroundColor: colors.white,
    justfyContent: 'flex-start',
    marginBottom: 20,
  },
  sqBtn: {
    width: 100,
    height: 100,
    marginRight: 10,
    marginTop: 7,
    backgroundColor: colors.background,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftHeaderViewStyle: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  leftHeaderButton: {
    paddingHorizontal: 10,
  },
  loaderStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
