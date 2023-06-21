import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import {
    View, Text, Modal, ScrollView, Image, TouchableOpacity, TextInput,
    StyleSheet, Dimensions, RefreshControl, ActivityIndicator, Keyboard, SafeAreaView,
    KeyboardAvoidingView,
    Platform
} from 'react-native'
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import Toast from 'react-native-simple-toast';
import { Colors } from '../../../../constants/colors';
import images from '../../../../constants/images';
import strings from '../../../../constants/lng/LocalizedStrings';
import { axiosUrl, ImageLink } from '../../../../constants/LinkPage';
import { questionEnglishTimeShow, questionPersianTimeShow } from '../../../../constants/DateShow';
import PaymentRequiredModal from './PaymentRequiredModal';
import { numberWithCommas, numberWithCommasinParsian } from '../../../../constants/NumberWithComma';
import { engToPersian } from '../../../../constants/EnglishToPersian';
import { nameShorting } from '../../../../constants/NameShorting';
import { isInt, lastStar, reviewShowinGraystar, reviewShowinStar } from '../../../../constants/RatingCount';
import Pusher from 'pusher-js';
import pusherConfig from './../../../../../pusher.json';
import { myContext } from '../../../../constants/ContextApi';
import axiosInstance from '../../../../constants/AxiosCallPage';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
const { height, width } = Dimensions.get("window")

