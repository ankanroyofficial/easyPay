import { View, Text, SafeAreaView, Dimensions, Image, TextInput, ScrollView, TouchableOpacity, Platform, Keyboard } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Colors } from '../../../../constants/colors'
import images from '../../../../constants/images'
import Normalize from '../../../../helpers/Dimens';
import globalStyle_esyPay from '../../../../constants/globalStyles/GlobalStyle_esyPay'
import Button from '../../../../components/Button'
import Header_Transparent from '../../../../components/Header_Transparent'
import Toast from 'react-native-simple-toast';
import { useNavigation, CommonActions } from "@react-navigation/native"
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import strings from '../../../../constants/lng/LocalizedStrings';
import axios from 'axios';
import { axiosUrl } from '../../../../constants/LinkPage';
import { myContext } from '../../../../constants/ContextApi';
import { testingText } from '../../../../constants/TestingConstant';
import { fontfmliy } from '../../../../components/WhichFontFamily';



const { height, width } = Dimensions.get("window")
export default function TakingPasswordForLogin(props) {

    const navigation = useNavigation()
    const { setToken, loginPassword, setLoginPassword, fcmToken, setFcmToken,setUserId } = useContext(myContext)
    const { email } = props.route.params

    const [isPasswordFocused, setIsPasswordFocused] = useState(false)
    const [isPasswordShow, setIsPasswordShow] = useState(false)
    const [loader, setLoader] = useState(false)
    const onpressLogin = () => {
        try {
            if (loginPassword == "" || loginPassword.trim() == "") {
                Toast.show(strings.ERROR.ENTERPASSWORD)
            } else {
                loginFunc()
            }
        } catch (error) {
            console.log("onpressContinue", error)
        }

    }

    const loginFunc = async () => {
        try {
            setLoader(true)
            // const fcmToken = await AsyncStorage.getItem("fcmtoken")
            const data = await axios({
                method: "post",
                url: `${axiosUrl.URL}login`,
                // headers: {
                //     "X-localization": language == "pr" ? "fa" : "en"
                // },
                data: {
                    "jsonrpc": "2.0",
                    "params": {
                        "email": email,
                        "password": loginPassword,
                        "firebase_reg_no": fcmToken !== "" ? fcmToken : "cpuu8oy2A3g-EqiwUcPG7a:APA91bFvUhBshgji__P1h_Z0UgKt15odWc0y1P7z33XVy6OVR1TmkyNVwKl1FVYuK4itkvdM6j5ehSe2WY_MMbdOZQhEoHYhMe3Q9CP38vKaCFowv1zqQMFfmpM_7wqxuyIKetkM4r_h",
                        "device_type": Platform.OS === "android" ? "android" : "iphone"
                    }
                }
            })
            // console.log(data.data)
            if (data.data.error) {
                if (data.data.error.meaning == " You have not completed the full registration process! ") {
                    let user = data.data.error.user
                    let verify_in_app = user.verify_in_app;
                    let verify_in_email = user.verify_in_email;
                    let takingDetails_complete = user.takingDetails_complete;
                    let up1_complete = user.up1_complete;
                    if (verify_in_app == "false" || verify_in_email == "false" || takingDetails_complete == "false" || up1_complete == "false") {
                        sendToWhichStep(user)
                    } else {
                        Toast.show(data.data.error.meaning)
                    }
                } else {
                    Toast.show(data.data.error.meaning)
                }
            } else {
                AsyncStorage.setItem('email', email);
                AsyncStorage.setItem('password', loginPassword);
                const login_details = { "email": email, "password": loginPassword };
                const to_stringify = JSON.stringify(login_details)
                AsyncStorage.setItem('normal_login_details', to_stringify);
                AsyncStorage.setItem('token', data.data.result.token);
                AsyncStorage.setItem('slug', data.data.result.userdata.slug);
                AsyncStorage.setItem('userid', (data.data.result.userdata.id).toString());
                setUserId((data.data.result.userdata.id).toString());
                AsyncStorage.setItem('application', "login");
                AsyncStorage.setItem("last_login_from", "A")

                Toast.show(strings.ERROR.SUCCESSFULLYLOGIN)
                setToken(data.data.result.token)
                // setEmail("")
                setLoginPassword("")

                navigation.dispatch(
                    CommonActions.reset({
                        index: 1,
                        routes: [{ name: "Home" }]
                    }));
            }
            setLoader(false)
        } catch (error) {
            setLoader(false)
            console.log("login", error)
        }
    }


    const sendToWhichStep = async (val) => {
        try {
            let verify_in_app = val.verify_in_app;
            let verify_in_email = val.verify_in_email;
            let takingDetails_complete = val.takingDetails_complete;
            let up1_complete = val.up1_complete;


            // console.log("verify_in_app    ", verify_in_app)
            // console.log("verify_in_email    ", verify_in_email)
            // console.log("takingDetails_complete    ", takingDetails_complete)
            // console.log("up1_complete    ", up1_complete)



            if (verify_in_app == "true" && verify_in_email == "true" && takingDetails_complete == "false" && up1_complete == "false") {
                navigation.navigate("TakingDetails")
            } else if (verify_in_app == "false" && verify_in_email == "false" && takingDetails_complete == "false" && up1_complete == "false") {
                navigation.replace("EmailVerificationPage", { email: email })
            } else if (verify_in_app == "false" && verify_in_email == "true" && takingDetails_complete == "false" && up1_complete == "false") {
                navigation.replace("EmailVerificationPage", { email: email })
            } else if (verify_in_app == "true" && verify_in_email == "true" && takingDetails_complete == "true" && up1_complete == "false") {
                navigation.replace("AfterSignUpThreePointPage")
            } else {
                navigation.replace("IntroVideoScreen")
            }
            let register_details = { "email": email, "password": loginPassword };
            let to_stringify = JSON.stringify(register_details)
            await AsyncStorage.setItem('lastRegisterEmail', to_stringify);
            setLoginPassword("")
        } catch (error) {
            console.log("sendToWhichPage", error)
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


                    <View style={{ flex: 1.8, backgroundColor: "white" }} >

                    </View>
                </View>
                <View style={{ height: height, width: width, position: "absolute" }} >
                    <View style={{ flex: 1, paddingHorizontal: Normalize(15) }} >
                        <Header_Transparent
                            iswhitebackground={false}
                        />
                        <Text style={[globalStyle_esyPay.pageHeading]} >Welcome Back</Text>
                    </View>

                    <View style={{ flex: 2.15, marginHorizontal: Normalize(16) }} >
                        <View style={{ flex: 1 }} >
                            <Text style={globalStyle_esyPay.inputHeader} >Password</Text>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", borderBottomWidth: Normalize(1), borderBottomColor: isPasswordFocused ? Colors.primary : Colors.textinput_bottomBorder, }} >
                                <TextInput placeholder='Enter your password'
                                    placeholderTextColor={Colors.textinput_placeholder}
                                    style={[globalStyle_esyPay.input_noIcon, { height: "100%", borderBottomWidth: 0, width: "88%" }]}
                                    value={loginPassword}
                                    secureTextEntry={!isPasswordShow ? true : false}
                                    keyboardType="default"
                                    autoCapitalize="none"
                                    onChangeText={(e) => setLoginPassword(e)}
                                    onFocus={() => setIsPasswordFocused(true)}
                                    onBlur={() => setIsPasswordFocused(false)}
                                />
                                <TouchableOpacity activeOpacity={1} onPress={() => setIsPasswordShow(!isPasswordShow)} style={{ height: Normalize(30), width: Normalize(30), justifyContent: "flex-end", alignItems: "center" }} >
                                    <Entypo name={!isPasswordShow ? "eye" : "eye-with-line"} color={Colors.primary} size={Normalize(18)} />
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                onPress={() => { navigation.navigate("EnterEmail", { "prevEmail": email }) }}>
                                <Text style={{ fontSize: Normalize(11.5), color: Colors.black, fontFamily: fontfmliy.regular, alignSelf: 'flex-end', marginTop: Normalize(5) }}>Forgot password?</Text>
                            </TouchableOpacity>
                            {(testingText.lastupdateDate).length > 0 && <Text style={{ textAlign: "center", color: Colors.green_new, fontSize: Normalize(12), fontFamily: fontfmliy.bold }} >{testingText.lastupdateDate}</Text>}
                            {(testingText.text).length > 0 && <Text style={{ textAlign: "center", color: Colors.red_old, fontSize: Normalize(12), fontFamily: fontfmliy.bold }} >{testingText.text}</Text>}
                            <View style={{ flex: 1 }} />
                            <Button
                                onPress={onpressLogin}
                                name="Login"
                                style={{ marginBottom: height * 0.07 }}
                            />
                        </View>
                    </View>
                </View>

            </View>
        </SafeAreaView>
    )
}