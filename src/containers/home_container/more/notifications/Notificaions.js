import React, { useContext, useEffect } from 'react';
import { View, Text, Image, ScrollView, SafeAreaView, TouchableOpacity, Alert, FlatList, Dimensions } from 'react-native';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import Header from './../../../../components/Header';
import styles from './Styles';
import { Colors } from './../../../../constants/colors';
import images from './../../../../constants/images';
import Normalize from './../../../../helpers/Dimens';
import strings from '../../../../constants/lng/LocalizedStrings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import LoaderPage from '../../../../components/LoaderPage';
import { nameShorting } from '../../../../constants/NameShorting';
import { axiosUrl, ImageLink } from '../../../../constants/LinkPage';
import { englishTimeShow, questionPersianTimeShow } from '../../../../constants/DateShow';
import { rowOrRowreverse } from '../../../../constants/RowOrRowreverse';
import { myContext } from '../../../../constants/ContextApi';
import axiosInstance from '../../../../constants/AxiosCallPage';
import Toast from 'react-native-simple-toast';
import { engToPersian } from '../../../../constants/EnglishToPersian';
import CurveDesing_Component from '../../../../constants/CurveDesing_Component';
import { borderWidth } from 'styled-system';
import moment from 'moment';
import NewLoaderPage from '../../../../components/NewLoaderPage';
import { ActivityIndicator } from 'react-native';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
import Pusher from 'pusher-js';
import pusherConfig from '../../../../../pusher.json';
import axios from 'axios';

