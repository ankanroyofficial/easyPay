import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react'
import {
    View, Text, Image, TextInput, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, Pressable, Modal, Linking, TouchableOpacity
} from 'react-native'
import Toast from 'react-native-simple-toast';
import { Colors } from '../../../../constants/colors';
import images from '../../../../constants/images';
import { useNavigation } from "@react-navigation/native"
import moment from 'moment';
import Pusher from 'pusher-js';
import strings from '../../../../constants/lng/LocalizedStrings';
import { myContext } from '../../../../constants/ContextApi';
import Button from "../../../../components/Button"
import { ImageLink } from '../../../../constants/LinkPage';
import axiosInstance from '../../../../constants/AxiosCallPage';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../../../../components/Header';
import { FlatList } from 'react-native';
import { useRef } from 'react';
import UpdateOfferModal from './UpdateOfferModal';
import WarningPage from '../../../../components/WarningPage';
import GuidelinesModal from './GuidelinesModal';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { Fragment } from 'react';
import { apiuriOrPhoneUri } from '../../../../constants/apiuriOrPhoneUri';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { androidCameraPermission } from '../../../../constants/permissions/Permissions';
import { StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { timeFunc } from '../../../../constants/DateShow';
import pusherConfig from './../../../../../pusher.json';
export default function NewOfferPage(props) {
    const { alloffers, taskSlug, posterName, taskTitle, offerDate, photo, isTaxId } = props.route.params
    const navigation = useNavigation()
    const { userId,
        socketId, setSocketId,
        taskdetailsData, setTaskdetailsData,
        newOfferPageMessageArry, setNewOfferPageMessageArry, setNewOfferPageMessageWithTaskerArry,
        cancelOfferSucessModal, setCancelOfferSucessModal,
        makeAnOfferInitialPopupModal, setMakeAnOfferInitialPopupModal, tierData
    } = useContext(myContext)
    const scrollRef = useRef();
    const scrollToEnd = () => scrollRef.current.scrollToEnd({ animated: true });
    const findWhichObject = (val) => {
        try {
            let dummyArr = []
            val.map((item) => {
                if (userId == item.user_id) {
                    idBid = item.id
                    // console.log(">>>>", item.created_at)
                    dummyArr.push({ msg: item.description, msgUserId: item.user_id, id: item.id, updated_details: "N", created_at: item.created_at, })
                    if ((item.get_bid_comment.length != 0)) {
                        (item.get_bid_comment).map((item) => {
                            // console.log("....", item.created_at)
                            dummyArr.push({ msg: item.message, msgUserId: item.user_id, id: item.bid_id, updated_details: item.updated_details, created_at: item.created_at, image: item.image })
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
    const [message, setMessage] = useState("")
    const [updateOfferModal, setUpdateOfferModal] = useState(false);
    const [warningModal, setWarningModal] = useState(false)
    const [isGuidelineModal, setIsGuidelineModal] = useState(false)
    const [fromWhereModal, setFromWhereModal] = useState(false)
    const [messageSelectedImage, setMessageSelectedImage] = useState("")
    const [imageModal, setImageModal] = useState(false);
    const [imageName, setImageName] = useState("");
    const [image_Chat_Modal, setImage_Chat_Modal] = useState(false);


    const getTaskDetails = async () => {
        try {
            const res = {
                "jsonrpc": "2.0",
                "params": {
                    "slug": taskdetailsData.slug
                }
            }
            const data = await axiosInstance.post("get-task-details", res)
            // console.log("data", data.data.result.task)
            if (data.data.result) {
                let a = data.data.result;
                let oldTaskdata = data.data.result.task;

                oldTaskdata.lowest_offers = a.lowest_offers;
                oldTaskdata.highest_offers = a.highest_offers;
                oldTaskdata.nearbyfixeroffer = a.nearbyfixeroffer;
                oldTaskdata.recommended_fixer_sort_based_on_rating = a.recommended_fixer_sort_based_on_rating
                setTaskdetailsData(oldTaskdata)
            }
        } catch (error) {
            console.log("getTaskDetails -newOfferPage", error)
        }
    }



    const onPressImageselect = () => {
        setImage_Chat_Modal(!image_Chat_Modal)
    }
    const onPressImageModal = () => {
        setImageModal(!imageModal)
    }
    const onPressupdateOffer = () => {
        setUpdateOfferModal(!updateOfferModal)
    }
    const onpressAttachButton = () => {
        setFromWhereModal(!fromWhereModal)
    }
    const myBidId = (val) => {
        var a;
        val.map((item) => {
            if (userId == item.get_user.id) {
                a = item.id
            }
        })
        return a
    }
    const myBidAmount = (val) => {
        let a = "";
        val.map((item) => {
            if (userId == item.get_user.id) {
                a = Math.round(item.amount)
            }
        })
        return a
    }
    const withdrawOnpress = () => {
        setWarningModal(!warningModal)
    }


    // console.log(myBidAmount(taskdetailsData.get_bid))

    useEffect(() => {
        if (myBidAmount(taskdetailsData.get_bid) == "") {
            getTaskDetails()
        }
        if (newOfferPageMessageArry.length == 0) {
            setNewOfferPageMessageArry(findWhichObject(alloffers))
            scrollToEnd()
        }
    }, [])
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
    const scrollDown = () => {
        setTimeout(scrollDownFunc, 800);
    }
    const scrollDownFunc = () => {
        scrollToEnd()
    }
    useEffect(() => {
        scrollDown()
    }, [])
    useEffect(() => {
        isloadAferCameBackLoad()
    }, [updateOfferModal]);
    const isloadAferCameBackLoad = async () => {
        try {
            let offerReload = await AsyncStorage.getItem("offerReload")
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
                setTaskdetailsData(oldTaskdata)
                setNewOfferPageMessageArry(findWhichObject(data.data.result.task.get_bid))
                // scrollToEnd()
                await AsyncStorage.removeItem("offerReload")
            }
        } catch (error) {
            console.log("loadAferCameBack - ", error)
        }
    }
    const withdraw = async () => {
        try {
            setLoader(true)
            const data = {
                "jsonrpc": "2.0",
                "params": {
                    "slug": taskdetailsData.slug,
                    "id": myBidId(taskdetailsData.get_bid),
                    "socket_id": socketId == "" ? "7533.23472117" : socketId
                }
            }
            const res = await axiosInstance.post("withdraw-an-offer", data)
            if (res.data.result) {
                withdrawOnpress()
                AsyncStorage.setItem("offerReload", "true")
                setNewOfferPageMessageArry([])
                setLoader(false)
                navigation.goBack()
                setCancelOfferSucessModal(true)
            } else {
                setLoader(false)
                console.log(res.data.error)
                withdrawOnpress()
            }
        } catch (error) {
            console.log("withdraw", error)
            setLoader(false)
        }
    }
    const onpressGuideline = () => {
        setIsGuidelineModal(!isGuidelineModal)
    }
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
                    newOfferPageMessageArry.push({ msg: trimMessage, msgUserId: newOfferPageMessageArry[0].msgUserId, id: val, updated_details: "N", image: img.fileName == undefined ? null : img.uri, created_at: "" })
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
                        newOfferPageMessageArry.pop()
                        newOfferPageMessageArry.push({ msg: res.data.result.message, msgUserId: res.data.result.user_id, id: res.data.result.bid_id, updated_details: res.data.result.updated_details, image: res.data.result.image, created_at: res.data.result.created_at })
                    } else {
                        setLoader(false)
                        Keyboard.dismiss()
                        newOfferPageMessageArry.pop()
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


    const restictedWord = [
        'skype', 'sk ype', 'skipe', 's_k_y_p_e', 'whatsapp', 'discord', 'linkedin',
        'contact details', 'slack', 'phone number', 'phone #', 'phone', 'mobile number',
        'mobile #', 'gmail', 'gm@il', 'g_m_a_i_l', 'outlook', 'ymail', 'mail id', 'mail_id',
        'm@il', 'm_a_i_l', 'imo', 'clubhouse', 'club house', 'telegram', 'tlgram', 'twitter',
        'tweeter', 'upwork.com', 'freelancer.com', 'peopleperhour.com', 'truelancer.com',
        'linkedin.com', 'facebook.com', 'yahoo.com', 'outlook.com']

    const restictedEmail = [
        'upwork.com', 'freelancer.com', 'peopleperhour.com',
        'truelancer.com', 'linkedin.com', 'facebook.com', 'yahoo.com', 'outlook.com'
    ]


    const phoneRegex = (val) => {
        try {
            let regPattern = /^\d{2}\d{2}\d{4}$/;
            return regPattern.test(val);
        } catch (error) {
            console.log("phoneRegex", error)
        }
    }

    const isPhoneNumberPresent = (msg) => {
        try {
            let splitedMsg = msg.split(" ")
            let countnum = 0;
            splitedMsg.map((item) => {
                if (phoneRegex(item)) {
                    countnum = countnum + 1
                }
            })
            return countnum>0?true:false;
        } catch (error) {
            console.log("isPhoneNumberPresent", error)
        }
    }



    const testMsg = () => {
        try {

            let msg = message

            console.log(msg, "   ===> ", isPhoneNumberPresent(msg))


            // let msg = message.split(" ")

            // msg.map((item) => {
            //     console.log(item)
            // })




        } catch (error) {
            console.log("testMsg", error)
        }
    }



    const whatNextModalData = [
        { title: "Discuss general info about the task in this section" },
        { title: "Ask the Client to officially book your service" },
        { title: "Once you have been booked,your payment is reserved" },
        { title: "Go to task location and start work" },
        { title: "After you're done, request your payment and get a review" }
    ]
    const onpressLetsGo = async () => {
        setMakeAnOfferInitialPopupModal(false)
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

    const ImageShowModal = () => (
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



    const getAutoMsgPusher = () => {
        const pusher = new Pusher(pusherConfig.key, pusherConfig);
        let channel = pusher.subscribe("eazypay-development");
    
        channel.bind('bid-reply-event', function (data) {
            loadAferCameBack()
        })
      }
    
      useEffect(() => {
        getAutoMsgPusher()
      }, [])

   return (
        <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>
            <KeyboardAvoidingView
                behavior={(Platform.OS === 'ios') ? "padding" : null} style={{ flex: 1 }}>
                <Header
                    guidelines={() => setIsGuidelineModal(true)}
                    name={"Your offer"} back
                />
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
                                <Text numberOfLines={1} style={[globalstyles.plantext_bold, { width: "84%", fontSize: Normalize(12) }]}>{posterName}</Text>

                                <View style={{ flexDirection: "row", alignItems: "center" }} >
                                    <FontAwesome name="calendar-o" color={Colors.grey} size={Normalize(12)} />
                                    <Text numberOfLines={1} style={[globalstyles.plantext_regular, { marginLeft: Normalize(3), width: "84%", color: Colors.grey, fontSize: Normalize(12) }]}>{offerDate}</Text>
                                </View>
                            </View>
                            <View style={{ paddingHorizontal: Normalize(5), justifyContent: "center", alignItems: "center", borderLeftWidth: 1, borderLeftColor: Colors.secondary }}>
                                <Text style={globalstyles.plantext_bold}>Offer given</Text>
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
                            data={newOfferPageMessageArry}
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
                                        <Text
                                            onPress={() => console.log(item)}
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

                                        {imageModal && imageName == item.image && <ImageShowModal />}
                                    </View>
                            )}
                        />
                        {!isKeyboardVisible && <View style={{ padding: Normalize(5), marginTop: Normalize(5), backgroundColor: Colors.disableBackGround, flexDirection: "row", alignItems: "center", borderRadius: Normalize(10) }} >
                            <Feather name="info" color={Colors.detailsText} size={Normalize(15)} />
                            <Text style={[globalstyles.plantext_regular, { color: Colors.detailsText, marginLeft: Normalize(4), width: "90%" }]}>Ask {posterName} to official book you before you go to location or start work</Text>
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
                                if (newOfferPageMessageArry.length > 0) {

                                    // testMsg()

                                    sendMsg(newOfferPageMessageArry[0].id)
                                } else {
                                    Toast.show("No id")
                                }
                            }}
                            style={{ height: "100%", width: "15%", justifyContent: "center", alignItems: "center", borderLeftColor: Colors.boxBorder, borderLeftWidth: 1 }} >
                            <FontAwesome name="send" color={(message.length > 0) ? Colors.secondary : Colors.disableText} size={Normalize(18)} />
                        </Pressable>
                    </View>
                    {!isKeyboardVisible && <View style={{ flexDirection: "row", justifyContent: "space-around", marginHorizontal: Normalize(15), marginBottom: Normalize(5) }} >
                        <Button
                            onPress={() => setWarningModal(true)}
                            name={"Cancel Offer"}
                            style={{ height: Normalize(38), width: "48%", backgroundColor: Colors.primary }}
                        />
                        <Button
                            onPress={onPressupdateOffer}
                            name={"Edit Price"}
                            style={{ height: Normalize(38), width: "48%", backgroundColor: Colors.secondary }}
                        />
                    </View>
                    }
                    {updateOfferModal &&
                        <UpdateOfferModal
                            ispress={updateOfferModal}
                            onPress={onPressupdateOffer}
                            taskSlugname={taskdetailsData.slug}
                            taskOfferamount={myBidAmount(taskdetailsData.get_bid)}
                            taskOfferId={myBidId(taskdetailsData.get_bid)}
                            tierData={tierData}
                            isTaxId={isTaxId}
                        />
                    }
                    {
                        warningModal &&
                        <WarningPage
                            buttonDisable={loader}
                            onPress={withdrawOnpress}
                            ispress={warningModal}
                            warningTitle={'Cancel offer'}
                            warningSubTitle={'Are you sure you want to cancel the offer?'}
                            okOnpress={withdraw}
                            cancelOnpress={withdrawOnpress}
                            buttonTitle={"Continue"}
                            TopIcon={() => {
                                return (
                                    <FontAwesome
                                        name="trash"
                                        size={Normalize(30)}
                                        color={Colors.white}
                                    />
                                )
                            }}
                        />
                    }
                    {isGuidelineModal &&
                        <GuidelinesModal
                            ispress={isGuidelineModal}
                            onpress={onpressGuideline}
                        />
                    }

                    {makeAnOfferInitialPopupModal && <Modal
                        visible={makeAnOfferInitialPopupModal}
                        transparent
                        onRequestClose={onpressLetsGo}
                    >
                        <View style={{ backgroundColor: Colors.transparent, flex: 1, justifyContent: "center", alignItems: "center" }} >
                            <View style={{ padding: Normalize(20), width: "80%", backgroundColor: Colors.white, elevation: 10, borderRadius: Normalize(8) }} >
                                <Fragment>
                                    <View style={{ alignItems: "center" }}>
                                        <View style={{
                                            height: Normalize(60), width: Normalize(60), backgroundColor: Colors.white, marginTop: Normalize(-50),
                                            borderRadius: Normalize(30), alignItems: 'center', justifyContent: 'center'
                                        }}>
                                            <View style={{
                                                height: Normalize(50), width: Normalize(50), backgroundColor: Colors.secondary,
                                                borderRadius: Normalize(25), alignSelf: 'center', justifyContent: 'center', alignItems: 'center'
                                            }} >
                                                <Fontisto name="info" color={Colors.white} size={Normalize(32)} />
                                            </View>
                                        </View>
                                        <View style={{ width: "100%", alignItems: "center" }} >
                                            <Text style={[globalstyles.page_Header_Text, { fontSize: Normalize(17) }]} >What's next?</Text>

                                            <View style={{ width: "100%", paddingHorizontal: Normalize(4), paddingTop: Normalize(10) }}>
                                                {
                                                    whatNextModalData.map((item, index) => {
                                                        return (
                                                            <View key={index} style={{ flexDirection: "row", marginBottom: Normalize(8) }} >
                                                                <Text style={[globalstyles.plantext_regular, { fontSize: Normalize(13), color: Colors.greylightText, textAlign: "left", lineHeight: Normalize(14), paddingRight: Normalize(6) }]} >{index + 1}.</Text>
                                                                <Text style={[globalstyles.plantext_regular, { fontSize: Normalize(13), color: Colors.greylightText, textAlign: "left", lineHeight: Normalize(14) }]} >{item.title}</Text>
                                                            </View>
                                                        )
                                                    })
                                                }
                                                <Button
                                                    onPress={onpressLetsGo}
                                                    style={{ width: "70%", alignSelf: "center", marginTop: Normalize(8), backgroundColor: Colors.primary }} name={"Let's go!"} />
                                            </View>

                                        </View>
                                    </View>
                                </Fragment>
                            </View>
                        </View>
                    </Modal>}

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
                                                sendMsg(newOfferPageMessageArry[0].id)
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