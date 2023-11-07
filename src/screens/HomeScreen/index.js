/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  Alert,
  TouchableOpacity,
  ImageBackground,
  Text,
  View,
  Image,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import messaging from '@react-native-firebase/messaging';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import SQLite from 'react-native-sqlite-2';
// import {useTranslation} from 'react-i18next';
import {useNetInfo} from '@react-native-community/netinfo';
import {commonStyles} from '../../components/commonStyle';
import {Images} from '../../assets';
import localStorage, {Keys} from '../../utils/localStorage';
import {styles} from './styles';
import {getCurrentLocation} from '../../utils/getLocation';
import {
  createLocalChannel,
  showLocalNotification,
  updateToken,
} from '../../utils/fcm';
import i18n, {translate} from '../../locales/i18n';
import {useDispatch, useSelector} from 'react-redux';
import {
  addLocalProjectInfo,
  fetchProject,
  fetchProjectStatus,
  handleUploadDocumentFromLocal,
  handleUploadImagesFromLocal,
  UpdateLocalProjectInfo,
} from '../../redux/actions/projectAction';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Barometer from 'react-native-barometer';
import CompassHeading from 'react-native-compass-heading';
import checkPermissionAndRequest from '../../utils/checkPermission';
import {isEmpty, isIOS, showToast} from '../../utils/validators';
import {HandleSignOut} from '../../redux/actions/authAction';
import {fetchTag} from '../../redux/actions/tagAction';
import {handleLastSync} from '../../redux/actions/syncAction';
import {
  createDocumentFolder,
  createImageFolder,
  createTableLocalProjectItems,
  createTableLocalProjects,
  createTableProjectFiles,
  createTableProjectMedia,
  createTableProjects,
  createTableStatus,
  createTableTags,
  deleteDocumentFolder,
  deleteImagesFolder,
  dropTableLocalProjectFiles,
  dropTableLocalProjectItems,
  dropTableLocalProjectMedia,
  dropTableLocalProjects,
  dropTableProjects,
  dropTableStatus,
  dropTableTags,
  selectDataFromTableLocalProject,
  selectDataFromTableLocalProjectItems,
  selectDataFromTableProjectFiles,
  selectDataFromTableProjectMedia,
} from '../../utils/initOfflineTable';
import RNFS from 'react-native-fs';
import {documentPath, imagePath} from '../../utils/config';
import {resizeImage} from '../../utils/resizeImage';
import {setIsLoading} from '../../redux/reducers/loadingSlice';
import ProjectListModal from '../../components/ProjectListModal';
import {ScrollView} from 'react-native-gesture-handler';
import ChangeLanguageModal from '../../components/ChangeLanguageModal';

