import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Keyboard
} from 'react-native';
import Toast from "react-native-simple-toast";
import Header from '../../../../../components/Header';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import strings from './../../../../../constants/lng/LocalizedStrings';
import styles from './Styles';
import { Colors } from '../../../../../constants/colors';
import Button from './../../../../../components/Button';
import { myContext } from "../../../../../constants/ContextApi"
import images from '../../../../../constants/images';
import { leftOrRight, rowOrRowreverse } from '../../../../../constants/RowOrRowreverse';
import { engToPersian } from '../../../../../constants/EnglishToPersian';
import CurveDesing_Component from '../../../../../constants/CurveDesing_Component';
import Listing_header_button from '../../../../../components/Listing_header_button';
import globalstyles from '../../../../../constants/globalStyles/Global_Styles';
import { fontfmliy } from '../../../../../components/WhichFontFamily';
import { BackHandler } from 'react-native';
const LMS3 = ({ navigation }) => {

  const {

    lMS_package_price_1, setLMS_package_price_1,
    lMS_package_id_1, setLMS_package_id_1,
    lMS_package_name_1, setLMS_package_name_1,
    lMS_package_description_1, setLMS_package_description_1,

    lMS_package_price_2, setLMS_package_price_2,
    lMS_package_id_2, setLMS_package_id_2,
    lMS_package_name_2, setLMS_package_name_2,
    lMS_package_description_2, setLMS_package_description_2,

    lMS_package_price_3, setLMS_package_price_3,
    lMS_package_id_3, setLMS_package_id_3,
    lMS_package_name_3, setLMS_package_name_3,
    lMS_package_description_3, setLMS_package_description_3,

    lMS_package_price_4, setLMS_package_price_4,
    lMS_package_id_4, setLMS_package_id_4,
    lMS_package_name_4, setLMS_package_name_4,
    lMS_package_description_4, setLMS_package_description_4,

    lMS_package_price_5, setLMS_package_price_5,
    lMS_package_id_5, setLMS_package_id_5,
    lMS_package_name_5, setLMS_package_name_5,
    lMS_package_description_5, setLMS_package_description_5,


    open, setOpen,
    open2, setOpen2,
    open3, setOpen3,
    open4, setOpen4,
    open5, setOpen5,

  } = useContext(myContext)

  let controller;
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();

  const openornot = () => {
    setOpen(!open)
  }
  const openornot2 = () => {
    setOpen2(!open2)
  }
  const openornot3 = () => {
    setOpen3(!open3)
  }
  const openornot4 = () => {
    setOpen4(!open4)
  }
  const openornot5 = () => {
    setOpen5(!open5)
  }

  const close_option1 = () => {

    setOpen(false)
    setOpen2(false)
    setOpen3(false)
    setOpen4(false)
    setOpen5(false)



    setLMS_package_price_1("")
    setLMS_package_name_1("")
    setLMS_package_description_1("")

    setLMS_package_price_2("")
    setLMS_package_name_2("")
    setLMS_package_description_2("")

    setLMS_package_price_3("")
    setLMS_package_name_3("")
    setLMS_package_description_3("")

    setLMS_package_price_4("")
    setLMS_package_name_4("")
    setLMS_package_description_4("")

    setLMS_package_price_5("")
    setLMS_package_name_5("")
    setLMS_package_description_5("")
  }
  const close_option2 = () => {

    setOpen2(false)
    setOpen3(false)
    setOpen4(false)
    setOpen5(false)


    setLMS_package_price_2("")
    setLMS_package_name_2("")
    setLMS_package_description_2("")

    setLMS_package_price_3("")
    setLMS_package_name_3("")
    setLMS_package_description_3("")

    setLMS_package_price_4("")
    setLMS_package_name_4("")
    setLMS_package_description_4("")

    setLMS_package_price_5("")
    setLMS_package_name_5("")
    setLMS_package_description_5("")
  }
  const close_option3 = () => {

    setOpen3(false)
    setOpen4(false)
    setOpen5(false)


    setLMS_package_price_3("")
    setLMS_package_name_3("")
    setLMS_package_description_3("")

    setLMS_package_price_4("")
    setLMS_package_name_4("")
    setLMS_package_description_4("")

    setLMS_package_price_5("")
    setLMS_package_name_5("")
    setLMS_package_description_5("")
  }
  const close_option4 = () => {

    setOpen4(false)
    setOpen5(false)


    setLMS_package_price_4("")
    setLMS_package_name_4("")
    setLMS_package_description_4("")

    setLMS_package_price_5("")
    setLMS_package_name_5("")
    setLMS_package_description_5("")
  }
  const close_option5 = () => {
    setOpen5(false)
    setLMS_package_price_5("")
    setLMS_package_name_5("")
    setLMS_package_description_5("")
  }
  const package1_ckeck = () => {
    if (lMS_package_name_1.trim().length < 5) {
      Toast.show(strings.LMS.PLEASEADD5CHARNAME)
    } else {
      if (lMS_package_description_1.trim().length < 25) {
        Toast.show(strings.LMS.PLEASEADD25CHARDESCRIPTION)
      } else {
        if (lMS_package_price_1 < 5 || lMS_package_price_1 > 50000000) {
          Toast.show(strings.MAKEANOFFER.MINIMUMBUDGET_GURUTASKER)
        } else {
          return true
        }
      }
    }
  }
  const package2_ckeck = () => {
    if (lMS_package_price_2 == "" || lMS_package_name_2 == "" || lMS_package_description_2 == "") {
      Toast.show(strings.LMS.PLEASEENTERALLVALUEIN2)
    } else {
      if (lMS_package_name_2.trim().length < 5) {
        Toast.show(strings.LMS.PLEASEADD5CHARNAME)
      } else {
        if (lMS_package_description_2.trim().length < 25) {
          Toast.show(strings.LMS.PLEASEADD25CHARDESCRIPTION)
        } else {
          if (lMS_package_price_2 < 5 || lMS_package_price_2 > 50000000) {
            Toast.show(strings.MAKEANOFFER.MINIMUMBUDGET_GURUTASKER)
          } else {
            return true
          }
        }
      }
    }
  }
  const package3_ckeck = () => {

    if (lMS_package_price_3 == "" || lMS_package_name_3 == "" || lMS_package_description_3 == "") {
      Toast.show(strings.LMS.PLEASEENTERALLVALUEIN3)
    } else {

      if (lMS_package_name_3.trim().length < 5) {
        Toast.show(strings.LMS.PLEASEADD5CHARNAME)
      } else {
        if (lMS_package_description_3.trim().length < 25) {
          Toast.show(strings.LMS.PLEASEADD25CHARDESCRIPTION)
        } else {
          if (lMS_package_price_3 < 5 || lMS_package_price_3 > 50000000) {
            Toast.show(strings.MAKEANOFFER.MINIMUMBUDGET_GURUTASKER)
          } else {
            return true
          }
        }
      }
    }
  }
  const package4_ckeck = () => {
    if (lMS_package_price_4 == "" || lMS_package_name_4 == "" || lMS_package_description_4 == "") {
      Toast.show(strings.LMS.PLEASEENTERALLVALUEIN4)
    } else {
      if (lMS_package_name_4.trim().length < 5) {
        Toast.show(strings.LMS.PLEASEADD5CHARNAME)
      } else {
        if (lMS_package_description_4.trim().length < 25) {
          Toast.show(strings.LMS.PLEASEADD25CHARDESCRIPTION)
        } else {
          if (lMS_package_price_4 < 5 || lMS_package_price_4 > 50000000) {
            Toast.show(strings.MAKEANOFFER.MINIMUMBUDGET_GURUTASKER)
          } else {
            return true
          }
        }
      }
    }
  }
  const package5_ckeck = () => {
    if (lMS_package_price_5 == "" || lMS_package_name_5 == "" || lMS_package_description_5 == "") {
      Toast.show(strings.LMS.PLEASEENTERALLVALUEIN5)
    } else {
      if (lMS_package_name_5.trim().length < 5) {
        Toast.show(strings.LMS.PLEASEADD5CHARNAME)
      } else {
        if (lMS_package_description_5.trim().length < 25) {
          Toast.show(strings.LMS.PLEASEADD25CHARDESCRIPTION)

        } else {
          if (lMS_package_price_5 < 5 || lMS_package_price_5 > 50000000) {
            Toast.show(strings.MAKEANOFFER.MINIMUMBUDGET_GURUTASKER)

          } else {
            return true
          }
        }
      }
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
  const nextButton = () => {
    // navigation.navigate('LMS4')

    if (lMS_package_price_1 == "" || lMS_package_name_1 == "" || lMS_package_description_1 == "") {
      Toast.show(strings.LMS.PLEASEADDATLEAST1PACKAGE)
    } else {
      if (open == true && open2 == false && open3 == false && open4 == false && open5 == false) {
        if (package1_ckeck() == true) {
          navigation.navigate('LMS4')
        }
      } else if (open == true && open2 == true && open3 == false && open4 == false && open5 == false) {
        if (package1_ckeck() == true && package2_ckeck() == true) {
          navigation.navigate('LMS4')
        }
      } else if (open == true && open2 == true && open3 == true && open4 == false && open5 == false) {
        if (package1_ckeck() == true && package2_ckeck() == true && package3_ckeck() == true) {
          navigation.navigate('LMS4')
        }
      } else if (open == true && open2 == true && open3 == true && open4 == true && open5 == false) {
        if (package1_ckeck() == true && package2_ckeck() == true && package3_ckeck() == true && package4_ckeck() == true) {
          navigation.navigate('LMS4')
        }
      } else if (open == true && open2 == true && open3 == true && open4 == true && open5 == true) {
        if (package1_ckeck() == true && package2_ckeck() == true && package3_ckeck() == true && package4_ckeck() == true && package5_ckeck() == true) {
          navigation.navigate('LMS4')
        }
      } else if (open == false && open2 == false && open3 == false && open4 == false && open5 == false) {
        Toast.show(strings.LMS.PLEASEADDATLEAST1PACKAGE)
      }
    }
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);
  const handleBackButtonClick = () => {
    navigation.goBack(null);
    return true;
  }

  return (
    <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>

      <KeyboardAvoidingView
        behavior={(Platform.OS === 'ios') ? "padding" : null} style={styles.container}>
        <Header back name={strings.LMS.HEADER} navigation={navigation} backFunc={handleBackButtonClick} />


        <CurveDesing_Component  >
          <View>
            <Listing_header_button
              category="green_border"
              description="green_border"
              pricingPackaging="red_background"
              location="gray_border"
              availability="gray_border"
              images="gray_border"
              bookingMessage="gray_border"
            />
          </View>
          <View
            style={globalstyles.container_only_padding} >
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="always"
            >

              <Text style={[globalstyles.blue_Text, { textAlign: leftOrRight(language) }]}>{strings.LMS.PRICEANDPACKAGEYOURLISTING}</Text>
              <Text style={[globalstyles.page_SubHeader_Text, { fontSize: Normalize(11.5) }]}>{strings.LMS.PRICEYOURLISTINGWITH}</Text>
              {/* Option 1 */}
              <View activeOpacity={0.8} style={styles.packageBox}>

                <View style={{ flexDirection: rowOrRowreverse(language) }}>
                  <Text style={[styles.h5, styles.packageBoxname, { width: "78%", textAlign: leftOrRight(language), color: Colors.primary }]}>{strings.LMS.PACKAGE1}</Text>
                  {open ?
                    <TouchableOpacity
                      onPress={close_option1}
                      style={{ justifyContent: "center" }}>
                      <Image source={images.cross}
                        style={{
                          height: Normalize(9), width: Normalize(9), resizeMode: "contain",
                          alignSelf: 'center',
                          marginLeft: Normalize(4)
                        }} />
                    </TouchableOpacity>
                    :
                    <Text
                      onPress={openornot}
                      style={styles.addButton}>{strings.LMS.ADD}</Text>
                  }
                </View>
                {open ?
                  <View>
                    <View style={styles.hr} />
                    <Text style={[styles.h5, { textAlign: leftOrRight(language) }]}>{strings.LMS.PACKAGENAME}</Text>
                    <TextInput
                      style={[globalstyles.textinputStyle, { width: "95%", borderColor: Colors.borderColor }]}
                      value={lMS_package_name_1}
                      placeholder={strings.LMS.LMS2_TEXT_8}
                      placeholderTextColor={Colors.textinput_inner_text}
                      color={Colors.greyText}
                      onChangeText={(e) => setLMS_package_name_1(e)}
                    />

                    <Text style={[styles.h5, { textAlign: leftOrRight(language) }]}>{strings.LMS.DESCRIBETHISPACKAGE}</Text>
                    <Text style={styles.textInput_SubHeader}>{strings.LMS.LISTEVERYTHING}</Text>
                    <TextInput
                      style={[globalstyles.multiline_textinputStyle, { width: "95%", borderColor: Colors.borderColor }]}
                      placeholder={strings.LMS.ENTERHERE}
                      placeholderTextColor={Colors.textinput_inner_text}
                      multiline
                      value={lMS_package_description_1}
                      color={Colors.greyText}
                      onChangeText={(e) => setLMS_package_description_1(e)}
                      onSubmitEditing={() => { Keyboard.dismiss() }}
                    />
                    <Text style={[styles.h5, { textAlign: leftOrRight(language) }]}>{strings.LMS.TOTALPRICE}</Text>
                    <View style={[globalstyles.textinput_onlyBox_Style, { width: "95%", borderColor: Colors.borderColor }]} >
                      <View style={{ width: "17%", height: "100%", borderRightColor: Colors.borderColor, borderRightWidth: 1, justifyContent: "center", alignItems: "center" }} >
                        <Text style={[globalstyles.currency_font_bold, { opacity: 0.6 }]}>{strings.BROWSEFILTER.TOMAN}</Text>
                      </View>
                      <View style={{ flex: 1 }} >
                        <TextInput
                          keyboardType="number-pad"
                          style={globalstyles.textinput_onlyText_Style}
                          value={language == "en" ? lMS_package_price_1 : engToPersian(lMS_package_price_1)}
                          placeholder={strings.LMS.ENTERHERE}
                          maxLength={8}
                          placeholderTextColor={Colors.textinput_inner_text}
                          color={Colors.greyText}
                          onChangeText={(e) => setLMS_package_price_1(e)}
                        />
                      </View>
                    </View>



                    <Text style={{
                      color: Colors.grey, fontSize: Normalize(11), width: "95%", alignSelf: "center", marginBottom: 15, textAlign: leftOrRight(language), fontFamily: fontfmliy.regular,
                    }}>{strings.LMS.BELOWTOTALPRICE_TEXT}<Text style={{ color: Colors.primary, fontSize: Normalize(11), fontFamily: fontfmliy.bold, }} onPress={() => navigation.navigate("Help")} > {strings.MAKEANOFFER.LEARNMORE}</Text></Text>

                  </View>
                  : null}
              </View>
              {/* Option 2 */}
              <View activeOpacity={0.8} style={styles.packageBox}>
                <View style={{ flexDirection: rowOrRowreverse(language) }}>

                  <View style={{ flexDirection: rowOrRowreverse(language), width: language == "en" ? "78%" : open2 ? "80%" : '70%', marginVertical: Normalize(10), marginHorizontal: Normalize(12), }} >
                    <Text style={styles.packageBoxname}>{strings.LMS.PACKAGE22}</Text>
                    <Text style={[styles.packageBoxname, { color: Colors.lightGrey }]} >  {strings.LMS.OPTIONAL} </Text>
                  </View>

                  {open ?
                    open2 ?
                      <TouchableOpacity
                        onPress={close_option2}
                        style={{ justifyContent: "center" }}>
                        <Image source={images.cross}
                          style={{
                            height: 15, width: 15, resizeMode: "contain",
                            alignSelf: 'center', marginLeft: 5
                          }} />
                      </TouchableOpacity>
                      :
                      <Text
                        onPress={openornot2}
                        style={styles.addButton}>{strings.LMS.ADD}</Text>
                    :
                    open == false && open2 &&
                    <TouchableOpacity
                      onPress={close_option2}
                      style={{ justifyContent: "center" }}
                    >
                      <Image source={images.cross}
                        style={{
                          height: 15, width: 15, resizeMode: "contain",
                          alignSelf: 'center', marginLeft: 5
                        }} />
                    </TouchableOpacity>
                  }

                </View>
                {open2 ?
                  <View>
                    <View style={styles.hr} />
                    <Text style={[styles.h5, { textAlign: leftOrRight(language) }]}>{strings.LMS.PACKAGENAME}</Text>
                    <TextInput
                      style={[globalstyles.textinputStyle, { width: "95%", borderColor: Colors.borderColor }]}
                      value={lMS_package_name_2}
                      placeholder={strings.LMS.LMS2_TEXT_8}
                      placeholderTextColor={Colors.textinput_inner_text}
                      color={Colors.greyText}
                      onChangeText={(e) => setLMS_package_name_2(e)}
                    />

                    <Text style={[styles.h5, { textAlign: leftOrRight(language), marginVertical: Normalize(5) }]}>{strings.LMS.DESCRIBETHISPACKAGE}</Text>
                    <Text style={styles.textInput_SubHeader}>{strings.LMS.LISTEVERYTHING}</Text>
                    <TextInput
                      style={[globalstyles.multiline_textinputStyle, { width: "95%", borderColor: Colors.borderColor }]}
                      placeholder={strings.LMS.ENTERHERE}
                      placeholderTextColor={Colors.textinput_inner_text}
                      multiline
                      value={lMS_package_description_2}
                      color={Colors.greyText}
                      onChangeText={(e) => setLMS_package_description_2(e)}
                      onSubmitEditing={() => { Keyboard.dismiss() }}
                    />
                    <Text style={[styles.h5, { textAlign: leftOrRight(language) }]}>{strings.LMS.TOTALPRICE}</Text>
                    <View style={[globalstyles.textinput_onlyBox_Style, { width: "95%", borderColor: Colors.borderColor }]} >
                      <View style={{ width: "17%", height: "100%", borderRightColor: Colors.borderColor, borderRightWidth: 1, justifyContent: "center", alignItems: "center" }} >
                        <Text style={[globalstyles.currency_font_bold, { opacity: 0.6 }]}>{strings.BROWSEFILTER.TOMAN}</Text>
                      </View>
                      <View style={{ flex: 1 }} >
                        <TextInput
                          keyboardType="number-pad"
                          style={globalstyles.textinput_onlyText_Style}
                          value={language == "en" ? lMS_package_price_2 : engToPersian(lMS_package_price_2)}
                          placeholder={strings.LMS.ENTERHERE}
                          placeholderTextColor={Colors.textinput_inner_text}
                          color={Colors.greyText}
                          maxLength={8}
                          onChangeText={(e) => setLMS_package_price_2(e)}

                        />
                      </View>
                    </View>



                    <Text style={{
                      color: Colors.grey, fontSize: Normalize(11), width: "95%", alignSelf: "center", marginBottom: 15, textAlign: leftOrRight(language), fontFamily: fontfmliy.regular,
                    }}>{strings.LMS.BELOWTOTALPRICE_TEXT}<Text style={{ color: Colors.primary, fontSize: Normalize(11), fontFamily: fontfmliy.bold, }} onPress={() => navigation.navigate("Help")} > {strings.MAKEANOFFER.LEARNMORE}</Text></Text>

                  </View>
                  : null}
              </View>
              {/* Option 3 */}
              <View activeOpacity={0.8} style={styles.packageBox}>

                <View style={{ flexDirection: rowOrRowreverse(language) }}>
                  <View style={{ flexDirection: rowOrRowreverse(language), width: language == "en" ? "78%" : open3 ? "80%" : '70%', marginVertical: Normalize(10), marginHorizontal: Normalize(12), }} >
                    <Text style={styles.packageBoxname}>{strings.LMS.PACKAGE3}</Text>
                    <Text style={[styles.packageBoxname, { color: Colors.lightGrey }]} >  {strings.LMS.OPTIONAL} </Text>
                  </View>
                  {open2 ?
                    open3 ?
                      <TouchableOpacity style={{ justifyContent: "center" }}
                        onPress={close_option3} >
                        <Image source={images.cross}
                          style={{
                            height: 15, width: 15, resizeMode: "contain",
                            alignSelf: 'center', marginLeft: 5
                          }} />
                      </TouchableOpacity>
                      :
                      <Text
                        onPress={openornot3}
                        style={styles.addButton}>{strings.LMS.ADD}</Text>
                    :
                    open2 == false && open3 &&
                    <TouchableOpacity
                      onPress={close_option3}
                      style={{ justifyContent: "center" }}
                    >
                      <Image source={images.cross}
                        style={{
                          height: 15, width: 15, resizeMode: "contain",
                          alignSelf: 'center', marginLeft: 5
                        }} />
                    </TouchableOpacity>
                  }
                </View>
                {open3 ?
                  <View>
                    <View style={styles.hr} />
                    <Text style={[styles.h5, { textAlign: leftOrRight(language) }]}>{strings.LMS.PACKAGENAME}</Text>
                    <TextInput
                      style={[globalstyles.textinputStyle, { width: "95%", borderColor: Colors.borderColor }]}
                      value={lMS_package_name_3}
                      placeholder={strings.LMS.LMS2_TEXT_8}
                      placeholderTextColor={Colors.textinput_inner_text}
                      color={Colors.greyText}
                      onChangeText={(e) => setLMS_package_name_3(e)}
                    />

                    <Text style={[styles.h5, { textAlign: leftOrRight(language) }]}>{strings.LMS.DESCRIBETHISPACKAGE}</Text>
                    <Text style={styles.textInput_SubHeader}>{strings.LMS.LISTEVERYTHING}</Text>
                    <TextInput
                      style={[globalstyles.multiline_textinputStyle, { width: "95%", borderColor: Colors.borderColor }]}
                      placeholder={strings.LMS.ENTERHERE}
                      placeholderTextColor={Colors.textinput_inner_text}
                      multiline
                      value={lMS_package_description_3}
                      color={Colors.greyText}
                      onChangeText={(e) => setLMS_package_description_3(e)}
                      onSubmitEditing={() => { Keyboard.dismiss() }}
                    />
                    <Text style={[styles.h5, { textAlign: leftOrRight(language) }]}>{strings.LMS.TOTALPRICE}</Text>
                    <View style={[globalstyles.textinput_onlyBox_Style, { width: "95%", borderColor: Colors.borderColor }]} >
                      <View style={{ width: "17%", height: "100%", borderRightColor: Colors.borderColor, borderRightWidth: 1, justifyContent: "center", alignItems: "center" }} >
                        <Text style={[globalstyles.currency_font_bold, { opacity: 0.6 }]}>{strings.BROWSEFILTER.TOMAN}</Text>
                      </View>
                      <View style={{ flex: 1 }} >
                        <TextInput
                          keyboardType="number-pad"
                          style={globalstyles.textinput_onlyText_Style}
                          value={language == "en" ? lMS_package_price_3 : engToPersian(lMS_package_price_3)}
                          placeholder={strings.LMS.ENTERHERE}
                          placeholderTextColor={Colors.textinput_inner_text}
                          color={Colors.greyText}
                          maxLength={8}
                          onChangeText={(e) => setLMS_package_price_3(e)}
                        />
                      </View>
                    </View>



                    <Text style={{
                      color: Colors.grey, fontSize: Normalize(11), width: "95%", alignSelf: "center", marginBottom: 15, textAlign: leftOrRight(language), fontFamily: fontfmliy.regular,
                    }}>{strings.LMS.BELOWTOTALPRICE_TEXT}<Text style={{ color: Colors.primary, fontSize: Normalize(11), fontFamily: fontfmliy.bold, }} onPress={() => navigation.navigate("Help")} > {strings.MAKEANOFFER.LEARNMORE}</Text></Text>

                  </View> : null}
              </View>
              {/* Option 4 */}
              <View activeOpacity={0.8} style={styles.packageBox}>

                <View style={{ flexDirection: rowOrRowreverse(language) }}>
                  <View style={{ flexDirection: rowOrRowreverse(language), width: language == "en" ? "78%" : open4 ? "80%" : '70%', marginVertical: Normalize(10), marginHorizontal: Normalize(12), }} >
                    <Text style={styles.packageBoxname}>{strings.LMS.PACKAGE4}</Text>
                    <Text style={[styles.packageBoxname, { color: Colors.lightGrey }]} >  {strings.LMS.OPTIONAL} </Text>
                  </View>
                  {open3 ?
                    open4 ?
                      <TouchableOpacity
                        onPress={close_option4}
                        style={{ justifyContent: "center" }} >
                        <Image source={images.cross}
                          style={{
                            height: 15, width: 15, resizeMode: "contain",
                            alignSelf: 'center', marginLeft: 5
                          }} />
                      </TouchableOpacity>

                      :
                      <Text
                        onPress={openornot4}
                        style={styles.addButton}>{strings.LMS.ADD}</Text>
                    :
                    open3 == false && open4 &&
                    <TouchableOpacity
                      onPress={close_option4}
                      style={{ justifyContent: "center" }}
                    >
                      <Image source={images.cross}
                        style={{
                          height: 15, width: 15, resizeMode: "contain",
                          alignSelf: 'center', marginLeft: 5
                        }} />
                    </TouchableOpacity>
                  }
                </View>
                {open4 ? <View>
                  <View style={styles.hr} />
                  <Text style={[styles.h5, { textAlign: leftOrRight(language) }]}>{strings.LMS.PACKAGENAME}</Text>
                  <TextInput
                    style={[globalstyles.textinputStyle, { width: "95%", borderColor: Colors.borderColor }]}
                    value={lMS_package_name_4}
                    placeholder={strings.LMS.LMS2_TEXT_8}
                    placeholderTextColor={Colors.textinput_inner_text}
                    color={Colors.greyText}
                    onChangeText={(e) => setLMS_package_name_4(e)}
                  />

                  <Text style={[styles.h5, { textAlign: leftOrRight(language) }]}>{strings.LMS.DESCRIBETHISPACKAGE}</Text>
                  <Text style={styles.textInput_SubHeader}>{strings.LMS.LISTEVERYTHING}</Text>
                  <TextInput
                    style={[globalstyles.multiline_textinputStyle, { width: "95%", borderColor: Colors.borderColor }]}
                    placeholder={strings.LMS.ENTERHERE}
                    placeholderTextColor={Colors.textinput_inner_text}
                    multiline
                    value={lMS_package_description_4}
                    color={Colors.greyText}
                    onChangeText={(e) => setLMS_package_description_4(e)}
                    onSubmitEditing={() => { Keyboard.dismiss() }}
                  />
                  <Text style={[styles.h5, { textAlign: leftOrRight(language) }]}>{strings.LMS.TOTALPRICE}</Text>
                  <View style={[globalstyles.textinput_onlyBox_Style, { width: "95%", borderColor: Colors.borderColor }]} >
                    <View style={{ width: "17%", height: "100%", borderRightColor: Colors.borderColor, borderRightWidth: 1, justifyContent: "center", alignItems: "center" }} >
                      <Text style={[globalstyles.currency_font_bold, { opacity: 0.6 }]}>{strings.BROWSEFILTER.TOMAN}</Text>
                    </View>
                    <View style={{ flex: 1 }} >
                      <TextInput
                        keyboardType="number-pad"
                        style={globalstyles.textinput_onlyText_Style}
                        value={language == "en" ? lMS_package_price_4 : engToPersian(lMS_package_price_4)}
                        placeholder={strings.LMS.ENTERHERE}
                        placeholderTextColor={Colors.textinput_inner_text}
                        color={Colors.greyText}
                        maxLength={8}
                        onChangeText={(e) => setLMS_package_price_4(e)}
                      />
                    </View>
                  </View>



                  <Text style={{
                    color: Colors.grey, fontSize: Normalize(11), width: "95%", alignSelf: "center", marginBottom: 15, textAlign: leftOrRight(language), fontFamily: fontfmliy.regular,
                  }}>{strings.LMS.BELOWTOTALPRICE_TEXT}<Text style={{ color: Colors.primary, fontSize: Normalize(11), fontFamily: fontfmliy.bold, }} onPress={() => navigation.navigate("Help")} > {strings.MAKEANOFFER.LEARNMORE}</Text></Text>

                </View> : null}
              </View>
              {/* Option 5 */}
              <View activeOpacity={0.8} style={styles.packageBox}>

                <View style={{ flexDirection: rowOrRowreverse(language) }}>
                  <View style={{ flexDirection: rowOrRowreverse(language), width: language == "en" ? "78%" : open5 ? "80%" : '70%', marginVertical: Normalize(10), marginHorizontal: Normalize(12), }} >
                    <Text style={styles.packageBoxname}>{strings.LMS.PACKAGE5}</Text>
                    <Text style={[styles.packageBoxname, { color: Colors.lightGrey }]} >  {strings.LMS.OPTIONAL} </Text>
                  </View>
                  {open4 ?
                    open5 ?
                      <TouchableOpacity
                        onPress={close_option5}
                        style={{ justifyContent: "center" }}
                      >
                        <Image source={images.cross}
                          style={{
                            height: 15, width: 15, resizeMode: "contain",
                            alignSelf: 'center', marginLeft: 5
                          }} />
                      </TouchableOpacity>
                      :
                      <Text
                        onPress={openornot5}
                        style={styles.addButton}>{strings.LMS.ADD}</Text>
                    :
                    open4 == false && open5 &&
                    <TouchableOpacity
                      onPress={close_option5}
                      style={{ justifyContent: "center" }}
                    >
                      <Image source={images.cross}
                        style={{
                          height: 15, width: 15, resizeMode: "contain",
                          alignSelf: 'center', marginLeft: 5
                        }} />
                    </TouchableOpacity>
                  }
                </View>
                {open5 ? <View>
                  <View style={styles.hr} />
                  <Text style={[styles.h5, { textAlign: leftOrRight(language) }]}>{strings.LMS.PACKAGENAME}</Text>
                  <TextInput
                    style={[globalstyles.textinputStyle, { width: "95%", borderColor: Colors.borderColor }]}
                    value={lMS_package_name_5}
                    placeholder={strings.LMS.LMS2_TEXT_8}
                    placeholderTextColor={Colors.textinput_inner_text}
                    color={Colors.greyText}
                    onChangeText={(e) => setLMS_package_name_5(e)}
                  />

                  <Text style={[styles.h5, { textAlign: leftOrRight(language) }]}>{strings.LMS.DESCRIBETHISPACKAGE}</Text>
                  <Text style={styles.textInput_SubHeader}>{strings.LMS.LISTEVERYTHING}</Text>
                  <TextInput
                    style={[globalstyles.multiline_textinputStyle, { width: "95%", borderColor: Colors.borderColor }]}
                    placeholder={strings.LMS.ENTERHERE}
                    placeholderTextColor={Colors.textinput_inner_text}
                    multiline
                    value={lMS_package_description_5}
                    color={Colors.greyText}
                    onChangeText={(e) => setLMS_package_description_5(e)}
                    onSubmitEditing={() => { Keyboard.dismiss() }}
                  />
                  <Text style={[styles.h5, { textAlign: leftOrRight(language) }]}>{strings.LMS.TOTALPRICE}</Text>
                  <View style={[globalstyles.textinput_onlyBox_Style, { width: "95%", borderColor: Colors.borderColor }]} >
                    <View style={{ width: "17%", height: "100%", borderRightColor: Colors.borderColor, borderRightWidth: 1, justifyContent: "center", alignItems: "center" }} >
                      <Text style={[globalstyles.currency_font_bold, { opacity: 0.6 }]}>{strings.BROWSEFILTER.TOMAN}</Text>
                    </View>
                    <View style={{ flex: 1 }} >
                      <TextInput
                        keyboardType="number-pad"
                        style={globalstyles.textinput_onlyText_Style}
                        value={language == "en" ? lMS_package_price_5 : engToPersian(lMS_package_price_5)}
                        placeholder={strings.LMS.ENTERHERE}
                        placeholderTextColor={Colors.textinput_inner_text}
                        color={Colors.greyText}
                        maxLength={8}
                        onChangeText={(e) => setLMS_package_price_5(e)}
                      />
                    </View>
                  </View>
                  <Text style={{
                    color: Colors.grey, fontSize: Normalize(11), width: "95%", alignSelf: "center", marginBottom: 15, textAlign: leftOrRight(language), fontFamily: fontfmliy.regular,
                  }}>{strings.LMS.BELOWTOTALPRICE_TEXT}<Text style={{ color: Colors.primary, fontSize: Normalize(11), fontFamily: fontfmliy.bold, }} onPress={() => navigation.navigate("Help")} > {strings.MAKEANOFFER.LEARNMORE}</Text></Text>

                </View> : null}
              </View>
              {/* Note */}
              <View style={{ marginVertical: 15, backgroundColor: "#f6f8fd", padding: "2%", borderWidth: Normalize(1), borderColor: "#ebedf2", borderRadius: 5 }} >
                <View style={{ flexDirection: rowOrRowreverse(language), alignItems: "center" }} >
                  <Image source={images.info} style={{ height: 12.5, width: 12.5, resizeMode: "contain" }} />
                  <Text style={[globalstyles.pleaseNote_font]}>{strings.LMS.LMS2_TEXT_13}</Text>
                </View>
                <Text style={[globalstyles.pleaseNote_font_subheader]}>{strings.LMS.CUSTOMERWILLSELECT}</Text>
              </View>
            </ScrollView >
            <Button
              onPress={nextButton}
              name={strings.POSTTASK.NEXT}
              style={styles.btnStyle}
              nextarrow
            />
          </View>
        </CurveDesing_Component>
      </KeyboardAvoidingView >
    </SafeAreaView>
  );
};

export default withRtl(LMS3);
