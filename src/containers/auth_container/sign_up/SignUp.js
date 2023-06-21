import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  Platform,
  Modal,
  ActivityIndicator,
  StatusBar,
  Pressable,
  KeyboardAvoidingView
} from 'react-native';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import images from '../../../constants/images';
import { Colors } from '../../../constants/colors';
import strings from '../../../constants/lng/LocalizedStrings';
import Button from '../../../components/Button';
import axios from 'axios';
import { engToPersian } from '../../../constants/EnglishToPersian';
import LoaderPage from '../../../components/LoaderPage'
import {
  LoginButton, LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import { useNavigation, CommonActions } from "@react-navigation/native"
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { myContext } from '../../../constants/ContextApi';
import { axiosUrl } from '../../../constants/LinkPage';
import globalstyles from '../../../constants/globalStyles/Global_Styles';
import Header_Transparent from '../../../components/Header_Transparent';
import Normalize from '../../../helpers/Dimens';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import { Keyboard } from 'react-native';
import { is_search } from '../../../constants/KeyWordSearch';
function SignUp({ navigation }) {
  const navigation2 = useNavigation()
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
  const { setToken, all_country_code } = useContext(myContext)
  const [nameIsFocused, setNameIsFocused] = useState(false);
  const [lastIsFocused, setLastIsFocused] = useState(false);
  const [emailIsFocused, setEmailIsFocused] = useState(false);
  const [phoneIsFocused, setPhoneIsFocused] = useState(false);
  const [passIsFocused, setPassIsFocused] = useState(false);
  const [confPassIsFocused, setConfPassIsFocused] = useState(false);
  const [loader, setLoader] = useState(false)
  const [loader2, setLoader2] = useState(false)
  const [fname, setFname] = useState("")
  const [lname, setLname] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password_confirmation, setPassword_confirmation] = useState("")
  const [d_t, setd_t] = useState("")
  const [fcmToken, setFcmToken] = useState("")

  const [showPassword, setShowPassword] = useState(false)
  const [show_confirmedPassword, setShow_confirmedPassword] = useState(false)
  const [is_category_modal, setIs_category_modal] = useState(false)
  const [phone_Code, setPhone_Code] = useState("")

  const [search_phone_Code, setSearch_Phone_Code] = useState("")



  const onpress_eyeButton = () => {
    setShowPassword(!showPassword)
  }
  const onpress_confirmed_eyeButton = () => {
    setShow_confirmedPassword(!show_confirmedPassword)
  }
  const getfCMToken = async () => {
    const fcm = await AsyncStorage.getItem("fcmtoken")
    // console.log("fcm", fcm)
    setFcmToken(fcm)
  }
  useEffect(() => {
    getfCMToken();
  }, [])
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
  const check_phone_no = (val) => {
    return parseInt(val) == val
  }
  const signupButton = async () => {

    if (fname.length == 0 || lname.length == 0 || email.length == 0 || phone.length == 0 || password.length == 0 || password_confirmation.length == 0) {
      Toast.show(strings.ERROR.FILLUPALLFIELD)

    } else {

      let text = email
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      var a = reg.test(text)
      if (a == true) {
        if (phone.length == 8) {

          if (check_phone_no(phone)) {
            if (phone_Code == "") {
              Toast.show("Enter Phone Code")
            } else {
              if (password.length >= 8) {
                if (password == password_confirmation) {

                  // console.log(apiPhonenumber)
                  setLoader(true)

                  const data = await axios({
                    method: "post",
                    url: `${axiosUrl.URL}register`,
                    headers: {
                      "X-localization": language == "pr" ? "fa" : "en"
                    },
                    data: {
                      "jsonrpc": "2.0",
                      "params": {
                        "fname": fname,
                        "lname": lname,
                        "phone": phone,
                        "phonecode": phone_Code,
                        "email": email,
                        "password": password,
                        "password_confirmation": password_confirmation,
                        "firebase_reg_no": fcmToken !== "" ? fcmToken : "cpuu8oy2A3g-EqiwUcPG7a:APA91bFvUhBshgji__P1h_Z0UgKt15odWc0y1P7z33XVy6OVR1TmkyNVwKl1FVYuK4itkvdM6j5ehSe2WY_MMbdOZQhEoHYhMe3Q9CP38vKaCFowv1zqQMFfmpM_7wqxuyIKetkM4r_h",
                        "device_type": d_t

                      }
                    }
                  })
                  // console.log(data.data)
                  if (data) {
                    if (data.data.result == undefined) {
                      if (data.data.error.phone == undefined) {
                        setLoader(false)
                        Toast.show(data.data.error.email[0])
                      } else {
                        if (data.data.error.email) {
                          setLoader(false)
                          // Toast.show(data.data.error.phone + "\n" + data.data.error.email)
                          Toast.show(strings.ERROR.BOTHEMAIL_PHONE)
                        } else {
                          setLoader(false)
                          Toast.show(data.data.error.phone[0])
                        }
                      }
                    } else {
                      setLoader(false)
                      AsyncStorage.setItem('token', data.data.result.token);
                      AsyncStorage.setItem('slug', data.data.result.user.slug);
                      AsyncStorage.setItem('email', email);
                      AsyncStorage.setItem('password', password);

                      const login_details = { "email": email, "password": password };
                      const to_stringify = JSON.stringify(login_details)
                      AsyncStorage.setItem('normal_login_details', to_stringify);

                      AsyncStorage.setItem('userid', (data.data.result.user.id).toString());
                      AsyncStorage.setItem('application', "login");
                      AsyncStorage.setItem("last_login_from", "A")
                      setToken(data.data.result.token)

                      navigation2.dispatch(
                        CommonActions.reset({
                          index: 1,
                          routes: [{ name: "Home" }]
                        }));
                      Toast.show(strings.ERROR.SUCCESSFULLYREGISTER)


                    }




                  } else {
                    setLoader(false)
                    console.log("error")
                  }



                } else {
                  Toast.show(strings.ERROR.CONFIRMPASSWORD)
                }
              } else {
                Toast.show(strings.ERROR.ENTERPASSWORD8DIGIT)
              }
            }
          } else {
            Toast.show("Enter a valid phone number")
          }
        } else {
          Toast.show(strings.ERROR.ENTERPHONE)
        }
      } else {
        Toast.show(strings.ERROR.ENTERVALIDEMAIL)
      }
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
          // setLoading(false);
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
      }
      )

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
            const accessToken = data.accessToken.toString();
            getInfoFromToken(accessToken);
          });
        }
      },
      (error) => {
        alert("Login fail with error: " + error);
      }
    );
  };
  const google_signIn = async () => {
    const current = await GoogleSignin.getCurrentUser();
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

          // alert(JSON.stringify("You are Successfully logged in"));
          Toast.show(strings.ERROR.SUCCESSFULLYLOGIN)
          navigation2.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{ name: "Home" }]
            }));
        }
      }



    } catch (error) {

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
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
  const onpressSelect_CountryCode = () => {
    setIs_category_modal(!is_category_modal)
  }


  return (
    <>
      {
        loader2||loader ?
          <LoaderPage />
          :
          <SafeAreaView style={{ backgroundColor: Colors.white, flexDirection: 'column', flex: 1 }}>
            <StatusBar backgroundColor={Colors.white} barStyle="dark-content"/>
            <KeyboardAvoidingView
              behavior={(Platform.OS === 'ios') ? "padding" : null} style={globalstyles.container}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="always"
              >
                <Header_Transparent iswhitebackground/>
                <Text style={globalstyles.page_Header_Text} >Create Your Account</Text>
                <Text style={globalstyles.page_SubHeader_Text} >Fillup the below fields to create an accounts</Text>

                {/* name */}


                <View style={{ flexDirection: "row", marginTop: Normalize(15) }} >
                  <View style={{ flex: 1 }} >
                    <Text style={globalstyles.textinput_Header_Style} >First name</Text>
                    <TextInput
                      value={fname}
                      keyboardType="default"
                      autoCapitalize="none"
                      placeholderTextColor={Colors.textinput_inner_text}
                      placeholder={strings.SIGNUPCREEN.NAMEPLAACEHOLDER}
                      style={[
                        globalstyles.textinputStyle,
                        {
                          borderColor: nameIsFocused ? Colors.primary : Colors.disable_textinput_border,
                          backgroundColor: nameIsFocused ? Colors.white : Colors.disable_textinput_background,
                        },
                        language == 'pr' ? { ...RtlStyles.textInverse } : { ...RtlStyles.text },
                      ]}
                      onFocus={() => setNameIsFocused(true)}
                      onBlur={() => setNameIsFocused(false)}
                      onChangeText={(e) => setFname(e)}
                    />
                  </View>
                  <View style={{ width: "2%" }} />
                  <View style={{ flex: 1 }} >
                    <Text style={globalstyles.textinput_Header_Style} >Last name</Text>
                    <TextInput
                      value={lname}
                      keyboardType="default"
                      autoCapitalize="none"
                      placeholderTextColor={Colors.textinput_inner_text}
                      placeholder={strings.SIGNUPCREEN.LASTNAMEPLAACEHOLDER}
                      style={[
                        globalstyles.textinputStyle,
                        {
                          borderColor: lastIsFocused ? Colors.primary : Colors.disable_textinput_border,
                          backgroundColor: lastIsFocused ? Colors.white : Colors.disable_textinput_background,
                        },
                        language == 'pr' ? { ...RtlStyles.textInverse } : { ...RtlStyles.text },
                      ]}
                      onChangeText={(e) => setLname(e)}
                      onFocus={() => setLastIsFocused(true)}
                      onBlur={() => setLastIsFocused(false)}

                    />
                  </View>
                </View>

                {/* email input */}

                <Text style={globalstyles.textinput_Header_Style} >Email address</Text>
                <TextInput
                  value={email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor={Colors.textinput_inner_text}
                  placeholder={strings.SIGNUPCREEN.EMAILPLACEHOLDER}
                  style={[
                    globalstyles.textinputStyle,
                    {
                      borderColor: emailIsFocused ? Colors.primary : Colors.disable_textinput_border,
                      backgroundColor: emailIsFocused ? Colors.white : Colors.disable_textinput_background,
                    },
                    language == 'pr' ? { ...RtlStyles.textInverse } : { ...RtlStyles.text },
                  ]}
                  onChangeText={(e) => setEmail(e)}
                  onFocus={() => setEmailIsFocused(true)}
                  onBlur={() => setEmailIsFocused(false)}
                />


                {/* phone number */}
                <Text style={globalstyles.textinput_Header_Style} >Phone number</Text>
                <View style={[globalstyles.textinput_onlyBox_Style]} >
                  <TouchableOpacity
                    onPress={onpressSelect_CountryCode}
                    style={{ height: "100%", paddingHorizontal: "0%", justifyContent: "center", alignItems: "center", borderRightColor: Colors.disable_textinput_border, borderRightWidth: Normalize(0.5), flexDirection: "row" }} >
                    <Text style={{
                      fontSize: Normalize(12),
                      fontFamily: 'Outfit-Regular',
                      color: Colors.textinput_inner_text,
                      paddingLeft: Normalize(7),
                    }} >+ {phone_Code == "" ? "000" : phone_Code}</Text>
                    <View style={{ marginHorizontal: Normalize(7) }} >
                      <Entypo name="chevron-down" color={Colors.textinput_inner_text} size={Normalize(14)} />
                    </View>
                  </TouchableOpacity>
                  <TextInput
                    value={phone}
                    keyboardType="phone-pad"
                    autoCapitalize="none"
                    maxLength={8}
                    placeholderTextColor={Colors.textinput_inner_text}
                    placeholder={strings.SIGNUPCREEN.MOBILEPLACEHOLDER}
                    style={{
                      fontSize: Normalize(12),
                      fontFamily: 'Outfit-Regular',
                      color: Colors.textinput_inner_text,
                      flex: 1,
                      paddingHorizontal: Normalize(12),
                      borderColor: phoneIsFocused ? Colors.primary : Colors.disable_textinput_border,
                      backgroundColor: phoneIsFocused ? Colors.white : Colors.disable_textinput_background,
                    }}
                    onChangeText={(e) => setPhone(e)}
                    onFocus={() => setPhoneIsFocused(true)}
                    onBlur={() => setPhoneIsFocused(false)}
                  />
                </View>




                {
                  is_category_modal &&
                  <Modal
                    animationType="fade"
                    visible={is_category_modal}
                    transparent={true}
                    onRequestClose={onpressSelect_CountryCode}
                  >

                    <View style={{ flex: 1, backgroundColor: "rgba(52,52,52,0.5)", }} >
                      <View style={{ flex: 1, backgroundColor: Colors.white, marginVertical: Normalize(46), marginHorizontal: Normalize(30), borderRadius: Normalize(5) }} >
                        <View style={{ flexDirection: "row", width: "100%", height: Normalize(40), borderBottomColor: Colors.grayf5, borderBottomWidth: 1 }} >
                          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                            <Text style={[globalstyles.plantext_Outfit_Medium, { fontSize: Normalize(14), color: Colors.primary }]} >Choose Phone Code</Text>
                          </View>

                          <TouchableOpacity
                            onPress={onpressSelect_CountryCode}
                            style={{ width: "10%", height: "100%", justifyContent: "center", alignItems: "center" }}
                          >
                            <Entypo name="cross" color={Colors.red_old} size={Normalize(25)} />
                          </TouchableOpacity>
                        </View>


                        <View style={{ flex: 1, paddingVertical: Normalize(10) }} >

                          <View style={[globalstyles.textinput_onlyBox_Style, { width: "90%", height: Normalize(35) }]} >
                            <TextInput
                              value={search_phone_Code}
                              onChangeText={(e) => { setSearch_Phone_Code(e) }}
                              style={[globalstyles.textinput_onlyText_Style_No_textAlignVertical, { flex: 1, paddingHorizontal: Normalize(10) }]}
                              placeholder="Search Country Name" 
                              placeholderTextColor={Colors.textinput_inner_text}
                            />
                            <TouchableOpacity
                              onPress={() => {
                                setSearch_Phone_Code("")
                                Keyboard.dismiss()
                              }}
                              style={{ width: "10%", height: "100%", justifyContent: "center", alignItems: "center" }}
                            >
                              {
                                search_phone_Code == "" ?
                                  <Feather name="search" color={Colors.textinput_inner_text} size={Normalize(16)} />
                                  :
                                  <Entypo name="cross" color={Colors.red_old} size={Normalize(16)} />
                              }
                            </TouchableOpacity>
                          </View>
                          <ScrollView
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps="always"
                          >
                            {
                              all_country_code.map((item, index) => (
                                is_search(search_phone_Code, item.name) && <TouchableOpacity
                                  onPress={() => {
                                    setPhone_Code(item.phonecode)
                                    onpressSelect_CountryCode()
                                  }}
                                  key={index}
                                  style={{ flexDirection: "row", marginBottom: Normalize(8), backgroundColor: item.phonecode == phone_Code ? Colors.primary : Colors.white, alignItems: "center", paddingVertical: Normalize(5) }} >

                                  <Text style={[globalstyles.plantext_outfit_semibold, { fontSize: Normalize(11.5), color: item.phonecode == phone_Code ? Colors.white : Colors.black, paddingRight: Normalize(5), paddingHorizontal: Normalize(20) }]}>+ {item.phonecode}</Text>
                                  <Text style={[globalstyles.plantext_Outfit_Medium, { fontSize: Normalize(11.5), color: item.phonecode == phone_Code ? Colors.white : Colors.black }]}>{item.name}</Text>


                                </TouchableOpacity>
                              ))
                            }
                          </ScrollView>
                        </View>

                      </View>
                    </View>
                  </Modal>
                }
















                {/* password input */}


                <Text style={globalstyles.textinput_Header_Style} >Password</Text>

                <View style={[globalstyles.textinput_onlyBox_Style, { borderColor: passIsFocused ? Colors.primary : Colors.disable_textinput_border, backgroundColor: passIsFocused ? Colors.white : Colors.disable_textinput_background, }]} >
                  <View style={{ flex: 1 }} >
                    <TextInput
                      value={password}
                      secureTextEntry={showPassword ? false : true}
                      keyboardType="default"
                      autoCapitalize="none"
                      placeholder={strings.SIGNUPCREEN.PASSWORDPLACEHOLDER}
                      placeholderTextColor={Colors.textinput_inner_text}
                      style={[
                        globalstyles.textinput_onlyText_Style,
                        {},
                        language == 'pr' ? { ...RtlStyles.textInverse } : { ...RtlStyles.text },
                      ]}
                      onChangeText={(e) => setPassword(e)}
                      onFocus={() => setPassIsFocused(true)}
                      onBlur={() => setPassIsFocused(false)}
                    />
                  </View>
                  <Pressable onPressIn={onpress_eyeButton} style={{ height: "100%", width: Normalize(28), padding: Normalize(6.5) }} >
                    <Image source={showPassword ? images.eye_close : images.eye_open} style={[globalstyles.imageFit, { opacity: 0.8 }]} />
                  </Pressable>
                </View>

                {/* confirm password */}


                <Text style={globalstyles.textinput_Header_Style} >Confirmed password</Text>

                <View style={[globalstyles.textinput_onlyBox_Style, { borderColor: confPassIsFocused ? Colors.primary : Colors.disable_textinput_border, backgroundColor: confPassIsFocused ? Colors.white : Colors.disable_textinput_background, }]} >
                  <View style={{ flex: 1 }} >
                    <TextInput
                      value={password_confirmation}
                      keyboardType="default"
                      secureTextEntry={show_confirmedPassword ? false : true}
                      autoCapitalize="none"
                      placeholder={strings.SIGNUPCREEN.CONFPASSPLACEHOLDER}
                      placeholderTextColor={Colors.textinput_inner_text}
                      style={[
                        globalstyles.textinput_onlyText_Style,

                        language == 'pr' ? { ...RtlStyles.textInverse } : { ...RtlStyles.text },
                      ]}
                      onChangeText={(e) => setPassword_confirmation(e)}
                      onFocus={() => setConfPassIsFocused(true)}
                      onBlur={() => setConfPassIsFocused(false)}
                    />
                  </View>
                  <Pressable onPressIn={onpress_confirmed_eyeButton} style={{ height: "100%", width: Normalize(28), padding: Normalize(6.5) }} >
                    <Image source={show_confirmedPassword ? images.eye_close : images.eye_open} style={[globalstyles.imageFit, { opacity: 0.8 }]} />
                  </Pressable>
                </View>











                {/* P P & T C */}

                <Text style={[globalstyles.page_SubHeader_Text, { fontSize: Normalize(11), textAlign: "center", marginVertical: Normalize(10) }]} >By signing up, I agree to company's all <Text onPress={() => navigation.navigate("PrivacyPolicy")} style={{ color: Colors.primary }} >Privacy Policy</Text> and {'\n'}<Text onPress={() => navigation.navigate("Termsandcondition")} style={{ color: Colors.primary }} >Terms and Condition</Text></Text>


                {/* Sign up button */}
                {loader?  <Button
                  disabled={loader ? true : false}
                  activeOpacity={0.8}
                  name={loader ? "" : strings.SIGNUPCREEN.SIGNUP}
                  style={{
                    width: '100%',
                    alignSelf: 'center',
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
                :
                <Button
                  disabled={loader ? true : false}
                  activeOpacity={0.8}
                  onPress={signupButton}
                  name={loader ? "" : strings.SIGNUPCREEN.SIGNUP}
                  style={{
                    width: '100%',
                    alignSelf: 'center',
                  }}
                >
                  
                </Button>
                }
                {/*  seperator */}
                <Text style={[globalstyles.page_SubHeader_Text, { fontSize: Normalize(12), marginBottom: 0, textAlign: "center", marginTop: Normalize(20) }]}>
                  {strings.LOGINSCREEN.SEPERATOR}
                </Text>
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



                <View style={{ alignSelf: "center", marginBottom: Normalize(70), marginTop: Normalize(12) }} >
                  <Text style={[globalstyles.page_SubHeader_Text, { fontSize: Normalize(12) }]} >Already have an account yet ?  <Text onPress={() => navigation.goBack()} style={{ color: Colors.primary }} >Login</Text></Text>
                </View>

              </ScrollView>
            </KeyboardAvoidingView>
          </SafeAreaView>
      }
    </>
  );
}

export default withRtl(SignUp);
