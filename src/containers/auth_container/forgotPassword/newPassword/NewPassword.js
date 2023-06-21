import React, { useEffect, useState } from 'react';
import {
  View, Text, TouchableOpacity, Image, ScrollView,
  SafeAreaView, TextInput, Dimensions, Alert, ActivityIndicator,
  StatusBar, KeyboardAvoidingView, Platform, BackHandler, Keyboard
} from 'react-native';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import Entypo from 'react-native-vector-icons/Entypo';
import { Colors } from '../../../../constants/colors';
import images from '../../../../constants/images';
import Normalize from '../../../../helpers/Dimens';
import Header from '../../../../components/Header';
import strings from '../../../../constants/lng/LocalizedStrings';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import LoaderPage from '../../../../components/LoaderPage';
import Button from '../../../../components/Button';
import { axiosUrl } from '../../../../constants/LinkPage';
import axiosInstance from '../../../../constants/AxiosCallPage';
import { whichFontFamily } from '../../../../constants/WhichFontFamily';
import Header_Transparent from '../../../../components/Header_Transparent';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
import globalStyle_esyPay from '../../../../constants/globalStyles/GlobalStyle_esyPay';
import { marginTop } from 'styled-system';
import { CommonActions } from '@react-navigation/native';
import { fontfmliy } from '../../../../components/WhichFontFamily';

function NewPassword({ navigation, route }) {
  const { otp, email } = route.params
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
  const [newpassIsFocused, setNewPassIsFocused] = useState(false);
  const [confPassIsFocused, setConfPassIsFocused] = useState(false);
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [loader, setLoader] = useState(false)
  const [isPasswordShow, setIsPasswordShow] = useState(false)
  const [isPasswordShow2, setIsPasswordShow2] = useState(false)


  const updateButton = async () => {
    if (password.length == 0 || password_confirmation == 0) {
      Toast.show(strings.ERROR.FILLUPALLFIELD)
    } else {

      if (password.length >= 8) {
        if (checkBothCase(password)) {
          if (password == password_confirmation) {
            setLoader(true)
            const data = await axios({
              method: 'post',
              url: `${axiosUrl.URL}reset-password`,
              headers: {
                'X-localization': language == 'pr' ? 'fa' : 'en',
                //   Authorization: 'Bearer ' + token,
              },
              data: {
                "params": {
                  "otp": otp,
                  "password": password,
                  "c_password": password_confirmation,
                  "email": email
                }
              }
            });
            // console.log(data.data)
            if (data.data.result.error == undefined) {
              Toast.show(data.data.result.success.meaning)
              setLoader(false)
              // navigation.replace('SignIn')
              navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [{ name: 'TakingEmailForLogin' }],
                }),
              );
            } else {
              Toast.show(data.data.result.error.meaning)
              setLoader(false)
            }
          } else {
            Toast.show(strings.ERROR.CONFIRMPASSWORD)
          }
        } else {
          Toast.show("At least one uppercase and lowercase compulsory")
        }
      } else {
        Toast.show(strings.ERROR.ENTERPASSWORD8DIGIT)
      }



    }
  }


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


  const resetBackFunc = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: 'IntroVideoScreen' }],
      }),
    );
  }

  const handleBackButtonClick = () => {
    Alert.alert('Close', 'Are you sure, you want to close this registration?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      { text: 'OK', onPress: resetBackFunc },
    ]);
    return true;
  };





  useEffect(() => {
    const a = BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      a.remove();
    };
  }, []);


  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', () => {
      Keyboard.dismiss();
    })
  }, [])

  return (
    <SafeAreaView style={{ backgroundColor: Colors.white, flex: 1, flexDirection: 'column' }}>
      {
        loader ?
          <LoaderPage />
          :
          <KeyboardAvoidingView
            behavior={(Platform.OS === 'ios') ? "padding" : null} style={globalstyles.container}>

            <View style={{ flex: 1 }} >
              <Header_Transparent

                backFunc={() => handleBackButtonClick()}
                iswhitebackground />
              <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />

              <Text style={[globalstyles.page_Header_Text, { marginBottom: Normalize(15) }]} >Reset Password</Text>

              <View style={{ flexDirection: "row" }} >
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



              <Text style={[globalStyle_esyPay.inputHeader, { marginTop: Normalize(25) }]} >{strings.CHANGEPASS.NEWPASSWORD}</Text>
              <View style={{ flexDirection: "row", justifyContent: "space-between", borderBottomWidth: Normalize(1), borderBottomColor: newpassIsFocused ? Colors.primary : Colors.textinput_bottomBorder, }} >

                <TextInput
                  value={password}
                  keyboardType="default"
                  secureTextEntry={!isPasswordShow ? true : false}
                  autoCapitalize="none"
                  placeholder={strings.CHANGEPASS.ENTERHERE}
                  placeholderTextColor={Colors.textinput_inner_text}
                  onChangeText={(e) => setPassword(e)}
                  style={[globalStyle_esyPay.input_noIcon, { height: "100%", borderBottomWidth: 0, width: "88%" }]}
                  onFocus={() => setNewPassIsFocused(true)}
                  onBlur={() => setNewPassIsFocused(false)}
                />
                <TouchableOpacity activeOpacity={1} onPress={() => setIsPasswordShow(!isPasswordShow)} style={{ height: Normalize(30), width: Normalize(30), justifyContent: "flex-end", alignItems: "center" }} >
                  <Entypo name={!isPasswordShow ? "eye" : "eye-with-line"} color={Colors.primary} size={Normalize(18)} />
                </TouchableOpacity>
              </View>


              <Text style={[globalStyle_esyPay.inputHeader, { marginTop: Normalize(18) }]} >{strings.CHANGEPASS.CONFIRMNEWPASSWORD2}</Text>
              <View style={{ flexDirection: "row", justifyContent: "space-between", borderBottomWidth: Normalize(1), borderBottomColor: confPassIsFocused ? Colors.primary : Colors.textinput_bottomBorder, }} >

                <TextInput
                  value={password_confirmation}
                  keyboardType="default"
                  secureTextEntry={!isPasswordShow2 ? true : false}
                  autoCapitalize="none"
                  placeholder={strings.CHANGEPASS.ENTERHERE}
                  placeholderTextColor={Colors.textinput_inner_text}
                  onChangeText={(e) => setPassword_confirmation(e)}
                  style={[globalStyle_esyPay.input_noIcon, { height: "100%", borderBottomWidth: 0, width: "88%" }]}

                  onFocus={() => setConfPassIsFocused(true)}
                  onBlur={() => setConfPassIsFocused(false)}
                />
                <TouchableOpacity activeOpacity={1} onPress={() => setIsPasswordShow2(!isPasswordShow2)} style={{ height: Normalize(30), width: Normalize(30), justifyContent: "flex-end", alignItems: "center" }} >
                  <Entypo name={!isPasswordShow2 ? "eye" : "eye-with-line"} color={Colors.primary} size={Normalize(18)} />
                </TouchableOpacity>
              </View>

              <View style={{ flex: 1 }} />
              <Button
                onPress={updateButton}
                name={strings.FORGOTPASSBTN.RESETPASSWORD}
                style={{ width: "100%", marginBottom: Normalize(15) }}
              />
            </View>
          </KeyboardAvoidingView>
      }
    </SafeAreaView>
  );
}

export default withRtl(NewPassword);
