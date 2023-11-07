import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

export const styles = StyleSheet.create({
  button: {
    // borderRadius: 20,
    padding: 15,
    elevation: 2,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.button,
  },
  cancelBackgroundColor: {
    backgroundColor: colors.primary,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    paddingTop: 30,
  },
  centeredViewTag: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    paddingTop: 100,
    paddingBottom: 10,
  },
  centeredProjectView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingTop: 60,
    paddingBottom: 170,
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
    justifyContent: 'space-between',
    // marginTop: 15,
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerModalText: {
    color: colors.shadowColor,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerRightText: {
    fontWeight: 'bold',
    paddingRight: 10,
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
  viewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 15,
  },
  projectText: {
    paddingLeft: 10,
    paddingTop: 0,
  },
  newProjectView: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  newProjectSubView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputStyle: {
    height: 50,
    width: '90%',
    color: colors.white,
  },
  searchInputStyle: {
    height: 50,
    width: '100%',
    fontWeight: 'bold',
    backgroundColor: colors.white,
    paddingLeft: 10,
  },
  selectView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectButton: {
    alighSelf: 'center',
    justifyContent: 'space-between',
    flex: 1,
    flexDirection: 'row',
  },
  selectLocation: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  selectLocationButton: {
    alighSelf: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    flexDirection: 'row',
  },
  lableText: {
    paddingLeft: 5,
    paddingTop: 2,
  },
  listBackgroundColor: {
    backgroundColor: colors.background,
  },
  selectedListBackgroundColor: {
    backgroundColor: colors.white,
  },
  descriptionInput: {
    height: 150,
    backgroundColor: colors.background,
    borderRadius: 10,
    padding: 20,
    fontSize: 16,
    color: colors.white,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  directionRow: {
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
    marginTop: 7,
  },
  closeImage: {
    position: 'absolute',
    top: -1,
    right: 0,
    zIndex: 1,
  },
  closeModalIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
  },
  textStyle: {
    color: colors.white,
    fontSize: 18,
  },
  selectedTextStyle: {
    color: colors.background,
    fontSize: 18,
  },
  container: {
    padding: 40,
    backgroundColor: 'white',
  },
  dropdown: {
    height: 50,
    backgroundColor: 'transparent',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#000',
  },
  selectedTextModalStyle: {
    fontSize: 18,
    // color: '#000',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    // color: '#000',
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 15,
    // backgroundColor: '#000',
  },
});
