import React from 'react';
import {View} from 'react-native';
import LottieView from 'lottie-react-native';
import Modal from 'react-native-modal';
import loading from '../../assets/loading.json';
import styles from './styles';

const LoadingScreen = ({isVisible}) => {
  if (isVisible) {
    return (
      <Modal
        isVisible={isVisible}
        animationInTiming={100}
        animationOutTiming={100}
        useNativeDriver={true}>
        <View style={styles.container}>
          <LottieView
            autoPlay
            loop
            style={styles.loadingIndicator}
            source={loading}
          />
        </View>
      </Modal>
    );
  }
  return null;
};

export default LoadingScreen;
