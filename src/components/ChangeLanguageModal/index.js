/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View, Text, Modal} from 'react-native';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/Ionicons';
import {translate} from '../../locales/i18n';
import localStorage, {Keys} from '../../utils/localStorage';
import {commonStyles} from '../../components/commonStyle';
import {styles} from './styles';

const ChangeLanguageModal = ({ModalStyle, setLanguageKey}) => {
  const {i18n} = useTranslation();
  const [changeLanguageModal, setChangeLanguageModal] = useState(false);
  const [currentLang, setCurrentLang] = useState(null);

  const changeLanguage = lng => {
    setChangeLanguageModal(false);
    i18n.changeLanguage(lng);
    setLanguageKey(prevKey => prevKey + 1);
    localStorage.setItem(Keys.LANGUAGE, lng);
  };

  const getCurrentLanguage = () => {
    switch (i18n.language) {
      case 'en':
        setCurrentLang('English');
        break;
      case 'nl':
        setCurrentLang('Dutch');
        break;
      case 'de':
        setCurrentLang('German');
        break;
      case 'fr':
        setCurrentLang('French');
        break;
      case 'tr':
        setCurrentLang('Turkish');
        break;
      default:
        setCurrentLang('');
    }
  };

  useEffect(() => {
    if (currentLang === null) {
      getCurrentLanguage();
    }
    setLanguageKey(prevKey => prevKey + 1);
  }, [currentLang]);

  useEffect(() => {
    i18n.on('languageChanged', () => getCurrentLanguage());

    return () => {
      i18n.off('languageChanged', () => getCurrentLanguage());
    };
  }, []);

  return (
    <View>
      <TouchableOpacity
        onPress={() => setChangeLanguageModal(true)}
        style={styles.changeLanguageView}>
        <Text style={styles.changeLanguageText}>{currentLang}</Text>
        <Icon size={22} name="caret-down" color="#000" />
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={changeLanguageModal}
        onRequestClose={() => {
          setChangeLanguageModal(!changeLanguageModal);
        }}>
        <View style={[commonStyles.centeredViewModal, ModalStyle]}>
          <View style={commonStyles.modalView}>
            <Text style={commonStyles.modalText}>Select Language</Text>
            <TouchableOpacity
              style={[commonStyles.button, commonStyles.buttonClose]}
              onPress={() => changeLanguage('en')}>
              <Text style={commonStyles.textStyle}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[commonStyles.button, commonStyles.buttonClose]}
              onPress={() => changeLanguage('nl')}>
              <Text style={commonStyles.textStyle}>Dutch</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[commonStyles.button, commonStyles.buttonClose]}
              onPress={() => changeLanguage('fr')}>
              <Text style={commonStyles.textStyle}>French</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[commonStyles.button, commonStyles.buttonClose]}
              onPress={() => changeLanguage('de')}>
              <Text style={commonStyles.textStyle}>German</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[commonStyles.button, commonStyles.buttonClose]}
              onPress={() => changeLanguage('tr')}>
              <Text style={commonStyles.textStyle}>Turkish</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[commonStyles.button, commonStyles.buttonClose]}
              onPress={() => setChangeLanguageModal(false)}>
              <Text style={commonStyles.textStyle}>
                {translate('HOME.ERROR.Cancel')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ChangeLanguageModal;
