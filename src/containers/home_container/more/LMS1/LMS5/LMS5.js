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
import { useIsFocused } from "@react-navigation/native";
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import strings from '../../../../../constants/lng/LocalizedStrings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './Styles';
import { Colors } from '../../../../../constants/colors';
import Button from '../../../../../components/Button';
import axios from 'axios';
import { myContext } from "../../../../../constants/ContextApi"
import LoaderPage from '../../../../../components/LoaderPage';
import { leftOrRight, rowOrRowreverse } from '../../../../../constants/RowOrRowreverse';
import images from '../../../../../constants/images';
import CurveDesing_Component from '../../../../../constants/CurveDesing_Component';
import Listing_header_button from '../../../../../components/Listing_header_button';
import globalstyles from '../../../../../constants/globalStyles/Global_Styles';
import { BackHandler } from 'react-native';
const LMS5 = ({ navigation }) => {
  let controller;
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
  const {
    lMS_avalibility, setLMS_avalibility,
  } = useContext(myContext)
  const scrollViewRef = useRef();



  const subHeader = () => {
    return (
      <View style={styles.subContainer}>
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() => {
            if (language == "en") {
              null
            } else {
              scrollViewRef.current.scrollToEnd({ animated: false })
            }
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: rowOrRowreverse(language) }} >
            <View style={[styles.textContainer, { marginRight: language == "en" ? 0 : Normalize(12), marginLeft: language == "pr" ? 0 : Normalize(12) }]}>
              <View style={{ flexDirection: rowOrRowreverse(language), alignItems: "center" }} >
                <Text style={styles.h2}>{strings.LMS.CATEGORY}</Text>
                <Text style={styles.h2}>{strings.LMS.DESCRIPTION}</Text>
                <Text style={styles.h2}>{strings.LMS.PRICINGANDPACKAGING}</Text>
                <Text style={styles.h2}>{strings.LMS.LOCATION}</Text>
                <Text style={styles.h2}>{strings.LMS.AVAILABILITY}</Text>
              </View>
            </View>
            <Text style={styles.h1}>{strings.LMS.IMAGES}</Text>
            <Text style={styles.h1}>{strings.LMS.BOOKINGMESSAGE}</Text>
          </View>

        </ScrollView>
      </View>
    );
  };




  const nextButton = () => {
    if (lMS_avalibility.trim().length != 0) {
      if (lMS_avalibility.trim().length < 20) {
        Toast.show(strings.LMS.ENTER20CHAR)
      } else {
        navigation.navigate('LMS6')
      }
    } else {
      Toast.show(language === "en" ? "Please enter avalibility" : "لطفا در دسترس بودن را وارد کنید")
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
        {/* <ScrollView horizontal={true} style={{height:0}}>  */}
        <CurveDesing_Component  >
          <View>
            <Listing_header_button
              category="green_border"
              description="green_border"
              pricingPackaging="green_border"
              location="green_border"
              availability="red_background"
              images="gray_border"
              bookingMessage="gray_border"
            />
          </View>
          <View
            style={globalstyles.container_only_padding} >
            {/* </ScrollView> */}
            <ScrollView
              showsVerticalScrollIndicator={false}
            >
              <Text style={[globalstyles.blue_Text, { textAlign: leftOrRight(language) }]}>{strings.LMS.SETAVAILABILITY}</Text>
              <Text style={[globalstyles.page_SubHeader_Text, { fontSize: Normalize(11.5) }]}>{strings.LMS.LETCUSTOMERSKNOW}</Text>

              <Text style={[globalstyles.textinput_Header_Style, { textAlign: leftOrRight(language) }]}>{strings.LMS.MYAVAILABILITY}</Text>
              <TextInput
                style={[globalstyles.multiline_textinputStyle, { textAlign: leftOrRight(language) }]}
                placeholder={strings.LMS.IAMAVAILABLEON}
                placeholderTextColor={Colors.textinput_inner_text}
                multiline
                value={lMS_avalibility}
                color={Colors.greyText}
                onChangeText={(e) => setLMS_avalibility(e)}
                onSubmitEditing={() => { Keyboard.dismiss() }}
              />
              {/* Note */}
              <View style={{ marginVertical: 15, backgroundColor: "#f6f8fd", padding: "2%", borderWidth: Normalize(1), borderColor: "#ebedf2", borderRadius: 5 }} >
                <View style={{ flexDirection: rowOrRowreverse(language), alignItems: "center" }} >
                  <Image source={images.info} style={{ height: 12.5, width: 12.5, resizeMode: "contain" }} />
                  <Text style={[globalstyles.pleaseNote_font]}>{strings.LMS.LMS2_TEXT_13}</Text>
                </View>
                <Text style={[globalstyles.pleaseNote_font_subheader]}>{strings.LMS.CUSTOMERWILLREQUESTTOBOOK}</Text>
                <Text style={[globalstyles.pleaseNote_font_subheader]}>{strings.LMS.YOUCANASK}</Text>

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

export default withRtl(LMS5);
