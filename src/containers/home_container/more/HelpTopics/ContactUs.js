import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
  SafeAreaView,
  BackHandler,
  Linking,
  Keyboard,
  KeyboardAvoidingView,
  ImageBackground
} from 'react-native';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import images from '../../../../constants/images';
import { Colors } from '../../../../constants/colors';
import strings from '../../../../constants/lng/LocalizedStrings';
import styles from './Styles2';
import Header from '../../../../components/Header';
import Button from '../../../../components/Button';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import LoaderPage from '../../../../components/LoaderPage';
import { addCommaAndTranslateInPersian } from '../../../../constants/NumberWithCommaAndInPersian';
import { numberWithCommas, numberWithCommasinParsian } from '../../../../constants/NumberWithComma';
import { engToPersian } from '../../../../constants/EnglishToPersian';
import { leftOrRight, rowOrRowreverse } from '../../../../constants/RowOrRowreverse';
import { axiosUrl } from '../../../../constants/LinkPage';
import axiosInstance from '../../../../constants/AxiosCallPage';
import { whichFontFamily } from '../../../../constants/WhichFontFamily';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
import CurveDesing_Component from '../../../../constants/CurveDesing_Component';
import Header_Transparent from '../../../../components/Header_Transparent';
import { fontfmliy } from '../../../../components/WhichFontFamily';


