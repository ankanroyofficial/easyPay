import RNFetchBlob from 'rn-fetch-blob';
import{ PermissionsAndroid, Platform,}from 'react-native'
import Toast from 'react-native-simple-toast';
import strings from './lng/LocalizedStrings';

const fileUrl = 'https://changicourt.com/dev/storage/app/public/tier_logo/1629446870.png';

export const checkPermission = async (val) => {

  // Function to check the platform
  // If Platform is Android then check for permissions.

  if (Platform.OS === 'ios') {
    downloadFile(val);
  } else {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message:
            'Application needs access to your storage to download File',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Start downloading
        downloadFile(val);
        // console.log('Storage Permission Granted.');
      } else {
        // If permission denied then show alert
        Alert.alert('Error', 'Storage Permission Not Granted');
      }
    } catch (err) {
      // To handle permission related exception
      console.log("++++" + err);
    }
  }
}
export const downloadFile = (val) => {

  // Get today's date to add the time suffix in filename
  let date = new Date();
  // File URL which we want to download
//   let FILE_URL = fileUrl;
  let FILE_URL = val;
  // Function to get extention of the file url
  let file_ext = getFileExtention(FILE_URL);

  file_ext = '.' + file_ext[0];

  // config: To get response by passing the downloading related options
  // fs: Root directory path to download
  const { config, fs } = RNFetchBlob;

  let RootDir = fs.dirs.PictureDir;



  let options = {
    fileCache: true,
    addAndroidDownloads: {
      path:
        RootDir +
        '/file_' +
        Math.floor(date.getTime() + date.getSeconds() / 2) +
        file_ext,
      description: 'downloading file...',
      notification: true,
      // useDownloadManager works with Android only
      useDownloadManager: true,
    },
  };
  config(options)
    .fetch('GET', FILE_URL)
    .then(res => {
      // Alert after successful downloading
      // console.log('res -> ', JSON.stringify(res));
      // Toast.show('File Downloaded Successfully.');
      Toast.show(strings.PAYMENTHISTORY.DOWNLOADSUCCESSFULLY)
    });
};
export const getFileExtention = fileUrl => {
  // To get the file extension
  return /[.]/.exec(fileUrl) ?
    /[^.]+$/.exec(fileUrl) : undefined;
};