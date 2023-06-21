import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
  SafeAreaView, ActivityIndicator, StatusBar, Pressable, KeyboardAvoidingView
} from 'react-native';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import images from './../../../constants/images';
import { Colors } from './../../../constants/colors';
import strings from './../../../constants/lng/LocalizedStrings';
import Button from './../../../components/Button';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
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
import LoaderPage from "../../../components/LoaderPage"
import { myContext } from '../../../constants/ContextApi';
import { axiosUrl } from '../../../constants/LinkPage';
import messaging from '@react-native-firebase/messaging';
import globalstyles from '../../../constants/globalStyles/Global_Styles';
import Normalize from '../../../helpers/Dimens'
function Signin({ navigation }) {
  const navigation2 = useNavigation()
  const { setToken } = useContext(myContext)
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
  const [emailIsFocused, setEmailIsFocused] = useState(false);
  const [passIsFocused, setPassIsFocused] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false)
  const [loader2, setLoader2] = useState(false)
  const [d_t, setd_t] = useState("")
  const [fcmToken, setFcmToken] = useState("")

  const [showPassword, setShowPassword] = useState(false)

  const onpress_eyeButton = () => {
    setShowPassword(!showPassword)
  }

  const getfCMToken = async () => {
    // const newFCMToken = await messaging().getToken();
    const fcm = await AsyncStorage.getItem("fcmtoken")
    if (fcm === null) {
      const newFCMToken = await messaging().getToken();
      // console.log("newFCMToken..................",newFCMToken)
      if (newFCMToken) {
        // console.log("newFCMToken", newFCMToken)
        await AsyncStorage.setItem("fcmtoken", newFCMToken)
        // console.log("fcm login null", newFCMToken)
        setFcmToken(newFCMToken)
      }
    } else {
      // console.log("fcm login not null", fcm)
      setFcmToken(fcm)
    }
  }

  useEffect(() => {
    getfCMToken();
  }, [])

  const login = async () => {
    try {
      setLoader(true)
      if (email == "" || email.trim() == "") {
        Toast.show(strings.ERROR.ENTEREMAILORPHONE)
      } else if (password == "" || password.trim() == "") {
        Toast.show(strings.ERROR.ENTERPASSWORD)
      } else {

        const EmailVerify = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        const res = EmailVerify.test(email)

        // console.log("login fcm", fcmToken)
        const data = await axios({
          method: "post",
          url: `${axiosUrl.URL}login`,
          headers: {
            "X-localization": language == "pr" ? "fa" : "en"
          },
          data: {
            "jsonrpc": "2.0",
            "params": {
              "email": email,
              "password": password,
              "firebase_reg_no": fcmToken !== "" ? fcmToken : "cpuu8oy2A3g-EqiwUcPG7a:APA91bFvUhBshgji__P1h_Z0UgKt15odWc0y1P7z33XVy6OVR1TmkyNVwKl1FVYuK4itkvdM6j5ehSe2WY_MMbdOZQhEoHYhMe3Q9CP38vKaCFowv1zqQMFfmpM_7wqxuyIKetkM4r_h",
              "device_type": d_t
            }
          }
        })

        if (data) {
          if (data.data.result == undefined) {
            Toast.show(data.data.error.meaning)
            // setEmail("")
            // setPassword("")

          } else {
            AsyncStorage.setItem('email', email);
            AsyncStorage.setItem('password', password);
            const login_details = { "email": email, "password": password };
            const to_stringify = JSON.stringify(login_details)
            AsyncStorage.setItem('normal_login_details', to_stringify);
            AsyncStorage.setItem('token', data.data.result.token);
            AsyncStorage.setItem('slug', data.data.result.userdata.slug);
            AsyncStorage.setItem('userid', (data.data.result.userdata.id).toString());
            AsyncStorage.setItem('application', "login");
            AsyncStorage.setItem("last_login_from", "A")



            Toast.show(strings.ERROR.SUCCESSFULLYLOGIN)
            setToken(data.data.result.token)
            setEmail("")
            setPassword("")

            navigation2.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{ name: "Home" }]
              }));
          }
        }

      }
      setLoader(false)
    } catch (error) {
      setLoader(false)
      console.log("login", error)
    }
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
        }
      }
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };
  const fbSign = async (user) => {
    try {
      setLoader2(true)
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
          "device_type": d_t
        }
      })
      // console.log(data.data)
      if (data) {
        if (data.data.result == undefined) {
          alert(data.data.error.meaning)
        } else {
          AsyncStorage.setItem('token', data.data.result.token);
          AsyncStorage.setItem('slug', data.data.result.userdata.slug)
          AsyncStorage.setItem('userid', (data.data.result.userdata.id).toString());
          AsyncStorage.setItem('application', "login");
          AsyncStorage.setItem("last_login_from", "F")
          setToken(data.data.result.token)
          setLoader2(false)
          Toast.show(strings.ERROR.SUCCESSFULLYLOGIN)
          navigation2.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{ name: "Home" }]
            }));
        }
      }
      setLoader2(false)
    } catch (error) {
      setLoader2(false)
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
    // console.log(current)
    if (current !== null) {
      await GoogleSignin.signOut();
    }
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setLoader2(true)

      const login_details = userInfo
      const to_stringify = JSON.stringify(login_details)
      AsyncStorage.setItem('google_login_details', to_stringify);


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
          "device_type": d_t
        }
      }

      )

      // console.log(data.data)

      if (data) {
        setLoader2(false)

        // alert(JSON.stringify(data))
        if (data.data.result == undefined) {
          alert(data.data.error.meaning)

        } else {
          AsyncStorage.setItem('token', data.data.result.token);
          AsyncStorage.setItem('slug', data.data.result.userdata.slug)
          AsyncStorage.setItem('userid', (data.data.result.userdata.id).toString());
          AsyncStorage.setItem('application', "login");
          AsyncStorage.setItem("last_login_from", "G")
          setToken(data.data.result.token)
          Toast.show(strings.ERROR.SUCCESSFULLYLOGIN)

          navigation2.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{ name: "Home" }]
            }));
        }
      }



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


    if (Platform.OS === "android") {
      setd_t("android")
    } else {
      setd_t("iphone")
    }
  }, []);

  return (
    <>
      {
        loader2 ?
          <LoaderPage />
          :
          <SafeAreaView style={{ backgroundColor: Colors.white, flex: 1, flexDirection: 'column' }}>
            <StatusBar backgroundColor={Colors.white} barStyle="dark-content"/>
            <KeyboardAvoidingView
                        behavior={(Platform.OS === 'ios') ? "padding" : null} style={globalstyles.container}>
              <ScrollView
                keyboardShouldPersistTaps="always"
                showsVerticalScrollIndicator={false}
              >
                {/* email input */}

                <View style={{ flexDirection: "row", alignItems: "center", marginTop: Normalize(25) }} >
                  <Text style={globalstyles.page_Header_Text} >Welcome Back! 👋</Text>
                </View>

                <Text style={[globalstyles.page_SubHeader_Text, { marginVertical: Normalize(0), marginBottom: Normalize(35) }]} >Please enter your login details to continue</Text>



                {/* email */}

                <Text style={globalstyles.textinput_Header_Style} >Email address</Text>
                <TextInput
                  value={email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholder={strings.LOGINSCREEN.EMAILPLACEHOLDER}
                  placeholderTextColor={Colors.textinput_inner_text}
                  onChangeText={(e) => setEmail(e)}

                  style={[
                    globalstyles.textinputStyle,
                    {
                      borderColor: emailIsFocused ? Colors.primary : Colors.disable_textinput_border,
                      backgroundColor: emailIsFocused ? Colors.white : Colors.disable_textinput_background,
                      textAlign: "left",
                    },
                    // language == 'pr' ? { ...RtlStyles.textInverse } : { ...RtlStyles.text },
                  ]}
                  onFocus={() => setEmailIsFocused(true)}
                  onBlur={() => setEmailIsFocused(false)}
                />


                {/* password input */}
                <Text style={[globalstyles.textinput_Header_Style, { marginTop: Normalize(15) }]} >Password</Text>

                <View style={[globalstyles.textinput_onlyBox_Style, { borderColor: passIsFocused ? Colors.primary : Colors.disable_textinput_border, backgroundColor: passIsFocused ? Colors.white : Colors.disable_textinput_background }]} >
                  <View style={{ flex: 1 }} >
                    <TextInput
                      value={password}
                      keyboardType="default"
                      secureTextEntry={showPassword ? false : true}
                      autoCapitalize="none"
                      placeholder={strings.LOGINSCREEN.PASSWORDPLACEHOLDER}
                      placeholderTextColor={Colors.textinput_inner_text}
                      onChangeText={(e) => setPassword(e)}
                      style={[
                        globalstyles.textinput_onlyText_Style,
                        { textAlign: "left", },
                      ]}
                      onFocus={() => setPassIsFocused(true)}
                      onBlur={() => setPassIsFocused(false)}
                    />
                  </View>
                  <Pressable onPressIn={onpress_eyeButton} style={{ height: "100%", width: Normalize(28), padding: Normalize(6.5) }} >
                    <Image source={showPassword ? images.eye_close : images.eye_open} style={[globalstyles.imageFit, { opacity: 0.8 }]} />
                    {/* <Text>gvhbjnkl;</Text> */}
                  </Pressable>
                </View>



                {/* forgot password */}
                <TouchableOpacity
                  onPress={() => { navigation.navigate("EnterEmail") }}
                >
                  <Text style={[globalstyles.forgotpassBtnText, { textAlign: "right" }]}>
                    {strings.LOGINSCREEN.FORGOTPASSBTN}
                  </Text>
                </TouchableOpacity>
                {/* log in button */}
                <Button
                  disabled={loader ? true : false}
                  activeOpacity={0.8}
                  onPress={login}
                  name={loader ? "" : strings.LOGINSCREEN.LOGIN}
                  style={{
                    marginVertical: Normalize(25), width: '100%',
                    alignSelf: 'center'
                  }}
                >
                  {
                    loader &&
                    <ActivityIndicator
                      size={"small"}
                      color={Colors.white}
                    />
                  }
                </Button>
                {/*  seperator */}
                <View style={{
                  alignItems: 'center',
                  alignSelf: 'center'
                }}>
                  <Text style={[globalstyles.page_SubHeader_Text, { fontSize: Normalize(12), marginBottom: 0 }]}>
                    {strings.LOGINSCREEN.SEPERATOR}
                  </Text>
                </View>
                {/* socal login buttons */}
                <View style={{ flexDirection: "row", alignSelf: "center", marginVertical: Normalize(10) }} >
                  {/* google */}
                  <Pressable
                    onPress={google_signIn}
                    // onPress={() => Toast.show("Coming soon")}
                    style={globalstyles.socialIcon} >
                    <Image source={images.google} style={globalstyles.imageFit} />
                  </Pressable>

                  <View style={{ width: Normalize(10) }} />

                  {/* facebook */}
                  <Pressable
                    onPress={onPressButton}
                    // onPress={() => Toast.show("Coming soon")}
                    style={[globalstyles.socialIcon]} >
                    <Image source={images.facebook_min} style={globalstyles.imageFit} />
                  </Pressable>
                </View>
                {/* sign up btn */}
                <View style={{ alignSelf: "center", marginBottom: Normalize(70), marginTop: Normalize(12) }} >
                  <Text style={[globalstyles.page_SubHeader_Text, { fontSize: Normalize(12) }]} >Don't have an account yet ? <Text  style={{ color: Colors.primary }} >Register</Text></Text>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </SafeAreaView>
      }
    </>
  );
}

export default withRtl(Signin);



