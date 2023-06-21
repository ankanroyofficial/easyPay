import { View, Text, SafeAreaView, Dimensions, Image, TextInput, ScrollView, Keyboard } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Colors } from '../../../../constants/colors'
import images from '../../../../constants/images'
import Normalize from '../../../../helpers/Dimens';
import globalStyle_esyPay from '../../../../constants/globalStyles/GlobalStyle_esyPay'
import Button from '../../../../components/Button'
import Header_Transparent from '../../../../components/Header_Transparent'
import strings from '../../../../constants/lng/LocalizedStrings'
import Toast from 'react-native-simple-toast';
import { useNavigation } from "@react-navigation/native"
import SocialLogin from '../../socialLogin/SocialLogin'
import axios from 'axios';
import { axiosUrl } from '../../../../constants/LinkPage';
import { TouchableOpacity } from 'react-native';
import { testingText } from '../../../../constants/TestingConstant';
import { myContext } from '../../../../constants/ContextApi';
import { fontfmliy } from '../../../../components/WhichFontFamily';

const { height, width } = Dimensions.get("window")
export default function TakingEmailForLogin() {
    const { setLoginPassword } = useContext(myContext)
    const navigation = useNavigation()
    const [email, setEmail] = useState("")
    const [isEmailFocused, setIsEmailFocused] = useState(false)
    const [isError, setisError] = useState(false)

    const onpressContinue = async () => {
        try {
            if (email == "" || email.trim() == "") {
                Toast.show(strings.ERROR.ENTEREMAILORPHONE)
            } else {
                let text = email
                let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
                var a = reg.test(text)
                if (a == true) {
                    const data = await axios({
                        method: "post",
                        url: `${axiosUrl.URL}check-duplicate-email-id`,
                        data: {
                            "jsonrpc": "2.0",
                            "params": {
                                "email": email,
                                // "type": "login"
                            }
                        }
                    })

                    // console.log(data.data)
                    if (data.data.result) {

                        if (data.data.result.meaning == "Email-id is not registered with us!") {
                            // Toast.show("Email not registered")
                            setisError(true)
                        }
                    } else {
                        navigation.navigate("TakingPasswordForLogin", { email: email })
                    }

                } else {
                    Toast.show(strings.ERROR.ENTERVALIDEMAIL)
                }
            }
        } catch (error) {
            console.log("onpressContinue", error)
        }

    }

    useEffect(() => {
        Keyboard.addListener('keyboardDidHide', () => {
            Keyboard.dismiss();
        })
    }, [])
    return (
        <SafeAreaView style={{ backgroundColor: Colors.blue, flex: 1, flexDirection: 'column' }}>
            <View style={{ flex: 1 }}>
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
                        <Text style={[globalStyle_esyPay.pageHeading]} >Welcome Back</Text>
                    </View>

                    <View style={{ flex: 2.15, marginHorizontal: Normalize(16) }} >
                        {/* <ScrollView
                            keyboardShouldPersistTaps="always"
                            showsVerticalScrollIndicator={false}
                        > */}
                        <View style={{ flex: 1 }} >
                            <View style={{}} >
                                <Text style={globalStyle_esyPay.inputHeader} >Email or Phone number</Text>
                                <TextInput placeholder='Email / Phone Number'
                                    placeholderTextColor={Colors.textinput_placeholder}
                                    style={[globalStyle_esyPay.input_noIcon, { borderBottomColor: isEmailFocused ? Colors.primary : Colors.textinput_bottomBorder, }]}
                                    value={email}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    onChangeText={(e) => { setEmail(e), setisError(false) }}
                                    onFocus={() => setIsEmailFocused(true)}
                                    onBlur={() => setIsEmailFocused(false)}
                                />
                            </View>
                            {isError ? <Text style={{ color: 'red', fontSize: Normalize(11), alignSelf: 'flex-end', fontFamily:fontfmliy.regular, height: 20 }} >Email not registered</Text> : <Text style={{ color: 'red', fontSize: Normalize(11), height: 20 }} ></Text>}

                            {(testingText.text).length > 0 && <Text style={{ textAlign: "center", color: Colors.red_old, fontSize: Normalize(12), fontFamily: fontfmliy.bold }} >{testingText.text}</Text>}
                            {(testingText.lastupdateDate).length > 0 && <Text style={{ textAlign: "center", color: Colors.green_new, fontSize: Normalize(12), fontFamily: fontfmliy.bold }} >{testingText.lastupdateDate}</Text>}


                            <View style={{ flex: 1 }} />

                            <Button
                                onPress={onpressContinue}
                                name="Continue"
                                style={{ marginBottom: Normalize(25) }}
                            />
                            <View style={{ flexDirection: "row", alignItems: "center" }}  >
                                <View style={{ flex: 1, borderBottomWidth: Normalize(1), height: 0, borderBottomColor: Colors.textinput_bottomBorder, marginHorizontal: Normalize(7) }} />
                                <Text style={{ color: Colors.greyText, fontSize: Normalize(11), fontFamily: fontfmliy.bold }} >OR LOGIN IN WITH</Text>
                                <View style={{ flex: 1, borderBottomWidth: Normalize(1), height: 0, borderBottomColor: Colors.textinput_bottomBorder, marginHorizontal: Normalize(7) }} />
                            </View>
                            {/* social Login */}
                            <SocialLogin />
                            <View style={{ alignItems: "center", paddingBottom: Normalize(35) }} >
                                <Text style={{ fontSize: Normalize(11.5), color: Colors.grey, fontFamily:fontfmliy.regular, lineHeight: Normalize(18), marginBottom: 5 }} >Not a member of EazyPay yet?</Text>
                                <TouchableOpacity onPress={() => {
                                    setEmail("")
                                    setLoginPassword("")
                                    navigation.navigate("TakingEmail")
                                }}>
                                    <Text style={{ fontSize: Normalize(11.5), color: Colors.black, fontFamily:fontfmliy.regular }}>Register here</Text>
                                </TouchableOpacity>
                            </View>
                        </View>


                        {/* </ScrollView> */}
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}