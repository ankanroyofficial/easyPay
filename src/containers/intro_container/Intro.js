import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Platform, Image, ImageBackground, Text, StatusBar } from 'react-native';
import Normalize from './../../helpers/Dimens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { myContext } from '../../constants/ContextApi';
import Toast from 'react-native-simple-toast';
import strings from '../../constants/lng/LocalizedStrings';
import { setLng, getLng } from '../../helpers/changeLng';
import { useRtlContext, withRtl } from 'react-native-easy-localization-and-rtl';
import { axiosUrl } from '../../constants/LinkPage';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { statusCodes } from "@react-native-google-signin/google-signin";
import images from '../../constants/images';
import { Colors } from '../../constants/colors';
import axiosInstance from '../../constants/AxiosCallPage';
import { SafeAreaView } from 'react-native';
const windowHeight = Dimensions.get('window').height;
export default function Intro({ navigation }) {
  const { language, setLanguage } = useRtlContext();
  const { setToken,
    setall_Country_code,
    setChoose_Categories,
    setAlllanguage,
    setAllSkill,
    setGetAround,
    filter_Categories, setFilter_Categories,
    setcatagory,
    setUserId,
    getAround_temporary, setGetAround_temporary,
    setListing_Categories
  } = useContext(myContext)
  const navigation2 = useNavigation()
  useEffect(async () => {
    selectedLng();
    getcountries()
    get_notify_Category()
    get_Category_image()
    getalllanguage()
    get_category()
    get_TransportList()
    await AsyncStorage.setItem("isMyProfile", "false")
  }, []);
  const selectedLng = async () => {
    const lngData = await getLng();
    if (!!lngData) {
      strings.setLanguage(lngData);
      setLanguage(lngData);
    }
  };
  const normal_login = async () => {
    try {
      const fcm = await AsyncStorage.getItem("fcmtoken")

      const normal_loginDetails = await AsyncStorage.getItem("normal_login_details")
      const to_stringify = JSON.parse(normal_loginDetails)
      const data = await axios({
        method: "post",
        url: `${axiosUrl.URL}login`,
        headers: {
          "X-localization": language == "pr" ? "fa" : "en"
        },
        data: {
          "jsonrpc": "2.0",
          "params": {
            "email": to_stringify.email,
            "password": to_stringify.password,
            "firebase_reg_no": fcm ? fcm : "cpuu8oy2A3g-EqiwUcPG7a:APA91bFvUhBshgji__P1h_Z0UgKt15odWc0y1P7z33XVy6OVR1TmkyNVwKl1FVYuK4itkvdM6j5ehSe2WY_MMbdOZQhEoHYhMe3Q9CP38vKaCFowv1zqQMFfmpM_7wqxuyIKetkM4r_h",
            "device_type": Platform.OS === "android" ? "android" : "iphone"
          }
        }
      })
      if (data.data.result) {
        AsyncStorage.setItem('email', to_stringify.email);
        AsyncStorage.setItem('password', to_stringify.password);
        AsyncStorage.setItem('token', data.data.result.token);
        AsyncStorage.setItem('slug', data.data.result.userdata.slug);
        AsyncStorage.setItem('userid', (data.data.result.userdata.id).toString());
        setUserId((data.data.result.userdata.id).toString());
        AsyncStorage.setItem('application', "login");
        // Toast.show(strings.ERROR.SUCCESSFULLYLOGIN)
        setToken(data.data.result.token)
        navigation.replace('Home');
      } else {
        navigation.replace('IntroVideoScreen')
      }

    } catch (error) {
      // console.log(error)
      navigation.replace('IntroVideoScreen')
    }
  }
  const google_login = async () => {
    try {
      const google_loginDetails = await AsyncStorage.getItem("google_login_details")
      const userInfo = JSON.parse(google_loginDetails)
      const fcmToken = await AsyncStorage.getItem("fcmtoken")
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
      }
      )

      if (data) {
        if (data.data.result == undefined) {
          alert(data.data.error.meaning)

        } else {
          AsyncStorage.setItem('token', data.data.result.token);
          AsyncStorage.setItem('slug', data.data.result.userdata.slug)
          AsyncStorage.setItem('userid', (data.data.result.userdata.id).toString());
          setUserId((data.data.result.userdata.id).toString());
          AsyncStorage.setItem('application', "login");
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
      console.log("google_login intro", error)
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
  const facebook_signIn = async (user) => {
    try {
      const fcmToken = await AsyncStorage.getItem("fcmtoken")
      const facebook_loginDetails = await AsyncStorage.getItem("facebook_login_details")
      const user = JSON.parse(facebook_loginDetails)
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
          // console.log(data.data)
          navigation.replace('IntroVideoScreen')
        } else {
          AsyncStorage.setItem('token', data.data.result.token);
          AsyncStorage.setItem('slug', data.data.result.userdata.slug)
          AsyncStorage.setItem('userid', (data.data.result.userdata.id).toString());
          setUserId((data.data.result.userdata.id).toString());
          AsyncStorage.setItem('application', "login");
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
      console.log("fbSign", error)
    }

  };
  const which_login = async () => {
    try {
      const last_login = await AsyncStorage.getItem("last_login_from")
      const islogin = await AsyncStorage.getItem("application")

      // console.log("last_login...........", last_login)
      // console.log("islogin...........", islogin)

      if (islogin == "logout" || islogin == null) {
        sendtoWhichpage()
      } else {
        let token = await AsyncStorage.getItem("token")
        // console.log(token)


        if (token != null) {
          let res = await axiosInstance.post('check-validate');

          if (res.data.result) {
            navigation.replace('Home')
          } else {
            navigation.replace("IntroVideoScreen")
          }
        } else {
          if (last_login == null) {
            sendtoWhichpage()
          } else {
            autologin(last_login)
          }
        }
      }
    } catch (error) {
      console.log("which_login", error)
    }
  }
  const auto_google_login = () => {
    try {
      google_login()
    } catch (error) {
      console.log("auto_google_login", error)
    }
  }
  const auto_facebook_login = () => {
    try {
      facebook_signIn()
    } catch (error) {
      console.log("auto_facebook_login", error)
    }
  }
  const auto_normal_login = () => {
    try {
      normal_login()
    } catch (error) {
      console.log("auto_normal_login", error)
    }
  }
  const autologin = async (val) => {
    try {
      // console.log("--------",(val=="S"))
      if (val == "G") {
        const google_loginData = await AsyncStorage.getItem("google_login_details")
        // console.log("google_loginData", google_loginData)
        if (google_loginData == null) {
          navigation.replace('IntroVideoScreen')
        } else {
          auto_google_login()
        }
      } else if (val == "F") {
        const facebook_loginData = await AsyncStorage.getItem("facebook_login_details")
        // console.log("facebook_loginData", facebook_loginData)
        if (facebook_loginData == null) {
          navigation.replace('IntroVideoScreen')
        } else {
          auto_facebook_login()
        }
      } else if (val == "S" || val == "A") {
        const normal_loginData = await AsyncStorage.getItem("normal_login_details")
        // console.log("normal_loginData", normal_loginData)
        if (normal_loginData == null) {
          navigation.replace('IntroVideoScreen')
        } else {
          auto_normal_login()
        }
      }
    } catch (error) {
      console.log("autologin", error)
    }
  }
  useEffect(() => {
    setTimeout(() => {
      which_login()
    }, 3000);
  }, []);

  const sendtoWhichpage = async () => {
    let isIntroShown = await AsyncStorage.getItem("isIntroShown")
    if (isIntroShown == null || isIntroShown != "true") {
      navigation.replace("QuickIntro_SkipIntro")
    } else {
      let lastDetails = await AsyncStorage.getItem("lastRegisterEmail")
      // console.log("lastDetails", lastDetails)
      if (lastDetails == null) {
        navigation.replace("IntroVideoScreen")
      } else {
        verifychecking()
      }
    }
  }
  const getcountries = async () => {
    const data = await axios.post(`${axiosUrl.URL}get-country-language`)
    // console.log("******", data.data.countrys)
    if (data.data.countrys) {
      setall_Country_code(data.data.countrys)

    } else {
      console.log("data is not coming")
    }
  }
  const verifychecking = async () => {
    try {
      let fcm = await AsyncStorage.getItem("fcmtoken")
      let lastDetails = await AsyncStorage.getItem("lastRegisterEmail")
      let a = JSON.parse(lastDetails)
      if (a == null) {
        navigation.replace("IntroVideoScreen")
      } else {
        let data = {
          "params": {
            "email": a.email,   //ERROR ERROR
            "verify_in_app": "true",
            "firebase_reg_no": fcm !== "" ? fcm : "cpuu8oy2A3g-EqiwUcPG7a:APA91bFvUhBshgji__P1h_Z0UgKt15odWc0y1P7z33XVy6OVR1TmkyNVwKl1FVYuK4itkvdM6j5ehSe2WY_MMbdOZQhEoHYhMe3Q9CP38vKaCFowv1zqQMFfmpM_7wqxuyIKetkM4r_h",
            "device_type": Platform.OS === "android" ? "android" : "iphone"
          }
        }
        let res = await axios.post(axiosUrl.URL + "get-info-of-verify", data)
        if (res.data.result) {
          sendToWhichStep(res.data.result.user.info)
        } else {
          navigation.replace("IntroVideoScreen")
        }

      }
    } catch (error) {
      navigation.replace("IntroVideoScreen")
      console.log("verifychecking", error)
    }
  }
  const sendToWhichStep = async (val) => {
    try {
      let verify_in_app = val.verify_in_app;
      let verify_in_email = val.verify_in_email;
      let takingDetails_complete = val.takingDetails_complete;
      let up1_complete = val.up1_complete;

      let lastDetails = await AsyncStorage.getItem("lastRegisterEmail")
      let a = JSON.parse(lastDetails)

      // console.log("verify_in_app    ", verify_in_app)
      // console.log("verify_in_email    ", verify_in_email)
      // console.log("takingDetails_complete    ", takingDetails_complete)
      // console.log("up1_complete    ", up1_complete)
      if (verify_in_app == "true" && verify_in_email == "true" && takingDetails_complete == "false" && up1_complete == "false") {
        navigation.navigate("TakingDetails")
      } else if (verify_in_app == "false" && verify_in_email == "false" && takingDetails_complete == "false" && up1_complete == "false") {
        navigation.replace("EmailVerificationPage", { email: a.email })
      } else if (verify_in_app == "false" && verify_in_email == "true" && takingDetails_complete == "false" && up1_complete == "false") {
        navigation.replace("EmailVerificationPage", { email: a.email })
      } else if (verify_in_app == "true" && verify_in_email == "true" && takingDetails_complete == "true" && up1_complete == "false") {
        navigation.replace("AfterSignUpThreePointPage")
      } else {
        navigation.replace("IntroVideoScreen")
      }
    } catch (error) {
      console.log("sendToWhichPage", error)
    }
  }
  const getalllanguage = async () => {
    const data = await axios.post(`${axiosUrl.URL}get-country-language`);
    if (data.data.countrys && data.data.language) {
      let langFinalData = [];
      data.data.language.map(item => {
        item.isSelected = false;
        langFinalData.push(item);
      });
      setAlllanguage(langFinalData);
    }
  };

  const get_category = async () => {
    try {
      const data = await axiosInstance.post('get-category');
      if (data) {
        // let categoryData = [];
        let skilldata = [];
        data.data.result.get_category.map(item => {
          // categoryData.push({ name: item.name, isSelected: false, id: item.id });
          item.isSelected = false;
          skilldata.push(item);
        });
        setAllSkill(skilldata);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const get_TransportList = async () => {
    try {
      const data = await axiosInstance.post('get-transport-list');
      if (data.data.result) {
        let newtransport = [];
        (data.data.result.tranports).map(item => {

          item.isSelected = false;
          newtransport.push(item);
        });
        // console.log(newtransport)
        setGetAround(newtransport)
        setGetAround_temporary(newtransport)
      }
    } catch (error) {
      console.log("get_TransportList intro", error);
    }
  };
  const get_notify_Category = async () => {
    try {
      const data = await axiosInstance.post('get-category');
      // console.log(data.data.result)

      if (data.data.result) {
        let categoryData = [];
        (data.data.result.get_category).map(item => {
          categoryData.push({ name: item.name, isSelected: false, id: item.id });
        });

        // console.log(categoryData)

        setChoose_Categories(categoryData);
        setFilter_Categories(categoryData);
        setListing_Categories(categoryData);
      }
    } catch (error) {
      console.log("get_notify_Category", error);
    }
  };

  const get_Category_image = async () => {
    try {
      const data = await axiosInstance.post('get-category');
      // console.log(data.data.result)

      if (data.data.result) {
        let categoryData = [];
        (data.data.result.get_category).map(item => {
          item.isSelected = false;
          categoryData.push(item)
        });
        setcatagory(categoryData);
      }
    } catch (error) {
      console.log("get_notify_Category", error);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1 }}>
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
        <View style={{ height: Normalize(92), width: Normalize(92) }} >
          <Image source={images.logo_white} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: Colors.primary
  },
});
