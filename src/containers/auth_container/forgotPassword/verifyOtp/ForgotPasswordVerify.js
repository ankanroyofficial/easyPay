import React, { useRef, useState, useEffect } from 'react'
import {
    View, Text, Dimensions, TextInput, Image, StyleSheet, TouchableOpacity,
    SafeAreaView, ActivityIndicator, StatusBar, KeyboardAvoidingView, Platform
} from 'react-native'
import { useRtlContext } from 'react-native-easy-localization-and-rtl';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { Colors } from '../../../../constants/colors'
import Normalize from './../../../../helpers/Dimens';
import Toast from 'react-native-simple-toast';
import Button from '../../../../components/Button';
import Header from '../../../../components/Header';
import strings from '../../../../constants/lng/LocalizedStrings';
import { axiosUrl } from '../../../../constants/LinkPage';
import axiosInstance from '../../../../constants/AxiosCallPage';
import { whichFontFamily } from '../../../../constants/WhichFontFamily';
import Header_Transparent from '../../../../components/Header_Transparent';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
import images from '../../../../constants/images';
import { fontfmliy } from '../../../../components/WhichFontFamily';
import { Keyboard } from 'react-native';

export const { height, width } = Dimensions.get("window")
export default function ForgotPasswordVerify({ route, navigation }) {
    const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
    const { email } = route.params

    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)

    const changeMail = (str) => {
        let a = str
        let emailSplit = a.split("@")
        let firstarr = emailSplit[0]
        let firstsecondletter = firstarr[0] + firstarr[1]
        var starstring = "";

        let numofStar = firstarr.length - 2

        for (var i = 1; i <= numofStar; i++) {
            starstring = starstring + "*"
        }
        let finalemail = firstsecondletter + starstring + "@" + emailSplit[1]

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
    const [loader, setLoader] = useState(false);

    const resendButton = async () => {
        try {
            const data = {
                "params": {
                    "type": "R",
                    "email": email
                }
            }
            const res = await axiosInstance.post("send-reset-link-email", data)

            // console.log(res.data)
            if (res.data.result) {
                Toast.show(res.data.result.success.meaning)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const submitButton = async () => {
        try {
            setLoader(true)
            const res = await axios({
                method: 'post',
                url: `${axiosUrl.URL}otp-reset`,
                headers: {
                    'X-localization': language == 'pr' ? 'fa' : 'en',
                },
                data: {
                    "params": {
                        "email": email,
                        "code1": pin1,
                        "code2": pin2,
                        "code3": pin3,
                        "code4": pin4
                    }
                }
            });

            if (res.data.result.error) {
                Toast.show(res.data.result.error.meaning)
                setLoader(false)
            } else {
                Toast.show(res.data.result.success.meaning)
                navigation.replace("NewPassword", { email: email, otp: pin1 + pin2 + pin3 + pin4 })
                setLoader(false)
            }
        } catch (error) {
            setLoader(false)
            console.log(error)
        }
    }

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', () => setIsKeyboardVisible(true))
        Keyboard.addListener('keyboardDidHide', () => {
            Keyboard.dismiss();
            setIsKeyboardVisible(false)
        })
    }, [])
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <KeyboardAvoidingView
                behavior={(Platform.OS === 'ios') ? "padding" : null} style={globalstyles.container}>
                <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
                <Header_Transparent iswhitebackground />

                {!isKeyboardVisible && <View style={{ height: Normalize(130), width: Normalize(130), alignSelf: "center", marginBottom: Normalize(20) }} >
                    <Image source={images.phOtp} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                </View>}

                <View style={{ flex: 1, marginTop: Normalize(10) }}>
                    <Text style={globalstyles.page_Header_Text}>Email verification</Text>
                    <Text style={[globalstyles.page_SubHeader_Text, { marginBottom: Normalize(35) }]}>One Time Password (OTP) has been sent to your registered email ID : <Text style={{ fontSize: Normalize(12), color: Colors.greylightText }} >{changeMail(email)}</Text></Text>
                    <View style={{ height: height * 0.08, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginHorizontal: Normalize(30) }}>
                        <View style={[style.smallinputbox, {}]}>
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
                    <View style={{ flex: 1 }} />

                    <Text style={[globalstyles.page_SubHeader_Text, { fontSize: Normalize(12), textAlign: "center" }]}>Did not received verification code yet?</Text>
                    <TouchableOpacity onPress={resendButton} style={{ flexDirection: "row", alignItems: "center", alignSelf: "center", marginBottom: Normalize(10) }} >
                        <View style={{ height: Normalize(11), width: Normalize(11), marginHorizontal: "1%" }} >
                            <Image source={images.resend} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                        </View>
                        <Text style={{ fontSize: Normalize(12), color: Colors.secondary, fontFamily: fontfmliy.bold }}>Resend</Text>
                    </TouchableOpacity>
                    <Button
                        style={{ marginBottom: Normalize(13) }}
                        disabled={loader ? true : false}
                        onPress={submitButton}
                        name={loader ? "" : strings.MAKEANOFFER.SUBMIT}
                    >
                        {loader &&
                            <ActivityIndicator
                                color={Colors.white}
                            />}
                    </Button>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}



const style = StyleSheet.create({
    smallinputbox: {
        height: width * 0.13,
        width: width * 0.12,
        backgroundColor: Colors.grayf5,
        borderRadius: Normalize(7),
        elevation: 1
    },
    smalltextInput: {
        fontSize: width * 0.06,
        fontSize: Normalize(15),
        textAlign: "center",
        color: Colors.primary,
        fontFamily: fontfmliy.bold,

    }
})


