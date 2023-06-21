import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, ScrollView, ActivityIndicator, FlatList, RefreshControl, Pressable, Dimensions, ImageBackground } from 'react-native';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import { Colors } from '../../../../constants/colors';
import images from '../../../../constants/images';
import Normalize from '../../../../helpers/Dimens';
import Header from '../../../../components/ProfileHeader';
import styles from './Styles';
import strings from '../../../../constants/lng/LocalizedStrings';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoaderPage from '../../../../components/LoaderPage';
import moment from 'moment';
import { engToPersian } from '../../../../constants/EnglishToPersian';
import { nameShorting } from '../../../../constants/NameShorting';
import { isInt, lastStar, reviewShowinGraystar, reviewShowinStar } from '../../../../constants/RatingCount';
import { questionEnglishTimeShow, questionPersianTimeShow } from '../../../../constants/DateShow';
import { axiosUrl, ImageLink } from '../../../../constants/LinkPage';
import { numberWithCommas, numberWithCommasinParsian } from '../../../../constants/NumberWithComma';
import { addCommaAndTranslateInPersian } from '../../../../constants/NumberWithCommaAndInPersian';
import { myContext } from '../../../../constants/ContextApi';
import axiosInstance from '../../../../constants/AxiosCallPage';
import Loader_Profile from '../../../../components/loader/Profile/Loader_Profile';
import { leftOrRight } from '../../../../constants/RowOrRowreverse';
import Toast from 'react-native-simple-toast';
import CurveDesing_Component from '../../../../constants/CurveDesing_Component';
import { navigateTo } from '../../../../constants/NavigationToProfile';
import { borderRadius } from 'styled-system';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
import BlueText_doubleArrow from '../../../../components/BlueText_doubleArrow';
import { testingText } from '../../../../constants/TestingConstant';
const { height, width } = Dimensions.get("window")
function MyProfile({ navigation }) {
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
    setProf_pic
  } = useContext(myContext);
  const [loader, setLoader] = useState(false)
  const [getAroundData, setGetAroundData] = useState([])
  const [getl, setl] = useState("")
  const [aboutmeExpand, setAboutmeExpand] = React.useState(false)
  const [reviewSection, setReviewSection] = useState("T")
  const [reviewSectionAbove, setReviewSectionAbove] = useState("T")
  const [refreshing, setRefreshing] = React.useState(false);
  const [p_data, setP_data] = useState(false)

  const [getAround, setGetAround] = useState([
    {
      id: 0,
      title: strings.BASICINFO.BICYCLE,
      value: "B",
      c: 'false'
    },
    {
      id: 1,
      title: strings.BASICINFO.CAR,
      value: "C",
      c: 'false'
    },
    {
      id: 2,
      title: strings.BASICINFO.ONLINE,
      value: "O",
      c: 'false'
    },
    {
      id: 3,
      title: strings.BASICINFO.SCOOTER,
      value: "S",
      c: 'false'
    },
    {
      id: 4,
      title: strings.BASICINFO.TRUCK,
      value: "T",
      c: 'false'
    },
    {
      id: 5,
      title: strings.BASICINFO.WALK,
      value: "W",
      c: 'false'
    },
  ])
  const getData2 = async () => {
    try {
      const data = await axiosInstance.post("payment-method-details")
      if (data.data.result.bank == null) {
        setP_data(false)
      } else {
        setP_data(true)
      }
    } catch (error) {
      console.log("error")
    }
  }
  useEffect(async () => {
    getData2()
    return () => {
      getData2()
    }
  }, []);
  const getData = async () => {
    try {
      setLoader(true)
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

      // console.log("++++++++++++++++++", data.data.result)

      if (data.data.result) {
        setListData(data.data.result.my_listings)
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
        if (data.data.result.user.get_language) {
          const l = data.data.result.user.get_language
          var lan = "";
          for (let i = 0; i < l.length; i++) {
            if (i == 0) {
              lan = l[i].get_language_name.language
            } else {
              var la = l[i].get_language_name.language
              lan = lan + ", " + la
            }
          }
          setl(lan)
        }
        {
          data.data.result.user.get_around_by &&
            setGetAroundData(JSON.parse(data.data.result.user.get_around_by))
        }
        setLoader(false)
      }
    } catch (error) {
      console.log("getData", error)
      setLoader(false)
    }
  }
  const is_profilePage_Load = () => {
    if (profileData == null) {
      getData()
    }
    //  else {
    //   console.log("not loading...........")
    // }
  }
  useEffect(async () => {
    is_profilePage_Load()
    return () => {
      is_profilePage_Load()
    }
  }, [userSlugName]);
  const storeProfileData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@profiledata', jsonValue)
    } catch (error) {
      console.log("storeProfileData", error)
    }
  }
  const getAroundby = () => {
    try {
      var rdata = "";
      for (let i = 0; i < getAround.length; i++) {
        for (let j = 0; j < getAroundData.length; j++) {
          if (getAroundData[j] == getAround[i].value) {
            if (j == 0) {
              rdata = getAround[i].title
            } else {
              rdata = rdata + ", " + getAround[i].title
            }
          }
        }
      }
      return rdata;
    } catch (error) {
      console.log("getAroundby", error)
    }
  }
  const isMyprofileLoader = async () => {
    try {
      const isMyprofileload = await AsyncStorage.getItem("isMyProfile")
      // console.log("async profile", isMyprofileload)
      if (isMyprofileload == "true") {
        getData()
        await AsyncStorage.setItem("isMyProfile", "false")
      }
      //  else {
      //   console.log("not loader profile page")
      // }
    } catch (error) {
      console.log("isMyprofileLoader", error)
    }
  }
  useEffect(async () => {
    isMyprofileLoader()
    const willFocusSubscription = navigation.addListener('focus', () => {
      isMyprofileLoader()
    });
    return willFocusSubscription;
  }, []);
  const createDatePersian = (val) => {
    try {
      const a = val.substr(0, 10)
      let datemonthyear = moment(a, 'YYYY-MM-DD').locale('fa').format('YYYY/MM/D');
      return engToPersian(datemonthyear)
    } catch (error) {
      console.log("createDatePersian", error)
    }
  }
  const createDateEnglish = (val) => {
    try {
      const a = val.substr(0, 10)
      let m = moment(a, 'YYYY-MM-DD').format('MMM DD, YYYY');
      return m
    } catch (error) {
      console.log("createDateEnglish", error)
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
  const profile_Refresh = async () => {
    try {
      // setLoader(true)
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
      // console.log("****************************",data.data.result.selfie_image)
      if (data.data.result) {
        setListData(data.data.result.my_listings)
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
          phone,
          status
        } = data.data.result.user

        storeProfileData(data.data.result.user)
        // console.log(data.data.result)
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
          phone,
          status
        })

        if (data.data.result.user.get_language) {
          const l = data.data.result.user.get_language
          var lan = "";
          for (let i = 0; i < l.length; i++) {
            if (i == 0) {
              lan = l[i].get_language_name.language

            } else {
              var la = l[i].get_language_name.language
              lan = lan + ", " + la
            }
          }
          setl(lan)
        }
        {
          data.data.result.user.get_around_by &&
            setGetAroundData(JSON.parse(data.data.result.user.get_around_by))
        }
      }
      setLoader(false)
    } catch (error) {
      console.log("profile_Refresh", error)
    }
  }
  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    Toast.show(strings.ERROR.REFRESHING)
    profile_Refresh()
    setRefreshing(false)
  }, [refreshing]);
  return (
    <>
      {
        loader || profileData === null ?
          <ScrollView showsVerticalScrollIndicator={false} >
            <View style={{ flex: 1 }} >
              <Loader_Profile />
              {/* <LoaderPage /> */}
            </View>
          </ScrollView>
          :
          <SafeAreaView style={{ backgroundColor: '#0e148b', flex: 1 }}>
            <View style={styles.container}>
              <Header
                navigation={navigation}
                back
                name={nameShorting(profileData.fname + " " + profileData.lname)}
                routeName="EditProfile"
              />
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
                      paddingHorizontal: Normalize(15)
                    }}>
                    {/* cover pic and profile pic */}

                    <View style={{
                      width: '100%',
                      height: Normalize(100),
                      backgroundColor: "#f5f5f5",
                      marginTop: Normalize(3)
                    }}>
                      {/* cover pic */}

                      {/* <Text>{profileData.background_image}</Text> */}
                      {/* <Text>{profileData.profile_picture}</Text> */}

                      <Image
                        source={
                          profileData.background_image != null ?
                            { uri: `https://changicourt.com/dev/storage/app/public/background_image/${profileData.background_image}` } :
                            images.backgroundprofile
                        }
                        style={[styles.coverPic, { resizeMode: "cover", borderRadius: Normalize(8) }]} />
                      {/* profile pic */}
                      <View style={{
                        backgroundColor: Colors.white,
                        alignItems: 'center',
                        width: "85%",
                        height: Normalize(155),
                        borderRadius: Normalize(10) / 2,
                        position: 'absolute',
                        top: '65%',
                        alignSelf: 'center',
                        overflow: "hidden",
                        paddingTop: Normalize(15)
                      }}>
                        <Image
                          source={
                            profileData.profile_picture != null ?
                              { uri: `${ImageLink.ProfilePhoto}${profileData.profile_picture}` } :
                              { uri: ImageLink.BlankProfileImage }
                          }
                          style={{ height: Normalize(65), width: Normalize(65), borderRadius: Normalize(65) / 2, resizeMode: "cover" }}
                        />
                      </View>
                    </View>
                    {/* name and address */}
                    <View style={[styles.nameAddContainer, { marginTop: Normalize(47) }]}>
                      <Text style={[globalstyles.blue_Text]}>{nameShorting(profileData.fname + " " + profileData.lname)}</Text>
                      <Text style={[globalstyles.plantext_outfit_regular, { color: Colors.green_new }]}>
                        {strings.MYPROFILE.ONLINE}
                      </Text>


                      {/* Address */}
                      {
                        profileData.location && <View style={{ marginHorizontal: Normalize(12) }} >
                          <View style={{ padding: Normalize(5), flexDirection: "row" }}>
                            <View style={{ height: Normalize(12), width: Normalize(12), marginHorizontal: Normalize(2), marginTop: Normalize(2), opacity: 0.7 }}>
                              <Image source={images.task_L} style={{ height: "100%", width: "100%", resizeMode: "cover" }} />
                            </View>
                            <Text style={[globalstyles.plantext_outfit_regular, { color: "#343535", textAlign: "center" }]}>
                              {profileData.location} {profileData.get_country_info != null && ","}{profileData.get_country_info != null && profileData.get_country_info.name}

                              {/* {profileData.get_country_info.name} */}
                            </Text>
                          </View>
                        </View>
                      }

                      <Text style={[globalstyles.plantext_outfit_regular, { color: "#747474" }]}>{strings.MYPROFILE.MEMBERSINCE} {language == "en" ? createDateEnglish(profileData.created_at) : createDatePersian(profileData.created_at)}
                      </Text>

                    </View>
                    {/* line break */}


                    <View style={{
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: Normalize(5),
                      marginBottom: Normalize(10),

                    }} >
                      <Text numberOfLines={1} style={[globalstyles.grey_Text, { color: "#D8D8D8", letterSpacing: 1 }]} >...........................................................................................................................................</Text>
                    </View>




                    {/* custom tab tasker and poster */}
                    <View style={[styles.customTab, { flexDirection: language == "en" ? 'row' : "row-reverse", }]}>
                      {/* tab for tasker */}
                      <TouchableOpacity
                        style={[
                          styles.tab1Style,
                          {
                            borderColor: reviewSectionAbove == 'T' ? Colors.secondary : Colors.borderColor,
                            borderWidth: reviewSectionAbove == 'T' ? 0 : 1,
                            backgroundColor:
                              reviewSectionAbove == 'T' ? Colors.secondary : Colors.white,
                          },
                        ]}
                        onPress={() => setReviewSectionAbove('T')}>
                        <Text
                          style={[
                            globalstyles.plantext_roboto_regular,
                            {
                              color: reviewSectionAbove == 'T' ? Colors.white : Colors.greyText,
                              fontFamily: reviewSectionAbove == "T" ? "roboto-medium" : "roboto-regular"
                            },
                          ]}>
                          {strings.MYPROFILE.TAB1}
                        </Text>
                      </TouchableOpacity>
                      {/* tab for poster */}
                      <TouchableOpacity
                        style={[
                          styles.tab1Style,
                          {
                            borderColor: reviewSectionAbove == 'P' ? Colors.secondary : Colors.borderColor,
                            borderWidth: reviewSectionAbove == 'P' ? 0 : 1,
                            backgroundColor:
                              reviewSectionAbove == 'P' ? Colors.secondary : Colors.white,
                          },
                        ]}
                        onPress={() => setReviewSectionAbove('P')}>
                        <Text
                          style={[
                            globalstyles.plantext_roboto_regular,
                            {
                              color: reviewSectionAbove == 'P' ? Colors.white : Colors.greyText,
                              fontFamily: reviewSectionAbove == "P" ? "roboto-medium" : "roboto-regular"
                            },
                          ]}>
                          {strings.MYPROFILE.TAB2}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    {/* reviews */}
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

                    {/* About section */}
                    <View
                      style={[
                        styles.aboutSection_new,
                      ]}>
                      <Text
                        style={[globalstyles.page_Header_Text, { fontSize: Normalize(16) }]}>
                        About Me
                      </Text>

                      {profileData.tagline != null &&
                        <Text
                          numberOfLines={aboutmeExpand ? 1000 : 8}
                          style={[globalstyles.plantext_outfit_regular, { color: "#4D4E50" }]}>{profileData.tagline != null && profileData.tagline}{profileData.about_me != null && "\n" + profileData.about_me}
                        </Text>}
                      {profileData.about_me != null && (profileData.about_me).length > 400 && <Text onPress={() => setAboutmeExpand(!aboutmeExpand)} style={{ fontSize: Normalize(11), fontFamily: 'Outfit-Regular', color: aboutmeExpand ? Colors.secondary : Colors.primary, textAlign: leftOrRight(language), marginVertical: "2%" }}>{aboutmeExpand ? strings.POSTTASK.READLESS : strings.POSTTASK.READMORE}</Text>}

                    </View>
                    {/* Listings */}
                    <View style={{}} >
                      <BlueText_doubleArrow
                        title={strings.MYPROFILE.LISTING}
                      />
                      {
                        listData.length === 0 ?
                          <Text style={[styles.h3]} >{strings.MYPROFILE.NOLISTING}</Text>
                          :
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
                      }
                    </View>
                    {/* Portfolio section */}
                    <View>

                      <BlueText_doubleArrow
                        title={strings.MYPROFILE.PORTFOLIO}
                      />
                      {profileData ?
                        profileData.get_user_to_portfolio.length > 0 ?
                          <FlatList
                            data={profileData.get_user_to_portfolio}
                            style={{ marginVertical: Normalize(10) }}
                            horizontal={true}
                            renderItem={({ item, index }) => (
                              <View key={index} style={{ width: Normalize(125), height: Normalize(82), backgroundColor: Colors.grayf5, marginRight: width * 0.025, borderRadius: 8, overflow: "hidden" }}>
                                <Image source={{ uri: `https://changicourt.com/dev/storage/app/public/images/portfolio/${item.image}` }} style={{ height: "100%", width: "100%", resizeMode: "cover" }} />
                              </View>
                            )}
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                          />
                          :
                          <Text style={[globalstyles.plantext_outfit_regular, { color: "#4D4E50", marginVertical: Normalize(5) }]}>Portfolio not added yet</Text>
                        :
                        <Text style={[globalstyles.plantext_outfit_regular, { color: "#4D4E50", marginVertical: Normalize(5) }]}>Portfolio not added yet</Text>

                      }

                    </View>
                    {/* Transportation */}

                    <View style={{
                      backgroundColor: Colors.white,
                      padding: Normalize(15),
                      borderRadius: 8,
                      elevation: Normalize(2),
                      marginVertical: Normalize(10)
                    }} >


                      <Text
                        style={[globalstyles.blue_Text, { fontSize: Normalize(14) }]}>
                        {strings.MYPROFILE.GETAROUNDBY}
                      </Text>

                      {
                        getAroundData.length != 0 ?
                          <Text
                            style={[globalstyles.plantext_outfit_regular, { color: "#4D4E50", marginVertical: Normalize(5) }]}>
                            {getAroundby()}
                          </Text>
                          :
                          <Text style={[globalstyles.plantext_outfit_regular, { color: "#4D4E50", marginVertical: Normalize(5) }]}>{strings.MYPROFILE.NOTRANSPOTATION}</Text>
                      }
                      {/* Langauge */}

                      <Text
                        style={[globalstyles.blue_Text, { fontSize: Normalize(14) }]}>
                        {strings.MYPROFILE.LANGUAGE}
                      </Text>

                      {getl != "" ?
                        <Text
                          style={[globalstyles.plantext_outfit_regular, { color: "#4D4E50", marginVertical: Normalize(5) }]}>
                          {getl}
                        </Text>
                        :
                        <Text style={[globalstyles.plantext_outfit_regular, { color: "#4D4E50", marginVertical: Normalize(5) }]} >{strings.MYPROFILE.NOLANGUAGES}</Text>
                      }

                      {/* Skills section */}

                      <Text
                        style={[globalstyles.blue_Text, { fontSize: Normalize(14) }]}>
                        {strings.MYPROFILE.SKILLS}
                      </Text>

                      {
                        profileData ?
                          profileData.get_user_skill.length != 0 ?

                            <FlatList
                              horizontal
                              showsHorizontalScrollIndicator={false}
                              ItemSeparatorComponent={() => (
                                <Text style={[globalstyles.plantext_outfit_regular, { color: "#4D4E50", marginVertical: Normalize(5) }]}>{language == "en" ? "," : "،"}</Text>
                              )}
                              data={profileData.get_user_skill}
                              renderItem={({ item, index }) => (
                                <Text key={index} style={[globalstyles.plantext_outfit_regular, { color: "#4D4E50", marginVertical: Normalize(5) }]} >{item.get_skill.skill}</Text>
                              )}
                            />

                            : <Text style={[globalstyles.plantext_outfit_regular, { color: "#4D4E50", marginVertical: Normalize(5) }]} >{strings.MYPROFILE.NOSKILL}</Text>


                          : <Text style={[globalstyles.plantext_outfit_regular, { color: "#4D4E50", marginVertical: Normalize(5) }]} >{strings.MYPROFILE.NOSKILL}</Text>
                      }
                      {/* Badges section */}
                      <Text
                        style={[globalstyles.blue_Text, { fontSize: Normalize(14) }]}>
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
                            onPress={() => p_data ? navigation.navigate('PaymentMethodView') : navigation.navigate('PaymentMethod')}
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
                    {/* *******review headline****** */}
                    <View style={styles.reviewView}>
                      <View style={{ paddingRight: 15 }}>
                        <Text
                          style={[globalstyles.page_Header_Text, { fontSize: Normalize(16) }]}>
                          {strings.MYPROFILE.REVIEWS}
                        </Text>
                      </View>
                      {/* ************ bottom two review button *********** */}
                      <View style={[styles.customTab, { flexDirection: 'row', marginVertical: Normalize(10) }]}>
                        {/* tab for tasker */}
                        <TouchableOpacity
                          onPress={() => setReviewSection("T")}
                          style={[
                            styles.tab1Style,
                            {
                              borderColor: reviewSection == 'T' ? Colors.secondary : Colors.borderColor,
                              borderWidth: reviewSection == 'T' ? 0 : 1,
                              backgroundColor:
                                reviewSection == 'T' ? Colors.secondary : Colors.white,
                            },
                          ]}>
                          <Text
                            style={[
                              globalstyles.plantext_roboto_regular,
                              {
                                color: reviewSection == 'T' ? Colors.white : Colors.greyText,
                                fontFamily: reviewSection == "T" ? "roboto-medium" : "roboto-regular"
                              },
                            ]}>
                            {strings.MYPROFILE.TAB1}
                          </Text>
                        </TouchableOpacity>
                        {/* tab for poster */}
                        <TouchableOpacity
                          onPress={() => setReviewSection("P")}
                          style={[
                            styles.tab1Style,
                            {
                              borderColor: reviewSection == 'P' ? Colors.secondary : Colors.borderColor,
                              borderWidth: reviewSection == 'P' ? 0 : 1,
                              backgroundColor:
                                reviewSection == 'P' ? Colors.secondary : Colors.white,
                            },
                          ]}>
                          <Text
                            style={[
                              globalstyles.plantext_roboto_regular,
                              {
                                color: reviewSection == 'P' ? Colors.white : Colors.greyText,
                                fontFamily: reviewSection == 'P' ? "roboto-medium" : "roboto-regular"
                              },
                            ]}>
                            {strings.MYPROFILE.TAB2}
                          </Text>
                        </TouchableOpacity>
                      </View>
                      {/* **************review lists*********** */}
                      {
                        reviewSection == "T" ?
                          <View style={{ marginTop: Normalize(8) }}>
                            {
                              review_as_tasker.length == 0 ?

                                <View style={{ padding: 15 }}>
                                  <Text
                                    style={{
                                      fontSize: Normalize(10),
                                      fontFamily: 'roboto-medium',
                                      color: Colors.lightGrey,
                                      textAlign: "center"
                                    }}>
                                    {strings.MYPROFILE.NOREVIEWSASATASKER}
                                  </Text>
                                </View> :
                                <View style={{ backgroundColor: Colors.white, elevation: Normalize(2), borderRadius: 8, marginBottom: Normalize(10), paddingVertical: Normalize(10) }}>
                                  {
                                    review_as_tasker.map((item, index) => (
                                      <View key={index} style={{ flexDirection: 'column', padding: Normalize(15), paddingVertical: Normalize(10) }}>
                                        <View style={{ flexDirection: language == "pr" ? "row-reverse" : "row" }}>
                                          <View style={{ flexDirection: language == "pr" ? "row-reverse" : "row" }}>
                                            <View style={{ width: 50, height: 50, backgroundColor: "#f5f5f5", borderRadius: 25, overflow: "hidden" }}>
                                              {
                                                item.get_poster.profile_picture != null ?
                                                  <Image
                                                    source={{ uri: ImageLink.ProfilePhoto + `${item.get_poster.profile_picture}` }}
                                                    style={{ height: "100%", width: "100%", resizeMode: "cover" }}
                                                  />
                                                  :
                                                  <Image
                                                    source={{ uri: ImageLink.BlankProfileImage }}
                                                    style={{ height: "100%", width: "100%", resizeMode: "cover" }}
                                                  />
                                              }
                                            </View>
                                            {/* ***************as a tasker********** */}
                                            <View style={{ flexDirection: 'column', marginLeft: Normalize(5) }}>
                                              <Text
                                                numberOfLines={1}
                                                onPress={() => { navigateTo(item.get_poster.slug, navigation) }}
                                                style={[globalstyles.blue_Text, { fontSize: Normalize(14), width: "95%" }]}>{nameShorting(item.get_poster.fname + " " + item.get_poster.lname)}</Text>


                                              <View style={{ flexDirection: language == "pr" ? 'row-reverse' : "row", alignItems: "center", marginTop: Normalize(2) }}>
                                                {
                                                  reviewShowinStar(item.rating).map((item, index) => (
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
                                                  reviewShowinGraystar(reviewShowinStar(item.rating)).map((item, index) => (
                                                    <View key={index} style={{ height: Normalize(10), width: Normalize(10), marginHorizontal: Normalize(0.5) }} >
                                                      <Image source={images.stargray} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                                    </View>
                                                  ))
                                                }
                                              </View>
                                            </View>
                                          </View>
                                          <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-around", alignItems: "center" }} >
                                            <View style={{ height: Normalize(9), width: Normalize(9), }} >
                                              <Image source={images.clockIcon} style={globalstyles.imageFit} />
                                            </View>
                                            <Text style={[globalstyles.plantext_outfit_regular, { fontSize: Normalize(8) }]}>{questionEnglishTimeShow(item.created_at)}</Text>
                                          </View>
                                        </View>
                                        <Text
                                          onPress={() => {
                                            navigation.push('TaskDetails', { show: item.get_task.slug })
                                          }}
                                          numberOfLines={2}
                                          style={[globalstyles.plantext_outfit_regular, { marginTop: Normalize(5), color: "#1C1D1F" }]}>
                                          {item.get_task.title}
                                        </Text>
                                        <Text
                                          style={[globalstyles.plantext_outfit_regular, { fontSize: Normalize(11), color: "#4D4E50", marginTop: Normalize(3) }]}>
                                          {item.description}
                                        </Text>
                                      </View>
                                    ))
                                  }
                                </View>
                            }
                          </View>
                          :
                          <View style={{ marginTop: Normalize(8) }}>
                            {
                              review_as_poster.length == 0 ?
                                <View style={{ padding: 15 }}>
                                  <Text
                                    style={{

                                      fontSize: Normalize(10),
                                      fontFamily: 'roboto-medium',
                                      color: Colors.lightGrey,
                                      textAlign: "center"
                                    }}>
                                    {strings.MYPROFILE.NOREVIEWSASAPOSTER}
                                  </Text>
                                </View> :
                                <View style={{ backgroundColor: Colors.white, elevation: Normalize(2), borderRadius: 8, marginBottom: Normalize(10), paddingVertical: Normalize(10) }}>
                                  {
                                    review_as_poster.map((item, index) => (
                                      <View key={index} style={{ flexDirection: 'column', padding: Normalize(15), paddingVertical: Normalize(10) }}>
                                        <View style={{ flexDirection: language == "pr" ? "row-reverse" : "row" }}>
                                          <View style={{ flexDirection: language == "pr" ? "row-reverse" : "row" }}>

                                            <View style={{ width: 50, height: 50, backgroundColor: "#f5f5f5", borderRadius: 25, overflow: "hidden" }}>
                                              {
                                                item.get_tasker.profile_picture != null ?
                                                  <Image
                                                    source={{ uri: ImageLink.ProfilePhoto + `${item.get_tasker.profile_picture}` }}
                                                    style={{ height: "100%", width: "100%", resizeMode: "cover" }}
                                                  />
                                                  :
                                                  <Image
                                                    source={{ uri: ImageLink.BlankProfileImage }}
                                                    style={{ height: "100%", width: "100%", resizeMode: "cover" }}
                                                  />
                                              }
                                            </View>
                                            <View style={{ flexDirection: 'column', marginLeft: Normalize(5) }}>
                                              <Text

                                                onPress={() => { navigateTo(item.get_tasker.slug, navigation) }}
                                                numberOfLines={1}
                                                style={[globalstyles.blue_Text, { fontSize: Normalize(14), width: "95%" }]}>{nameShorting(item.get_tasker.fname + " " + item.get_tasker.lname)}</Text>
                                              <View style={{ flexDirection: language == "pr" ? 'row-reverse' : "row", alignItems: "center", marginTop: Normalize(2) }}>
                                                {
                                                  reviewShowinStar(item.rating).map((item, index) => (
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
                                                  reviewShowinGraystar(reviewShowinStar(item.rating)).map((item, index) => (
                                                    <View key={index} style={{ height: Normalize(10), width: Normalize(10), marginHorizontal: Normalize(0.5) }} >
                                                      <Image source={images.stargray} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                                    </View>
                                                  ))
                                                }
                                              </View>
                                            </View>
                                          </View>
                                          <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-around", alignItems: "center" }} >
                                            <View style={{ height: Normalize(9), width: Normalize(9), }} >
                                              <Image source={images.clockIcon} style={globalstyles.imageFit} />
                                            </View>
                                            <Text style={[globalstyles.plantext_outfit_regular, { fontSize: Normalize(8) }]}>{questionEnglishTimeShow(item.created_at)}</Text>
                                          </View>
                                        </View>
                                        <Text
                                          onPress={() => {
                                            navigation.push('TaskDetails', { show: item.get_task.slug })
                                          }}
                                          numberOfLines={2}
                                          style={[globalstyles.plantext_outfit_regular, { marginTop: Normalize(5), color: "#1C1D1F" }]}>
                                          {item.get_task.title}
                                        </Text>
                                        <Text
                                          style={[globalstyles.plantext_outfit_regular, { fontSize: Normalize(11), color: "#4D4E50", marginTop: Normalize(3) }]}>
                                          {item.description}
                                        </Text>
                                      </View>
                                    ))}
                                </View>
                            }
                          </View>
                      }
                    </View>



                  </View>
                </ScrollView>
            </View>
          </SafeAreaView >
      }
    </>

  );
}

export default withRtl(MyProfile);


