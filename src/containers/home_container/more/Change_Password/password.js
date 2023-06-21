import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Pressable, ScrollView, SafeAreaView, TextInput, 
  Dimensions, Alert, ActivityIndicator,KeyboardAvoidingView } from 'react-native';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import Entypo from 'react-native-vector-icons/Entypo';
import { Colors } from '../../../../constants/colors';
import images from '../../../../constants/images';
import Normalize from '../../../../helpers/Dimens';
import Header from '../../../../components/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import styles from './Styles';
import strings from '../../../../constants/lng/LocalizedStrings';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import LoaderPage from '../../../../components/LoaderPage';
import { myContext } from '../../../../constants/ContextApi';
import { axiosUrl } from '../../../../constants/LinkPage';
import axiosInstance from '../../../../constants/AxiosCallPage';
import { leftOrRight } from '../../../../constants/RowOrRowreverse';
import Button from '../../../../components/Button';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
import globalStyle_esyPay from '../../../../constants/globalStyles/GlobalStyle_esyPay'

import Header_Transparent from '../../../../components/Header_Transparent';
import CurveDesing_Component from '../../../../constants/CurveDesing_Component';
import { fontfmliy } from '../../../../components/WhichFontFamily';

function password({ navigation }) {
  const { height } = Dimensions.get("window")
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
  const { token } = useContext(myContext);
  const [oldpassIsFocused, setOldpassIsFocused] = useState(false);
  const [newpassIsFocused, setNewPassIsFocused] = useState(false);
  const [confPassIsFocused, setConfPassIsFocused] = useState(false);
  const [old_password, setOld_password] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [loader, setLoader] = useState(false)
  const [isPasswordShow, setIsPasswordShow] = useState(false)
  const [isPasswordShow2, setIsPasswordShow2] = useState(false)
  const [isPasswordShow3, setIsPasswordShow3] = useState(false)

  const updateButton = async () => {
    if (password.length == 0 || old_password == 0 || password_confirmation == 0) {
      Toast.show(strings.ERROR.FILLUPALLFIELD)
    } else {
      if (password.length >= 8) {
        if (password == password_confirmation) {
          setLoader(true)
          const res = {
            "jsonrpc": "2.0",
            "params": {
              "old_password": old_password,
              "password": password,
              "password_confirmation": password_confirmation
            }
          }
          const data = await axiosInstance.post("change-password", res)
          setLoader(false)
          if (data.data.error == undefined) {
            Toast.show(strings.ERROR.PASSWORDCHANGESUCCESSFULLY)
          } else {
            Toast.show(data.data.error.meaning)
          }
        } else {
          Toast.show(strings.ERROR.ENTERSAMEPASSWORD)
        }
      } else {
        Toast.show(strings.ERROR.ENTERPASSWORD8DIGIT)
      }
    }
  }
  const isLessDigits = (str) => {
    if (str.length > 0 && str.length < 8) {
        return true;
    } else {
        return false;
    }
};
const hasBothCase = (str) => {
  if (str.length > 0 && !((/[a-z]/.test(str)) && (/[A-Z]/.test(str)))) {
      return true;
  } else {
      return false;
  }
};
  return (
    <>
      {
        loader == true ?
          <LoaderPage />
          :
          <SafeAreaView style={{ backgroundColor: Colors.white, flex: 1, flexDirection: 'column' }}>

            <View style={[globalstyles.container]}>
              {/* <View style={{ backgroundColor: "#f9fafc" }}> */}
              <View style={{
                height: Normalize(50),
                paddingTop: Normalize(8)
              }} >
            <Pressable
                onPress={() =>  navigation.goBack()}
                style={{ flexDirection: "row", alignItems: "flex-start", }} >
                <View style={{ height: "100%", width: Normalize(28), }} >
                    <Ionicons name={"arrow-back-outline"} color={Colors.greyText} size={Normalize(25)} />
                </View>
            </Pressable>
            </View>
              <KeyboardAvoidingView 
                        behavior={(Platform.OS === 'ios') ? "padding" : null}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="always"
              >
                <Text style={[globalstyles.page_Header_Text, { marginTop: Normalize(10), marginBottom: Normalize(20), fontFamily:'Lato-Bold' }]}>{strings.CHANGEPASS.HEADERTEXT}</Text>
                <Text style={globalstyles.textinput_Header_Style}>{strings.CHANGEPASS.OLDPASSWORD}</Text>
                <View style={{borderBottomColor:Colors.grey,borderBottomWidth:.5,flexDirection:'row'}}>
                <TextInput
                  keyboardType="default"
                  autoCapitalize="none"
                  placeholder={"Enter old password"}
                  onChangeText={(e) => setOld_password(e)}
                  style={[globalStyle_esyPay.input_noIcon, {  borderBottomWidth: 0, width: "88%" }]}
                  secureTextEntry={!isPasswordShow ? true : false}
                  onFocus={() => setOldpassIsFocused(true)}
                  onBlur={() => setOldpassIsFocused(false)}
                />
                <TouchableOpacity activeOpacity={1} onPress={() => setIsPasswordShow(!isPasswordShow)} style={{ height: Normalize(30), width: Normalize(30), justifyContent: "flex-end", alignItems: "center" }} >
                                    <Entypo name={!isPasswordShow ? "eye" : "eye-with-line"} color={Colors.primary} size={Normalize(18)} />
                                </TouchableOpacity>
                                </View>
                <Text style={[globalstyles.textinput_Header_Style,{marginTop:Normalize(20)}]}>{strings.CHANGEPASS.NEWPASSWORD}</Text>
                
                <View style={{borderBottomColor:Colors.grey,borderBottomWidth:.5,flexDirection:'row'}}>

                <TextInput
                  keyboardType="default"
                  autoCapitalize="none"
                  placeholder={"Enter new password"}
                  onChangeText={(e) => setPassword(e)}
                  style={[globalStyle_esyPay.input_noIcon, {  borderBottomWidth: 0, width: "88%" }]}
                  secureTextEntry={!isPasswordShow2 ? true : false}
                  onFocus={() => setNewPassIsFocused(true)}
                  onBlur={() => setNewPassIsFocused(false)}
                />
              <TouchableOpacity activeOpacity={1} onPress={() => setIsPasswordShow2(!isPasswordShow2)} style={{ height: Normalize(30), width: Normalize(30), justifyContent: "flex-end", alignItems: "center" }} >
                                    <Entypo name={!isPasswordShow2 ? "eye" : "eye-with-line"} color={Colors.primary} size={Normalize(18)} />
                                </TouchableOpacity>
                                </View>

                <Text style={[globalstyles.textinput_Header_Style,{marginTop:Normalize(20)}]}>{strings.CHANGEPASS.CONFIRMNEWPASSWORD}</Text>
                
                <View style={{borderBottomColor:Colors.grey,borderBottomWidth:.5,flexDirection:'row'}}>

                <TextInput
                  keyboardType="default"
                  autoCapitalize="none"
                  placeholder={"Confirm new password"}
                  onChangeText={(e) => setPassword_confirmation(e)}
                  style={[globalStyle_esyPay.input_noIcon, {  borderBottomWidth: 0, width: "88%" }]}
                  secureTextEntry={!isPasswordShow3 ? true : false}
                  onFocus={() => setConfPassIsFocused(true)}
                  onBlur={() => setConfPassIsFocused(false)}
                />
                <TouchableOpacity activeOpacity={1} onPress={() => setIsPasswordShow3(!isPasswordShow3)} style={{ height: Normalize(30), width: Normalize(30), justifyContent: "flex-end", alignItems: "center" }} >
                                    <Entypo name={!isPasswordShow3 ? "eye" : "eye-with-line"} color={Colors.primary} size={Normalize(18)} />
                </TouchableOpacity>
                </View>


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
              </KeyboardAvoidingView>
            </View>
            <View style={{ backgroundColor: Colors.primary, position: "absolute", height: Normalize(20), width: "100%", bottom: 0, }} >
              <View style={{ flex: 1, borderBottomLeftRadius: 25, borderBottomRightRadius: 25, backgroundColor: Colors.white, }} ></View>
            </View>
            <Button
                  style={{  marginBottom: 100,width:'90%',alignSelf:"center" }}
                  onPress={updateButton}
                  name={strings.CHANGEPASS.UPDATEPASSWORD}
                >
                  {
                    loader &&
                    <ActivityIndicator
                      size={"small"}
                      color={Colors.white}
                    />
                  }
                </Button>

          </SafeAreaView>
      }
    </>
  );
}

export default withRtl(password);
