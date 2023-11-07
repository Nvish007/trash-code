/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  Modal,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native-gesture-handler';
import dayjs from 'dayjs';
import {translate} from '../../locales/i18n';
import {
  fetchAllProjectDates,
  fetchProjectDetailFromId,
  fetchProjectItemFromProjectId,
} from '../../redux/actions/OphalingeAction';
import localStorage, {Keys} from '../../utils/localStorage';
import {styles} from './styles';
import {commonStyles} from '../../components/commonStyle';
import {Images} from '../../assets';
import Card from '../../components/CardComponent';
import {isEmpty} from '../../utils/validators';

const OphalingeDetailsScreen = props => {
  const {item} = props?.route?.params;
  const {searchInfo} = props?.route?.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {allProjectDates, ophalingeProjectDetails, projectItemList} =
    useSelector(state => state.ophalinge);

  const [modalVisible, setModalVisible] = useState(false);

  const projectDetailsFromId = async value => {
    const token = await localStorage.getItem(Keys.TOKEN);
    if (isEmpty(searchInfo)) {
      const data = {
        id: item?.id,
      };
      dispatch(fetchProjectDetailFromId({data, token}));
    }
  };

  const getPRojectItemDetails = async () => {
    const token = await localStorage.getItem(Keys.TOKEN);
    const body = {
      projectId: item?.projectId ? item?.projectId : searchInfo?.projectId,
      token,
    };
    dispatch(fetchProjectItemFromProjectId(body));
    setModalVisible(false);
  };

  const getAllProjectDates = async () => {
    const token = await localStorage.getItem(Keys.TOKEN);
    const data = {
      project_id: ophalingeProjectDetails?.projectId,
    };
    console.log('Ophalinge Details', data);
    dispatch(fetchAllProjectDates({data, token}));
    setModalVisible(true);
    // setTimeout(() => {
    //   if (allProjectDates?.length > 0) {
    //     setModalVisible(true);
    //     return;
    //   }
    // }, 500);
  };

  useEffect(() => {
    projectDetailsFromId();
  }, []);

  useEffect(() => {
    getPRojectItemDetails();
  }, [item?.projectId, searchInfo?.projectId]);

  useEffect(() => {
    console.log('allProjectDates', allProjectDates);
  }, [allProjectDates]);

  return (
    <>
      <View style={styles.headerContainer}>
        <View style={styles.headerSubContainer}>
          <TouchableOpacity
            style={[styles.headerButton, styles.padding]}
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon name="chevron-back-outline" size={25} color="#fff" />
            <Text style={styles.headerText}>
              {translate('OPHALINGEDETAILS.BackBTN')}
            </Text>
          </TouchableOpacity>
          <View style={styles.titleText}>
            <Text
              numberOfLines={1}
              style={[styles.headerText, styles.headerRightText]}>
              {item?.name}
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.headerButton, styles.headerRightText]}
            onPress={
              () =>
                navigation.navigate('Submit', {
                  item: item ? ophalingeProjectDetails : searchInfo,
                }) // getAllProjectDates
            }>
            <Icon name="add" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <ImageBackground
        source={Images.loginBg}
        resizeMode="cover"
        style={commonStyles.image}>
        <ScrollView>
          {projectItemList?.items_desc.map((value, key) => {
            return (
              <View key={key} style={styles.cardContainer}>
                <Card
                  user={`${translate('OPHALINGEDETAILS.type')}: ${value.name}`}
                  title={`By: ${value.userName} at ${dayjs(
                    value.created_at,
                  ).format('DD-MM-YYYY')}`}
                  status={`${translate('OPHALINGEDETAILS.statusName')}: ${
                    value.statusName
                  }`}
                  tag={`${translate('OPHALINGEDETAILS.tagName')}: ${
                    value.tagName
                  }`}
                  description={`${translate(
                    'OPHALINGEDETAILS.Beschrijving',
                  )}: ${value.description}`}
                  imageUrl={value?.urls}
                  documentUrl={value?.files}
                />
              </View>
            );
          })}
        </ScrollView>
        {/* <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() =>
            navigation.navigate('Submit', {item: ophalingeProjectDetails})
          }>
          <Text style={styles.buttonText}>Add Item</Text>
        </TouchableOpacity> */}
      </ImageBackground>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <View style={commonStyles.centeredView}>
          <View style={commonStyles.modalView}>
            {allProjectDates?.map((ietmInfo, key) => {
              const date = dayjs(ietmInfo.created_at).format(
                'DD-MM-YYYY HH:mm:ss',
              );
              return (
                <TouchableOpacity
                  style={[commonStyles.button, commonStyles.buttonClose]}
                  onPress={() => projectDetailsFromId(ietmInfo.id)}
                  key={key}>
                  <Text style={commonStyles.textStyle}>{date}</Text>
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity
              style={[commonStyles.button, commonStyles.buttonClose]}
              onPress={() => setModalVisible(false)}>
              <Text style={commonStyles.textStyle}>
                {translate('HOME.ERROR.Cancel')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default OphalingeDetailsScreen;
