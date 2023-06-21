import { View, Text, Pressable } from 'react-native'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Image } from 'react-native'
import images from '../../../constants/images'
import Toast from 'react-native-simple-toast';
import strings from '../../../constants/lng/LocalizedStrings';
import {
    LoginButton, LoginManager,
    AccessToken,
    GraphRequest,
    GraphRequestManager,
} from 'react-native-fbsdk';
import {
    GoogleSignin,
    statusCodes,
} from "@react-native-google-signin/google-signin";
import { useNavigation, CommonActions } from "@react-navigation/native"
import Normalize from '../../../helpers/Dimens';
import { Colors } from '../../../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { axiosUrl } from '../../../constants/LinkPage';
import { Modal } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import globalStyle_esyPay from '../../../constants/globalStyles/GlobalStyle_esyPay';
import Button from '../../../components/Button';
import { myContext } from '../../../constants/ContextApi';
import { fontfmliy } from '../../../components/WhichFontFamily';
export default function SocialLogin() {
    const navigation = useNavigation()
    const { termAndCoModal, setTermAndCoModal,setUserId } = useContext(myContext)
    // const [termAndCoModal, setTermAndCoModal] = useState(false)
    const [pointA, setPointA] = useState(false)
    const [pointB, setPointB] = useState(false)
    const [socialPageLoader, setSocialPageLoader] = useState(false)
    const [gmailDetails, setGmailDetails] = useState(null)


    const onpressTermAndConditions = () => {
        setTermAndCoModal(!termAndCoModal)
    }

    const getInfoFromToken = (token) => {
        const PROFILE_REQUEST_PARAMS = {
            fields: {
                string: "id,name,first_name,last_name,email",
            },
        };
        const profileRequest = new GraphRequest(
            "/me",
            { token, parameters: PROFILE_REQUEST_PARAMS },
            (error, user) => {
                if (error) {
                    alert("login info has error: " + error);
                } else {
                    const login_details = user
                    const to_stringify = JSON.stringify(login_details)
                    AsyncStorage.setItem('facebook_login_details', to_stringify);
                    fbSign(user);
                    console.log(user)

                }
            }
        );
        new GraphRequestManager().addRequest(profileRequest).start();
    };
    const fbSign = async (user) => {
        try {
            const fcmToken = await AsyncStorage.getItem("fcmtoken")
            const data = await axios.post(`${axiosUrl.URL}social-signup`, {
                "jsonrpc": "2.0",
                "params": {
                    "fname": user.first_name,
                    "lname": user.last_name,
                    "phone": "",
                    "email": user.email,
                    "provider_id": user.id,
                    "signup_from": "F",
                    "firebase_reg_no": fcmToken !== "" ? fcmToken : "cpuu8oy2A3g-EqiwUcPG7a:APA91bFvUhBshgji__P1h_Z0UgKt15odWc0y1P7z33XVy6OVR1TmkyNVwKl1FVYuK4itkvdM6j5ehSe2WY_MMbdOZQhEoHYhMe3Q9CP38vKaCFowv1zqQMFfmpM_7wqxuyIKetkM4r_h",
                    "device_type": Platform.OS === "android" ? "android" : "iphone"
                }
            })
            // console.log(data.data)
            if (data) {
                if (data.data.result == undefined) {
                    alert(data.data.error.meaning)
                } else {
                    AsyncStorage.setItem('email', user.email);
                    AsyncStorage.setItem('token', data.data.result.token);
                    AsyncStorage.setItem('slug', data.data.result.userdata.slug)
                    AsyncStorage.setItem('userid', (data.data.result.userdata.id).toString());
                    setUserId ((data.data.result.userdata.id).toString());
                    AsyncStorage.setItem('application', "login");
                    AsyncStorage.setItem("last_login_from", "F")
                    Toast.show(strings.ERROR.SUCCESSFULLYLOGIN)
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 1,
                            routes: [{ name: "Home" }]
                        }));
                }
            }
        } catch (error) {
            console.log("fbSign", error)
        }

    };
    const onPressButton = () => {
        if (Platform.OS === "android") {
            LoginManager.setLoginBehavior("web_only")
        }
        LoginManager.logInWithPermissions(["public_profile", "email"]).then(
            (login) => {
                if (login.isCancelled) {
                    Toast.show(strings.ERROR.LOGINCANCEL);
                } else {
                    AccessToken.getCurrentAccessToken().then((data) => {
                        // alert("hj"+JSON.stringify(data))
                        // console.log(data)
                        const accessToken = data.accessToken.toString();
                        getInfoFromToken(accessToken);
                    });
                }
            },
            (error) => {
                // console.log("Login fail with error: " + error);
                Toast.show(error);
            }
        );
    };
    const google_signIn = async () => {
        const current = await GoogleSignin.getCurrentUser();
        // console.log("--->", current)
        if (current !== null) {
            await GoogleSignin.signOut();
        }
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            // setSocialPageLoader2(true)

            const login_details = userInfo
            const to_stringify = JSON.stringify(login_details)
            AsyncStorage.setItem('google_login_details', to_stringify);

            //  console.log(userInfo)






            isEmailAlreadyused(userInfo)

        } catch (error) {
            console.log(error)
            // alert(JSON.stringify(error))
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                console.log("SIGN_IN_CANCELLED", error)
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log("IN_PROGRESS", error)
                // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
                console.log("PLAY_SERVICES_NOT_AVAILABLE", error)
            } else {
                // some other error happened
            }
        }
    };
    const isEmailAlreadyused = async (userInfo) => {
        try {

            let register_details = { "email": userInfo.user.email, "password": "" };
            let to_stringify = JSON.stringify(register_details)
            await AsyncStorage.setItem('lastRegisterEmail', to_stringify);

            let data = {
                "params": {
                    "email": userInfo.user.email
                }
            }
            let res = await axios.post(axiosUrl.URL + "check-duplicate-email-id", data)
            // console.log("isEmailAlreadyused------", res.data)
            if (res.data.result) {
                if (res.data.result.message == "Success!") {
                    // console.log("i")
                    setTermAndCoModal(true)
                    setGmailDetails(userInfo)


                }

            } else if (res.data.error.meaning == "Email-id is already registered with us!") {

                // console.log("h")
                finalGoogleLogin(userInfo)
            }
        } catch (error) {
            console.log("isEmailAlreadyused", error)
        }
    }
    const finalGoogleLogin = async (userInfo) => {
        try {
            let fcmToken = await AsyncStorage.getItem("fcmtoken")
            const data = await axios.post(`${axiosUrl.URL}social-signup`, {
                "jsonrpc": "2.0",
                "params": {
                    "fname": userInfo.user.givenName,
                    "lname": userInfo.user.familyName,
                    "phone": "",
                    "email": userInfo.user.email,
                    "provider_id": userInfo.user.id,
                    "signup_from": "G",
                    "firebase_reg_no": fcmToken !== "" ? fcmToken : "cpuu8oy2A3g-EqiwUcPG7a:APA91bFvUhBshgji__P1h_Z0UgKt15odWc0y1P7z33XVy6OVR1TmkyNVwKl1FVYuK4itkvdM6j5ehSe2WY_MMbdOZQhEoHYhMe3Q9CP38vKaCFowv1zqQMFfmpM_7wqxuyIKetkM4r_h",
                    "device_type": Platform.OS === "android" ? "android" : "iphone"
                }
            })

            // console.log("jjjhhhhhh", data.data)

            if (data) {
                if (data.data.result == undefined) {
                    alert(data.data.error.meaning)

                } else {
                    let user = data.data.result.userdata
                    let verify_in_app = user.verify_in_app;
                    let verify_in_email = user.verify_in_email;
                    let takingDetails_complete = user.takingDetails_complete;
                    let up1_complete = user.up1_complete;

                    // console.log("verify_in_app", verify_in_app)
                    // console.log("verify_in_email", verify_in_email)
                    // console.log("takingDetails_complete", takingDetails_complete)
                    // console.log("up1_complete", up1_complete)


                    if (verify_in_app == "false" || verify_in_email == "false" || takingDetails_complete == "false" || up1_complete == "false") {
                        sendToWhichStep(user, user.email)
                    } else {
                        AsyncStorage.setItem('email', userInfo.user.email);
                        AsyncStorage.setItem('token', data.data.result.token);
                        AsyncStorage.setItem('slug', data.data.result.userdata.slug)
                        AsyncStorage.setItem('userid', (data.data.result.userdata.id).toString());
                        setUserId ((data.data.result.userdata.id).toString());
                        AsyncStorage.setItem('application', "login");
                        AsyncStorage.setItem("last_login_from", "G")
                        // setToken(data.data.result.token)
                        Toast.show(strings.ERROR.SUCCESSFULLYLOGIN)

                        navigation.dispatch(
                            CommonActions.reset({
                                index: 1,
                                routes: [{ name: "Home" }]
                            }));
                    }
                }
            }
        } catch (error) {
            console.log("finalGoogleSignup", error)
        }
    }
    const sendToWhichStep = async (val, email) => {
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

            let register_details = { "email": email, "password": "" };
            let to_stringify = JSON.stringify(register_details)
            await AsyncStorage.setItem('lastRegisterEmail', to_stringify);
        } catch (error) {
            console.log("sendToWhichPage_social_login", error)
        }
    }



    useEffect(() => {
        GoogleSignin.configure({
            scopes: ["email"],
            iosClientId: '88702495308-1ts4qql5i03pmnv1qas5lq82k02jsstq.apps.googleusercontent.com', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
            webClientId:
                "88702495308-69lg4o4r044fgdv0ga91hsfqafuhihgm.apps.googleusercontent.com",
            androidClientId:
                "136631035625-7lu32b51r63g6kn4bsri8akr64074nhu.apps.googleusercontent.com",
            offlineAccess: false,
        });
    }, []);
    const finalGoogleSignup = async (userInfo) => {
        try {
            // console.log("=======>", userInfo.user.email)
            let fcmToken = await AsyncStorage.getItem("fcmtoken")
            const data = await axios.post(`${axiosUrl.URL}social-signup`, {
                "jsonrpc": "2.0",
                "params": {
                    "fname": userInfo.user.givenName,
                    "lname": userInfo.user.familyName,
                    "phone": "",
                    "email": userInfo.user.email,
                    "provider_id": userInfo.user.id,
                    "signup_from": "G",
                    "firebase_reg_no": fcmToken !== "" ? fcmToken : "cpuu8oy2A3g-EqiwUcPG7a:APA91bFvUhBshgji__P1h_Z0UgKt15odWc0y1P7z33XVy6OVR1TmkyNVwKl1FVYuK4itkvdM6j5ehSe2WY_MMbdOZQhEoHYhMe3Q9CP38vKaCFowv1zqQMFfmpM_7wqxuyIKetkM4r_h",
                    "device_type": Platform.OS === "android" ? "android" : "iphone"
                }
            })

            // console.log(data.data)

            if (data) {
                if (data.data.result) {
                    // console.log(data.data.result.userdata.email)
                    AsyncStorage.setItem("last_login_from", "G")
                    await AsyncStorage.setItem("signupFname", data.data.result.userdata.fname)
                    await AsyncStorage.setItem("signupLname", data.data.result.userdata.lname)
                    modifiedIsInformation(data.data.result.userdata.email)
                } else {
                    Toast(data.data.error.meaning)
                }
            }
        } catch (error) {
            setSocialPageLoader(false)
            console.log("finalGoogleSignup", error)
        }
    }
    const onpressContinue = async () => {
        try {
            if (pointA) {
                setSocialPageLoader(true)
                finalGoogleSignup(gmailDetails)
            } else {
                Toast.show("Please accept our Terms & Conditions")
            }
        } catch (error) {
            console.log("onpressContinue", error)
        }
    }
    const modifiedIsInformation = async (email) => {
        try {
            let data = {
                "params": {
                    "email": email,
                    "isInformation": pointB ? "yes" : "no"
                }
            }
            let res = await axios.post(axiosUrl.URL + "updateisinfo", data)
            // console.log(res.data)
            if (res.data.result) {
                setTermAndCoModal(false)
                setSocialPageLoader(false)
                navigation.navigate("TakingDetails")
            } else {
                Toast.show(res.data.error.meaning)
            }

        } catch (error) {
            console.log("modifiedIsInformation", error)
        }
    }
    return (
        <>
            <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: Normalize(15) }} >
                {/* google */}
                <Pressable
                    onPress={google_signIn}
                    style={{ height: Normalize(33), width: Normalize(33), borderRadius: Normalize(33) / 2, borderColor: Colors.textinput_bottomBorder, borderWidth: Normalize(1), justifyContent: "center", alignItems: "center" }} >
                    <Image source={images.google} style={{ height: "60%", width: "60%", resizeMode: "contain" }} />
                </Pressable>
                <View style={{ height: Normalize(30), width: Normalize(15) }} ></View>
                {/* facebook */}
                <Pressable
                    onPress={onPressButton}
                    style={{ height: Normalize(33), width: Normalize(33), borderRadius: Normalize(33) / 2 }} >
                    <Image source={images.facebook_min} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                </Pressable>
                {termAndCoModal &&
                    <Modal
                        visible={termAndCoModal}
                        transparent
                        onRequestClose={onpressTermAndConditions}
                        animationType="none"
                    >
                        <View style={{ flex: 1, backgroundColor: "rgba(52,52,52,0.5)", justifyContent: "center", alignItems: "center" }} >
                            <View style={{ padding: Normalize(20), width: "85%", backgroundColor: Colors.white, elevation: 10, borderRadius: Normalize(8) }} >
                                <View style={{ alignItems: "center" }}>
                                    <MaterialCommunityIcons name="file-document-outline" color={Colors.secondary} size={Normalize(67)} />
                                </View>
                                <Pressable
                                    activeOpacity={1}
                                    onPress={() => setPointA(!pointA)} style={{ flexDirection: "row", marginVertical: Normalize(20) }} >
                                    {/* point a */}
                                    <View style={{ paddingHorizontal: Normalize(6), marginTop: Normalize(1) }} >
                                        <View style={{ justifyContent: "center", alignItems: "center", height: Normalize(15), width: Normalize(15), borderRadius: Normalize(15) / 2, backgroundColor: pointA ? Colors.primary : Colors.white, borderWidth: !pointA ? 1 : 0, borderColor: Colors.textinput_bottomBorder }} >
                                            {pointA ?
                                                <Image source={images.white_tik} style={{
                                                    height: "70%", width: "70%", resizeMode: "contain",
                                                    alignSelf: 'center', marginTop: Normalize(1)
                                                }} />
                                                : null
                                            }
                                        </View>
                                    </View>
                                    <View style={{ flex: 1 }} >
                                        <Text style={[globalStyle_esyPay.detailsText, { fontSize: Normalize(12) }]} >I hereby accept the general
                                            <Text onPress={() => {
                                                setTermAndCoModal(false)
                                                navigation.navigate("Termsandcondition", { fromwhere: "socialmedia" })
                                            }}
                                                style={{ textDecorationLine: "underline", fontFamily: fontfmliy.bold }} >terms &
                                                conditions</Text> of EazyPay, the cancellation
                                            policy and confirm that I am over 18 years
                                            of age.{"\n"}
                                            Please not our <Text onPress={() => {
                                                setTermAndCoModal(false)
                                                navigation.navigate("PrivacyPolicy", { fromwhere: "socialmedia" })
                                            }}
                                                style={{ textDecorationLine: "underline", fontFamily: fontfmliy.bold }} >privacy policy</Text></Text>
                                    </View>
                                </Pressable>
                                <Pressable
                                    activeOpacity={1}
                                    onPress={() => setPointB(!pointB)} style={{ flexDirection: "row" }} >
                                    {/* point b */}
                                    <View style={{ paddingHorizontal: Normalize(6), marginTop: Normalize(1) }} >
                                        <View style={{ justifyContent: "center", alignItems: "center", height: Normalize(15), width: Normalize(15), borderRadius: Normalize(15) / 2, backgroundColor: pointB ? Colors.primary : Colors.white, borderWidth: !pointB ? 1 : 0, borderColor: Colors.textinput_bottomBorder }} >
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
                                </Pressable>
                                <Button
                                    disabled={socialPageLoader}
                                    onPress={onpressContinue}
                                    name="Continue"
                                    style={{ marginTop: Normalize(20) }}
                                />
                            </View>


                            <Pressable
                                onPress={onpressTermAndConditions}
                                style={{ height: Normalize(50), width: Normalize(50), borderRadius: Normalize(50) / 2, backgroundColor: Colors.white, elevation: 10, justifyContent: "center", alignItems: "center", marginTop: Normalize(12) }} >
                                <Entypo name="cross" color={Colors.textinput_inner_text} size={Normalize(35)} />
                            </Pressable>
                        </View>
                    </Modal>
                }
            </View>
        </>
    )
}