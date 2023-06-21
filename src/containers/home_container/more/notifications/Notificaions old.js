import React, { useContext, useEffect } from 'react';
import { View, Text, Image, ScrollView, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
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
function Notificaions({ navigation }) {
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
  const { token,
    notifications, setNotifications,
    isNotificationPageLoad, setIsNotificationPageLoad,
    empty, setEmpty,
    total_pageno, setTotal_pageno,
    temp_pageno, setTemp_pageno,
  } = useContext(myContext)
  const [loader, setLoader] = useState(false);
  
  // const [empty, setEmpty] = useState("empty");
  // const [total_pageno, setTotal_pageno] = useState("0")
  // const [temp_pageno, setTemp_pageno] = useState(1)

  const getNotificationData = async () => {
    try {
      setLoader(true)
      const data = {
        "params": {
          "page": 1
        }
      }
      const res = await axiosInstance.post("notifications", data)
      if (res.data.result) {
        setIsNotificationPageLoad(true)
        var a = res.data.result.notifications
        setEmpty(a.length)
        setNotifications(res.data.result.notifications)
        setTotal_pageno(res.data.result.notifications_page_count)
        setLoader(false)
      }
    } catch (error) {
      setLoader(false)
      console.log(error)
    }
  }

  const isGetNotificationDataLoad = () => {
    try {
      if (!isNotificationPageLoad) {
        getNotificationData()
      }
    } catch (error) {
      console.log("isGetNotificationDataLoad", error)
    }
  }

  // console.log("isNotificationPageLoad--", isNotificationPageLoad)

  useEffect(() => {
    isGetNotificationDataLoad()
    return isGetNotificationDataLoad()
  }, [token])

  const messsageCause = (val) => {
    var splitVal = val.split("<a")
    return splitVal[0]
  }
  const taskTitle = (val) => {
    var splitVal = val.split("'>")
    var title = splitVal[1].split("</a>")
    return title[0]
  }
  const noticicationText = (val) => {
    var isSplit = val.search("<a")
    if (isSplit > 0) {
      var splitVal = val.split("<a")
      if (splitVal.length === 3) {
        var a = "";
        var a1 = "";
        var b = "";
        var b1 = "";
        var c = "";

        a = splitVal[1].split("</a>")
        a1 = a[0].split("'>")
        b = splitVal[2].split(">")



        if (b[1] === undefined) {
          a1 = a[0].split(`">`)
          b = splitVal[2].split(">")
          c = b[1].split("</a>")
        } else {
          a1 = a[0].split("'>")
          b = splitVal[2].split(">")
          c = b[1].split("</a")
        }
        return <Text numberOfLines={3} style={styles.offeText}>{splitVal[0]}<Text style={styles.taskTitle} >{a1[1]}</Text>{a[1]}<Text style={styles.taskTitle} >{c[0]}</Text></Text>
      } else {
        return <Text numberOfLines={3} style={styles.offeText}>{messsageCause(val)}<Text style={styles.taskTitle} >{taskTitle(val)}</Text></Text>
      }
    } else {
      return <Text numberOfLines={3} style={styles.offeText}>{val}</Text>
    }
  }
  const navigate_which_page = (type, item) => {
    // console.log(item)
    if (type === "task") {
      navigation.navigate('TaskDetails', { show: item.slug })
    } else if (type === "dispute") {
      navigation.navigate('DisputesDetails', { id: item.id, slug: item.slug })
    } else if (type === "message") {
      navigation.navigate('ChatPage', {
        show: item.slug,
      })
    } else if (type === "withdraw") {
      navigation.navigate('Finance')
    } else if (type === "profile") {
      navigation.navigate("BasicInfo_intro")
    }
  }
  const onpressNextButton = () => {
    var a = temp_pageno
    var b = a + 1
    get_listingData_after_NxtOrPre(b)
    setTemp_pageno(b)
  }
  const onpressPreviousButton = () => {
    var a = temp_pageno
    var b = a - 1
    get_listingData_after_NxtOrPre(b)
    setTemp_pageno(b)
  }
  const get_listingData_after_NxtOrPre = async (val) => {
    try {
      setLoader(true)
      const data = {
        "params": {
          "page": val
        }
      }
      const res = await axiosInstance.post("notifications", data)
      // console.log(res.data.result)
      if (res.data.result) {
        var a = res.data.result.notifications
        setEmpty(a.length)
        setNotifications(res.data.result.notifications)
        setTotal_pageno(res.data.result.notifications_page_count)
        setLoader(false)
      }
    } catch (error) {
      setLoader(false)
      console.log(error)
    }
  }

  return (
    <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>

      <View style={styles.container}>
        <Header isDrawer name={strings.NOTIFICATIONS.HEADER} navigation={navigation} />
        {
          loader || empty == "empty"
            ?
            < LoaderPage />
            :
            empty == 0 ?
              <View style={styles.container} />
              :
                <View style={{ flex: 1 }} >
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: Normalize(10) }}
                  >

                    {/* notification card */}
                    {notifications.map((item, index) => (
                      <View
                        key={index}
                        style={[styles.cardView,{}]}>
                        <View style={styles.imageView}>
                          <View style={{
                            width: Normalize(45),
                            height: Normalize(45),
                            backgroundColor: "#f5f5f5",
                            borderRadius: Normalize(27),
                            overflow: "hidden",
                          }}>
                            <Image
                              source={{ uri: item.get_sender != null ? ImageLink.ProfilePhoto + `${item.get_sender.profile_picture}` : ImageLink.BlankProfileImage }}
                              style={{ height: "100%", width: "100%", resizeMode: "cover" }}
                            />
                          </View>
                        </View>
                        <TouchableOpacity
                          activeOpacity={0.5}
                          // onPress={() => {
                          //   // console.log(item)
                          //   item.type == null ?
                          //     alert("Click on new notifications for show the notification details. because notification api is newly edited.After database clear this alart box will be automatically removed ")
                          //     :
                          //     navigate_which_page(item.type, item)
                          // }}

                          onPress={()=>{Toast.show("Notification page is in progress")}}


                          style={[styles.cardBodyView]}>
                          <View
                            style={[
                              styles.nameSection,
                              language == 'pr'
                                ? { ...RtlStyles.containerRowInverse }
                                : { ...RtlStyles.containerRow },
                            ]}>
                            <Text
                              style={[
                                styles.nameText,
                                language == 'pr'
                                  ? { ...RtlStyles.textInverse }
                                  : { ...RtlStyles.text },
                              ]}>
                              {item.get_sender != null ? nameShorting(item.get_sender.fname + " " + item.get_sender.lname) : strings.MORESCREEN.IRANTASKERADMIN}
                            </Text>
                            <View style={{ flexDirection: rowOrRowreverse(language), alignItems: "center" }} >
                              <View style={{ height: Normalize(9), width: Normalize(9), marginHorizontal: Normalize(5) }} >
                                <Image source={images.clockIcon} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                              </View>
                              <Text
                                style={[
                                  styles.dateText,
                                  language == 'pr'
                                    ? { ...RtlStyles.textInverse }
                                    : { ...RtlStyles.text },
                                ]}>
                                {englishTimeShow(item.created_at)}
                              </Text>
                            </View>
                          </View>
                          <Text numberOfLines={3} style={{ marginTop: Normalize(3) }} >
                            {noticicationText((item.messsage).trim(""))}
                          </Text>


                        </TouchableOpacity>
                      </View>
                    ))}
                  </ScrollView>

                  {
                    total_pageno > 1 &&
                    <View style={{ height: Normalize(30), marginVertical: Normalize(5), width: "90%", alignSelf: "center", flexDirection: rowOrRowreverse(language), justifyContent: "space-between" }} >
                      {
                        1 < temp_pageno ?
                          total_pageno > 1 ?
                            <TouchableOpacity
                              onPressIn={onpressPreviousButton}
                              // onPress={onpressPreviousButton}
                              style={[styles.arrowButton]}>
                              <Image
                                style={styles.imageButton}
                                source={language == "en" ? images.arrowleftblack : images.arrowrightblaack}
                              />
                            </TouchableOpacity>
                            :
                            <View style={[styles.arrowButton]}>
                              <Image
                                style={styles.imageButton}
                                source={language == "en" ? images.arrowleftgrey : images.arrowrightgrey}
                              />
                            </View>
                          :
                          <View style={[styles.arrowButton]}>
                            <Image
                              style={styles.imageButton}
                              source={language == "en" ? images.arrowleftgrey : images.arrowrightgrey}
                            />
                          </View>
                      }
                      <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        //  width: Normalize(35),
                        paddingHorizontal: Normalize(5),
                        backgroundColor: "#f5f5f5",
                        borderRadius: 10,
                        elevation: 0.8
                      }}>
                        <Text style={[styles.h0, { fontSize: Normalize(14) }]} >

                          {
                            language == "en" ?
                              `${temp_pageno}/${total_pageno}`
                              :
                              `${engToPersian(total_pageno)}/${engToPersian(temp_pageno)}`
                          }
                        </Text>
                      </View>
                      {
                        total_pageno == temp_pageno ?
                          <View style={[styles.arrowButton]}>
                            <Image
                              style={styles.imageButton}
                              source={language == "en" ? images.arrowrightgrey : images.arrowleftgrey}
                            />
                          </View> :
                          total_pageno > temp_pageno ?
                            <TouchableOpacity
                              onPressIn={onpressNextButton}
                              // onPress={onpressNextButton}
                              style={[styles.arrowButton]}>
                              <Image
                                style={styles.imageButton}
                                source={language == "en" ? images.arrowrightblaack : images.arrowleftblack}
                              />
                            </TouchableOpacity> :
                            <View style={[styles.arrowButton]}>
                              <Image
                                style={styles.imageButton}
                                source={language == "en" ? images.arrowrightgrey : images.arrowleftgrey}
                              />
                            </View>
                      }
                    </View>
                  }
                </View>
              
        }
      </View>

    </SafeAreaView>
  );
}

export default withRtl(Notificaions);
