import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import {
    View, Text, Modal, ScrollView, Image, TouchableOpacity, TextInput,
    ActivityIndicator, Keyboard, KeyboardAvoidingView
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
import Button from "../../../../components/Button"
import { addCommaAndTranslateInPersian } from '../../../../constants/NumberWithCommaAndInPersian';
import LoaderPage from '../../../../components/LoaderPage';
import { WebView } from 'react-native-webview';
import { axiosUrl, ImageLink } from '../../../../constants/LinkPage';
import axiosInstance from '../../../../constants/AxiosCallPage';
import WebView_PaymentModal from './WebView_PaymentModal';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
import globalStyle_esyPay from '../../../../constants/globalStyles/GlobalStyle_esyPay';
import { fontfmliy } from '../../../../components/WhichFontFamily';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
function IncreasepriceModal_For_Poster({ ispress, onPress, taskTitle, taskSlugname, item, taskername, imageName, name, taskerImage }) {

    const navigation = useNavigation()
    const webref = useRef()
    const { language } = useRtlContext();
    const [token, setToken] = useState("");
    const [slugName, setSlugName] = useState("")
    const [submitButtonLoader, setSubmitButtonLoader] = useState(false)
    const [description, setDescription] = useState("")
    const [amount, setAmount] = useState("")
    const [tierData, setTierData] = useState("")
    const [loader, setLoader] = useState(false)
    const [ispaymentgateway, setIsPaymentgateway] = React.useState(false);
    const [paymentSummaryModal, setPaymentSummaryModal] = React.useState(false);
    const [apiUrl, setApiUri] = useState("")
    const [amountDetails, setAmountDetails] = useState("")
    const getTokon = async () => {
        try {
            // setLoader(true)
            let token = await AsyncStorage.getItem("token");
            let slug = await AsyncStorage.getItem("slug");
            // console.log(token)
            setToken(token)
            setSlugName(slug)
            // setLoader(false)
        } catch (error) {
            console.log(error)
            // setLoader(false)
        }
    }
    useEffect(() => {
        getTokon()
        return getTokon()
    }, []);
    const getTireData = async () => {
        try {
            const res = await axiosInstance.post("my-dashboard")
            // console.log(res.data.result.tier)
            if (res.data.result) {
                setTierData(res.data.result.tier)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getTireData()
        return {
            getTireData
        }
    }, [slugName]);
    const numberCheck = (val) => {
        var a = parseInt(val) == val
        return a
    }
    String.prototype.toEnglishDigits = function () {
        var num_dic = {
            '۰': '0',
            '۱': '1',
            '۲': '2',
            '۳': '3',
            '۴': '4',
            '۵': '5',
            '۶': '6',
            '۷': '7',
            '۸': '8',
            '۹': '9',
        }

        return parseInt(this.replace(/[۰-۹]/g, function (w) {
            return num_dic[w]
        }));
    }
    const increasePriceButton = async () => {
        try {
            var finalAmount = ""
            if (language == "en") {
                var amountInteger = parseInt(amount)
                finalAmount = amount
            } else {
                var amountInteger = parseInt(amount.toEnglishDigits())

                finalAmount = amount.toEnglishDigits().toString()
                // console.log("****",typeof(finalAmount))
            }
            if (amount.length != 0) {
                if (numberCheck(finalAmount) === true) {
                    if (amountInteger < 5) {
                        Toast.show("Amount must be $5 or greater than $5")
                    } else {
                        if (amountInteger > 100000) {
                            Toast.show(strings.MAKEANOFFER.LESSTHAN500000000)
                        } else {

                            if (description.length == 0 || description.trim() == "") {
                                Toast.show(strings.MAKEANOFFER.ENTERDESCRIPTION)
                            } else {
                                onPressPaymentSummay()
                            }
                        }
                    }
                } else {
                    Toast.show(strings.MAKEANOFFER.VALIDNUMBER)
                }
            } else {
                Toast.show(strings.MAKEANOFFER.ENTERAMOUNT)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const onPressPamentGetWay = () => {
        setIsPaymentgateway(!ispaymentgateway)
    }
    const getOfferData = async (val) => {
        try {
            var finalAmount = ""
            if (language == "en") {
                var amountInteger = parseInt(val)
                finalAmount = val
            } else {
                var amountInteger = parseInt(val.toEnglishDigits())
                finalAmount = val.toEnglishDigits().toString()
            }

            const data = {
                "params": {
                    "slug": taskSlugname,
                    "requested_by": "P",
                    "amount": finalAmount
                }
            }
            const res = await axiosInstance.post("get-incrase-payment-details", data)
            // console.log("***", res.data)
            if (res.data.error == undefined) {
                setAmountDetails(res.data)
            }
        } catch (error) {
            console.log("getOfferData", error)
        }
    }
    const onPressPaymentSummay = () => {
        setPaymentSummaryModal(!paymentSummaryModal)
    }
    const SecurelyholdpaymentBotton = async () => {
        try {
            setSubmitButtonLoader(true)
            var finalAmount = ""
            var amountInteger = parseInt(amount)
            finalAmount = amount

            var d = description.trim()
            const data = {
                "params": {
                    "slug": taskSlugname,
                    "requested_by": "P",
                    "amount": finalAmount,
                    "description": d,
                    "increase_payment_id": ""
                }
            }
            const res = await axiosInstance.post("pay-increase-payment", data)
            // console.log("axios", res.data)
            if (res.data.redirect_url) {

                setApiUri(res.data.redirect_url)
                // onPressPaymentSummay()
                setPaymentSummaryModal(false)
                // onPress()
                onPressPamentGetWay()
                setLoader(false)
                setSubmitButtonLoader(false)
            } else {
                if (res.data.amonut) {
                    Toast.show(strings.ERROR.PRICEINCREASESUCESSFULLY)
                    setPaymentSummaryModal(false)
                    onPress()
                    setLoader(false)
                } else {
                    console.log("else", res.data)
                    Toast.show(res.data.error.message)
                }
            }
            setSubmitButtonLoader(false)

        } catch (error) {
            console.log("SecurelyholdpaymentBotton", error)
            // setLoader(false)
            setSubmitButtonLoader(false)
        }
    }
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={ispress}
            onRequestClose={() => {
                onPress()
                setSubmitButtonLoader(false)
            }}
        >
            {
                tierData == "" ? <LoaderPage /> :
                    <KeyboardAvoidingView
                        behavior={(Platform.OS === 'ios') ? "padding" : null} style={{ flex: 1, backgroundColor: "rgba(52,52,52,0.5)", justifyContent: "center", alignItems: "center" }} >

                        <View style={{ padding: Normalize(20), width: "80%", backgroundColor: Colors.white, elevation: 10, borderRadius: Normalize(8) }} >
                            <View style={{ alignItems: "center" }} >
                                <View style={{
                                    height: Normalize(60), width: Normalize(60), backgroundColor: Colors.white, marginTop: Normalize(-50),
                                    borderRadius: Normalize(30), alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <View style={{
                                        height: Normalize(50),
                                        width: Normalize(50),
                                        backgroundColor: Colors.yellow,
                                        borderRadius: Normalize(25),
                                        alignSelf: 'center',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }} >
                                        <Fontisto
                                            name="dollar"
                                            size={Normalize(30)}
                                            color={Colors.white}
                                        />
                                    </View>
                                </View>
                                <Text style={[globalStyle_esyPay.pageHeading, { color: Colors.primary, fontSize: Normalize(16), marginVertical: Normalize(10), fontFamily: fontfmliy.bold }]}>Increase Payment</Text>
                                <Text style={[globalStyle_esyPay.pageHeading, { color: Colors.grey, fontSize: Normalize(12.5), lineHeight: Normalize(13), marginBottom: Normalize(15), fontFamily: fontfmliy.regular, textAlign: "center" }]}>{strings.MAKEANOFFER.NEEDMOREDONE}</Text>
                            </View>
                            <View style={{ width: "100%", paddingBottom: Normalize(10), }}>
                                <Text style={[globalstyles.plantext_bold, {
                                    paddingBottom: Normalize(6),
                                    fontSize: Normalize(13),
                                    color: Colors.primary,
                                    textAlign: "left"
                                }]}  >{strings.MAKEANOFFER.HOWMUCHWOULD}</Text>
                                <View style={{ height: Normalize(40), paddingHorizontal: "3%", width: "100%", borderRadius: 5, flexDirection: "row", backgroundColor: Colors.yellowBackground, alignItems: "center" }} >
                                    <Fontisto
                                        name="dollar"
                                        size={Normalize(18)}
                                        color={Colors.primary}
                                    />
                                    <View style={{ flex: 1, }} >
                                        <TextInput
                                            placeholder={strings.MAKEANOFFER.ENTERAMOUNTTEXTINPUT}
                                            placeholderTextColor={Colors.grey}
                                            value={language == "en" ? amount : engToPersian(amount)}
                                            maxLength={10}
                                            keyboardType="number-pad"
                                            onChangeText={(e) => {
                                                getOfferData(e)
                                                setAmount(e)
                                            }}
                                            style={{paddingLeft:Normalize(8), height: "100%", width: "100%", color: Colors.primary, textAlign: language == "en" ? "left" : "right" }}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={{}} >
                                <Text style={[globalstyles.plantext_bold, {
                                    paddingBottom: Normalize(6),
                                    fontSize: Normalize(13),
                                    color: Colors.primary,
                                    textAlign: "left",
                                }]}  >
                                    {
                                        language == "en" ? `Let ${taskername} know why` : "توضیحات"
                                    }
                                </Text>
                                <View style={{ width: "100%", height: Normalize(90), borderRadius: Normalize(8), paddingBottom: Normalize(10), }} >
                                    <View style={{ flex: 1 }}>
                                        <TextInput
                                            value={description}
                                            onChangeText={(e) => setDescription(e)}
                                            placeholder={strings.BASICINFO.PLACEHOLDER}
                                            placeholderTextColor={Colors.grey}
                                            multiline
                                            style={{ backgroundColor: Colors.yellowBackground, borderRadius: Normalize(8), padding: Normalize(10), height: "100%", width: "100%", textAlignVertical: "top", textAlign: language == "en" ? "left" : "right", color: Colors.primary }}
                                            onSubmitEditing={() => { Keyboard.dismiss() }}
                                        />
                                    </View>
                                </View>
                            </View>
                            <Button
                                name={strings.TASKDETAILS.INCREASEPRICE}
                                onPress={increasePriceButton}
                                style={{ backgroundColor: Colors.primary }}
                            />
                            {
                                paymentSummaryModal &&
                                <Modal
                                    animationType="fade"
                                    transparent={true}
                                    visible={paymentSummaryModal}
                                    onRequestClose={() => {
                                        onPressPaymentSummay()
                                        setLoader(false)
                                    }}
                                >
                                    <View style={{ flex: 1, backgroundColor: "rgba(52,52,52,0.8)", justifyContent: "center", alignItems: "center" }} >
                                        <View style={{ padding: Normalize(20), width: "80%", backgroundColor: Colors.white, elevation: 10, borderRadius: Normalize(8) }} >
                                            <View style={{ alignItems: "center" }} >
                                                <View style={{
                                                    height: Normalize(60), width: Normalize(60), backgroundColor: Colors.white, marginTop: Normalize(-50),
                                                    borderRadius: Normalize(30), alignItems: 'center', justifyContent: 'center'
                                                }}>
                                                    <View style={{
                                                        height: Normalize(50),
                                                        width: Normalize(50),
                                                        backgroundColor: Colors.yellow,
                                                        borderRadius: Normalize(25),
                                                        alignSelf: 'center',
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }} >
                                                        <Fontisto
                                                            name="dollar"
                                                            size={Normalize(30)}
                                                            color={Colors.white}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={{ height: Normalize(80), backgroundColor: Colors.grayf8, borderWidth: 1, borderColor: Colors.disable_textinput_border, borderRadius: Normalize(8), flexDirection: language == "en" ? "row" : "row-reverse", paddingLeft: Normalize(10) }} >
                                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                                                    <View style={{ height: Normalize(52), width: Normalize(52), backgroundColor: "#f5f5f5", borderRadius: Normalize(52) / 2, overflow: "hidden" }} >
                                                        <Image style={{ height: "100%", width: "100%", resizeMode: "cover" }}
                                                            source={{ uri: ImageLink.ProfilePhoto + `${taskerImage}` }}
                                                        />
                                                    </View>
                                                </View>
                                                <View style={{ flex: 2.8, justifyContent: "center" }} >
                                                    <Text numberOfLines={1} style={{ fontSize: 15, fontFamily: 'roboto-medium', color: Colors.greyText, textAlign: language == "pr" ? "right" : "left" }}>{taskername}</Text>
                                                    <Text numberOfLines={2} style={{ fontSize: 15, fontFamily: 'roboto-regular', color: Colors.greyText, textAlign: language == "pr" ? "right" : "left" }}>{taskTitle}</Text>
                                                </View>
                                            </View>
                                            <View style={{ paddingHorizontal: Normalize(15), paddingVertical: "2%" }} >
                                                {/* <Text style={{ fontSize: 15, fontFamily: 'roboto-medium', color: Colors.greyText, textAlign: language == "pr" ? "right" : "left", marginBottom: Normalize(8) }}>{strings.MAKEANOFFER.SUMMARY}</Text> */}
                                                <View style={{ flexDirection: language == "en" ? "row" : "row-reverse", justifyContent: "space-between", marginVertical: Normalize(2) }} >
                                                    <Text style={{ fontSize: 15, fontFamily: 'roboto-regular', color: Colors.primary, textAlign: language == "pr" ? "right" : "left" }}>{strings.TASKDETAILS.INCREASEPRICE}</Text>
                                                    <View style={{ flexDirection: language == "en" ? 'row-reverse' : 'row' }} >
                                                        <Text style={{ fontSize: 15, fontFamily: 'roboto-regular', color: Colors.greyText, paddingHorizontal: Normalize(3) }}>{strings.BROWSEFILTER.TOMAN}</Text>
                                                        <Text style={{ fontSize: 15, fontFamily: 'roboto-regular', color: Colors.greyText, }}>{addCommaAndTranslateInPersian(Math.round(amountDetails.offer_amt), language)}</Text>
                                                    </View>
                                                </View>
                                                {
                                                    Math.round(amountDetails.adjust_wallet_balance) > 0 &&
                                                    <View style={{ flexDirection: language == "en" ? "row" : "row-reverse", justifyContent: "space-between", marginVertical: Normalize(2) }} >
                                                        <Text style={{ fontSize: 15, fontFamily: 'roboto-regular', color: Colors.primary, textAlign: language == "pr" ? "right" : "left" }}>{strings.MAKEANOFFER.ADJUSTFROMWALLET}</Text>
                                                        <View style={{ flexDirection: language == "en" ? 'row-reverse' : 'row' }} >
                                                            <Text style={{ fontSize: 15, fontFamily: 'roboto-regular', color: Colors.greyText, paddingHorizontal: Normalize(3) }}>{strings.BROWSEFILTER.TOMAN}</Text>
                                                            <Text style={{ fontSize: 15, fontFamily: 'roboto-regular', color: Colors.greyText, }}>
                                                                {/* {Math.round(amountDetails.adjust_wallet_balance)} */}
                                                                {addCommaAndTranslateInPersian(Math.round(amountDetails.adjust_wallet_balance), language)}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                }
                                                {
                                                    Math.round(amountDetails.adjust_wallet_balance) == 0 ?
                                                        <View style={{ flexDirection: language == "en" ? "row" : "row-reverse", justifyContent: "space-between", marginVertical: Normalize(2) }} >
                                                            <Text style={{ fontSize: 15, fontFamily: 'roboto-medium', color: Colors.primary, textAlign: language == "pr" ? "right" : "left" }}>{strings.MAKEANOFFER.NEEDTOPAY}</Text>
                                                            <View style={{ flexDirection: language == "en" ? 'row-reverse' : 'row' }} >
                                                                <Text style={{ fontSize: 15, fontFamily: 'roboto-medium', color: Colors.greyText, paddingHorizontal: Normalize(3) }}>{strings.BROWSEFILTER.TOMAN}</Text>
                                                                {/* <Text style={{ fontSize: 15, fontFamily: 'roboto-medium', color: Colors.greyText }}>{language == "en" ? numberWithCommas(amountDetails.payblabe_amount) : engToPersian(numberWithCommasinParsian(amountDetails.payblabe_amount))}</Text> */}
                                                                <Text style={{ fontSize: 15, fontFamily: 'roboto-medium', color: Colors.greyText }}>{addCommaAndTranslateInPersian(amountDetails.payblabe_amount, language)}</Text>
                                                            </View>
                                                        </View> :
                                                        Math.round(amountDetails.adjust_wallet_balance) > 0 &&
                                                            (Math.round(amountDetails.adjust_wallet_balance) < Math.round(amountDetails.payblabe_amount)) ?
                                                            <View style={{ flexDirection: language == "en" ? "row" : "row-reverse", justifyContent: "space-between", marginVertical: Normalize(2) }} >
                                                                <Text style={{ fontSize: 15, fontFamily: 'roboto-medium', color: Colors.primary, textAlign: language == "pr" ? "right" : "left" }}>{strings.MAKEANOFFER.NEEDTOPAY}</Text>
                                                                <View style={{ flexDirection: language == "en" ? 'row-reverse' : 'row' }} >
                                                                    <Text style={{ fontSize: 15, fontFamily: 'roboto-medium', color: Colors.greyText, paddingHorizontal: Normalize(3) }}>{strings.BROWSEFILTER.TOMAN}</Text>
                                                                    {/* <Text style={{ fontSize: 15, fontFamily: 'roboto-medium', color: Colors.greyText, }}>{language == "en" ? numberWithCommas((Math.round(amountDetails.payblabe_amount) - Math.round(amountDetails.adjust_wallet_balance))) : engToPersian(numberWithCommasinParsian((Math.round(amountDetails.payblabe_amount) - Math.round(amountDetails.adjust_wallet_balance))))}</Text> */}
                                                                    <Text style={{ fontSize: 15, fontFamily: 'roboto-medium', color: Colors.greyText, }}>{addCommaAndTranslateInPersian(Math.round(amountDetails.payblabe_amount), language)}</Text>
                                                                </View>
                                                            </View> :
                                                            (Math.round(amountDetails.adjust_wallet_balance) >= Math.round(amountDetails.payblabe_amount)) ?
                                                                (Math.round(amountDetails.offer_amt) - Math.round(amountDetails.adjust_wallet_balance) > 0) ?
                                                                    <View style={{ flexDirection: language == "en" ? "row" : "row-reverse", justifyContent: "space-between", marginVertical: Normalize(2) }} >
                                                                        <Text style={{ fontSize: 15, fontFamily: 'roboto-medium', color: Colors.primary, textAlign: language == "pr" ? "right" : "left" }}>{strings.MAKEANOFFER.NEEDTOPAY}</Text>
                                                                        <View style={{ flexDirection: language == "en" ? 'row-reverse' : 'row' }} >
                                                                            <Text style={{ fontSize: 15, fontFamily: 'roboto-medium', color: Colors.greyText, paddingHorizontal: Normalize(3) }}>{strings.BROWSEFILTER.TOMAN}</Text>
                                                                            {/* <Text style={{ fontSize: 15, fontFamily: 'roboto-medium', color: Colors.greyText, }}>{language == "en" ? numberWithCommas((Math.round(amountDetails.offer_amt) - Math.round(amountDetails.adjust_wallet_balance))) : engToPersian(numberWithCommasinParsian((Math.round(amountDetails.offer_amt) - Math.round(amountDetails.adjust_wallet_balance))))}</Text> */}
                                                                            <Text style={{ fontSize: 15, fontFamily: 'roboto-medium', color: Colors.greyText, }}>{addCommaAndTranslateInPersian(Math.round(amountDetails.payblabe_amount), language)}</Text>

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
                                                <Text style={{ color: Colors.greyText, textAlign: language == "en" ? "justify" : "center", fontFamily: "roboto-regular", lineHeight: 20 }}>{strings.MAKEANOFFER.PAYMENTWILLBE}<Text style={{ color: "#7db343" }}
                                                    onPress={() => {
                                                        onPress()
                                                        onPressPaymentSummay()
                                                        navigation.navigate("Howitworks")
                                                    }} > {strings.MAKEANOFFER.IRANTASKERPAY} </Text>{strings.MAKEANOFFER.UNTILLYOURE}<Text style={{ color: "#7db343" }}
                                                        onPress={() => {
                                                            onPress()
                                                            onPressPaymentSummay()
                                                            navigation.navigate("Termsandcondition")
                                                        }}> {strings.MAKEANOFFER.TERMSANDCONDITIONS}</Text></Text>
                                            </View>
                                            <Button
                                                disabled={submitButtonLoader}
                                                name={strings.MAKEANOFFER.SECURELYHOLDPAYMENT}
                                                onPress={SecurelyholdpaymentBotton}
                                                style={{backgroundColor:Colors.primary}}
                                            />

                                            <View style={{ paddingBottom: "2%" }} />
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => {
                                                onPressPaymentSummay()
                                                setLoader(false)
                                            }}
                                            style={{ height: Normalize(50), width: Normalize(50), borderRadius: Normalize(50) / 2, backgroundColor: Colors.white, elevation: 10, justifyContent: "center", alignItems: "center", marginTop: Normalize(10) }} >
                                            <Entypo name="cross" color={Colors.textinput_inner_text} size={Normalize(35)} />
                                        </TouchableOpacity>
                                    </View>
                                </Modal>
                            }
                            {
                                ispaymentgateway &&
                                <WebView_PaymentModal
                                    ispress={ispaymentgateway}
                                    onPress={onPressPamentGetWay}
                                    apiUrl={apiUrl}
                                    prev_func={onPress}
                                    prev_Summary_func={onPressPaymentSummay}

                                />
                            }
                        </View>
                        <TouchableOpacity
                            onPress={onPress}
                            style={{ height: Normalize(50), width: Normalize(50), borderRadius: Normalize(50) / 2, backgroundColor: Colors.white, elevation: 10, justifyContent: "center", alignItems: "center", marginTop: Normalize(10) }} >
                            <Entypo name="cross" color={Colors.textinput_inner_text} size={Normalize(35)} />
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
            }

        </Modal>

    )
}
export default withRtl(IncreasepriceModal_For_Poster);
