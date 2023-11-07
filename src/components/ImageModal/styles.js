import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    top: '10%',
    left: 10,
  },
  closeModal: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  imageModal: {
    width: width * 0.95,
    height: width * 0.95 * 1.7,
  },
});
