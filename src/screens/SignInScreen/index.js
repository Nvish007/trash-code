import React, {useState, useEffect} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Text,
  View,
  ImageBackground,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {commonStyles} from '../../components/commonStyle';
import {Images} from '../../assets';
import {styles} from './styles';
import {
  isEmailValidate,
  isEmpty,
  showToast,
  validatePassword,
} from '../../utils/validators';
import {translate} from '../../locales/i18n';
import {useDispatch} from 'react-redux';
import {onLogin} from '../../redux/actions/authAction';
import {getToken} from '../../utils/fcm';
import {isNetworkAvailable} from '../../services/NetInfo';
import ChangeLanguageModal from '../../components/ChangeLanguageModal';

const SiginInScreen = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(''); // demo-admin@geomind.be | admin@test.com
  const [password, setPassword] = useState(''); // test || 098f6bcd4621d373cade4e832627b4f6 | Test@#123
  const [errors] = useState({email: '', password: ''});
  const [showPwd, setShowPwd] = useState(true);
  const [languageKey, setLanguageKey] = useState(0);

  const navigation = useNavigation();

  useEffect(() => {
    console.log('login page loaded');
  }, [languageKey]);

  const signIn = async () => {
    const fcmToken = await getToken();
    console.log('fcm', loginObj);
    let loginObj = {
      email: email,
      password: password,
      device_type: Platform.OS,
      device_token: fcmToken, // 'fcmToken',
    };
    console.log('fcm', loginObj);
    dispatch(onLogin(loginObj));
  };

  const onSubmit = async () => {
    const {isConnected} = await isNetworkAvailable();
    if (!isConnected) {
      showToast(translate('LOGIN.ERROR.networkError'));
      return;
    }
    if (isEmailValidate(email)) {
      showToast(translate('LOGIN.ERROR.EnterValidEmail'));
      return;
    }

    if (isEmpty(password)) {
      showToast(translate('LOGIN.ERROR.PasswordEnter'));
      return;
    }

    if (!isEmailValidate(email)) {
      signIn();
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={commonStyles.container}
        enabled
        keyboardVerticalOffset={10}>
        <View style={styles.modalContainer}>
          <ChangeLanguageModal setLanguageKey={setLanguageKey} />
        </View>
        <ImageBackground
          source={Images.loginBg}
          resizeMode="cover"
          style={commonStyles.image}>
          <View style={styles.logoContainer}>
            <Image
              resizeMode="contain"
              source={Images.loginLogo}
              style={styles.image}
            />
          </View>
          <View style={styles.viewContainer}>
            <Text style={commonStyles.labelStyle}>
              {translate('LOGIN.email')}
            </Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={text => setEmail(text)}
              value={email}
              autoCapitalize="none"
              placeholder={translate('LOGIN.emailPlaceholder')}
              placeholderTextColor="gray"
            />
            {!isEmpty(errors.email) && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <Text style={commonStyles.labelStyle}>
              {translate('LOGIN.password')}
            </Text>
            <TextInput
              style={styles.inputStyle}
              onChangeText={text => setPassword(text)}
              value={password}
              autoCapitalize="none"
              secureTextEntry={showPwd}
              placeholder={translate('LOGIN.passwordPlaceholder')}
              placeholderTextColor="gray"
            />
            {!isEmpty(errors.password) && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <TouchableOpacity
              style={styles.forgotPasswordContainer}
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.forgotPasswordText}>
                {translate('LOGIN.forgot_password')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.loginButtonContainer}
              onPress={onSubmit}>
              <Text style={styles.loginButtonText}>
                {translate('LOGIN.BTN')}
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default SiginInScreen;
