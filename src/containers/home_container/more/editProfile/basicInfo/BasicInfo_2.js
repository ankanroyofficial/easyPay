import React, { useEffect, useRef, useState, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Pressable,
  Modal,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  ActivityIndicator,
  Linking,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import axios from 'axios';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Colors } from '../../../../../constants/colors';
import images from '../../../../../constants/images';
import Normalize from '../../../../../helpers/Dimens';
import { engToPersian } from '../../../../../constants/EnglishToPersian';
import Header from '../../../../../components/Header';
import styles from './Styles';
import Button from '../../../../../components/Button';
import strings from '../../../../../constants/lng/LocalizedStrings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CheckBox as ChkBox } from 'react-native-elements';
import LoaderPage from '../../../../../components/LoaderPage';
import { CommonActions } from '@react-navigation/native';
import moment from 'moment';
import ImagePicker from 'react-native-image-crop-picker';
import { rowOrRowreverse } from '../../../../../constants/RowOrRowreverse';
import { myContext } from '../../../../../constants/ContextApi';
import { axiosUrl, ImageLink } from '../../../../../constants/LinkPage';
import axiosInstance from '../../../../../constants/AxiosCallPage';
import CurveDesing_Component from '../../../../../constants/CurveDesing_Component';
import globalstyles from '../../../../../constants/globalStyles/Global_Styles';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { androidCameraPermission } from '../../../../../constants/permissions/Permissions';
import CustomTab from '../../../../../components/CustomTabforProfile';
import { Constant_apis } from '../../../../../constants/Constant_api';
import Category_Choose_Page from '../../../../../components/Category_Choose_Page';
import { numberWithCommas } from '../../../../../constants/NumberWithComma';
import { is_search } from '../../../../../constants/KeyWordSearch';
import Feather from 'react-native-vector-icons/Feather';
import MapView, { Marker } from 'react-native-maps';
function BasicInfo_2({ navigation }) {
  const { RtlStyles, isRtl, language, setLanguage, selectedName } =
    useRtlContext();
  const {
    token,
    setPh_email_verify,
    phone_number,
    setPhone_numbe,
    email_Address,
    setEmail_Address,
    activeTab,
    setActiveTab,
    choose_Categories,
    setChoose_Categories,
    all_country_code,
    slugName,
    allSkill,
    setAllSkill,
    alllanguage,
    setAlllanguage,
  } = useContext(myContext);
  const [loader, setLoader] = useState(false);
  const [tagline, setTagline] = useState('');
  const [qualification, setQualification] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountHolderName, setAccountHolderName] = useState('');
  const [profile_picture, setProfile_picture] = useState('');
  const [background_image, setBackground_image] = useState('');
  const [about_me, setAbout_me] = useState('');
  const [openCountryModel, setOpenCountryModel] = useState(false);
  const [openLangModel, setOpenLangModel] = useState(false);
  const [location, setLocation] = useState({
    name: '',
    lat: '',
    lng: '',
  });
  const [storageData, setStorageData] = useState();
  const [selectProfilegallary, setSelectProfilegallary] = useState();
  const [selectbackgroudgallary, setSelectbackgroudgallary] = useState();
  const ref = useRef();
  const [taglineIsFocused, setTaglineIsFocused] = useState(false);
  const [highqualiIsFocused, setHighqualiIsFocused] = useState(false);
  const [aboutIsFocused, setAboutIsFocused] = useState(false);
  const [bankNameIsFocused, setBankNameIsFocused] = useState(false);
  const [holderNameIsFocused, setHolderNameIsFocused] = useState(false);
  const [accNumberIsFocused, setAccNumberIsFocused] = useState(false);
  const [fromWhereModal_profile, setFromWhereModal_profile] = useState(false);
  const [fromWhereModal_cover, setFromWhereModal_cover] = useState(false);
  const [isSkillModal, setIsSkillModal] = useState(false);
  const [skill_search_keyword, setSkill_search_keyword] = useState('');
  const [isgetAroundModal, setIsgetAroundModal] = useState(false);

  const [portfolioImages, setPortfolioImages] = useState([]);
  const [imageFinalArray, setImageFinalArray] = useState([]);
  const [loader2, setLoader2] = useState(false);
  const [slug, setSlug] = useState('');
  const [apiImages, setApiImages] = useState([]);
  var englishTommorow = new Date();
  englishTommorow.setDate(englishTommorow.getDate() + 1);
  const [getAround, setGetAround] = useState([
    {
      id: 0,
      name: strings.BASICINFO.BICYCLE,
      value: 'B',
      isSelected: false,
    },
    {
      id: 1,
      name: strings.BASICINFO.CAR,
      value: 'C',
      isSelected: false,
    },
    {
      id: 2,
      name: strings.BASICINFO.ONLINE,
      value: 'O',
      isSelected: false,
    },
    {
      id: 3,
      name: strings.BASICINFO.SCOOTER,
      value: 'S',
      isSelected: false,
    },
    {
      id: 4,
      name: strings.BASICINFO.TRUCK,
      value: 'T',
      isSelected: false,
    },
    {
      id: 5,
      name: strings.BASICINFO.WALK,
      value: 'W',
      isSelected: false,
    },
  ]);

  const portfoliodata = async () => {
    try {
      var data = await axios.post(`${axiosUrl.URL}public-profile`, {
        jsonrpc: '2.0',
        params: {
          slug: `${slugName}`,
        },
      });
      if (data.data.result != undefined) {
        setApiImages(data.data.result.user.get_user_to_portfolio);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(async () => {
    portfoliodata();
    return () => {
      portfoliodata();
    };
  }, [slugName]);

  const onpressSkill = () => {
    setIsSkillModal(!isSkillModal);
  };
  const onpressGetaround = () => {
    setIsgetAroundModal(!isgetAroundModal);
  };
  const onpresslanuageModal = () => {
    setOpenLangModel(!openLangModel);
  };
  const selectprofileimage_gallery = () => {
    if (Platform.OS == 'android') {
      onpressUploadButton();
    }
    launchImageLibrary(
      { mediaType: 'photo', maxWidth: 250, maxHeight: 250 },
      response => {
        if (response.didCancel) {
          // console.log('User cancelled image picker');
        } else if (response.error) {
          // console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          // console.log('User tapped custom button: ', response.customButton);
        } else {
          if (Platform.OS == 'ios') {
            onpressUploadButton();
          }
          setSelectProfilegallary(response.assets[0].uri);
          setProfile_picture(response.assets[0]);
        }
      },
    );
  };
  const iscameraPermission = async () => {
    const permissionStatus = await androidCameraPermission();
    // console.log(permissionStatus)
    if (permissionStatus || Platform.OS == 'ios') {
      selectprofileimage_camera();
    } else {
      if (Platform.OS === 'ios') {
        Toast.show('Please give camera permission');
      } else {
        // Toast.show("Please give camera permission")
        Linking.openSettings();
      }
    }
  };
  const selectprofileimage_camera = () => {
    if (Platform.OS == 'android') {
      onpressUploadButton();
    }
    launchCamera(
      { mediaType: 'photo', maxWidth: 250, maxHeight: 250 },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          if (response.assets) {
            if (Platform.OS == 'ios') {
              onpressUploadButton();
            }
            setSelectProfilegallary(response.assets[0].uri);
            setProfile_picture(response.assets[0]);
          } else {
            if (Platform.OS === 'ios') {
              Toast.show('Please give camera permission');
            }
          }
        }
      },
    );
  };
  const selectbackgroundimage = async () => {
    const permissionStatus = await androidCameraPermission();
    if (permissionStatus || Platform.OS == 'ios') {
      onpressUploadButton_CoverImage();
    } else {
      if (Platform.OS === 'ios') {
        Toast.show('Please give camera permission');
      } else {
        // Toast.show("Please give camera permission")
        Linking.openSettings();
      }
    }
  };
  const selectCoverimage_gallery = () => {
    if (Platform.OS == 'android') {
      onpressUploadButton_CoverImage();
    }
    ImagePicker.openPicker({
      height: 202,
      width: 1175,
      cropping: true,
    })
      .then(image => {
        if (Platform.OS == 'ios') {
          onpressUploadButton_CoverImage();
        }
        setSelectbackgroudgallary(image.path);
        setBackground_image(image);
      })
      .catch(e => {
        console.log(e);
      });
  };
  const selectCoverimage_camera_android = () => {
    if (Platform.OS == 'android') {
      onpressUploadButton_CoverImage();
    }
    ImagePicker.openCamera({
      width: 1175,
      height: 202,
      cropping: true,
    })
      .then(image => {
        if (Platform.OS == 'ios') {
          onpressUploadButton_CoverImage();
        }
        setSelectbackgroudgallary(image.path);
        setBackground_image(image);
      })
      .catch(e => {
        console.log(e);
      });
  };
  const selectCoverimage_camera_ios = () => {
    ImagePicker.openCamera({
      width: 1175,
      height: 202,
      cropping: true,
    })
      .then(image => {
        setSelectbackgroudgallary(image.path);
        setBackground_image(image);
        onpressUploadButton_CoverImage();
      })
      .catch(e => {
        console.log(e);
        onpressUploadButton_CoverImage();
      });
  };
  const getcountrylanguage = async () => {
    const data = await axios.post(`${axiosUrl.URL}get-country-language`);
    if (data.data.countrys && data.data.language) {
      var langFinalData = [];
      data.data.language.map(item => {
        item.isSelected = false;
        langFinalData.push(item);
      });
      setAlllanguage(langFinalData);
    } else {
      console.log('data is not coming');
      setLoader(false);
    }
  };
  // useEffect(() => {
  //   getcountrylanguage()
  // }, [])
  const testt = (val, selectedCategory) => {
    const a = selectedCategory.some(
      item => item.categories_to_language.name === val,
    );
    return a;
  };
  const storeProfileData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@profiledata', jsonValue);
    } catch (error) {
      console.log('storeProfileData', error);
    }
  };
  const getProfileData = async () => {
    try {
      var data = {};
      setLoader(true);
      let profiledata = await AsyncStorage.getItem('@profiledata');
      if (profiledata) {
        setLoader(true);
        data = JSON.parse(profiledata);
        // console.log(data)
        setStorageData(data);
        data.tagline ? setTagline(data.tagline) : setTagline('');
        data.qualification
          ? setQualification(data.qualification)
          : setQualification('');

        // const lang = data.get_language
        {
          data.location != null &&
            setLocation({ name: data.location, lat: data.lat, lng: data.lng });
        }
        {
          data.about_me != null ? setAbout_me(data.about_me) : '';
        }

        if (data.get_user_to_bank_details != null) {
          setBankName(data.get_user_to_bank_details.bank_name);
          setAccountHolderName(
            data.get_user_to_bank_details.account_holder_name,
          );
          setAccountNumber(data.get_user_to_bank_details.account_number);
        }
        if (data.get_around_by != null) {
          var a = JSON.parse(data.get_around_by);
          modify_GetAround_as_database(getAround, a);
        }
        if (data.get_user_skill.length > 0) {
          modify_Skill_as_database(allSkill, data.get_user_skill);
        }
        if (data.get_language.length > 0) {
          modify_language_as_database(alllanguage, data.get_language);
        }
        setLoader(false);
      } else {
        setLoader(false);
        console.log('no data');
      }
      setLoader(false);
    } catch (error) {
      console.log('getProfileData---2', error);
      setLoader(false);
    }
  };
  const modify_GetAround_as_database = (allGetAround, selectedGetAround) => {
    try {
      var new_array = [];
      allGetAround.map((item, index) => {
        if (getaroundFind(item.value, selectedGetAround)) {
          item.isSelected = true;
          new_array.push(item);
        } else {
          item.isSelected = false
          new_array.push(item);
        }
      });
      setGetAround(new_array);
    } catch (error) {
      console.log('modify_GetAround_as_database', error);
    }
  };
  const getaroundFind = (val, selectedGetAround) => {
    const a = selectedGetAround.some(item => item == val);
    return a;
  };

  const modify_Skill_as_database = (allskill, selectedSkill) => {
    try {
      var new_array = [];
      allskill.map((item, index) => {
        if (skillFind(item.id, selectedSkill)) {
          item.isSelected = true;
          new_array.push(item);
        } else {
          item.isSelected = false
          new_array.push(item);
        }
      });
      setAllSkill(new_array);
    } catch (error) {
      console.log('modify_Skill_as_database', error);
    }
  };
  const skillFind = (val, selectedSkill) => {
    const a = selectedSkill.some(item => item.get_skill.category_id == val);
    return a;
  };
  const modify_language_as_database = (alllanguage, selectedlanguage) => {
    try {
      var new_array = [];
      alllanguage.map((item, index) => {
        if (languageFind(item.id, selectedlanguage)) {
          item.isSelected = true;
          new_array.push(item);
        } else {
          item.isSelected = false
          new_array.push(item);
        }
      });
      setAlllanguage(new_array);
    } catch (error) {
      console.log('modify_language_as_database', error);
    }
  };
  const languageFind = (val, selectedSkill, name) => {
    const a = selectedSkill.some(item => item.language_id == val);
    return a;
  };
  useEffect(() => {
    getProfileData();
  }, []);
  const ChoosefromWhereModal_profileImage = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={fromWhereModal_profile}
        onRequestClose={() => {
          onpressUploadButton();
        }}>
        <View style={{ flex: 1 }}>
          <Pressable
            onPressIn={onpressUploadButton}
            style={{
              flex: 3,
              backgroundColor: 'rgba(52,52,52,0.5)',
            }} />
          <View
            style={{
              flex: 1,
              backgroundColor: Colors.white,
              padding: Normalize(15),
            }}>
            <Text
              style={[
                globalstyles.plantext_Outfit_Medium,
                {
                  color: Colors.primary,
                  fontSize: Normalize(16),
                  textAlign: 'center',
                },
              ]}>
              Select images from
            </Text>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}>
                <Pressable
                  onPressIn={iscameraPermission}
                  style={styles.galleryorcamera_icon}>
                  <FontAwesome5
                    name="camera"
                    size={Normalize(30)}
                    color={Colors.primary}
                  />
                </Pressable>
                <Text
                  style={[
                    globalstyles.plantext_Outfit_Medium,
                    { color: Colors.primary },
                  ]}>
                  Camera
                </Text>
              </View>

              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}>
                <Pressable
                  onPressIn={selectprofileimage_gallery}
                  style={styles.galleryorcamera_icon}>
                  <FontAwesome5
                    name="images"
                    size={Normalize(30)}
                    color={Colors.primary}
                  />
                </Pressable>
                <Text
                  style={[
                    globalstyles.plantext_Outfit_Medium,
                    { color: Colors.primary },
                  ]}>
                  Gallery
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  const ChoosefromWhereModal_coverImage = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={fromWhereModal_cover}
        onRequestClose={() => {
          onpressUploadButton_CoverImage();
        }}>
        <View style={{ flex: 1 }}>
          <Pressable
            onPressIn={onpressUploadButton_CoverImage}
            style={{
              flex: 3,
              backgroundColor: 'rgba(52,52,52,0.5)',
            }}></Pressable>
          <View
            style={{
              flex: 1,
              backgroundColor: Colors.white,
              padding: Normalize(15),
            }}>
            <Text
              style={[
                globalstyles.plantext_Outfit_Medium,
                {
                  color: Colors.primary,
                  fontSize: Normalize(16),
                  textAlign: 'center',
                },
              ]}>
              Select images from
            </Text>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}>
                <Pressable
                  onPressIn={() => {
                    Platform.OS == 'ios'
                      ? selectCoverimage_camera_ios()
                      : selectCoverimage_camera_android();
                  }}
                  style={styles.galleryorcamera_icon}>
                  <FontAwesome5
                    name="camera"
                    size={Normalize(30)}
                    color={Colors.primary}
                  />
                </Pressable>
                <Text
                  style={[
                    globalstyles.plantext_Outfit_Medium,
                    { color: Colors.primary },
                  ]}>
                  Camera
                </Text>
              </View>

              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}>
                <Pressable
                  onPressIn={selectCoverimage_gallery}
                  style={styles.galleryorcamera_icon}>
                  <FontAwesome5
                    name="images"
                    size={Normalize(30)}
                    color={Colors.primary}
                  />
                </Pressable>
                <Text
                  style={[
                    globalstyles.plantext_Outfit_Medium,
                    { color: Colors.primary },
                  ]}>
                  Gallery
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  const onpressUploadButton = () => {
    setFromWhereModal_profile(!fromWhereModal_profile);
  };
  const onpressUploadButton_CoverImage = () => {
    setFromWhereModal_cover(!fromWhereModal_cover);
  };
  const get_all_Skill = async () => {
    try {
      var newarr = [];
      const data = await axiosInstance.post('get-category');
      // console.log(data.data)
      if (data.data.result) {
        data.data.result.get_category.map((item, index) => {
          item.isSelected = false;
          newarr.push(item);
        });

        setAllSkill(newarr);
      }
    } catch (error) {
      console.log('get_all_Skill---------', error);
    }
  };
  // useEffect(async () => {
  //   await get_all_Skill()
  // }, []);

  const onpress_language_name = val => {
    var old_category = alllanguage;
    var new_category = [];
    old_category.map((item, index) => {
      if (item.id == val.id) {
        item.isSelected = !item.isSelected;
        new_category.push(item);
      } else {
        new_category.push(item);
      }
    });
    setAlllanguage(new_category);
  };
  const onpress_skill = val => {
    var old_category = allSkill;
    var new_category = [];
    old_category.map((item, index) => {
      if (item.id == val.id) {
        item.isSelected = !item.isSelected;
        new_category.push(item);
      } else {
        new_category.push(item);
      }
    });
    setAllSkill(new_category);
  };
  const onpress_getaround = val => {
    var old_category = getAround;
    var new_category = [];
    old_category.map((item, index) => {
      if (item.id == val.id) {
        item.isSelected = !item.isSelected;
        new_category.push(item);
      } else {
        new_category.push(item);
      }
    });
    setGetAround(new_category);
  };
  const selectPortfolioimage = () => {
    launchImageLibrary({ mediaType: 'photo', selectionLimit: 15 }, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setPortfolioImages(response.assets);
        imageArray(response.assets);
      }
    });
  };
  const imageArray = val => {
    setLoader2(true);
    let array = imageFinalArray;
    val.map(item => {
      array.push(item);
    });
    setImageFinalArray(array);
    setPortfolioImages(array);
    setLoader2(false);
  };
  const deleteImage = async val => {
    let array = imageFinalArray;
    let newArr = [];

    if (val.image == undefined) {
      // console.log(val)
      newArr = array.filter(item => item.fileName != val.fileName);
      Toast.show(strings.PORTFOLIO.PORTFOLIODELETE);
      setImageFinalArray(newArr);
      setPortfolioImages(newArr);
    } else {
      const data = {
        jsonrpc: '2.0',
        params: {
          id: val.id,
        },
      };

      const res = await axiosInstance.post('delete-portfolio-image', data);

      if (res.data.error == undefined) {
        Toast.show(res.data.result.status.meaning);
        portfoliodata();
      } else {
        Toast.show(res.data.error.meaning);
        portfoliodata();
      }
    }
  };
  const onpressSave1 = () => {
    navigation.navigate('DocumentUpload');
  };

  const onpressSave = () => {
    try {
      if (
        storageData.profile_picture != null ||
        selectProfilegallary != undefined
      ) {
        if (tagline.length == 0) {
          Toast.show(strings.ERROR.ENTERTAGLINE);
        } else {
          if (about_me.length == 0) {
            Toast.show('say something about you! ');
          } else {
            if (!isArrDataEmpty(getAround)) {
              Toast.show('Select your veichle type');
            } else {
              if (location.lat == '' || location.lng == '') {
                Toast.show(strings.ERROR.SELECTLOCATION);
              } else {
                if (!isArrDataEmpty(allSkill)) {
                  Toast.show('Select atleast 1 skill');
                } else {
                  if (bankName.length == 0) {
                    Toast.show('Enter bank name');
                  } else {
                    if (accountHolderName.length == 0) {
                      Toast.show('Enter bank account holder name');
                    } else {
                      if (accountNumber.length == 0) {
                        Toast.show('Enter bank account number');
                      } else {
                        finalApicall();
                      }
                    }
                  }
                }
              }
            }
          }
        }
      } else {
        Toast.show('Please choose profile picture');
      }
    } catch (error) {
      console.log('onpressSave----', error);
    }
  };
  const finalApicall = async () => {
    try {
      var getAroundvalue = [];

      var selectedLang = [];
      var selectedSkill = [];

      getAround.map(item => {
        if (item.isSelected) {
          getAroundvalue.push(item.value);
        }
      });
      alllanguage.map((item, index) => {
        if (item.isSelected) {
          selectedLang.push(item.id);
        }
      });
      allSkill.map((item, index) => {
        if (item.isSelected) {
          selectedSkill.push(item.id);
        }
      });

      // console.log({
      //   profileImage: profile_picture,
      //   background_image,
      //   tagline,
      //   about_me,
      //   transport: getAroundvalue.toString(),
      //   location,
      //   language: selectedLang,
      //   skill: selectedSkill,
      //   portfolio: portfolioImages,
      //   bankName,
      //   accountHolderName,
      //   accountNumber
      // })

      const finalFormData = new FormData();
      {
        if (profile_picture.fileName == undefined) {
          null;
        } else {
          finalFormData.append('profile_picture', {
            uri: profile_picture.uri,
            type: profile_picture.type,
            name: profile_picture.fileName,
          });
        }
      }
      {
        if (background_image.modificationDate == undefined) {
          null;
        } else {
          finalFormData.append('background_image', {
            uri: background_image.path,
            type: background_image.mime,
            name: background_image.modificationDate,
          });
        }
      }
      finalFormData.append('tagline', tagline);
      finalFormData.append('about_me', about_me);

      finalFormData.append('qualification', qualification);
      {
        if (getAroundvalue.length > 0) {
          finalFormData.append('get_around_by', getAroundvalue.toString());
        }
      }
      finalFormData.append('location', location.name);
      finalFormData.append('lat', location.lat);
      finalFormData.append('lng', location.lng);

      {
        if (selectedLang.length > 0) {
          finalFormData.append('lang', selectedLang.toString());
        }
      }

      finalFormData.append('skill', selectedSkill.toString());
      finalFormData.append('bank_name', bankName);
      finalFormData.append('account_holder_name', accountHolderName);
      finalFormData.append('account_number', accountNumber);

      {
        if (portfolioImages.length > 0) {
          portfolioImages.map((item, index) => {
            finalFormData.append(`portfolio[${index}]`, {
              uri: item.uri,
              name: item.fileName,
              type: item.type,
            });
          });
        }
      }

      const data = finalFormData;
      // console.log(data)

      const res = await axiosInstance.post('your-profile-details-step2', data);

      // console.log(res.data)

      if (res.data.error) {
        Toast.showWithGravity(res.data.error.meaning, Toast.LONG, Toast.BOTTOM);
      } else {
        await AsyncStorage.setItem('isMyProfile', 'true');
        Toast.show(res.data.result.meaning);
        navigation.navigate('DocumentUpload');
      }
    } catch (error) {
      console.log('finalApicall_step2', finalApicall);
    }
  };
  const isArrDataEmpty = val => {
    var count = 0;
    val.map(item => {
      if (item.isSelected) {
        ++count;
      }
    });
    return count > 0 ? true : false;
  };
  return (
    <>
      {loader ? (
        <LoaderPage />
      ) : (
        <SafeAreaView
          style={{
            backgroundColor: Colors.primary,
            flex: 1,
            flexDirection: 'column',
          }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            style={styles.container}>
            <Header
              back
              name={activeTab == 'Edit' ? 'Edit Profile' : 'Be a Fixer'}
              navigation={navigation}
            />

            <CurveDesing_Component  >
              <View
                style={[
                  globalstyles.container,
                  { marginVertical: Normalize(20) },
                ]}>
                <ScrollView
                  style={{}}
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="always">
                  <Text
                    style={[
                      globalstyles.page_Header_Text,
                      { fontSize: Normalize(16), marginBottom: Normalize(20) },
                    ]}>
                    Build your profile to get more offers, provide the best
                    description of yourself!
                  </Text>
                  {/* profile picture */}
                  <Text style={globalstyles.textinput_Header_Style}>
                    {strings.BASICINFO.PROFILEIMAGE}
                  </Text>
                  <View
                    style={{
                      marginVertical: Normalize(5),
                      padding: Normalize(10),
                      borderRadius: 10,
                      borderColor: Colors.primary,
                      borderWidth: Normalize(1),
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        onPress={onpressUploadButton}
                        style={{
                          justifyContent: 'center',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={[
                            globalstyles.blue_Text,
                            { fontSize: Normalize(14) },
                          ]}>
                          Click here to upload
                        </Text>
                        <View
                          style={{
                            height: Normalize(23),
                            width: Normalize(23),
                            marginLeft: Normalize(5),
                          }}>
                          <Image
                            source={images.upload_image}
                            style={globalstyles.imageFit}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={[styles.uploadBtn, { borderRadius: 8 }]}>
                      {
                        storageData != null ? (
                          storageData.profile_picture != null ||
                            selectProfilegallary != undefined ? (
                            <Image
                              source={
                                selectProfilegallary != undefined
                                  ? { uri: selectProfilegallary }
                                  : {
                                    uri: `${ImageLink.ProfilePhoto}${storageData.profile_picture}`,
                                  }
                              }
                              style={[
                                styles.uploadBtnImg,
                                { resizeMode: 'cover' },
                              ]}
                            />
                          ) : (
                            <Image
                              source={{ uri: ImageLink.BlankProfileImage }}
                              style={[
                                styles.uploadBtnImg,
                                { resizeMode: 'cover' },
                              ]}
                            />
                          )
                        ) : (
                          <Image
                            source={{ uri: ImageLink.BlankProfileImage }}
                            style={[styles.uploadBtnImg, { resizeMode: 'cover' }]}
                          />
                        )
                        // <View style={[styles.uploadBtnImg, { borderColor: Colors.red_old, borderWidth: Normalize(1), overflow: "hidden", borderRadius: 8 }]} />
                      }
                    </View>
                  </View>
                  {fromWhereModal_profile && (
                    <ChoosefromWhereModal_profileImage />
                  )}
                  {fromWhereModal_cover && <ChoosefromWhereModal_coverImage />}

                  {/* cover iamge */}

                  <Text
                    style={[
                      globalstyles.textinput_Header_Style,
                      { marginTop: Normalize(10) },
                    ]}>
                    {strings.BASICINFO.BACKMAGE}
                  </Text>
                  <View
                    style={{
                      marginVertical: Normalize(10),
                      padding: Normalize(10),
                      borderRadius: 10,
                      borderColor: Colors.primary,
                      borderWidth: Normalize(1),
                    }}>
                    <TouchableOpacity
                      onPress={selectbackgroundimage}
                      style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <Text
                        style={[
                          globalstyles.blue_Text,
                          { fontSize: Normalize(14) },
                        ]}>
                        Click here to upload
                      </Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        width: '100%',
                        height: Normalize(50),
                        marginTop: Normalize(10),
                        overflow: 'hidden',
                        alignSelf: language == 'pr' ? 'flex-end' : 'flex-start',
                        borderRadius: 8,
                      }}>
                      {
                        storageData != null ? (
                          storageData.background_image != null ||
                            selectbackgroudgallary != undefined ? (
                            <Image
                              source={
                                selectbackgroudgallary != undefined
                                  ? { uri: selectbackgroudgallary }
                                  : {
                                    uri: `https://changicourt.com/dev/storage/app/public/background_image/${storageData.background_image}`,
                                  }
                              }
                              style={[
                                styles.uploadBtnImg,
                                { resizeMode: 'cover', borderRadius: 8 },
                              ]}
                            />
                          ) : (
                            <Image
                              source={images.backgroundprofile}
                              style={[
                                styles.uploadBtnImg,
                                { resizeMode: 'cover', borderRadius: 8 },
                              ]}
                            />
                          )
                        ) : (
                          <Image
                            source={images.backgroundprofile}
                            style={[
                              styles.uploadBtnImg,
                              { resizeMode: 'cover', borderRadius: 8 },
                            ]}
                          />
                        )
                        // < View style={[styles.uploadBtnImg, { borderColor: Colors.primary, borderWidth: Normalize(1), borderRadius: 8 }]} />
                      }
                    </View>
                  </View>
                  {/* Tag line (profile heading) */}
                  <View>
                    <Text style={globalstyles.textinput_Header_Style}>
                      {strings.BASICINFO.TAGLINE}
                    </Text>
                    <TextInput
                      value={tagline}
                      placeholder={strings.BASICINFO.PLACEHOLDER}
                      placeholderTextColor={Colors.textinput_inner_text}
                      style={[
                        globalstyles.textinputStyle,
                        {
                          borderColor: taglineIsFocused
                            ? Colors.primary
                            : Colors.disable_textinput_border,
                          backgroundColor: taglineIsFocused
                            ? Colors.white
                            : Colors.disable_textinput_background,
                        },
                      ]}
                      onChangeText={e => setTagline(e)}
                      onFocus={() => setTaglineIsFocused(true)}
                      onBlur={() => setTaglineIsFocused(false)}
                    />
                  </View>
                  {/* About me */}
                  <View>
                    <Text style={globalstyles.textinput_Header_Style}>
                      {strings.BASICINFO.ABOUTME}
                    </Text>
                    <TextInput
                      value={about_me}
                      multiline
                      // onSubmitEditing={() => {
                      //   Keyboard.dismiss();
                      // }}
                      placeholder={strings.BASICINFO.ABOUTMEPLACEHOLDER}
                      placeholderTextColor={Colors.textinput_inner_text}
                      style={[
                        globalstyles.multiline_textinputStyle,
                        {
                          borderColor: aboutIsFocused
                            ? Colors.primary
                            : Colors.disable_textinput_border,
                          backgroundColor: aboutIsFocused
                            ? Colors.white
                            : Colors.disable_textinput_background,
                        },
                      ]}
                      onChangeText={e => setAbout_me(e)}
                      onFocus={() => setAboutIsFocused(true)}
                      onBlur={() => setAboutIsFocused(false)}
                    />
                  </View>
                  {/* ******************** veichle******************* */}
                  <Text style={globalstyles.textinput_Header_Style}>
                    {strings.BASICINFO.VEICHLEHEADING}
                  </Text>
                  <Pressable
                    onPress={onpressGetaround}
                    style={[
                      globalstyles.textinput_onlyBox_Style,
                      {
                        borderColor: isgetAroundModal
                          ? Colors.primary
                          : Colors.disable_textinput_border,
                        backgroundColor: isgetAroundModal
                          ? Colors.white
                          : Colors.disable_textinput_background,
                      },
                    ]}>
                    <View style={{ flex: 1 }}>
                      <Text style={globalstyles.textinput_onlyText_Style}>
                        Select
                      </Text>
                    </View>
                    <View
                      style={{
                        height: '100%',
                        width: Normalize(15),
                        marginRight: Normalize(5),
                      }}>
                      <Image
                        source={images.downlinearrow}
                        style={{
                          height: '100%',
                          width: '100%',
                          resizeMode: 'contain',
                        }}
                      />
                    </View>
                  </Pressable>

                  <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {getAround.map(
                      (item, index) =>
                        item.isSelected && (
                          <TouchableOpacity
                            onPress={() => onpress_getaround(item)}
                            key={index}
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              backgroundColor:
                                Colors.disable_textinput_background,
                              borderWidth: Normalize(0.5),
                              borderColor: Colors.grayf5,
                              margin: Normalize(4),
                              borderRadius: Normalize(5),
                            }}>
                            <Text
                              style={{
                                padding: Normalize(2),
                                fontSize: Normalize(10),
                                color: Colors.textinput_inner_text,
                                borderRadius: Normalize(3),
                                margin: Normalize(3),
                              }}>
                              {item.name}
                            </Text>
                            <View>
                              <Entypo
                                name="cross"
                                color={Colors.red_old}
                                size={Normalize(15)}
                              />
                            </View>
                          </TouchableOpacity>
                        ),
                    )}
                  </View>

                  {isgetAroundModal && (
                    <Modal
                      animationType="fade"
                      visible={isgetAroundModal}
                      transparent={true}
                      onRequestClose={onpressGetaround}>
                      <View
                        style={{
                          flex: 1,
                          backgroundColor: 'rgba(52,52,52,0.5)',
                          justifyContent: 'center',
                        }}>
                        <View
                          style={{
                            backgroundColor: Colors.white,
                            marginHorizontal: Normalize(30),
                            borderRadius: Normalize(5),
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '100%',
                              height: Normalize(40),
                              borderBottomColor: Colors.grayf5,
                              borderBottomWidth: 1,
                            }}>
                            <View
                              style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Text
                                style={[
                                  globalstyles.plantext_Outfit_Medium,
                                  { fontSize: Normalize(14), color: Colors.primary },
                                ]}>
                                Do you have transport?
                              </Text>
                            </View>
                            <TouchableOpacity
                              onPress={onpressGetaround}
                              style={{
                                width: '10%',
                                height: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: Normalize(3),
                              }}>
                              <Entypo
                                name={
                                  isArrDataEmpty(getAround) ? 'check' : 'cross'
                                }
                                color={
                                  isArrDataEmpty(getAround)
                                    ? Colors.green_new_2
                                    : Colors.red_old
                                }
                                size={Normalize(25)}
                              />
                            </TouchableOpacity>
                          </View>
                          <View style={{ paddingVertical: Normalize(10) }}>
                            {getAround.map((item, index) => (
                              <TouchableOpacity
                                onPress={() => {
                                  onpress_getaround(item);
                                }}
                                key={index}
                                style={{
                                  marginBottom: Normalize(3),
                                  backgroundColor: item.isSelected
                                    ? Colors.primary
                                    : Colors.white,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  paddingVertical: Normalize(5),
                                }}>
                                <Text
                                  style={[
                                    globalstyles.plantext_Outfit_Medium,
                                    {
                                      fontSize: Normalize(11.5),
                                      color: item.isSelected
                                        ? Colors.white
                                        : Colors.black,
                                    },
                                  ]}>
                                  {item.name}
                                </Text>
                              </TouchableOpacity>
                            ))}
                          </View>
                        </View>
                      </View>
                    </Modal>
                  )}

                  {/* LOcation */}
                  <View>
                    <Text style={globalstyles.textinput_Header_Style}>
                      {strings.BASICINFO.LOCATION}
                    </Text>
                    <GooglePlacesAutocomplete
                      enablePoweredByContainer={false}
                      textInputProps={{
                        placeholderTextColor: Colors.textinput_inner_text,
                        textAlign: 'left',
                      }}
                      styles={{
                        textInput: globalstyles.textinputStyle,
                        row: {
                          padding: 13,
                          flexDirection: 'row',
                        },
                      }}
                      fetchDetails
                      placeholder={
                        location.name != ''
                          ? location.name
                          : strings.BASICINFO.PLACEHOLDER
                      }
                      onPress={(data, details = null) => {
                        const { lat, lng } = details.geometry.location;
                        setLocation({
                          name: data.description,
                          lat: lat,
                          lng: lng,
                        });
                        console.log({
                          name: data.description,
                          lat: lat,
                          lng: lng,
                        });
                      }}
                      query={{
                        key: Constant_apis.Google_Location_api,
                        language: 'en',
                        components: Constant_apis.Location_components,
                      }}
                    />

                    {location.lat != '' && location.lng != '' && (
                      <View
                        style={{
                          height: Normalize(130),
                          width: '100%',
                          alignSelf: 'center',
                          backgroundColor: Colors.grayf5,
                          borderRadius: Normalize(8),
                          marginTop: Normalize(6),
                          overflow: 'hidden',
                        }}>
                        <MapView
                          mapType="standard"
                          region={{
                            latitude: location.lat,
                            longitude: location.lng,
                            latitudeDelta: 0.009,
                            longitudeDelta: 0.009,
                          }}
                          style={{ flex: 1 }}
                          accessible={false}
                          zoomEnabled={false}
                          scrollEnabled={false}>
                          <Marker
                            title="EazyPay"
                            coordinate={{
                              latitude: location.lat,
                              longitude: location.lng,
                            }}>
                            <Image
                              source={images.appLogo_mapMarker}
                              style={{
                                height: Normalize(30),
                                width: Normalize(30),
                              }}
                              resizeMode="contain"
                            />
                          </Marker>
                        </MapView>
                      </View>
                    )}
                  </View>
                  {/* ***********language********* */}
                  <View>
                    <Text style={globalstyles.textinput_Header_Style}>
                      {strings.BASICINFO.LANGUAGEKNOWN}
                    </Text>
                    <Pressable
                      onPress={onpresslanuageModal}
                      style={[
                        globalstyles.textinput_onlyBox_Style,
                        {
                          borderColor: openLangModel
                            ? Colors.primary
                            : Colors.disable_textinput_border,
                          backgroundColor: openLangModel
                            ? Colors.white
                            : Colors.disable_textinput_background,
                        },
                      ]}>
                      <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={globalstyles.textinput_onlyText_Style}>
                          {strings.ERROR.SELECTLANGUAGE}
                        </Text>
                      </View>
                      <View
                        style={{
                          height: '100%',
                          width: Normalize(15),
                          marginRight: Normalize(5),
                        }}>
                        <Image
                          source={images.downlinearrow}
                          style={{
                            height: '100%',
                            width: '100%',
                            resizeMode: 'contain',
                          }}
                        />
                      </View>
                    </Pressable>

                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                      {alllanguage.map(
                        (item, index) =>
                          item.isSelected && (
                            <TouchableOpacity
                              onPress={() => onpress_language_name(item)}
                              key={index}
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor:
                                  Colors.disable_textinput_background,
                                borderWidth: Normalize(0.5),
                                borderColor: Colors.grayf5,
                                margin: Normalize(4),
                                borderRadius: Normalize(5),
                              }}>
                              <Text
                                style={{
                                  padding: Normalize(2),
                                  fontSize: Normalize(10),
                                  color: Colors.textinput_inner_text,
                                  borderRadius: Normalize(3),
                                  margin: Normalize(3),
                                }}>
                                {item.language}
                              </Text>
                              <View>
                                <Entypo
                                  name="cross"
                                  color={Colors.red_old}
                                  size={Normalize(15)}
                                />
                              </View>
                            </TouchableOpacity>
                          ),
                      )}
                    </View>
                    {openLangModel && (
                      <Modal
                        animationType="fade"
                        transparent={true}
                        visible={openLangModel}
                        onRequestClose={onpresslanuageModal}>
                        <View
                          style={{
                            flex: 1,
                            backgroundColor: 'rgba(52, 52, 52, 0.8)',
                            justifyContent: 'center',
                          }}>
                          <View
                            style={{
                              backgroundColor: Colors.white,
                              marginVertical: Normalize(46),
                              marginHorizontal: Normalize(30),
                              borderRadius: Normalize(5),
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                width: '100%',
                                height: Normalize(40),
                                borderBottomColor: Colors.grayf5,
                                borderBottomWidth: 1,
                              }}>
                              <View
                                style={{
                                  flex: 1,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={[
                                    globalstyles.plantext_Outfit_Medium,
                                    {
                                      fontSize: Normalize(14),
                                      color: Colors.primary,
                                    },
                                  ]}>
                                  {strings.MYPROFILE.LANGUAGE}
                                </Text>
                              </View>
                              <TouchableOpacity
                                onPress={onpresslanuageModal}
                                style={{
                                  width: '10%',
                                  height: '100%',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  marginRight: Normalize(3),
                                }}>
                                <Entypo
                                  name={
                                    isArrDataEmpty(alllanguage)
                                      ? 'check'
                                      : 'cross'
                                  }
                                  color={
                                    isArrDataEmpty(alllanguage)
                                      ? Colors.green_new_2
                                      : Colors.red_old
                                  }
                                  size={Normalize(25)}
                                />
                              </TouchableOpacity>
                            </View>
                            {alllanguage.map((item, index) => {
                              return (
                                <TouchableOpacity
                                  onPress={() => {
                                    onpress_language_name(item);
                                  }}
                                  key={index}
                                  style={{
                                    marginBottom: Normalize(3),
                                    backgroundColor: item.isSelected
                                      ? Colors.primary
                                      : Colors.white,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingVertical: Normalize(5),
                                  }}>
                                  <Text
                                    style={[
                                      globalstyles.plantext_Outfit_Medium,
                                      {
                                        fontSize: Normalize(13),
                                        color: item.isSelected
                                          ? Colors.white
                                          : Colors.black,
                                      },
                                    ]}>
                                    {item.language}
                                  </Text>
                                </TouchableOpacity>
                              );
                            })}
                          </View>
                        </View>
                      </Modal>
                    )}
                  </View>
                  {/* ******************** Skill ******************* */}
                  <Text style={globalstyles.textinput_Header_Style}>Skill</Text>
                  <Pressable
                    onPress={onpressSkill}
                    style={[
                      globalstyles.textinput_onlyBox_Style,
                      {
                        borderColor: isSkillModal
                          ? Colors.primary
                          : Colors.disable_textinput_border,
                        backgroundColor: isSkillModal
                          ? Colors.white
                          : Colors.disable_textinput_background,
                      },
                    ]}>
                    <View style={{ flex: 1 }}>
                      <Text style={globalstyles.textinput_onlyText_Style}>
                        Select Skills
                      </Text>
                    </View>
                    <View
                      style={{
                        height: '100%',
                        width: Normalize(15),
                        marginRight: Normalize(5),
                      }}>
                      <Image
                        source={images.downlinearrow}
                        style={{
                          height: '100%',
                          width: '100%',
                          resizeMode: 'contain',
                        }}
                      />
                    </View>
                  </Pressable>

                  <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {allSkill.map(
                      (item, index) =>
                        item.isSelected && (
                          <TouchableOpacity
                            onPress={() => onpress_skill(item)}
                            key={index}
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              backgroundColor:
                                Colors.disable_textinput_background,
                              borderWidth: Normalize(0.5),
                              borderColor: Colors.grayf5,
                              margin: Normalize(4),
                              borderRadius: Normalize(5),
                            }}>
                            <Text
                              style={{
                                padding: Normalize(2),
                                fontSize: Normalize(10),
                                color: Colors.textinput_inner_text,
                                borderRadius: Normalize(3),
                                margin: Normalize(3),
                              }}>
                              {item.name}
                            </Text>
                            <View>
                              <Entypo
                                name="cross"
                                color={Colors.red_old}
                                size={Normalize(15)}
                              />
                            </View>
                          </TouchableOpacity>
                        ),
                    )}
                  </View>
                  {isSkillModal && (
                    <Modal
                      animationType="fade"
                      visible={isSkillModal}
                      transparent={true}
                      onRequestClose={onpressSkill}>
                      <View
                        style={{
                          flex: 1,
                          backgroundColor: 'rgba(52,52,52,0.5)',
                        }}>
                        <View
                          style={{
                            flex: 1,
                            backgroundColor: Colors.white,
                            marginVertical: Normalize(46),
                            marginHorizontal: Normalize(30),
                            borderRadius: Normalize(5),
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '100%',
                              height: Normalize(40),
                              borderBottomColor: Colors.grayf5,
                              borderBottomWidth: 1,
                            }}>
                            <View
                              style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Text
                                style={[
                                  globalstyles.plantext_Outfit_Medium,
                                  { fontSize: Normalize(14), color: Colors.primary },
                                ]}>
                                Select Skill
                              </Text>
                            </View>
                            <TouchableOpacity
                              onPress={onpressSkill}
                              style={{
                                width: '10%',
                                height: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: Normalize(3),
                              }}>
                              <Entypo
                                name={
                                  isArrDataEmpty(allSkill) ? 'check' : 'cross'
                                }
                                color={
                                  isArrDataEmpty(allSkill)
                                    ? Colors.green_new_2
                                    : Colors.red_old
                                }
                                size={Normalize(25)}
                              />
                            </TouchableOpacity>
                          </View>
                          <View
                            style={{ flex: 1, paddingVertical: Normalize(10) }}>
                            <View
                              style={[
                                globalstyles.textinput_onlyBox_Style,
                                { width: '90%', height: Normalize(35) },
                              ]}>
                              <TextInput
                                value={skill_search_keyword}
                                onChangeText={e => {
                                  setSkill_search_keyword(e);
                                }}
                                style={[
                                  globalstyles.textinput_onlyText_Style_No_textAlignVertical,
                                  { flex: 1, paddingHorizontal: Normalize(10) },
                                ]}
                                placeholder="Search Skill"
                                placeholderTextColor={
                                  Colors.textinput_inner_text
                                }
                              />
                              <TouchableOpacity
                                onPress={() => {
                                  setSkill_search_keyword('');
                                  Keyboard.dismiss();
                                }}
                                style={{
                                  width: '10%',
                                  height: '100%',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                {skill_search_keyword == '' ? (
                                  <Feather
                                    name="search"
                                    color={Colors.textinput_inner_text}
                                    size={Normalize(16)}
                                  />
                                ) : (
                                  <Entypo
                                    name="cross"
                                    color={Colors.red_old}
                                    size={Normalize(16)}
                                  />
                                )}
                              </TouchableOpacity>
                            </View>
                            <ScrollView
                              showsVerticalScrollIndicator={false}
                              keyboardShouldPersistTaps="always">
                              {allSkill.map(
                                (item, index) =>
                                  is_search(
                                    skill_search_keyword,
                                    item.name,
                                  ) && (
                                    <TouchableOpacity
                                      onPress={() => {
                                        console.log(item);
                                        onpress_skill(item);
                                      }}
                                      key={index}
                                      style={{
                                        marginBottom: Normalize(3),
                                        backgroundColor: item.isSelected
                                          ? Colors.primary
                                          : Colors.white,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        paddingVertical: Normalize(5),
                                      }}>
                                      <Text
                                        style={[
                                          globalstyles.plantext_Outfit_Medium,
                                          {
                                            fontSize: Normalize(13),
                                            color: item.isSelected
                                              ? Colors.white
                                              : Colors.black,
                                          },
                                        ]}>
                                        {item.name}
                                      </Text>
                                    </TouchableOpacity>
                                  ),
                              )}
                            </ScrollView>
                          </View>
                        </View>
                      </View>
                    </Modal>
                  )}

                  {/* Highest qualification */}
                  <View>
                    <Text style={globalstyles.textinput_Header_Style}>
                      {strings.BASICINFO.HIGHESTQUAL}
                    </Text>
                    <TextInput
                      value={qualification}
                      placeholder={strings.BASICINFO.PLACEHOLDER}
                      placeholderTextColor={Colors.textinput_inner_text}
                      style={[
                        globalstyles.textinputStyle,
                        {
                          borderColor: highqualiIsFocused
                            ? Colors.primary
                            : Colors.disable_textinput_border,
                          backgroundColor: highqualiIsFocused
                            ? Colors.white
                            : Colors.disable_textinput_background,
                        },
                      ]}
                      onChangeText={e => setQualification(e)}
                      onFocus={() => setHighqualiIsFocused(true)}
                      onBlur={() => setHighqualiIsFocused(false)}
                    />
                  </View>

                  {/* portfolio */}
                  <View>
                    <Text
                      style={[
                        globalstyles.page_Header_Text,
                        {
                          fontSize: Normalize(15),
                          marginVertical: Normalize(15),
                        },
                      ]}>
                      {strings.SKILLS.INPUTHEADING}
                    </Text>
                    <Text
                      style={[
                        globalstyles.plantext_roboto_regular,
                        {
                          color: '#070C18',
                          lineHeight: Normalize(16),
                          fontSize: Normalize(13),
                          marginBottom: Normalize(8),
                        },
                      ]}>
                      Upload Portfolio images
                    </Text>
                    <View style={{ paddingVertical: Normalize(1) }}>
                      <TouchableOpacity
                        onPress={selectPortfolioimage}
                        style={[
                          styles.imageUploadBtn,
                          {
                            paddingVertical: Normalize(13),
                          },
                        ]}>
                        <Image
                          style={styles.iconStyle}
                          source={images.upload_image}
                          resizeMode="contain"
                        />
                        <Text
                          style={[
                            globalstyles.blue_Text,
                            {
                              fontFamily: 'Outfit-Regular',
                              fontSize: Normalize(14),
                              lineHeight: Normalize(17),
                            },
                          ]}>
                          {strings.PORTFOLIO.BTNTEXT1}
                        </Text>
                        <Text
                          style={[
                            globalstyles.plantext_outfit_regular,
                            { paddingVertical: Normalize(5) },
                          ]}>
                          Supported files: jpg, jpeg, png,
                        </Text>
                        <Text
                          style={[globalstyles.plantext_outfit_regular, {}]}>
                          (Max file size: 10MB)
                        </Text>
                      </TouchableOpacity>
                    </View>

                    {apiImages.length != 0 && (
                      <Text
                        style={[
                          globalstyles.plantext_roboto_regular,
                          { color: '#070C18', marginBottom: Normalize(10) },
                        ]}>
                        {strings.PORTFOLIO.PREVIMAGES}
                      </Text>
                    )}
                    {loader2 ? (
                      <View style={{ flex: 1 }}>
                        <Text
                          style={{
                            fontSize: Normalize(13),
                            fontFamily: 'roboto-medium',
                            color: Colors.primary,
                            marginVertical: Normalize(5),
                          }}>
                          Select Images
                        </Text>
                      </View>
                    ) : (
                      <View
                        style={{
                          flexWrap: 'wrap',
                          flexDirection:
                            language == 'en' ? 'row' : 'row-reverse',
                          justifyContent: 'center',
                        }}>
                        {apiImages.map((item, index) => (
                          <View
                            key={index}
                            style={{
                              width: Normalize(80),
                              height: Normalize(80),
                              margin: Normalize(3),
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <View
                              style={{
                                height: '84%',
                                width: '84%',
                                borderRadius: 8,
                                overflow: 'hidden',
                              }}>
                              <Image
                                source={{
                                  uri: `https://changicourt.com/dev/storage/app/public/images/portfolio/${item.image}`,
                                }}
                                style={{
                                  height: '100%',
                                  width: '100%',
                                  resizeMode: 'cover',
                                }}
                              />
                            </View>
                            <Pressable
                              onPress={() => {
                                deleteImage(item);
                              }}
                              style={{
                                height: '32%',
                                width: '32%',
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                backgroundColor: Colors.secondary,
                                borderRadius: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Entypo
                                name="cross"
                                size={Normalize(20)}
                                color={Colors.white}
                              />
                            </Pressable>
                          </View>
                        ))}
                      </View>
                    )}
                    {imageFinalArray.length != 0 && (
                      <Text
                        style={[
                          globalstyles.plantext_roboto_regular,
                          {
                            color: '#070C18',
                            marginTop: Normalize(20),
                            marginBottom: Normalize(10),
                          },
                        ]}>
                        {strings.PORTFOLIO.RECENTIMAGES}
                      </Text>
                    )}
                    {loader2 ? (
                      <View style={{ flex: 1 }}>
                        <Text>Select Images</Text>
                      </View>
                    ) : (
                      <View
                        style={{
                          flexWrap: 'wrap',
                          flexDirection:
                            language == 'en' ? 'row' : 'row-reverse',
                          justifyContent: 'center',
                        }}>
                        {imageFinalArray.map((item, index) => (
                          <View
                            key={index}
                            style={{
                              width: Normalize(80),
                              height: Normalize(80),
                              margin: Normalize(3),
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <View
                              style={{
                                height: '84%',
                                width: '84%',
                                borderRadius: 8,
                                overflow: 'hidden',
                              }}>
                              <Image
                                source={{ uri: item.uri }}
                                style={{
                                  height: '100%',
                                  width: '100%',
                                  resizeMode: 'cover',
                                }}
                              />
                            </View>
                            <Pressable
                              onPress={() => {
                                deleteImage(item);
                              }}
                              style={{
                                height: '32%',
                                width: '32%',
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                backgroundColor: Colors.secondary,
                                borderRadius: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Entypo
                                name="cross"
                                size={Normalize(20)}
                                color={Colors.white}
                              />
                            </Pressable>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                  {/* Bank Name */}
                  <View>
                    <Text style={globalstyles.textinput_Header_Style}>
                      Bank Name
                    </Text>
                    <TextInput
                      value={bankName}
                      placeholder={strings.BASICINFO.PLACEHOLDER}
                      placeholderTextColor={Colors.textinput_inner_text}
                      style={[
                        globalstyles.textinputStyle,
                        {
                          borderColor: bankNameIsFocused
                            ? Colors.primary
                            : Colors.disable_textinput_border,
                          backgroundColor: bankNameIsFocused
                            ? Colors.white
                            : Colors.disable_textinput_background,
                        },
                      ]}
                      onChangeText={e => setBankName(e)}
                      onFocus={() => setBankNameIsFocused(true)}
                      onBlur={() => setBankNameIsFocused(false)}
                    />
                  </View>
                  {/* Account Holder Name */}
                  <View>
                    <Text style={globalstyles.textinput_Header_Style}>
                      Account Holder Name
                    </Text>
                    <TextInput
                      value={accountHolderName}
                      placeholder={strings.BASICINFO.PLACEHOLDER}
                      placeholderTextColor={Colors.textinput_inner_text}
                      style={[
                        globalstyles.textinputStyle,
                        {
                          borderColor: holderNameIsFocused
                            ? Colors.primary
                            : Colors.disable_textinput_border,
                          backgroundColor: holderNameIsFocused
                            ? Colors.white
                            : Colors.disable_textinput_background,
                        },
                      ]}
                      onChangeText={e => setAccountHolderName(e)}
                      onFocus={() => setHolderNameIsFocused(true)}
                      onBlur={() => setHolderNameIsFocused(false)}
                    />
                  </View>
                  {/* Account Number */}
                  <View>
                    <Text style={globalstyles.textinput_Header_Style}>
                      Account Number
                    </Text>
                    <TextInput
                      keyboardType="number-pad"
                      value={accountNumber}
                      placeholder={strings.BASICINFO.PLACEHOLDER}
                      placeholderTextColor={Colors.textinput_inner_text}
                      style={[
                        globalstyles.textinputStyle,
                        {
                          borderColor: accNumberIsFocused
                            ? Colors.primary
                            : Colors.disable_textinput_border,
                          backgroundColor: accNumberIsFocused
                            ? Colors.white
                            : Colors.disable_textinput_background,
                        },
                      ]}
                      onChangeText={e => setAccountNumber(e)}
                      onFocus={() => setAccNumberIsFocused(true)}
                      onBlur={() => setAccNumberIsFocused(false)}
                    />
                  </View>
                  {/* save button */}
                  <Button
                    style={{ marginTop: Normalize(10) }}
                    nextarrow
                    onPress={onpressSave}
                    name={strings.SKILLS.SAVE}
                  />
                </ScrollView>
              </View>
            </CurveDesing_Component>
          </KeyboardAvoidingView>
        </SafeAreaView>
      )}
    </>
  );
}

export default withRtl(BasicInfo_2);
