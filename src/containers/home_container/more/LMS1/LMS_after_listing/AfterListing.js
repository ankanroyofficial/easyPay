import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  BackHandler
} from 'react-native';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import Entypo from 'react-native-vector-icons/Entypo';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Normalize from './../../../../../helpers/Dimens';
import Button from './../../../../../components/Button';
import axios from 'axios';
import LoaderPage from '../../../../../components/LoaderPage';
import strings from '../../../../../constants/lng/LocalizedStrings';
import Header from '../../../../../components/Header';
import { Colors } from '../../../../../constants/colors';
import { leftOrRight, rowOrRowreverse } from '../../../../../constants/RowOrRowreverse';
import { myContext } from '../../../../../constants/ContextApi';
import styles from '../Styles';
import images from '../../../../../constants/images';
import { FlatList } from 'react-native';
import { textAlign } from 'styled-system';
import { addCommaAndTranslateInPersian } from '../../../../../constants/NumberWithCommaAndInPersian';
import { nameShorting } from '../../../../../constants/NameShorting';
import { ImageLink } from '../../../../../constants/LinkPage';
import CurveDesing_Component from '../../../../../constants/CurveDesing_Component';
import Listing_header_button from '../../../../../components/Listing_header_button';
import globalstyles from '../../../../../constants/globalStyles/Global_Styles';
import axiosInstance from '../../../../../constants/AxiosCallPage';
function AfterListing({ navigation }) {
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
    setLMS_prev_Multi_Images,

    open, setOpen,
    open2, setOpen2,
    open3, setOpen3,
    open4, setOpen4,
    open5, setOpen5,
    setLMS_prev_distance,
    setDrawerTabNaviData
  } = useContext(myContext)
  const [loader, setLoader] = useState(false)
  const lms_Clean_Context = () => {
    setLMS_id("")
    setLMS_category_id("")
    setLMS_subcategory_id("")
    setLMS_category_title("")
    setLMS_subcategory_title("")
    setLMS_title("")
    setLMS_search_tag([])
    setLMS_description("")

    setLMS_package_price_1("")
    setLMS_package_id_1("")
    setLMS_package_name_1("")
    setLMS_package_description_1("")

    setLMS_package_price_2("")
    setLMS_package_id_2("")
    setLMS_package_name_2("")
    setLMS_package_description_2("")

    setLMS_package_price_3("")
    setLMS_package_id_3("")
    setLMS_package_name_3("")
    setLMS_package_description_3("")

    setLMS_package_price_4("")
    setLMS_package_id_4("")
    setLMS_package_name_4("")
    setLMS_package_description_4("")

    setLMS_package_price_5("")
    setLMS_package_id_5("")
    setLMS_package_name_5("")
    setLMS_package_description_5("")


    setLMS_type("P")
    setLMS_location("")
    setLMS_distance(20)
    setLMS_prev_distance(20)

    setLMS_lat("")
    setLMS_lng("")
    setLMS_avalibility("")
    setLMS_message("")

    setLMS_Multi_Images([])
    setLMS_single_Images("")
    setLMS_prev_Multi_Images([])

    setOpen(false)
    setOpen2(false)
    setOpen3(false)
    setOpen4(false)
    setOpen5(false)
  }


  const handleBackButtonClick = () => {
    navigation.navigate("My_Listing_page")
    return true;
  };

  useEffect(() => {
    const a = BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      a.remove();
    };
  }, []);

  const getHomeDetails = async () => {
    try {
      const data = await axiosInstance.post('home');
      console.log(data.data.result.show_info)
      if (data.data.result) {
        setDrawerTabNaviData(data.data.result.show_info)
      }
    } catch (error) {
      console.log('getHomeDetails', error);
    }
  };



  return (
    <>
      {
        loader ?
          <LoaderPage /> :
          <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary }}>
            <View style={styles.container2}>
              {/* <Header /> */}
              <CurveDesing_Component  >
                <KeyboardAvoidingView
                  behavior={(Platform.OS === 'ios') ? "padding" : null}
                  style={globalstyles.container_only_padding} >
                  <View style={{ flex: 1 }} >
                    <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }} >
                      <View style={{ height: Normalize(250), width: Normalize(250) }} >
                        <Image source={images.baloon} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                      </View>
                    </View>

                    <View style={{ flex: 0.9, alignItems: "center", justifyContent: "flex-start" }} >
                      <Text style={[globalstyles.plantext_Outfit_Medium, { fontSize: Normalize(16), color: Colors.greyText }]} >Your listing has been published!</Text>
                      <Text style={[globalstyles.plantext_outfit_regular, { color: Colors.greyText, marginVertical: Normalize(3) }]} >Woohoo! You are ready to start receiving bookings.</Text>
                      <Text style={[globalstyles.plantext_outfit_regular, { color: Colors.greyText }]} >Share it with the world and start earning today</Text>
                      <TouchableOpacity
                        onPress={() => {
                          getHomeDetails()
                          navigation.navigate("My_Listing_page")
                        }}
                        style={{
                          backgroundColor: Colors.secondary,
                          height: Normalize(40),
                          marginTop: Normalize(15),
                          borderRadius: Normalize(40) / 2,
                          alignItems: 'center',
                          justifyContent: 'center',
                          paddingHorizontal: Normalize(20)
                        }}
                      >
                        <Text style={{
                          color: Colors.white,
                          fontSize: Normalize(13),
                          fontFamily: 'roboto-medium',
                        }}>View My Listing</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          getHomeDetails()
                          navigation.navigate('LMS1', { isSlug: "" })
                          lms_Clean_Context()
                        }}
                        style={{
                          backgroundColor: Colors.primary,
                          height: Normalize(40),
                          marginTop: Normalize(10),
                          borderRadius: Normalize(40) / 2,
                          alignItems: 'center',
                          justifyContent: 'center',
                          paddingHorizontal: Normalize(20)
                        }}
                      >
                        <Text style={{
                          color: Colors.white,
                          fontSize: Normalize(13),
                          fontFamily: 'roboto-medium',
                        }}>Create another listing</Text>
                      </TouchableOpacity>
                    </View>

                  </View>
                </KeyboardAvoidingView>
              </CurveDesing_Component>
            </View>
          </SafeAreaView>
      }
    </>
  );
}

export default withRtl(AfterListing);
