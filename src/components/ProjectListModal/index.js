import React from 'react';
import {
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  View,
  TextInput,
} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {translate} from '../../locales/i18n';
import styles from './styles';
import colors from '../../constants/colors';

const ProjectListModal = ({
  isProjectSelect,
  setIsProjectSelect,
  filterProjectList,
  projectList,
  handleNavigation,
}) => {
  return (
    <ReactNativeModal
      isVisible={isProjectSelect}
      animationInTiming={100}
      animationOutTiming={100}
      useNativeDriver={true}>
      <View style={styles.centeredProjectView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={styles.closeModalIcon}
            onPress={() => setIsProjectSelect(false)}>
            <Icon name="close" size={40} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerModalText}>
            {translate('ADDITEM.SelectProject')}
          </Text>
          <TextInput
            style={styles.searchInputStyle}
            onChangeText={text => filterProjectList(text)}
            placeholder={translate('HOME.searchProject')}
            placeholderTextColor={colors.button}
          />
          <KeyboardAvoidingView behavior={'height'}>
            <ScrollView>
              {projectList?.map((item, key) => {
                return (
                  <TouchableOpacity
                    key={key}
                    activeOpacity={0.5}
                    style={[styles.button, styles.listBackgroundColor]}
                    onPress={() => handleNavigation(item)}>
                    <View style={styles.headerSubContainer}>
                      <Text style={styles.textStyle}>{item.name}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </KeyboardAvoidingView>
          <TouchableOpacity
            style={[styles.button, styles.cancelBackgroundColor]}
            onPress={() => setIsProjectSelect(false)}>
            <Text style={styles.textStyle}>
              {translate('HOME.ERROR.Cancel')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ReactNativeModal>
  );
};

export default ProjectListModal;
