import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, ScrollView, ActivityIndicator, FlatList, RefreshControl, Pressable, Dimensions, ImageBackground, BackHandler, Modal, Platform, Linking } from 'react-native';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import { Colors } from './../../../../constants/colors';
import images from './../../../../constants/images';
import Normalize from './../../../../helpers/Dimens';
import Header from './../../../../components/ProfileHeader';
import styles from './Styles';
import strings from './../../../../constants/lng/LocalizedStrings';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { nameShorting } from '../../../../constants/NameShorting';
import { isInt, lastStar, reviewShowinGraystar, reviewShowinStar } from '../../../../constants/RatingCount';
import { axiosUrl, ImageLink } from '../../../../constants/LinkPage';
import { addCommaAndTranslateInPersian } from '../../../../constants/NumberWithCommaAndInPersian';
import { myContext } from '../../../../constants/ContextApi';
import axiosInstance from '../../../../constants/AxiosCallPage';
import Loader_Profile from '../../../../components/loader/Profile/Loader_Profile';
import { leftOrRight } from '../../../../constants/RowOrRowreverse';
import Toast from 'react-native-simple-toast';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { fontfmliy } from '../../../../components/WhichFontFamily';
import { useNavigation } from '@react-navigation/native';
import NewLoaderPage from '../../../../components/NewLoaderPage';
import { androidCameraPermission } from '../../../../constants/permissions/Permissions';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import WarningPage from '../../../../components/WarningPage';
const { height, width } = Dimensions.get("window")
function MyProfile(props) {
  const navigation = useNavigation()
  const scrollRef = useRef();
  const scrollToEnd = () => scrollRef.current.scrollToEnd({ animated: true });
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
  const { userSlugName, profileData, setProfileData,
    review_as_poster, setReview_as_poster,
    review_as_tasker, setReview_as_tasker,
    user_completed_task_as_poster, setUser_completed_task_as_poster,
    user_completed_task_as_tasker, setUser_completed_task_as_tasker,
    listData, setListData,
    setPh_email_verify,
    tierLogo, setTierLogo,
    setUserName,
    setProf_pic,
    getAround, setGetAround,
    setAlllanguage, alllanguage,
    allSkill, setAllSkill,
    certificateList, setCertificateList
  } = useContext(myContext);
  const [loader, setLoader] = useState(false)
  const [editLoader, setEditLoader] = useState(false)
  const [aboutmeExpand, setAboutmeExpand] = React.useState(false)
  const [reviewSectionAbove, setReviewSectionAbove] = useState("T")
  const [refreshing, setRefreshing] = React.useState(false);
  const [fromWhereModal_portfolio, setFromWhereModal_portfolio] = useState(false);

  const [isPortfolioDeleteModal, setIsPortfolioDeleteModal] = React.useState(false);
  const [tempPortfolioDeleteID, setTempPortfolioDeleteID] = React.useState("");

  const onpressPortfolioCross = () => {
    setIsPortfolioDeleteModal(!isPortfolioDeleteModal)
  }
  const getData = async (val) => {
    try {
      if (val == "emptyLoader") {
        setLoader(true)
      } else if (val == "editLoader") {
        setEditLoader(true)
      } else {
        setLoader(true)
      }
      const data2 = await axios.post(`${axiosUrl.URL}get-country-language`)
      if (data2) {
        var langFinalData = []
        data2.data.language.map((item) => {
          langFinalData.push({ ...{ language: item.language }, ...{ isActive: false }, ...{ id: item.id } })
        })
        await AsyncStorage.setItem('@langdata', JSON.stringify(langFinalData))
      }
      const data = await axiosInstance.post("public-profile",
        {
          "jsonrpc": "2.0",
          "params": {
            "slug": userSlugName
          }
        })

      // console.log("++++++++++++++++++", data.data.result.UserToCertificate)

      if (data.data.result) {
        setListData(data.data.result.my_listings)

        if (data.data.result.UserToCertificate != null) {
          setCertificateList(data.data.result.UserToCertificate)
        }


        setUser_completed_task_as_poster(data.data.result.user_completed_task_as_poster)
        setUser_completed_task_as_tasker(data.data.result.user_completed_task_as_tasker)
        setReview_as_poster(data.data.result.review_as_poster)
        setReview_as_tasker(data.data.result.review_as_tasker)
        setTierLogo(data.data.result.tier.tier_logo)
        const {
          display_name,
          background_image, city,
          location, online_status,
          profile_picture,
          about_me,
          get_user_to_portfolio,
          get_user_skill,
          fname,
          lname,
          tagline,
          state,
          get_country_info,
          created_at,
          avg_review_as_poster,
          tot_review_as_poster,
          tot_review_as_tasker,
          avg_review_as_tasker,
          phone, status,
          is_phone_verified, is_email_verified
        } = data.data.result.user

        setUserName(fname + " " + lname)
        setProf_pic(profile_picture)

        if (is_phone_verified == "N" || is_email_verified == "N") {
          setPh_email_verify(false)
        } else {
          setPh_email_verify(true)
        }
        storeProfileData(data.data.result.user)
        setProfileData({
          about_me,
          display_name,
          background_image,
          city,
          location,
          online_status,
          profile_picture,
          get_user_to_portfolio,
          get_user_skill,
          fname, lname,
          tagline,
          state,
          get_country_info,
          created_at,
          avg_review_as_poster,
          tot_review_as_poster,
          tot_review_as_tasker,
          avg_review_as_tasker,
          phone, status
        })



        if (data.data.result.user.get_language != null) {
          // let l = JSON.parse(data.data.result.user.get_language);
          modify_Languages_as_database(alllanguage, data.data.result.user.get_language);
        }

        if (data.data.result.user.get_around_by != null) {
          let g = JSON.parse(data.data.result.user.get_around_by);
          modify_GetAround_as_database(getAround, g);
        }
        setLoader(false)
        setEditLoader(false)
      }
    } catch (error) {
      console.log("getData", error)
      setLoader(false)
      setEditLoader(false)
    }
  }
  const modify_GetAround_as_database = (allGetAround, selectedGetAround) => {
    try {
      var new_array = [];
      allGetAround.map((item, index) => {
        if (getaroundFind(item.name, selectedGetAround)) {
          item.isSelected = true;
          new_array.push(item);
        } else {
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
  const modify_Languages_as_database = (allLang, selectedLanguage) => {
    try {
      let new_array = [];
      allLang.map((item, index) => {
        // console.log(item)
        if (languageFind(item.id, selectedLanguage)) {
          item.isSelected = true;
          new_array.push(item);
        } else {
          new_array.push(item);
        }
      });
      setAlllanguage(new_array);
    } catch (error) {
      console.log('modify_GetAround_as_database', error);
    }
  };
  const languageFind = (val, selectedLanguage) => {
    const a = selectedLanguage.some(item => item.language_id == val);
    return a;
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
  const is_profilePage_Load_forEmpty = async () => {
    try {
      if (profileData == null) {
        getData("emptyLoader")
      }
    } catch (error) {
      console.log("is_profilePage_Load_forEmpty---", error)
    }
  }
  const is_profilePage_Load_forEdit = async () => {
    try {
      const isMyprofileload = await AsyncStorage.getItem("isMyProfile")
      // console.log("isMyprofileload", isMyprofileload)
      if (isMyprofileload == "true") {
        getData("editLoader")
        await AsyncStorage.setItem("isMyProfile", "false")
      }
    } catch (error) {
      console.log("is_profilePage_Load_forEdit---", error)
    }
  }
  const twoInOneFunction = () => {
    is_profilePage_Load_forEmpty()
    is_profilePage_Load_forEdit()
  }
  useEffect(async () => {
    const a = twoInOneFunction();
    const willFocusSubscription = navigation.addListener('focus', () => {
      a
    });
    return willFocusSubscription;
  }, []);
  const storeProfileData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@profiledata', jsonValue)
    } catch (error) {
      console.log("storeProfileData", error)
    }
  }
  const renderItem = ({ item, index }) => {
    return (
      <Pressable
        // onPress={() => navigation.navigate("ViewListing", { slugName: item.slug })}
        onPress={() => console.log(item)}
        key={index} style={{
          width: width * 0.37,
          height: Normalize(132),
          borderRadius: Normalize(5),
          backgroundColor: Colors.white,
          marginVertical: width * 0.015,
          borderWidth: Normalize(1),
          borderColor: Colors.boxBorder,
          marginRight: width * 0.015
        }}>
        <View
          style={{ flex: 1, margin: Normalize(4) }} >
          <View style={{ height: width * 0.24, width: "100%", backgroundColor: "#f5f5f5", borderRadius: Normalize(5), overflow: "hidden" }} >
            <ImageBackground
              resizeMode="cover"
              style={{ height: "100%", width: "100%", resizeMode: "cover" }}
              source={{ uri: ImageLink.ListingImage + item.image }}
            >
              {item.get_user.avg_review_as_tasker > 0 && <View style={{ height: width * 0.051, width: width * 0.09, backgroundColor: Colors.yellow2, margin: width * 0.02, borderRadius: 3, alignSelf: "flex-end", justifyContent: "center", alignItems: "center", flexDirection: "row" }} >
                <View style={{ height: Normalize(10), width: Normalize(10), marginRight: Normalize(2) }} >
                  <Image source={images.white_star} style={[globalstyles.imageFit, { resizeMode: "cover" }]} />
                </View>
                <Text style={{ fontSize: Normalize(10), color: Colors.white, fontFamily: 'roboto-medium', textAlign: leftOrRight(language), marginHorizontal: "2%" }}>{Math.round(item.get_user.avg_review_as_tasker)}</Text>
              </View>}
            </ImageBackground>
          </View>
          <View
            style={{ flex: 1, marginTop: "3%", padding: Normalize(3), justifyContent: "space-evenly" }} >
            <Text numberOfLines={1} style={{ fontSize: Normalize(11), color: "#595959", fontFamily: 'roboto-regular', textAlign: leftOrRight(language), lineHeight: Normalize(12) }}>{item.title}</Text>
            <Text numberOfLines={1} style={{
              fontSize: Normalize(10), color: Colors.greylightText, fontFamily: 'roboto-regular', textAlign: leftOrRight(language)
            }}>{strings.GETITDONE.CARDTEXT}  <Text style={{ fontFamily: 'roboto-regular', color: "#000000" }}>{strings.BROWSEFILTER.TOMAN} {Math.round(item.min_amount_package)}</Text></Text>
          </View>
        </View>
      </Pressable>
    );
  };
  const profile_Refresh = async (val) => {
    try {
      // setLoader(true)
      if (val != undefined) {
        setEditLoader(true)
      }
      const data2 = await axios.post(`${axiosUrl.URL}get-country-language`)
      if (data2) {
        var langFinalData = []
        data2.data.language.map((item) => {
          langFinalData.push({ ...{ language: item.language }, ...{ isActive: false }, ...{ id: item.id } })
        })
        await AsyncStorage.setItem('@langdata', JSON.stringify(langFinalData))
      }
      const data = await axiosInstance.post("public-profile",
        {
          "jsonrpc": "2.0",
          "params": {
            "slug": userSlugName
          }
        })

      // console.log("++++++++++++++++++", data.data.result.user.get_user_to_portfolio)

      if (data.data.result) {
        setListData(data.data.result.my_listings)

        if (data.data.result.UserToCertificate != null) {
          setCertificateList(data.data.result.UserToCertificate)
        }
        setUser_completed_task_as_poster(data.data.result.user_completed_task_as_poster)
        setUser_completed_task_as_tasker(data.data.result.user_completed_task_as_tasker)
        setReview_as_poster(data.data.result.review_as_poster)
        setReview_as_tasker(data.data.result.review_as_tasker)
        setTierLogo(data.data.result.tier.tier_logo)
        const {
          display_name,
          background_image, city,
          location, online_status,
          profile_picture,
          about_me,
          get_user_to_portfolio,
          get_user_skill,
          fname,
          lname,
          tagline,
          state,
          get_country_info,
          created_at,
          avg_review_as_poster,
          tot_review_as_poster,
          tot_review_as_tasker,
          avg_review_as_tasker,
          phone, status,
          is_phone_verified, is_email_verified
        } = data.data.result.user

        setUserName(fname + " " + lname)
        setProf_pic(profile_picture)

        if (is_phone_verified == "N" || is_email_verified == "N") {
          setPh_email_verify(false)
        } else {
          setPh_email_verify(true)
        }
        storeProfileData(data.data.result.user)
        setProfileData({
          about_me,
          display_name,
          background_image,
          city,
          location,
          online_status,
          profile_picture,
          get_user_to_portfolio,
          get_user_skill,
          fname, lname,
          tagline,
          state,
          get_country_info,
          created_at,
          avg_review_as_poster,
          tot_review_as_poster,
          tot_review_as_tasker,
          avg_review_as_tasker,
          phone, status
        })
        if (data.data.result.user.get_language != null) {
          // let l = JSON.parse(data.data.result.user.get_language);
          modify_Languages_as_database(alllanguage, data.data.result.user.get_language);
        }
        if (data.data.result.user.get_around_by != null) {
          let g = JSON.parse(data.data.result.user.get_around_by);
          modify_GetAround_as_database(getAround, g);
        }
        scrollToEnd()
        setEditLoader(false)
      }
    } catch (error) {
      setEditLoader(false)
      console.log("profile_Refresh", error)
    }
  }

  const onRefresh = React.useCallback((val) => {
    setRefreshing(true)
    if (val == undefined) {
      Toast.show(strings.ERROR.REFRESHING)
    }
    profile_Refresh(val)
    setRefreshing(false)
  }, [refreshing]);


  const handleBackButtonClick = () => {
    if (props.route.params == undefined) {
      navigation.goBack()
    } else {
      let { from } = props.route.params
      if (from != undefined) {
        navigation.navigate({
          name: "Get it done",
          params: {
            screen: "Getitdone",
          },
        })
      } else {
        navigation.goBack()
      }
    }
    return true;
  };
  useEffect(() => {
    const a = BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      a.remove();
    };
  }, []);



  const selectPortfolioImage_gallery = () => {
    if (Platform.OS == 'android') {
      onpressUploadButton();
    }
    launchImageLibrary(
      { mediaType: 'photo', },
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
          portfolioImages(response.assets[0]);
        }
      },
    );
  };
  const onpressUploadButton = () => {
    setFromWhereModal_portfolio(!fromWhereModal_portfolio);
  };
  const iscameraPermission = async () => {
    const permissionStatus = await androidCameraPermission();
    // console.log(permissionStatus)
    if (permissionStatus || Platform.OS == 'ios') {
      selectportfolioImage_camera();
    } else {
      if (Platform.OS === 'ios') {
        Toast.show('Please give camera permission');
      } else {
        // Toast.show("Please give camera permission")
        Linking.openSettings();
      }
    }
  };
  const selectportfolioImage_camera = () => {
    if (Platform.OS == 'android') {
      onpressUploadButton();
    }
    launchCamera(
      { mediaType: 'photo' },
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
            portfolioImages(response.assets[0]);
          } else {
            if (Platform.OS === 'ios') {
              Toast.show('Please give camera permission');
            }
          }
        }
      },
    );
  };
  const ChoosefromWhereModal_portfolioImage = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={fromWhereModal_portfolio}
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
                  onPressIn={selectPortfolioImage_gallery}
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
  const portfolioImages = (images) => {
    try {
      const imageData = new FormData();

      imageData.append("portfolio[]", {
        uri: images.uri,
        name: images.fileName,
        type: images.type
      });
      uploadPortFolioImages(imageData)

    } catch (error) {
      console.log("portfolioImages", error)
    }
  }
  const uploadPortFolioImages = async (portfolioImage) => {
    try {
      setEditLoader(true)
      const data = portfolioImage
      const res = await axiosInstance.post("edit-profile-portfolio-images-3", data)
      // console.log(res.data)

      if (res.data.result) {
        onRefresh("afterUpload")
      } else {
        setEditLoader(false)
        console.log(res.data.error)
      }
    } catch (error) {
      setEditLoader(false)
      console.log("uploadPortFolioImages", error)
    }
  }
  const deletePortfolioImage = async (val) => {
    try {
      onpressPortfolioCross()
      const data = {
        "jsonrpc": "2.0",
        "params": {
          "id": val
        }
      }
      const res = await axiosInstance.post("delete-portfolio-image", data)

      console.log(res.data)

      if (res.data.result) {
        onRefresh("afterUpload")
      } else {
        setEditLoader(false)
        console.log(res.data.error)
      }
    } catch (error) {
      console.log("deletePortfolioImage", error)
    }
  }


  return (
    <>
      {
        loader || profileData === null ?
          <ScrollView showsVerticalScrollIndicator={false} >
            <View style={{ flex: 1 }} >
              <Loader_Profile />
            </View>
          </ScrollView>
          :
          <SafeAreaView onLayout={() => scrollToEnd()} style={{ backgroundColor: Colors.primary, flex: 1 }}>
            <View style={styles.container}>
              <Header
                navigation={navigation}
                back
                name={nameShorting(profileData.fname + " " + profileData.lname)}
                backFunc={handleBackButtonClick}
                edit
                userSlug={userSlugName}
                setLoader={setEditLoader}
                loader={editLoader}
              />
              <View style={{ flex: 1, backgroundColor: Colors.grayf8 }} >
                <ScrollView
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh} />
                  }
                  showsVerticalScrollIndicator={false} >
                  <View
                    style={{
                      flex: 1,
                    }}>
                    {/* name and profile pic */}
                    <View style={{ height: Normalize(10), width: "100%", backgroundColor: Colors.primary }} />
                    <View style={{
                      width: width,
                      height: Normalize(100),
                      backgroundColor: Colors.primary,
                      flexDirection: "row",
                      alignItems: "center",
                    }}>
                      {/* profile picture */}
                      <View style={{ height: Normalize(90), width: Normalize(90), borderRadius: Normalize(7), backgroundColor: Colors.white, marginHorizontal: Normalize(10), overflow: "hidden" }} >
                        <Image
                          source={
                            profileData.profile_picture != null ?
                              { uri: `${ImageLink.ProfilePhoto}${profileData.profile_picture}` } :
                              { uri: ImageLink.BlankProfileImage }
                          }
                          style={{ height: "100%", width: "100%", resizeMode: "contain" }}
                        />
                      </View>
                      <View style={{ flex: 1, marginRight: Normalize(10) }} >
                        <Text style={[globalstyles.plantext_bold, { color: Colors.white, fontSize: Normalize(16), marginBottom: Normalize(1) }]}>{nameShorting(profileData.fname + " " + profileData.lname)}</Text>
                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: Normalize(4) }} >
                          <MaterialIcons
                            name="verified"
                            size={Normalize(13)}
                            color={Colors.white}
                          />
                          <Text style={[globalstyles.plantext_bold, { color: Colors.white, fontSize: Normalize(12), paddingLeft: Normalize(4) }]}>NOT VERIFIED</Text>
                        </View>

                        <Pressable
                          onPress={() => navigation.navigate("BasicInfo_intro")}
                          style={{ paddingVertical: Normalize(6), width: Normalize(130), borderRadius: Normalize(9), backgroundColor: Colors.white, justifyContent: "center", alignItems: "center" }} >
                          <Text style={[globalstyles.plantext_bold, { color: Colors.primary, fontSize: Normalize(12) }]}>Become a Eazypayer</Text>
                        </Pressable>

                      </View>
                    </View>

                    {/* reviews */}
                    <View style={{ width: width, height: Normalize(140), alignItems: "center" }} >
                      <View style={{ height: "40%", width: "100%", backgroundColor: Colors.primary }} ></View>
                      <View style={{ height: Normalize(120), width: width * 0.9, borderColor: Colors.boxBorder, borderWidth: Normalize(1), borderRadius: Normalize(8), position: "absolute", top: Normalize(10), overflow: "hidden" }} >
                        <View style={{ height: Normalize(40), width: "100%", flexDirection: "row" }} >
                          <Pressable
                            onPress={() => setReviewSectionAbove('T')}
                            style={{ flex: 1, backgroundColor: reviewSectionAbove == "T" ? Colors.secondary : Colors.grayf5, justifyContent: 'center', alignItems: "center" }} >
                            <Text
                              style={{
                                fontSize: Normalize(14),
                                color: reviewSectionAbove == 'T' ? Colors.white : Colors.grey,
                                fontFamily: fontfmliy.bold
                              }}>
                              {strings.MYPROFILE.TAB1}
                            </Text>
                          </Pressable>
                          <Pressable
                            onPress={() => setReviewSectionAbove('P')}
                            style={{ flex: 1, backgroundColor: reviewSectionAbove == "P" ? Colors.secondary : Colors.grayf5, justifyContent: 'center', alignItems: "center" }} >
                            <Text
                              style={{
                                fontSize: Normalize(14),
                                color: reviewSectionAbove == 'P' ? Colors.white : Colors.grey,
                                fontFamily: fontfmliy.bold
                              }}>
                              {strings.MYPROFILE.TAB2}
                            </Text>
                          </Pressable>
                        </View>
                        {/* review */}
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: Colors.white }}>
                          {
                            reviewSectionAbove == "T" ?
                              // user_completed_task_as_tasker <= 0 ?
                              profileData.tot_review_as_tasker == 0 ?
                                // tasker
                                <View style={{}} >
                                  {
                                    language == "en" &&
                                    <Text style={styles.reviewText}>
                                      {nameShorting(profileData.fname + " " + profileData.lname)} hasn’t received any reviews just yet.
                                    </Text>}
                                  {
                                    language != "en" &&
                                    <View style={{ flexDirection: "row", alignSelf: "center", marginVertical: Normalize(10), }} >
                                      <Text style={{
                                        fontSize: Normalize(11), fontFamily: 'roboto-regular', color: Colors.grey,
                                      }}>هنوز هیچ دیدگاه/نظری دریافت نکرده است</Text>
                                      <Text style={{
                                        fontSize: Normalize(11), fontFamily: 'roboto-regular', color: Colors.grey, marginHorizontal: "1%"
                                      }}>{nameShorting(profileData.fname + " " + profileData.lname)}</Text>
                                    </View>
                                  }
                                </View> :
                                <View style={{ justifyContent: "center", alignItems: "center", paddingVertical: Normalize(10) }} >
                                  <View style={{ flexDirection: language == "pr" ? 'row-reverse' : "row", alignItems: "center" }}>
                                    {
                                      reviewShowinStar(profileData.avg_review_as_tasker).map((item, index) => (
                                        item == 0 ?
                                          <View key={index} style={{ height: Normalize(10), width: Normalize(50), marginHorizontal: Normalize(2) }} >
                                            <Image source={images.allgray} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                          </View> :

                                          isInt(item) == true ?
                                            <View key={index} style={{ height: Normalize(10), width: Normalize(10), marginHorizontal: Normalize(0.5) }} >
                                              <Image source={images.stargolden} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                            </View> :

                                            <View key={index} style={{ height: Normalize(10), width: Normalize(10), marginHorizontal: Normalize(0.5) }} >
                                              <Image source={lastStar(item, language)} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                            </View>
                                      ))
                                    }
                                    {
                                      reviewShowinGraystar(reviewShowinStar(profileData.avg_review_as_tasker)).map((item, index) => (
                                        <View key={index} style={{ height: Normalize(10), width: Normalize(10), marginHorizontal: Normalize(0.5) }} >
                                          <Image source={images.stargray} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                        </View>
                                      ))
                                    }
                                    {/* <Text style={{ color: '#818181', marginLeft: 2, fontFamily: 'roboto-regular', fontSize: Normalize(11) }}>({language == "en" ?  reviewShowinStar(profileData.avg_review_as_tasker)[((profileData.avg_review_as_tasker).length)-1] : engToPersian( reviewShowinStar(profileData.avg_review_as_tasker)[((profileData.avg_review_as_tasker).length)-1])})</Text> */}
                                  </View>
                                  <Text style={[globalstyles.plantext_outfit_regular, { color: '#343535', marginVertical: Normalize(5) }]}>
                                    {addCommaAndTranslateInPersian(profileData.avg_review_as_tasker, language)} {strings.MYPROFILE.STARS} {strings.MYPROFILE.FROM} {addCommaAndTranslateInPersian(profileData.tot_review_as_tasker, language)} {strings.MYPROFILE.REVIEWS}
                                  </Text>
                                  <Text style={[globalstyles.plantext_outfit_regular, { color: '#747474' }]}>{strings.MYPROFILE.COMPLETEDTASKS} : {addCommaAndTranslateInPersian(user_completed_task_as_tasker, language)}</Text>
                                </View>
                              :
                              // ********POSTER*******
                              profileData.tot_review_as_poster == 0 ?
                                <View style={{}} >
                                  <Text style={styles.reviewText}>
                                    {nameShorting(profileData.fname + " " + profileData.lname)} hasn’t received any reviews just yet.
                                  </Text>
                                </View>
                                :
                                <View style={{ justifyContent: "center", alignItems: "center", paddingVertical: Normalize(10) }} >
                                  <View style={{ flexDirection: language == "pr" ? 'row-reverse' : "row", alignItems: "center" }}>
                                    {
                                      reviewShowinStar(profileData.avg_review_as_poster).map((item, index) => (
                                        item == 0 ?
                                          <View key={index} style={{ height: Normalize(10), width: Normalize(50), marginHorizontal: Normalize(2) }} >
                                            <Image source={images.allgray} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                          </View> :

                                          isInt(item) == true ?
                                            <View key={index} style={{ height: Normalize(10), width: Normalize(10), marginHorizontal: Normalize(0.5) }} >
                                              <Image source={images.stargolden} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                            </View> :

                                            <View key={index} style={{ height: Normalize(10), width: Normalize(10), marginHorizontal: Normalize(0.5) }} >
                                              <Image source={lastStar(item, language)} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                            </View>
                                      ))
                                    }
                                    {
                                      reviewShowinGraystar(reviewShowinStar(profileData.avg_review_as_poster)).map((item, index) => (
                                        <View key={index} style={{ height: Normalize(10), width: Normalize(10), marginHorizontal: Normalize(0.5) }} >
                                          <Image source={images.stargray} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                        </View>
                                      ))
                                    }
                                  </View>
                                  <Text style={[globalstyles.plantext_outfit_regular, { color: '#343535', marginVertical: Normalize(5) }]}>
                                    {addCommaAndTranslateInPersian(profileData.avg_review_as_poster, language)} {strings.MYPROFILE.STARS} {strings.MYPROFILE.FROM} {addCommaAndTranslateInPersian(profileData.tot_review_as_poster, language)} {strings.MYPROFILE.REVIEWS}
                                  </Text>
                                  <Text style={[globalstyles.plantext_outfit_regular, { color: '#747474' }]}>{strings.MYPROFILE.COMPLETEDTASKS} : {addCommaAndTranslateInPersian(user_completed_task_as_poster, language)}</Text>

                                </View>
                          }
                        </View>
                      </View>
                    </View>
                    {/* About section */}
                    {
                      profileData.about_me != null &&
                      <View style={styles.borderwithpadding} >
                        <Text
                          style={styles.newBoxTitle}>
                          About Me
                        </Text>
                        <Text
                          numberOfLines={aboutmeExpand ? 1000 : 8}
                          style={[globalstyles.plantext_outfit_regular, { color: "#4D4E50" }]}>{profileData.about_me != null && profileData.about_me}
                        </Text>
                        {profileData.about_me != null && (profileData.about_me).length > 400 && <Text onPress={() => setAboutmeExpand(!aboutmeExpand)} style={{ fontSize: Normalize(11), fontFamily: 'Outfit-Regular', color: aboutmeExpand ? Colors.secondary : Colors.primary, textAlign: leftOrRight(language), marginVertical: "2%" }}>{aboutmeExpand ? strings.POSTTASK.READLESS : strings.POSTTASK.READMORE}</Text>}
                      </View>
                    }

                    {/* Certified Qualifications */}

                    <View style={styles.borderwithpadding} >

                      <Text style={styles.newBoxTitle}>
                        Certified Qualifications
                      </Text>
                      <Text style={[globalstyles.plantext_regular, { color: Colors.grey, marginBottom: Normalize(10) }]}>
                        Press edit to add your qualifications
                      </Text>

                      {certificateList.map((item, index) => (
                        <View key={index} style={{ width: "100%", paddingVertical: Normalize(4), flexDirection: "row", alignItems: "center" }} >
                          <View style={{ height: Normalize(15), width: Normalize(15), borderRadius: Normalize(15) / 2 }} >
                            <Image source={images.greycross_new} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                          </View>
                          <View style={{ flex: 1 }} >
                            <Text numberOfLines={1} style={{
                              fontSize: Normalize(12),
                              color: Colors.greyText,
                              fontFamily: fontfmliy.regular,
                              paddingHorizontal: Normalize(12)
                            }} >{item.qualification_title}</Text>
                          </View>
                        </View>
                      ))}

                    </View>

                    {/* Langauge */}
                    <View style={styles.borderwithpadding} >
                      <Text style={styles.newBoxTitle}>
                        {strings.MYPROFILE.LANGUAGE}
                      </Text>

                      {isArrDataEmpty(alllanguage) ?
                        <View style={{ flexDirection: "row", flexWrap: "wrap" }} >
                          {alllanguage.map(
                            (item, index) =>
                              item.isSelected && (
                                <View
                                  key={index}
                                  style={styles.smallBox}>
                                  <Text
                                    style={styles.smallBoxText}>
                                    {item.language}
                                  </Text>
                                </View>
                              ))}
                        </View>
                        :
                        <Text style={[globalstyles.plantext_outfit_regular, { color: "#4D4E50", marginVertical: Normalize(5) }]} >{strings.MYPROFILE.NOLANGUAGES}</Text>
                      }
                    </View>
                    {/* Portfolio section */}
                    <View>

                      <View style={styles.borderwithpadding} >

                        <Text style={styles.newBoxTitle}>
                          {strings.MYPROFILE.PORTFOLIO}
                        </Text>
                        <Text style={[globalstyles.plantext_outfit_regular, { color: "#4D4E50", marginVertical: Normalize(0) }]}>Press below to add examples of your past work</Text>

                        <FlatList
                          ref={scrollRef}
                          data={profileData.get_user_to_portfolio}
                          style={{ marginVertical: Normalize(10) }}
                          horizontal={true}
                          renderItem={({ item, index }) => (
                            <View
                              // onPress={() => { scrollToEnd() }}
                              // onPress={() => { console.log(item) }}
                              key={index} style={{ width: Normalize(95), height: Normalize(100), backgroundColor: Colors.grayf5, marginRight: width * 0.025, borderRadius: 8, overflow: "hidden", borderWidth: 1, borderColor: Colors.boxBorder }}>
                              <Image source={{ uri: ImageLink.portfolio + item.image }} style={{ height: "100%", width: "100%", resizeMode: "cover", opacity: item.is_approved == "no" ? 0.4 : 1 }} />
                              {
                                item.is_approved == "no" &&
                                <View style={{ height: "100%", width: "100%", justifyContent: "center", alignItems: "center", position: "absolute" }} >
                                  <Text style={{
                                    fontFamily: fontfmliy.bold,
                                    color: Colors.primary,
                                    fontSize: Normalize(12),
                                  }} >Pending</Text>
                                </View>}
                              {
                                item.is_approved == "no" &&
                                <Pressable
                                  onPress={() => {
                                    setTempPortfolioDeleteID(item.id)
                                    onpressPortfolioCross()
                                  }}
                                  style={{ position: "absolute", right: Normalize(2), top: Normalize(2) }} >
                                  <View style={{ height: Normalize(18), width: Normalize(18), borderRadius: Normalize(18) / 2, backgroundColor: "red", justifyContent: "center", alignItems: "center" }} >
                                    <Entypo
                                      name="cross"
                                      size={Normalize(15)}
                                      color={Colors.white}
                                    />
                                  </View>
                                </Pressable>
                              }
                            </View>
                          )}
                          ListFooterComponent={() => {
                            return (
                              <Pressable
                                onPress={onpressUploadButton}
                                style={{ backgroundColor: Colors.secondaryBackground, width: Normalize(95), height: Normalize(100), marginRight: width * 0.025, borderRadius: 8, overflow: "hidden", justifyContent: "center", alignItems: "center" }}>
                                <View style={{ width: Normalize(40), height: Normalize(40), backgroundColor: Colors.secondaryBorder, borderRadius: Normalize(5), justifyContent: "center", alignItems: "center" }}>
                                  <MaterialCommunityIcons
                                    name="image-plus"
                                    size={Normalize(20)}
                                    color={Colors.white}
                                  />
                                </View>
                                <Text style={[globalstyles.plantext_outfit_regular, { fontSize: Normalize(9), color: "#4D4E50", marginTop: Normalize(2) }]}>Add New</Text>
                              </Pressable>
                            )
                          }}
                          keyExtractor={item => item.id}
                          showsVerticalScrollIndicator={false}
                          showsHorizontalScrollIndicator={false}
                        />
                      </View>
                      {fromWhereModal_portfolio && (
                        <ChoosefromWhereModal_portfolioImage />
                      )}

                      {isPortfolioDeleteModal &&
                        <WarningPage
                          onPress={onpressPortfolioCross}
                          ispress={isPortfolioDeleteModal}
                          warningTitle={"Delete Image"}
                          warningSubTitle={'Are you Sure you want to delete this image?'}
                          okOnpress={() => deletePortfolioImage(tempPortfolioDeleteID)}
                          cancelOnpress={onpressPortfolioCross}
                        />
                      }


                    </View>

                    {/* Listings */}
                    {
                      listData.length > 0 &&
                      <View style={styles.borderwithpadding} >
                        <Text
                          style={styles.newBoxTitle}>
                          {strings.MYPROFILE.LISTING}
                        </Text>
                        <FlatList
                          inverted={language == "en" ? false : true}
                          data={listData}
                          style={{}}
                          horizontal={true}
                          renderItem={renderItem}
                          keyExtractor={item => item.id}
                          showsVerticalScrollIndicator={false}
                          showsHorizontalScrollIndicator={false}
                        />
                      </View>}

                    {/* Transportation */}

                    <View style={styles.borderwithpadding} >

                      <Text style={styles.newBoxTitle}>
                        {strings.MYPROFILE.GETAROUNDBY}
                      </Text>

                      {isArrDataEmpty(getAround) ?
                        <View style={{ flexDirection: "row", flexWrap: "wrap" }} >
                          {getAround.map(
                            (item, index) =>
                              item.isSelected && (
                                <View
                                  key={index}
                                  style={styles.smallBox}>
                                  <Text
                                    style={styles.smallBoxText}>
                                    {item.name}
                                  </Text>
                                </View>
                              )
                          )}
                        </View>
                        :
                        <Text style={[globalstyles.plantext_outfit_regular, { color: "#4D4E50", marginVertical: Normalize(5) }]}>{strings.MYPROFILE.NOTRANSPOTATION}</Text>
                      }

                    </View>

                    {/* Skills section */}
                    <View style={styles.borderwithpadding} >
                      <Text style={styles.newBoxTitle}>
                        {strings.MYPROFILE.SKILLS}
                      </Text>

                      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {profileData.get_user_skill.length != 0 ?
                          (profileData.get_user_skill).map(
                            (item, index) =>
                              <View
                                key={index}
                                style={styles.smallBox}>
                                <Text
                                  style={styles.smallBoxText}>
                                  {item.get_skill.skill}
                                </Text>
                              </View>
                          )

                          : <Text style={[globalstyles.plantext_outfit_regular, { color: "#4D4E50", marginVertical: Normalize(5) }]} >{strings.MYPROFILE.NOSKILL}</Text>
                        }

                      </View>
                    </View>
                    {/* Badges section */}
                    <View style={styles.borderwithpadding} >
                      <Text style={styles.newBoxTitle}>
                        {strings.MYPROFILE.BADGES}
                      </Text>
                      <View style={{ flexDirection: language == "en" ? 'row' : "row-reverse" }}>
                        <View style={[styles.iconStyle, { backgroundColor: Colors.grayf5, borderRadius: Normalize(30), justifyContent: "center", alignItems: "center" }]} >
                          <Image
                            source={{ uri: ImageLink.tier + tierLogo }}
                            style={{ height: "80%", width: "80%", resizeMode: "contain" }}
                            resizeMode="contain"
                          />
                        </View>
                        <View style={{ flexDirection: 'column', alignSelf: 'center', marginHorizontal: 30 }}>
                          <TouchableOpacity style={{ flexDirection: language == "en" ? 'row' : "row-reverse", alignItems: "center" }}
                          // onPress={() => p_data ? navigation.navigate('PaymentMethodView') : navigation.navigate('PaymentMethod')}
                          >
                            <Image
                              source={images.payment_method}
                              style={{ height: Normalize(16), width: Normalize(16) }}
                              resizeMode="contain"
                            />
                            <Text style={[globalstyles.plantext_outfit_regular, { color: "#222427", marginLeft: Normalize(10) }]}>
                              Payment Method
                            </Text>
                          </TouchableOpacity>
                          <View style={{ flexDirection: language == "en" ? 'row' : "row-reverse", marginTop: Normalize(10), alignItems: "center" }}>
                            <Image
                              source={images.mobile}
                              style={{ height: Normalize(16), width: Normalize(16) }}
                              resizeMode="contain"
                            />
                            <Text style={[globalstyles.plantext_outfit_regular, { color: "#222427", marginLeft: Normalize(10) }]}>
                              {profileData.phone !== null && profileData.phone}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </ScrollView>
                {
                  editLoader &&
                  <NewLoaderPage />
                }
              </View>
            </View>
          </SafeAreaView >
      }
    </>

  );
}

export default withRtl(MyProfile);


