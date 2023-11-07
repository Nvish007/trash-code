import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import Router from './src/routes/Router';
import './src/locales/i18n';
import localStorage, {Keys} from './src/utils/localStorage';
import i18n from './src/locales/i18n';
import {detectLanguageAndSetAppLanguage} from './src/utils/detectLanguage';
import {Provider, useSelector} from 'react-redux';
import {store} from './src/redux/store';
import {commonStyles} from './src/components/commonStyle';
import colors from './src/constants/colors';

const MyStatusBar = ({backgroundColor, ...props}) => {
  const {isLoggedIn} = useSelector(state => state.auth);
  return (
    <View
      style={[
        commonStyles.statusBar,
        {backgroundColor: isLoggedIn ? backgroundColor : colors.white},
      ]}>
      <SafeAreaView>
        <StatusBar
          barStyle={isLoggedIn ? 'light-content' : 'dark-content'}
          translucent
          backgroundColor={isLoggedIn ? backgroundColor : colors.white}
          {...props}
        />
      </SafeAreaView>
    </View>
  );
};

const App = () => {
  const initializeLanguage = async () => {
    const storedLanguage = await localStorage.getItem(Keys.LANGUAGE);
    const deviceLanguage = await detectLanguageAndSetAppLanguage();
    if (storedLanguage !== null) {
      i18n.changeLanguage(storedLanguage);
      return;
    }
    i18n.changeLanguage(deviceLanguage);
    localStorage.setItem(Keys.LANGUAGE, deviceLanguage);
  };

  useEffect(() => {
    initializeLanguage();
  }, []);

  return (
    <Provider store={store}>
      <View style={commonStyles.container}>
        <MyStatusBar backgroundColor={colors.primary} />
        <Router />
      </View>
    </Provider>
  );
};

export default App;
