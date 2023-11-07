/* eslint-disable react-hooks/exhaustive-deps */
import React, {useRef, useEffect, useState} from 'react';
import {View} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {styles} from './styles';
import checkPermissionAndRequest from '../../utils/checkPermission';
import {useNavigation} from '@react-navigation/native';

const LATITUDE_DELTA = 0.0032; // 0.0922;
const LONGITUDE_DELTA = 0.005; // LATITUDE_DELTA * ASPECT_RATIO;

const ShowMapScreen = () => {
  const navigation = useNavigation();
  const MapViewRef = useRef();
  const [coords, setCoords] = useState({
    latitude: 23.02166251675576,
    longitude: 72.56764451041818,
  });

  const MarkerArray = [
    {
      title: 'Location 1',
      info: 'About location 1',
      coordsINfo: {
        latitude: 23.02166251675576,
        longitude: 72.56764451041818,
      },
    },
    {
      title: 'Location 2',
      info: 'About location 2',
      coordsINfo: {
        latitude: 23.046130000000062,
        longitude: 72.53100000000006,
      },
    },
    {
      title: 'Location 3',
      info: 'About location 3',
      coordsINfo: {
        latitude: 23.014159032764212,
        longitude: 72.56442753598094,
      },
    },
  ];

  const regionAnimation = coordsInfo => {
    MapViewRef.current.animateToRegion(
      {
        latitude: coordsInfo.latitude,
        latitudeDelta: LATITUDE_DELTA,
        longitude: coordsInfo.longitude,
        longitudeDelta: LONGITUDE_DELTA,
      },
      1000,
    );
  };

  const animateToRegion = coordsInfo => {
    const {latitude, longitude} = coordsInfo;
    MapViewRef.current.animateToRegion(
      {
        latitude,
        latitudeDelta: LATITUDE_DELTA,
        longitude,
        longitudeDelta: LONGITUDE_DELTA,
      },
      500,
    );
  };

  useEffect(() => {
    if (coords) {
      animateToRegion(coords);
    }
  }, [coords]);

  const getCurrentPosition = async () => {
    await checkPermissionAndRequest('location');
    Geolocation.getCurrentPosition(
      position => {
        console.log('position', position);
        const {
          coords: {latitude, longitude},
        } = position;
        setCoords(currValue => ({
          ...currValue,
          latitude: latitude,
          longitude: longitude,
        }));
        regionAnimation(coords);
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 20000},
    );
  };

  const mapMarker = () => {
    return MarkerArray.map((item, key) => (
      <Marker
        coordinate={{
          latitude: item.coordsINfo.latitude,
          longitude: item.coordsINfo.longitude,
        }}
        title={item.title}
        description={item.info}
        key={key}
        onCalloutPress={() => navigation.navigate('LocationInfo', {item})}
      />
    ));
  };

  useEffect(() => {
    getCurrentPosition();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        ref={MapViewRef}
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        showsUserLocation={true}
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
  );
};

export default ShowMapScreen;
