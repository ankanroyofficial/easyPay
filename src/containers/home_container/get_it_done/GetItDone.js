import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  RefreshControl,
  LogBox,
  Dimensions,
  Pressable,
  StatusBar,
  Platform,
} from 'react-native';
import Header from '../../../components/Header';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import strings from '../../../constants/lng/LocalizedStrings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './Styles';
import images from '../../../constants/images';
import Button from '../../../components/Button';
import { myContext } from '../../../constants/ContextApi';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { Colors } from '../../../constants/colors';
import Toast from 'react-native-simple-toast';
import { engToPersian } from '../../../constants/EnglishToPersian';
import { rowOrRowreverse } from '../../../constants/RowOrRowreverse';
import { axiosUrl, ImageLink } from '../../../constants/LinkPage';
import axiosInstance from '../../../constants/AxiosCallPage';
import Loader_GetItDone from '../../../components/loader/Get_it_Done/Loader_GetItDone';
import { notificationListner } from '../../../constants/push_notification/pushnotification_helper';
import globalstyles from '../../../constants/globalStyles/Global_Styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import Pusher from 'pusher-js';
import pusherConfig from '../../../../pusher.json';
import globalStyle_esyPay from '../../../constants/globalStyles/GlobalStyle_esyPay';
import SucessNotifyModal from '../../../components/SucessNotifyModal';
import { testingText } from '../../../constants/TestingConstant';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import Geolocation from '@react-native-community/geolocation';
import { fontfmliy } from '../../../components/WhichFontFamily';
import { timeFunc } from '../../../constants/DateShow';

const { width } = Dimensions.get('window');

