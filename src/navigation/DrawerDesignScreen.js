import React, { useContext, useEffect, useState } from 'react'
import { View, Image, Text, } from 'react-native'
import Normalize from '../helpers/Dimens';
import { Colors } from '../constants/colors';
import globalstyles from '../constants/globalStyles/Global_Styles';
import { useNavigation, DrawerActions, CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { myContext } from '../constants/ContextApi';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Pressable } from 'react-native';
import { ScrollView } from 'react-native';
import strings from '../constants/lng/LocalizedStrings';
import { fontfmliy } from '../components/WhichFontFamily';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import WarningPage from '../components/WarningPage';
import axiosInstance from '../constants/AxiosCallPage';
import messaging from '@react-native-firebase/messaging';
import { LoginManager } from 'react-native-fbsdk';
import NewLoaderPage from '../components/NewLoaderPage';
import { axiosUrl, ImageLink } from '../constants/LinkPage';

export default function DrawerDesignScreen() {
    const { setUserLoginDetails,
        slugName, userName,
        token, setProfileData,
        setSignup_from,
        userId,
        setPh_email_verify,
        setSlugName,
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
        setTaskDataForMap,
        setMyTaskData,
        setMytaskValue,
        setAllVerified,
        setAllMsg,
        setUnreadMsg,
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
        setPhone_Code, setSignupPhoneNumer_details,
        setFilter_Categories, setcatagory,
        setIsBrowseTaskLoad, setAllNewMyTask, setIsMyTaskLoad,
        setBrowserLocation,
        setBrowserLat,
        setBrowserLng,
        setBrowsertype,
        setDistance,
        setPrevDistance,
        setIsAvaliable, setTaskOrMap,
        setAlllanguage,
        setAllSkill,
        setUser_Certificate,
        setGetAround,
        setIs_notification_pref_updated,

        setIsNotifyPrefLoad,
        setTaskdetailsData,
        setNewOfferPageMessageArry,
        setNewOfferPageMessageWithTaskerArry,
        setNotifications,
        setNotificationLoader,
        setNotificationScrollLoader,
        setEmpty,
        setTotal_pageno,
        setTemp_pageno,
        setIsNotificationPageLoad,
        setWhichSection,
        setWhichSection2,
        setIsDefaultMytask_asposter,
        setIsDefaultMytask_astasker,
        recent_notification_count,
        setRecent_notification_count,
        setDocument_selection,
        setFront_uri,
        setBack_uri,
        setFront_details,
        setBack_details,
        setFront_details_prev,
        setBack_details_prev,
        setCountry_id,
        setCountry_value,
        setNationality_id,
        setNationality_value,
        setEditProfileaddress,
        prev_phone, setPrev_Phone,
        prev_phoneCode, setPrev_phoneCode,
        drawerTabNaviData,
        setDrawerTabNaviData,
        setBeAFixerAbout_me,
        setStorageData,
        setBeAFixerSelectProfilegallary,
        setBeAFixerProfile_picture,

        setListAllServicesData,
        setIsListAllServicesload,
        setListing_Categories
    } = useContext(myContext)

    const navigation = useNavigation();
    const [logoutModal, setLogoutModal] = useState(false)
    const [loader, setLoader] = useState(false)
    const [p_data, setP_data] = useState(false)

    const logoutOnpress = () => {
        setLogoutModal(!logoutModal)
    }
    const logoutHandle = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [{ name: "IntroVideoScreen" }]
            }));
    }
    const getUserDetails = async () => {
        try {
            let userLoginDetailsJson = await AsyncStorage.getItem('userLoginDetails')
            if (userLoginDetailsJson != null) {
                setUserLoginDetails(JSON.parse(userLoginDetailsJson))
            }
        } catch (e) {
            console.log("getUserDetails...", e)
        }
    }
    useEffect(() => {
        getUserDetails()
    }, [])

    const earnmoney = [
        {
            icon: require("../../assets/menu_beaf.png"),
            name: 'Be a Fixer',
            route: 'BasicInfo_intro',
            rightArrow: false,
            isbudget: false,
            isnumber: false,
            isButtonVissible: true
        },
        {
            icon: require("../../assets/menu_dash.png"),
            name: strings.MORESCREEN.DASHBOARD,
            route: 'Dashboard',
            rightArrow: false,
            isbudget: false,
            isnumber: false,
            // isButtonVissible: drawerTabNaviData.be_a_fixer_approval=="accepted"?false: true
            isButtonVissible: true
        },
    ];
    const general = [
        {
            icon: require("../../assets/menu_prof.png"),
            name: strings.MORESCREEN.EDITPROFILE,
            route: 'MyProfile',
            rightArrow: false,
            isbudget: false,
            isnumber: false,
            isButtonVissible: true
        },
        {
            icon: require("../../assets/menu_ph.png"),
            name: strings.MORESCREEN.PAYMENT,
            route: 'PaymentHistory',
            rightArrow: false,
            isbudget: false,
            isnumber: false,
            isButtonVissible: true
        },
        {
            icon: require("../../assets/menu_mw.png"),
            name: "My Wallet",
            route: 'Finance',
            rightArrow: false,
            isbudget: true,
            isnumber: false,
            isButtonVissible: true
        },
        {
            icon: require("../../assets/menu_discover.png"),
            name: strings.MORESCREEN.DISCOVER,
            route: 'Discover',
            rightArrow: true,
            isbudget: false,
            isnumber: false,
            isButtonVissible: true
        },
        {
            icon: require("../../assets/menu_invitefrnds.png"),
            name: strings.MORESCREEN.TELLAFEIRND,
            route: 'TellAFriend',
            rightArrow: false,
            isbudget: false,
            isnumber: false,
            isButtonVissible: true
        },
        {
            icon: require("../../assets/menu_help.png"),
            name: strings.MORESCREEN.HELPTOPICS,
            route: 'HelpTopics',
            rightArrow: true,
            isbudget: false,
            isnumber: false,
            isButtonVissible: true
        },
        {
            icon: require("../../assets/menu_dispute.png"),
            name: strings.MORESCREEN.DISPUTES,
            route: 'Disputes',
            rightArrow: false,
            isbudget: false,
            isnumber: false,
            isButtonVissible: true
        },
        {
            icon: require("../../assets/menu_lms.png"),
            name: strings.MORESCREEN.SERVICES,
            route: drawerTabNaviData.listing_count > 0 ? 'My_Listing_page' : 'Initial_listing_Page',
            rightArrow: false,
            isbudget: false,
            isnumber: false,
            isButtonVissible: true
        },
        {
            icon: require("../../assets/menu_los.png"),
            name: strings.MORESCREEN.LISTALLSERVICES,
            route: 'ListAllServices',
            rightArrow: false,
            isbudget: false,
            isnumber: false,
            isButtonVissible: true
        },

        {
            icon: require("../../assets/menu_noti.png"),
            name: strings.MORESCREEN.NOTIFICATIONS,
            route: 'Notifications',
            rightArrow: false,
            isbudget: false,
            isnumber: true,
            isButtonVissible: true
        },
        {
            icon: require("../../assets/menu_noti.png"),
            name: "Notification Preferences",
            route: 'NotificationPreferences',
            rightArrow: false,
            isbudget: false,
            isnumber: false,
            isButtonVissible: true
        },
        {
            icon: require("../../assets/menu_mr.png"),
            name: strings.MORESCREEN.REVIEWS,
            route: "MyReview",
            rightArrow: false,
            isbudget: false,
            isnumber: false,
            isButtonVissible: true
        },
        {
            icon: require("../../assets/menu_mw.png"),
            name: strings.MORESCREEN.BANKACCOUNT,
            route: p_data ? 'PaymentMethodView' : 'PaymentMethod',
            rightArrow: false,
            isbudget: false,
            isnumber: false,
            isButtonVissible: true
        },
        {
            icon: require("../../assets/menu_settings.png"),
            name: strings.MORESCREEN.SETTINGS,
            route: 'Settings',
            rightArrow: true,
            isbudget: false,
            isnumber: false,
            isButtonVissible: true
        },
        {
            icon: require("../../assets/menu_logout.png"),
            name: strings.MORESCREEN.LOGOUT,
            route: 'logOut',
            rightArrow: false,
            isbudget: false,
            isnumber: false,
            isButtonVissible: true
        },
    ];
