import React from 'react';
import {ImageBackground, Text, View, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {translate} from '../../locales/i18n';
import {commonStyles} from '../../components/commonStyle';
import {Images} from '../../assets';

const ListScreen = ({route}) => {
  const navigation = useNavigation();
  const {projectInfoFromStatus} = useSelector(state => state.project);
  return (
    <>
      <ImageBackground
        source={Images.loginBg}
        resizeMode="cover"
        style={commonStyles.image}>
        <View style={styles.headerContainer}>
          <View style={styles.headerSubContainer}>
            <TouchableOpacity
              style={[styles.headerButton, styles.padding]}
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon name="chevron-back-outline" size={25} color="#fff" />
              <Text style={styles.headerText}>{translate('LIST.BackBTN')}</Text>
            </TouchableOpacity>
            <Text style={[styles.headerText]}>{translate('LIST.ListBTN')}</Text>
          </View>
        </View>
        <ScrollView>
          {projectInfoFromStatus.length > 0 &&
            projectInfoFromStatus.map((item, key) => {
              return (
                <View key={key} style={styles.viewContainer}>
                  <TouchableOpacity
                    style={styles.cardView}
                    onPress={() =>
                      navigation.navigate('OphalingeDetails', {item})
                    }>
                    <Text style={styles.title}>
                      {translate('LIST.Name')}
                      <Text style={styles.text}>{item.name}</Text>
                    </Text>
                    <Text style={styles.title}>
                      {translate('LIST.Description')}
                      <Text style={styles.text}>{item.description}</Text>
                    </Text>
                    <Text style={styles.title}>
                      {translate('LIST.Location')}
                      <Text style={styles.text}>{item.locationName}</Text>
                    </Text>
                    <Text style={styles.title}>
                      {translate('LIST.Status')}
                      <Text style={styles.text}>{item.statusName}</Text>
                    </Text>
                    <Text style={styles.title}>
                      {translate('LIST.Tag')}
                      <Text style={styles.text}>{item.tagName}</Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default ListScreen;
