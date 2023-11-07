/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/Ionicons';
import {fetchProjectFromStatus} from '../../redux/actions/projectAction';
import {isNetworkAvailable} from '../../services/NetInfo';
import localStorage, {Keys} from '../../utils/localStorage';
import checkPermissionAndRequest from '../../utils/checkPermission';
import {styles} from './styles';
import {setIsLoading} from '../../redux/reducers/loadingSlice';
import {translate} from '../../locales/i18n';

const LATITUDE_DELTA = 0.0032; // 0.0922;
const LONGITUDE_DELTA = 0.005; // LATITUDE_DELTA * ASPECT_RATIO;

const OphalingeScreen = props => {
  const {statusId} = props?.route?.params;
  const dispatch = useDispatch();
  const {projectInfoFromStatus} = useSelector(state => state.project);
  const navigation = useNavigation();
  const MapViewRef = useRef(null);
  const [coords] = useState({
    latitude: 50.991043,
    longitude: 3.847886,
  });

  const getProjectFromStatus = async () => {
    const {isConnected} = await isNetworkAvailable();
    const token = await localStorage.getItem(Keys.TOKEN);
    const cId = await localStorage.getItem(Keys.CID);
    const data = {
      cId,
      status_id: statusId,
    };
    console.log('Ophalinge', data, isConnected);
    dispatch(setIsLoading(true));
    dispatch(fetchProjectFromStatus({data, token}));
  };

  const animateToRegion = coordsInfo => {
    const {latitude, longitude} = coordsInfo;
    if (MapViewRef.current) {
      MapViewRef.current.animateToRegion(
        {
          latitude: parseFloat(latitude),
          latitudeDelta: LATITUDE_DELTA,
          longitude: parseFloat(longitude),
          longitudeDelta: LONGITUDE_DELTA,
        },
        500,
      );
    }
  };

  useEffect(() => {
    // projectInfoFromStatus?.map((item, key) => {
    //   animateToRegion(item);
    // });
    setTimeout(() => {
      if (projectInfoFromStatus.length > 0) {
        animateToRegion(projectInfoFromStatus[0]);
      }
    }, 1000);
  }, [projectInfoFromStatus]);

  const getCurrentPosition = async () => {
    await checkPermissionAndRequest('location');
    Geolocation.getCurrentPosition(
      position => {
        console.log('position', position);
        const {
          coords: {latitude, longitude},
        } = position;
        console.log(latitude, longitude);
        // setCoords(currValue => ({
        //   ...currValue,
        //   latitude: latitude,
        //   longitude: longitude,
        // }));
        // regionAnimation(coords);
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 20000},
    );
  };

  const mapMarker = () => {
    return (
      projectInfoFromStatus?.length > 0 &&
      projectInfoFromStatus.map((item, key) => (
        <Marker
          coordinate={{
            latitude:
              item.latitude === '0'
                ? coords.latitude
                : parseFloat(item.latitude),
            longitude:
              item.longitude === '0'
                ? coords.longitude
                : parseFloat(item.longitude),
          }}
          key={key}>
          <Callout
            width={300}
            onPress={() => navigation.navigate('OphalingeDetails', {item})}>
            <Text
              style={[styles.calloutTitleText, styles.calloutDescriptionText]}>
              {item.name}
            </Text>
            <Text style={styles.calloutDescriptionText}>
              {item.locationName}
            </Text>
          </Callout>
        </Marker>
      ))
    );
  };

  useEffect(() => {
    getProjectFromStatus();
    getCurrentPosition();
  }, []);

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
              {translate('OPHALINGE.BackBTN')}
            </Text>
          </TouchableOpacity>
          {/* <Text style={[styles.headerText, styles.headerRightText]}>
            Ophalinge
          </Text> */}
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.navigate('ListScreen')}>
            <Text style={[styles.headerText, styles.headerRightText]}>
              {translate('OPHALINGE.ListBTN')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.container}>
        <MapView
          ref={MapViewRef}
          provider={PROVIDER_GOOGLE}
          style={styles.mapStyle}
          zoomEnabled={true}
          zoomControlEnabled={false}
          initialRegion={{
            ...coords,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}>
          {mapMarker()}
        </MapView>
      </View>
    </>
  );
};

export default OphalingeScreen;