// console.log(drawerTabNaviData.listing_count)
    const titleView = (item, index) => {
        return (
            item.isButtonVissible && <Pressable
                onPress={() => {
                    if (item.route == "logOut") {
                        logoutButton()
                    } else {
                        navigation.navigate(item.route)
                    }
                }}
                key={index} style={{ flexDirection: "row", paddingVertical: Normalize(8), paddingLeft: Normalize(15), paddingRight: Normalize(20), flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} >
                <View style={{ flexDirection: "row" }} >
                    <Image source={item.icon} style={{ marginRight: 10, height: 15, width: 15, resizeMode: "contain", alignSelf: 'center' }} />
                    <Text numberOfLines={1} style={[globalstyles.plantext_bold, { color: Colors.greyText, fontSize: Normalize(12) }]}>{item.name}</Text>
                </View>
                {item.isbudget && <Text style={[globalstyles.plantext_bold, { color: Colors.white, fontSize: Normalize(10), backgroundColor: Colors.secondary, paddingVertical: Normalize(1), paddingHorizontal: Normalize(2), borderRadius: Normalize(4) }]}>$ {drawerTabNaviData.wallet_balance}</Text>}
                {item.isnumber && drawerTabNaviData.notification_count > 0 && <Text style={[globalstyles.plantext_bold, { color: Colors.white, fontSize: Normalize(10), backgroundColor: Colors.red_old, paddingVertical: Normalize(1), paddingHorizontal: Normalize(2), borderRadius: Normalize(5) }]}>{drawerTabNaviData.notification_count > 99 ? "99" : drawerTabNaviData.notification_count}</Text>}
                {item.rightArrow && <Entypo name="chevron-right" color={Colors.greyText} size={Normalize(14)} />}
            </Pressable>
        )
    }
    const logout = async () => {
        try {
            setLoader(true)
            logoutOnpress()
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
                await AsyncStorage.removeItem("entryNotifyModal")
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
                    setTaskDataForMap([]),
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
                setUser_Certificate([])

                get_Category()
                getalllanguage()
                get_TransportList()

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
                setIs_notification_pref_updated(false)

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


                setIsNotifyPrefLoad(false)
                setTaskdetailsData(null)
                setNewOfferPageMessageArry([])
                setNewOfferPageMessageWithTaskerArry([])
                setNotifications([])
                setNotificationLoader(false)
                setNotificationScrollLoader(false)
                setEmpty(null)
                setTotal_pageno("0")
                setTemp_pageno(1)
                setIsNotificationPageLoad(false)
                setWhichSection({
                    tab: "tasker",
                    section: "Posted",
                    active: true
                })
                setWhichSection2({
                    tab: "poster",
                    section: "Completed",
                    active: true
                })
                setIsDefaultMytask_asposter(false)
                setIsDefaultMytask_astasker(false)
                setRecent_notification_count("0")

                setDocument_selection("National Identity Card/Driving Licence")
                setFront_uri("")
                setBack_uri("")
                setFront_details(null)
                setBack_details(null)
                setFront_details_prev(null)
                setBack_details_prev(null)

                setCountry_id('')
                setCountry_value('')
                setNationality_id('')
                setNationality_value('')
                setEditProfileaddress({
                    name: '',
                    lat: '',
                    lng: '',
                })
                setPrev_Phone('')
                setPrev_phoneCode('')
                setBeAFixerAbout_me("")
                setStorageData()
                setBeAFixerSelectProfilegallary()
                setBeAFixerProfile_picture('')
                setListAllServicesData([])
                setIsListAllServicesload(false)
                setDrawerTabNaviData({
                    "be_a_fixer_approval": "pending",
                    "listing_count": 0,
                    "notification_count": 0,
                    "profile_image": null,
                    "slug": "",
                    "status": "W",
                    "user_id": "",
                    "user_name": "",
                    "wallet_balance": 0
                })
                Toast.show(strings.LOGINSCREEN.LOGOUT)
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
                setListing_Categories(categoryData);
                setcatagory(categoryData);
                setAllSkill(categoryData);
            }
        } catch (error) {
            console.log("get_Category_more", error);
        }
    };

    const getalllanguage = async () => {
        const data = await axios.post(`${axiosUrl.URL}get-country-language`);
        if (data.data.countrys && data.data.language) {
            let langFinalData = [];
            data.data.language.map(item => {
                item.isSelected = false;
                langFinalData.push(item);
            });
            setAlllanguage(langFinalData);
        }
    };


    const get_TransportList = async () => {
        try {
            const data = await axiosInstance.post('get-transport-list');
            if (data.data.result) {
                let newtransport = [];
                (data.data.result.tranports).map(item => {
                    item.isSelected = false;
                    newtransport.push(item);
                });
                // console.log(newtransport)
                setGetAround(newtransport)
            }
        } catch (error) {
            console.log(error);
        }
    };






    const logoutButton = async () => {
        logoutOnpress()
    }
    const cancelOnpress = () => {
        logoutOnpress()
    }

    // console.log(drawerTabNaviData.profile_image)

    return (
        <View style={{ height: "100%", width: '100%' }}>
            <View
                style={{
                    flex: 1
                }}>
                <View style={{ flex: 1 }}>
                    {/* cross button */}
                    <View
                        style={{ alignItems: "flex-end", padding: Normalize(3), backgroundColor: "#053c6d" }}>
                        <Pressable onPress={() => navigation.dispatch(DrawerActions.closeDrawer())} >
                            <Entypo name="cross" color={Colors.white} size={Normalize(22)} />
                        </Pressable>
                    </View>
                    {/* name image */}
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: 'center',
                            justifyContent: "flex-start",
                            paddingTop: Normalize(5),
                            paddingBottom: Normalize(15),
                            paddingHorizontal: Normalize(15),
                            backgroundColor: "#053c6d"
                        }} >
                        <View style={{
                            height: Normalize(50),
                            width: Normalize(50),
                            borderRadius: Normalize(50) / 2,
                            borderWidth: 1,
                            borderColor: Colors.secondary,
                            backgroundColor: Colors.white,
                            justifyContent: "center", alignItems: "center",
                            overflow: "hidden"
                        }} >
                            {
                                drawerTabNaviData.profile_image == null ?
                                    <FontAwesome5 name="user-alt" color={Colors.secondary} size={Normalize(20)} />
                                    :
                                    <Image source={{ uri: ImageLink.ProfilePhoto + drawerTabNaviData.profile_image }} style={{ height: "100%", width: "100%" }} />
                            }

                        </View>
                        <Pressable
                            onPress={() => navigation.navigate("MyProfile", { PublicSlug: slugName })}
                            style={{ paddingLeft: Normalize(10) }}>
                            <Text numberOfLines={1} style={[globalstyles.plantext_bold, { color: Colors.white, fontSize: Normalize(16), width: Normalize(125) }]}>{drawerTabNaviData.user_name}</Text>
                            <Text style={[globalstyles.plantext_bold, { color: Colors.secondary, fontSize: Normalize(12) }]}>View Profile</Text>
                        </Pressable>
                    </View>
                    <View style={{ flex: 1, marginTop: Normalize(15), marginBottom: Normalize(20), paddingHorizontal: Normalize(15) }} >
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                        >
                            {/*  Earn Money */}
                            <View style={{}} >
                                <Text
                                    style={{
                                        color: Colors.greyText,
                                        fontFamily: fontfmliy.bold,
                                        fontSize: Normalize(15),
                                    }}>
                                    Earn Money
                                </Text>
                                <View
                                    style={{
                                        width: "98%",
                                        alignSelf: "center",
                                        marginVertical: Normalize(10),
                                        borderRadius: Normalize(8),
                                        elevation: 3,
                                        backgroundColor: Colors.white
                                    }} >
                                    {
                                        earnmoney.map((item, index) => (
                                            titleView(item, index)
                                        ))
                                    }
                                </View>
                            </View>
                            {/* general */}
                            <View style={{}} >
                                <Text
                                    style={{
                                        color: Colors.greyText,
                                        fontFamily: fontfmliy.bold,
                                        fontSize: Normalize(15),
                                    }}>
                                    General
                                </Text>
                                <View
                                    style={{
                                        width: "98%",
                                        alignSelf: "center",
                                        marginVertical: Normalize(10),
                                        borderRadius: Normalize(8),
                                        elevation: 2,
                                        backgroundColor: Colors.white
                                    }} >
                                    {
                                        general.map((item, index) => (
                                            titleView(item, index)
                                        ))
                                    }
                                </View>
                            </View>
                            {
                                logoutModal &&
                                <WarningPage
                                    onPress={logoutOnpress}
                                    ispress={logoutModal}
                                    warningTitle={'Logout'}
                                    warningSubTitle={'Are you Sure?'}
                                    okOnpress={logout}
                                    cancelOnpress={cancelOnpress}
                                    buttonTitle="Continue"
                                    color={Colors.red_old}
                                    TopIcon={() => {
                                        return (
                                            <MaterialCommunityIcons
                                                name="logout"
                                                size={Normalize(30)}
                                                color={Colors.white}
                                            />
                                        )
                                    }}
                                />
                            }
                        </ScrollView>
                    </View>
                    {
                        loader &&
                        <NewLoaderPage full />
                    }
                </View>
            </View>
        </View>
    )
}