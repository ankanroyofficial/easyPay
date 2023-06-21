import React, { useRef, useState, useEffect, useContext } from 'react'
import { View, Text, Dimensions, TextInput, Image, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, KeyboardAvoidingView, Platform } from 'react-native'
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import Button from '../../../../../components/Button'
import Header from '../../../../../components/Header'
import { Colors } from '../../../../../constants/colors'
import strings from '../../../../../constants/lng/LocalizedStrings'
import Normalize from './../../../../../helpers/Dimens';
import Toast from 'react-native-simple-toast';
import { axiosUrl } from '../../../../../constants/LinkPage';
import axiosInstance from '../../../../../constants/AxiosCallPage';
import { engToPersian } from '../../../../../constants/EnglishToPersian';
import Header_Transparent from '../../../../../components/Header_Transparent';
import globalstyles from '../../../../../constants/globalStyles/Global_Styles';
import images from '../../../../../constants/images';
import { myContext } from '../../../../../constants/ContextApi';

export const { height, width } = Dimensions.get("window")
export default function PhoneVerifyPage({ route, navigation }) {
    const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
    const { setPhone_numbe } = useContext(myContext);
    const { otp, phoneNumber } = route.params

    var newOtp = otp.toString();
    // console.log(newOtp)
    var result = (phoneNumber.toString()).replace(/\d(?=.*\d{3})/g, "*");
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



    const result_pr = (val) => {
        let a = val.toString()
        a = a.toEnglishDigits()
        a = (a.toString()).replace(/\d(?=.*\d{3})/g, "*");
        return engToPersian(a)
    }





    const input1 = useRef();
    const input2 = useRef();
    const input3 = useRef();
    const input4 = useRef();


    // const [pin1, setPin1] = useState("")
    // const [pin2, setPin2] = useState("")
    // const [pin3, setPin3] = useState("")
    // const [pin4, setPin4] = useState("")
    
    
    
    const [pin1, setPin1] = useState(newOtp ? newOtp[0] : "")
    const [pin2, setPin2] = useState(newOtp ? newOtp[1] : "")
    const [pin3, setPin3] = useState(newOtp ? newOtp[2] : "")
    const [pin4, setPin4] = useState(newOtp ? newOtp[3] : "")



    const [token, setToken] = useState("");







    const getTokon = async () => {
        try {
            //   setLoader(true)
            let token = await AsyncStorage.getItem("token");
            setToken(token)
            //   setLoader(false)
        } catch (error) {
            console.log(error)
            //   setLoader(false)
        }
    }
    useEffect(() => {
        getTokon()
    }, []);


    const resendButton = async () => {
        try {
            const data = {
                "jsonrpc": "2.0",
                "params": {
                    "type": "R"
                }
            }

            const res = await axiosInstance.post("get-phone-otp", data)
            if (res.data.result) {
                newOtp = (res.data.result.otp).toString()
                setPin1(newOtp[0])
                setPin2(newOtp[1])
                setPin3(newOtp[2])
                setPin4(newOtp[3])
                Toast.show(res.data.result.success.meaning)
            }
        } catch (error) {
            console.log(error)
        }
    }


    const submitButton = async () => {
        try {
            const data = {
                "jsonrpc": "2.0",
                "params": {
                    "code1": pin1,
                    "code2": pin2,
                    "code3": pin3,
                    "code4": pin4
                }
            }
            const res = await axiosInstance.post("phone-verify", data)

            // console.log(res.data)
            if (res.data.result.error) {
                Toast.show(res.data.result.error.meaning)
            } else {
                Toast.show(res.data.result.success.meaning)
                setPhone_numbe({ isActive: true, activeTitle: phoneNumber })
                navigation.goBack()
            }
        } catch (error) {
            console.log("submitButton", error)
        }
    }
    return (
        <SafeAreaView style={{ backgroundColor: Colors.white, flex: 1, flexDirection: 'column' }}>

            <KeyboardAvoidingView
                behavior={(Platform.OS === 'ios') ? "padding" : null} style={globalstyles.container}>
                <StatusBar backgroundColor={Colors.white} barStyle="dark-content"/>
                <Header_Transparent />
                <View style={{ flex: 1 }}>
                    <Text style={globalstyles.page_Header_Text}>{language == "en" ? "Phone number verification" : "پست الکترونیکی / شماره تلفن"}</Text>
                    <Text style={[globalstyles.page_SubHeader_Text, { marginBottom: Normalize(35) }]}>One Time Password (OTP) has been sent to your registered phone number <Text style={{ fontSize: Normalize(12), color: Colors.greylightText }} >{result}</Text></Text>
                    <View style={{ height: height * 0.08, flexDirection: "row", alignItems: "center", justifyContent: "space-between", margin: 10 }}>
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
                                        }
                                    }
                                }
                                keyboardType="decimal-pad"
                                style={style.smalltextInput}
                            />
                        </View>
                    </View>
                    <View style={{ height: Normalize(20) }} />
                    <Button
                        onPress={submitButton}
                        name={language == "en" ? "Submit" : "ارسال"}
                        style={{ marginBottom: Normalize(15) }}
                    />
                    <Text style={[globalstyles.page_SubHeader_Text, { fontSize: Normalize(12), textAlign: "center" }]}>{language == "en" ? "Did not received verification code yet," : "هنوز کد تأیید را دریافت نکرده اید؟"}</Text>
                    <TouchableOpacity onPress={resendButton} style={{ flexDirection: language == "en" ? "row" : "row-reverse", alignItems: "center", alignSelf: "center" }} >
                        <View style={{ height: Normalize(12), width: Normalize(12), marginHorizontal: "1%" }} >
                            <Image source={images.resend} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                        </View>
                        <Text style={{ fontSize: Normalize(12), color: Colors.secondary }}>{language == "en" ? "Resend" : 'ارسال مجدد کد'}</Text>
                    </TouchableOpacity>
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


