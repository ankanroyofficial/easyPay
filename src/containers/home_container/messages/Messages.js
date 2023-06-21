import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, TextInput, SafeAreaView, FlatList } from 'react-native';
import Header from './../../../components/Header';
import styles from './Styles';
import CustomTab from '../../../components/CustomTabforMessage';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import { Colors } from '../../../constants/colors';
import images from '../../../constants/images';
import strings from '../../../constants/lng/LocalizedStrings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import LoaderPage from '../../../components/LoaderPage';
import { persianTimeShow_With_Date, questionEnglishTimeShow } from '../../../constants/DateShow';
import { nameShorting } from '../../../constants/NameShorting';
import { leftOrRight, rowOrRowreverse } from '../../../constants/RowOrRowreverse';
import Pusher from 'pusher-js';
import pusherConfig from './../../../../pusher.json';
import { LogBox } from 'react-native';
import { myContext } from '../../../constants/ContextApi';
import { axiosUrl, ImageLink } from '../../../constants/LinkPage';
import axiosInstance from '../../../constants/AxiosCallPage';
import Loader_Message from '../../../components/loader/Message/Loader_Message';
import CurveDesing_Component from '../../../constants/CurveDesing_Component';
import globalstyles from '../../../constants/globalStyles/Global_Styles';
export default function Messages({ navigation }) {
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
  const { token, setToken,
    socketId, setSocketId,
    allMsg, setAllMsg,
    unreadMsg, setUnreadMsg,
    userSlugName, setUserSlugName,
    userId, setUserId,
    setRecent_notification_count
  } = useContext(myContext);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [activeTab, setActiveTab] = useState('all');
  const [loader, setLoader] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  LogBox.ignoreLogs(['Setting a timer for a long period of time'])
  const handleTabChange = val => {
    setActiveTab(val);
  };
  const msgApiCall = async () => {
    try {
      const data = await axiosInstance.post("messages")
      if (data.data.message) {
        setAllMsg(data.data.message)
        setUnreadMsg(data.data.message_unread)
      }
      setLoader(false)
    } catch (error) {
      console.log(error)
    }
  }
  const getMessages = async () => {
    try {
      if (allMsg.length > 0) {
        null
      } else {
        setLoader(true)
      }
    } catch (error) {
      setLoader(false)
      console.log("getMessages - ", error)
    }
  }
  useEffect(() => {
    getMessages()
    return getMessages()
  }, []);
  const getMessages_noloader = async () => {
    try {
      msgApiCall()
    } catch (error) {
      console.log("getMessages - ", error)
    }
  }
  useEffect(async () => {
    getMessages_noloader()
    const willFocusSubscription = navigation.addListener('focus', () => {
      getMessages_noloader()
    });
    return willFocusSubscription;
  }, []);
  const array_change = () => {
    var a = allMsg
    var b = unreadMsg
    if (activeTab == "all") {
      return a
    } else if (activeTab == "unread") {
      return b
    }
  }
  const numberOfUnread = () => {
    return unreadMsg.length
  }
  const getSocketId = () => {
    const pusher = new Pusher(pusherConfig.key, pusherConfig);
    pusher.connection.bind("connected", () => {
      var socketId = pusher.connection.socket_id;
      setSocketId(socketId)
    });
  }
  const getAllData = () => {
    const pusher = new Pusher(pusherConfig.key, pusherConfig);
    let channel = pusher.subscribe("eazypay-development");
    channel.bind('message-event', function (data) {
      if (data) {
        getMessages_noloader()
      }
    })
  }
  const socketFunc = () => {
    getSocketId()
    getAllData()
  }
  useEffect(() => {
    const a = socketFunc()
    return a
  }, [])
  const userChecking = (val) => {
    if (val.get_poster.id == userId) {
      // console.log(val.get_tasker.profile_picture)
      return val.get_tasker
    } else {
      // console.log(val.get_poster.profile_picture)
      return val.get_poster
    }
  }
  const keyWordSearching = async (val) => {
    try {
      const res = {
        "params": {
          "keyword": val
        }
      }
      const data = await axiosInstance.post("search-message", res)
      if (data) {
        setAllMsg(data.data.message)
      }
    } catch (error) {
      console.log("keyWordSearching", error)
    }
  }
  const messagecard = (item, index) => {
    return (
      <TouchableOpacity style={{
        height: Normalize(80),
        flexDirection: 'row',
        backgroundColor: Colors.white,
        marginBottom: Normalize(7),
        width: "99%",
        borderRadius: Normalize(5),
        elevation: Normalize(2),
        alignSelf: "center"
      }}
        key={index}
        onPress={() => {
          navigation.navigate('ChatPage', { show: item.get_task.slug, master_id: item.get_message_detail_last_message.message_master_id })
        }}
      >
        <View style={{ flexDirection: rowOrRowreverse(language), flex: 1, alignSelf: 'center', marginHorizontal: 10 }}>
          <View style={{ flexDirection: rowOrRowreverse(language), width: '100%', }}>
            <View style={{ height: Normalize(45), width: Normalize(45), backgroundColor: "#f5f5f5", borderRadius: Normalize(45) / 2, overflow: "hidden" }} >
              <Image style={{ width: "100%", height: "100%", resizeMode: "cover" }}
                source={{ uri: userChecking(item).profile_picture != null ? ImageLink.ProfilePhoto + `${userChecking(item).profile_picture}` : ImageLink.BlankProfileImage }}
              />
            </View>
            <View style={{ flexDirection: 'column', marginHorizontal: 15, flex: 1 }}>
              <View style={{ flexDirection: rowOrRowreverse(language), justifyContent: 'space-between' }}>
                <Text
                  numberOfLines={1}
                  style={{
                    color: Colors.primary,
                    marginHorizontal: 2,
                    fontFamily: 'roboto-medium', width: "33%",
                    fontSize: Normalize(13),
                    textAlign: leftOrRight(language),
                    marginRight: language === "en" ? 0 : Normalize(10)
                  }}>
                  {
                    nameShorting(userChecking(item).fname + " " + userChecking(item).lname)
                  }
                </Text>
                <View style={{ flexDirection: rowOrRowreverse(language) }}>
                  <Image style={{ width: Normalize(11), height: Normalize(11), opacity: .6, alignSelf: 'center' }}
                    source={images.clockIcon}
                    resizeMode="contain" />
                  <Text style={{
                    color: "#818181",
                    marginHorizontal: Normalize(3),
                    fontFamily: 'roboto-regular',
                    fontSize: Normalize(10),
                    alignSelf: 'center',
                  }}>{language == "en" ? questionEnglishTimeShow(item.get_message_detail_last_message.created_at) : persianTimeShow_With_Date(item.get_message_detail_last_message.created_at)}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: rowOrRowreverse(language), justifyContent: "space-between" }} >
                <Text numberOfLines={1} style={{
                  color: '#818181', marginLeft: language === "en" ? 0 : 2,
                  fontFamily: 'roboto-regular',
                  lineHeight: Normalize(14),
                  fontSize: Normalize(11),
                  marginTop: 10,
                  marginRight: language === "en" ? 0 : Normalize(5),
                  textAlign: language === "en" ? "left" : "right", width: "70%"
                }}>
                  {item.get_task.title}
                </Text>
                {
                  isTyping && <Text style={{
                    color: '#818181', marginLeft: language === "en" ? 0 : 2, fontFamily: 'roboto-regular', lineHeight: 20,
                    fontSize: 13, marginTop: 10, marginRight: language === "en" ? 0 : Normalize(5), textAlign: language === "en" ? "left" : "right"
                  }}>
                    Typing..........
                  </Text>
                }
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>
      <View style={styles.container}>
        <Header isDrawer navigation={navigation} name={strings.MESSAGE.HEADERTEXT} />
        <CurveDesing_Component   >
          <View style={{ flex: 1 }} >
            <CustomTab onChangeTab={handleTabChange} numberOfUnread={numberOfUnread()} />
            <View style={{ marginHorizontal: Normalize(16), }} >
              <View style={{
                width: '100%',
                height: Normalize(32),
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                marginVertical: Normalize(8),
                flexDirection: rowOrRowreverse(language),
                alignSelf: 'center',
                borderColor: Colors.borderColor,
                borderRadius: Normalize(5),
                borderWidth: Normalize(0.5),
                paddingRight: Normalize(12),
                elevation: 2,
                backgroundColor: Colors.white
              }}>
                <View style={{ flex: 1, alignSelf: 'center' }} >
                  <TextInput
                    editable={loader ? false : true}
                    value={searchKeyword}
                    onChangeText={(e) => {
                      keyWordSearching(e)
                      setSearchKeyword(e)
                    }}
                    keyboardType='default'
                    autoCapitalize="none"
                    placeholder={strings.POSTTASK.SEARCH}
                    placeholderTextColor={Colors.textinput_inner_text}
                    style={globalstyles.textinput_onlyText_Style}
                  />
                </View>
                <View style={{ flexDirection: 'column', alignSelf: 'center' }}>
                  <TouchableOpacity
                    disabled={searchKeyword.length > 0 ? false : true}
                    onPress={() => {
                      setSearchKeyword("")
                      // getMessages()
                      msgApiCall()
                    }}
                  >
                    <Image
                      resizeMode="contain"
                      source={searchKeyword.length > 0 ? images.cross : images.nav5}
                      style={{ width: Normalize(11), height: Normalize(11), opacity: .7 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {
              loader ?
                <Loader_Message />
                :
                allMsg.length == 0 ?
                  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <View style={{ height: Normalize(140), width: Normalize(140) }} >
                      <Image
                        source={images.empty_message}
                        style={{ height: "100%", width: "100%", resizeMode: "contain" }}
                      />
                    </View>
                    <Text style={{ fontSize: Normalize(12), color: Colors.greylightText, textAlign: "center", paddingHorizontal: "3%", paddingTop: Normalize(10), fontFamily: "roboto-medium" }} >{activeTab == "all" ? strings.MESSAGE.EMPTYALLMSG : strings.MESSAGE.EMPTYUNREADMSG}</Text>
                  </View>
                  :
                  <View style={{ marginBottom: Normalize(7), marginHorizontal: Normalize(16) }}>
                    <FlatList
                      data={array_change()}
                      showsVerticalScrollIndicator={false}
                      renderItem={({ item, index }) =>
                        <>
                          {messagecard(item, index)}
                          {(array_change().length == index + 1) &&
                            <View style={{
                              width: '100%',
                              height: Normalize(160),
                            }} />
                          }
                        </>
                      }
                    />
                  </View>
            }
          </View>
        </CurveDesing_Component>
      </View>
    </SafeAreaView>
  );
}