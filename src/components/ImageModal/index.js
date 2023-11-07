import React, {useRef} from 'react';
import {Animated, View, Modal, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  PinchGestureHandler,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import styles from './styles';

const ImageModal = ({
  imagePreview,
  setImagePreview,
  imageUri,
  isSource = false,
}) => {
  const scale = useRef(new Animated.Value(1)).current;
  const HandlePinch = new Animated.event([{nativeEvent: {scale: scale}}], {
    useNativeDriver: false,
  });

  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={imagePreview}
      onRequestClose={() => setImagePreview(!imagePreview)}>
      <TouchableOpacity
        style={styles.closeModal}
        onPress={() => setImagePreview(!imagePreview)}>
        <Icon name="close" size={40} color="#000" />
      </TouchableOpacity>
      <View style={styles.modalContainer}>
        <GestureHandlerRootView>
          <PinchGestureHandler onGestureEvent={HandlePinch}>
            <Animated.Image
              style={[styles.imageModal, {transform: [{scale}]}]}
              source={isSource ? imageUri : {uri: imageUri}}
            />
          </PinchGestureHandler>
        </GestureHandlerRootView>
      </View>
    </Modal>
  );
};

export default ImageModal;
