/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Text,
  View,
  Alert,
  Image,
  Pressable,
  Modal,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native-gesture-handler';
import SQLite from 'react-native-sqlite-2';
import {useNavigation} from '@react-navigation/native';
import ReactNativeModal from 'react-native-modal';
import {commonStyles} from '../../components/commonStyle';
import {styles} from './styles';
import {translate} from '../../locales/i18n';
import {useDispatch, useSelector} from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import {isNetworkAvailable} from '../../services/NetInfo';
import {fetchTag, fetchImageSubTag} from '../../redux/actions/tagAction';
import {
  addProjectInfo,
  fetchProject,
  fetchProjectDetails,
  fetchProjectStatus,
  handleUploadDocument,
  handleUploadImages,
  UpdateProjectInfo,
} from '../../redux/actions/projectAction';
import localStorage, {Keys} from '../../utils/localStorage';
import checkPermissionAndRequest from '../../utils/checkPermission';
import {isEmpty, showToast} from '../../utils/validators';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  setIsDocumentUploading,
  setIsImageUploading,
  setProjectDetails,
  setProjectNames,
  setProjectStatusFromProject,
} from '../../redux/reducers/projectSlice';
import {setIsLoading} from '../../redux/reducers/loadingSlice';
import {setTags} from '../../redux/reducers/tagSlice';
import {documentPath, imagePath} from '../../utils/config';
import {selectDataFromTableLocalProject} from '../../utils/initOfflineTable';
import colors from '../../constants/colors';
import MultiSelectDropDown from '../../components/DropDownComponent';
import {resizeImage} from '../../utils/resizeImage';

