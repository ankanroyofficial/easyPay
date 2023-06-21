import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import {
  View, Text, Modal, Image, TouchableOpacity, TextInput,
  Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, Pressable, Linking, StyleSheet
} from 'react-native'
import Toast from 'react-native-simple-toast';
import { Colors } from '../../../../constants/colors';
import images from '../../../../constants/images';
import { useNavigation } from "@react-navigation/native"
import strings from '../../../../constants/lng/LocalizedStrings';
import { myContext } from '../../../../constants/ContextApi';
import Button from "../../../../components/Button"
import { ImageLink } from '../../../../constants/LinkPage';
import axiosInstance from '../../../../constants/AxiosCallPage';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../../../../components/Header';
import NewLoaderPage from '../../../../components/NewLoaderPage';
import { FlatList } from 'react-native';
import { useRef } from 'react';
import AcceptOfferinProposal from './AcceptOfferinProposal';
import { androidCameraPermission } from '../../../../constants/permissions/Permissions';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { apiuriOrPhoneUri } from '../../../../constants/apiuriOrPhoneUri';
import { timeFunc } from '../../../../constants/DateShow';
import WarningPage from '../../../../components/WarningPage';
import Pusher from 'pusher-js';
import pusherConfig from './../../../../../pusher.json';
export default function NewOfferPage_chatWithTasker(props) {

  const {
    taskSlug, taskerName,
    taskTitle, offerDate, photo,
    tasker1stName, taskerId
  } = props.route.params
  const navigation = useNavigation()
  const { userId,
    socketId,
    taskdetailsData, setTaskdetailsData,
    newOfferPageMessageWithTaskerArry,
    setNewOfferPageMessageWithTaskerArry
  } = useContext(myContext)
  const scrollRef = useRef();
  const scrollToEnd = () => scrollRef.current.scrollToEnd({ animated: true });
  const [image_Chat_Modal, setImage_Chat_Modal] = useState(false);
  const onPressImageselect = () => {
    setImage_Chat_Modal(!image_Chat_Modal)
  }
  const findWhichObject = (val) => {
    try {
      let dummyArr = []
      let idBid = ""
      val.map((item) => {
        if (taskerId == item.user_id) {
          idBid = item.id
          dummyArr.push({ msg: item.description, msgUserId: item.user_id, id: item.id, updated_details: "N", image: null, created_at: item.created_at })
          if ((item.get_bid_comment.length != 0)) {
            // console.log(item.get_bid_comment)
            (item.get_bid_comment).map((item) => {
              dummyArr.push({ msg: item.message, msgUserId: item.user_id, id: item.bid_id, updated_details: item.updated_details, image: item.image, created_at: item.created_at })
            })
          }
        }
      })
      return dummyArr;
    } catch (error) {
      console.log("findWhichObject", error)
    }
  }
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)
  const [loader, setLoader] = useState(false)
  const [acceptoffer, setAcceptoffer] = useState(false)
  const [message, setMessage] = useState("")
  const [fromWhereModal, setFromWhereModal] = useState(false)
  const [messageSelectedImage, setMessageSelectedImage] = useState("")
  const [imageModal, setImageModal] = useState(false);
  const [imageName, setImageName] = useState("");
  const [isRejectModal, setIsRejectModal] = useState(false);

  const onpressRejectModal = () => {
    setIsRejectModal(!isRejectModal)
  }

  const onPressImageModal = () => {
    setImageModal(!imageModal)
  }
  const myBidAmount = (val) => {
    var a;
    val.map((item) => {
      if (taskerId == item.get_user.id) {
        a = Math.round(item.amount)
      }
    })
    return a
  }
  useEffect(() => {
    getMessages()
  }, [])
  const getMessages = async () => {
    try {
      setLoader(true)
      const res = {
        "jsonrpc": "2.0",
        "params": {
          "slug": taskSlug
        }
      }
      const data = await axiosInstance.post("get-task-details", res)
      if (data.data.result) {
        let bids = data.data.result.task.get_bid
        setNewOfferPageMessageWithTaskerArry(findWhichObject(bids))
        setLoader(false)
        scrollToEnd()
      }
      scrollToEnd()
      setLoader(false)
    } catch (error) {
      setLoader(false)
      console.log("getMessages >", error)
    }
  }



  const selectImageForMsg = () => {
    if (Platform.OS == "android") {
      onpressAttachButton()
    }
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
      } else {
        if (Platform.OS == "ios") {
          onpressAttachButton()
        }
        if (!image_Chat_Modal) {
          onPressImageselect()
        }

        if (response.assets) {
          setMessageSelectedImage(response.assets[0])
          // onPressImageselect()
        } else {
          if (Platform.OS === 'ios') {
            Toast.show("Please give camera permission")
          }
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
          // onPressImageselect()
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


  const detectKeyboard = () => {
    Keyboard.addListener('keyboardDidShow', () => setIsKeyboardVisible(true))
    Keyboard.addListener('keyboardDidHide', () => {
      Keyboard.dismiss();
      setIsKeyboardVisible(false)
    })
  }

  useEffect(() => {
    detectKeyboard()
  }, [])
  const sendMsg = async (val) => {
    try {
      // setLoader(true)
      if (message.length == 0 || message.trim() == "") {
        Toast.show(strings.ERROR.ATFIRSTENTERMSG)
      } else {
        if (message.length > 1000) {
          Toast.show(strings.ERROR.ENTERMAX1000MSG)
        } else {
          let trimMessage = message.trim()
          setImage_Chat_Modal(false)
          setMessage("")
          const img = messageSelectedImage
          newOfferPageMessageWithTaskerArry.push({ msg: trimMessage, msgUserId: userId, id: val, updated_details: "N", image: img.fileName == undefined ? null : img.uri, created_at: "" })
          scrollToEnd()
          const finalFormData = new FormData();
          finalFormData.append('slug', taskSlug);
          finalFormData.append('message', trimMessage);
          finalFormData.append('bid_id', val);
          finalFormData.append('socket_id', socketId == "" ? "7533.23472117" : socketId);
          {
            if (img.fileName == undefined) {
              null
            } else {
              finalFormData.append('image', {
                uri: img.uri,
                type: img.type,
                name: img.fileName,
              });
            }
          }
          const data = finalFormData
          // console.log(data)
          const res = await axiosInstance.post("new-send-offer-reply", data)
          // console.log(res.data)
          if (res.data.result) {
            setMessageSelectedImage("")
            newOfferPageMessageWithTaskerArry.pop()
            newOfferPageMessageWithTaskerArry.push({ msg: res.data.result.message, msgUserId: res.data.result.user_id, id: res.data.result.bid_id, updated_details: res.data.result.updated_details, image: res.data.result.image, created_at: res.data.result.created_at })
          } else {
            Keyboard.dismiss()
            newOfferPageMessageWithTaskerArry.pop()
            setLoader(false)
            Toast.show(res.data.error.meaning)
          }
          scrollToEnd()
          setLoader(false)
        }
      }
    } catch (error) {
      console.log("sendMsg--", error)
    }
  }

  const scrollDown = () => {
    setTimeout(scrollDownFunc, 800);
  }
  const scrollDownFunc = () => {
    scrollToEnd()
  }
  useEffect(() => {
    scrollDown()
  }, [])
  const isloadAferCameBackLoad = async () => {
    try {
      let offerReload = await AsyncStorage.getItem("offerReload")
      // console.log("new slug-------->", offerReload)
      if (offerReload != null) {
        loadAferCameBack()
      }
    } catch (error) {
      console.log("isloadAferCameBackLoad", error)
    }
  }
  const loadAferCameBack = async () => {
    try {
      let res = {
        "jsonrpc": "2.0",
        "params": {
          "slug": taskdetailsData.slug
        }
      }
      const data = await axiosInstance.post("get-task-details", res)
      // console.log("in autoLoad--------->", data.data.result.task.get_bid)
      if (data.data.result) {
        let a = data.data.result;
        let oldTaskdata = data.data.result.task;
        
        oldTaskdata.lowest_offers = a.lowest_offers;
        oldTaskdata.highest_offers = a.highest_offers;
        oldTaskdata.nearbyfixeroffer = a.nearbyfixeroffer;
        oldTaskdata.recommended_fixer_sort_based_on_rating = a.recommended_fixer_sort_based_on_rating
        // console.log(oldTaskdata)
        setTaskdetailsData(oldTaskdata)

        await AsyncStorage.removeItem("offerReload")
      }
    } catch (error) {
      console.log("loadAferCameBack - ", error)
    }
  }




  const ImageShowModal = ({ uri }) => (
    <Modal
      animationType="none"
      transparent={true}
      visible={imageModal}
      onRequestClose={() => {
        onPressImageModal()
      }}
    >
      <View style={{ flex: 1, backgroundColor: "white", }} >
        <View style={{ backgroundColor: Colors.primary, height: Normalize(45), width: "100%", justifyContent: "center", alignItems: "flex-end", paddingRight: Normalize(15) }} >
          <TouchableOpacity
            onPress={onPressImageModal} >
            <Entypo
              name="cross"
              size={Normalize(24)}
              color={Colors.white}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
          {
            apiuriOrPhoneUri(imageName) == "phone" ?
              <Image source={{ uri: imageName }} style={{ height: "90%", width: "90%", resizeMode: "cover" }} />
              :
              <Image source={{ uri: ImageLink.newsendofferreply + imageName }} style={{ height: "90%", width: "90%", resizeMode: "cover" }} />
          }
        </View>
      </View>
      <View>
      </View>
    </Modal>
  )



  const rejectOffer = async () => {
    try {
      const data = {
        "params": {
          "slug": taskSlug,
          "id": newOfferPageMessageWithTaskerArry[0].id,
          "socket_id": socketId
        }
      }
      let res = await axiosInstance.post("reject-offer", data)
      // console.log(res.data.result)

      if (res.data.result) {
        let a = res.data.result;
        let oldTaskdata = res.data.result.task;
        oldTaskdata.lowest_offers = a.lowest_offers;
        oldTaskdata.highest_offers = a.highest_offers;
        oldTaskdata.nearbyfixeroffer = a.nearbyfixeroffer;
        oldTaskdata.recommended_fixer_sort_based_on_rating = a.recommended_fixer_sort_based_on_rating;
        // console.log(oldTaskdata)

        setTaskdetailsData(oldTaskdata)
        Toast.show(res.data.result.meaning)
        onpressRejectModal()
        navigation.goBack()
      } else {
        Toast.show(res.data.error.meaning)
      }
    } catch (error) {
      console.log("rejectOffer", error)
    }
  }




  // let a = data.data.result;
  // let oldTaskdata = data.data.result.task;

  // oldTaskdata.lowest_offers= a.lowest_offers;
  // oldTaskdata.highest_offers= a.highest_offers;
  // oldTaskdata.nearbyfixeroffer= a.nearbyfixeroffer;
  // oldTaskdata.recommended_fixer_sort_based_on_rating= a.recommended_fixer_sort_based_on_rating

  // console.log(oldTaskdata)


  const getAutoMsgPusher = () => {
    const pusher = new Pusher(pusherConfig.key, pusherConfig);
    let channel = pusher.subscribe("eazypay-development");

    channel.bind('bid-reply-event', function (data) {
      getMsgAuto()
    })
  }

  useEffect(() => {
    getAutoMsgPusher()
  }, [])



  const getMsgAuto = async () => {
    try {
      const res = {
        "jsonrpc": "2.0",
        "params": {
          "slug": taskSlug
        }
      }
      const data = await axiosInstance.post("get-task-details", res)

      // console.log("//////",data.data)

      if (data.data.result) {
        let bids = data.data.result.task.get_bid
        setNewOfferPageMessageWithTaskerArry(findWhichObject(bids))
      }
    } catch (error) {
      setLoader(false)
      console.log("getMessages >", error)
    }
  }


  return (
    <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>
      <KeyboardAvoidingView
        behavior={(Platform.OS === 'ios') ? "padding" : null} style={{ flex: 1 }}>
        <Header name={`${tasker1stName}'s offer`} back />
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
          {/* picture name taskTitle amount */}
          {!isKeyboardVisible && <View style={{ padding: Normalize(5) }} >
            <View style={{ height: Normalize(65), width: "95%", flexDirection: "row", alignSelf: "center" }} >
              <View style={{ height: "100%", width: Normalize(50), justifyContent: "center", alignItems: "center" }}>
                <View style={{ overflow: "hidden", height: Normalize(50), width: Normalize(50), borderRadius: Normalize(50) / 2, borderColor: Colors.secondary, borderWidth: 1, justifyContent: "center", alignItems: "center" }}>
                  {
                    photo != null ?
                      <Image
                        source={{ uri: ImageLink.ProfilePhoto + photo }}
                        style={{
                          width: "100%",
                          height: "100%",
                          resizeMode: "cover"
                        }}
                      />
                      :
                      <AntDesign name="user" color={Colors.secondary} size={Normalize(22)} />}
                </View>
              </View>
              <View style={{ flex: 1, justifyContent: "space-around", paddingLeft: Normalize(8), paddingVertical: Normalize(6) }}>
                <Text numberOfLines={1} style={[globalstyles.plantext_bold, { width: "84%", fontSize: Normalize(12) }]}>{taskTitle}</Text>
                <Text numberOfLines={1} style={[globalstyles.plantext_bold, { width: "84%", fontSize: Normalize(12) }]}>{taskerName}</Text>

                <View style={{ flexDirection: "row", alignItems: "center" }} >
                  <FontAwesome name="calendar-o" color={Colors.grey} size={Normalize(12)} />
                  <Text numberOfLines={1} style={[globalstyles.plantext_regular, { marginLeft: Normalize(3), width: "84%", color: Colors.grey, fontSize: Normalize(12) }]}>{offerDate}</Text>
                </View>
              </View>
              <View style={{ paddingHorizontal: Normalize(5), justifyContent: "center", alignItems: "center", borderLeftWidth: 1, borderLeftColor: Colors.secondary }}>
                <Text style={globalstyles.plantext_bold}>Offer taken</Text>
                <Text style={globalstyles.plantext_bold}>$ {myBidAmount(taskdetailsData.get_bid)}</Text>
              </View>
            </View>
          </View>}
          {/* community block */}
          {!isKeyboardVisible && <View style={{ padding: Normalize(5), flexDirection: "row", alignItems: "center", width: "100%", paddingHorizontal: "3%", alignSelf: "center", borderBottomWidth: 1, borderTopWidth: 1, borderBottomColor: Colors.boxBorder, borderTopColor: Colors.boxBorder }} >
            <Ionicons name="eye" color={Colors.textinput_inner_text} size={Normalize(18)} />
            <Text style={[globalstyles.plantext_bold, { color: Colors.textinput_inner_text, marginLeft: Normalize(4), textAlign: "justify", width: "90%" }]}>The community is monitored to ensure the safety of all members. You will have a 1:1 chat once your service is booked.</Text>
          </View>}
          <View style={{ flex: 1, marginHorizontal: Normalize(15), justifyContent: "flex-end", paddingTop: Normalize(5) }} >
            <FlatList
              // inverted
              ref={scrollRef}
              showsVerticalScrollIndicator={false}
              data={newOfferPageMessageWithTaskerArry}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (

                item.updated_details == "Y" ?
                  <Text style={[globalstyles.plantext_outfit_semibold, { textAlign: "center", color: Colors.grey, marginBottom: Normalize(10), }]}>{item.msg}</Text>
                  :
                  <View style={{
                    marginBottom: Normalize(10),
                    padding: Normalize(6),
                    alignSelf: item.msgUserId == userId ? "flex-end" : "flex-start",
                    backgroundColor: item.msgUserId == userId ? Colors.primary : Colors.secondaryBackground,
                    borderBottomLeftRadius: Normalize(8),
                    borderBottomRightRadius: Normalize(8),
                    borderTopRightRadius: item.msgUserId != userId ? Normalize(8) : 0,
                    borderTopLeftRadius: item.msgUserId != userId ? 0 : Normalize(8),
                    elevation: 1,
                    overflow: "hidden",
                    maxWidth: "70%"
                  }}
                  >
                    {item.image != null &&
                      <Pressable
                        onPress={() => {
                          setImageName(item.image)
                          onPressImageModal()
                        }}
                        style={{ height: Normalize(200), width: Normalize(150), backgroundColor: "#f5f5f5", borderRadius: 5, overflow: "hidden", justifyContent: "center" }} >
                        {
                          apiuriOrPhoneUri(item.image) == "phone" ?
                            <Image source={{ uri: item.image }} style={{ height: "100%", width: "100%", resizeMode: "cover" }} />
                            :
                            <Image source={{ uri: ImageLink.newsendofferreply + item.image }} style={{ height: "100%", width: "100%", resizeMode: "cover" }} />
                        }
                      </Pressable>}

                    {imageModal && imageName == item.image && <ImageShowModal />}

                    <Text
                      style={[globalstyles.plantext_regular, {
                        color: item.msgUserId != userId ? Colors.secondary : Colors.white,
                        textAlign: "justify",
                      }]}>{item.msg}</Text>

                    <Text style={[globalstyles.plantext_bold, {
                      fontSize: Normalize(10),
                      color: item.msgUserId != userId ? Colors.secondary : Colors.white,
                      textAlign: item.msgUserId != userId ? "left" : "right",
                      marginTop: Normalize(2)
                    }]}>{timeFunc(item.created_at)}</Text>

                  </View>
              )}
            />
            {!isKeyboardVisible && <View style={{ padding: Normalize(5), marginTop: Normalize(5), backgroundColor: Colors.disableBackGround, flexDirection: "row", alignItems: "center", borderRadius: Normalize(10) }} >
              <Feather name="info" color={Colors.detailsText} size={Normalize(15)} />
              <Text style={[globalstyles.plantext_regular, { color: Colors.detailsText, marginLeft: Normalize(4), width: "90%" }]}>Ask {taskerName}, if you have any query to know!</Text>
            </View>}
          </View>
          <View style={{ marginVertical: Normalize(5), height: Normalize(40), marginHorizontal: Normalize(15), borderWidth: 1, borderColor: Colors.boxBorder, borderRadius: Normalize(10), flexDirection: "row", padding: Normalize(3) }} >
            {!isKeyboardVisible ?
              <Pressable style={{ height: "100%", width: "12%", justifyContent: "center", alignItems: "center", }}
                onPress={onpressAttachButton}>
                <Feather name="paperclip" color={Colors.disableText} size={Normalize(18)} />
              </Pressable>
              :
              <View style={{ width: Normalize(18) }} />
            }
            <View style={{ flex: 1 }} >
              <TextInput
                value={message}
                onChangeText={(e) => setMessage(e)}
                placeholder='enter here'
                style={{ color: Colors.greyText }}
                placeholderTextColor={Colors.grey}
              />
            </View>
            <Pressable
              disabled={(message.length > 0) ? false : true}
              onPress={() => {
                sendMsg(newOfferPageMessageWithTaskerArry[0].id)
                // console.log(newOfferPageMessageWithTaskerArry[0].id)
              }}
              style={{ height: "100%", width: "15%", justifyContent: "center", alignItems: "center", borderLeftColor: Colors.boxBorder, borderLeftWidth: 1 }} >
              <FontAwesome name="send" color={(message.length > 0) ? Colors.secondary : Colors.disableText} size={Normalize(18)} />
            </Pressable>
          </View>
          {!isKeyboardVisible && <View style={{ flexDirection: "row", justifyContent: "space-around", marginHorizontal: Normalize(15), marginBottom: Normalize(5) }} >
            <Button
              onPress={onpressRejectModal}
              name={"Reject Offer"}
              style={{ height: Normalize(38), width: "48%", backgroundColor: Colors.primary }}
            />
            <Button
              onPress={() => setAcceptoffer(!acceptoffer)}
              name={"Accept offer"}
              style={{ height: Normalize(38), width: "48%", backgroundColor: Colors.secondary }}
            />
          </View>
          }
          {loader && <NewLoaderPage />}

          {acceptoffer &&
            <AcceptOfferinProposal
              ispress={acceptoffer}
              onPress={() => setAcceptoffer(!acceptoffer)}
              bid_id={newOfferPageMessageWithTaskerArry[0].id}
              amount={myBidAmount(taskdetailsData.get_bid)}
              taskSlug={taskdetailsData.slug}
              taskerName={taskerName}
            />
          }
          {
            fromWhereModal && <ChoosefromWhereModal />
          }
          {
            image_Chat_Modal &&

            <Modal
              animationType="none"
              transparent={true}
              visible={image_Chat_Modal}
              onRequestClose={() => {
                onPressImageselect()
                setMessage("")
                setMessageSelectedImage("")
              }}
            >
              <View style={{ flex: 1, backgroundColor: Colors.white }} >
                <View style={{ flex: 1, }} >
                  <View style={{ height: Normalize(45), width: "100%", flexDirection: "row", padding: "3%", alignItems: "center" }} >
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
                  <View style={{ marginVertical: Normalize(5), height: Normalize(40), marginHorizontal: Normalize(15), borderWidth: 1, borderColor: Colors.boxBorder, borderRadius: Normalize(10), flexDirection: "row", padding: Normalize(3) }} >
                    {!isKeyboardVisible ?
                      <Pressable style={{ height: "100%", width: "12%", justifyContent: "center", alignItems: "center", }}
                        onPress={onpressAttachButton}>
                        <Feather name="paperclip" color={Colors.disableText} size={Normalize(18)} />
                      </Pressable>
                      :
                      <View style={{ width: Normalize(18) }} />
                    }
                    <View style={{ flex: 1 }} >
                      <TextInput
                        value={message}
                        onChangeText={(e) => setMessage(e)}
                        placeholder='enter here'
                        style={{ color: Colors.greyText }}
                        placeholderTextColor={Colors.grey}
                      />
                    </View>
                    <Pressable
                      disabled={(message.length > 0) ? false : true}
                      onPress={() => {
                        sendMsg(newOfferPageMessageWithTaskerArry[0].id)
                        // console.log(newOfferPageMessageWithTaskerArry[0].id)
                      }}
                      style={{ height: "100%", width: "15%", justifyContent: "center", alignItems: "center", borderLeftColor: Colors.boxBorder, borderLeftWidth: 1 }} >
                      <FontAwesome name="send" color={(message.length > 0) ? Colors.secondary : Colors.disableText} size={Normalize(18)} />
                    </Pressable>
                  </View>
                </View>
              </View>
            </Modal>
          }

          {
            isRejectModal &&
            <WarningPage
              onPress={onpressRejectModal}
              ispress={isRejectModal}
              warningTitle={'Reject this offer'}
              warningSubTitle={'Are you Sure?'}
              okOnpress={rejectOffer}
              cancelOnpress={onpressRejectModal}
              buttonTitle="Continue"
              color={Colors.red_old}
              TopIcon={() => {
                return (
                  <MaterialCommunityIcons
                    name="delete-alert"
                    size={Normalize(30)}
                    color={Colors.white}
                  />
                )
              }}
            />
          }

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  galleryorcamera_icon: {
    height: Normalize(75), width: Normalize(75), borderRadius: Normalize(75) / 2, backgroundColor: Colors.grayf5, marginBottom: Normalize(5), justifyContent: "center", alignItems: "center"
  }
});