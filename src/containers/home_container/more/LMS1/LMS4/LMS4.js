import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  SafeAreaView,
  LogBox,
  KeyboardAvoidingView,
  Platform,
  Pressable
} from 'react-native';
import Toast from "react-native-simple-toast";
import Header from '../../../../../components/Header';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import strings from './../../../../../constants/lng/LocalizedStrings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './Styles';
import { Colors } from '../../../../../constants/colors';
import Button from './../../../../../components/Button';
import axios from 'axios';
import LoaderPage from '../../../../../components/LoaderPage';
import { leftOrRight, rowOrRowreverse } from '../../../../../constants/RowOrRowreverse';
import Slider from '@react-native-community/slider';
import { GooglePlacesAutocomplete, geocodeByAddress } from 'react-native-google-places-autocomplete';
import { myContext } from '../../../../../constants/ContextApi';
import { addCommaAndTranslateInPersian } from '../../../../../constants/NumberWithCommaAndInPersian';
import CurveDesing_Component from '../../../../../constants/CurveDesing_Component';
import Listing_header_button from '../../../../../components/Listing_header_button';
import globalstyles from '../../../../../constants/globalStyles/Global_Styles';
import { Constant_apis } from '../../../../../constants/Constant_api';
import { BackHandler } from 'react-native';
const LMS4 = ({ navigation }) => {
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
  }, [])
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
  const {

    lMS_type, setLMS_type,
    lMS_location, setLMS_location,
    lMS_distance, setLMS_distance,
    lMS_prev_distance, setLMS_prev_distance,
    lMS_lat, setLMS_lat,
    lMS_lng, setLMS_lng,

  } = useContext(myContext)
  const nextButton = () => {

    if (lMS_type == "P") {
      if (lMS_lat == "" || lMS_lng == "" || lMS_location == "") {
        Toast.show(strings.LMS.SELECTLOCATION)
      } else {
        navigation.navigate('LMS5')
      }
    } else {
      navigation.navigate('LMS5')
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
              location="red_background"
              availability="gray_border"
              images="gray_border"
              bookingMessage="gray_border"
            />
          </View>
          <View
            style={globalstyles.container_only_padding} >

            <Text style={[globalstyles.blue_Text]}>{strings.LMS.CHOOSEWHEREYOUWILL}</Text>
            <View style={[styles.customtab, { flexDirection: rowOrRowreverse(language) }]}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => setLMS_type("P")} style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: lMS_type == "P" ? Colors.primary : null }} >
                <Text
                  style={{
                    fontSize: Normalize(12),
                    color: lMS_type == "P" ? Colors.white : Colors.primary,
                    fontFamily: 'Outfit-SemiBold',
                  }}>
                  {strings.LMS.INPERSON}
                </Text>
                <Text
                  style={{
                    fontSize: Normalize(8),
                    color: lMS_type == "P" ? Colors.white : Colors.primary,
                    fontFamily: 'Outfit-Regular',
                    textAlign: "center",
                    marginTop: "2%"
                  }}>
                  {strings.LMS.THISSERVICEINPERSON}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} onPress={() => setLMS_type("O")} style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: lMS_type == "O" ? Colors.primary : null }} >
                <Text
                  style={{
                    fontSize: Normalize(11),
                    color: lMS_type == "O" ? Colors.white : Colors.primary,
                    fontFamily: "Outfit-SemiBold",
                  }}>
                  {strings.LMS.ONLINE}
                </Text>
                <Text
                  style={{
                    fontSize: Normalize(8),
                    color: lMS_type == "O" ? Colors.white : Colors.primary,
                    fontFamily: 'Outfit-Regular',
                    textAlign: "center",
                    marginTop: "2%"
                  }}>
                  {strings.LMS.THISSERVICEANYWHERE}
                </Text>
              </TouchableOpacity>
            </View>
            {
              lMS_type == "P" ?
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: rowOrRowreverse(language), justifyContent: 'space-between', width: '100%' }}>
                    <Text style={{
                      fontSize: Normalize(13),
                      color: Colors.greyText,
                      marginVertical: Normalize(10),
                      fontFamily: 'Outfit-Medium',
                    }}>{strings.LMS.IWILLSERVE}</Text>
                    <Text style={{
                      fontSize: Normalize(13),
                      color: Colors.green_new_2,
                      marginVertical: Normalize(10),
                      fontFamily: 'Outfit-Medium',
                    }}>{addCommaAndTranslateInPersian(lMS_prev_distance, language)} {strings.LMS.KM}</Text>
                  </View>
                  <Slider
                    value={lMS_distance}
                    style={{ height: Normalize(10), }}
                    minimumValue={1}
                    maximumValue={50}
                    step={1}
                    minimumTrackTintColor={Colors.primary}
                    maximumTrackTintColor={Colors.lightGrey}
                    inverted={language == "en" ? false : true}
                    onValueChange={(val) => {
                      setLMS_prev_distance(Math.round(val))
                    }}
                    onSlidingComplete={val =>
                      setLMS_distance(Math.round(val))
                    }
                    thumbTintColor={Colors.primary}

                  />
                  <Text style={{
                    fontSize: Normalize(13),
                    color: Colors.greyText,
                    marginVertical: Normalize(10),
                    fontFamily: 'Outfit-Medium',
                  }}>{strings.LMS.FROMMYLOCATION}</Text>

                  <Pressable
                  onPress={()=>{navigation.navigate("LocationSelectionPage")}}
                  style={[globalstyles.textinput_onlyBox_Style, { alignItems: "center", paddingHorizontal: Normalize(5) }]} >
                    <Text numberOfLines={1} style={[globalstyles.textinput_onlyText_Style,{color:lMS_location!=""?Colors.greyText:Colors.textinput_inner_text}]}>{lMS_location!=""?lMS_location:"Select Location..."}</Text>
                  </Pressable>


                </View>
                :
                <View style={{ flex: 1 }} >
                  {/* <View style={{height:}} ></View> */}
                </View>
            }
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

export default withRtl(LMS4);
