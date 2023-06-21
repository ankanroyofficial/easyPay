import { View, Text, SafeAreaView, Dimensions, Image, TextInput, ScrollView, TouchableOpacity, Keyboard } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Colors } from '../../../../constants/colors'
import images from '../../../../constants/images'
import Normalize from '../../../../helpers/Dimens';
import globalStyle_esyPay from '../../../../constants/globalStyles/GlobalStyle_esyPay'
import Button from '../../../../components/Button'
import Header_Transparent from '../../../../components/Header_Transparent'
import strings from '../../../../constants/lng/LocalizedStrings'
import Toast from 'react-native-simple-toast';
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { axiosUrl } from '../../../../constants/LinkPage'
import SocialLogin from '../../socialLogin/SocialLogin';
import { myContext } from '../../../../constants/ContextApi';
import { fontfmliy } from '../../../../components/WhichFontFamily';
const { height, width } = Dimensions.get("window")
export default function TakingEmail() {
    const { fcmToken, setFcmToken, password, confirmPassword, setConfirmPassword, setPassword } = useContext(myContext)
    const navigation = useNavigation()

    const [email, setEmail] = useState("")
    const [isEmailFocused, setIsEmailFocused] = useState(false)
    const [pointA, setPointA] = useState(false)
    const [pointB, setPointB] = useState(false)
    const [loader, setLoader] = useState(false)


    // const onpressContinue = () => {
    //     navigation.navigate("TakingPassword", { email: "email@gmlamd", isInformation: pointB })
    // }


    const onpressContinue = () => {
        try {
            if (email.trim().length == 0) {
                Toast.show("Enter email address")
            } else {
                let text = email
                let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
                var a = reg.test(text)
                if (a == true) {

                    if (!pointA) {
                        Toast.show("Please accept our Terms & Conditions")
                    } else {

                        checkDuplicateEmail(email)
                    }
                } else {
                    Toast.show(strings.ERROR.ENTERVALIDEMAIL)
                }
            }
        } catch (error) {
            console.log("onpressContinue", error)
        }
    }
    const checkDuplicateEmail = async (email) => {
        try {
            setLoader(true)
            let data = {
                "params": {
                    "email": email
                }
            }
            let res = await axios.post(axiosUrl.URL + "check-duplicate-email-id", data)

            // console.log(res.data)

            if (res.data.result) {
                if (res.data.result.meaning == "Email-id is not registered with us!") {
                    navigation.navigate("TakingPassword", { email: email, isInformation: pointB })
                }
            } else {
                Toast.show(res.data.error.meaning);
            }
            setLoader(false)
        } catch (error) {
            setLoader(false)
            console.log("checkDuplicateEmail", error)
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
                            <Text style={globalStyle_esyPay.inputHeader} >Email Address</Text>
                            <TextInput placeholder='Enter your email address'
                                placeholderTextColor={Colors.textinput_placeholder}
                                style={[globalStyle_esyPay.input_noIcon, { borderBottomColor: isEmailFocused ? Colors.primary : Colors.textinput_bottomBorder, fontSize: Normalize(12) }]}
                                value={email}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                onChangeText={(e) => setEmail(e)}
                                onFocus={() => setIsEmailFocused(true)}
                                onBlur={() => setIsEmailFocused(false)}
                            />
                        </View>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => setPointA(!pointA)} style={{ flexDirection: "row", marginBottom: Normalize(20), marginTop: width * 0.08 }} >
                            {/* point a */}
                            <View style={{ paddingHorizontal: Normalize(6), marginTop: Normalize(1) }} >
                                <View style={{ height: Normalize(15), width: Normalize(15), borderRadius: Normalize(15) / 2, backgroundColor: pointA ? Colors.primary : Colors.white, borderWidth: !pointA ? 1 : 0, borderColor: Colors.textinput_bottomBorder }} >
                                    {pointA ?
                                        <Image source={images.white_tik} style={{
                                            height: "80%", width: "80%", resizeMode: "contain",
                                            alignSelf: 'center', marginTop: Normalize(1)
                                        }} />
                                        : null
                                    }
                                </View>
                            </View>
                            <View style={{ flex: 1 }} >
                                <Text style={[globalStyle_esyPay.detailsText, { fontSize: Normalize(12) }]} >I hereby accept the general <Text onPress={() => navigation.navigate("Termsandcondition")} style={{ textDecorationLine: "underline", fontFamily: fontfmliy.bold }} >terms &
                                    conditions</Text> of EazyPay, the cancellation
                                    policy and confirm that I am over 18 years
                                    of age.{"\n"}
                                    Please not our <Text onPress={() => navigation.navigate("PrivacyPolicy")} style={{ textDecorationLine: "underline", fontFamily: fontfmliy.bold }} >privacy policy</Text></Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => setPointB(!pointB)} style={{ flexDirection: "row" }} >
                            {/* point b */}
                            <View style={{ paddingHorizontal: Normalize(6), marginTop: Normalize(1) }} >
                                <View style={{ height: Normalize(15), width: Normalize(15), borderRadius: Normalize(15) / 2, backgroundColor: pointB ? Colors.primary : Colors.white, borderWidth: !pointB ? 1 : 0, borderColor: Colors.textinput_bottomBorder }} >
                                    {pointB ?
                                        <Image source={images.white_tik} style={{
                                            height: "70%", width: "70%", resizeMode: "contain",
                                            alignSelf: 'center', marginTop: Normalize(1)
                                        }} />
                                        : null
                                    }
                                </View>
                            </View>
                            <View style={{ flex: 1 }} >

                                <Text style={[globalStyle_esyPay.detailsText, { fontSize: Normalize(12) }]}>I would like to receive helpful information,
                                    updates, news, and promotion through the
                                    EazyPay newsletter</Text>
                            </View>
                        </TouchableOpacity>


                        <Button
                            disabled={loader}
                            onPress={onpressContinue}
                            name="Continue"
                            style={{ marginVertical: Normalize(25) }}
                        />
                        <View style={{ flexDirection: "row", alignItems: "center" }}  >
                            <View style={{ flex: 1, borderBottomWidth: Normalize(1), height: 0, borderBottomColor: Colors.textinput_bottomBorder, marginHorizontal: Normalize(7) }} />
                            <Text style={{ color: Colors.greyText, fontSize: Normalize(11), fontFamily: fontfmliy.bold }} >OR SIGN UP WITH</Text>
                            <View style={{ flex: 1, borderBottomWidth: Normalize(1), height: 0, borderBottomColor: Colors.textinput_bottomBorder, marginHorizontal: Normalize(7) }} />
                        </View>
                        {/* social Login */}
                        <SocialLogin />
                        <View style={{ alignItems: "center", justifyContent: 'center', flexDirection: 'row', marginTop: Normalize(5), marginBottom: height * 0.07 }} >
                            <Text style={{ fontSize: Normalize(11.5), color: Colors.detailsText, fontFamily: fontfmliy.regular, lineHeight: Normalize(18) }} >Already registered on EazyPay?</Text>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate("TakingEmailForLogin")
                                setPointA(false)
                                setPointB(false)
                                setEmail("")
                                setConfirmPassword("")
                                setPassword("")
                            }}>
                                <Text style={{ fontSize: Normalize(11.5), color: Colors.black, fontFamily: "Lato-Regular", marginLeft: Normalize(5) }}>SIGN IN</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>

                </View>
            </View>
            {/* </ScrollView> */}
        </SafeAreaView>
    )
}

