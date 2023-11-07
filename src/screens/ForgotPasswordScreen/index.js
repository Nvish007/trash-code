import React, {useState} from 'react';
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
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {translate} from '../../locales/i18n';
import {Images} from '../../assets';
import {commonStyles} from '../../components/commonStyle';
import {forgotPassword} from '../../redux/actions/authAction';
import {isEmailValidate, isEmpty, showToast} from '../../utils/validators';
import {styles} from './styles';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [userName, setuserName] = useState('');
  const [errors] = useState({userName: ''});

  const signIn = async () => {
    let loginObj = {
      email: userName,
    };

    dispatch(forgotPassword(loginObj));
  };

  const onSubmit = () => {
    if (isEmailValidate(userName)) {
      showToast(translate('LOGIN.ERROR.EnterValidEmail'));
    }
    if (!isEmailValidate(userName)) {
      signIn();
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={commonStyles.container}>
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
              onChangeText={text => setuserName(text)}
              value={null}
              placeholder={translate('LOGIN.emailPlaceholder')}
              placeholderTextColor="gray"
            />
            {!isEmpty(errors.userName) && (
              <Text style={styles.errorInputStyle}>{errors.userName}</Text>
            )}
            <TouchableOpacity style={styles.buttonContainer} onPress={onSubmit}>
              <Text style={styles.buttonText}>
                {/*<Icon size={20} name="eye-outline"></Icon>*/}
                {translate('LOGIN.email')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.loginContainer}
              onPress={() => navigation.pop()}>
              <Text style={styles.loginText}>
                {translate('LOGIN.continueLogin')}
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default ForgotPassword;