function Notificaions({ navigation }) {
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
  const { token, setToken, setTaskdetailsData,
    setNewOfferPageMessageArry, setNewOfferPageMessageWithTaskerArry,

    notifications, setNotifications,
    notificationLoader, setNotificationLoader,
    notificationScrollLoader, setNotificationScrollLoader,
    empty, setEmpty,
    total_pageno, setTotal_pageno,
    temp_pageno, setTemp_pageno,
    isNotificationPageLoad, setIsNotificationPageLoad,
    setRecent_notification_count, recent_notification_count,
    userId, socketId, drawerTabNaviData, setDrawerTabNaviData
  } = useContext(myContext)
  const [loader, setLoader] = useState(false);
  const [logoprofile, setlogoprofile] = useState("");
  const getData = async (val) => {
    try {

      const data2 = await axios.post(`${axiosUrl.URL}public-profile`, {
        "jsonrpc": "2.0",
        "params": {
          "slug": await AsyncStorage.getItem("slug")
        }
      })
      if (data2.data.result) {
        // console.log(data2.data.result.user.profile_picture)
        setlogoprofile(data2.data.result.user.profile_picture)
      }

      setIsNotificationPageLoad(true)
      if (val == undefined) { setLoader(true) }
      const data = {
        "params": {
          "page": 1
        }
      }
      const res = await axiosInstance.post("notifications", data)
      // console.log(res.data.result.notifications[0])
      if (res.data.result) {
        var a = res.data.result.notifications
        setEmpty(a.length)
        setNotifications(a)
        setTotal_pageno(res.data.result.notifications_page_count)
        setLoader(false)
      }

    } catch (error) {
      setLoader(false)
      console.log("getData_notify", error)
    }
  }
  const isGetDataLoad = () => {
    if (!isNotificationPageLoad) (
      getData()
    )
  }
  useEffect(() => {
    isGetDataLoad()
    return isGetDataLoad()
  }, [token])
  const notificationCount = () => {
    const pusher = new Pusher(pusherConfig.key, pusherConfig);
    var channel = pusher.subscribe("eazypay-development");
    channel.bind('send-notification-count', function (data) {
      if (data) {
        if (data.user_id == userId) {
          // setRecent_notification_count(data.notification_count)
          getData("no loader")
          // console.log("notification     pusher>>>", userId, " ", data, "amr msg")
        } else {
          // console.log("notification     pusher>>>", userId, " ", data, "loker msg")
        }
      }
    })
  }
  useEffect(() => {
    notificationCount()
  }, [])
  const navigate_which_page = async (type, item) => {
    // console.log(type)
    let slug = await AsyncStorage.getItem("slug");
    if (type == "task") {
      gototaskdetails(item.slug, "")
    } else if (type == "task_offer") {
      gototaskdetails(item.slug, "offer")
    } else if (type == "task_question") {
      gototaskdetails(item.slug, "question")
    } else if (type == "dispute") {
      setNotificationLoader(false)
      navigation.navigate('DisputesDetails', { id: item.id, slug: item.slug })
      // } else if (type == "task_question") {
    } else if (type == "my_profile_page") {
      setNotificationLoader(false)
      navigation.navigate("MyProfile", { PublicSlug: slug })
    } else if (type == "document") {
      setNotificationLoader(false)
      navigation.navigate("NewDocumentUploadPageWithSelfi")
    } else if (type == "message") {
      setNotificationLoader(false)
      navigation.navigate('ChatPage', {
        show: item.slug,
      })
    } else if (type == "withdraw") {
      setNotificationLoader(false)
      navigation.navigate('Finance')
    } else if (type == "profile") {
      setNotificationLoader(false)
      navigation.navigate("BasicInfo_intro")
    } else if (type == "notification_preference") {
      setNotificationLoader(false)
      navigation.navigate("NotificationPreferences")
    }
    isReadBackGroundChage(item)
  }
  const onpressNextButton = () => {
    var a = temp_pageno
    var b = a + 1
    get_listingData_after_NxtOrPre(b)
    setTemp_pageno(b)
  }
  const get_listingData_after_NxtOrPre = async (val) => {
    try {
      setNotificationScrollLoader(true)
      const data = {
        "params": {
          "page": val
        }
      }
      // console.log(data)
      const res = await axiosInstance.post("notifications", data)

      if (res.data.result) {
        let a = res.data.result.notifications
        let newNotification = notifications
        let allNofitications = [...newNotification, ...a]
        setNotifications(allNofitications)
        setEmpty(a.length)
        setTotal_pageno(res.data.result.notifications_page_count)
        setNotificationScrollLoader(false)
      }
    } catch (error) {
      setNotificationScrollLoader(false)
      console.log("get_listingData_after_NxtOrPre", error)
    }
  }
  const gototaskdetails = async (val, tab) => {
    try {
      const res = {
        "jsonrpc": "2.0",
        "params": {
          "slug": val
        }
      }
      const data = await axiosInstance.post("get-task-details", res)
      // console.log(val,data.data)
      if (data.data.result) {

       let a = data.data.result;
        let oldTaskdata = data.data.result.task;

        oldTaskdata.lowest_offers = a.lowest_offers;
        oldTaskdata.highest_offers = a.highest_offers;
        oldTaskdata.nearbyfixeroffer = a.nearbyfixeroffer;
        oldTaskdata.recommended_fixer_sort_based_on_rating = a.recommended_fixer_sort_based_on_rating

        // console.log(oldTaskdata)
        
        
        
        setTaskdetailsData(oldTaskdata)
        setNewOfferPageMessageArry([])
        setNewOfferPageMessageWithTaskerArry([])
        setNotificationLoader(false)
        navigation.navigate('TaskDetails', { show: oldTaskdata, tab: tab })
      } else {
        setNotificationLoader(false)
        Toast.show(data.data.error.meaning)
      }
    } catch (error) {
      setNotificationLoader(false)
      console.log("getData_taskdetails---------- notification ", error)
    }
  }
  const calculateTime = (val) => {
    try {
      // let now = moment(new Date()).utc().utcOffset("+08:00").format("YYYY-MM-DD HH:mm:ss"); //todays date
      // let tempEnd =moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
      // let end = moment(tempEnd).utc().utcOffset("+08:00").format("YYYY-MM-DD HH:mm:ss") // another date
      let now = moment(new Date()); //todays date
      let tempEnd = new Date(val)
      let end = moment(tempEnd); // another date
      let duration = moment.duration(now.diff(end));
      let minutes = duration.asMinutes();
      let hours = duration.asHours();
      let days = duration.asDays();
      let weeks = duration.asWeeks();
      let months = duration.asMonths();

      if (days == 0 || days < 0) {
        return "today"
      } else {
        if (days > 0 && days < 1) {
          return "yesterday"
        } else {
          if (days < 7) {
            return `${parseInt(days) + 1}d`
          } else {
            if (weeks < 4) {
              return `${parseInt(weeks)}w`
            } else {
              if (months < 0) {
                return `${parseInt(months)}m`
              } else {
                return englishTimeShow(val)
              }
            }
          }
        }
      }
    } catch (error) {
      console.log("calculateTime", error)
    }
  }
  const notificationRead = async (item) => {
    try {
      if (item.is_read == 1) {
        setNotificationLoader(true)
        navigate_which_page(item.type, item)
      } else {
        setNotificationLoader(true)
        let data = {
          "params": {
            "notification_table_id": item.id
          }
        }
        const res = await axiosInstance.post("read-notifications", data)
        // console.log(res.data)
        if (res.data.result) {
          setRecent_notification_count(recent_notification_count - 1)

          setDrawerTabNaviData({
            "be_a_fixer_approval": drawerTabNaviData.be_a_fixer_approval,
            "listing_count": drawerTabNaviData.listing_count,
            "notification_count": drawerTabNaviData.notification_count - 1,
            "profile_image": drawerTabNaviData.profile_image,
            "slug": drawerTabNaviData.slug,
            "status": drawerTabNaviData.status,
            "user_id": drawerTabNaviData.user_id,
            "user_name": drawerTabNaviData.user_name,
            "wallet_balance": drawerTabNaviData.wallet_balance
          })


          navigate_which_page(item.type, item)
        }
      }
    } catch (error) {
      setNotificationLoader(false)
      console.log("notificationRead", error)
    }
  }
  function handleInfinityScroll(event) {
    let mHeight = event.nativeEvent.layoutMeasurement.height;
    let cSize = event.nativeEvent.contentSize.height;
    let Y = event.nativeEvent.contentOffset.y;

    // console.log('mHeight--------------', mHeight);
    // console.log('cSize--------------', cSize);
    // console.log('Y--------------', Y);

    if (Math.ceil(mHeight + Y) >= cSize) {
      return true;
    } else {
      return false;
    }
  };
  const isReadBackGroundChage = (val) => {
    try {
      let oldNotification = notifications;
      let newNotificaions = [];
      oldNotification.map((item) => {
        if (val.id == item.id) {
          // console.log("in loop", item.is_read)
          item.is_read = 1
          newNotificaions.push(item)
        } else {
          newNotificaions.push(item)
        }
      })
      setNotifications(newNotificaions)
    } catch (error) {
      console.log("isReadBackGroundChage", error)
    }
  }

  // console.log("----------------------------------------------------------")


  const markAsAllRead = async () => {
    try {
      let data = {
        "params": {
          "socket_id": socketId
        }
      }

      let res = await axiosInstance.post("/mark-as-all-read-notifications", data)
      // console.log(res.data.result.show_info)
      if (res.data.result) {
        setDrawerTabNaviData(res.data.result.show_info)
        // getData("no loader")
      }
    } catch (error) {
      console.log("markAsAllRead", error)
    }
  }
  return (
    <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>
      <View style={styles.container}>
        <Header
          isDrawer
          name={strings.NOTIFICATIONS.HEADER}
          navigation={navigation} />
        {
          loader || empty == null
            ?
            < LoaderPage />
            :
            empty == 0 ?
              <View style={styles.container} />
              :
              <View style={{ flex: 1 }} >
                <View style={{ flex: 1 }} >
                  {/* notification card */}

                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={notifications}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                      return (
                        <View
                          style={{
                            width: "100%",
                            // paddingHorizontal: Normalize(10),
                            backgroundColor: item.is_read == 1 ? Colors.white : Colors.primaryBackground,
                            borderBottomColor: Colors.boxBorder,
                            borderBottomWidth: Normalize(1)
                          }}>
                          <View style={{
                            width: "92%",
                            paddingBottom: Normalize(10),
                            alignSelf: "center",
                          }}>
                            <View style={{ flexDirection: rowOrRowreverse(language), alignItems: "center", justifyContent: "flex-end", marginTop: Normalize(6) }} >
                              <Text
                                style={[
                                  styles.dateText,]}>
                                {calculateTime(item.created_at)}
                              </Text>
                            </View>
                            <View style={{ flexDirection: 'row' }} >
                              <View style={styles.imageView}>
                                <View style={{
                                  width: Normalize(47),
                                  height: Normalize(47),
                                  backgroundColor: Colors.primary,
                                  borderRadius: Normalize(47) / 2,
                                  justifyContent: "center", alignItems: "center",
                                  overflow: "hidden",
                                }}>

                                  {/* item.get_sender != null ? ImageLink.ProfilePhoto + `${item.get_sender.profile_picture}` : ImageLink.BlankProfileImage }} */}

                                  {
                                    item.get_sender != null && item.get_sender.profile_picture ?
                                      <Image
                                        // source={{ uri: item.get_sender != null ? ImageLink.ProfilePhoto + `${item.get_sender.profile_picture}` : `${logoprofile}` }}
                                        source={{ uri: item.get_sender != null ? ImageLink.ProfilePhoto + `${item.get_sender.profile_picture}` : "672375197-1055.jpg" }}
                                        // source={images.logo}
                                        style={{ height: "100%", width: "100%", resizeMode: "cover" }}
                                      />
                                      :
                                      <Image
                                        source={{ uri: ImageLink.ProfilePhoto + `${logoprofile}` }}
                                        // source={{uri:ImageLink.ProfilePhoto + "672375197-1055.jpg"}}
                                        style={{ height: "100%", width: "100%", resizeMode: "cover" }}
                                      />
                                  }
                                </View>
                              </View>
                              <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={() => {
                                  // console.log(item)
                                  notificationRead(item)
                                }}
                                style={[styles.cardBodyView]}>
                                <View
                                  style={[
                                    styles.nameSection]}>
                                  <Text
                                    numberOfLines={1}
                                    style={{
                                      fontSize: Normalize(13),
                                      fontFamily: 'Lato-Bold',
                                      color: Colors.greyText,
                                      width: "80%"
                                    }}>
                                    {/* {item.get_sender != null ? nameShorting(item.get_sender.fname + " " + item.get_sender.lname) : strings.MORESCREEN.IRANTASKERADMIN} */}
                                    {item.get_sender != null ? item.title : strings.MORESCREEN.IRANTASKERADMIN}
                                  </Text>
                                </View>

                                <View style={{ flex: 1, flexDirection: "row", }} >
                                  <View style={{ flex: 4 }} >
                                    <Text numberOfLines={3} style={[styles.offeText, { marginTop: Normalize(3) }]}>{item.notification_description}</Text>
                                  </View>
                                  {item.image != null && <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                                    <View style={{ height: Normalize(30), width: Normalize(30), borderRadius: Normalize(30) / 2, backgroundColor: Colors.primary, justifyContent: "center", alignItems: "center" }} >
                                      <Image source={{ uri: item.image }} style={{ height: "55%", width: "55%", resizeMode: "contain" }} />
                                    </View>
                                  </View>}
                                </View>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      )
                    }}

                    onScrollEndDrag={(event) => {
                      if (handleInfinityScroll(event)) {
                        if (total_pageno == temp_pageno) {
                          // console.log("stop1")
                        } else {
                          if (total_pageno > temp_pageno) {
                            onpressNextButton()
                          } else {
                            // console.log("stop2")
                          }
                        }
                        // Toast.show("END");
                      }
                    }}
                    ListHeaderComponent={() => {
                      return (
                        drawerTabNaviData.notification_count > 0 &&
                        <TouchableOpacity
                          onPress={markAsAllRead}
                          activeOpacity={0.7} style={{ height: Normalize(30), width: Normalize(300), backgroundColor: Colors.primary, alignSelf: "center", marginVertical: Normalize(5), borderRadius: Normalize(5), justifyContent: "center", alignItems: "center", elevation: 2 }} >
                          <Text style={[globalstyles.plantext_bold, { color: Colors.white, fontSize: Normalize(14) }]} >Mark as all read</Text>
                        </TouchableOpacity>
                      )
                    }}
                    ListFooterComponent={() => {
                      return (
                        <View style={{ height: total_pageno == temp_pageno ? Normalize(100) : Normalize(70), justifyContent: "flex-start", alignItems: "center" }} >
                          {total_pageno == temp_pageno &&
                            <View style={{ flexDirection: "row", alignItems: "center", paddingTop: Normalize(20) }}>
                              <View style={{ height: 1, width: "40%", backgroundColor: Colors.boxBorder }} ></View>
                              <Text style={[globalstyles.plantext_regular, { paddingHorizontal: Normalize(5), color: Colors.boxBorder }]} >End</Text>
                              <View style={{ height: 1, width: "40%", backgroundColor: Colors.boxBorder }} ></View>
                            </View>
                          }
                        </View>
                      )
                    }}
                  />

                  {notificationScrollLoader &&
                    <View style={{
                      height: "100%",
                      width: Normalize(30),
                      borderRadius: Normalize(30) / 2,
                      position: "absolute",
                      bottom: Normalize(70), left: (Dimensions.get("window").width / 2) - Normalize(15), justifyContent: "center", alignItems: "center"
                    }}>
                      <ActivityIndicator size={"large"} color={Colors.primary} />
                    </View>
                  }


                </View>
                {
                  notificationLoader && <NewLoaderPage />
                }
              </View>
        }
      </View>

    </SafeAreaView>
  );
}

export default withRtl(Notificaions);
