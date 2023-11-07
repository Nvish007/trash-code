import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  closeModalIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
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
