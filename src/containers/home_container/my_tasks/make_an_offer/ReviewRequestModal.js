

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useContext, useEffect, useState, useRef, Fragment } from 'react'
import {
    View, Text, Modal, ScrollView, Image, TouchableOpacity, TextInput,
    ActivityIndicator, SafeAreaView, Keyboard, KeyboardAvoidingView, Platform
} from 'react-native'
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import Toast from 'react-native-simple-toast';
import { Colors } from '../../../../constants/colors';
import images from '../../../../constants/images';
import { useNavigation } from "@react-navigation/native"
import moment from 'moment';
import Pusher from 'pusher-js';
import strings from '../../../../constants/lng/LocalizedStrings';
import { engToPersian } from '../../../../constants/EnglishToPersian';
import { myContext } from '../../../../constants/ContextApi';
import Button from "../../../../components/Button"
import { numberWithCommas } from '../../../../constants/NumberWithComma';
import pusherConfig from '../../../../../pusher.json';
import { addCommaAndTranslateInPersian } from '../../../../constants/NumberWithCommaAndInPersian';
import LoaderPage from '../../../../components/LoaderPage';
import { axiosUrl, ImageLink } from '../../../../constants/LinkPage';
import { WebView } from 'react-native-webview';
import WarningPage from "../../../../components/WarningPage"
import axiosInstance from '../../../../constants/AxiosCallPage';
import { leftOrRight } from '../../../../constants/RowOrRowreverse';
import Entypo from 'react-native-vector-icons/Entypo';
import Header from '../../../../components/Header';
import NewLoaderPage from '../../../../components/NewLoaderPage';
import globalStyle_esyPay from '../../../../constants/globalStyles/GlobalStyle_esyPay';
import { fontfmliy } from '../../../../components/WhichFontFamily';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
function ReviewRequestModal({ ispress, onPress, name, imageName, taskSlugname, bid_id, reviewModal, previousAmount, description, item }) {

    const webref = useRef()
    const navigation = useNavigation()
    const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();

    const { socketId, setSocketId } = useContext(myContext);

    const [ispaymentgateway, setIsPaymentgateway] = React.useState(false);
    const [apiUrl, setApiUri] = useState("")
    const [loader, setLoader] = useState(false)
    const [amountDetails, setAmountDetails] = useState("")
    const [declineDescription, setDeclineDescription] = React.useState("")
    const [declineOrApprove, setDeclineOrApprove] = React.useState("A")
    const [declineModal, setDeclineModal] = useState(false)
    const [approveModal, setApproveModal] = useState(false)

    const onNavigationStateChangeHandle = async ({ url }) => {
        console.log("url", url)
        if (url == `${axiosUrl.URL}payment-fail`) {
            onPressPamentGetWay()
        } else if (url == `${axiosUrl.URL}payment-success`) {
            onPress()
            setIsPaymentgateway(!ispaymentgateway)
            // await AsyncStorage.setItem("isMyTaskloader", "true")
            // await AsyncStorage.setItem("isBrowserTaskloader", "true")
            // Toast.show(strings.ERROR.SUCCESSFULLYTASKASSIGNED)
        } else {
            console.log(url)
        }
    }
    useEffect(() => {
        getOfferData()
        const willFocusSubscription = navigation.addListener('focus', () => {
            getOfferData()
        });
        return willFocusSubscription;
    }, [bid_id, ispress]);

    const getOfferData = async () => {
        try {
            const data = {
                "params": {
                    "slug": taskSlugname,
                    "requested_by": "T"
                }
            }
            const res = await axiosInstance.post("get-incrase-payment-details", data)
            // console.log(res.data)
            if (res.data.offer_amt) {
                setAmountDetails(res.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onPressPamentGetWay = () => {
        if (ispaymentgateway == true) {
            setIsPaymentgateway(!ispaymentgateway)
            Toast.show(strings.ERROR.PAYMENTCANCEL)
        } else {
            setIsPaymentgateway(!ispaymentgateway)
        }
    }
    const approveButton = async () => {
        try {
            setLoader(true)
            const data = {
                "params": {
                    "slug": taskSlugname,
                    "requested_by": "T",
                    "amount": Math.round(item.amount),
                    "description": item.description,
                    "increase_payment_id": item.id
                }
            }
            const res = await axiosInstance.post("pay-increase-payment", data)


            if (res.data.redirect_url) {
                setApiUri(res.data.redirect_url)
                onPressPamentGetWay()
                setLoader(false)
            } else {
                if (res.data.amonut) {
                    Toast.show(strings.ERROR.PRICEINCREASESUCESSFULLY)
                    onPress()
                    setLoader(false)
                } else {
                    console.log("else", res.data)
                    Toast.show(res.data.error.meaning)
                }
            }
            setLoader(false)

        } catch (error) {
            console.log(error)
            setLoader(false)
        }
    }
    const declinepriceButton = async () => {
        try {
            console.log("data")
            if (declineDescription.trim("").length == 0) {
                Toast.show(strings.MAKEANOFFER.ENTERDESCRIPTION)
            } else {
                setLoader(true)
                var d = declineDescription.trim("")
                const data = {
                    "params": {
                        "slug": taskSlugname,
                        "reject_reasone": d
                    }
                }
                console.log(data)
                const res = await axiosInstance.post("reject-payment-request", data)
                console.log(res.data)
                if (res.data.error) {
                  
                    Toast.show(res.data.error.meaning)
                    setLoader(false)
                } else {
                    Toast.show(res.data.result.status.meaning)
                    // console.log(res.data.result.status.meaning)
                    onPress()
                    setLoader(false)
                    setDeclineDescription("")
                }
            }
        } catch (error) {
            setLoader(false)
            console.log("declinepriceButton", error)
        }
    }

    const onpressApproveButton = () => {
        setApproveModal(!approveModal)
    }
    const onpressDeclineButton = () => {

        if (declineDescription == "" || declineDescription.trim("") == "") {
            Toast.show(strings.ERROR.ENTERREASON)
        } else {
            setDeclineModal(!declineModal)
        }
    }


    const renderLoadingView = () => {
        return (
            <View style={{
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                position: "absolute"
            }} >
                <NewLoaderPage />
            </View>
        );
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={ispress}
            onRequestClose={() => {
                onPress()
                setLoader(false)
            }}
        >
            {
                amountDetails != "" ?
                    <KeyboardAvoidingView behavior={(Platform.OS === 'ios') ? "padding" : null} style={{ flex: 1, backgroundColor: "rgba(52,52,52,0.5)", justifyContent: "center", alignItems: "center" }} >
                        <Fragment>


                            <View style={{ padding: Normalize(20), width: "80%", backgroundColor: Colors.white, elevation: 10, borderRadius: Normalize(8) }} >
                                <View style={{ alignItems: "center" }} >
                                    <View style={{
                                        height: Normalize(60), width: Normalize(60), backgroundColor: Colors.white, marginTop: Normalize(-50),
                                        borderRadius: Normalize(30), alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        <View style={{
                                            height: Normalize(50),
                                            width: Normalize(50),
                                            backgroundColor: Colors.secondary,
                                            borderRadius: Normalize(25), alignSelf: 'center', justifyContent: 'center', alignItems: 'center'
                                        }} >
                                            <Entypo
                                                name="plus"
                                                size={Normalize(40)}
                                                color={Colors.white}
                                            />
                                        </View>
                                    </View>
                                    <Text style={[globalStyle_esyPay.pageHeading, { color: Colors.primary, fontSize: Normalize(16), marginVertical: Normalize(10), fontFamily: fontfmliy.bold }]}>Extra payment request</Text>
                                    <Text style={[globalStyle_esyPay.pageHeading, { color: Colors.primary, fontSize: Normalize(12.5), lineHeight: Normalize(13), marginBottom: Normalize(0), fontFamily: fontfmliy.regular, textAlign: "center" }]}>{
                                        declineOrApprove == "A" ?
                                            `${name} reqested extra payment, please see their reason below`
                                            :
                                            `Please let ${name} know why you didn't accept the price accept the price increase.`}</Text>
                                </View>
                                {
                                    declineOrApprove == "A" ?

                                        // ****************************approve********************

                                        <View style={{ marginVertical: Normalize(5) }} >
                                            <View style={{ paddingHorizontal: Normalize(15), paddingVertical: "2%", alignItems: "center", borderBottomColor: Colors.boxBorder, borderBottomWidth: item.description != null ? Normalize(1.4) : 0 }} >
                                                <Text style={[globalstyles.plantext_bold, { fontSize: Normalize(19), color: Colors.greyText }]}>+ $ {addCommaAndTranslateInPersian((Math.round(amountDetails.offer_amt)), language)}</Text>
                                            </View>
                                            {item.description != null && <View style={{}} >
                                                <Text style={[globalStyle_esyPay.pageHeading, { color: Colors.primary, fontSize: Normalize(13), marginVertical: Normalize(5), fontFamily: fontfmliy.bold }]}>Reason</Text>
                                                <Text numberOfLines={2} style={[globalstyles.plantext_regular, { fontSize: Normalize(14), textAlign: language == "pr" ? "right" : "left" }]}>{item.description}</Text>
                                            </View>}

                                        </View>
                                        :

                                        // ****************************Decline********************
                                        <Fragment>
                                            <Text style={[globalStyle_esyPay.pageHeading, { color: Colors.primary, fontSize: Normalize(13), marginVertical: Normalize(5), fontFamily: fontfmliy.bold, textAlign: "left" }]}>Reason</Text>
                                            <View style={{ alignItems: "center" }} >
                                                {/* <View style={{  }} > */}
                                                <View style={{ width: "100%", height: Normalize(80), backgroundColor: Colors.secondaryBackground, borderRadius: 6, marginBottom: "4%", borderColor: Colors.secondaryBorder, borderWidth: 0.5, borderRadius: 5, alignSelf: "center" }} >
                                                    <View style={{ flex: 1, padding: Normalize(3) }}>
                                                        <TextInput
                                                            value={declineDescription}
                                                            onChangeText={(e) => setDeclineDescription(e)}
                                                            placeholder={strings.MAKEANOFFER.DECLINEPLACEHOLDER}
                                                            placeholderTextColor={Colors.grey}
                                                            multiline
                                                            style={{ height: "100%", width: "100%", textAlignVertical: "top", textAlign: language == "en" ? "left" : "right", color: Colors.primary }}
                                                            onSubmitEditing={() => { Keyboard.dismiss() }}
                                                        />
                                                    </View>
                                                </View>
                                                <Text style={{
                                                    fontSize: Normalize(10),
                                                    fontFamily: 'roboto-regular',
                                                    color: Colors.greyText,
                                                    textAlign: leftOrRight(language),
                                                    width: "100%",
                                                }} >
                                                    {
                                                        language == "en" ? `This will be sent as a private message to ${name}`
                                                            :
                                                            `این به عنوان یک پیام خصوصی به (${name}) ارسال خواهد شد.`
                                                    }
                                                </Text>

                                                <View style={{ width: "100%", height: Normalize(40), marginVertical: "2%", alignItems: "center", flexDirection: "row", justifyContent: "space-between" }} >
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            setDeclineOrApprove("A")
                                                        }}
                                                        style={{ height: "90%", width: "35%", backgroundColor: Colors.primary, borderRadius: Normalize(10), justifyContent: "center", alignItems: "center" }}>
                                                        <Text style={{
                                                            color: Colors.white,
                                                            fontSize: Normalize(13),
                                                            fontFamily: 'roboto-medium',
                                                        }} >back</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        onPress={declinepriceButton}
                                                        style={{ height: "90%", width: "60%", backgroundColor: Colors.secondary, borderRadius: Normalize(10), justifyContent: "center", alignItems: "center" }}>
                                                        <Text style={{
                                                            color: Colors.white,
                                                            fontSize: Normalize(13),
                                                            fontFamily: 'roboto-medium',
                                                        }} >Decline</Text>
                                                    </TouchableOpacity>

                                                    {declineModal && <WarningPage
                                                        onPress={onpressDeclineButton}
                                                        ispress={declineModal}
                                                        warningTitle={strings.MAKEANOFFER.DECLINEPRICEINCREASE}
                                                        warningSubTitle={language == 'en' ? 'Are you Sure?' : "آیا مطمئن هستید؟"}
                                                        okOnpress={declinepriceButton}
                                                        cancelOnpress={onpressDeclineButton}
                                                    />}

                                                </View>
                                            </View>
                                        </Fragment>
                                }
                                {
                                    declineOrApprove == "A" && <View style={{ flexDirection: language == "en" ? "row" : "row-reverse", width: "100%", height: Normalize(40), justifyContent: "space-evenly" }} >
                                        <TouchableOpacity
                                            onPress={() => { setDeclineOrApprove("D") }}
                                            style={{ height: "100%", width: "45%", backgroundColor: Colors.primary, borderRadius: Normalize(10), justifyContent: "center", alignItems: "center" }}>
                                            <Text style={{
                                                color: Colors.white,
                                                fontSize: Normalize(13),
                                                fontFamily: 'roboto-medium',
                                            }} >{strings.MAKEANOFFER.DECLINE}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={approveButton}
                                            style={{ height: "100%", width: "45%", backgroundColor: Colors.secondary, borderRadius: Normalize(10), justifyContent: "center", alignItems: "center" }}>
                                            <Text style={{
                                                color: Colors.white,
                                                fontSize: Normalize(13),
                                                fontFamily: 'roboto-medium',
                                            }} >{strings.MAKEANOFFER.APPROVE}</Text>
                                        </TouchableOpacity>
                                        {/* <WarningPage
                                            onPress={onpressApproveButton}
                                            ispress={approveModal}
                                            warningTitle={strings.MAKEANOFFER.APPROVE}
                                            warningSubTitle={language == 'en' ? 'Are you Sure?' : "آیا مطمئن هستید؟"}
                                            okOnpress={approveButton}
                                            cancelOnpress={onpressApproveButton}
                                        /> */}

                                    </View>
                                }
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
                                                <Header
                                                    back
                                                    backFunc={onPressPamentGetWay}
                                                    name={strings.MAKEANOFFER.PAYMENT}
                                                />
                                                <WebView
                                                    ref={webref}
                                                    source={{ uri: apiUrl }}
                                                    style={{ flex: 1 }}
                                                    onNavigationStateChange={onNavigationStateChangeHandle}
                                                    renderLoading={renderLoadingView}
                                                    startInLoadingState={true}
                                                />
                                            </View>
                                        </SafeAreaView>
                                    </Modal>
                                }
                            </View>
                            <TouchableOpacity
                                onPress={onPress}
                                style={{ height: Normalize(50), width: Normalize(50), borderRadius: Normalize(50) / 2, backgroundColor: Colors.white, elevation: 10, justifyContent: "center", alignItems: "center", marginTop: Normalize(10) }} >
                                <Entypo name="cross" color={Colors.textinput_inner_text} size={Normalize(35)} />
                            </TouchableOpacity>
                        </Fragment>
                    </KeyboardAvoidingView>
                    :
                    <LoaderPage />
            }
        </Modal>
    )
}
export default withRtl(ReviewRequestModal);