function ReviewOfferModal({ ispress, onPress, taskSlugname, value, taskData, setTaskData, show, userid, slug }) {
    const offer = value;
    const scrollView = useRef();
    const scrollViewRef = useRef();

    const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
    const { token, socketId, setSocketId } = useContext(myContext);

    const [slugName, setSlugName] = useState("")
    const [itemId, setItemId] = useState()
    const [message, setMessage] = useState("")
    const [refreshing, setRefreshing] = React.useState(false);
    const [paymentRequired, setPaymentRequired] = React.useState(false);
    const [sendButtonLoader, setSendButtonLoader] = useState(false)
    // const [socketId, setSocketId] = React.useState("")
    const [index, setIndex] = React.useState(0)
    const [messageLengthExtend, setMessageLengthExtend] = useState({
        id: 0,
        extend: false
    })
    const [func, setFunc] = useState(false)

    const toNextPage = () => {
        const idx = index + 1
        // Toast.show(`next button ${idx}`)
        // setIndex(index + 1)
        if (scrollViewRef.current != null) {
            scrollViewRef.current.scrollTo({ x: idx * width, y: 0, animated: true });
        }
        setIndex(idx)
    };
    const toPreviousPage = () => {
        const idx = index - 1
        // Toast.show(`previous button ${index}`)
        if (scrollViewRef.current != null) {
            scrollViewRef.current.scrollTo({ x: idx * width, y: 0, animated: true });
        }
        setIndex(idx)
    };
    const [descriptionLengthExtend, setDescriptionLengthExtend] = useState({
        id: 0,
        extend: false
    })
    const onPresspaymentRequired = () => {
        setPaymentRequired(!paymentRequired)
    }
    const getData = async () => {
        try {
            setFunc(true)
            const res = {
                "jsonrpc": "2.0",
                "params": {
                    "slug": show
                }
            }
            const data = await axiosInstance.post("get-task-details", res)
            if (data.data.result) {
                setTaskData(data.data.result.task)
                setFunc(false)
            }
        } catch (error) {
            console.log("error2", error)
            setFunc(false)
        }
    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getData()
        setRefreshing(false)
    }, []);
    useEffect(() => {
        getSocketId()
        getAllData()
    }, [ispress, show]);
    const sendBotton = async (val) => {
        try {
            if (message.length == 0 || message.trim() == "") {
                Toast.show(strings.ERROR.ATFIRSTENTERMSG)
            } else {
                if (message.length > 1000) {
                    Toast.show(strings.ERROR.ENTERMAX1000MSG)
                } else {
                    setSendButtonLoader(true)
                    const trimMessage = message.trim()
                    setMessage("")
                    Keyboard.dismiss()


                    const data = {
                        "jsonrpc": "2.0",
                        "params": {
                            "slug": slug,
                            "bid_id": val,
                            "message": trimMessage,
                            "socket_id": socketId == "" ? "7533.23472117" : socketId
                        }
                    }
                    const res = await axiosInstance.post("send-offer-reply", data)

                    if (res.data.result) {
                        getData()
                        Toast.show(strings.ERROR.MSGSEND)
                        onPress()
                        setSendButtonLoader(false)
                    } else {
                        Toast.show(res.data.error.meaning)
                        setSendButtonLoader(false)
                    }
                }
            }
        } catch (error) {
            console.log("error", error)
            setSendButtonLoader(false)
        }
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
        pusher.connection.bind("connected", () => {
            var socketid = pusher.connection.socket_id;
            setSocketId(socketid)
        });
        channel.bind('question-event', function (data) {
            func ? null : getData()
        })
        channel.bind('bid-apply-event', function (data) {
            if (data) {
                func ? null : getData()
            }
        })
        channel.bind('bid-withdraw-event', function (data) {
            if (data) {
                func ? null : getData()
            }
        })
        channel.bind('bid-update-event', function (data) {
            if (data) {
                func ? null : getData()
            }
        })
        channel.bind('bid-reply-event', function (data) {
            if (data) {
                func ? null : getData()
            }
        })
        channel.bind('task-assign-event', function (data) {
            if (data) {
                func ? null : getData()
            }
        })
    }
    const assigneeeDescriptionReadMore = (val) => {
        if (descriptionLengthExtend.id == val && descriptionLengthExtend.extend == true) {
            setDescriptionLengthExtend({ id: val, extend: false })
        } else {
            setDescriptionLengthExtend({ id: val, extend: true })
        }
    }
    const assigneeeReplyReadMore = (val) => {
        if (messageLengthExtend.id == val && messageLengthExtend.extend == true) {
            setMessageLengthExtend({ id: val, extend: false })
        } else {
            setMessageLengthExtend({ id: val, extend: true })
        }
    }
    // console.log("...............",offer)
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={ispress}
            onRequestClose={() => {
                onPress()
                setIndex(0)
            }}
        >
            <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(52,52,52,0.5)" }}>

                <KeyboardAvoidingView
                    behavior={(Platform.OS === 'ios') ? "padding" : null} style={{ flex: 1, backgroundColor: "rgba(52,52,52,0.5)" }} >

                    <View style={{ height: height * 0.07, width: "100%", flexDirection: language == "en" ? "row" : "row-reverse", justifyContent: "space-between", alignItems: "center", borderBottomColor: "#E8E8E8", borderBottomWidth: 1, backgroundColor: Colors.primary }}>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                            <Text style={{
                                fontSize: Normalize(14),
                                fontFamily: 'roboto-bold',
                                color: Colors.white
                            }}>{strings.MAKEANOFFER.OFFERCHAT} ({`${language == "en" ? (index + 1) + "/" + value.length : engToPersian(index + 1) + "/" + engToPersian(value.length)}`})</Text>
                        </View>
                        <TouchableOpacity activeOpacity={0.5}
                            onPress={() => {
                                onPress()
                                setIndex(0)
                            }}
                            style={{ height: Normalize(50), width: Normalize(50), justifyContent: "center", alignItems: "center" }}  >
                            <Image source={images.cross} style={{ height: Normalize(12), width: Normalize(12), resizeMode: "contain" }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "row" }} >
                        <ScrollView
                            ref={scrollViewRef}
                            nestedScrollEnabled={true}
                            horizontal={true}
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            keyboardShouldPersistTaps="always"
                            // onMomentumScrollEnd={_onScrollEnd}
                            scrollEnabled={false}
                        >
                            {
                                offer.map((item, index) => (
                                    <View key={index} style={{ width: width, marginBottom: Normalize(20) }} >
                                        <ScrollView
                                            refreshControl={
                                                <RefreshControl
                                                    refreshing={refreshing}
                                                    onRefresh={onRefresh}
                                                />
                                            }
                                            ref={scrollView}
                                            nestedScrollEnabled={true} showsVerticalScrollIndicator={false}  >
                                            <View style={{ flexDirection: 'column', paddingHorizontal: 15, backgroundColor: '#ffffff', borderRightColor: "#E8E8E8", borderRightWidth: 1, marginBottom: Normalize(10) }}>
                                                {
                                                    offer.length > 1 ?
                                                        <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", marginBottom: Normalize(10), marginVertical: Normalize(5), alignItems: "center" }} >

                                                            {index > 0 ?
                                                                <TouchableOpacity
                                                                    onPress={() => toPreviousPage()}
                                                                    style={{ height: Normalize(22), width: Normalize(22) }}  >
                                                                    <Image
                                                                        style={{ width: "100%", height: "100%", resizeMode: "contain" }}
                                                                        source={images.arrowleftblack}
                                                                    />
                                                                </TouchableOpacity>
                                                                :
                                                                <View style={{ height: Normalize(22), width: Normalize(22) }}  >
                                                                    <Image
                                                                        style={{ width: "100%", height: "100%", resizeMode: "contain" }}
                                                                        source={images.arrowleftgrey}
                                                                    />
                                                                </View>
                                                            }
                                                            <View style={{ flex: 1, flexDirection: language == "en" ? "row" : "row-reverse", alignItems: "center", justifyContent: "space-evenly" }} >
                                                                <View style={{ flexDirection: 'row' }}>
                                                                    <Text style={{ color: Colors.greyText, marginLeft: 2, fontFamily: 'roboto-bold', fontSize: Normalize(12), paddingHorizontal: Normalize(2) }}>{strings.BROWSEFILTER.TOMAN}</Text>
                                                                    <Text style={{ color: Colors.greyText, marginLeft: 2, fontFamily: 'roboto-bold', fontSize: Normalize(12) }}>{language == "en" ? numberWithCommas(Math.round(item.amount)) : engToPersian(numberWithCommasinParsian(Math.round(item.amount)))}</Text>
                                                                </View>
                                                                {
                                                                    userid == taskData.user_id &&
                                                                    <TouchableOpacity
                                                                        onPress={() => {
                                                                            setItemId(item.id)
                                                                            onPresspaymentRequired()
                                                                        }}
                                                                        style={{ height: Normalize(24), width: Normalize(80), backgroundColor: "#7db343", borderRadius: 10, justifyContent: "center", alignItems: "center" }} >
                                                                        <Text style={{
                                                                            color: Colors.white,
                                                                            fontSize: Normalize(12),
                                                                            fontFamily: 'roboto-medium',
                                                                        }} >{strings.MAKEANOFFER.ACCEPTOFFER}</Text>
                                                                    </TouchableOpacity>
                                                                }
                                                                {
                                                                    item.id == itemId && paymentRequired &&
                                                                    <PaymentRequiredModal
                                                                        ispress={paymentRequired}
                                                                        onPress={onPresspaymentRequired}
                                                                        name={nameShorting(item.get_user.fname + " " + item.get_user.lname)}
                                                                        imageName={item.get_user.profile_picture}
                                                                        taskTitle={taskData.title}
                                                                        bid_id={item.id}
                                                                        taskSlugname={taskSlugname}
                                                                        reviewModal={onPress}
                                                                    />
                                                                }
                                                            </View>
                                                            {
                                                                index != (offer.length - 1) ?
                                                                    <TouchableOpacity
                                                                        onPress={() => toNextPage()}
                                                                        style={{ height: Normalize(22), width: Normalize(22) }} >
                                                                        <Image
                                                                            style={{ width: "100%", height: "100%", resizeMode: "contain" }}
                                                                            source={images.arrowrightblaack}
                                                                        />
                                                                    </TouchableOpacity>
                                                                    :
                                                                    <View style={{ height: Normalize(22), width: Normalize(22) }} >
                                                                        <Image
                                                                            style={{ width: "100%", height: "100%", resizeMode: "contain" }}
                                                                            source={images.arrowrightgrey}
                                                                        />
                                                                    </View>
                                                            }
                                                        </View> :
                                                        <View style={{ height: Normalize(27), width: "100%", flexDirection: "row", marginBottom: Normalize(5) }} >
                                                            <View style={{ height: Normalize(27), width: Normalize(27) }} />
                                                            <View style={{ flex: 1, flexDirection: language == "en" ? "row" : "row-reverse", alignItems: "center", justifyContent: "space-evenly" }} >
                                                                <View style={{ flexDirection: 'row' }}>
                                                                    <Text style={{ color: Colors.greyText, marginLeft: 2, fontFamily: 'roboto-bold', fontSize: Normalize(12), paddingHorizontal: Normalize(2) }}>{strings.BROWSEFILTER.TOMAN}</Text>
                                                                    <Text style={{ color: Colors.greyText, marginLeft: 2, fontFamily: 'roboto-bold', fontSize: Normalize(12) }}>{language == "en" ? numberWithCommas(Math.round(item.amount)) : engToPersian(numberWithCommasinParsian(Math.round(item.amount)))}</Text>
                                                                </View>
                                                                {
                                                                    userid == taskData.user_id &&
                                                                    <TouchableOpacity
                                                                        onPress={() => {
                                                                            // console.log(item)
                                                                            setItemId(item.id)
                                                                            onPresspaymentRequired()
                                                                        }}
                                                                        style={{ height: Normalize(24), width: Normalize(80), backgroundColor: "#7db343", borderRadius: 10, justifyContent: "center", alignItems: "center" }} >
                                                                        <Text style={{
                                                                            color: Colors.white,
                                                                            fontSize: Normalize(12),
                                                                            fontFamily: 'roboto-medium',
                                                                        }} >{strings.MAKEANOFFER.ACCEPTOFFER}</Text>
                                                                    </TouchableOpacity>
                                                                }
                                                                {paymentRequired && <PaymentRequiredModal
                                                                    ispress={paymentRequired}
                                                                    onPress={onPresspaymentRequired}
                                                                    name={item.get_user.fname + " " + item.get_user.lname}
                                                                    imageName={item.get_user.profile_picture}
                                                                    taskTitle={taskData.title}
                                                                    bid_id={item.id}
                                                                    taskSlugname={taskSlugname}
                                                                    reviewModal={onPress}
                                                                />}
                                                            </View>
                                                            <View style={{ height: Normalize(27), width: Normalize(27) }} />
                                                        </View>
                                                }
                                                <View style={{ flexDirection: language == "pr" ? 'row-reverse' : "row" }}>
                                                    <View style={{ flexDirection: language == "pr" ? 'row-reverse' : "row" }}>
                                                        <View style={{ width: Normalize(50), height: Normalize(50), borderRadius: Normalize(50) / 2, overflow: "hidden" }} >
                                                            <Image style={{ height: "100%", width: "100%", resizeMode: "cover" }}
                                                                source={{ uri: item.get_user.profile_picture ? ImageLink.ProfilePhoto + `${item.get_user.profile_picture}` : ImageLink.BlankProfileImage }}
                                                            />
                                                        </View>
                                                        <View style={{ flexDirection: 'column', marginHorizontal: 15 }}>
                                                            <Text style={{ color: Colors.primary, marginHorizontal: 2, fontFamily: 'roboto-bold', fontSize: Normalize(12), textAlign: language == "en" ? "left" : "right" }}>{nameShorting(item.get_user.fname + " " + item.get_user.lname)}</Text>
                                                            <View style={{ flexDirection: language == "pr" ? 'row-reverse' : "row", alignItems: "center" }} >
                                                                <Text style={{ color: '#818181', marginHorizontal: 2, fontFamily: 'roboto-regular', fontSize: Normalize(11), marginTop: 3 }}>{item.get_user.get_country_info.name}</Text>
                                                                <View style={{ height: Normalize(11), width: 1, backgroundColor: "#818181", marginHorizontal: "5%", opacity: .8 }} />
                                                                <View style={{ flexDirection: language == "pr" ? 'row-reverse' : "row", marginVertical: Normalize(5) }}>
                                                                    <Image
                                                                        style={{ width: 13, height: 13, opacity: .8, alignSelf: 'center' }}
                                                                        source={images.clockIcon}
                                                                        resizeMode="contain" />
                                                                    <Text style={{
                                                                        color: "#818181", marginHorizontal: 8, fontFamily: 'roboto-regular', fontSize: Normalize(11),
                                                                        alignSelf: 'center',
                                                                    }}>
                                                                        {language == "en" ?
                                                                            questionEnglishTimeShow(item.created_at) : questionPersianTimeShow(item.created_at)
                                                                        }
                                                                    </Text>
                                                                </View>
                                                            </View>
                                                            <View style={{ flexDirection: language == "pr" ? 'row-reverse' : "row", alignItems: "center" }}>
                                                                {
                                                                    reviewShowinStar(item.get_user.avg_review_as_tasker).map((item, index) => (
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
                                                                    reviewShowinGraystar(reviewShowinStar(item.get_user.avg_review_as_tasker)).map((item, index) => (
                                                                        <View key={index} style={{ height: Normalize(10), width: Normalize(10), marginHorizontal: Normalize(0.5) }} >
                                                                            <Image source={images.stargray} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                                                        </View>
                                                                    ))
                                                                }
                                                                <Text style={{ color: '#818181', marginLeft: 2, fontFamily: 'roboto-regular', fontSize: Normalize(11) }}>({language == "en" ? item.get_user.tot_review_as_tasker : engToPersian(item.get_user.tot_review_as_tasker)})</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                                <View style={{ marginLeft: language == "pr" ? 0 : 75, marginRight: language == "pr" ? 75 : 0 }} >
                                                    <Text
                                                        numberOfLines={descriptionLengthExtend.id == item.id && descriptionLengthExtend.extend ? 1000 : 3}
                                                        style={[
                                                            styles.textcategory22,
                                                            language == 'pr'
                                                                ? { ...RtlStyles.textInverse }
                                                                : { ...RtlStyles.text },
                                                        ]}>
                                                        {item.description}</Text>

                                                    {(item.description).length > 100 && <Text
                                                        onPress={() => {
                                                            assigneeeDescriptionReadMore(item.id)
                                                        }
                                                        } style={{ fontSize: 12, fontFamily: 'roboto-regular', color: descriptionLengthExtend.id == item.id && descriptionLengthExtend.extend ? Colors.secondary : Colors.primary, textAlign: language == "en" ? "left" : "right", marginVertical: "2%" }}>
                                                        {descriptionLengthExtend.id == item.id && descriptionLengthExtend.extend ? strings.POSTTASK.READLESS : strings.POSTTASK.READMORE}
                                                    </Text>
                                                    }
                                                </View>
                                                {
                                                    item.get_bid_comment.map((childItem, childIndex) => (
                                                        <View key={childIndex}  >
                                                            <View style={{ paddingVertical: Normalize(8), flexDirection: language == "en" ? 'row' : "row-reverse", marginLeft: Normalize(50), paddingRight: Normalize(10) }}>
                                                                <View style={{ flex: 1, alignItems: "center" }}>
                                                                    <View style={{ height: Normalize(33), width: Normalize(33), borderRadius: Normalize(33) / 2, backgroundColor: "#f5f5f5", overflow: "hidden" }}>
                                                                        <Image style={{ width: "100%", height: "100%", resizeMode: "cover" }}
                                                                            // source={{ uri: ImageLink.ProfilePhoto + `${childItem.get_user.profile_picture}` }}
                                                                            source={{ uri: childItem.get_user.profile_picture ? ImageLink.ProfilePhoto + `${childItem.get_user.profile_picture}` : ImageLink.BlankProfileImage }}

                                                                        />
                                                                    </View>
                                                                </View>
                                                                <View style={{ flex: 4, }}>
                                                                    <View style={{ flex: 2.5 }}>
                                                                        <View style={{ flexDirection: language == "en" ? "row" : "row-reverse", alignItems: "center" }} >
                                                                            <Text numberOfLines={1} style={{
                                                                                color: Colors.primary, fontFamily: 'roboto-bold',
                                                                                fontSize: Normalize(12), textAlign: language == "pr" ? "right" : "left"
                                                                            }}>{nameShorting(childItem.get_user.fname + " " + childItem.get_user.lname)}</Text>
                                                                            {
                                                                                childItem.get_user.slug == taskData.get_user.slug &&
                                                                                <View style={{ paddingVertical: Normalize(1.5), paddingHorizontal: Normalize(2), backgroundColor: Colors.primary, marginHorizontal: Normalize(2), borderRadius: 15, justifyContent: "center", alignItems: "center" }} >
                                                                                    <Text style={{
                                                                                        color: Colors.white, fontFamily: 'roboto-bold',
                                                                                        fontSize: language == "en" ? Normalize(6) : Normalize(7)
                                                                                    }}>{strings.MAKEANOFFER.POSTER}</Text>
                                                                                </View>
                                                                            }
                                                                        </View>
                                                                        <Text
                                                                            numberOfLines={messageLengthExtend.id == childItem.id && messageLengthExtend.extend ? 1000 : 3}
                                                                            style={{
                                                                                color: '#818181', fontFamily: 'roboto-regular', lineHeight: 20,
                                                                                fontSize: Normalize(10), textAlign: language == "en" ? "left" : "right"
                                                                            }}>{childItem.message}</Text>
                                                                        {(childItem.message).length > 100 && <Text
                                                                            onPress={() => {
                                                                                assigneeeReplyReadMore(childItem.id)
                                                                            }}
                                                                            style={{ fontSize: 12, fontFamily: 'roboto-regular', color: messageLengthExtend.id == childItem.id && messageLengthExtend.extend ? Colors.secondary : Colors.primary, textAlign: language == "en" ? "left" : "right", marginVertical: "2%" }}>
                                                                            {messageLengthExtend.id == childItem.id && messageLengthExtend.extend ? strings.POSTTASK.READLESS : strings.POSTTASK.READMORE}
                                                                        </Text>
                                                                        }

                                                                        <View style={{ marginVertical: Normalize(4) }}>
                                                                            <Text numberOfLines={1} style={{
                                                                                color: "#818181", fontFamily: 'roboto-medium', fontSize: Normalize(10), textAlign: language == "en" ? "left" : "right"
                                                                            }}>
                                                                                {language == "en" ?
                                                                                    questionEnglishTimeShow(childItem.created_at) : questionPersianTimeShow(childItem.created_at)
                                                                                }
                                                                            </Text>
                                                                        </View>
                                                                        <View style={{ width: "100%", alignItems: language == "en" ? "flex-start" : "flex-end" }} >
                                                                            {
                                                                                childItem.filename &&
                                                                                <>
                                                                                    <TouchableOpacity
                                                                                        onPress={() => {
                                                                                            setQuestionFileName(childItem.filename)
                                                                                            setQuestionImage(!questionImage)
                                                                                        }}
                                                                                        activeOpacity={1}
                                                                                        style={{ height: Normalize(60), width: Normalize(100), backgroundColor: "#f5f5f5", borderRadius: 4, overflow: "hidden" }} >
                                                                                        <Image
                                                                                            source={{ uri: ImageLink.Question + `${childItem.filename}` }}
                                                                                            style={{ height: "100%", width: "100%", resizeMode: "cover" }}
                                                                                        />
                                                                                    </TouchableOpacity>
                                                                                    <ImageModal Onpress={imageOnpress} filename={questionFileName} questionImage={questionImage} />
                                                                                </>
                                                                            }
                                                                        </View>
                                                                    </View>
                                                                </View>

                                                            </View>
                                                        </View>
                                                    ))
                                                }
                                                {/* <View style={{ height: Normalize(135), width: "100%", borderColor: Colors.grey, borderWidth: 0.5, borderRadius: 5, paddingHorizontal: Normalize(5), marginTop: Normalize(10) }} > */}
                                                <TextInput
                                                    value={message}
                                                    multiline
                                                    placeholder={strings.MAKEANOFFER.TYPEYOURMSG}
                                                    style={globalstyles.multiline_textinputStyle}
                                                    onChangeText={(e) => setMessage(e)}
                                                    onSubmitEditing={() => { Keyboard.dismiss() }} />


                                                {/* </View> */}
                                                <TouchableOpacity
                                                    disabled={sendButtonLoader ? true : false}
                                                    onPress={() => sendBotton(item.id)}
                                                    style={{ height: Normalize(38), width: "100%", backgroundColor: Colors.secondary, borderRadius: 10, justifyContent: "center", alignItems: "center", alignSelf: "center", marginVertical: Normalize(10), marginBottom: Normalize(20) }} >

                                                    {
                                                        sendButtonLoader ?
                                                            <ActivityIndicator
                                                                size="large"
                                                                color={Colors.white}
                                                            /> :
                                                            <Text style={{
                                                                color: Colors.white,
                                                                fontSize: Normalize(14),
                                                                fontFamily: 'roboto-medium',
                                                            }} >{strings.MAKEANOFFER.SEND}</Text>
                                                    }
                                                </TouchableOpacity>
                                            </View>
                                        </ScrollView>
                                    </View>
                                ))
                            }
                        </ScrollView>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </Modal>
    )
}
export default withRtl(ReviewOfferModal);


const styles = StyleSheet.create({
    textcategory22: {
        fontSize: 12,
        fontFamily: 'roboto-regular',
        color: '#818181',
        lineHeight: 18
    },
    iconStyle: {
        width: Normalize(22),
        height: Normalize(22),
        marginHorizontal: Normalize(5),
        alignSelf: 'center',
        marginRight: 8

    }
});





