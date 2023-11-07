import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import {isEmpty, isIOS, showToast} from '../../utils/validators';
import colors from '../../constants/colors';
import ImageModal from '../ImageModal';
import FileViewer from 'react-native-file-viewer';
import {Bar} from 'react-native-progress';
import {translate} from '../../locales/i18n';

const Card = ({
  title,
  user,
  status,
  tag,
  description,
  imageUrl,
  documentUrl,
  children,
}) => {
  const [imagePreview, setImagePreview] = useState(false);
  const [imageUri, setImageUri] = useState('');
  const [progress, setProgress] = useState(0);
  const [documentUrlState, setDocumentUrlState] = useState(
    documentUrl?.map(file => ({...file, showLoader: false})) ?? [],
  );
  const [progressState, setProgressState] = useState(
    documentUrl?.map(() => 0) ?? [],
  );

  const showImage = val => {
    setImageUri(val);
    setImagePreview(true);
  };

  const setProgressStatus = (index, progressStatus) => {
    const updatedProgress = [...progressState];
    updatedProgress[index] = progressStatus;
    setProgressState(updatedProgress);

    if (progressStatus === 0) {
      const updatedDocumentUrlState = documentUrlState.map(obj => ({
        ...obj,
        showLoader: false,
      }));
      setDocumentUrlState(updatedDocumentUrlState);
    }
  };

  const generateNewFileName = async fileName => {
    let newFileName = fileName;
    let suffix = 1;

    while (await RNFS.exists(`${RNFS.DownloadDirectoryPath}/${newFileName}`)) {
      const fileExtension = newFileName.split('.').pop();
      const fileNameWithoutExtension = newFileName.slice(
        0,
        -fileExtension.length - 1,
      );
      newFileName = `${fileNameWithoutExtension} (${suffix}).${fileExtension}`;
      suffix++;
    }

    return newFileName;
  };

  const downloadFile = async (urlString, name, index) => {
    const updatedDocumentUrlState = [...documentUrlState];
    updatedDocumentUrlState[index] = {
      ...updatedDocumentUrlState[index],
      showLoader: true,
    };
    setDocumentUrlState(updatedDocumentUrlState);

    const fileUrl = urlString;
    const fileName = name;
    const pathToFile = isIOS()
      ? `${RNFS.LibraryDirectoryPath}/${fileName}`
      : `${RNFS.DownloadDirectoryPath}/${fileName}`;

    try {
      if (!isIOS()) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          throw new Error('Permission denied for writing to external storage.');
        }
      }

      const fileExists = await RNFS.exists(pathToFile);

      let newFileName = fileName;
      if (fileExists) {
        newFileName = await generateNewFileName(fileName);
      }

      const updatedPath = `${RNFS.DownloadDirectoryPath}/${newFileName}`;

      await RNFS.downloadFile({
        fromUrl: encodeURI(fileUrl),
        toFile: fileExists ? updatedPath : pathToFile,
        progressDivider: 1,
        begin: res => {
          setProgress(0);
        },
        progress: res => {
          const newProgress =
            res.contentLength > 0
              ? res.bytesWritten / res.contentLength
              : res.bytesWritten > 0
              ? res.bytesWritten / res.bytesWritten
              : 0;
          setProgressStatus(index, newProgress);
        },
      })
        .promise.then(res => {
          const completedDocumentUrlState = [...documentUrlState];
          completedDocumentUrlState[index] = {
            ...completedDocumentUrlState[index],
            showLoader: false,
          };
          setDocumentUrlState(completedDocumentUrlState);
          console.log('File downloaded to:', res, pathToFile);
          if (res.statusCode === 200) {
            showToast(translate('OPHALINGEDETAILS.fileDownloadSuccess'));

            if (Platform.OS === 'ios') {
              FileViewer.open(pathToFile);
            }
          }
          setProgressStatus(index, 0);
        })
        .catch(error => {
          const completedDocumentUrlState = [...documentUrlState];
          completedDocumentUrlState[index] = {
            ...completedDocumentUrlState[index],
            showLoader: false,
          };
          setDocumentUrlState(completedDocumentUrlState);
          console.log('Error downloading file:', error);
          setProgressStatus(index, 0);
          showToast(translate('ADDITEM.ERROR.SomethingWntWrong'));
        });
    } catch (error) {
      const completedDocumentUrlState = [...documentUrlState];
      completedDocumentUrlState[index] = {
        ...completedDocumentUrlState[index],
        showLoader: false,
      };
      setDocumentUrlState(completedDocumentUrlState);
      setProgressStatus(index, 0);
      console.log('Error downloading file:', error);
      showToast(translate('ADDITEM.ERROR.SomethingWntWrong'));
    }
  };

  return (
    <>
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        {/* <Text style={styles.description}>{user}</Text> */}
        <Text style={styles.description}>{description}</Text>
        {/* <Text style={styles.description}>{status}</Text>
        <Text style={styles.description}>{tag}</Text> */}
        <ScrollView horizontal={true} style={styles.horzScrol}>
          {!isEmpty(imageUrl) ? (
            imageUrl?.map((val, index) => {
              return (
                <TouchableOpacity
                  style={styles.imageView}
                  onPress={() => showImage(val)}
                  key={index}>
                  <Image style={[styles.image]} source={{uri: val}} />
                </TouchableOpacity>
              );
            })
          ) : (
            <View style={styles.loadingContainer}>
              <ActivityIndicator
                color={colors.primary}
                animating={true}
                size="large"
              />
            </View>
          )}
        </ScrollView>
        <ScrollView style={styles.horzScrol}>
          {!isEmpty(documentUrlState) &&
            documentUrlState.map((val, index) => {
              return (
                <View key={index}>
                  <View style={styles.container}>
                    <View style={styles.subContainer}>
                      <Text style={styles.header}>
                        {val.original_file_name}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={styles.icon}
                      onPress={() =>
                        downloadFile(val.url, val.original_file_name, index)
                      }>
                      {val.showLoader ? (
                        <ActivityIndicator
                          color={colors.primary}
                          animating={true}
                          size="large"
                        />
                      ) : (
                        <Icon
                          name="arrow-down-circle"
                          size={30}
                          color={colors.primary}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
        </ScrollView>
      </View>
      <ImageModal
        imagePreview={imagePreview}
        setImagePreview={setImagePreview}
        imageUri={imageUri}
      />
      {children}
    </>
  );
};

export default Card;
