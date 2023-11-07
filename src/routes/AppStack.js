import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SubmitFormScreen from '../screens/SubmitForm';
import ShowMapScreen from '../screens/ShowMapScreen.js';
import LocationInfo from '../screens/LocationInfo';
import OphalingeScreen from '../screens/OphalingeScreen';
import OphalingeDetailsScreen from '../screens/OphalingeDetailsScreen';
import ListScreen from '../screens/ListScreen';
import colors from '../constants/colors';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        title: '',
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Submit"
        component={SubmitFormScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ShowMap"
        component={ShowMapScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LocationInfo"
        component={LocationInfo}
        options={{
          headerStyle: {backgroundColor: colors.primary},
          headerTintColor: colors.white,
          title: 'Location Info',
        }}
      />
      <Stack.Screen
        name="Ophalinge"
        component={OphalingeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OphalingeDetails"
        component={OphalingeDetailsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ListScreen"
        component={ListScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeStack"
        options={{headerShown: false}}
        component={HomeStack}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
