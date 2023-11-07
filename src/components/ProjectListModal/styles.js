import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../constants/colors';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    top: '10%',
    left: 10,
  },
  closeModal: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  imageModal: {
    width: width * 0.95,
    height: width * 0.95 * 1.7,
  },
  centeredProjectView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingTop: 50,
    paddingBottom: 170,
  },
  modalView: {
    //marginVertical: 20,
    backgroundColor: 'white',
    // borderRadius: 20,
    paddingTop: 10,
    alignItems: 'stretch',
    shadowColor: colors.shadowColor,
    margin: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeModalIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
  },
  headerModalText: {
    color: colors.shadowColor,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  searchInputStyle: {
    height: 50,
    width: '100%',
    fontWeight: 'bold',
    backgroundColor: colors.white,
    paddingLeft: 10,
  },
  listBackgroundColor: {
    backgroundColor: colors.background,
    // flex: 1,
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  button: {
    // borderRadius: 20,
    padding: 12,
    elevation: 2,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.button,
  },
  headerSubContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textStyle: {
    color: colors.white,
    fontSize: 18,
  },
  cancelBackgroundColor: {
    backgroundColor: colors.primary,
  },
});