const SubmitFormScreen = ({route}) => {
  const _DB = SQLite.openDatabase('gm.db', '1.0', '', 1);

  const addRoute = route?.params?.item;

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {tags, imageSubTags} = useSelector(state => state.tag);
  const {userInfo} = useSelector(state => state.auth);
  const {
    projectNames,
    projectStatusForProject,
    projectDetails,
    isImageUploading,
    isDocumentUploading,
  } = useSelector(state => state.project);

  const [projName, setProjName] = useState('');
  const [projDesc, setProjDesc] = useState('');

  const [projType, setprojType] = useState('');
  const [selectedExistProj, setSelectedExistProj] = useState(
    'Select existing Project',
  );
  const [selectedExistProjId, setSelectedExistProjId] = useState(null);
  const [selectLoc, setSelectLoc] = useState(false);
  // const [locationInfo, setLocationInfo] = useState('');
  const [projectDetailsId, setProjectDetailsId] = useState();
  const [images, setImages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [isRoleUser, setIsRoleUser] = useState(false);
  const [isTagOpen, setIsTagOpen] = useState(false);
  const [isProjectSelect, setIsProjectSelect] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [fileResponse, setFileResponse] = useState(null);
  const [selectedTag, setSelectedTag] = useState('Tag');
  const [selectedTagId, setSelectedTagId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('Status');
  const [selectedStatusId, setSelectedStatusId] = useState(null);
  const [projectList, setProjectList] = useState(projectNames);
  const [localProjectList, setLocalProjectList] = useState(null);
  const [checkUploadProcess, setCheckUploadProcess] = useState(0);
  const [coords, setCoords] = useState({
    latitude: null,
    longitude: null,
  });
  const [altitude] = useState(route?.params?.params?.altitude);
  const [headingPosition] = useState(route?.params?.params?.headingPosition);
  const [isShowTags, setIsShowTags] = useState(false);
  const [isShowCommonSubTags, setIsShowCommonSubTags] = useState(false);
  const [selected, setSelected] = useState([]);
  const [commonSubTags, setCommonSubTags] = useState([]);
  const [imageIndexForSubTag, setImageIndexForSubTag] = useState(null);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    if (projType === 'Existing' && !isEmpty(selectedExistProjId)) {
      fetchImageSubTagInfo();
    }
  }, [selectedExistProjId, projType]);

  const routeProject = projectNames?.filter(
    e => e.projectId === addRoute?.projectId,
  );

  const routeStatus =
    addRoute &&
    projectStatusForProject?.filter(e => e.id === addRoute?.status_id);

  const getProjectDetails = async id => {
    const {isConnected} = await isNetworkAvailable();
    if (isConnected && !isEmpty(id)) {
      const token = await localStorage.getItem(Keys.TOKEN);
      const data = {
        id,
      };

      dispatch(fetchProjectDetails({data, token}));
    }
  };

  useEffect(() => {
    if (!isEmpty(projectNames)) {
      setProjectList(projectNames);
    }
  }, [projectNames]);

  useEffect(() => {
    if (!isEmpty(routeProject)) {
      setSelectedExistProjId(currValue =>
        routeProject[0] ? routeProject[0].projectId : currValue,
      );
      setSelectedExistProj(currValue =>
        routeProject[0] ? routeProject[0].name : currValue,
      );
      getProjectDetails(routeProject[0]?.id);
    }
  }, [routeProject?.length]);

  useEffect(() => {
    if (!isEmpty(routeStatus)) {
      setSelectedStatusId(currValue =>
        routeStatus[0] ? routeStatus[0].id : currValue,
      );
      setSelectedStatus(currValue =>
        routeStatus[0] ? routeStatus[0].name : currValue,
      );
    }
  }, [routeStatus?.length]);

  const projectSelect = async element => {
    const {isConnected} = await isNetworkAvailable();
    const data = [element];
    setIsProjectSelect(false);
    setSelectedExistProj(element.name);
    setSelectedExistProjId(
      isEmpty(element.projectId) ? element._id : element.projectId,
    );
    setProjectDetailsId(element.id);
    if (isConnected) {
      getProjectDetails(element.id);
      return;
    }
    dispatch(setProjectDetails(data));
  };

  const updateTag = async element => {
    const {isConnected} = await isNetworkAvailable();
    setIsTagOpen(false);
    const id = isConnected ? element.id : element.Id;
    setSelectedTag(element.name);
    setSelectedTagId(id);
  };

  const statusSelect = async element => {
    const {isConnected} = await isNetworkAvailable();
    const id = isConnected ? element.id : element.Id;
    setIsStatusOpen(false);
    setSelectedStatus(element.name);
    setSelectedStatusId(id);
  };

  const fetchLocalProjects = async () => {
    const data = await selectDataFromTableLocalProject();
    setLocalProjectList(data);
    await _DB.transaction(async txn => {
      txn.executeSql('SELECT * FROM tbl_projects', [], (txt, results) => {
        if (results.rows.length > 0) {
          // const localProject = data.concat(results.rows._array);
          dispatch(setProjectNames(results.rows._array));
          // for (let i = 0; i < results.rows.length; i++) {
          //   projectFetchResultName.push(results.rows.item(i));
          // }
        }
      });
    });
  };

  const fetchProjects = async () => {
    const {isConnected} = await isNetworkAvailable();
    const token = await localStorage.getItem(Keys.TOKEN);
    const cId = await localStorage.getItem(Keys.CID);
    const data = {
      cId,
    };
    if (isConnected) {
      dispatch(fetchProject({data, token}));
    } else {
      fetchLocalProjects();
    }
  };

  const fetchStatus = async () => {
    const {isConnected} = await isNetworkAvailable();
    const token = await localStorage.getItem(Keys.TOKEN);
    const cId = await localStorage.getItem(Keys.CID);
    const type = 'project';
    const data = {
      cId,
      type,
    };
    if (isConnected) {
      dispatch(setIsLoading(true));
      dispatch(fetchProjectStatus({data, token}));
    } else {
      fetchLocalStatus();
    }
  };

  // Fetch From Local DB
  const fetchLocalStatus = async () => {
    await _DB.transaction(async txn => {
      txn.executeSql('SELECT * FROM tbl_status', [], (txt, results) => {
        if (results.rows.length > 0) {
          dispatch(setProjectStatusFromProject(results.rows._array));
        } else {
          console.log('No status available');
        }
      });
    });
  };

  const fetchImageSubTagInfo = async () => {
    const {isConnected} = await isNetworkAvailable();
    const token = await localStorage.getItem(Keys.TOKEN);
    const projectID = selectedExistProjId;
    if (isConnected && !isEmpty(projectID)) {
      dispatch(fetchImageSubTag({projectID, token}));
    }
  };

  const fetchTagInfo = async function () {
    const {isConnected} = await isNetworkAvailable();
    const token = await localStorage.getItem(Keys.TOKEN);
    const cId = await localStorage.getItem(Keys.CID);
    const data = {
      cId,
    };
    if (isConnected) {
      dispatch(fetchTag({data, token}));
    } else {
      fetchLocalTag();
    }
  };

  const addDocumentToLocal = async info => {
    let qry = `INSERT INTO tbl_project_files
      (itemId,projectId,file,fileType,created_at)
      VALUES(?,?,?,?,?)`;
    const date = new Date().toISOString();
    const folderPath = RNFS.DocumentDirectoryPath + documentPath;
    fileResponse.map(async item => {
      let qryData = [info._id, info.project_id, item.name, item.type, date];
      const newPath = `${folderPath}/${item.name}`;
      await RNFS.copyFile(item.uri, newPath);
      _DB.transaction(function (txn) {
        txn.executeSql(qry, qryData, (tx, results) => {
          console.log('resulted added files rows', results.rows.length);
        });
      });
    });
    navigation.navigate('Home');
    showToast(translate('ADDITEM.ERROR.ProjectCreatedSuccessfully'));
  };

  const addImagesToLocal = async info => {
    let qry = `INSERT INTO tbl_project_media
      (itemId,projectId,image,imageType,created_at)
      VALUES(?,?,?,?,?)`;
    const date = new Date().toISOString();
    const folderPath = RNFS.DocumentDirectoryPath + imagePath;
    images.map(async item => {
      let qryData = [
        info._id,
        info.project_id,
        item.fileName,
        'image/jpeg',
        date,
      ];
      const newPath = `${folderPath}/${item.fileName}`;
      await RNFS.copyFile(item.uri, newPath);
      _DB.transaction(function (txn) {
        txn.executeSql(qry, qryData, (tx, results) => {
          console.log('resulted added Images rows', results.rows.length);
        });
      });
    });
    if (!isEmpty(fileResponse)) {
      addDocumentToLocal(info);
      return;
    }
    navigation.navigate('Home');
    showToast(translate('ADDITEM.ERROR.ProjectCreatedSuccessfully'));
  };

  const addNewLocalProject = item => {
    let qry = `INSERT INTO tbl_local_projects
      (name,description,status_id,latitude,longitude,tagsId,location_update,created_at)
      VALUES(?,?,?,?,?,?,?,?)`;
    let qryData = [
      item.name,
      item.description,
      item.status_id,
      item.latitude,
      item.longitude,
      item.tagsId,
      item.location_update,
      new Date().toISOString(),
    ];
    _DB.transaction(function (txn) {
      txn.executeSql(qry, qryData, (tx, results) => {
        txn.executeSql('SELECT * FROM tbl_local_projects', [], (txt, res) => {
          const projectInfo = res.rows._array[res.rows.length - 1];
          addNewLocalProjectItem(projectInfo, true);
        });
      });
    });
  };

  const addNewLocalProjectItem = (item, isFromProject) => {
    let qry = `INSERT INTO tbl_local_project_items
      (name,description,status_id,latitude,longitude,tagsId,project_id,location_update,created_at)
      VALUES(?,?,?,?,?,?,?,?,?)`;
    let qryData = [
      item.name,
      item.description,
      item.status_id,
      item.latitude,
      item.longitude,
      isFromProject ? item.tagsId : item.tag_id,
      isFromProject ? item._id : item.project_id,
      item.location_update,
      new Date().toISOString(),
    ];
    _DB.transaction(function (txn) {
      txn.executeSql(qry, qryData, (tx, results) => {
        // navigation.navigate('Home');
        txn.executeSql(
          'SELECT * FROM tbl_local_project_items',
          [],
          (txt, res) => {
            const projectInfo = res.rows._array[res.rows.length - 1];
            addImagesToLocal(projectInfo);
            showToast(translate('ADDITEM.ERROR.ProjectCreatedSuccessfully'));
          },
        );
      });
    });
  };

  const onUploadDocumentResponse = res => {
    dispatch(setIsDocumentUploading(false));
    showToast(translate('ADDITEM.ERROR.DocumentSuccess'));
    navigation.navigate('Home');
  };

  const uploadDocument = async itemId => {
    const token = await localStorage.getItem(Keys.TOKEN);
    if (!isEmpty(fileResponse[0])) {
      let data = new FormData();
      data.append('file', {
        uri: fileResponse[0].uri,
        type: fileResponse[0].type,
        name: fileResponse[0].name,
      });
      data.append('item_id', itemId);
      dispatch(handleUploadDocument({data, token, onUploadDocumentResponse}));
      return;
    }
    showToast(translate('ADDITEM.ERROR.DocumentArrayLength'));
    navigation.navigate('Home');
  };

  const onUploadImageResponse = (res, index) => {
    if (res?.success === false) {
      showToast(translate('ADDITEM.ERROR.SomethingWntWrong'));
      navigation.navigate('Home');
      return;
    }
    if (res?.success === true && !isEmpty(images[index + 1])) {
      uploadImage(index + 1, res?.data.itemId);
    } else {
      dispatch(setIsImageUploading(false));
      if (!isEmpty(fileResponse)) {
        uploadDocument(res?.data.itemId);
        return;
      }
      showToast(translate('ADDITEM.ERROR.ImageSuceess'));
      navigation.navigate('Home');
    }
  };

  const uploadImage = async (index, itemId) => {
    const token = await localStorage.getItem(Keys.TOKEN);
    if (!isEmpty(images[index])) {
      setCheckUploadProcess(index);
      const isEmptySubTags =
        isEmpty(images[index].sub_tags) || images[index].sub_tags?.length === 0;
      let data = new FormData();
      data.append('file', {
        uri: images[index].uri,
        name: images[index].fileName,
        type: 'image/jpeg',
      });
      data.append('item_id', itemId);
      headingPosition && data.append('heading', headingPosition);
      altitude && data.append('altitude', altitude);
      data.append(
        'sub_tags',
        isEmptySubTags
          ? commonSubTags.toString()
          : images[index].sub_tags.toString(),
      );
      data.append('source', images[index].source);
      console.log('images data', JSON.stringify(data), isEmptySubTags);
      dispatch(handleUploadImages({data, token, index, onUploadImageResponse}));
      return;
    }
    if (!isEmpty(fileResponse[0])) {
      uploadDocument(itemId);
      return;
    }
    showToast(translate('ADDITEM.ERROR.ProjectCreatedSuccessfully'));
    navigation.navigate('Home');
  };

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
      });
      setFileResponse(response);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const askForConfirmation = async data => {
    if (!isEmpty(images[0])) {
      const {isConnected} = await isNetworkAvailable();
      const token = await localStorage.getItem(Keys.TOKEN);
      if (isConnected) {
        if (projType === 'New') {
          dispatch(addProjectInfo({data, token, uploadImage}));
        } else {
          dispatch(UpdateProjectInfo({data, token, uploadImage}));
        }
      } else {
        if (projType === 'New') {
          // Insert new record in tb_local_projects
          addNewLocalProject(data);
        } else {
          addNewLocalProjectItem(data, false);
          // Insert new record in tb_local_project_items
        }
      }
      return;
    }
    showToast(translate('ADDITEM.ERROR.ImageArrayLength'));
  };

  const saveProject = async () => {
    const {isConnected} = await isNetworkAvailable();
    if (isEmpty(images[0])) {
      showToast(translate('ADDITEM.ERROR.ImageArrayLength'));
      return;
    }
    if (isEmpty(projDesc)) {
      showToast(translate('ADDITEM.ERROR.Discription'));
      return;
    }
    if (projType === 'New' && isEmpty(selectedStatusId)) {
      showToast(translate('ADDITEM.ERROR.status'));
      return;
    }
    if (projType === 'New') {
      if (isEmpty(projName)) {
        showToast(translate('ADDITEM.ERROR.EnterProjectName'));
        return;
      }
      if (isEmpty(selectedTagId)) {
        showToast(translate('ADDITEM.ERROR.SelectTags'));
        return;
      }
      const data = {
        name: projName,
        description: projDesc,
        status_id: selectedStatusId,
        latitude: coords.latitude,
        longitude: coords.longitude,
        tagsId: selectedTagId,
        project: projType,
        location_update: selectLoc ? 1 : 0,
      };
      // console.log({data});
      askForConfirmation(data);
      return;
    }
    if (isEmpty(selectedExistProj)) {
      showToast(translate('ADDITEM.ERROR.AddProject'));
      return;
    }
    if (isEmpty(selectedExistProjId)) {
      showToast(translate('ADDITEM.ERROR.AddProject'));
      return;
    }
    // console.log('projectDetails', projectDetails);
    if (projectDetails?.length > 0) {
      if (projectDetails[0]?.location_update === 1) {
        const data = {
          name: selectedExistProj,
          description: projDesc,
          status_id: projectDetails[0].status_id,
          latitude: coords.latitude,
          longitude: coords.longitude,
          tag_id: isEmpty(projectDetails[0]?.tagId)
            ? projectDetails[0]?.tagsId
            : projectDetails[0]?.tagId,
          project_id: selectedExistProjId,
          location_update: 1,
        };
        // console.log({data});
        askForConfirmation(data);
        return;
      }
      const data = {
        name: selectedExistProj,
        description: projDesc,
        status_id: projectDetails[0].status_id,
        location: projectDetails[0]?.locationName,
        latitude: projectDetails[0]?.latitude,
        longitude: projectDetails[0]?.longitude,
        tag_id: isEmpty(projectDetails[0]?.tagId)
          ? projectDetails[0]?.tagsId
          : projectDetails[0]?.tagId,
        project_id: selectedExistProjId,
        location_update: 0,
      };
      // console.log({data});
      askForConfirmation(data);
      return;
    }
  };

  const fetchLocalTag = async () => {
    await _DB.transaction(async txn => {
      txn.executeSql('SELECT * FROM table_tags', [], (txt, results) => {
        if (results.rows.length > 0) {
          dispatch(setTags(results.rows._array));
        }
      });
    });
    //} else {
    //    SQLite.InitDB(false);
    //}
  };

  const setProjType = function (ptype) {
    setprojType(ptype);
  };

  const selectLocation = () => {
    selectLoc ? setSelectLoc(false) : setSelectLoc(true);
  };

  const updateUserRole = async () => {
    const role = await localStorage.getItem(Keys.ROLE);
    if (role) {
      setUserRole(role);
      return;
    }
    setUserRole(userInfo?.role);
  };

  const setCurrentImage = () => {
    if (route?.params?.params?.result) {
      setImages([route?.params?.params?.result]);
      return;
    }
    setImages([]);
  };

  const getCurrentPosition = async () => {
    await checkPermissionAndRequest('location');
    Geolocation.getCurrentPosition(
      position => {
        const {
          coords: {latitude, longitude},
        } = position;
        setCoords(currValue => ({
          ...currValue,
          latitude: latitude,
          longitude: longitude,
        }));
        console.log('location', latitude, longitude);
        // globalService.fetchLocationInfo(latitude, longitude).then(res => {
        //   setLocationInfo(res.formatted_address);
        // });
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 20000},
    );
  };

  useEffect(() => {
    if (userInfo.role !== 'user') {
      setProjType('New');
      setIsRoleUser(false);
    } else {
      setProjType('Existing');
      setIsRoleUser(true);
    }
    if (!isEmpty(addRoute)) {
      setProjType('Existing');
      setIsRoleUser(true);
      setSelectedTagId(addRoute.tagId);
    }

    updateUserRole();
    fetchTagInfo();
    fetchStatus();
    fetchProjects();
    getCurrentPosition();
    setCurrentImage();
  }, []);

  const chooseImages = async type => {
    setModalVisible(false);
    if (images.length > 20) {
      showToast(translate('ADDITEM.ERROR.ImageArrayLimit'));
      return;
    }
    let result = null;
    if (type === 'camera') {
      await checkPermissionAndRequest(type);
      result = await launchCamera({
        mediaType: 'photo',
      });
    } else {
      result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 20,
      });
    }
    if (result.didCancel) {
      showToast(translate('ADDITEM.ERROR.ImageArrayLength'));
      return;
    }
    if (result.assets.length > 1) {
      result.assets.forEach(async item => {
        const imageObj = await resizeImage(item);
        imageObj.source = type;
        imageObj.fileName = imageObj.name;
        setImages(currVal => [...currVal, imageObj]);
      });
      return;
    }
    const imageObj = await resizeImage(result.assets[0]);
    imageObj.source = type;
    imageObj.fileName = imageObj.name;
    if (isEmpty(images[0])) {
      images.shift();
      setTimeout(() => {
        setImages(currVal => [...currVal, imageObj]);
      }, 200);
      return;
    }
    setImages(currVal => [...currVal, imageObj]);
  };

  const getButtonStyle = type => {
    if (projType === type) {
      return commonStyles.buttonWrap;
    }
    return commonStyles.buttonWrapUnSelect;
  };

  const removeImage = item => {
    let filteredArray = images.filter(val => val.uri !== item);
    setImages(filteredArray);
  };

  const filterProjectList = text => {
    const list = projectNames?.filter(data =>
      `/${data.name.toLowerCase()}/gi`.match(text.toLowerCase()),
    );
    setProjectList(list);
  };

  const handleShowTags = async key => {
    const {isConnected} = await isNetworkAvailable();
    if (!isConnected) {
      return;
    }

    setIsShowCommonSubTags(false);
    if (projType === 'New' && !isEmpty(selectedTagId)) {
      setImageIndexForSubTag(key);
      setIsShowTags(true);
      return;
    }
    if (projType === 'New' && isEmpty(selectedTagId)) {
      showToast(translate('ADDITEM.ERROR.SelectTags'));
      return;
    }

    if (isEmpty(selectedExistProjId)) {
      showToast(translate('ADDITEM.ERROR.AddProject'));
      return;
    }
    setIsShowTags(true);
  };

  const handleShowCommonTags = async () => {
    const {isConnected} = await isNetworkAvailable();
    if (!isConnected) {
      return;
    }
    setIsShowTags(false);
    if (projType === 'New' && !isEmpty(selectedTagId)) {
      setIsShowCommonSubTags(true);
      return;
    }
    if (projType === 'New' && isEmpty(selectedTagId)) {
      showToast(translate('ADDITEM.ERROR.SelectTags'));
      return;
    }

    if (isEmpty(selectedExistProjId)) {
      showToast(translate('ADDITEM.ERROR.AddProject'));
      return;
    }
    setIsShowCommonSubTags(true);
  };

  const imageSubTag = imageSubTags?.map(item => {
    return {label: item.name, value: item.id, tagId: item.tag_id};
  });

  const currentTagList = tags?.filter(item => item.id === selectedTagId);

  const handleSelectCommonSubTag = item => {
    setCommonSubTags(item);

    // images[imageIndexForSubTag].sub_tags = item;
    // console.log('images[imageIndexForSubTag]', images[imageIndexForSubTag]);
  };

  const handleSelectSubTag = item => {
    setSelected(item);
    images[imageIndexForSubTag].sub_tags = item;
    console.log(
      'images[imageIndexForSubTag]',
      images[imageIndexForSubTag],
      images[2],
    );
  };

  const subTagsList =
    !isEmpty(currentTagList) &&
    currentTagList[0]?.sub_tags?.map(item => {
      const list = {
        label: item.name,
        value: item.id,
        tagId: item.tag_id,
      };
      return list;
    });

  const getSubTagsStrings = () => {
    if (projType === 'New') {
      const result = commonSubTags?.map(id => {
        const item = subTagsList?.find(val => val.value === id);
        return item ? item.label : null;
      });
      return result.toString();
    }

    const result = commonSubTags?.map(id => {
      const item = imageSubTag?.find(val => val.value === id);
      return item ? item.label : null;
    });
    return result.toString();
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <View style={styles.headerSubContainer}>
          <TouchableOpacity
            style={[styles.headerButton, styles.padding]}
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon name="chevron-back-outline" size={30} color="#fff" />
            <Text style={styles.headerText}>
              {translate('ADDITEM.BackBTN')}
            </Text>
          </TouchableOpacity>
          <Text style={[styles.headerText, styles.headerRightText]}>
            {translate('ADDITEM.newProject')}
          </Text>
          <TouchableOpacity style={styles.headerButton} onPress={saveProject}>
            <Text style={[styles.headerText, styles.headerRightText]}>
              {translate('ADDITEM.Verzenden')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {isImageUploading && (
        <View style={styles.selectedListBackgroundColor}>
          <ActivityIndicator
            color={colors.primary}
            animating={true}
            size="large"
          />
          <Text style={commonStyles.modalText}>{`${translate(
            'ADDITEM.LOADING.Image',
          )} ${checkUploadProcess}/${images?.length}`}</Text>
        </View>
      )}
      {isDocumentUploading && (
        <View style={styles.selectedListBackgroundColor}>
          <ActivityIndicator
            color={colors.primary}
            animating={true}
            size="large"
          />
          <Text style={commonStyles.modalText}>
            {translate('ADDITEM.LOADING.Document')}
          </Text>
        </View>
      )}
      <ScrollView style={commonStyles.formContainer}>
        <View style={styles.viewContainer}>
          <Text>
            {translate('ADDITEM.User')}
            {userRole}
          </Text>
        </View>
        {!isRoleUser && ( //userInfo?.role !== 'user'
          <View style={commonStyles.elBttonWrap}>
            <TouchableOpacity
              style={getButtonStyle('New')}
              onPress={() => {
                setProjType('New');
              }}>
              <Text style={commonStyles.buttonText}>
                {translate('ADDITEM.newProject')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={getButtonStyle('Existing')}
              onPress={() => {
                setProjType('Existing');
              }}>
              <Text style={commonStyles.buttonText}>
                {translate('ADDITEM.existingProject')}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {projType === 'New' && (
          <View style={[commonStyles.elWrap, styles.newProjectView]}>
            <View style={styles.newProjectSubView}>
              <Icon color={'white'} size={22} name="document-outline" />
              <TextInput
                style={styles.inputStyle}
                onChangeText={text => setProjName(text)}
                value={projName}
                placeholder={translate('ADDITEM.TitlePlaceholder')}
                placeholderTextColor={'white'}
              />
            </View>
          </View>
        )}
        {projType === 'New' && (
          <View style={[commonStyles.elWrap, styles.selectView]}>
            <TouchableOpacity
              onPress={() => setIsTagOpen(true)}
              style={styles.selectButton}>
              <Text style={commonStyles.lblStyle}>{selectedTag}</Text>
              <Icon color={'white'} size={22} name="caret-down-outline" />
            </TouchableOpacity>
          </View>
        )}
        {projType !== 'New' && (
          <View style={[commonStyles.elWrap, styles.selectView]}>
            <Pressable
              onPress={() => setIsProjectSelect(true)}
              disabled={!isEmpty(addRoute)}
              style={({pressed}) => [
                {opacity: pressed ? 0.5 : 1},
                styles.selectButton,
              ]}>
              <Text style={commonStyles.lblStyle}>{selectedExistProj}</Text>
            </Pressable>
          </View>
        )}
        <TextInput
          style={styles.descriptionInput}
          onChangeText={text => setProjDesc(text)}
          value={projDesc}
          placeholder={translate('ADDITEM.DescriptionPlaceholder')}
          placeholderTextColor={'white'}
          multiline={true}
        />
        <View style={[commonStyles.elWrap, styles.selectView]}>
          <TouchableOpacity
            onPress={handleShowCommonTags}
            style={styles.selectButton}>
            <Text style={commonStyles.lblStyle}>
              {commonSubTags.length > 0
                ? getSubTagsStrings()
                : translate('ADDITEM.selectTag')}
            </Text>
            <Icon color={'white'} size={22} name="caret-down-outline" />
          </TouchableOpacity>
        </View>
        {projType === 'New' && (
          <View style={[commonStyles.elWrap, styles.selectView]}>
            <Pressable
              style={({pressed}) => [
                {opacity: pressed ? 0.5 : 1},
                styles.selectButton,
              ]}
              onPress={() => setIsStatusOpen(true)}>
              <Text style={commonStyles.lblStyle}>{selectedStatus}</Text>
              <Icon color={'white'} size={22} name="caret-down-outline" />
            </Pressable>
          </View>
        )}
        {projType === 'New' && (
          <View style={[commonStyles.elWrap, styles.selectLocation]}>
            <TouchableOpacity
              onPress={selectLocation}
              style={styles.selectLocationButton}>
              {selectLoc ? (
                <Icon
                  color={'white'}
                  size={22}
                  name="radio-button-on-outline"
                />
              ) : (
                <Icon
                  color={'white'}
                  size={22}
                  name="radio-button-off-outline"
                />
              )}
              <Text style={[commonStyles.lblStyle, styles.lableText]}>
                {translate('ADDITEM.locationUpdate')}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <ScrollView horizontal={true} style={commonStyles.horzScrol}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={commonStyles.sqBtn}>
            <Icon color={'white'} size={52} name="add" />
          </TouchableOpacity>
          {!isEmpty(images[0]) &&
            images?.map((item, key) => {
              return (
                <View key={key}>
                  {images.length > 0 && (
                    <TouchableOpacity
                      style={styles.closeImage}
                      onPress={() => removeImage(item.uri)}>
                      <Icon name="close-circle" size={30} color="#000" />
                    </TouchableOpacity>
                  )}
                  <Pressable
                    onLongPress={() => {
                      handleShowTags(key);
                    }}>
                    <Image style={styles.image} source={{uri: item.uri}} />
                  </Pressable>
                </View>
              );
            })}
        </ScrollView>

        <ScrollView horizontal={true} style={commonStyles.horzScrol}>
          <TouchableOpacity
            onPress={handleDocumentSelection}
            style={commonStyles.sqBtn}>
            <Icon color={'white'} size={52} name="document" />
          </TouchableOpacity>
          {/* {route?.params?.params?.result.assets[0].urii && (
            <Image
              style={styles.image}
              source={{uri: route?.params?.params?.result.assets[0].uri}}
            />
          )} */}
          {!isEmpty(fileResponse) && <Text>{fileResponse[0]?.type}</Text>}
        </ScrollView>
        <View style={styles.inputStyle} />
      </ScrollView>
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
              onPress={() => chooseImages('camera')}>
              <Text style={commonStyles.textStyle}>
                {translate('HOME.ERROR.CameraText')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[commonStyles.button, commonStyles.buttonClose]}
              onPress={() => chooseImages('gallery')}>
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
        animationType="slide"
        transparent={true}
        visible={isImageUploading}
        onRequestClose={() => {
          //Alert.alert("Modal has been closed.");
          // setModalVisible(!modalVisible);
        }}>
        <View style={commonStyles.centeredView}>
          <View style={commonStyles.modalView}>
            <Text
              style={
                commonStyles.modalText
              }>{`Images are uploading... ${checkUploadProcess}/${images?.length}`}</Text>
          </View>
        </View>
      </Modal> */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isStatusOpen}
        onRequestClose={() => {
          //Alert.alert("Modal has been closed.");
          // setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={commonStyles.modalText}>
              {translate('ADDITEM.SelectStatus')}
            </Text>
            {projectStatusForProject?.map((item, key) => {
              return (
                <TouchableOpacity
                  key={key}
                  style={[styles.button, styles.listBackgroundColor]}
                  onPress={() => statusSelect(item)}>
                  <Text style={styles.textStyle}>{item.name}</Text>
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity
              style={[styles.button, styles.cancelBackgroundColor]}
              onPress={() => setIsStatusOpen(false)}>
              <Text style={styles.textStyle}>
                {translate('HOME.ERROR.Cancel')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isTagOpen}
        onRequestClose={() => {
          //Alert.alert("Modal has been closed.");
          // setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredViewTag}>
          <View style={styles.modalView}>
            <Text style={commonStyles.modalText}>
              {translate('ADDITEM.Tag')}
            </Text>
            <KeyboardAvoidingView behavior={'height'}>
              <ScrollView>
                {tags?.map((item, key) => {
                  return (
                    <TouchableOpacity
                      key={key}
                      style={[styles.button, styles.listBackgroundColor]}
                      onPress={() => updateTag(item)}>
                      <Text style={styles.textStyle}>{item.name}</Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </KeyboardAvoidingView>
            <TouchableOpacity
              style={[styles.button, styles.cancelBackgroundColor]}
              onPress={() => setIsTagOpen(false)}>
              <Text style={styles.textStyle}>
                {translate('HOME.ERROR.Cancel')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ReactNativeModal
        isVisible={isProjectSelect}
        animationInTiming={100}
        animationOutTiming={100}
        useNativeDriver={true}>
        <View style={styles.centeredProjectView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeModalIcon}
              onPress={() => setIsProjectSelect(false)}>
              <Icon name="close" size={40} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerModalText}>
              {translate('ADDITEM.SelectProject')}
            </Text>
            <TextInput
              style={styles.searchInputStyle}
              onChangeText={text => filterProjectList(text)}
              placeholder={translate('HOME.searchProject')}
              placeholderTextColor={colors.button}
            />
            <KeyboardAvoidingView behavior={'height'}>
              <ScrollView>
                {projectList?.map((item, key) => {
                  const isSelected = item.name === selectedExistProj;
                  return (
                    <TouchableOpacity
                      key={key}
                      style={[styles.button, styles.listBackgroundColor]}
                      onPress={() => projectSelect(item)}>
                      <View style={styles.headerSubContainer}>
                        <Text style={styles.textStyle}>{item.name}</Text>
                        {isSelected && (
                          <Icon name="checkmark" size={30} color="#000" />
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                })}
                {localProjectList !== 0 &&
                  localProjectList?.map((item, key) => {
                    const isSelected = item.name === selectedExistProj;
                    return (
                      <TouchableOpacity
                        key={key}
                        style={[styles.button, styles.listBackgroundColor]}
                        onPress={() => projectSelect(item)}>
                        <View style={styles.headerSubContainer}>
                          <Text style={styles.textStyle}>{item.name}</Text>
                          {isSelected && (
                            <Icon name="checkmark" size={30} color="#000" />
                          )}
                        </View>
                      </TouchableOpacity>
                    );
                  })}
              </ScrollView>
            </KeyboardAvoidingView>
            <TouchableOpacity
              style={[styles.button, styles.cancelBackgroundColor]}
              onPress={() => setIsProjectSelect(false)}>
              <Text style={styles.textStyle}>
                {translate('HOME.ERROR.Cancel')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ReactNativeModal>
      {isShowTags && (
        <MultiSelectDropDown
          isShowTags={isShowTags}
          selected={selected}
          setIsShowTags={setIsShowTags}
          handleSelectSubTag={handleSelectSubTag}
          tagList={projType === 'New' ? subTagsList : imageSubTag}
        />
      )}
      {isShowCommonSubTags && (
        <MultiSelectDropDown
          isShowTags={isShowCommonSubTags}
          selected={commonSubTags}
          setIsShowTags={setIsShowCommonSubTags}
          handleSelectSubTag={handleSelectCommonSubTag}
          tagList={projType === 'New' ? subTagsList : imageSubTag}
        />
      )}
    </>
  );
};

export default SubmitFormScreen;
