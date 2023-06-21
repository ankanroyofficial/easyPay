import React, { useRef, useState, useEffect, useContext } from 'react'
import { View, Text, Dimensions, TextInput, Image, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Platform, KeyboardAvoidingView, ScrollView } from 'react-native'
import { useRtlContext } from 'react-native-easy-localization-and-rtl';
import Button from '../../../../../components/Button'
import { Colors } from '../../../../../constants/colors'
import Normalize from './../../../../../helpers/Dimens';
import Toast from 'react-native-simple-toast';
import axiosInstance from '../../../../../constants/AxiosCallPage';
import images from '../../../../../constants/images';
import globalstyles from '../../../../../constants/globalStyles/Global_Styles';
import Header_Transparent from '../../../../../components/Header_Transparent';
import { myContext } from '../../../../../constants/ContextApi';
export const { height, width } = Dimensions.get("window")
export default function BothEmailPhoneVerify({ route, navigation }) {
    const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
    const { setEmail_Address, setPhone_numbe } = useContext(myContext);
    const { email, phone, is_email_verified, is_phone_verified, phone_otp, email_otp } = route.params

    // console.log("email", email)
    // console.log("phone", phone)
    // console.log("is_email_verified", is_email_verified)
    // console.log("is_phone_verified", is_phone_verified)
    // console.log("phone_otp", phone_otp)
    // console.log("email_otp", email_otp)

    const changeMail = (str) => {
        let a = str
        let emailSplit = a.split("@")
        let firstarr = emailSplit[0]
        let firstletter = firstarr[0]
        var starstring = "";

        let numofStar = firstarr.length - 1

        for (var i = 1; i <= numofStar; i++) {
            starstring = starstring + "*"
        }
        let finalemail = firstletter + starstring + "@" + emailSplit[1]

        return finalemail;
    }
    const input1 = useRef();
    const input2 = useRef();
    const input3 = useRef();
    const input4 = useRef();
    const input5 = useRef();
    const input6 = useRef();
    const [pin1, setPin1] = useState("")
    const [pin2, setPin2] = useState("")
    const [pin3, setPin3] = useState("")
    const [pin4, setPin4] = useState("")
    const [pin5, setPin5] = useState("")
    const [pin6, setPin6] = useState("")


    var newOtp = phone_otp.toString();
    var result = (phone.toString()).replace(/\d(?=.*\d{3})/g, "*");

    const input1_ph = useRef();
    const input2_ph = useRef();
    const input3_ph = useRef();
    const input4_ph = useRef();


    // const [pin1_ph, setPin1_ph] = useState("")
    // const [pin2_ph, setPin2_ph] = useState("")
    // const [pin3_ph, setPin3_ph] = useState("")
    // const [pin4_ph, setPin4_ph] = useState("")


    const [pin1_ph, setPin1_ph] = useState(newOtp ? newOtp[0] : "")
    const [pin2_ph, setPin2_ph] = useState(newOtp ? newOtp[1] : "")
    const [pin3_ph, setPin3_ph] = useState(newOtp ? newOtp[2] : "")
    const [pin4_ph, setPin4_ph] = useState(newOtp ? newOtp[3] : "")

    const resendButton_ph = async () => {
        try {
            const data = {
                "jsonrpc": "2.0",
                "params": {
                    "type": "R"
                }
            }
            const res = await axiosInstance.post("get-phone-otp", data)
            if (res.data.result) {
                var newOtp = (res.data.result.otp).toString()
                setPin1_ph(newOtp[0])
                setPin2_ph(newOtp[1])
                setPin3_ph(newOtp[2])
                setPin4_ph(newOtp[3])
                Toast.show(res.data.result.success.meaning)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const resendButton_email = async () => {
        try {
            const data = {
                "jsonrpc": "2.0",
                "params": {
                    "type": "R"
                }
            }
            const res = await axiosInstance.post("get-email-otp", data)
            if (res.data.result) {
                Toast.show(res.data.result.success.meaning)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const finalSubmitApi = async () => {
        try {
            const data = {
                "jsonrpc": "2.0",
                "params": {
                    "email_code1": pin1,
                    "email_code2": pin2,
                    "email_code3": pin3,
                    "email_code4": pin4,
                    "email_code5": pin5,
                    "email_code6": pin6,
                    "phone_code1": pin1_ph,
                    "phone_code2": pin2_ph,
                    "phone_code3": pin3_ph,
                    "phone_code4": pin4_ph
                }
            }
            const res = await axiosInstance.post("email-phone-verify", data)
            // console.log(res.data)
            if (res.data.error) {
                Toast.show(res.data.error.meaning)
            } else {
                if (is_phone_verified == "N" && is_email_verified == "N") {
                    setEmail_Address({ isActive: true, activeTitle: email })
                    setPhone_numbe({ isActive: true, activeTitle: phone })
                    Toast.show(res.data.result.success.meaning)
                } else if (is_phone_verified == "Y" && is_email_verified == "N") {
                    setEmail_Address({ isActive: true, activeTitle: email })
                    Toast.show("Email-id verified successfully!")
                } else if (is_phone_verified == "N" && is_email_verified == "Y") {
                    setEmail_Address({ isActive: true, activeTitle: email })
                    Toast.show("phone verified successfully!")
                } else {
                    Toast.show("error")
                }
                navigation.goBack()
            }
        } catch (error) {
            console.log("finalSubmitApi", error)
        }
    }
    const submitButton = async () => {
        try {

            if (is_phone_verified == "N" && is_email_verified == "N") {
                if (pin1 == "" || pin2 == "" || pin3 == "" || pin4 == "" || pin5 == "" || pin6 == "" || pin1_ph == "" || pin2_ph == "" || pin3_ph == "" || pin4_ph == "") {
                    Toast.show("Please enter Both email and phone verified code Correctly")
                } else {
                    finalSubmitApi()
                }
            } else if (is_phone_verified == "Y" && is_email_verified == "N") {
                if (pin1 == "" || pin2 == "" || pin3 == "" || pin4 == "" || pin5 == "" || pin6 == "") {
                    Toast.show("Please enter email verified code Correctly")
                } else {
                    finalSubmitApi()
                }
            } else if (is_phone_verified == "N" && is_email_verified == "Y") {
                if (pin1_ph == "" || pin2_ph == "" || pin3_ph == "" || pin4_ph == "") {
                    Toast.show("Please enter phone verified code Correctly")
                } else {
                    finalSubmitApi()
                }
            } else {
                Toast.show("error")
            }
        } catch (error) {
            console.log("submitButton", error)
        }
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>

            <KeyboardAvoidingView
                behavior={(Platform.OS === 'ios') ? "padding" : null} style={globalstyles.container}>
                <StatusBar backgroundColor={Colors.white} barStyle="dark-content"/>
                <Header_Transparent />
                <View style={{ flex: 1 }}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="always"
                    >
                        {/* *****************Phone OTP***************** */}
                        {
                            is_phone_verified == "N" &&
                            <View style={{ paddingBottom: Normalize(15) }}>
                                <Text style={globalstyles.page_Header_Text}>{language == "en" ? "Phone number verification" : "پست الکترونیکی / شماره تلفن"}</Text>
                                <Text style={[globalstyles.page_SubHeader_Text, { marginBottom: Normalize(15) }]}>One Time Password (OTP) has been sent to your registered phone number <Text style={{ fontSize: Normalize(12), color: Colors.greylightText }} >{result}</Text></Text>
                                <View style={{ height: height * 0.08, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginHorizontal: Normalize(10) }}>
                                    <View style={style.smallinputbox}>
                                        <TextInput
                                            ref={input1_ph}
                                            maxLength={1}
                                            value={pin1_ph}
                                            onChangeText={
                                                (e) => {
                                                    setPin1_ph(e)
                                                    if (pin1 != "") {
                                                        input1_ph.current.focus()
                                                    } else {
                                                        input2_ph.current.focus()
                                                    }
                                                }
                                            }
                                            keyboardType="decimal-pad"
                                            style={style.smalltextInput}
                                        />
                                    </View>
                                    <View style={style.smallinputbox}>
                                        <TextInput maxLength={1}
                                            ref={input2_ph}
                                            value={pin2_ph}
                                            onChangeText={
                                                (e) => {
                                                    setPin2_ph(e)
                                                    if (pin2_ph != "") {
                                                        input1_ph.current.focus()
                                                    } else {
                                                        input3_ph.current.focus()
                                                    }
                                                }
                                            }
                                            keyboardType="decimal-pad"
                                            style={style.smalltextInput}
                                        />
                                    </View>
                                    <View style={style.smallinputbox}>
                                        <TextInput maxLength={1}
                                            value={pin3_ph}
                                            ref={input3_ph}
                                            onChangeText={
                                                (e) => {
                                                    setPin3_ph(e)
                                                    if (pin3_ph != "") {
                                                        input2_ph.current.focus()
                                                    } else {
                                                        input4_ph.current.focus()
                                                    }
                                                }
                                            }
                                            keyboardType="decimal-pad"
                                            style={style.smalltextInput}

                                        />
                                    </View>
                                    <View style={style.smallinputbox}>
                                        <TextInput maxLength={1}
                                            ref={input4_ph}
                                            value={pin4_ph}
                                            onChangeText={
                                                (e) => {
                                                    setPin4_ph(e)
                                                    if (pin4_ph != "") {
                                                        input3_ph.current.focus()
                                                    }
                                                }
                                            }
                                            keyboardType="decimal-pad"
                                            style={style.smalltextInput}
                                        />
                                    </View>
                                </View>
                                <Text style={[globalstyles.page_SubHeader_Text, { fontSize: Normalize(12), textAlign: "center" }]}>{language == "en" ? "Did not received verification code yet," : "هنوز کد تأیید را دریافت نکرده اید؟"}</Text>
                                <TouchableOpacity onPress={resendButton_ph} style={{ flexDirection: language == "en" ? "row" : "row-reverse", alignItems: "center", alignSelf: "center" }} >
                                    <View style={{ height: Normalize(12), width: Normalize(12), marginHorizontal: "1%" }} >
                                        <Image source={images.resend} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                    </View>
                                    <Text style={{ fontSize: Normalize(12), color: Colors.secondary }}>{language == "en" ? "Resend" : 'ارسال مجدد کد'}</Text>
                                </TouchableOpacity>
                            </View>}
                        {/* **************************email OTP****************** */}
                        {
                            is_email_verified == "N" &&
                            <View style={{}} >
                                <Text style={globalstyles.page_Header_Text}>{language == "en" ? "Email verification" : "تأیید پست الکترونیکی"}</Text>
                                <Text style={{
                                    fontSize: Normalize(13),
                                    fontFamily: 'roboto-regular',
                                    color: Colors.grey,
                                    lineHeight: Normalize(18),
                                    paddingTop: Normalize(8),
                                    marginBottom: Normalize(15)
                                }}>One Time Password (OTP) has been sent to your registered email ID : <Text style={{ fontSize: Normalize(12), color: Colors.greylightText }} >{changeMail(email)}</Text></Text>
                                <View style={{ height: height * 0.08, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginHorizontal: Normalize(4) }}>
                                    <View style={style.smallinputbox}>
                                        <TextInput
                                            ref={input1}
                                            maxLength={1}
                                            value={pin1}
                                            onChangeText={
                                                (e) => {
                                                    setPin1(e)
                                                    if (pin1 != "") {
                                                        input1.current.focus()
                                                    } else {
                                                        input2.current.focus()
                                                    }
                                                }
                                            }
                                            keyboardType="decimal-pad"
                                            style={style.smalltextInput}

                                        />
                                    </View>
                                    <View style={style.smallinputbox}>
                                        <TextInput maxLength={1}
                                            ref={input2}
                                            value={pin2}
                                            onChangeText={
                                                (e) => {
                                                    setPin2(e)
                                                    if (pin2 != "") {
                                                        input1.current.focus()
                                                    } else {
                                                        input3.current.focus()
                                                    }
                                                }

                                            }
                                            keyboardType="decimal-pad"
                                            style={style.smalltextInput}

                                        />
                                    </View>
                                    <View style={style.smallinputbox}>
                                        <TextInput maxLength={1}
                                            value={pin3}
                                            ref={input3}
                                            onChangeText={
                                                (e) => {
                                                    setPin3(e)
                                                    if (pin3 != "") {
                                                        input2.current.focus()
                                                    } else {
                                                        input4.current.focus()
                                                    }
                                                }
                                            }
                                            keyboardType="decimal-pad"
                                            style={style.smalltextInput}

                                        />
                                    </View>
                                    <View style={style.smallinputbox}>
                                        <TextInput maxLength={1}
                                            ref={input4}
                                            value={pin4}
                                            onChangeText={
                                                (e) => {
                                                    setPin4(e)
                                                    if (pin4 != "") {
                                                        input3.current.focus()
                                                    } else {
                                                        input5.current.focus()

                                                    }
                                                }
                                            }
                                            keyboardType="decimal-pad"
                                            style={style.smalltextInput}
                                        />
                                    </View>
                                    <View style={style.smallinputbox}>
                                        <TextInput maxLength={1}
                                            ref={input5}
                                            value={pin5}
                                            onChangeText={
                                                (e) => {
                                                    setPin5(e)
                                                    if (pin5 != "") {
                                                        input4.current.focus()
                                                    } else {
                                                        input6.current.focus()
                                                    }
                                                }
                                            }
                                            keyboardType="decimal-pad"
                                            style={style.smalltextInput}
                                        />
                                    </View>
                                    <View style={style.smallinputbox}>
                                        <TextInput maxLength={1}
                                            ref={input6}
                                            value={pin6}
                                            onChangeText={
                                                (e) => {
                                                    setPin6(e)
                                                    if (pin6 != "") {
                                                        input5.current.focus()
                                                    }
                                                }
                                            }
                                            keyboardType="decimal-pad"
                                            style={style.smalltextInput}
                                        />
                                    </View>
                                </View>
                                <Text style={[globalstyles.page_SubHeader_Text, { fontSize: Normalize(12), textAlign: "center" }]}>{language == "en" ? "Did not received verification code yet," : "هنوز کد تأیید را دریافت نکرده اید؟"}</Text>
                                <TouchableOpacity onPress={resendButton_email} style={{ flexDirection: language == "en" ? "row" : "row-reverse", alignItems: "center", alignSelf: "center" }} >
                                    <View style={{ height: Normalize(12), width: Normalize(12), marginHorizontal: "1%" }} >
                                        <Image source={images.resend} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                    </View>
                                    <Text style={{ fontSize: Normalize(12), color: Colors.secondary }}>{language == "en" ? "Resend" : 'ارسال مجدد کد'}</Text>
                                </TouchableOpacity>
                            </View>}
                        <View style={{ height: Normalize(30) }} />
                        <Button
                            onPress={submitButton}
                            name={language == "en" ? "Submit" : "ارسال"}
                            style={{ marginBottom: Normalize(15) }}
                        />
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    smallinputbox: {
        height: width * 0.13,
        width: width * 0.12,
        backgroundColor: "#f8f8f8",
        borderWidth: Normalize(1),
        borderRadius: Normalize(3),
        borderColor: Colors.lightGrey,
    },
    smalltextInput: {
        flex: 1,
        fontSize: width * 0.06,
        textAlign: "center",
        color: Colors.greyText,
        fontFamily: "Outfit-Medium",

    }
})