function ContactUs({ navigation }) {

  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [sub, setSub] = useState("");
  const [message, setMessage] = useState("");
  const [address, setAddress] = useState("");
  const [emailforshow, setEmailforShow] = useState("");
  const [numberforshow, setNumberforshow] = useState("");
  const [phonecode, setPhonecode] = useState("");
  const [fl, setFl] = useState("");
  const [tl, setTl] = useState("");
  const [ll, setLl] = useState("");




  const [loader, setLoader] = useState(false)


  useEffect(async () => {
    getData()
    return () => {
      getData()
    }
  }, []);

  const getData = async () => {
    try {
      setLoader(true)

      const data = await axiosInstance.post("get-contact-us-details")

      setAddress(language == "en" ? data.data.result.contact_us.address : data.data.result.contact_us.address_fa)
      setEmailforShow(language == "en" ? data.data.result.contact_us.email : data.data.result.contact_us.email_fa)
      setNumberforshow(language == "en" ? data.data.result.contact_us.phone : data.data.result.contact_us.phone_fa)
      setPhonecode(language == "en" ? data.data.result.country_code.phonecode : data.data.result.country_code_fa.phonecode)
      setFl(data.data.result.contact_us.facebook_link)
      setTl(data.data.result.contact_us.twitter_link)
      setLl(data.data.result.contact_us.linkedin_link)


      setLoader(false)
    } catch (error) {
      setLoader(false)
      console.log(error)
    }
  }
  const login = async () => {
    try {
      let token = await AsyncStorage.getItem("token");
      // console.log(mobile.length)
      // console.log(mobile)

      if (first == "" || first.trim() == "") {
        Toast.show(strings.ERROR.ENTERFNAME)
      } else if (last == "" || last.trim() == "") {
        Toast.show(strings.ERROR.ENTERLNAME)
      } else if (email == "" || email.trim() == "") {
        Toast.show(strings.ERROR.ENTEREMAIL)
      } else if (mobile.length < 8 && mobile.length > 12) {

        Toast.show(strings.ERROR.ENTERPHONE)



      } else if (sub == "" || sub.trim() == "") {
        Toast.show(language == "en" ? "Enter subject" : "موضوع را وارد کنید")
      } else if (message == "" || message.trim() == "") {
        Toast.show(language == "en" ? "Enter message" : "پیام را وارد کنید")
      } else {

        const EmailVerify = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        const res = EmailVerify.test(email)
        if (res == false) {
          Toast.show(strings.ERROR.ENTERVALIDEMAIL)
        } else {
          setLoader(true)

          var apiPhonenumber = mobile.toEnglishDigits()
          var apiPhonenumber_string = apiPhonenumber.toString()
          const finalFormData = new FormData();
          finalFormData.append('fname', first);
          finalFormData.append('lname', last);
          finalFormData.append('email', email);
          {
            language == "en" ? finalFormData.append('phone', mobile) : finalFormData.append('phone', apiPhonenumber_string)
          }
          finalFormData.append('subject', sub);
          finalFormData.append('message', message);

          const data = finalFormData
          const ress = await axiosInstance.post("submit-contact-us", data)
          Toast.show(ress.data.success.meaning)
          setFirst("")
          setLast("")
          setEmail("")
          setMobile("")
          setSub("")
          setMessage("")
        }
      }
      setLoader(false)
    } catch (error) {
      setLoader(false)
      console.log(error)
    }
  }

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


  return (
    <>
      {
        loader == true ?
          <LoaderPage />
          :
          <SafeAreaView style={{ backgroundColor: Colors.white, flex: 1, flexDirection: 'column' }}>

            <KeyboardAvoidingView
              behavior={(Platform.OS === 'ios') ? "padding" : null} style={styles.container}>

              <CurveDesing_Component bottom>
                <View style={globalstyles.container_only_padding} >
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="always"
                    contentContainerStyle={{}}
                  >
                    <Header_Transparent />

                    <ImageBackground source={images.contactus} style={{ height: Normalize(140), width: "100%" }} borderRadius={Normalize(8)} blurRadius={3} >
                      <Text style={[globalstyles.page_Header_Text, { fontSize: Normalize(18), color: Colors.white, marginLeft: Normalize(20), marginTop: Normalize(20) }]} >{strings.HELPTOPICS.CONTACTUS}</Text>
                    </ImageBackground>

                    <Text style={[globalstyles.page_Header_Text, { fontSize: Normalize(15), marginVertical: Normalize(10) }]}>Get in Touch!</Text>
                    <View style={{ backgroundColor: Colors.white, elevation:Normalize(2), width: "99%", alignSelf: "center", borderRadius: 8, paddingVertical: Normalize(10) }}>
                      {/* ***************first name************ */}

                      <View style={[globalstyles.textinput_onlyBox_Style, { width: "90%", borderColor: Colors.borderColor, borderWidth: Normalize(0.5) }]} >
                        <View style={{ height: "100%", width: "15%", justifyContent: "center", alignItems: "center", borderRightColor: Colors.borderColor, borderRightWidth: Normalize(0.5), }} >
                          <Image source={images.user} style={{ height: "50%", width: "50%", resizeMode: "contain", opacity: 0.5 }} />
                        </View>
                        <View style={{ flex: 1 }} >
                          <TextInput
                            value={first}
                            keyboardType="default"
                            autoCapitalize="none"
                            placeholder={strings.SIGNUPCREEN.NAMEPLAACEHOLDER}
                            placeholderTextColor={Colors.textinput_inner_text}
                            onChangeText={(e) => setFirst(e)}
                            style={globalstyles.textinput_onlyText_Style} />
                        </View>
                      </View>

                      {/* ***********last name************* */}

                      <View style={[globalstyles.textinput_onlyBox_Style, { width: "90%", borderColor: Colors.borderColor, borderWidth: Normalize(0.5) }]} >
                        <View style={{ height: "100%", width: "15%", justifyContent: "center", alignItems: "center", borderRightColor: Colors.borderColor, borderRightWidth: Normalize(0.5), }} >
                          <Image source={images.user} style={{ height: "50%", width: "50%", resizeMode: "contain", opacity: 0.5 }} />
                        </View>
                        <View style={{ flex: 1 }} >
                          <TextInput
                            value={last}
                            keyboardType="default"
                            autoCapitalize="none"
                            placeholder={strings.SIGNUPCREEN.LASTNAMEPLAACEHOLDER}
                            placeholderTextColor={Colors.textinput_inner_text}
                            onChangeText={(e) => setLast(e)}
                            style={globalstyles.textinput_onlyText_Style} />
                        </View>
                      </View>


                      {/* ********************email**************** */}



                      <View style={[globalstyles.textinput_onlyBox_Style, { width: "90%", borderColor: Colors.borderColor, borderWidth: Normalize(0.5) }]} >
                        <View style={{ height: "100%", width: "15%", justifyContent: "center", alignItems: "center", borderRightColor: Colors.borderColor, borderRightWidth: Normalize(0.5), }} >
                          <Image source={images.email} style={{ height: "50%", width: "50%", resizeMode: "contain", opacity: 0.5 }} />
                        </View>
                        <View style={{ flex: 1 }} >
                          <TextInput
                            value={email}
                            numberOfLines={1}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            placeholder={strings.SIGNUPCREEN.EMAILPLACEHOLDER}
                            placeholderTextColor={Colors.textinput_inner_text}
                            onChangeText={(e) => setEmail(e)}
                            style={globalstyles.textinput_onlyText_Style} />
                        </View>
                      </View>




                      {/* ******************phone**************** */}


                      <View style={[globalstyles.textinput_onlyBox_Style, { width: "90%", borderColor: Colors.borderColor, borderWidth: Normalize(0.5) }]} >
                        <View style={{ height: "100%", width: "15%", justifyContent: "center", alignItems: "center", borderRightColor: Colors.borderColor, borderRightWidth: Normalize(0.5), }} >
                          <Image source={images.phone} style={{ height: "50%", width: "50%", resizeMode: "contain", opacity: 0.5 }} />
                        </View>
                        <View style={{ flex: 1 }} >
                          <TextInput
                            value={mobile}
                            keyboardType="number-pad"
                            autoCapitalize="none"
                            placeholder={"Phone"}
                            maxLength={12}
                            placeholderTextColor={Colors.textinput_inner_text}
                            onChangeText={(e) => setMobile(e)}
                            style={globalstyles.textinput_onlyText_Style} />
                        </View>
                      </View>







                      {/* *****************subject**************** */}


                      <View style={[globalstyles.textinput_onlyBox_Style, { width: "90%", borderColor: Colors.borderColor, borderWidth: Normalize(0.5) }]} >
                        <View style={{ height: "100%", width: "15%", justifyContent: "center", alignItems: "center", borderRightColor: Colors.borderColor, borderRightWidth: Normalize(0.5), }} >
                          <Image source={images.sub} style={{ height: "50%", width: "50%", resizeMode: "contain", opacity: 0.5 }} />
                        </View>
                        <View style={{ flex: 1 }} >
                          <TextInput
                            value={sub}
                            keyboardType="default"
                            autoCapitalize="none"
                            placeholder={language == "en" ? "Subject" : "موضوع"}
                            placeholderTextColor={Colors.textinput_inner_text}
                            onChangeText={(e) => setSub(e)}
                            style={globalstyles.textinput_onlyText_Style} />
                        </View>
                      </View>

                      <TextInput
                        value={message}
                        multiline
                        keyboardType="default"
                        autoCapitalize="none"
                        placeholder={"Type your message here..."}
                        placeholderTextColor={Colors.textinput_inner_text}
                        onChangeText={(e) => setMessage(e)}
                        style={[globalstyles.multiline_textinputStyle, { width: "90%", borderColor: Colors.borderColor, borderWidth: Normalize(0.5) }]}
                        onSubmitEditing={() => { Keyboard.dismiss() }}
                      />
                      <Button
                        onPress={login}
                        name={"Send Message"}
                        style={styles.signInBtn}
                      />
                    </View>

                    <View style={{ backgroundColor: Colors.white, elevation:Normalize(2), width: "99%", alignSelf: "center", borderRadius: 8, padding: Normalize(10), marginTop: Normalize(15), marginBottom: Normalize(40) }}>

                      <View style={{ flexDirection: rowOrRowreverse(language), marginTop: Normalize(15), alignItems: "center" }} >
                        <View style={{ height: Normalize(25), width: Normalize(25), backgroundColor: Colors.green2, borderRadius: Normalize(25) / 2, justifyContent: "center", alignItems: "center" }} >
                          <Image source={images.loc} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                        </View>
                        <Text style={{ fontSize: Normalize(14), fontFamily: fontfmliy.regular, textAlign: language == "en" ? "left" : "right", marginHorizontal: Normalize(5), }}>{language == "en" ? "ADDRESS" : "آدرس"}</Text>
                      </View>

                      <Text style={{ marginLeft: Normalize(27), color: '#777', marginTop: Normalize(8), fontSize: Normalize(11), fontFamily: fontfmliy.regular, textAlign: language == "en" ? "left" : "right" }}>{address}</Text>
                      <View style={{ flexDirection: rowOrRowreverse(language), marginTop: Normalize(15), alignItems: "center" }} >
                        <View style={{ height: Normalize(25), width: Normalize(25), backgroundColor: Colors.green2, borderRadius: Normalize(25) / 2, justifyContent: "center", alignItems: "center" }} >
                          <Image source={images.email_p} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                        </View>
                        <Text style={{ fontSize: Normalize(14), fontFamily: fontfmliy.regular, textAlign: language == "en" ? "left" : "right", marginHorizontal: Normalize(5), }}>{strings.BASICINFO.EMAIL}</Text>
                      </View>
                      <Text style={{ marginLeft: Normalize(27), color: '#777', marginTop: Normalize(8), fontSize: Normalize(11), fontFamily: fontfmliy.regular, textAlign: language == "en" ? "left" : "right" }}>{emailforshow}</Text>

                      <View style={{ flexDirection: rowOrRowreverse(language), marginTop: Normalize(15), alignItems: "center" }} >
                        <View style={{ height: Normalize(25), width: Normalize(25), backgroundColor: Colors.green2, borderRadius: Normalize(25) / 2, justifyContent: "center", alignItems: "center" }} >
                          <Image source={images.phone_p} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                        </View>
                        <Text style={{ fontSize: Normalize(14), fontFamily: fontfmliy.regular, textAlign: language == "en" ? "left" : "right", marginHorizontal: Normalize(5), }}>{language == "en" ? "CONTACT NUMBER" : "شماره تماس"}</Text>
                      </View>

                      <Text style={{ marginLeft: Normalize(27), color: '#777', marginTop: Normalize(8), fontSize: Normalize(11), fontFamily: fontfmliy.regular, textAlign: language == "en" ? "left" : "right" }}>
                        +{addCommaAndTranslateInPersian(phonecode, language)} {language == "en" ? numberforshow : engToPersian(numberforshow)}
                      </Text>

                      <Text style={{ fontSize: Normalize(14), marginTop: Normalize(15), fontFamily: fontfmliy.regular, textAlign: language == "en" ? "left" : "right" }}>{language == "en" ? "CONNECT WITH SOCIAL MEDIA" : "رسانه های اجتماعی"}</Text>
                      <View style={{ flexDirection: language == "en" ? "row" : "row-reverse",marginTop:Normalize(8) }}>
                        <TouchableOpacity
                          onPress={() => Linking.openURL(ll)}
                        >
                          <Image
                            resizeMode="contain"
                            style={styles.iconStyle}
                            source={images.linkdin}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => Linking.openURL(fl)}
                        >
                          <Image
                            resizeMode="contain"
                            style={styles.iconStyle}
                            source={images.fb}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => Linking.openURL(tl)}
                        >

                          <Image
                            resizeMode="contain"
                            style={styles.iconStyle}
                            source={images.twiter}
                          />
                        </TouchableOpacity>

                      </View>
                    </View>

                  </ScrollView>
                </View>
              </CurveDesing_Component>
            </KeyboardAvoidingView>
          </SafeAreaView>
      }
    </>
  );
}

export default withRtl(ContactUs);