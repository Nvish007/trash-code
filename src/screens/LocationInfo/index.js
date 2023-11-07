/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';
import colors from '../../constants/colors';

const LocationInfo = ({route}) => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: route?.params.item.title,
      headerLeft: () => (
        <TouchableOpacity
          style={[styles.headerButton, styles.padding]}
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="chevron-back-outline" size={30} color="#fff" />
          <Text style={styles.headerText}>Back</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 14, color: colors.shadowColor}}>
        {route.params.item.info}
      </Text>
    </View>
  );
};

export default LocationInfo;