const HomeScreen = () => {
  const dispatch = useDispatch();
  // const {i18n} = useTranslation();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const {projectStatusForHome, projectNames} = useSelector(
    state => state.project,
  );
  const [modalVisible, setModalVisible] = useState(false);
  // const [changeLanguageModal, setChangeLanguageModal] = useState(false);
  const [altitude, setAltitude] = useState(null);
  const [headingPosition, setHeadingPosition] = useState(null);
  const [isProjectSelect, setIsProjectSelect] = useState(false);
  const [projectList, setProjectList] = useState(projectNames);
  const [languageKey, setLanguageKey] = useState(0);

  const {isConnected} = useNetInfo();
  const _DB = SQLite.openDatabase('gm.db', '1.0', '', 1);

  const fetchStatusInfo = async () => {
    if (!isConnected) {
      showToast(translate('LOGIN.ERROR.networkError'));
      return;
    }
    const token = await localStorage.getItem(Keys.TOKEN);
    const cId = await localStorage.getItem(Keys.CID);
    const type = 'home';
    const data = {
      cId,
      type,
    };
    dispatch(fetchProjectStatus({data, token}));
  };

  const onFetchTagResponse = res => {
    res?.map(item => {
      let qry = `INSERT INTO table_tags
      (Id,name,description,color,isDeleted,date_created,date_updated,deleted_at)
      VALUES(?,?,?,?,?,?,?,?)`;
      let qryData = [
        item.id,
        item.name,
        item.description,
        item.color,
        item.isDeleted,
        item.created_at,
        item.updated_at,
        item.deleted_at,
      ];
      let q1 = 'SELECT * FROM table_tags where Id = ?';
      let q1D = [item.id];
      _DB.transaction(function (txn) {
        txn.executeSql(q1, q1D, (tx, results) => {
          if (results.rows.length === 0) {
            txn.executeSql(qry, qryData, (transact, response) => {
              txn.executeSql('SELECT * FROM table_tags', [], (txt, resp) => {
                console.log('check res tag from home', JSON.stringify(resp));
              });
            });
          }
        });
      });
    });
  };

  const fetchTagInfo = async () => {
    const token = await localStorage.getItem(Keys.TOKEN);
    const cId = await localStorage.getItem(Keys.CID);
    const data = {
      cId,
    };
    if (isConnected) {
      dispatch(fetchTag({data, token, onFetchTagResponse}));
    }
  };

  const onFetchStatusResponse = resData => {
    resData?.map(item => {
      let qry = `INSERT INTO tbl_status
      (Id,name,status_key,projects_count)
      VALUES(?,?,?,?)`;
      let qryData = [item.id, item.name, item.status_key, item.projects_count];
      let q1 = 'SELECT * FROM tbl_status where Id = ?';
      let q1D = [item.id];
      _DB.transaction(function (txn) {
        txn.executeSql(q1, q1D, (tx, results) => {
          if (results.rows.length === 0) {
            txn.executeSql(qry, qryData, (transact, response) => {
              txn.executeSql('SELECT * FROM tbl_status', [], (txt, res) => {
                console.log('check res status');
              });
            });
          }
        });
      });
    });
  };

  const fetchAllStatusInfo = async () => {
    if (!isConnected) {
      showToast(translate('LOGIN.ERROR.networkError'));
      return;
    }
    const token = await localStorage.getItem(Keys.TOKEN);
    const cId = await localStorage.getItem(Keys.CID);
    const type = 'project';
    const data = {
      cId,
      type,
    };
    dispatch(fetchProjectStatus({data, token, onFetchStatusResponse}));
  };

  const onFetchProjectResponse = resData => {
    resData?.map(item => {
      let qry = `INSERT INTO tbl_projects
      (Id,projectId,name,latitude,longitude,locationName,status_id,tagId,isDeleted,created_at,updated_at,location,location_update)
      VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)`;
      let qryData = [
        item.id,
        item.projectId,
        item.name,
        item.latitude,
        item.longitude,
        item.locationName,
        item.status_id,
        item.tagId,
        item.isDeleted,
        item.created_at,
        item.updated_at,
        item.location,
        item.location_update,
      ];
      let q1 = 'SELECT * FROM tbl_projects where Id = ?';
      let q1D = [item.id];
      _DB.transaction(function (txn) {
        txn.executeSql(q1, q1D, (tx, results) => {
          if (results.rows.length === 0) {
            txn.executeSql(qry, qryData, (transact, response) => {
              txn.executeSql('SELECT * FROM tbl_projects', [], (txt, res) => {
                // console.log('check res project');
              });
            });
          }
        });
      });
    });
  };

  const fetchProjectListInfo = async () => {
    if (!isConnected) {
      showToast(translate('LOGIN.ERROR.networkError'));
      return;
    }
    const token = await localStorage.getItem(Keys.TOKEN);
    const cId = await localStorage.getItem(Keys.CID);
    const data = {
      cId,
    };
    dispatch(fetchProject({data, token, onFetchProjectResponse}));
  };

  const onSyncApiResponse = async (response, date) => {
    console.log('sync response', response, date);
    if (response.tags) {
      console.log('tags need to sycn');
      dropTableTags();
      createTableTags();
      syncLatestData('tag');
    }
    if (response.status) {
      console.log('status need to sycn');
      dropTableStatus();
      createTableStatus();
      syncLatestData('status');
    }
    if (response.projects) {
      console.log('projects need to sycn');
      dropTableProjects();
      createTableProjects();
      syncLatestData('project');
    }
  };

  const syncLatestData = type => {
    fetchTagInfo();
    fetchAllStatusInfo();
    fetchProjectListInfo();
    localStorage.setItem(Keys.LAST_SYNC, new Date().toISOString());
  };

  const onProjectResponse = async (item, response) => {
    console.log('resp >>>>>>|||', item.length, '---->', item);
    console.log('resp >>>>>>|||', response);
    if (item === false) {
      checkIsProjectSyncAvailable();
      return;
    }
    let qry =
      'UPDATE tbl_local_project_items set project_id=? where project_id=?';
    let qryData = [response.projectId, item[0]._id];
    console.log('qryData for update', qryData);
    _DB.transaction(function (txn) {
      txn.executeSql(qry, qryData, (tx, result) => {
        console.log('Update query resulrt', result.rows.length);
        console.log('Update query resulrt', JSON.stringify(result));
      });
    });
    await item.shift();
    AddLocalProjectToLive(item);
  };

  const AddLocalProjectToLive = async item => {
    const token = await localStorage.getItem(Keys.TOKEN);
    console.log('item.length', item.length, '--->', item);
    if (item.length > 0) {
      const data = {
        name: item[0].name,
        description: item[0].description,
        status_id: item[0].status_id,
        latitude: item[0].latitude,
        longitude: item[0].longitude,
        tagsId: item[0].tagsId,
        location_update: item[0].location_update,
        created_at: item[0].created_at,
        item_store: 0,
      };
      console.log('iterated data project', data);
      dispatch(addLocalProjectInfo({data, token, item, onProjectResponse}));
      return;
    }
    if (item.length === 0) {
      dropTableLocalProjects();
      createTableLocalProjects();
      await checkIsProjectItemSyncAvailable();
      // fetchStatusInfo();
    }
  };

  const checkIsProjectSyncAvailable = async () => {
    if (isConnected) {
      !isIOS() && dispatch(setIsLoading(true));
      const dataObj = await selectDataFromTableLocalProject();
      if (dataObj !== 0) {
        await AddLocalProjectToLive(dataObj);
        return;
      }
      await checkIsProjectItemSyncAvailable();
      // fetchStatusInfo();
      console.log('These is nothing to sync from project');
    }
  };

  const onProjectItemResponse = async (item, resData) => {
    console.log('resp >>>>>>|||', item.length, '---->', item);
    console.log('resp >>>>>>|||', resData);
    if (item === false) {
      checkIsProjectSyncAvailable();
      return;
    }
    let qryMedia =
      'UPDATE tbl_project_media set projectId=?, itemId=? where itemId=?';
    let qryDocumnet =
      'UPDATE tbl_project_files set projectId=?, itemId=? where itemId=?';
    let qryData = [resData.projectId, resData.id, item[0]._id];
    console.log('qryData for prject media', qryData);
    _DB.transaction(function (txn) {
      txn.executeSql(qryMedia, qryData, (tx, result) => {
        console.log('Update query project media', result.rows.length);
        console.log('Update query project media', JSON.stringify(result));
      });
      txn.executeSql(qryDocumnet, qryData, (tx, result) => {
        console.log('Update query project document', result.rows.length);
        console.log('Update query project document', JSON.stringify(result));
      });
    });
    await item.shift();
    AddLocalProjectItemToLive(item);
  };

  const AddLocalProjectItemToLive = async item => {
    const token = await localStorage.getItem(Keys.TOKEN);
    console.log('item.length', item.length, '--->', item);
    if (item.length > 0) {
      const data = {
        name: item[0].name,
        description: item[0].description,
        status_id: item[0].status_id,
        latitude: item[0].latitude,
        longitude: item[0].longitude,
        tag_id: item[0].tagsId,
        project_id: item[0].project_id,
        location_update: item[0].location_update,
        created_at: item[0].created_at,
      };
      console.log('iterated data pro item', data);
      dispatch(
        UpdateLocalProjectInfo({data, token, item, onProjectItemResponse}),
      );
      return;
    }
    if (item.length === 0) {
      dropTableLocalProjectItems();
      createTableLocalProjectItems();
      syncLatestData('project');
      await checkIsProjectMediaSyncAvailable();
    }
  };

  const checkIsProjectItemSyncAvailable = async () => {
    if (isConnected) {
      const dataObj = await selectDataFromTableLocalProjectItems();
      if (dataObj !== 0) {
        AddLocalProjectItemToLive(dataObj);
        return;
      }
      dropTableLocalProjects();
      createTableLocalProjects();
      syncLatestData('project');
      await checkIsProjectMediaSyncAvailable();
      // fetchStatusInfo();
      console.log('These is nothing to sync from project item');
    }
  };

  const onResponseFromAddLocal = async item => {
    if (item === false) {
      checkIsProjectSyncAvailable();
      return;
    }
    await item.shift();
    addLocalImagesToLive(item);
  };

  const addLocalImagesToLive = async item => {
    const token = await localStorage.getItem(Keys.TOKEN);
    if (item.length > 0) {
      console.log('{} new item {}', item);
      const imageUri = `file://${RNFS.DocumentDirectoryPath + imagePath}/${
        item[0].image
      }`;
      let data = new FormData();
      data.append('file', {
        uri: imageUri,
        type: item[0].imageType,
        name: item[0].image,
      });
      data.append('item_id', item[0].itemId);
      data.append('source', item[0].source ? item[0].source : 'gallery');
      console.log('images data', JSON.stringify(data));
      dispatch(
        handleUploadImagesFromLocal({
          data,
          token,
          item,
          onResponseFromAddLocal,
        }),
      );
      return;
    }
    await deleteImagesFolder();
    await createImageFolder();
    dropTableLocalProjectMedia();
    createTableProjectMedia();
    await checkIsProjectDocumentSyncAvailable();
    console.log('images are uploaded');
  };

  const checkIsProjectMediaSyncAvailable = async () => {
    if (isConnected) {
      const dataObj = await selectDataFromTableProjectMedia();
      if (dataObj !== 0) {
        console.log('dataObj media', dataObj);
        addLocalImagesToLive(dataObj);
        return;
      }
      await deleteImagesFolder();
      await createImageFolder();
      dropTableLocalProjectMedia();
      createTableProjectMedia();
      await checkIsProjectDocumentSyncAvailable();
      // fetchStatusInfo();
      console.log('These is nothing to sync from media');
    }
  };

  const onUploadDocumentResponse = async item => {
    if (item === false) {
      checkIsProjectSyncAvailable();
      return;
    }
    await item.shift();
    addLocalDocumentToLive(item);
  };

  const addLocalDocumentToLive = async item => {
    const token = await localStorage.getItem(Keys.TOKEN);
    if (item.length > 0) {
      console.log('{} new item {}', item);
      const fileUri = `file://${RNFS.DocumentDirectoryPath + documentPath}/${
        item[0].file
      }`;
      let data = new FormData();
      data.append('file', {
        uri: fileUri,
        type: item[0].fileType,
        name: item[0].file,
      });
      data.append('item_id', item[0].itemId);
      console.log('file data', JSON.stringify(data));
      dispatch(
        handleUploadDocumentFromLocal({
          data,
          token,
          item,
          onUploadDocumentResponse,
        }),
      );
      return;
    }
    await deleteDocumentFolder();
    dropTableLocalProjectFiles();
    await createDocumentFolder();
    createTableProjectFiles();
    console.log('Files are uploaded');
  };

  const checkIsProjectDocumentSyncAvailable = async () => {
    if (isConnected) {
      const dataObj = await selectDataFromTableProjectFiles();
      if (dataObj !== 0) {
        addLocalDocumentToLive(dataObj);
        return;
      }
      await deleteDocumentFolder();
      dropTableLocalProjectFiles();
      await createDocumentFolder();
      createTableProjectFiles();
      dispatch(setIsLoading(false));
      // fetchStatusInfo();
      console.log('These is nothing to sync from Docs');
    }
  };

  const checkLastSyncedTime = async () => {
    const token = await localStorage.getItem(Keys.TOKEN);
    const last_sync_time = await localStorage.getItem(Keys.LAST_SYNC);
    console.log('last_sync_time', last_sync_time);
    if (isEmpty(last_sync_time)) {
      dropTableTags();
      dropTableStatus();
      dropTableProjects();
      createTableTags();
      createTableStatus();
      createTableProjects();
      syncLatestData();
      return;
    }
    const data = {
      last_sync_time,
    };
    if (isConnected) {
      dispatch(handleLastSync({data, token, onSyncApiResponse}));
    }
  };

  const handleOfflineMode = async () => {
    createTableTags();
    createTableStatus();
    createTableProjects();
    createTableLocalProjects();
    createTableLocalProjectItems();
    createTableProjectMedia();
    createTableProjectFiles();
    await createImageFolder();
    await createDocumentFolder();
  };

  const getFileContent = async path => {
    syncLatestData();
  };

  const checkIfSyncAvailable = async () => {
    await checkIsProjectSyncAvailable();
  };

  const handleAltitude = alt => {
    if (altitude === null || altitude !== alt) {
      setAltitude(alt);
      Barometer.stopObserving();
      return;
    }
    Barometer.stopObserving();
  };

  const checkBarometer = async () => {
    const isSupported = await Barometer.isSupported();
    console.log('isSupported', isSupported);
    if (isSupported) {
      Barometer.watch(payload => {
        console.log('payload', payload);
        handleAltitude(payload?.altitude);
      });
    }
  };

  const handleHeading = item => {
    if (headingPosition === null || headingPosition !== item) {
      setHeadingPosition(item);
      CompassHeading.stop();
      return;
    }
    CompassHeading.stop();
  };

  const checkCompassHeading = () => {
    const degree_update_rate = 3;
    console.log('degree_update_rate', degree_update_rate);
    CompassHeading.start(degree_update_rate, ({heading, accuracy}) => {
      console.log('CompassHeading:: ', heading, accuracy);
      handleHeading(heading);
    });
  };

  useEffect(() => {
    console.log('i18n.language', i18n.language);
  }, [languageKey]);

  useEffect(() => {
    if (!isEmpty(projectNames)) {
      setProjectList(projectNames);
    }
  }, [projectNames]);

  useEffect(() => {
    fetchStatusInfo();
    checkLastSyncedTime();
    checkIfSyncAvailable();
  }, [isFocused, isConnected]);

  useEffect(() => {
    fetchProjectListInfo();
    getFileContent();
    handleOfflineMode();
    createLocalChannel();
    const messageListener = messaging().onMessage(showLocalNotification);
    getCurrentLocation();
    // updateToken();
    checkBarometer();
    checkCompassHeading();

    return () => {
      messageListener();
      CompassHeading.stop();
    };
  }, []);

  const handleNavigation = async (result, source) => {
    result.source = source;
    result.fileName = result.name;
    navigation.navigate('Submit', {
      params: {result, altitude, headingPosition, source},
    });
    // if (altitude !== null && headingPosition !== null) {
    //   navigation.navigate('Submit', {
    //     params: {result, altitude, headingPosition},
    //   });
    //   return;
    // }
    // showToast('Something went wrong');
  };

  const chooseFromCamera = async () => {
    setModalVisible(false);
    await checkPermissionAndRequest('camera');
    const result = await launchCamera({
      mediaType: 'photo',
    });
    if (result.didCancel) {
      showToast(translate('HOME.ERROR.ImageArrayLength'));
      return;
    }
    await checkBarometer();
    const imageObj = await resizeImage(result.assets[0]);
    // console.log('imageObj', JSON.stringify(imageObj));
    handleNavigation(imageObj, 'camera');
  };

  const chooseFromGallery = async () => {
    setModalVisible(false);
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });
    if (result.didCancel) {
      showToast(translate('HOME.ERROR.ImageArrayLength'));
      return;
    }
    await checkBarometer();
    const imageObj = await resizeImage(result.assets[0]);
    // console.log('imageObj', JSON.stringify(imageObj));
    handleNavigation(imageObj, 'gallery');
  };

  // const changeLanguage = lng => {
  //   setChangeLanguageModal(false);
  //   i18n.changeLanguage(lng);
  //   localStorage.setItem(Keys.LANGUAGE, lng);
  // };

  const signOut = async () => {
    console.log('logout clicked');
    if (!isConnected) {
      showToast(translate('LOGIN.ERROR.networkError'));
      return;
    }
    Alert.alert(
      translate('HOME.ERROR.LogoutTitle'),
      translate('HOME.ERROR.LogoutMessage'),
      [
        {
          text: translate('HOME.ERROR.LogoutNo'),
          onPress: () => showToast(translate('HOME.ERROR.Cancel')),
          style: 'cancel',
        },
        {
          text: translate('HOME.ERROR.LogoutYes'),
          onPress: () => dispatch(HandleSignOut()),
          style: 'cancel',
        },
      ],
      {
        cancelable: false,
      },
    );
  };

  const onSelectOnStatus = async item => {
    if (!isConnected) {
      showToast(translate('LOGIN.ERROR.networkError'));
      return;
    }
    navigation.navigate('Ophalinge', {statusId: item});
  };

  const filterProjectList = text => {
    const list = projectNames?.filter(data =>
      `/${data.name?.toLowerCase()}/gi`.match(text.toLowerCase()),
    );
    setProjectList(list);
  };

  const handleProjectNavigation = item => {
    setIsProjectSelect(false);
    navigation.navigate('OphalingeDetails', {searchInfo: item});
  };

  return (
    <View style={commonStyles.homeContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.headerSubContainer}>
          <TouchableOpacity
            style={[styles.headerButton]}
            onPress={() => fetchStatusInfo()}>
            <Icon name="sync-outline" size={30} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.headerRightButton]}
            onPress={signOut}>
            <Icon name="exit-outline" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <ImageBackground
        source={Images.loginBg}
        resizeMode="cover"
        style={[commonStyles.image]}>
        {/* <TouchableOpacity
          onPress={() => setChangeLanguageModal(true)}
          style={styles.changeLanguageView}>
          <Text style={styles.changeLanguageText}>Language</Text>
          <Icon size={22} name="caret-down" color="#000" />
        </TouchableOpacity> */}
        <View style={[styles.changeLanguageView]}>
          <TouchableOpacity
            style={styles.container}
            activeOpacity={0.5}
            onPress={() => setIsProjectSelect(true)}>
            <Icon name="search" size={20} color="white" />
            <Text style={styles.buttonText}>
              {translate('HOME.searchProject')}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.modalContainer}>
          <ChangeLanguageModal
            ModalStyle={styles.modalView}
            setLanguageKey={setLanguageKey}
          />
        </View>
        <View style={styles.logoContainer}>
          <View style={[styles.viewContainer]}>
            <Image
              resizeMode="contain"
              style={styles.image}
              source={Images.loginLogo}
            />
          </View>
        </View>
        <View style={[styles.listContainer]}>
          <ScrollView>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.buttonText}>
                <Icon size={21} name="camera-outline" /> {translate('HOME.BTN')}
              </Text>
            </TouchableOpacity>
            {projectStatusForHome &&
              projectStatusForHome.map((item, key) => {
                return (
                  <TouchableOpacity
                    style={[styles.buttonContainer]}
                    onPress={() => onSelectOnStatus(item.id)}
                    key={key}>
                    <Text style={[styles.buttonText, styles.centerText]}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
        </View>
      </ImageBackground>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          //Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}>
        <View style={commonStyles.centeredView}>
          <View style={commonStyles.modalView}>
            <Text style={commonStyles.modalText}>
              {translate('HOME.ERROR.MenuTitle')}
            </Text>
            <TouchableOpacity
              style={[commonStyles.button, commonStyles.buttonClose]}
              onPress={chooseFromCamera}>
              <Text style={commonStyles.textStyle}>
                {translate('HOME.ERROR.CameraText')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[commonStyles.button, commonStyles.buttonClose]}
              onPress={chooseFromGallery}>
              <Text style={commonStyles.textStyle}>
                {translate('HOME.ERROR.GalleryText')}
              </Text>
            </TouchableOpacity>
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
      {/* <Modal
        animationType="fade"
        transparent={true}
        visible={changeLanguageModal}
        onRequestClose={() => {
          setChangeLanguageModal(!changeLanguageModal);
        }}>
        <View style={commonStyles.centeredViewModal}>
          <View style={commonStyles.modalView}>
            <Text style={commonStyles.modalText}>Select Language</Text>
            <TouchableOpacity
              style={[commonStyles.button, commonStyles.buttonClose]}
              onPress={() => changeLanguage('en')}>
              <Text style={commonStyles.textStyle}>En</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[commonStyles.button, commonStyles.buttonClose]}
              onPress={() => changeLanguage('nl')}>
              <Text style={commonStyles.textStyle}>Nl</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[commonStyles.button, commonStyles.buttonClose]}
              onPress={() => setChangeLanguageModal(false)}>
              <Text style={commonStyles.textStyle}>
                {translate('HOME.ERROR.Cancel')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}
      <ProjectListModal
        filterProjectList={filterProjectList}
        isProjectSelect={isProjectSelect}
        projectList={projectList}
        setIsProjectSelect={setIsProjectSelect}
        handleNavigation={handleProjectNavigation}
      />
    </View>
  );
};

export default HomeScreen;
