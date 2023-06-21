import { View, Text, SafeAreaView, Dimensions, Image, TextInput, ScrollView, TouchableOpacity, Platform, Keyboard } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { Colors } from '../../../../constants/colors'
import images from '../../../../constants/images'
import Normalize from '../../../../helpers/Dimens';
import globalStyle_esyPay from '../../../../constants/globalStyles/GlobalStyle_esyPay'
import Button from '../../../../components/Button'
import Header_Transparent from '../../../../components/Header_Transparent'
import Toast from 'react-native-simple-toast';
import { useNavigation } from '@react-navigation/native'
import Entypo from 'react-native-vector-icons/Entypo';
import strings from '../../../../constants/lng/LocalizedStrings';
import { axiosUrl } from '../../../../constants/LinkPage';
import axios from 'axios';
import { myContext } from '../../../../constants/ContextApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { testingText } from '../../../../constants/TestingConstant';
import { fontfmliy } from '../../../../components/WhichFontFamily';
const { height, width } = Dimensions.get("window")
export default function TakingPassword(props) {
    const { fcmToken, setFcmToken, password, confirmPassword, setConfirmPassword, setPassword } = useContext(myContext)
    const { email, isInformation } = props.route.params
    const navigation = useNavigation()

    const [isPasswordFocused, setIsPasswordFocused] = useState(false)
    const [isPasswordShow, setIsPasswordShow] = useState(false)
    const [isConfirmPasswordFocused, setConfirmPasswordEmailFocused] = useState(false)
    const [isConfirmPasswordShow, setConfirmPasswordEmailShow] = useState(false)

    const [loader, setLoader] = useState(false)
    const hasBothCase = (str) => {
        if (str.length > 0 && !((/[a-z]/.test(str)) && (/[A-Z]/.test(str)))) {
            return true;
        } else {
            return false;
        }
    };
    const checkBothCase = (str) => {
        return ((/[a-z]/.test(str)) && (/[A-Z]/.test(str)));
    };
    const isLessDigits = (str) => {
        if (str.length > 0 && str.length < 8) {
            return true;
        } else {
            return false;
        }
    };


    // const onpressresgisterButton = async () => {
    //     navigation.navigate("EmailVerificationPage", { email: "cnaksnckand" })
    // }


    const onpressresgisterButton = async () => {
        try {
            if (password.length >= 8) {
                if (checkBothCase(password)) {
                    if (password == confirmPassword) {
                        registerfunc();
                    } else {
                        Toast.show(strings.ERROR.CONFIRMPASSWORD)
                    }
                } else {
                    Toast.show("At least one uppercase and lowercase compulsory")
                }
            } else {
                Toast.show(strings.ERROR.ENTERPASSWORD8DIGIT)
            }
        } catch (error) {
            console.log("onpressresgisterButton", error)
        }
    }



    const registerfunc = async () => {
        try {

            setLoader(true)
            let data = {
                "params": {
                    "email": email,
                    "isInformation": isInformation ? "yes" : "no",
                    "password": password,
                    "password_confirmation": confirmPassword,
                    "firebase_reg_no": fcmToken !== "" ? fcmToken : "cpuu8oy2A3g-EqiwUcPG7a:APA91bFvUhBshgji__P1h_Z0UgKt15odWc0y1P7z33XVy6OVR1TmkyNVwKl1FVYuK4itkvdM6j5ehSe2WY_MMbdOZQhEoHYhMe3Q9CP38vKaCFowv1zqQMFfmpM_7wqxuyIKetkM4r_h",
                    "device_type": Platform.OS === "android" ? "android" : "iphone"
                }
            }
            // console.log(data)
            let res = await axios.post(axiosUrl.URL + "customer-signup", data)
            // console.log(res.data)
            if (res.data.result) {
                // console.log(res.data.result.user)
                // await AsyncStorage.setItem('lastRegisterEmail', res.data.result.user.email);
                let register_details = { "email": email, "password": password };
                let to_stringify = JSON.stringify(register_details)
                await AsyncStorage.setItem('lastRegisterEmail', to_stringify);
                setPassword("")
                setConfirmPassword("")
                setLoader(false)
                navigation.navigate("EmailVerificationPage", { email })

            } else {
                setLoader(false)
                Toast.show(res.data.error.meaning)
            }


            setLoader(false)

        } catch (error) {
            setLoader(false)
            console.log("onpressRegisterButton", error)
        }
    }

    useEffect(() => {
        Keyboard.addListener('keyboardDidHide', () => {
            Keyboard.dismiss();
        })
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* <ScrollView
                keyboardShouldPersistTaps="always"
                showsVerticalScrollIndicator={false} > */}
            <View style={{ height: height, width: width }} >
                <View style={{ flex: 1 }} >
                    <Image source={images.signupbackground} style={{ height: "100%", width: "100%", resizeMode: "stretch" }} />
                    <View style={{ height: height * 0.086, width: width, position: "absolute", bottom: -Normalize(1) }} >
                        <Image source={images.signupStyle} style={{ height: "100%", width: "100%", resizeMode: "stretch" }} />
                    </View>
                </View>
                <View style={{ flex: 1.8, backgroundColor: "white" }} />
            </View>
            <View style={{ height: height, width: width, position: "absolute", zIndex: 1 }} >
                <View style={{ flex: 1, paddingHorizontal: Normalize(15) }} >
                    <Header_Transparent
                        iswhitebackground={false}
                    />
                    <Text style={[globalStyle_esyPay.pageHeading]} >Join EazyPay</Text>
                </View>
                <View style={{ flex: 2.15, marginHorizontal: Normalize(16) }} >

                    <ScrollView
                        keyboardShouldPersistTaps="always"
                        showsVerticalScrollIndicator={false}
                    >

                        <View style={{}} >
                            <Text style={globalStyle_esyPay.inputHeader} >Password</Text>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", borderBottomWidth: Normalize(1), borderBottomColor: isPasswordFocused ? Colors.primary : Colors.textinput_bottomBorder, }} >
                                <TextInput
                                    value={password}
                                    placeholder='Enter your password'
                                    placeholderTextColor={Colors.textinput_placeholder}
                                    style={[globalStyle_esyPay.input_noIcon, { height: "100%", borderBottomWidth: 0, width: "88%" }]}
                                    secureTextEntry={!isPasswordShow ? true : false}
                                    keyboardType="default"
                                    autoCapitalize="none"
                                    onChangeText={(e) => {
                                        setPassword(e),
                                            AsyncStorage.setItem('p', e);
                                    }}
                                    onFocus={() => setIsPasswordFocused(true)}
                                    onBlur={() => setIsPasswordFocused(false)}
                                />
                                <TouchableOpacity activeOpacity={1} onPress={() => setIsPasswordShow(!isPasswordShow)} style={{ height: Normalize(30), width: Normalize(30), justifyContent: "flex-end", alignItems: "center" }} >
                                    <Entypo name={!isPasswordShow ? "eye" : "eye-with-line"} color={Colors.primary} size={Normalize(18)} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ marginTop: Normalize(18) }} >
                            <Text style={globalStyle_esyPay.inputHeader} >Confirm Password</Text>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", borderBottomWidth: Normalize(1), borderBottomColor: isConfirmPasswordFocused ? Colors.primary : Colors.textinput_bottomBorder, }} >
                                <TextInput
                                    value={confirmPassword}
                                    placeholder='Enter your password'
                                    placeholderTextColor={Colors.textinput_placeholder}
                                    style={[globalStyle_esyPay.input_noIcon, { height: "100%", borderBottomWidth: 0, width: "88%" }]}
                                    secureTextEntry={!isConfirmPasswordShow ? true : false}
                                    keyboardType="default"
                                    autoCapitalize="none"
                                    onChangeText={(e) => {
                                        setConfirmPassword(e),
                                            AsyncStorage.setItem('cp', e);
                                    }}
                                    onFocus={() => setConfirmPasswordEmailFocused(true)}
                                    onBlur={() => setConfirmPasswordEmailFocused(false)}
                                />
                                <TouchableOpacity activeOpacity={1} onPress={() => setConfirmPasswordEmailShow(!isConfirmPasswordShow)} style={{ height: Normalize(30), width: Normalize(30), justifyContent: "flex-end", alignItems: "center" }} >
                                    <Entypo name={!isConfirmPasswordShow ? "eye" : "eye-with-line"} color={Colors.primary} size={Normalize(18)} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {(testingText.lastupdateDate).length > 0 && <Text style={{ textAlign: "center", color: Colors.green_new, fontSize: Normalize(12), fontFamily: fontfmliy.bold }} >{testingText.lastupdateDate}</Text>}
                        {(testingText.text).length > 0 && <Text style={{ textAlign: "center", color: Colors.red_old, fontSize: Normalize(12), fontFamily: fontfmliy.bold }} >{testingText.text}</Text>}
                        <View style={{ flexDirection: "row", marginTop: Normalize(30) }} >
                            <View style={{ paddingHorizontal: Normalize(6), justifyContent: "center" }} >
                                <View style={{ height: Normalize(10), width: Normalize(10), borderRadius: Normalize(10) / 2, backgroundColor: isLessDigits(password) ? Colors.red_old : Colors.grey }} ></View>
                            </View>
                            <View style={{ flex: 1 }} >
                                <Text style={[globalStyle_esyPay.detailsText, { color: isLessDigits(password) ? Colors.red_old : Colors.detailsText, fontFamily: isLessDigits(password) ? fontfmliy.bold : fontfmliy.regular }]}>At least 8 characters</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", marginVertical: Normalize(10) }} >
                            <View style={{ paddingHorizontal: Normalize(6), justifyContent: "center" }} >
                                <View style={{ height: Normalize(10), width: Normalize(10), borderRadius: Normalize(10) / 2, backgroundColor: hasBothCase(password) ? Colors.red_old : Colors.grey }} ></View>
                            </View>
                            <View style={{ flex: 1 }} >
                                <Text style={[globalStyle_esyPay.detailsText, { color: hasBothCase(password) ? Colors.red_old : Colors.detailsText, fontFamily: hasBothCase(password) ? fontfmliy.bold : fontfmliy.regular }]}>A mixture of uppercase & lowercase letter</Text>
                            </View>
                        </View>

                    </ScrollView>
                    <Button
                        disabled={loader}
                        onPress={onpressresgisterButton}
                        name="Register"
                        style={{ marginTop: Normalize(25), marginBottom: height * 0.07 }}
                    />
                </View>
            </View>
            {/* </ScrollView> */}
        </SafeAreaView>
    )
}