function GetItDone() {

  const navigation = useNavigation()
 
  const autoGetLocation = () => {
    try {
      Geolocation.getCurrentPosition(
        info => {
          
        },
        (error) => {
          console.log("::::::>", error)
        },
        { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
      )

    } catch (error) {
      console.log("Error2======>", error)
    }
  };
  

  useEffect(() => {
    if(Platform.OS=="ios"){
      Geolocation.requestAuthorization();
      autoGetLocation()
    }
    notificationListner(navigation);
  }, []);
  LogBox.ignoreLogs(['Setting a timer for a long period of time']);
  useEffect(() => {
    LogBox.ignoreLogs([
      "Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application",
    ]);
  }, []);
  library.add(fab, fas, far);
  const {
    signup_from,
    setSignup_from,
    setPh_email_verify,
    slugName,
    setSlugName,
    setId,
    setCategory_id,
    setSubcategory_id,
    setTitle,
    setDescription,
    setType,
    setTime,
    setDate,
    setBudget_type,
    setBudget,
    setHourly_rate,
    setNumber_of_hour,
    setLocation,
    setLat,
    setLng,
    setImage,
    setDate_type,
    setImageFinalArray,
    setY2,
    setD2,
    setM2,
    setPerShowDate,
    setViewTime,
    ph_email_verify,
    userSlugName,
    setUserSlugName,
    userId,
    setUserId,
    allSubcategory,
    setAllSubcategory,
    allCategory,
    setAllCategory,
    setListingCategory,
    phone_number,
    setPhone_numbe,
    email_Address,
    setEmail_Address,
    setEngShowDate,
    userName,
    setUserName,
    recent_notification_count,
    setRecent_notification_count,
    setChoose_Categories,
    choose_Categories,
    socketId,
    setSocketId,
    setPlayStore_url,
    setProf_pic,
    setMoreBalance,
    setMust_have_New,
    setCategory_image,
    setTaskDetailsTitle,

    setBrowsertype,
    setDistance,
    setPrevDistance,
    setIsAvaliable,
    filter_Categories,
    setFilter_Categories,
    setIsopenOffer,
    is_notification_pref_updated, setIs_notification_pref_updated,
    drawerTabNaviData, setDrawerTabNaviData
  } = useContext(myContext);
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
  const [loader, setLoader] = useState(false);
  const [isPhVerify, setIsPhVerify] = useState('N');
  const [isEmailVerify, setIsEmailVerify] = useState('N');
  const [verifyModal, setVerifyModal] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [verificationLoader, setVerificationLoader] = React.useState(false);
  const [notifyCategoryModal, setNotifyCategoryModal] = React.useState(false);
  const [isAllSelected, setIsAllSelected] = React.useState(false);
  const [notifySucess, setNotifySucess] = useState(false);
  const [notifyModalLoader, setNotifyModalLoader] = useState(false);



  let eventStartTime = moment.utc("2023-02-03 16:59:55").local().format('YYYY-MMM-DD h:mm A');

  // console.log(eventStartTime)
  
  // const date=new Date();
  // const convertDate = date.toLocaleDateString()
  // const convertTime = date.toLocaleTimeString();
  // const convertAll = date.toLocaleString();
  
  // console.log(convertDate)
  // console.log(convertTime)
  // console.log(convertAll)


  const onpressNotifySucess = () => {
    setNotifySucess(!notifySucess)
  }

  const pageDetails = [
    {
      id: 1,
      title: strings.MAKEANOFFER.VERIFYAMOBILENUMBER,
      BoxVerifiedTitle: phone_number.activeTitle,
      BoxUnverifiedTitle: strings.MAKEANOFFER.VERIFYYOURPHONENUMBER,
      isActive: phone_number.isActive,
      onPress: () => onPressPhone_number(),
    },
    {
      id: 2,
      title: strings.MAKEANOFFER.VERIFYAEMAILADDRESS,
      BoxVerifiedTitle: email_Address.activeTitle,
      BoxUnverifiedTitle: strings.MAKEANOFFER.VERIFYYOUREMAILADDRESS,
      isActive: email_Address.isActive,
      onPress: () => onPressEmail_Address(),
    },
  ];
  useEffect(async () => {
    getData2();
    return () => {
      getData2();
    };
  }, []);

  const getData2 = async () => {
    try {
      await AsyncStorage.setItem('isMyTaskloader', 'false');
      let slug = await AsyncStorage.getItem('slug');
      let userid = await AsyncStorage.getItem('userid');
      const login_from = await AsyncStorage.getItem('last_login_from');
      const data2 = await axios.post(`${axiosUrl.URL}get-country-language`);
      if (data2.data.language) {
        let langFinalData = [];
        data2.data.language.map(item => {
          langFinalData.push({
            ...{ language: item.language },
            ...{ isActive: false },
            ...{ id: item.id },
          });
        });
        await AsyncStorage.setItem('@langdata', JSON.stringify(langFinalData));
      }
      setSignup_from(login_from);
      setUserSlugName(slug);
      setUserId(userid);
      setSlugName(slug);
    } catch (error) {
      console.log('getData2.......', error);
    }
  };
  const datafillupForFilter = async () => {
    let filterData = await AsyncStorage.getItem('filterData');

    if (filterData != null) {
      let filterData_parse = JSON.parse(filterData)
      if ((filterData_parse.category).length > 0) {
        let a = (filterData_parse.category).split(",")
        modify_category_as_database_getitdone_ForFilterPage(filter_Categories, a)
      }
      setBrowsertype(filterData_parse.type)
      setDistance(filterData_parse.distance)
      setPrevDistance(filterData_parse.distance)
    } else {
      // getNotificationData()

      prevfilterDataFromApi()
    }
  }
  const prevfilterDataFromApi = async () => {
    try {
      let slug = await AsyncStorage.getItem('slug');
      const data = await axios.post(`${axiosUrl.URL}public-profile`, {
        "jsonrpc": "2.0",
        "params": {
          "slug": slug
        }
      })
      if (data.data.result) {
        if (data.data.result.filter_request == null) {
          if (data.data.result.user.point_2 == "true" || data.data.result.user.point_3 == "true") {
            let databaseSaved_category = data.data.result.UserToNotificationCategory
            if (databaseSaved_category.length > 0) {
              modify_category_as_database_asNotifiedCategory(filter_Categories, databaseSaved_category)
            }
          } else if (data.data.result.user.point_1 == "true") {
            allCategorySelectForPoint1()
          }

        } else {
          let previousfilterData = data.data.result.filter_request.params
          setDistance(previousfilterData.distance)
          setPrevDistance(previousfilterData.distance)
          if (previousfilterData.type == null) {
            setBrowsertype("")
          } else {
            setBrowsertype(previousfilterData.type)
          }
          if (previousfilterData.category_id != null) {
            if ((previousfilterData.category_id).length > 0) {
              let a = (previousfilterData.category_id).split(",")
              modify_category_as_database_getitdone_ForFilterPage(filter_Categories, a)
            }
          } else {
            // console.log("previousfilterData.category_id........", previousfilterData.category_id)
          }
        }
      } else {
        console.log("errrrrorrr---")
      }
    } catch (error) {
      console.log("prevfilterDataFromApi----", error)
    }
  }
  const isDatafillupForFilterLoad = () => {
    if (allCategory.length == 0) {
      datafillupForFilter();
    }
  }
  useEffect(() => {
    isDatafillupForFilterLoad();
    return () => {
      isDatafillupForFilterLoad();
    };
  }, []);
  const modify_category_as_database_getitdone_ForFilterPage = (all_category, prevCategory) => {
    try {
      var new_array = [];
      all_category.map((item, index) => {
        if (findPrevCategory(item.id, prevCategory)) {
          new_array.push({ name: item.name, isSelected: true, id: item.id })
        } else {
          new_array.push(item)
        }
      })
      setFilter_Categories(new_array)
    } catch (error) {
      console.log("modify_category_as_database_getitdone_ForFilterPage", error)
    }
  }
  const findPrevCategory = (val, selectedCategory) => {
    let a = selectedCategory.some((item) => item == val)
    return a
  }
  const getFilterCategoryIds = async (val) => {
    let a = val;
    let newArr = []
    a.map((item) => {
      if (item.isSelected) {
        newArr.push(item.id)
      }
    })
    let arr = newArr.toString();
    filterdataStoreInAsyncStorage(arr)
  }
  const filterdataStoreInAsyncStorage = async (val) => {
    try {
      let fData = {
        "category": val,
        "distance": 20,
        "type": "",
        "show_available_task_only": false
      }
      // console.log("fdata", fData)
      let fData_stringify = JSON.stringify(fData)
      await AsyncStorage.setItem('filterData', fData_stringify);
    } catch (error) {
      console.log("filterdataStoreInAsyncStorage-", error)
    }
  }
  const getSocketId = () => {
    const pusher = new Pusher(pusherConfig.key, pusherConfig);
    pusher.connection.bind('connected', () => {
      let socketId = pusher.connection.socket_id;
      // console.log("///", socketId)
      setSocketId(socketId);
    });
  };
  const loadForSockidId = () => {
    if (socketId.length == 0) {
      getSocketId();
    }
  };
  useEffect(() => {
    loadForSockidId();
  }, []);
  useEffect(() => {
    isLoad_again();
  }, []);
  const isLoad_again = async () => {
    const a = await AsyncStorage.getItem('isMyProfile');
    if (allCategory.length == 0 || a == false) {
      verifyData();
      getData();
      is_new_notification()
      } else {
      // console.log("stop")
    }
  };

  const is_new_notification = async () => {
    try {
      const data = await axiosInstance.post('home');
      // console.log("home>>>>",data.data.result.show_info)
      if (data.data.result) {
        const recent_noti_count =data.data.result.notifications_count.toString();
        setRecent_notification_count(recent_noti_count);
        setDrawerTabNaviData(data.data.result.show_info)
      }
    } catch (error) {
      console.log('is_new_notification', error);
    }
  };



  const getData = async () => {
    try {
      const data = await axiosInstance.post('home');
      if (data.data.result) {

        const recent_noti_count =data.data.result.notifications_count.toString();
        setRecent_notification_count(recent_noti_count);
        let arr = data.data.result.sub_categories;
        setTaskDetailsTitle(data.data.result.placeholder_name)
        setPlayStore_url(data.data.result.url);
        collectAllArray(arr);
        setAllCategory(data.data.result.get_category);
        setListingCategory(data.data.result.listing_categories);
      }
    } catch (error) {
      console.log('getData', error);
    }
  };
  const collectAllArray = val => {
    val.map(item => {
      collectAllSubcategory(item);
    });
  };
  const collectAllSubcategory = val => {
    val.map(item => {
      allSubcategory.push(item);
    });
  };
  const onPressPhone_number = async val => {
    try {
      if (phone_number.activeTitle == '') {
        onpressVerify();
        navigation.navigate('BasicInfo');
      } else {
        setVerificationLoader(true);
        const res = await axiosInstance.post('get-phone-otp');
        if (res.data.result.error) {
          Toast.show(res.data.result.error.meaning);
        } else {
          const otp = res.data.result.otp;
          onpressVerify();
          Toast.show(res.data.result.success.meaning);
          navigation.navigate('PhoneVerifyPage', {
            otp: otp,
            phoneNumber: phone_number.activeTitle,
          });
        }
        setVerificationLoader(false);
      }
    } catch (error) {
      setVerificationLoader(false);
      console.log('onPressPhone_number', error);
    }
  };
  const onPressEmail_Address = async () => {
    try {
      setVerificationLoader(true);
      const res = await axiosInstance.post('get-email-otp');
      if (res.data.result.error) {
        Toast.show(res.data.result.error.meaning);
      } else {
        const otp = res.data.result.otp;
        Toast.show(res.data.result.success.meaning);
        onpressVerify();
        navigation.navigate('EmailVerifyPage', {
          otp: otp,
          email: email_Address.activeTitle,
        });
      }
      setVerificationLoader(false);
    } catch (error) {
      setVerificationLoader(false);
      console.log('onPressEmail_Address', error);
    }
  };
  const onpressVerify = () => {
    setVerifyModal(!verifyModal);
  };
  const categoryButton = async val => {
    const a = await AsyncStorage.getItem('isMyProfile');
    if (
      ph_email_verify ||
      (phone_number.isActive && email_Address.isActive) ||
      a == false
    ) {
      setCategory_image(val.image)
      setTaskDetailsTitle(val.category_placeholder)
      setIsopenOffer(false)
      navigation.navigate('PostTaskDetails', { item: val });
      // cleanContext();
    } else {
      setVerifyModal(true);
    }
  };
  const taskOption = () => {
    return (
      <View style={{}}>
        <View
          style={{
            flexDirection: rowOrRowreverse(language),
            alignItems: 'center',
            width: width * 0.97,
            alignSelf: 'center',
          }}>
          <View style={styles.image}>
            <Image style={globalstyles.imageFit} source={images.nav3} />
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: Normalize(12.8),
                fontFamily: fontfmliy.bold,
                color: Colors.primary,
              }}>
              Welcome {userName == '' ? 'Taskers' : userName}
            </Text>
            <Text
              style={{
                fontSize: Normalize(11.5),
                fontFamily: fontfmliy.bold,
                color: Colors.primary,
              }}>
              What do you need help with?
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginHorizontal: Normalize(7),
            justifyContent: 'space-between',
          }}>
          {allCategory.map(item => (
            <Pressable
              onPress={() => categoryButton(item)}

              // onPress={() => NativeModules.DevSettings.reload()}

              style={{
                height: width * 0.306666666666667,
                alignItems: 'center',
                justifyContent: 'center',
                width: `${100 / 3.1}%`,
                borderRadius: Normalize(5),
                marginBottom: `${(100 - (100 / 3.1) * 3) / 2}%`,
              }}
              key={item.id}>
              <View
                style={{
                  height: Normalize(70),
                  width: Normalize(70),
                  // backgroundColor: '#5E6A7C',
                  backgroundColor: Colors.primary,
                  borderRadius: Normalize(70) / 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {/* <FontAwesomeIcon style={{ alignSelf: 'center' }} size={Normalize(16)} icon={getIcon(item.image)} color="white" /> */}
                <Image
                  source={{ uri: ImageLink.homeCategory + item.image }}
                  style={{ height: '52%', width: '52%', resizeMode: 'contain' }}
                />
              </View>
              <Text
                style={{
                  fontSize: Normalize(11.5),
                  color: Colors.greyText,
                  fontFamily: fontfmliy.regular,
                  textAlign: 'center',
                  lineHeight: Normalize(14),
                  marginTop: Normalize(5),
                }}>
                {item.category_by_language_api.name}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    );
  };

  // useEffect(() => {
  //   checkNotificationPref()
  // }, [])

  const checkNotificationPref = async () => {
    try {
      // console.log("***************************")
      let slug = await AsyncStorage.getItem('slug');
      const data = await axiosInstance.post('public-profile', {
        jsonrpc: '2.0',
        params: {
          slug: `${slug}`,
        },
      });
      // console.log("**********", data.data.result.user.is_notification_pref_updated)
      if (data.data.result) {
        if (data.data.result.user.is_notification_pref_updated == "no") {
          setIs_notification_pref_updated(false)
          setIsAllSelected(true)
          let old_category = choose_Categories
          let new_category = []
          old_category.map((item, index) => {
            new_category.push({ "id": item.id, "isSelected": true, "name": item.name })
          })
          setChoose_Categories(new_category)
          setNotifyCategoryModal(true)

        } else {
          setIs_notification_pref_updated(true)
        }
      }
      setLoader(false);
    } catch (error) {
      console.log('verifyData_get_it_done', error);
    }
  };
  const verifyData = async () => {
    try {
      setLoader(true);
      let slug = await AsyncStorage.getItem('slug');
      const data = await axiosInstance.post('public-profile', {
        jsonrpc: '2.0',
        params: {
          slug: `${slug}`,
        },
      });
      if (data.data.result) {
        const res = data.data.result.user;
        let ph = data.data.result.user.is_phone_verified;
        let email = data.data.result.user.is_email_verified;
        setUserName(res.fname + ' ' + res.lname);
        setProf_pic(data.data.result.user.profile_picture);
        setMoreBalance(data.data.result.user.wallet_balance);
        storeProfileData(data.data.result.user);
        setIsPhVerify(data.data.result.user.is_phone_verified);
        setIsEmailVerify(data.data.result.user.is_email_verified);
        if (ph == 'N' || email == 'N') {
          setPh_email_verify(false);
        } else {
          setPh_email_verify(true);
        }
        if (res.phone !== null && res.email !== null) {
          if (res.is_phone_verified != 'N') {
            language == 'en'
              ? setPhone_numbe({ isActive: true, activeTitle: res.phone })
              : setPhone_numbe({
                isActive: true,
                activeTitle: engToPersian(res.phone),
              });
          } else {
            language == 'en'
              ? setPhone_numbe({ isActive: false, activeTitle: res.phone })
              : setPhone_numbe({
                isActive: false,
                activeTitle: engToPersian(res.phone),
              });
          }
          if (res.is_email_verified != 'N') {
            setEmail_Address({ isActive: true, activeTitle: res.email });
          } else {
            setEmail_Address({ isActive: false, activeTitle: res.email });
          }
        } else {
          if (res.phone !== null) {
            if (res.is_phone_verified != 'N') {
              language == 'en'
                ? setPhone_numbe({ isActive: true, activeTitle: res.phone })
                : setPhone_numbe({
                  isActive: true,
                  activeTitle: engToPersian(res.phone),
                });
            } else {
              language == 'en'
                ? setPhone_numbe({ isActive: false, activeTitle: res.phone })
                : setPhone_numbe({
                  isActive: false,
                  activeTitle: engToPersian(res.phone),
                });
            }
          } else {
            setPhone_numbe({ isActive: false, activeTitle: '' });
          }
          if (res.is_email_verified != 'N') {
            setEmail_Address({ isActive: true, activeTitle: res.email });
          } else {
            setEmail_Address({ isActive: false, activeTitle: res.email });
          }
        }
      }
      setLoader(false);
    } catch (error) {
      console.log('verifyData_get_it_done', error);
    }
  };
  const storeProfileData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@profiledata', jsonValue);
    } catch (error) {
      console.log('storeProfileData', error);
    }
  };
  const VerifyModalComponent = () => {
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={verifyModal}
        onRequestClose={() => {
          onpressVerify();
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(52,52,52,0.5)',
            padding: Normalize(15),
            justifyContent: 'center',
          }}>
          <View
            style={{
              backgroundColor: Colors.white,
              borderRadius: 4,
              paddingBottom: '2%',
            }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View
                style={{
                  height: Normalize(50),
                  width: '100%',
                  flexDirection: language == 'en' ? 'row' : 'row-reverse',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottomColor: '#D8D8D8',
                  borderBottomWidth: 1,
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: Normalize(14),
                      fontFamily: fontfmliy.bold,
                      color: '#38393e',
                      textAlign: 'center',
                    }}>
                    {strings.GETITDONE.TOPOSTINGATASK}
                  </Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={onpressVerify}
                  style={{
                    height: Normalize(50),
                    width: Normalize(50),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={images.cross}
                    style={{
                      height: Normalize(12),
                      width: Normalize(12),
                      resizeMode: 'contain',
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ padding: Normalize(8) }}>
                {pageDetails.map((item, index) => (
                  <View key={index} style={{ width: '100%', marginBottom: '2%' }}>
                    <Text
                      style={{
                        paddingVertical: Normalize(8),
                        fontSize: Normalize(14),
                        fontFamily: fontfmliy.regular,
                        color: Colors.greyText,
                        textAlign: language == 'en' ? 'left' : 'right',
                      }}>
                      {item.title}
                    </Text>
                    <TouchableOpacity
                      disabled={
                        item.isActive ? true : verificationLoader ? true : false
                      }
                      onPress={item.onPress}
                      style={{
                        height: Normalize(43),
                        width: '100%',
                        borderRadius: 5,
                        borderColor: item.isActive ? '#99b83c' : '#D8D8D8',
                        borderWidth: Normalize(1),
                        flexDirection: language == 'en' ? 'row' : 'row-reverse',
                      }}>
                      <View
                        style={{
                          height: Normalize(43),
                          width: Normalize(43),
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={
                            item.isActive ? images.greenTick : images.grayTick
                          }
                          style={{
                            height: '60%',
                            width: '60%',
                            resizeMode: 'contain',
                          }}
                        />
                      </View>
                      <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text
                          style={{
                            fontSize: Normalize(12),
                            paddingHorizontal: '2%',
                            fontFamily: fontfmliy.bold,
                            color: item.isActive ? Colors.greyText : '#636468',
                            textAlign: language == 'en' ? 'left' : 'right',
                          }}>
                          {item.isActive
                            ? item.BoxVerifiedTitle
                            : item.BoxUnverifiedTitle}
                        </Text>
                      </View>
                      <View
                        style={{
                          height: Normalize(40),
                          width: Normalize(40),
                          justifyContent: 'center',
                          alignItems: 'center',
                          opacity: item.isActive ? 0.7 : 0.3,
                        }}>
                        <Image
                          source={
                            language == 'en'
                              ? images.rightArrow
                              : images.leftArrow
                          }
                          style={{
                            height: '35%',
                            width: '35%',
                            resizeMode: 'contain',
                          }}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    verifyData();
    getData();
    setRefreshing(false);
  }, [refreshing]);
  const onpress_category = (val) => {
    let old_category = choose_Categories
    let new_category = []

    let count = 0;

    if (isAllSelected) {
      setIsAllSelected(false)
      old_category.map((item, index) => {
        if (item.id == val.id) {
          item.isSelected = false
          new_category.push(item)
        } else {
          item.isSelected = true
          new_category.push(item)
        }
      })
    } else {
      old_category.map((item, index) => {
        if (item.id == val.id) {
          new_category.push({ "id": item.id, "isSelected": !item.isSelected, "name": item.name })
        } else {
          new_category.push(item)
        }
      })
      new_category.map((item, index) => {
        if (!item.isSelected) {
          count++;
        }
      })
      if (count == 0) {
        setIsAllSelected(true)
      }
    }
    setChoose_Categories(new_category)
  }
  useEffect(() => {
    defaultNotify()
  }, [])
  const defaultNotify = async () => {
    let a = await AsyncStorage.getItem("entryNotifyModal")
    if (!is_notification_pref_updated) {
      if (a != null && a == "true") {
        setIsAllSelected(true)
        let old_category = choose_Categories
        let new_category = []
        old_category.map((item, index) => {
          new_category.push({ "id": item.id, "isSelected": true, "name": item.name })
        })
        setChoose_Categories(new_category)
        setNotifyCategoryModal(true)
      } else if (a == null) {
        checkNotificationPref()
      }
    }
  }
  const onpress_category_all = () => {
    let old_category = choose_Categories
    let new_category = []

    if (isAllSelected) {
      setIsAllSelected(false)
      old_category.map((item, index) => {
        item.isSelected = false
        new_category.push(item)
      })
    } else {
      setIsAllSelected(true)
      old_category.map((item, index) => {
        item.isSelected = true
        new_category.push(item)
      })
    }
    setChoose_Categories(new_category)
  }
  const isAnySelect = (val) => {
    let count = 0;
    val.map((item) => {
      if (item.isSelected) {
        count++;
      }
    })
    return count > 0 ? true : false
  }
  const onPressNotifySubmit = async () => {
    try {

      if (isAnySelect(choose_Categories)) {
        const finalFormData = new FormData();
        finalFormData.append('is_notification', "on");
        choose_Categories.map((item, index) => {
          if (item.isSelected) {
            finalFormData.append(`notification_category_id[${index}]`, item.id);
          }
        })
        finalFormData.append('notification_type_id', "3");
        finalFormData.append('from', "get_it_done_page");
        const data = finalFormData

        setNotifyModalLoader(true)


        const res = await axiosInstance.post("Notification-preference", data)
        // console.log(res.data)

        if (res.data.result) {
          Toast.show(res.data.result.meaning)
          setNotifyCategoryModal(false)
          setNotifyModalLoader(false)
          prevfilterDataFromApi()
          onpressNotifySucess()
          await AsyncStorage.removeItem("entryNotifyModal")
        } else {
          setNotifyCategoryModal(false)
          setNotifyModalLoader(false)
          await AsyncStorage.setItem("entryNotifyModal", "true")
        }

      } else {
        Toast.show("Select at least one category")
      }

    } catch (error) {
      setNotifyModalLoader(false)
      console.log("onPressNotifySubmit", error)
    }
  }
  const allCategorySelectForPoint1 = () => {
    try {
      let old_arr = filter_Categories;
      let new_arr = [];
      old_arr.map((item) => {
        item.isSelected = true;
        new_arr.push(item);
      })
      setFilter_Categories(new_arr)
      getFilterCategoryIds(new_arr)
    } catch (error) {
      console.log("allCategorySelectForPoint1-", error)
    }
  }
  const modify_category_as_database_asNotifiedCategory = (all_category, prevCategory) => {
    try {
      var new_array = [];
      all_category.map((item, index) => {
        if (findNotifiedCategory(item.id, prevCategory)) {
          new_array.push({ name: item.name, isSelected: true, id: item.id })
        } else {
          new_array.push({ name: item.name, isSelected: false, id: item.id })
        }
      })
      setFilter_Categories(new_array)
      getFilterCategoryIds(new_array)
    } catch (error) {
      console.log("modify_category_as_database_asNotifiedCategory", error)
    }
  }
  const findNotifiedCategory = (val, selectedCategory) => {
    let a = selectedCategory.some((item) => item.category_id == val)
    return a
  }




  // const restartApp=()=>{
  //   try {
  //     if (mTabView == null) {
  //       Intent intent = new Intent(sActivity, SplashActivity.class);
  //       intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | 
  //       Intent.FLAG_ACTIVITY_CLEAR_TASK);
  //       sActivity.startActivity(intent);
  //       sActivity.finish();
  //   }
  //   } catch (error) {

  //   }
  // }


  const notificationCount = () => {
    const pusher = new Pusher(pusherConfig.key, pusherConfig);
    let channel = pusher.subscribe("eazypay-development");
let userAccountId=userId


    channel.bind('send-notification-count', function (data) {
      if (data) {
        if (data.user_id == userAccountId) {
          is_new_notification()
          // console.log("getitdone     pusher>>> amr msg ", userAccountId, " ", data)
        } else {
          // console.log("getitdone     pusher>>> loker msg ", userAccountId, " ", data)
        }
      }
    })
  }
  useEffect(() => {
    notificationCount()
  }, [])



  return (
    <>
      {allCategory.length == 0 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1 }}>
            <Loader_GetItDone />
          </View>
        </ScrollView>
      ) : (
        <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1 }}>
          <StatusBar barStyle="light-content" />
          <View style={[styles.container]}>
            <Header
            isDrawer={!(allCategory.length == 0)}
              name={strings.GETITDONE.HEADTEXT}
              recent_notification_count={0}
            />
            {(testingText.lastupdateDate).length > 0 && <Text style={{ textAlign: "center", color: Colors.green_new, fontSize: Normalize(12), fontFamily: fontfmliy.bold }} >{testingText.lastupdateDate}</Text>}
            {(testingText.text).length > 0 && <Text style={{ textAlign: "center", color: Colors.red_old, fontSize: Normalize(12), fontFamily: fontfmliy.bold }} >{testingText.text}</Text>}
      <Text style={{ textAlign: "center", color: Colors.red_old, fontSize: Normalize(12), fontFamily: fontfmliy.bold }} >{drawerTabNaviData.be_a_fixer_approval}</Text>
            <ScrollView
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
              style={{ paddingHorizontal: Normalize(5) }}>
              {verifyModal && <VerifyModalComponent />}
              {notifyCategoryModal &&
                <Modal
                  animationType="none"
                  visible={notifyCategoryModal}
                  // onRequestClose={() => setNotifyCategoryModal(false)}
                  transparent
                >
                  <View style={{ flex: 1, backgroundColor: "rgba(52,52,52,0.5)", justifyContent: "center", alignItems: "center" }} >
                    <View style={{ padding: Normalize(20), width: "85%", backgroundColor: Colors.white, elevation: 10, borderRadius: Normalize(8) }} >
                      <View style={{ alignItems: "center" }} >
                        <Text style={[globalStyle_esyPay.pageHeading, { color: Colors.primary, fontSize: Normalize(15), marginTop: Normalize(25) }]}>Edit your task alerts</Text>
                        <Text style={[globalStyle_esyPay.detailsText, { fontSize: Normalize(14), marginVertical: Normalize(10), color: Colors.grey }]}>All alerts are on by default</Text>
                        <Text style={[globalStyle_esyPay.detailsText, { fontSize: Normalize(13), textAlign: "center", color: Colors.grey }]}>Edit your alerts to be modified about tasks that you're interested in corresponding</Text>
                      </View>

                      <View style={{ height: Normalize(230), marginVertical: Normalize(10) }} >
                        <ScrollView showsVerticalScrollIndicator={false}  >
                          {/* all */}
                          <Pressable
                            onPress={onpress_category_all}
                            style={{ paddingHorizontal: Normalize(8), paddingVertical: Normalize(11), flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottomColor: Colors.boxBorder, borderBottomWidth: Normalize(1) }} >
                            <Text style={[globalStyle_esyPay.detailsText, { fontSize: Normalize(14), color: Colors.grey }]}>All categories</Text>
                            <View style={{ height: Normalize(20), width: Normalize(37), borderRadius: Normalize(50), backgroundColor: Colors.primary, flexDirection: isAllSelected ? "row" : "row-reverse", alignItems: "center", justifyContent: "space-between", paddingHorizontal: Normalize(2), opacity: isAllSelected ? 1 : 0.5, }} >
                              <Text style={[globalstyles.plantext_regular, { color: Colors.white, fontSize: Normalize(12) }]} >{isAllSelected ? "On" : "Off"}</Text>
                              <FontAwesome size={Normalize(18)} name={"circle"} color="white" />
                            </View>
                          </Pressable>
                          {
                            choose_Categories.map((item, index) => (
                              <Pressable
                                key={index}
                                onPress={() => onpress_category(item)}
                                style={{ paddingHorizontal: Normalize(8), paddingVertical: Normalize(11), flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottomColor: Colors.boxBorder, borderBottomWidth: Normalize(1) }} >
                                <Text style={[globalStyle_esyPay.detailsText, { fontSize: Normalize(14), color: Colors.grey }]}>{item.name}</Text>
                                <View style={{ height: Normalize(20), width: Normalize(39), borderRadius: Normalize(50), backgroundColor: Colors.primary, flexDirection: item.isSelected ? "row" : "row-reverse", alignItems: "center", justifyContent: "space-between", paddingHorizontal: Normalize(2), opacity: item.isSelected ? 1 : 0.5, }} >
                                  <Text style={[globalstyles.plantext_regular, { color: Colors.white, fontSize: Normalize(12), paddingHorizontal: Normalize(2) }]} >{item.isSelected ? "On" : "Off"}</Text>
                                  <FontAwesome size={Normalize(16)} name={"circle"} color="white" />
                                </View>
                              </Pressable>
                            ))
                          }
                        </ScrollView>
                      </View>


                      <Button
                        disabled={notifyModalLoader}
                        onPress={onPressNotifySubmit}
                        name="Save"
                        style={{ backgroundColor: Colors.primary, marginHorizontal: Normalize(25) }}
                      />
                      <View style={{ height: Normalize(70), width: Normalize(70), borderRadius: Normalize(70) / 2, backgroundColor: Colors.white, position: "absolute", top: -Normalize(35), alignSelf: "center", justifyContent: "center", alignItems: "center" }} >
                        <View style={{ height: Normalize(58), width: Normalize(58), borderRadius: Normalize(70) / 2, backgroundColor: Colors.secondary, justifyContent: "center", alignItems: "center" }} >
                          <MaterialCommunityIcons size={Normalize(35)} name="bell" color="white" />
                        </View>
                      </View>
                    </View>
                  </View>
                </Modal>
              }

              {notifySucess &&
                <SucessNotifyModal
                  ispress={notifySucess}
                  onpress={onpressNotifySucess}
                  title={"Success!"}
                  subTitle={"You can always change these alerts from settings."}
                />}

              <View style={styles.postTaskContainer}>{taskOption()}</View>
              <View style={{ height: Normalize(50) }} />
            </ScrollView>
          </View>
        </SafeAreaView>
      )}
    </>
  );
}
export default withRtl(GetItDone);