import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import {
    View, Text, Modal, ScrollView, Image, TouchableOpacity, TextInput,
    ActivityIndicator, Keyboard, SafeAreaView, Alert, KeyboardAvoidingView, Platform
} from 'react-native'
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Colors } from '../../../../constants/colors';
import images from '../../../../constants/images';
import { useNavigation } from "@react-navigation/native"
import strings from '../../../../constants/lng/LocalizedStrings';
import Button from "../../../../components/Button"
import { numberWithCommas, numberWithCommasinParsian } from '../../../../constants/NumberWithComma';
import { axiosUrl, ImageLink } from '../../../../constants/LinkPage';
import { WebView } from 'react-native-webview';
import Toast from 'react-native-simple-toast';
import LoaderPage from '../../../../components/LoaderPage';
import { engToPersian } from '../../../../constants/EnglishToPersian';
import { myContext } from '../../../../constants/ContextApi';
import { nameShorting } from '../../../../constants/NameShorting';
import { leftOrRight, rowOrRowreverse } from '../../../../constants/RowOrRowreverse';
import axiosInstance from '../../../../constants/AxiosCallPage';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
function PaymentRequiredModal({ ispress, onPress, name, imageName, taskTitle, taskSlugname, bid_id }) {
    const webref = useRef()
    const navigation = useNavigation()
    const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
    const { socketId } = useContext(myContext);
    const [payblabe_amount, setPayblabe_amount] = useState(0)
    const [total_amount, setTotal_amount] = useState(0)
    const [fees, setFees] = useState("")
    const [offer_amt, setOffer_amt] = useState(0)
    const [payment_method, setPayment_method] = useState("")
    const [ispaymentgateway, setIsPaymentgateway] = React.useState(false);
    const [apiUrl, setApiUri] = useState("")
    const [loader, setLoader] = useState(false)
    const [amountDetails, setAmountDetails] = useState("")
    const [modalChange, setModalChange] = useState("")

    const [mainquestionSelectedImage, setMainquestionSelectedImage] = useState("")
    const [questionButtonLoader, setQuestionButtonLoader] = React.useState(false);
    const [message, setMessage] = React.useState("");

    const renderLoadingView = () => {
        return (
            <View style={{
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                position: "absolute"
            }} >
                <LoaderPage />
            </View>
        );
    }
    const onNavigationStateChangeHandle = async ({ url }) => {
        console.log("url**************", url)

        if (url == `${axiosUrl.URL}payment-fail`) {
            onPressPamentGetWay()
            if (Platform.OS == "ios") {
                Alert.alert(
                    "Fail!",
                    "Payment Failed",
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
            }
        } else if (url == `${axiosUrl.URL}payment-cancel`) {
            onPressPamentGetWay()
            if (Platform.OS == "ios") {
                Alert.alert(
                    "Cancel!",
                    "Payment Cancelled",
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
            }
        } else if (url == `${axiosUrl.URL}payment-success`) {
            onPress()
            setIsPaymentgateway(!ispaymentgateway)
            // await AsyncStorage.setItem("isMyTaskloader", "true")
            // await AsyncStorage.setItem("isBrowserTaskloader", "true")
            if (Platform.OS == "ios") {
                Alert.alert(
                    "Success!",
                    "Payment Done Sucessfully",
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
            } else {
                Toast.show(strings.ERROR.SUCCESSFULLYTASKASSIGNED)
            }
        } else if (url == `${axiosUrl.URL}payment-in-progress`) {
            onPress()
            setIsPaymentgateway(!ispaymentgateway)
            if (Platform.OS == "ios") {
                Alert.alert(
                    "Success!",
                    "Payment in progress",
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
            } else {
                Toast.show("Payment in progress")
            }
        } else if (is_checkLast_word_paymentreturnurl(url)) {
            getOfferData()
        } else if (checkLast_word(url)) {
            onPress()
            setIsPaymentgateway(!ispaymentgateway)
            await AsyncStorage.setItem("isMyTaskloader", "true")
            await AsyncStorage.setItem("isBrowserTaskloader", "true")
            Toast.show(strings.ERROR.SUCCESSFULLYTASKASSIGNED)
            if (Platform.OS == "ios") {
                Alert.alert(
                    "Success!",
                    "Payment Done Sucessfully",
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
            }
        } else {
            console.log("else url.............", url)
        }
    }
    const checkLast_word = (get_url) => {
        var splitUrl = get_url.split("/")
        var lastWord = splitUrl[splitUrl.length - 1]
        if (lastWord == "completed") {
            return true
        } else {
            return false
        }
    }
    const is_checkLast_word_paymentreturnurl = (get_url) => {
        var splitUrl = get_url.split("/")
        var lastWord = splitUrl[splitUrl.length - 1]
        console.log("lastWord``````````````````````````````````````", lastWord)
        if (lastWord == "payment-return-url") {
            return true
        } else {
            return false
        }
    }

    // https://changicourt.com/dev/api/payment-return-url?reference=96d4f011-ed5e-48cc-8a7a-45dc4ca09b0d&status=completed

    // https://securecheckout.sandbox.hit-pay.com/payment-request/96d4d838-f449-4815-b018-d9aa662e9632/completed

    const selectImageForMsg = () => {
        launchImageLibrary({ mediaType: "photo" }, (response) => {
            if (response.didCancel) {
                // console.log('User cancelled image picker');
            } else if (response.error) {
                // console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                // console.log('User tapped custom button: ', response.customButton);
            } else {
                // console.log(response.assets[0])
                setMainquestionSelectedImage(response.assets[0])
            }
        })
    }
    useEffect(() => {
        getOfferData()
        // const willFocusSubscription = navigation.addListener('focus', () => {
        //     getOfferData()
        // });
        // return willFocusSubscription;
    }, [ispress]);
    const getOfferData = async () => {
        try {
            const data = {
                "jsonrpc": "2.0",
                "params": {
                    "bid_id": bid_id
                }
            }
            const res = await axiosInstance.post("get-offer-payment-details", data)
            console.log("getOfferData..................",bid_id, res.data)
            if (res.data.jsonrpc) {
                setAmountDetails(res.data)
                setPayblabe_amount(res.data.payblabe_amount)
                setTotal_amount(res.data.total_amount)
                setFees(Math.round(res.data.fees))
                setPayment_method(res.data.payment_type)
                setOffer_amt(Math.round(res.data.offer_amt))
            }
        } catch (error) {
            console.log(error)
        }
    }
    const onPressPamentGetWay = () => {
        if (ispaymentgateway === true) {
            setIsPaymentgateway(false)
            setLoader(false)
            Toast.show(strings.ERROR.PAYMENTCANCEL)
        } else {
            setIsPaymentgateway(!ispaymentgateway)
        }
    }
    const SecurelyholdpaymentBotton = async () => {
        try {
            setLoader(true)
            if (payment_method != "") {
                const data = {
                    "params": {
                        "slug": taskSlugname,
                        "id": bid_id,
                        "offer_amt": offer_amt,
                        "socket_id": socketId == "" ? "7533.23472117" : socketId,
                        "fees": fees,
                        "payment_method": payment_method,
                        "payable_amt": payblabe_amount
                    }
                }
                const res = await axiosInstance.post("accept-Offer", data)
                // alert("Document Status:" + JSON.stringify(res.data))
                console.log("SecurelyholdpaymentBotton........", res.data)
                if (res.data.redirect_url) {
                    setApiUri(res.data.redirect_url)
                    setLoader(false)
                    onPressPamentGetWay()
                } else {
                    if (res.data.result) {
                        Toast.show(res.data.result.status.meaning)
                        setLoader(false)
                        // onPress()
                        setModalChange("itsofficial")

                    } else {
                        if (res.data.error.message.meaning) {
                            Toast.show(res.data.error.message.meaning)
                            setLoader(false)
                            onPress()
                        } else {
                            Toast.show(res.data.error.message)
                            setLoader(false)
                        }
                    }
                }
            } else {
                setLoader(true)
                Toast.show(strings.ERROR.WAIT)
            }
            setLoader(false)
        } catch (error) {
            setLoader(false)
            console.log("SecurelyholdpaymentBotton", error)

        }
    }
    const ItsOfficial = () => (
        <View style={{ backgroundColor: Colors.white, borderRadius: 4, margin: Normalize(15), }} >
            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={{ height: Normalize(50), width: "100%", flexDirection: language == "en" ? "row" : "row-reverse", justifyContent: "space-between", alignItems: "center", borderBottomColor: "#E8E8E8", borderBottomWidth: 1, backgroundColor: Colors.primary }}>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                        {/* <Text style={{
                            fontSize: Normalize(14),
                            fontFamily: 'roboto-bold',
                            color: '#38393e'
                        }}>{strings.MAKEANOFFER.PAYMENTREQUIRED}</Text> */}
                    </View>
                    <TouchableOpacity activeOpacity={0.5}
                        onPress={() => {
                            setLoader(false)
                            onPress()
                            setModalChange("")
                        }}
                        style={{ height: Normalize(50), width: Normalize(50), justifyContent: "center", alignItems: "center" }} >
                        <Image source={images.cross} style={{ height: Normalize(12), width: Normalize(12), resizeMode: "contain" }} />
                    </TouchableOpacity>
                </View>

                <View style={{}} >
                    <Text style={{
                        fontSize: Normalize(15),
                        fontFamily: 'roboto-bold',
                        color: '#38393e',
                        textAlign: "center",
                        paddingTop: "2%"
                    }}>{strings.MAKEANOFFER.ITSOFFICIAL}</Text>

                    <View style={{ height: Normalize(115), width: Normalize(150), alignSelf: "center", marginTop: "5%", marginBottom: "8%" }} >
                        <Image source={images.debcard} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                    </View>

                            <Text
                                style={{
                                    fontSize: Normalize(12),
                                    fontFamily: 'roboto-regular',
                                    color: Colors.grey,
                                    textAlign: "center",
                                    paddingTop: "2%",
                                    paddingHorizontal: "2%"
                                }}>{`Your Payment is secured and ${nameShorting(name)} is assigned to the task`}</Text>
                            


                    <Text style={{
                        fontSize: Normalize(11),
                        fontFamily: 'roboto-medium',
                        color: Colors.grey,
                        textAlign: "center",
                        paddingTop: "2%", paddingHorizontal: 15
                    }}>
                        {strings.MAKEANOFFER.YOUCANNOWSEND}
                    </Text>


                    <View style={{ height: Normalize(40), width: "100%", marginBottom: "5%", marginTop: "12%", flexDirection: rowOrRowreverse(language), justifyContent: "space-evenly" }} >
                        <TouchableOpacity
                            onPress={() => {
                                setLoader(false)
                                onPress()
                                setModalChange("")
                            }}
                            style={{ height: "100%", width: "45%", borderRadius: 30, borderColor: Colors.primary, borderWidth: Normalize(1), justifyContent: "center", alignItems: "center" }} >
                            <Text style={{
                                fontSize: Normalize(13),
                                fontFamily: 'roboto-bold',
                                color: Colors.primary,
                                textAlign: "center",
                                paddingTop: "2%"
                            }}>{strings.MAKEANOFFER.GOTOTASK}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setModalChange("privateMsg")}
                            style={{ height: "100%", width: "45%", backgroundColor: Colors.green2, borderRadius: 30, justifyContent: "center", alignItems: "center" }} >
                            <Text style={{
                                fontSize: Normalize(12),
                                fontFamily: 'roboto-bold',
                                color: Colors.white,
                                textAlign: "center",
                                paddingTop: "2%"
                            }}>{language == "en" ? `Message ${nameShorting(name)}` : `${nameShorting(name)} پیام به`}</Text>
                        </TouchableOpacity>
                    </View>


                </View>
            </ScrollView>
        </View>
    )
    const PrivateMSG = () => (
        <View style={{ backgroundColor: Colors.white, borderRadius: 4, margin: Normalize(15), }} >
            <View style={{ height: Normalize(50), width: "100%", flexDirection: language == "en" ? "row" : "row-reverse", justifyContent: "space-between", alignItems: "center", borderBottomColor: "#E8E8E8", borderBottomWidth: 1, backgroundColor: Colors.primary }}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                    <Text style={{
                        fontSize: Normalize(14),
                        fontFamily: 'roboto-bold',
                        color: Colors.white
                    }}>{strings.MAKEANOFFER.SENDAPRIVATEMESSAGE}</Text>
                </View>
                <TouchableOpacity activeOpacity={0.5}
                    onPress={() => {
                        setLoader(false)
                        onPress()
                        setModalChange("")
                    }}
                    style={{ height: Normalize(50), width: Normalize(50), justifyContent: "center", alignItems: "center" }} >
                    <Image source={images.cross} style={{ height: Normalize(12), width: Normalize(12), resizeMode: "contain" }} />
                </TouchableOpacity>
            </View>

            <View style={{ padding: 12 }} >
                <Text style={{
                    fontSize: Normalize(11.5),
                    fontFamily: 'roboto-regular',
                    color: Colors.grey,
                    textAlign: leftOrRight(language),
                    paddingTop: "2%"
                }}>
                    {/* {language == "en" ? `Private messages are only shared with ${nameShorting(name)}` : `پیام خصوصی فقط با ${nameShorting(name)} به اشتراک گذاشته می شود.`} */}
                    {language === "en" ? <Text>Private messages are only shared with <Text style={{ color: Colors.primary }} >{nameShorting(name)}</Text></Text> : <Text>پیام خصوصی فقط با <Text style={{ color: Colors.primary }} >{nameShorting(name)}</Text> به اشتراک گذاشته می شود.</Text>}
                </Text>
                <Text style={{
                    fontSize: Normalize(10),
                    fontFamily: 'roboto-medium',
                    color: Colors.grey,
                    textAlign: leftOrRight(language),
                    paddingTop: "2%", paddingVertical: "5%"
                }}>{strings.MAKEANOFFER.ITSAGREATWAY}</Text>


                <View style={{}} >
                    <View style={{ height: Normalize(95), flexDirection: rowOrRowreverse(language), padding: "2%" }} >
                        <View style={{ height: "100%", width: Normalize(45), alignItems: language == "en" ? "flex-start" : "flex-end" }} >
                            <View style={{ height: Normalize(40), width: Normalize(40), borderRadius: Normalize(40) / 2, overflow: "hidden" }} >
                                <Image style={{ height: "100%", width: "100%", resizeMode: "cover" }}
                                    source={{ uri: ImageLink.ProfilePhoto + `${imageName}` }}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 1, borderRadius: 10, borderColor: "#D8D8D8", borderWidth: Normalize(1), justifyContent: "space-between", padding: "2%" }} >
                            <View style={{ flex: 1 }} >
                                <TextInput
                                    value={message}
                                    onChangeText={(e) => setMessage(e)}
                                    multiline
                                    placeholder={strings.MAKEANOFFER.ASKAQUESTIONABOUTATASK}

                                    style={{ height: "100%", width: '100%', textAlignVertical: "top", textAlign: language == "en" ? "left" : "right", color: '#000' }}
                                    onSubmitEditing={() => { Keyboard.dismiss() }}
                                />
                            </View>
                            <View style={{ height: Normalize(15), flexDirection: rowOrRowreverse(language), }} >


                                <View style={{ flex: 1, }} >
                                    {mainquestionSelectedImage.fileName &&
                                        <TouchableOpacity
                                            onPress={() => { setMainquestionSelectedImage("") }}
                                            style={{ height: "100%", width: "95%", backgroundColor: Colors.primary, flexDirection: rowOrRowreverse(language), paddingHorizontal: "3%", alignItems: "center", borderRadius: 5, alignSelf: language == "en" ? "flex-start" : "flex-end" }} >
                                            <Text numberOfLines={1} style={{ color: Colors.white, width: "95%" }} >{mainquestionSelectedImage.fileName}</Text>
                                            <View style={{ height: Normalize(10), width: Normalize(10) }} >
                                                <Image source={images.cross} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                            </View>
                                        </TouchableOpacity>
                                    }

                                </View>



                                <TouchableOpacity
                                    onPress={selectImageForMsg}
                                    style={{ height: Normalize(15), width: Normalize(15) }} >
                                    <Image source={images.clip} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{ height: Normalize(25), flexDirection: rowOrRowreverse(language), paddingHorizontal: "2%" }} >
                        <View style={{ height: "100%", width: Normalize(45) }} />
                        <View style={{ flex: 1, alignItems: language == "en" ? "flex-start" : "flex-end" }} >


                            <TouchableOpacity
                                disabled={questionButtonLoader ? true : false}
                                onPress={() => {
                                    messageSendinPaymentRequiredModal()
                                    // onPress()
                                    // setModalChange("")
                                }}
                                style={{ height: "100%", width: Normalize(52), backgroundColor: Colors.secondary, borderRadius: 5, justifyContent: "center", alignItems: "center" }} >
                                {
                                    questionButtonLoader ?
                                        <ActivityIndicator
                                            size={"small"}
                                            color={Colors.white} />
                                        :
                                        <Text style={{
                                            fontSize: Normalize(11),
                                            fontFamily: 'roboto-bold',
                                            color: Colors.white,
                                        }}>{strings.TASKDETAILS.SEND}</Text>
                                }
                            </TouchableOpacity>



                        </View>
                    </View>
                </View>
            </View>
            <View style={{ paddingBottom: "2%" }} />
        </View>
    )
    const messageSendinPaymentRequiredModal = async () => {
        try {
            setQuestionButtonLoader(true)
            if (message.length != 0 && message.trim() != "") {
                const messageTrim = message.trim()
                // console.log(mainquestionSelectedImage)
                const finalFormData = new FormData();
                finalFormData.append('slug', taskSlugname);
                finalFormData.append('message_master_id', 0);
                finalFormData.append('message', messageTrim);
                finalFormData.append('socket_id', socketId);
                {
                    if (mainquestionSelectedImage.fileName == undefined) {
                        null
                    } else {
                        finalFormData.append('file', {
                            uri: mainquestionSelectedImage.uri,
                            type: mainquestionSelectedImage.type,
                            name: mainquestionSelectedImage.fileName,
                        });
                    }
                }
                Keyboard.dismiss()
                const data = finalFormData
                const res = await axiosInstance.post("send-message", data)
                if (res.data.error) {
                    Toast.show(res.data.error.meaning)
                } else {
                    Toast.show(language == "en" ? "Message send" : "ارسال پیام")
                    onPress()
                    setModalChange("")
                    setMessage("")
                    setMainquestionSelectedImage("")
                }
            } else {
                Toast.show(language == "en" ? "At first add a question" : "در ابتدا یک سوال اضافه کنید")
            }
            setQuestionButtonLoader(false)
        } catch (error) {
            setQuestionButtonLoader(false)
            console.log("messageSendinPaymentRequiredModal", error)
        }
    }
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={ispress}
            onRequestClose={() => {
                onPress()
            }}
        >
            <KeyboardAvoidingView behavior={(Platform.OS === 'ios') ? "padding" : null}
                style={{ flex: 1, backgroundColor: "rgba(52,52,52,0.5)", justifyContent: "center" }} >
                {modalChange == "" ?
                    amountDetails != "" ?
                        <View style={{ backgroundColor: Colors.white, borderRadius: 4, margin: Normalize(15), }} >
                            <ScrollView showsVerticalScrollIndicator={false} >
                                <View style={{ height: Normalize(50), width: "100%", flexDirection: language == "en" ? "row" : "row-reverse", justifyContent: "space-between", alignItems: "center", borderBottomColor: "#E8E8E8", borderBottomWidth: 1, backgroundColor: Colors.primary }}>
                                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                                        <Text style={{
                                            fontSize: Normalize(14),
                                            fontFamily: 'roboto-bold',
                                            color: Colors.white
                                        }}>
                                            {/* {strings.MAKEANOFFER.PAYMENTREQUIRED} */}
                                            {strings.MAKEANOFFER.PAYMENTREQUIRED2}
                                        </Text>
                                    </View>
                                    <TouchableOpacity activeOpacity={0.5} onPress={onPress} style={{ height: Normalize(50), width: Normalize(50), justifyContent: "center", alignItems: "center" }} >
                                        <Image source={images.cross} style={{ height: Normalize(12), width: Normalize(12), resizeMode: "contain" }} />
                                    </TouchableOpacity>
                                </View>


                                <View style={{ paddingHorizontal: Normalize(15) }} >

                                    <View style={{ height: Normalize(80), backgroundColor: "#fafbfd", flexDirection: language == "en" ? "row" : "row-reverse" }} >
                                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                                            <View style={{ height: Normalize(52), width: Normalize(52), backgroundColor: "#f5f5f5", borderRadius: Normalize(52) / 2, overflow: "hidden" }} >
                                                <Image style={{ height: "100%", width: "100%", resizeMode: "cover" }}
                                                    source={{ uri: ImageLink.ProfilePhoto + `${imageName}` }}
                                                />
                                            </View>
                                        </View>
                                        <View style={{ flex: 2.8, justifyContent: "center" }} >
                                            <Text numberOfLines={1} style={{ fontSize: 15, fontFamily: 'roboto-medium', color: Colors.greyText, textAlign: language == "pr" ? "right" : "left" }}>{nameShorting(name)}</Text>
                                            <Text numberOfLines={2} style={{ fontSize: 15, fontFamily: 'roboto-regular', color: Colors.greyText, textAlign: language == "pr" ? "right" : "left" }}>{taskTitle}</Text>
                                        </View>
                                    </View>
                                    <View style={{ paddingHorizontal: Normalize(15), paddingVertical: "2%" }} >
                                        {/* <Text style={{ fontSize: 15, fontFamily: 'roboto-medium', color: Colors.greyText, textAlign: language == "pr" ? "right" : "left", marginBottom: Normalize(8) }}>{strings.MAKEANOFFER.SUMMARY}</Text> */}
                                        <View style={{ flexDirection: language == "en" ? "row" : "row-reverse", justifyContent: "space-between", marginVertical: Normalize(2) }} >
                                            <Text style={{ fontSize: 15, fontFamily: 'roboto-regular', color: Colors.primary, textAlign: language == "pr" ? "right" : "left" }}>{strings.MAKEANOFFER.TASKPRICE}</Text>
                                            <View style={{ flexDirection: 'row' }} >
                                                <Text style={{ fontSize: 15, fontFamily: 'roboto-regular', color: Colors.greyText, paddingHorizontal: Normalize(3) }}>{strings.BROWSEFILTER.TOMAN}</Text>
                                                <Text style={{ fontSize: 15, fontFamily: 'roboto-regular', color: Colors.greyText, }}>{language == "en" ? numberWithCommas(Math.round(amountDetails.offer_amt)) : engToPersian(numberWithCommasinParsian(Math.round(amountDetails.offer_amt)))}</Text>
                                            </View>
                                        </View>
                                        {
                                            Math.round(amountDetails.fees) != 0 &&
                                            <View style={{ flexDirection: language == "en" ? "row" : "row-reverse", justifyContent: "space-between", marginVertical: Normalize(2) }} >
                                                <Text style={{ fontSize: 15, fontFamily: 'roboto-regular', color: Colors.primary, textAlign: language == "pr" ? "right" : "left" }}>{strings.MAKEANOFFER.BOOKINGFEE}</Text>
                                                <View style={{ flexDirection: 'row' }} >
                                                    <Text style={{ fontSize: 15, fontFamily: 'roboto-regular', color: Colors.greyText, paddingHorizontal: Normalize(3) }}>{strings.BROWSEFILTER.TOMAN}</Text>
                                                    <Text style={{ fontSize: 15, fontFamily: 'roboto-regular', color: Colors.greyText, }}>{language == "en" ? numberWithCommas(Math.round(amountDetails.fees)) : engToPersian(numberWithCommasinParsian(Math.round(amountDetails.fees)))}</Text>
                                                </View>
                                            </View>
                                        }

                                        {
                                            Math.round(amountDetails.adjust_wallet_balance) > 0 &&
                                            <View style={{ flexDirection: language == "en" ? "row" : "row-reverse", justifyContent: "space-between", marginVertical: Normalize(2) }} >
                                                <Text style={{ fontSize: 15, fontFamily: 'roboto-regular', color: Colors.primary, textAlign: language == "pr" ? "right" : "left" }}>{strings.MAKEANOFFER.ADJUSTFROMWALLET}</Text>
                                                <View style={{ flexDirection: 'row' }} >
                                                    <Text style={{ fontSize: 15, fontFamily: 'roboto-regular', color: Colors.greyText, paddingHorizontal: Normalize(3) }}>{strings.BROWSEFILTER.TOMAN}</Text>
                                                    <Text style={{ fontSize: 15, fontFamily: 'roboto-regular', color: Colors.greyText, }}>
                                                        {/* {Math.round(amountDetails.adjust_wallet_balance)} */}
                                                        {language == "en" ? numberWithCommas(Math.round(amountDetails.adjust_wallet_balance)) : engToPersian(numberWithCommasinParsian(Math.round(amountDetails.adjust_wallet_balance)))}
                                                    </Text>
                                                </View>
                                            </View>
                                        }
                                        {
                                            Math.round(amountDetails.adjust_wallet_balance) == 0 ?
                                                <View style={{ flexDirection: language == "en" ? "row" : "row-reverse", justifyContent: "space-between", marginVertical: Normalize(2) }} >
                                                    <Text style={{ fontSize: 15, fontFamily: 'roboto-medium', color: Colors.primary, textAlign: language == "pr" ? "right" : "left" }}>{strings.MAKEANOFFER.NEEDTOPAY}</Text>
                                                    <View style={{ flexDirection: 'row' }} >
                                                        <Text style={{ fontSize: 15, fontFamily: 'roboto-medium', color: Colors.greyText, paddingHorizontal: Normalize(3) }}>{strings.BROWSEFILTER.TOMAN}</Text>
                                                        <Text style={{ fontSize: 15, fontFamily: 'roboto-medium', color: Colors.greyText }}>{language == "en" ? numberWithCommas(total_amount) : engToPersian(numberWithCommasinParsian(total_amount))}</Text>
                                                    </View>
                                                </View> :
                                                Math.round(amountDetails.adjust_wallet_balance) > 0 &&
                                                    (Math.round(amountDetails.adjust_wallet_balance) < Math.round(amountDetails.payblabe_amount)) ?
                                                    <View style={{ flexDirection: language == "en" ? "row" : "row-reverse", justifyContent: "space-between", marginVertical: Normalize(2) }} >
                                                        <Text style={{ fontSize: 15, fontFamily: 'roboto-medium', color: Colors.primary, textAlign: language == "pr" ? "right" : "left" }}>{strings.MAKEANOFFER.NEEDTOPAY}</Text>
                                                        <View style={{ flexDirection: 'row' }} >
                                                            <Text style={{ fontSize: 15, fontFamily: 'roboto-medium', color: Colors.greyText, paddingHorizontal: Normalize(3) }}>{strings.BROWSEFILTER.TOMAN}</Text>
                                                            {/* <Text style={{ fontSize: 15, fontFamily: 'roboto-medium', color: Colors.greyText, }}>{language == "en" ? numberWithCommas((Math.round(amountDetails.payblabe_amount) - Math.round(amountDetails.adjust_wallet_balance))) : engToPersian(numberWithCommasinParsian((Math.round(amountDetails.payblabe_amount) - Math.round(amountDetails.adjust_wallet_balance))))}</Text> */}
                                                            <Text style={{ fontSize: 15, fontFamily: 'roboto-medium', color: Colors.greyText, }}>{numberWithCommas(amountDetails.payblabe_amount)}</Text>
                                                        </View>
                                                    </View> :
                                                    (Math.round(amountDetails.adjust_wallet_balance) >= Math.round(amountDetails.payblabe_amount)) ?
                                                        (Math.round(amountDetails.offer_amt) - Math.round(amountDetails.adjust_wallet_balance) > 0) ?
                                                            <View style={{ flexDirection: language == "en" ? "row" : "row-reverse", justifyContent: "space-between", marginVertical: Normalize(2) }} >
                                                                <Text style={{ fontSize: 15, fontFamily: 'roboto-medium', color: Colors.primary, textAlign: language == "pr" ? "right" : "left" }}>{strings.MAKEANOFFER.NEEDTOPAY}</Text>
                                                                <View style={{ flexDirection: 'row' }} >
                                                                    <Text style={{ fontSize: 15, fontFamily: 'roboto-medium', color: Colors.greyText, paddingHorizontal: Normalize(3) }}>{strings.BROWSEFILTER.TOMAN}</Text>
                                                                    <Text style={{ fontSize: 15, fontFamily: 'roboto-medium', color: Colors.greyText, }}>{numberWithCommas((Math.round(amountDetails.payblabe_amount)))}</Text>
                                                                </View>
                                                            </View>

                                                            : null : null}
                                    </View>

                                    {
                                        amountDetails.payment_type == "G" &&
                                        <View style={{ paddingHorizontal: Normalize(15), paddingVertical: "2%", borderBottomColor: "#E8E8E8", borderBottomWidth: 1 }} >
                                            <Text style={{ fontSize: 15, fontFamily: 'roboto-medium', color: Colors.greyText, textAlign: language == "pr" ? "right" : "left" }}>{strings.MAKEANOFFER.PAYMENTMETHODS}</Text>
                                            <View style={{ height: Normalize(60), flexDirection: language == "en" ? "row" : "row-reverse" }} >
                                                <View style={{ justifyContent: "center" }} >
                                                    <View style={{ height: Normalize(35), width: Normalize(35), justifyContent: "center", alignItems: "center" }} >
                                                        <Image style={{ height: "100%", width: "100%", resizeMode: "cover" }}
                                                            source={images.irantaskerIcon}
                                                        />
                                                    </View>
                                                </View>
                                                <View style={{ flex: 3, justifyContent: "center", paddingHorizontal: Normalize(15) }} >
                                                    <Text style={{ fontSize: 15, fontFamily: 'roboto-regular', color: Colors.grey, textAlign: language == "pr" ? "right" : "left" }}>{strings.MAKEANOFFER.PAYPING}</Text>
                                                </View>
                                                <View style={{ justifyContent: "center", alignItems: "center" }} >
                                                    <View style={{ height: Normalize(17), width: Normalize(17), borderRadius: Normalize(17) / 2 }} >
                                                        <Image source={images.greenTick} style={{ height: "90%", width: "90%", resizeMode: "cover" }} />
                                                    </View>
                                                </View>

                                            </View>
                                        </View>
                                    }
                                    <View style={{ paddingHorizontal: Normalize(15), paddingVertical: "2%", marginTop: Normalize(20) }} >
                                        <Text style={{ color: Colors.greyText, textAlign: language == "en" ? "justify" : "center", fontFamily: "roboto-regular", lineHeight: 20 }}>{strings.MAKEANOFFER.PAYMENTWILLBE}<Text style={{ color: "#7db343" }} onPress={() => {
                                            onPress()
                                            navigation.navigate("Howitworks")
                                        }}> {strings.MAKEANOFFER.IRANTASKERPAY} </Text>{strings.MAKEANOFFER.UNTILLYOURE}<Text style={{ color: "#7db343" }} onPress={() => {
                                            onPress()
                                            navigation.navigate("Termsandcondition")
                                        }}> {strings.MAKEANOFFER.TERMSANDCONDITIONS}</Text></Text>
                                    </View>
                                    <Button
                                        disabled={loader ? true : false}
                                        name={loader ? "" : strings.MAKEANOFFER.SECURELYHOLDPAYMENT}
                                        // onPress={()=>Toast.show("in progress")}
                                        onPress={SecurelyholdpaymentBotton}



                                        // onPress={onNavigationStateChangeHandle}
                                        style={{ marginVertical: Normalize(10) }}
                                    >
                                        {
                                            loader &&
                                            <ActivityIndicator
                                                size="small"
                                                color={Colors.white}
                                            />
                                        }
                                    </Button>
                                    {
                                        ispaymentgateway &&
                                        <Modal
                                            animationType="fade"
                                            transparent={true}
                                            visible={ispress}
                                            onRequestClose={() => {
                                                onPressPamentGetWay()
                                            }}
                                        >
                                            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary }}>
                                                <View style={{ flex: 1, backgroundColor: Colors.white }} >
                                                    <View style={{ height: Normalize(50), width: "100%", flexDirection: language == "en" ? "row" : "row-reverse", justifyContent: "space-between", alignItems: "center", borderBottomColor: "#E8E8E8", borderBottomWidth: 1, backgroundColor: Colors.payment_blue }}>
                                                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                                                            <Text style={{
                                                                fontSize: Normalize(14),
                                                                fontFamily: 'roboto-bold',
                                                                color: Colors.white
                                                            }}>{strings.MAKEANOFFER.PAYMENT}</Text>
                                                        </View>
                                                        <TouchableOpacity activeOpacity={0.5} onPress={onPressPamentGetWay} style={{ height: Normalize(50), width: Normalize(50), justifyContent: "center", alignItems: "center" }} >
                                                            <Image source={images.crossWhite} style={{ height: Normalize(12), width: Normalize(12), resizeMode: "contain" }} />
                                                        </TouchableOpacity>
                                                    </View>
                                                    <WebView
                                                        ref={webref}
                                                        source={{ uri: apiUrl }}
                                                        style={{ flex: 1 }}
                                                        // onLoad={console.log("loaded")}
                                                        onNavigationStateChange={onNavigationStateChangeHandle}
                                                        renderLoading={renderLoadingView}
                                                        startInLoadingState={true}
                                                    />
                                                </View>
                                            </SafeAreaView>
                                        </Modal>
                                    }
                                    <View style={{ paddingBottom: "2%" }} />

                                </View>

                            </ScrollView>
                        </View>
                        :
                        <LoaderPage />
                    :
                    modalChange == "itsofficial" ?
                        <ItsOfficial />
                        :
                        PrivateMSG()
                }
            </KeyboardAvoidingView>
        </Modal>
    )
}
export default withRtl(PaymentRequiredModal);
