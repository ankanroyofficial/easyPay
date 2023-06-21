import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  View, Text, TouchableOpacity, Image, TextInput, FlatList, Modal, SafeAreaView,
  ActivityIndicator, Pressable, Keyboard, KeyboardAvoidingView, Platform, Linking
} from 'react-native';
import { useRtlContext } from 'react-native-easy-localization-and-rtl';
import { Colors } from '../../../constants/colors';
import images from '../../../constants/images';
import strings from '../../../constants/lng/LocalizedStrings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoaderPage from '../../../components/LoaderPage';
import { nameShorting } from '../../../constants/NameShorting';
import { leftOrRight, rowOrRowreverse } from '../../../constants/RowOrRowreverse';
import { StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ImageLink } from '../../../constants/LinkPage';
import { myContext } from '../../../constants/ContextApi';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
import Pusher from 'pusher-js';
import pusherConfig from './../../../../pusher.json';
import { LogBox } from 'react-native';
import { checkPermission } from '../../../constants/FnFechBlob_download';
import axiosInstance from '../../../constants/AxiosCallPage';
import CurveDesing_Component from '../../../constants/CurveDesing_Component';
import { androidCameraPermission } from '../../../constants/permissions/Permissions';
import globalstyles from '../../../constants/globalStyles/Global_Styles';
export default function ChatPage({ navigation, route }) {
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
  const scrollRef = useRef()
  const { socketId, setSocketId, token } = useContext(myContext);
  const { show } = route.params;
  const { master_id } = route.params;
  const [userSlugName, setUserSlugName] = useState("")
  const [userid, setUserid] = useState("");
  const [allMsg, setAllMsg] = useState([]);
  const [message_master_id, setMessage_master_id] = useState(master_id);
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [doc, setDoc] = useState("");
  const [imageName, setImageName] = useState("");
  const [imageModal, setImageModal] = useState(false);
  const [image_Chat_Modal, setImage_Chat_Modal] = useState(false);
  const [messageSelectedImage, setMessageSelectedImage] = useState("")
  const [refreshing, setRefreshing] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [msgbutton, setMsgbutton] = useState(false);
  const [is_dispute, setIs_dispute] = useState("N");
  const [is_Completed, setIs_Completed] = useState("N");
  const [userDetails, setUserDetails] = useState("");
  const [taskname, setTaskName] = useState("");
  const [fromWhereModal, setFromWhereModal] = useState(false)
  LogBox.ignoreLogs(['Setting a timer for a long period of time'])
  const getUserData = async () => {
    try {
      let userid = await AsyncStorage.getItem("userid");
      let slug = await AsyncStorage.getItem("slug");
      setUserSlugName(slug)
      setUserid(userid)
    } catch (error) {
      console.log("getUserData", error)
    }
  }
  useEffect(() => {
    getUserData()
    return () => {
      getUserData()
    }
  }, []);

  const getSocketId = () => {
    const pusher = new Pusher(pusherConfig.key, pusherConfig);
    pusher.connection.bind("connected", () => {
      var socketId = pusher.connection.socket_id;
      setSocketId(socketId)
    });
  }
  const scrollDown = () => {
    scrollRef.current.scrollToEnd({ animating: true });
  };
  useEffect(() => {
    getSocketId()
    getAllData()
  }, [])
  const getAllMsg = async () => {
    try {
      var arr2 = []
      setLoader(true)
      let user_id = await AsyncStorage.getItem("userid")
      const res = {
        "params": {
          "slug": show,
        }
      }
      const data = await axiosInstance.post("get-message-details", res)
      if (data.data.messageDetail) {
        arr2 = data.data.messageDetail
        if (user_id == data.data.task.user_id) {
          setUserDetails(data.data.task.get_bid[0].get_user)
        } else {
          setUserDetails(data.data.task.get_user)
        }
        setTaskName(data.data.task.title)
        if (data.data.task.status == "3") {
          setIs_Completed("N")
        } else {
          setIs_Completed("Y")
        }
        setAllMsg(arr2)
        setMessage_master_id(data.data.message_master_id)
      } else {
        navigation.goBack()
      }
      setLoader(false)
    } catch (error) {
      setLoader(false)
      console.log("getAllMsg - ", error)
    }
  }
  useEffect(() => {
    getAllMsg()
    return getAllMsg()
  }, [])
  const onPressImageModal = () => {
    setImageModal(!imageModal)
  }
  const onPressImageselect = () => {
    setImage_Chat_Modal(!image_Chat_Modal)
  }
  const ImageShowModal = () => (
    <Modal
      animationType="none"
      transparent={true}
      visible={imageModal}
      onRequestClose={() => {
        onPressImageModal()
      }}
    >
      <View style={{ flex: 1, backgroundColor: "rgba(52,52,52,0.5)", paddingHorizontal: Normalize(25), paddingVertical: Normalize(90) }} >
        <View style={{ flex: 1, backgroundColor: Colors.white, borderRadius: 5 }} >
          <View style={{ height: Normalize(45), width: "100%", flexDirection: rowOrRowreverse(language), padding: "3%", alignItems: "center" }} >
            <View style={{ height: "100%", width: "15%", justifyContent: "center", alignItems: "center" }} >
              <TouchableOpacity
                onPress={() => {
                  checkPermission(ImageLink.MsgImage + `${imageName}`)
                }}
                style={{ height: Normalize(30), width: Normalize(30), borderRadius: Normalize(30) / 2, overflow: "hidden", justifyContent: "center", alignItems: "center", backgroundColor: Colors.green2 }} >
                <Image source={images.download} style={{ height: "90%", width: "90%", resizeMode: "cover" }} />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }} ></View>
            <View style={{ height: "100%", width: "15%", justifyContent: "center", alignItems: "center" }} >
              <TouchableOpacity
                onPress={onPressImageModal}
                style={{ height: Normalize(15), width: Normalize(15) }} >
                <Image source={images.cross} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 1, backgroundColor: "#f5f5f5", margin: "3%", borderRadius: 5 }} >
            {
              imageCheck(imageName) ?
                <Image source={{ uri: ImageLink.MsgImage + `${imageName}` }} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                :
                <Image source={{ uri: imageName }} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
            }
          </View>
        </View>
      </View>
    </Modal>
  )
  const Image_With_chat_ShowModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={image_Chat_Modal}
      onRequestClose={() => {
        onPressImageselect()
        setMessage("")
      }}
    >
      <View style={{ flex: 1, backgroundColor: Colors.white }} >
        <View style={{ flex: 1, }} >
          <View style={{ height: Normalize(45), width: "100%", flexDirection: rowOrRowreverse(language), padding: "3%", alignItems: "center" }} >
            <View style={{ flex: 1, backgroundColor: '#F2F6FF', margin: 20 }} ></View>
            <View style={{ height: "100%", width: "15%", justifyContent: "center", alignItems: "center" }} >
              <TouchableOpacity
                onPress={() => {
                  onPressImageselect()
                  setMessage("")
                  setMessageSelectedImage("")
                }}
                style={{ height: Normalize(15), width: Normalize(15) }} >
                <Image source={images.cross} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 1, backgroundColor: '#F2F6FF', margin: "3%", borderRadius: 5 }}>
            <Image source={{ uri: messageSelectedImage.uri }} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
          </View>
        </View>
        <View style={{
          height: Normalize(48),
          width: '100%',
          alignSelf: 'center',
          backgroundColor: Colors.white,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "8%",

        }} >
          <View style={{
            flexDirection: rowOrRowreverse(language),
            width: '95%',
            backgroundColor: '#F2F6FF',
            padding: Normalize(3),
            borderRadius: 50,
            height: "85%",
            justifyContent: "space-evenly",
            paddingHorizontal: "3%"
          }}>
            <TouchableOpacity
              onPress={onpressAttachButton}
              style={{ height: "100%", width: "10%", justifyContent: "center", alignItems: "center", padding: Normalize(3) }} >
              <Image source={images.attach} style={{ width: "70%", height: "70%", alignSelf: 'center', resizeMode: "contain" }} />
            </TouchableOpacity>
            <View style={{ flex: 1, justifyContent: 'center' }} >
              <TextInput
                editable={msgbutton || is_Completed == "Y" ? false : true}
                onFocus={starTyping}
                onBlur={endTyping}
                value={msgbutton ? "" : message}
                keyboardType="default"
                placeholder={strings.MESSAGE.TYPEAMESSAGEHERE}
                placeholderTextColor={Colors.textinput_inner_text}
                style={globalstyles.textinput_onlyText_Style_No_textAlignVertical}
                multiline
                onChangeText={(e) => setMessage(e)}
                onSubmitEditing={() => { Keyboard.dismiss() }}

              />
            </View>
            <TouchableOpacity
              onPress={() => {
                messageSend()
              }}
              style={{ height: "100%", width: "12%", transform: [{ rotateY: language == "en" ? "0deg" : "180deg" }] }} >
              <Image style={{ width: "100%", height: "100%", resizeMode: "contain" }} source={images.send} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
  const selectImageForMsg = () => {
    onpressAttachButton()
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
      } else {
        // console.log(response.assets[0])

        if (Platform.OS == "ios") {
          onpressAttachButton()
        }
        if (!image_Chat_Modal) {
          onPressImageselect()
        }

        if (response.assets) {
          setMessageSelectedImage(response.assets[0])
        } else {
          if (Platform.OS === 'ios') {
            Toast.show("Please give camera permission")
          }
        }
      }
    })
  }
  const messageSend = async () => {
    try {
      if (message.length != 0 && message.trim() != "") {
        setImage_Chat_Modal(false)
        const messageTrim = message.trim()
        const img = messageSelectedImage
        // setMessage("")
        // setMessageSelectedImage("")
        setMsgbutton(true)
        const finalFormData = new FormData();
        finalFormData.append('message_master_id', message_master_id);
        finalFormData.append('message', messageTrim);
        // finalFormData.append('socket_id', socketId);
        finalFormData.append('socket_id', socketId == "" ? "7533.23472117" : socketId);
        {
          if (img.fileName == undefined) {
            null
          } else {
            finalFormData.append('file', {
              uri: img.uri,
              type: img.type,
              name: img.fileName,
            });
          }
        }
        const data = finalFormData
        const res = await axiosInstance.post("send-message", data)
        // console.log(res.data)
        if (res.data.error) {
          // Toast.show(res.data.error.meaning)
          Toast.showWithGravity(res.data.error.meaning, Toast.LONG, Toast.BOTTOM)
          setMsgbutton(false)
          // afterSendMsg()
        } else {
          // Toast.show(language == "en" ? "send" : "ارسال")
          setMessage("")
          setMessageSelectedImage("")
          afterSendMsg()
        }
      } else {
        Toast.show(language === "en" ? "Message cannot be empty." : "پیام نمی تواند خالی باشد.")
      }
    } catch (error) {
      console.log("messageSend", error)
    }
  }
  const afterSendMsg = async () => {
    try {
      var arr2 = []
      const res = {
        "params": {
          "slug": show,
        }
      }

      const data = await axiosInstance.post("get-message-details", res)

      if (data.data.messageDetail) {
        arr2 = data.data.messageDetail
        setAllMsg(arr2)
        setMsgbutton(false)
      } else {
        navigation.goBack()
      }
    } catch (error) {
      console.log("afterSendMsg - ", error)
    }
  }
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    afterSendMsg()
    setRefreshing(false)
  }, [refreshing]);
  const imageCheck = (val) => {
    var a = val.split(":")

    if (a[0] == "file") {
      return false
    } else {
      return true
    }


  }
  const starTyping = async () => {
    try {
      const data = {
        "params": {
          "message_master_id": master_id,
          "typing": "start",
          // "socket_id": socketId
          "socket_id": socketId == "" ? "7533.23472117" : socketId
        }
      }
      const res = await axiosInstance.post("typing-message", data)
    } catch (error) {
      console.log("starTyping", error)
    }
  }
  const endTyping = async () => {
    try {
      const data = {
        "params": {
          "message_master_id": master_id,
          "typing": "end",
          "socket_id": socketId == "" ? "7533.23472117" : socketId
        }
      }
      const res = await axiosInstance.post("typing-message", data)
    } catch (error) {
      console.log("endTyping", error)
    }
  }
  const Header_with_TitleandImage = () => (
    <View style={{ backgroundColor: Colors.primary, height: Normalize(60), flexDirection: "row", paddingHorizontal: Normalize(10), }} >
      <View style={{ height: "100%", width: "10%", justifyContent: "center", alignItems: "center" }} >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={images.back}
            name="arrow-left"
            color={Colors.white}
            style={{ height: Normalize(15), width: Normalize(20) }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ height: Normalize(60), width: Normalize(60), justifyContent: "center", alignItems: "center" }} >
        <View style={{ height: "70%", width: "70%", backgroundColor: "#f5f5f5", borderRadius: Normalize(60) / 2, overflow: "hidden" }} >
          <Image source={{ uri: ImageLink.ProfilePhoto + `${userDetails.profile_picture}` }} style={{ height: "100%", width: "100%", resizeMode: "cover" }} />
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: "center" }} >

        <Text numberOfLines={1} style={{
          fontSize: Normalize(14),
          color: Colors.white,
          fontFamily: 'Outfit-SemiBold',
          textAlign: "left"
        }}>{nameShorting(userDetails.fname + " " + userDetails.lname)}</Text>
        <Text numberOfLines={1} style={{
          fontSize: Normalize(11),
          color: "#f5f5f5",
          fontFamily: 'Outfit-Medium',
          textAlign: "left"
        }}>{taskname}</Text>

      </View>
    </View>
  )
  const is_userId = async (val) => {
    let id = await AsyncStorage.getItem("userid");
    if (val == id) {
      return true
    } else {
      return false
    }
  }
  const getAllData = () => {
    const pusher = new Pusher(pusherConfig.key, pusherConfig);
    let channel = pusher.subscribe("eazypay-development");
    pusher.connection.bind("connected", () => {
      var socketid = pusher.connection.socket_id;
      setSocketId(socketid)
    });
    channel.bind('message-event', function (data) {
      if (data) {

        console.log(" chat page message-event..............")

        afterSendMsg()
      }
    })


    channel.bind('start-end-typing', function (data) {
      // console.log(data)
      let id = data.reciver_id;
      // console.log("id",id)
      // console.log("*******",parseInt(message_master_id))
      // console.log("*******", userid)
      // console.log("*******", is_userId(id))
      if (data.message_master_id) {
        if (data.typing == "start") {
          if (data.message_master_id == message_master_id) {
            if (is_userId(data.reciver_id)) {
              setIsTyping(true)
              // console.log("typing......................................................")
            } else {
              // console.log("meee typing......................................................")
            }
          }
        } else {
          setIsTyping(false)
          // console.log("end......................................................")
        }
      }
    })
  }

  const selectImageForMsg_by_camera = () => {
    if (Platform.OS == "android") {
      onpressAttachButton()
    }
    launchCamera({ mediaType: "photo", quality: 0.7 }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        if (response.assets) {
          if (Platform.OS == "ios") {
            onpressAttachButton()
          }
        if (!image_Chat_Modal) {
          onPressImageselect()
        }
        setMessageSelectedImage(response.assets[0])
      } else {
        if (Platform.OS === 'ios') {
          Toast.show("Please give camera permission")
        }
      }
      }
    })
  }






  const onpressAttachButton = () => {
    setFromWhereModal(!fromWhereModal)
  }

  const iscameraPermission = async () => {
    const permissionStatus = await androidCameraPermission()
    if (permissionStatus || Platform.OS == "ios") {
      selectImageForMsg_by_camera()
    } else {
      if (Platform.OS === 'ios') {
        Toast.show("Please give camera permission")
      }
      else {
        // Toast.show("Please give camera permission")
        Linking.openSettings();
      }
    }
  }

  const ChoosefromWhereModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={fromWhereModal}
        onRequestClose={() => {
          onpressAttachButton()
        }}
      >
        <View style={{ flex: 1 }} >
          <Pressable onPressIn={onpressAttachButton} style={{ flex: 3, backgroundColor: "rgba(52,52,52,0.5)" }} ></Pressable>
          <View style={{ flex: 1, backgroundColor: Colors.white, padding: Normalize(15) }} >
            <Text style={[globalstyles.plantext_Outfit_Medium, { color: Colors.primary, fontSize: Normalize(16), textAlign: "center" }]} >Select images from</Text>
            <View style={{ flex: 1, flexDirection: "row" }} >
              <View style={{ alignItems: "center", justifyContent: "center", flex: 1, }} >
                <Pressable
                  onPressIn={iscameraPermission}
                  style={styles.galleryorcamera_icon} >
                  <FontAwesome5
                    name='camera'
                    size={Normalize(30)}
                    color={Colors.primary}
                  />
                </Pressable>
                <Text style={[globalstyles.plantext_Outfit_Medium, { color: Colors.primary }]} >Camera</Text>
              </View>

              <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }} >
                <Pressable
                  onPressIn={selectImageForMsg}
                  style={styles.galleryorcamera_icon} >
                  <FontAwesome5
                    name='images'
                    size={Normalize(30)}
                    color={Colors.primary}
                  />
                </Pressable>
                <Text style={[globalstyles.plantext_Outfit_Medium, { color: Colors.primary }]} >Gallery</Text>
              </View>
            </View>

          </View>
        </View>
      </Modal>
    )
  }
  return (
    <>
      {
        loader ?
          <LoaderPage />
          :
          <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>
            <KeyboardAvoidingView
              behavior={(Platform.OS === 'ios') ? "padding" : null} style={styles.container}>
              <Header_with_TitleandImage />
              <CurveDesing_Component  >
                <View style={{ flex: 1 }} >
                  <View style={{ flex: 1 }} >
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => { navigation.navigate("Messages2", { show: show, master_id: master_id }) }}
                      style={{ height: Normalize(35), width: "100%", marginVertical: Normalize(5), position: "absolute", zIndex: 1 }} >
                      <View style={{ height: "100%", width: "80%", backgroundColor: Colors.secondary, alignSelf: "center", borderRadius: 100, justifyContent: "center", alignItems: "center" }} >
                        <Text numberOfLines={1} style={{
                          fontSize: Normalize(14),
                          color: Colors.white,
                          textAlign: 'center',
                          fontFamily: 'Outfit-SemiBold',
                        }}>{strings.BROWSEFILTER.VIEWTASK}</Text>
                      </View>
                    </TouchableOpacity>

                    <View style={{ flex: 1, marginHorizontal: Normalize(7) }} >
                      <FlatList
                        inverted
                        showsVerticalScrollIndicator={false}
                        ref={scrollRef}
                        data={allMsg}
                        renderItem={({ item, index }) => (
                          <View key={(index + (Math.floor(Math.random() * 100)))} style={{ marginTop: index == (allMsg.length) - 1 ? Normalize(50) : 0 }}>
                            {
                              item.file != null ?
                                <View style={userid == item.user_id ? language == "en" ? styles.textRight_withfile : styles.sender_withfile_pr : language == "en" ? styles.textLeft_withfile : styles.reciver_withfile_pr}>
                                  <TouchableOpacity activeOpacity={1}
                                    onPress={() => {
                                      setImageName(item.file)
                                      onPressImageModal()
                                    }}
                                    style={{ height: Normalize(200), width: Normalize(150), backgroundColor: "#f5f5f5", borderRadius: 5, overflow: "hidden", justifyContent: "center" }} >
                                    {
                                      imageCheck(item.file) ?
                                        <Image
                                          source={{ uri: ImageLink.MsgImage + `${item.file}` }} style={{ height: "100%", width: "100%", resizeMode: "cover", position: "absolute", zIndex: 1 }} />
                                        :
                                        null
                                    }
                                    <ActivityIndicator
                                      size="large"
                                      color={Colors.primary}
                                      style={{}}
                                    />
                                  </TouchableOpacity>
                                  <Text style={{
                                    color: userid == item.user_id ? Colors.white : Colors.primary, fontFamily: 'roboto-regular', fontSize: Normalize(11), textAlign: userid == item.user_id ? language == "en" ? "right" : "left" : language == "en" ? "left" : "right", paddingHorizontal: "2%"
                                    , maxWidth: Normalize(150), paddingVertical: "3%"
                                  }}>{item.message}</Text>
                                  {imageModal && imageName == item.file && <ImageShowModal />}
                                </View>
                                :
                                language == "en" ?
                                  <View style={userid == item.user_id ? styles.textRight : styles.textLeft}>
                                    <Text style={{
                                      color: userid == item.user_id ? Colors.white : Colors.primary, fontFamily: 'roboto-regular', fontSize: Normalize(11), textAlign: userid == item.user_id ? "right" : "left"
                                    }}>{item.message}</Text>
                                  </View>
                                  : <View style={userid == item.user_id ? styles.sender_pr : styles.reciver_pr}>
                                    <Text style={{
                                      color: userid == item.user_id ? Colors.white : Colors.primary, fontFamily: 'roboto-regular', fontSize: Normalize(11), textAlign: userid == item.user_id ? "right" : "left"
                                    }}>{item.message}</Text>
                                  </View>
                            }
                          </View>
                        )}
                      />
                    </View>
                  </View>
                  {
                    isTyping &&
                    <Text style={{
                      color: Colors.secondary, fontFamily: 'Outfit-Medium', fontSize: Normalize(8), textAlign: leftOrRight(language), paddingHorizontal: Normalize(15)
                    }}>{strings.MESSAGE.TYPING}</Text>
                  }
                  {
                    msgbutton &&
                    <View style={{ alignItems: language == "en" ? "flex-end" : "flex-start", paddingHorizontal: Normalize(15), paddingBottom: Normalize(7) }} >
                      <ActivityIndicator
                        color={Colors.lightGrey}
                        size={"small"}
                      />
                    </View>
                  }
                  {
                    is_Completed == "Y" &&
                    <View style={{ alignItems: language == "en" ? "flex-end" : "flex-start", paddingHorizontal: Normalize(15), paddingVertical: Normalize(5), backgroundColor: Colors.disableBackGround, alignItems: "center" }} >
                      <Text numberOfLines={1} style={{
                        fontSize: Normalize(15),
                        color: Colors.disableText,
                        fontFamily: 'Outfit-Medium',
                      }}>{strings.MYPROFILE.COMPLETEDTASKS}</Text>
                    </View>
                  }
                  <View style={{ marginBottom: Normalize(8) }}>
                    <View style={{
                      height: Normalize(48),
                      width: '93%',
                      alignSelf: 'center',
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                      <View style={{
                        flexDirection: rowOrRowreverse(language), width: '100%', backgroundColor: '#F2F6FF', padding: Normalize(3), borderRadius: 50, height: "85%"
                      }}>
                        <TouchableOpacity
                          disabled={is_Completed == "Y" ? true : false}
                          onPress={onpressAttachButton}
                          style={{ height: "100%", width: "10%", justifyContent: "center", alignItems: "center", padding: Normalize(3) }} >
                          <Image source={images.attach} style={{ width: "70%", height: "70%", alignSelf: 'center', resizeMode: "contain" }} />
                        </TouchableOpacity>
                        {
                          fromWhereModal && <ChoosefromWhereModal />
                        }
                        {image_Chat_Modal && Image_With_chat_ShowModal()}
                        <View style={{ flex: 1, justifyContent: "center" }} >
                          <TextInput
                            editable={msgbutton || is_Completed == "Y" ? false : true}
                            onFocus={starTyping}
                            onBlur={endTyping}
                            value={msgbutton ? "" : message}
                            keyboardType="default"
                            placeholder={strings.MESSAGE.TYPEAMESSAGEHERE}
                            placeholderTextColor={Colors.textinput_inner_text}
                            style={globalstyles.textinput_onlyText_Style_No_textAlignVertical}
                            multiline
                            onChangeText={(e) => setMessage(e)}
                            onSubmitEditing={() => { Keyboard.dismiss() }}

                          />
                        </View>
                        <TouchableOpacity
                          activeOpacity={1}
                          disabled={msgbutton || is_Completed == "Y" ? true : false}
                          onPress={() => messageSend()}
                          style={{ height: "100%", width: "12%", borderRadius: 100, overflow: "hidden", transform: [{ rotateY: language == "en" ? "0deg" : "180deg" }] }} >
                          {
                            msgbutton || is_Completed == "Y" ?
                              <Image style={{ width: "100%", height: "100%", resizeMode: "contain" }} source={images.send_gray} />
                              :
                              <Image style={{ width: "100%", height: "100%", resizeMode: "contain" }} source={images.send} />
                          }
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </CurveDesing_Component>
            </KeyboardAvoidingView>
          </SafeAreaView>
      }

    </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  galleryorcamera_icon: {
    height: Normalize(75), width: Normalize(75), borderRadius: Normalize(75) / 2, backgroundColor: Colors.grayf5, marginBottom: Normalize(5), justifyContent: "center", alignItems: "center"
  },
  heading: {
    fontSize: 15,
    fontFamily: 'Outfit-SemiBold',
    width: '85%',
    color: '#38393e'
  },
  textRight: {
    backgroundColor: Colors.primary,
    alignSelf: 'flex-end',
    marginHorizontal: Normalize(10),
    padding: Normalize(10),
    borderBottomRightRadius: Normalize(20),
    borderTopLeftRadius: Normalize(20),
    marginVertical: Normalize(5),
    borderBottomLeftRadius: Normalize(20),
    maxWidth: "70%",
  },
  reciver_pr: {
    backgroundColor: Colors.msgReciver,
    alignSelf: 'flex-end',
    marginHorizontal: Normalize(10),
    padding: Normalize(10),
    borderBottomRightRadius: Normalize(20),
    borderTopLeftRadius: Normalize(20),
    marginVertical: Normalize(5),
    borderBottomLeftRadius: Normalize(20),
    maxWidth: "70%",
  },
  textLeft: {
    backgroundColor: Colors.msgReciver,
    alignSelf: "flex-start",
    marginHorizontal: Normalize(10),
    padding: Normalize(10),
    marginVertical: Normalize(5),
    borderBottomLeftRadius: Normalize(20),
    borderBottomRightRadius: Normalize(20),
    borderTopRightRadius: Normalize(20),
  },
  sender_pr: {

    backgroundColor: Colors.primary,
    alignSelf: "flex-start",
    marginHorizontal: Normalize(10),
    padding: Normalize(10),
    marginVertical: Normalize(5),
    borderBottomLeftRadius: Normalize(20),
    borderBottomRightRadius: Normalize(20),
    borderTopRightRadius: Normalize(20),

  },
  textRight_withfile: {
    backgroundColor: Colors.primary,
    alignSelf: 'flex-end',
    marginHorizontal: Normalize(10),
    padding: Normalize(3),
    marginVertical: Normalize(5),
    borderRadius: Normalize(6),
    justifyContent: "center",
  },
  reciver_withfile_pr: {
    backgroundColor: Colors.msgReciver,
    alignSelf: 'flex-end',
    marginHorizontal: Normalize(10),
    padding: Normalize(3),
    marginVertical: Normalize(5),
    borderRadius: 5,
    justifyContent: "center",
  },
  sender_withfile_pr: {
    backgroundColor: Colors.primary,
    alignSelf: "flex-start",
    marginHorizontal: Normalize(10),
    padding: Normalize(3),
    marginVertical: Normalize(5),
    borderRadius: 5,
    justifyContent: "center",
  },
  textLeft_withfile: {
    backgroundColor: Colors.msgReciver,
    alignSelf: "flex-start",
    marginHorizontal: Normalize(10),
    padding: Normalize(3),
    marginVertical: Normalize(5),
    borderRadius: 5,
    justifyContent: "center",
  }
});