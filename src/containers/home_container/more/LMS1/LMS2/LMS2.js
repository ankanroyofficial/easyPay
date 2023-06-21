import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  KeyboardAvoidingView,
  Keyboard,
  Platform
} from 'react-native';
import Toast from "react-native-simple-toast";
import Header from '../../../../../components/Header';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import strings from './../../../../../constants/lng/LocalizedStrings';
import styles from './Styles';
import { Colors } from '../../../../../constants/colors';
import Button from './../../../../../components/Button';
import { myContext } from "../../../../../constants/ContextApi"
import { leftOrRight, rowOrRowreverse } from '../../../../../constants/RowOrRowreverse';
import images from '../../../../../constants/images';
import Entypo from 'react-native-vector-icons/Entypo';
import CurveDesing_Component from '../../../../../constants/CurveDesing_Component';
import Listing_header_button from '../../../../../components/Listing_header_button';
import globalstyles from '../../../../../constants/globalStyles/Global_Styles';
import { fontfmliy } from '../../../../../components/WhichFontFamily';
import { BackHandler } from 'react-native';
const LMS2 = ({ navigation }) => {
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
  const {
    lMS_title, setLMS_title,
    lMS_search_tag, setLMS_search_tag,
    lMS_description, setLMS_description,
  } = useContext(myContext)
  const scrollViewRef2 = useRef();

  const handleDeleteSkills2 = async (id) => {
    try {
      const idx = id.toString();
      let array = lMS_search_tag;
      let newArr = array.filter(item => item.id != idx);
      Toast.show(strings.LMS.TAGDELETED)
      setLMS_search_tag(newArr);
    } catch (error) {
      console.log(error)
    }
  };
  const nextButton = () => {
    if (lMS_title.length != 0) {
      if (lMS_title.trim().length < 10 || lMS_title.trim().length > 70) {
        Toast.show(language === "en" ? "Enter title with in at least 10 characters and up to 70 characters" : "عنوان را با حداقل ۱۰ کاراکتر و حداکثر ۷۰ کاراکتر وارد کنید")
      } else {
        if (lMS_search_tag.length > 0) {
          if (lMS_search_tag.length > 15) {
            Toast.show(strings.LMS.SEARCHTAGCANNOTBE15)
          } else {
            if (lMS_description.trim().length > 50) {
              navigation.navigate('LMS3')
            } else {
              Toast.show(strings.LMS.ATLEAST50CHAR)
            }
          }
        } else {
          Toast.show(strings.LMS.ATLEAST1TAG)
        }
      }
    } else {
      Toast.show(strings.LMS.PLEASEENTERTITLE)
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
        behavior={(Platform.OS === 'ios') ? "padding" : null}
        style={styles.container}>
        <Header back name={strings.LMS.HEADER} navigation={navigation} backFunc={handleBackButtonClick} />


        <CurveDesing_Component  >
          <View>
            <Listing_header_button
              category="green_border"
              description="red_background"
              pricingPackaging="gray_border"
              location="gray_border"
              availability="gray_border"
              images="gray_border"
              bookingMessage="gray_border"
            />
          </View>
          <View
            style={globalstyles.container_only_padding} >
            <ScrollView
              keyboardShouldPersistTaps="always"
              showsVerticalScrollIndicator={false}
            >
              <Text style={[globalstyles.blue_Text, { textAlign: leftOrRight(language) }]}>{strings.LMS.LMS2_TEXT_1}</Text>
              <Text style={[globalstyles.page_SubHeader_Text, { fontSize: Normalize(11.5) }]}>{strings.LMS.LMS2_TEXT_2}</Text>

              <Text style={[globalstyles.textinput_Header_Style, { textAlign: leftOrRight(language) }]}>{strings.LMS.LMS2_TEXT_3}</Text>
              <Text style={[globalstyles.plantext_roboto_regular, { fontSize: Normalize(10.5), paddingBottom: Normalize(5) }]}>{strings.LMS.LMS2_TEXT_4}</Text>
              <TextInput
                style={globalstyles.textinputStyle}
                value={lMS_title}
                placeholder={strings.LMS.LMS2_TEXT_5}
                placeholderTextColor={Colors.textinput_inner_text}
                color={Colors.greyText}
                onChangeText={(e) => setLMS_title(e)}
              />
              <Text style={[globalstyles.textinput_Header_Style, { textAlign: leftOrRight(language) }]}>{strings.LMS.LMS2_TEXT_6}</Text>
              <Text style={[globalstyles.plantext_roboto_regular, { fontSize: Normalize(10.5), paddingBottom: Normalize(5) }]}>{strings.LMS.LMS2_TEXT_7}</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Search_Tag_modalPage", { prevData: lMS_search_tag })}
                disabled={lMS_search_tag.length > 0 ? true : false}
                style={[globalstyles.textinput_onlyBox_Style,]} >

                {lMS_search_tag.length == 0 && < Text style={globalstyles.textinput_onlyText_Style} >{strings.MAKEANOFFER.ENTERHERE}</Text>}

                {
                  lMS_search_tag.length > 0 &&
                  <>
                    <View style={{ flex: 1, alignItems: language == "en" ? "flex-start" : "flex-end" }} >
                      <ScrollView
                        ref={scrollViewRef2}
                        onContentSizeChange={() => {
                          if (language == "en") {
                            null
                          } else {
                            scrollViewRef2.current.scrollToEnd({ animated: false })
                          }
                        }}
                        horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ justifyContent: "center", alignItems: "center" }} >
                        {
                          lMS_search_tag.map((item, index) => (
                            <TouchableOpacity key={index}
                              activeOpacity={0.8}
                              onPress={() => handleDeleteSkills2(item.id)}
                              style={{ padding: Normalize(5), marginHorizontal: Normalize(3), backgroundColor: "white", borderWidth: Normalize(1), borderColor: Colors.lightGrey, borderRadius: 5, flexDirection: rowOrRowreverse(language), alignItems: 'center' }} >
                              <Text style={{ paddingHorizontal: 3, color: Colors.grey, fontSize: Normalize(11), }}  >{item.name}</Text>
                              <View style={{ height: Normalize(8), width: Normalize(8), marginHorizontal: 2, justifyContent: 'center', alignItems: "center" }} >
                                <Image source={images.cross} style={{ height: "80%", width: "80%", resizeMode: "contain" }} />
                              </View>
                            </TouchableOpacity>
                          ))
                        }
                      </ScrollView>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("Search_Tag_modalPage", { prevData: lMS_search_tag })
                      }}
                      style={{ justifyContent: "center", marginHorizontal: Normalize(5) }} >
                      <Text style={{ color: Colors.primary, fontSize: Normalize(11), fontFamily: fontfmliy.bold, }}  >{strings.LMS.LMS2_TEXT_9}</Text>
                    </TouchableOpacity>
                  </>
                }
              </TouchableOpacity>
              <Text style={[globalstyles.textinput_Header_Style, { textAlign: leftOrRight(language) }]}>{strings.LMS.LMS2_TEXT_10}</Text>
              <Text style={[globalstyles.plantext_roboto_regular, { fontSize: Normalize(10.5), paddingBottom: Normalize(5) }]}>{strings.LMS.LMS2_TEXT_11}</Text>
              <TextInput
                style={globalstyles.multiline_textinputStyle}
                placeholder={strings.LMS.LMS2_TEXT_12}
                placeholderTextColor={Colors.textinput_inner_text}
                multiline
                value={lMS_description}
                color={Colors.greyText}
                onChangeText={(e) => setLMS_description(e)}
                onSubmitEditing={() => { Keyboard.dismiss() }}
              />
              {/* Note */}
              <View style={{ marginVertical: 15, backgroundColor: "#f6f8fd", padding: "2%", borderWidth: Normalize(1), borderColor: "#ebedf2", borderRadius: 5 }} >
                <View style={{ flexDirection: rowOrRowreverse(language), alignItems: "center" }} >
                  <Image source={images.info} style={{ height: 12.5, width: 12.5, resizeMode: "contain" }} />
                  <Text style={[globalstyles.pleaseNote_font]}>{strings.LMS.LMS2_TEXT_13}</Text>
                </View>
                <Text style={[globalstyles.pleaseNote_font_subheader]}>{strings.LMS.LMS2_TEXT_14}</Text>
              </View>

              <Button
                onPress={nextButton}
                name={strings.POSTTASK.NEXT}
                style={styles.btnStyle}
                nextarrow
              />
            </ScrollView >
          </View>
        </CurveDesing_Component>




      </KeyboardAvoidingView >
    </SafeAreaView>
  );
};

export default withRtl(LMS2);
