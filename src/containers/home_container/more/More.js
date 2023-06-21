import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView, Modal } from 'react-native';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import styles from './Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../../components/Header';
import Normalize from './../../../helpers/Dimens';
import { Colors } from './../../../constants/colors';
import strings from './../../../constants/lng/LocalizedStrings';
import { myContext } from '../../../constants/ContextApi';
import { useNavigation, CommonActions } from "@react-navigation/native"
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import WarningPage from '../../../components/WarningPage';
import LoaderPage from '../../../components/LoaderPage';
import images from '../../../constants/images';
import { engToPersian } from '../../../constants/EnglishToPersian';
import { axiosUrl, ImageLink } from '../../../constants/LinkPage';
import axiosInstance from '../../../constants/AxiosCallPage';
import messaging from '@react-native-firebase/messaging';
import globalstyles from '../../../constants/globalStyles/Global_Styles';
import CurveDesing_Component from '../../../constants/CurveDesing_Component';
import { LoginManager } from 'react-native-fbsdk';
import { numberWithCommas } from '../../../constants/NumberWithComma';
import Ionicons from 'react-native-vector-icons/Ionicons';
function More() {
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
  const navigation = useNavigation()
  const [logoutModal, setLogoutModal] = useState(false)
  const [loader, setLoader] = useState(false)
  const [listingLoader, setLlistingLoader] = useState(false)
  const [p_data, setP_data] = useState(false)
  const {
    token, setProfileData,
    setSignup_from,
    userId,
    setPh_email_verify,
    slugName, setSlugName,
    setId,
    setCategory_id,
    setCategory_image,
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
    setMust_Have,
    setDate_type,
    setImageFinalArray,
    setY2,
    setM2,
    setD2,
    setTaskDetails,

    setTaskData,
    setMyTaskData,

    setMytaskValue,
    setAllVerified,
    setAllMsg,
    setUnreadMsg,
    // *****************************  For Listing  ********************************
    setLMS_id,
    setLMS_category_id,
    setLMS_subcategory_id,
    setLMS_title,
    setLMS_search_tag,
    setLMS_description,

    setLMS_package_price_1,
    setLMS_package_id_1,
    setLMS_package_name_1,
    setLMS_package_description_1,

    setLMS_package_price_2,
    setLMS_package_id_2,
    setLMS_package_name_2,
    setLMS_package_description_2,

    setLMS_package_price_3,
    setLMS_package_id_3,
    setLMS_package_name_3,
    setLMS_package_description_3,

    setLMS_package_price_4,
    setLMS_package_id_4,
    setLMS_package_name_4,
    setLMS_package_description_4,

    setLMS_package_price_5,
    setLMS_package_id_5,
    setLMS_package_name_5,
    setLMS_package_description_5,


    setLMS_type,
    setLMS_location,
    setLMS_distance,
    setLMS_lat,
    setLMS_lng,
    setLMS_avalibility,
    setLMS_message,

    setLMS_Multi_Images,
    setLMS_single_Images,

    setLMS_prev_Multi_Images,
    setOpen,
    setOpen2,
    setOpen3,
    setOpen4,
    setOpen5,
    setselectedTaskType,
    setStartLoader_myTask,
    setStartLoader_BrowserTask,
    setTierData,
    setUserData,
    setAllData,
    setNext_TierData,
    setTierDetails,
    setAllCategory,
    setAllSubcategory,
    setListingCategory,
    setPhone_numbe,
    setEmail_Address,
    listing_Page, setListing_Page,
    setChoose_Categories,
    prof_pic,
    moreBalance,
    userName,
    setPhone_Code, setSignupPhoneNumer_details,
    setFilter_Categories, setcatagory,
    setIsBrowseTaskLoad, setAllNewMyTask, setIsMyTaskLoad,
    setBrowserLocation,
    setBrowserLat,
    setBrowserLng,
    setBrowsertype,
    setDistance,
    setPrevDistance,
    setIsAvaliable,setTaskOrMap

  } = useContext(myContext)
  const logoutOnpress = () => {
    setLogoutModal(!logoutModal)
  }
  const logoutHandle = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        // routes: [{ name: "SignIn" }]
        routes: [{ name: "IntroVideoScreen" }]
      }));
  }
  const earnmoney = [
    {
      icon: require("../../../../assets/menu_beaf.png"),
      name: 'Be a Fixer',
      // route: 'BasicInfo',
      route: 'BasicInfo_intro',
    },
    {
      icon: require("../../../../assets/menu_dash.png"),
      name: strings.MORESCREEN.DASHBOARD,
      route: 'Dashboard',
    },
  ];
  const general = [
    {
      icon: require("../../../../assets/menu_prof.png"),
      name: strings.MORESCREEN.EDITPROFILE,
      route: 'MyProfile',
    },
    {
      icon: require("../../../../assets/menu_ph.png"),
      name: strings.MORESCREEN.PAYMENT,
      route: 'PaymentHistory',
    },
    {
      icon: require("../../../../assets/menu_mw.png"),
      name: "My Wallet",
      route: 'Finance',
    },
    {
      icon: require("../../../../assets/menu_discover.png"),
      name: strings.MORESCREEN.DISCOVER,
      route: 'Discover',
    },
    {
      icon: require("../../../../assets/menu_invitefrnds.png"),
      name: strings.MORESCREEN.TELLAFEIRND,
      route: 'TellAFriend',
    },
    {
      icon: require("../../../../assets/menu_help.png"),
      name: strings.MORESCREEN.HELPTOPICS,
      route: 'HelpTopics',
    },
    {
      icon: require("../../../../assets/menu_dispute.png"),
      name: strings.MORESCREEN.DISPUTES,
      route: 'Disputes',
    },
    {
      icon: require("../../../../assets/menu_lms.png"),
      name: strings.MORESCREEN.SERVICES,
      route: 'Initial_listing_Page',
    },
    {
      icon: require("../../../../assets/menu_los.png"),
      name: strings.MORESCREEN.LISTALLSERVICES,
      route: 'ListAllServices',
    },

    {
      icon: require("../../../../assets/menu_noti.png"),
      name: strings.MORESCREEN.NOTIFICATIONS,
      route: 'Notifications',
    },
    {
      icon: require("../../../../assets/menu_noti.png"),
      name: "Notification Preferences",
      route: 'NotificationPreferences',
    },
    {
      icon: require("../../../../assets/menu_mr.png"),
      name: strings.MORESCREEN.REVIEWS,
      route: 'MyReview',
    },
    {
      icon: require("../../../../assets/menu_mw.png"),
      name: strings.MORESCREEN.BANKACCOUNT,
      route: p_data ? 'PaymentMethodView' : 'PaymentMethod',
    },
    {
      icon: require("../../../../assets/menu_settings.png"),
      name: strings.MORESCREEN.SETTINGS,
      route: 'Settings',
    },
    {
      icon: require("../../../../assets/menu_logout.png"),
      name: strings.MORESCREEN.LOGOUT,
      route: 'logOut',
    },
  ];
  const logout = async () => {
    try {
      setLoader(true)
      let a = {
        user_id: userId
      }
      const dataa = await axiosInstance.post("logout", a)
      // console.log(dataa.data)
      if (dataa) {
        await AsyncStorage.removeItem('token')
        await AsyncStorage.removeItem('slug')
        await AsyncStorage.removeItem('@profiledata')
        await AsyncStorage.removeItem('email')
        await AsyncStorage.removeItem('password')
        await AsyncStorage.removeItem('normal_login_details')
        await AsyncStorage.removeItem('google_login_details')
        await AsyncStorage.removeItem('facebook_login_details')
        await AsyncStorage.removeItem("last_login_from")
        await AsyncStorage.setItem('application', "logout");
        await AsyncStorage.removeItem('fcmtoken')
        await AsyncStorage.removeItem('filterData')
        await messaging().deleteToken();
        LoginManager.logOut(),
          setId(""),
          setCategory_id(""),
          setCategory_image(""),
          setSubcategory_id(""),
          setTitle(""),
          setDescription(""),
          setType("O"),
          setTime(""),
          setDate(""),
          setBudget_type("T"),
          setBudget(""),
          setHourly_rate(""),
          setNumber_of_hour(""),
          setLocation(""),
          setLat(""),
          setLng(""),
          setImage([]),
          setMust_Have([]),
          setDate_type("B"),
          setImageFinalArray([]),
          setY2(),
          setD2(),
          setM2(),
          setTaskDetails(),
          setTaskData([]),
          setMyTaskData([]),
          setMytaskValue(""),
          setAllVerified(false),
          setAllMsg([]),
          setUnreadMsg([]),
          setselectedTaskType("A"),
          setStartLoader_myTask("0"),
          setStartLoader_BrowserTask("0"),
          setProfileData(null),
          setTierData(""),
          setUserData(""),
          setAllData(""),
          setNext_TierData(""),
          setTierDetails(""),
          setAllCategory([]),
          setAllSubcategory([]),
          setListingCategory([]),
          setListing_Page("")
        setPhone_Code('65')
        setSignupPhoneNumer_details({
          "created_at": null,
          "flag": "sg.png",
          "id": 196,
          "international_prefix": 0,
          "max_no_of_digitis": 8,
          "min_no_of_digits": 8,
          "name": "Singapore",
          "national_prefix": 0,
          "phonecode": 65,
          "sortname": "SG",
          "updated_at": null,
          "utc_dst": "+1"
        })
        get_Category()


        setIsBrowseTaskLoad(false)
        setIsMyTaskLoad(false)
        setBrowserLocation("")
        setBrowserLat("")
        setBrowserLng("")

        setBrowsertype("")
        setDistance(20)
        setPrevDistance(20)
        setIsAvaliable(false)
        setTaskOrMap(true)


        setAllNewMyTask({
          as_a_eazypayer: {
            "active_task": [],
            "complete_task": [],
            "offers_or_questions": []
          },
          as_a_client: {
            "booked": [],
            "completed": [],
            "post_task": []
          }
        })




        Toast.show(strings.LOGINSCREEN.LOGOUT)
        logoutOnpress()
        setLoader(false)
        logoutHandle()
      }
    } catch (error) {
      setLoader(false)
      console.log("logoutFunc", error)
    }
  }

  const get_Category = async () => {
    try {
      const data = await axiosInstance.post('get-category');
      // console.log(data.data.result)

      if (data.data.result) {
        let categoryData = [];
        (data.data.result.get_category).map(item => {
          categoryData.push({ name: item.name, isSelected: false, id: item.id });
        });

        // console.log(categoryData)

        setChoose_Categories(categoryData);
        setFilter_Categories(categoryData);
        setcatagory(categoryData);
      }
    } catch (error) {
      console.log("get_Category_more", error);
    }
  };



  const logoutButton = async () => {
    logoutOnpress()
  }
  const cancelOnpress = () => {
    logoutOnpress()
  }
  const verifyData = async () => {
    try {
      if (listing_Page < 1) {
        check_listing()
      }


      const data = await axios.post(`${axiosUrl.URL}public-profile`, {
        "jsonrpc": "2.0",
        "params": {
          "slug": `${slugName}`
        }
      })
      if (data.data.result.user) {
        const res = data.data.result.user
        let ph = data.data.result.user.is_phone_verified
        let email = data.data.result.user.is_email_verified
        storeProfileData(data.data.result.user)
        setSignup_from(res.signup_from)

        if (ph == "N" || email == "N") {
          setPh_email_verify(false)
        } else {
          setPh_email_verify(true)
        }

        if (res.phone !== null && res.email !== null) {
          if (res.is_phone_verified != "N") {
            language == "en" ? setPhone_numbe({ isActive: true, activeTitle: res.phone }) : setPhone_numbe({ isActive: true, activeTitle: engToPersian(res.phone) })
          } else {
            language == "en" ? setPhone_numbe({ isActive: false, activeTitle: res.phone }) : setPhone_numbe({ isActive: false, activeTitle: engToPersian(res.phone) })
          }
          if (res.is_email_verified != "N") {
            setEmail_Address({ isActive: true, activeTitle: res.email })
          } else {
            setEmail_Address({ isActive: false, activeTitle: res.email })
          }
        } else {
          if (res.phone !== null) {
            if (res.is_phone_verified != "N") {
              language == "en" ?
                setPhone_numbe({ isActive: true, activeTitle: res.phone })
                :
                setPhone_numbe({ isActive: true, activeTitle: engToPersian(res.phone) })
            } else {
              language == "en" ?
                setPhone_numbe({ isActive: false, activeTitle: res.phone })
                :
                setPhone_numbe({ isActive: false, activeTitle: engToPersian(res.phone) })
            }
          } else {
            setPhone_numbe({ isActive: false, activeTitle: "" })
          }
          if (res.is_email_verified != "N") {
            setEmail_Address({ isActive: true, activeTitle: res.email })
          } else {
            setEmail_Address({ isActive: false, activeTitle: res.email })
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  const storeProfileData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@profiledata', jsonValue)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    verifyData()
    const willFocusSubscription = navigation.addListener('focus', () => {
      verifyData()
    });
    return willFocusSubscription;
  }, []);
  const onpressListMyService = (item) => {
    if (listing_Page == "" || listing_Page == 0) {
      navigation.navigate(item.route, { isSlug: "" })
    } else {
      navigation.navigate("My_Listing_page")
    }
  }
  const check_listing = async () => {
    try {
      setLlistingLoader(true)
      const res = {
        "params": {
          "page": 1
        }
      }
      const data = await axiosInstance.post("my-listing", res)
      // console.log(data.data)
      if (data.data.result) {
        setListing_Page(data.data.result.my_listing_page_count)
        setLlistingLoader(false)
      }
    } catch (error) {
      setLlistingLoader(false)
      console.log(error)
    }
  }
  useEffect(async () => {
    await check_listing()
  }, [token]);
  const lms_Clean_Context = () => {
    setLMS_id("")
    setLMS_category_id("")
    setLMS_subcategory_id("")
    setLMS_title("")
    setLMS_search_tag([])
    setLMS_description("")

    setLMS_package_price_1("")
    setLMS_package_id_1("")
    setLMS_package_name_1("")
    setLMS_package_description_1("")

    setLMS_package_price_2("")
    setLMS_package_id_2("")
    setLMS_package_name_2("")
    setLMS_package_description_2("")

    setLMS_package_price_3("")
    setLMS_package_id_3("")
    setLMS_package_name_3("")
    setLMS_package_description_3("")

    setLMS_package_price_4("")
    setLMS_package_id_4("")
    setLMS_package_name_4("")
    setLMS_package_description_4("")

    setLMS_package_price_5("")
    setLMS_package_id_5("")
    setLMS_package_name_5("")
    setLMS_package_description_5("")


    setLMS_type("P")
    setLMS_location("")
    setLMS_distance(40)

    setLMS_lat("")
    setLMS_lng("")
    setLMS_avalibility("")
    setLMS_message("")

    setLMS_Multi_Images([])
    setLMS_single_Images("")
    setLMS_prev_Multi_Images([])

    setOpen(false)
    setOpen2(false)
    setOpen3(false)
    setOpen4(false)
    setOpen5(false)
  }
  const bankdetailsData = async () => {
    try {
      let slug = await AsyncStorage.getItem("slug");
      setSlugName(slug)
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
    bankdetailsData()
    return () => {
      bankdetailsData()
    }
  }, []);
  const Title_View = (items, index) => {
    return (
      < TouchableOpacity
        onPress={() => {
          if (items.route == "logOut") {
            logoutButton()
          } else if (items.route == "Initial_listing_Page") {
            listingLoader ?
              Toast.show(strings.ERROR.ACCOUNTVERIFYING)
              :
              onpressListMyService(items)
          } else {
            navigation.navigate(items.route)
          }
        }}

        key={index}
        style={[styles.cardContainer]}>

        <View style={
          language == 'en' ?
            styles.rowView : styles.rowView2
        }>
          <View style={{ flexDirection: "row" }}>

            <Image source={items.icon} style={{ marginRight: 10, height: 15, width: 15, resizeMode: "contain", alignSelf: 'center' }} />

            <Text
              style={[
                globalstyles.plantext_roboto_medium,

                {
                  color: items.route == "BasicInfo" ? Colors.primary : Colors.greyText, fontFamily: 'Outfit-Medium',
                }]}>
              {items.name}
            </Text>
          </View>




          {
            items.name == 'Settings' ?
              <View style={{ height: Normalize(10), width: Normalize(10) }}>
                <Image source={require("../../../../assets/arrow_gray.png")} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
              </View>
              : items.name == "تنظیمات" ?
                <View style={{ height: Normalize(10), width: Normalize(10) }}>
                  <Image source={require("../../../../assets/arrow_gray.png")} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                </View>
                : null
          }

          {
            items.name == 'Logout' ?
              <View style={{ height: Normalize(15), width: Normalize(15) }}>
                <Image source={require("../../../../assets/logoutwhite.png")} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
              </View>
              : items.name == "تنظیمات" ?
                <View style={{ height: Normalize(10), width: Normalize(10) }}>
                  <Image source={require("../../../../assets/logoutwhite.png")} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                </View>
                : null
          }
          {
            items.name == 'Help Topics' ?
              <View style={{ height: Normalize(10), width: Normalize(10) }}>
                <Image source={require("../../../../assets/arrow_gray.png")} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
              </View>
              : items.name == "راهنما" ?
                <View style={{ height: Normalize(10), width: Normalize(10) }}>
                  <Image source={require("../../../../assets/arrow_gray.png")} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                </View>
                : null
          }
          {
            items.name == 'Discover' ?
              <View style={{ height: Normalize(10), width: Normalize(10) }}>
                <Image source={require("../../../../assets/arrow_gray.png")} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
              </View>
              : items.name == "بیشتر بدانید" ?
                <View style={{ height: Normalize(10), width: Normalize(10) }}>
                  <Image source={require("../../../../assets/arrow_gray.png")} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                </View>
                : null
          }
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <>
      {loader ?
        <LoaderPage />
        :
        <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>
          <View style={styles.container}>
            {/* <Header name={strings.MORESCREEN.HEADERTEXT} />
            <CurveDesing_Component   > */}
            <View style={{ width: '100%', height: Normalize(120), backgroundColor: Colors.primary }}>
              <View style={{
                marginTop: Normalize(10),
                height: '20%',
                marginHorizontal: Normalize(16),
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row"
              }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.openDrawer()
                  }}
                  style={{ height: "100%", width: "6.5%", justifyContent: "center", alignItems: "center" }} >
                  <Ionicons name="menu" color={Colors.white} size={Normalize(25)} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Notifications")
                  }}
                  style={{ height: "100%", width: "6.5%", justifyContent: "center", alignItems: "center" }} >
                  <Image source={images.notification_bell} style={{ height: '100%', width: '100%', resizeMode: "contain" }} />
                </TouchableOpacity>
              </View>
              <View style={{
                width: '100%',
                height: '100%',
                justifyContent: "center",
                flexDirection: 'row'
              }}>
                <View style={{ height: "40%", width: "25%", marginLeft: 20, }}>
                  <Image source={prof_pic ? { uri: `${ImageLink.ProfilePhoto}${prof_pic}` } : { uri: ImageLink.BlankProfileImage }
                  } style={{
                    height: Normalize(60), width: Normalize(60), borderRadius: Normalize(30),
                    resizeMode: "cover",
                  }} />
                  <View style={{
                    height: 18, width: 18, borderRadius: 9, alignSelf: 'flex-end',
                    backgroundColor: Colors.green, marginTop: Normalize(-15),
                    marginRight: Normalize(20), borderWidth: 2.5, borderColor: Colors.white
                  }} />
                </View>
                <View style={{
                  width: '65%',
                  height: '40%',
                  justifyContent: "center",
                  flexDirection: 'column',
                  marginTop: Normalize(10)
                }}>
                  <Text style={[globalstyles.plantext_roboto_medium,
                  { color: Colors.white, fontSize: Normalize(14) }]}>
                    {userName != "" ? userName : "Hello Tasker!"}
                  </Text>
                  <Text style={[globalstyles.plantext_outfit_regular,
                  { color: Colors.white, fontSize: Normalize(12), marginTop: Normalize(5) }]}>
                    Wallet balance $ {moreBalance == "" ? 0 : numberWithCommas(moreBalance)}
                  </Text>
                </View>
              </View>



            </View>
            <View style={globalstyles.container_only_padding} >
              <ScrollView
                contentContainerStyle={{ paddingBottom: Normalize(20) }}
                showsVerticalScrollIndicator={false}
              >
                <Text
                  style={[
                    globalstyles.plantext_roboto_medium,

                    {
                      color: Colors.greyText, marginTop: Normalize(10), fontFamily: 'Outfit-Medium', fontSize: Normalize(15)
                    }]}>
                  Earn Money
                </Text>
                <View style={{ backgroundColor: Colors.white, marginTop: Normalize(8), marginBottom: 5, elevation: Normalize(3), borderRadius: Normalize(8), width: "90%", alignSelf: "center" }}>
                  {earnmoney.map((items, index) => (
                    Title_View(items, index)
                  ))}
                </View>
                <Text
                  style={[
                    globalstyles.plantext_roboto_medium,

                    {
                      color: Colors.greyText, marginTop: Normalize(10), fontFamily: 'Outfit-Medium', fontSize: Normalize(15)
                    }]}>
                  General
                </Text>
                <View style={{ backgroundColor: Colors.white, marginTop: Normalize(8), marginBottom: 5, elevation: Normalize(3), borderRadius: Normalize(8), width: "90%", alignSelf: "center" }}>
                  {general.map((items, index) => (
                    Title_View(items, index)
                  ))}
                </View>

                {
                  logoutModal &&
                  <WarningPage
                    onPress={logoutOnpress}
                    ispress={logoutModal}
                    warningTitle={language == 'en' ? 'Logout' : 'خروج'}
                    warningSubTitle={language == 'en' ? 'Are you Sure?' : "آیا مطمئن هستید؟"}
                    okOnpress={logout}
                    cancelOnpress={cancelOnpress} />}
                {/* <VerifyModalComponent /> */}
                <View style={{ height: Normalize(50) }} />
              </ScrollView>
            </View>
            {/* </CurveDesing_Component> */}
          </View >
        </SafeAreaView>
      }
    </>
  );
}

// export default More;
export default withRtl(More);
