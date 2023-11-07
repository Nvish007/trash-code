import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SiginInScreen from '../screens/SignInScreen';
import ForgotPassword from '../screens/ForgotPasswordScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SignIn" component={SiginInScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export default AuthStack;
