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
  KeyboardAvoidingView,
  Platform,
  Keyboard
} from 'react-native';
import Toast from "react-native-simple-toast";
import Header from '../../../../../components/Header';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import strings from '../../../../../constants/lng/LocalizedStrings';
import styles from './Styles';
import { Colors } from '../../../../../constants/colors';
import Button from '../../../../../components/Button';
import { myContext } from "../../../../../constants/ContextApi"
import { leftOrRight, rowOrRowreverse } from '../../../../../constants/RowOrRowreverse';
import axiosInstance from '../../../../../constants/AxiosCallPage';
import CurveDesing_Component from '../../../../../constants/CurveDesing_Component';
import Listing_header_button from '../../../../../components/Listing_header_button';
import globalstyles from '../../../../../constants/globalStyles/Global_Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BackHandler } from 'react-native';
const LMS7 = ({ navigation }) => {
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
  const {
    token,
    lMS_id, setLMS_id,
    setLMS_category_title,
    setLMS_subcategory_title,
    lMS_category_id, setLMS_category_id,
    lMS_subcategory_id, setLMS_subcategory_id,
    lMS_title, setLMS_title,
    lMS_search_tag, setLMS_search_tag,
    lMS_description, setLMS_description,

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


    lMS_type, setLMS_type,
    lMS_location, setLMS_location,
    lMS_distance, setLMS_distance,

    lMS_lat, setLMS_lat,
    lMS_lng, setLMS_lng,
    lMS_avalibility, setLMS_avalibility,
    lMS_message, setLMS_message,

    lMS_Multi_Images, setLMS_Multi_Images,
    lMS_single_Images, setLMS_single_Images,

    open, setOpen,
    open2, setOpen2,
    open3, setOpen3,
    open4, setOpen4,
    open5, setOpen5,
  } = useContext(myContext)

  const [loader, setLoader] = useState(false)

  const scrollViewRef = useRef();
  const newLising_Or_Edit_Listing = async () => {
    try {
      if (language == "en") {

        var final_lMS_package_price_1 = lMS_package_price_1

        var final_lMS_package_price_2 = lMS_package_price_2

        var final_lMS_package_price_3 = lMS_package_price_3

        var final_lMS_package_price_4 = lMS_package_price_4

        var final_lMS_package_price_5 = lMS_package_price_5
      } else {
        var temp_lMS_package_price_1 = lMS_package_price_1.toEnglishDigits()
        var final_lMS_package_price_1 = temp_lMS_package_price_1.toString()

        var temp_lMS_package_price_2 = lMS_package_price_2.toEnglishDigits()
        var final_lMS_package_price_2 = temp_lMS_package_price_2.toString()

        var temp_lMS_package_price_3 = lMS_package_price_3.toEnglishDigits()
        var final_lMS_package_price_3 = temp_lMS_package_price_3.toString()

        var temp_lMS_package_price_4 = lMS_package_price_4.toEnglishDigits()
        var final_lMS_package_price_4 = temp_lMS_package_price_4.toString()

        var temp_lMS_package_price_5 = lMS_package_price_5.toEnglishDigits()
        var final_lMS_package_price_5 = temp_lMS_package_price_5.toString()
      }
      setLoader(true)
      const finalFormData = new FormData();
      finalFormData.append('id', lMS_id);
      finalFormData.append('category_id', lMS_category_id);
      finalFormData.append('subcategory_id', lMS_subcategory_id);
      finalFormData.append('title', lMS_title);
      {
        lMS_search_tag.map((item, index) => {
          finalFormData.append(`search_tag[${index}]`, item.name)
        })
      }
      finalFormData.append('description', lMS_description);
      finalFormData.append('package_price_1', final_lMS_package_price_1);
      finalFormData.append('package_id_1', lMS_package_id_1);
      finalFormData.append('package_name_1', lMS_package_name_1);
      finalFormData.append('package_description_1', lMS_package_description_1);
      if (lMS_package_name_2.length == 0 || open2 == false) {
        null
      } else {
        finalFormData.append('package_price_2', final_lMS_package_price_2);
        finalFormData.append('package_id_2', lMS_package_id_2);
        finalFormData.append('package_name_2', lMS_package_name_2);
        finalFormData.append('package_description_2', lMS_package_description_2);
      }
      if (lMS_package_name_3.length == 0 || open3 == false) {
        null
      } else {
        finalFormData.append('package_price_3', final_lMS_package_price_3);
        finalFormData.append('package_id_3', lMS_package_id_3);
        finalFormData.append('package_name_3', lMS_package_name_3);
        finalFormData.append('package_description_3', lMS_package_description_3);
      }
      if (lMS_package_name_4.length == 0 || open4 == false) {
        null
      } else {
        finalFormData.append('package_price_4', final_lMS_package_price_4);
        finalFormData.append('package_id_4', lMS_package_id_4);
        finalFormData.append('package_name_4', lMS_package_name_4);
        finalFormData.append('package_description_4', lMS_package_description_4);
      }
      if (lMS_package_name_5.length == 0 || open5 == false) {
        null
      } else {
        finalFormData.append('package_price_5', final_lMS_package_price_5);
        finalFormData.append('package_id_5', lMS_package_id_5);
        finalFormData.append('package_name_5', lMS_package_name_5);
        finalFormData.append('package_description_5', lMS_package_description_5);
      }
      finalFormData.append('type', lMS_type);
      finalFormData.append('location', lMS_location);
      finalFormData.append('distance', lMS_distance);
      finalFormData.append('lat', lMS_lat);
      finalFormData.append('lng', lMS_lng);
      finalFormData.append('avalibility', lMS_avalibility);
      finalFormData.append('message', lMS_message);
      {
        if (lMS_single_Images.uri != undefined) {
          finalFormData.append('image', {
            uri: lMS_single_Images.uri,
            type: lMS_single_Images.type,
            name: lMS_single_Images.fileName,
          })
        }
      }
      lMS_Multi_Images.map((item, index) => {
        finalFormData.append(`gallery[${index}]`, {
          uri: item.uri,
          name: item.fileName,
          type: item.type
        })
      })
      const data = finalFormData
      const res = await axiosInstance.post("create-listing", data)
      // console.log(res.data)
      if (res.data.result) {
        Toast.show(res.data.result.status.meaning)
        setLoader(false)
        await AsyncStorage.setItem("islistingRefresh", "true")
        navigation.navigate("AfterListing")
      } else {
        setLoader(false)
        Toast.showWithGravity(res.data.error.meaning, Toast.LONG, Toast.BOTTOM)
      }
    } catch (error) {
      console.log("newLising_Or_Edit_Listing", error)
    }
  }
  const nextButton = () => {
    try {
      newLising_Or_Edit_Listing()
    } catch (error) {
      console.log("nextButton_LMS7", error)
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
        <Header back name={strings.LMS.HEADER} navigation={navigation} backFunc={handleBackButtonClick}/>
        <CurveDesing_Component  >
          <View>
            <Listing_header_button
              category="green_border"
              description="green_border"
              pricingPackaging="green_border"
              location="green_border"
              availability="green_border"
              images="green_border"
              bookingMessage="red_background"
            />
          </View>
          <View
            style={globalstyles.container_only_padding} >
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="always"
            >
              <Text style={[globalstyles.blue_Text, { textAlign: leftOrRight(language) }]}>{strings.LMS.AUTOSENDAMESSAGE}</Text>
              <Text style={[globalstyles.page_SubHeader_Text, { fontSize: Normalize(11.5) }]}>{strings.LMS.WRITEAMESSAGETOBE}</Text>
              <Text style={[globalstyles.textinput_Header_Style, { textAlign: leftOrRight(language) }]}>{strings.LMS.WRITEAMESSAGE}</Text>
              <TextInput
                style={[globalstyles.multiline_textinputStyle, { textAlign: leftOrRight(language) }]}
                placeholder={strings.LMS.THANKSFORBOOKINGMYLISTING}
                placeholderTextColor={Colors.textinput_inner_text}
                multiline
                value={lMS_message}
                color={Colors.greyText}
                onChangeText={(e) => setLMS_message(e)}
                onSubmitEditing={() => { Keyboard.dismiss() }}
              />
            </ScrollView >
            <Button
              disabled={loader}
              onPress={nextButton}
              name={strings.LMS.POSTYOURLISTING}
              style={styles.btnStyle}
            />
          </View>
        </CurveDesing_Component>
      </KeyboardAvoidingView >
    </SafeAreaView>
  );
};

export default withRtl(LMS7);
