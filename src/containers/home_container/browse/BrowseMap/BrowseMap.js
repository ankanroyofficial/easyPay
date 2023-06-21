import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, Modal, TextInput } from 'react-native';
import styles from './Styles';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import Header from '../../../../components/BrowseHeader2';
import BrowseTaskHeader from '../../../../components/BrowseTaskHeader';
import strings from '../../../../constants/lng/LocalizedStrings';
import Filter from '../filter';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Normalize from './../../../../helpers/Dimens';
import { Colors } from '../../../../constants/colors';
import axiosInstance from "../../../../constants/AxiosCallPage";
import Feather from 'react-native-vector-icons/Feather';
import Geolocation from '@react-native-community/geolocation'
import { useNavigation } from "@react-navigation/native"
import { myContext } from '../../../../constants/ContextApi';
import { engToPersian } from '../../../../constants/EnglishToPersian';
import { nameShorting } from '../../../../constants/NameShorting';
import moment from "moment";
import { axiosUrl, ImageLink } from '../../../../constants/LinkPage';
import CurveDesing_Component from '../../../../constants/CurveDesing_Component';
import { numberWithCommas } from '../../../../constants/NumberWithComma';
export default function BrowseMap() {
  const navigation = useNavigation()

  const whichLatOrLong = (val) => {
    if (val === "en") {
      return  [1.28967, 103.85007]
    } else {
      return [32.4279, 53.6880]
    }
  }


  const { min_search_budget, setMin_search_budget,
    max_search_budget, setMax_search_budget,
    browserCategory_id, setBrowserCategory_id,
    browserSubcategory_id, setBrowserSubcategory_id,
    browserLat, setBrowserLat,
    browserLng, setBrowserLng,
    distance, setDistance,
    from_date, setFrom_date,
    to_date, setTo_date,
    order_by, setOrder_by,
    browsertype, setBrowsertype,
    browserLocation, setBrowserLocation,
    from_D, setFrom_D,
    from_M, setFrom_M,
    from_Y, setFrom_Y,
    to_D, setTo_D,
    to_M, setTo_M,
    to_Y, setTo_Y,
    min_budget, setMin_budget,
    max_budget, setMax_budget,
    taskData, setTaskData,
    catagoryName, setCatagoryName,
    subcatagoryName, setSubcatagoryName,
    keyWord, setKeyWord,
    prevDistance, setPrevDistance,
    isOpenOfferin_filter, setIsOpenOfferin_filter,
    setNewOfferPageMessageArry,setNewOfferPageMessageWithTaskerArry
  } = useContext(myContext)
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('Tasks');
  const [searchToggle, setSearchToggle] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: whichLatOrLong(language)[0],
    longitude: whichLatOrLong(language)[1],
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121
  })
  const a = {
    latitude: browserLat ? browserLat : 30.78825,
    longitude: browserLng ? browserLng : -112.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121
  }
  const handleTabChange = val => {
    setActiveTab(val);
  };
  const onPressFilter = () => {
    setModalVisible(!modalVisible);
  };
  const getLocation = () => {

    Geolocation.getCurrentPosition(info => {
      getCurrentLocation(info.coords.latitude, info.coords.longitude, info.coords.accuracy)
    });
  }
  useEffect(() => {
    getLocation()
  }, [])
  const getCurrentLocation = (lat, lon, accuracy) => {
    setCurrentLocation({
      latitude: lat,
      longitude: lon,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121
    })
  }

  const onPressSearch = () => {
    setSearchToggle(!searchToggle)
  }
  const englishTimeShow = (val) => {
    // console.log(val)
    const a = moment(val, "YYYY-MM-DD").format("Do MMM YYYY")
    const final_time = a

    return final_time
  }
  const persianTimeShow = (val) => {
    const a = val.substr(0, 10)
    let datemonthyear = moment(a, 'YYYY-MM-DD').locale('fa').format('YYYY/MM/D');
    return engToPersian(datemonthyear)
  }
  const onPressList = () => { navigation.goBack() }
  return (
    <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>

      <View style={styles.container}>
        <Header onPressSearch={onPressSearch} onPressFilter={onPressFilter} onPressList={onPressList} name={strings.BROWSE.HEADERTEXT} />
        <CurveDesing_Component  >
          
          <View style={{ flex: 1, marginBottom: Normalize(20) }} >
            <MapView style={{ flex: 1 }}
              region={browserLng ? a : currentLocation.latitude ? currentLocation : a}
            >
              {
                taskData.map((item, index) => (
                  item.lat &&
                  <Marker
                    key={index}
                    title="EazyPay"
                    coordinate={{ latitude: item.lat, longitude: item.lng }}
                  >
                    <Image source={require("../../../../../assets/map.png")} style={{ height: Normalize(50), width: Normalize(50) }} resizeMode="contain" />
                    <MapView.Callout tooltip onPress={() => {
                      setNewOfferPageMessageArry([])
                      setNewOfferPageMessageWithTaskerArry([])
                      navigation.navigate('TaskDetails', { show: item.slug })
                    }}  >
                      <View style={{ padding: Normalize(5), backgroundColor: Colors.white, borderRadius: 5, borderColor: Colors.primary, borderWidth: Normalize(1) }} >
                        <View style={{ height: Normalize(125), width: Normalize(180) }}>
                          <View style={{ flex: 1, flexDirection: language == "en" ? "row" : "row-reverse" }} >
                            <Text><Image style={{ height: Normalize(33), width: Normalize(33), borderRadius: Normalize(33) / 2 }} source={{ uri: item.get_user.profile_picture ? `${ImageLink.ProfilePhoto}${item.get_user.profile_picture}` : ImageLink.BlankProfileImage }} resizeMode="cover" /></Text>
                            <View style={{ flex: 0.8, justifyContent: "center", paddingHorizontal: Normalize(8), marginTop: Normalize(10) }} >
                              {/* <Text style={{ fontSize: Normalize(12), color: Colors.primary, fontFamily: "Outfit-Medium", textAlign: language == "en" ? "left" : "right",  }}>{strings.BROWSEFILTER.TOMAN} {addCommaAndTranslateInPersian(item.budget, language)}</Text> */}

                              {
                                item.budget <= 0 ?
                                  <Text style={{ fontSize: Normalize(12), color: Colors.green_new_2, fontFamily: "Outfit-Medium", textAlign: language == "en" ? "left" : "right", }}>Open offer</Text>
                                  :
                                  <Text style={{ fontSize: Normalize(12), color: Colors.primary, fontFamily: "Outfit-Medium", textAlign: language == "en" ? "left" : "right", }}>
                                    {strings.BROWSEFILTER.TOMAN} {numberWithCommas(item.budget)}
                                  </Text>
                              }

                            </View>
                          </View>
                          <View style={{ flex: 1, justifyContent: "space-evenly" }} >
                            <Text numberOfLines={language == "en" ? 1 : 2} style={{ fontSize: Normalize(11.5), fontFamily: "Outfit-Medium", color: Colors.secondary, textDecorationLine: "underline", textAlign: language == "en" ? "left" : "right" }} >
                              {item.title}
                            </Text>
                            {item.date &&
                              <View style={{ flexDirection: language == "en" ? "row" : "row-reverse" }} >
                                <Text style={{ fontSize: Normalize(10), fontFamily: "Outfit-Medium", color: Colors.greyText, textAlign: "right" }} >
                                  {strings.BROWSEFILTER.DUEDATE}{" "}
                                </Text>
                                <Text style={{ fontSize: Normalize(10), fontFamily: "Outfit-Medium", color: Colors.greyText, textAlign: "right" }} >
                                  {language == "en" ? englishTimeShow(item.date) : persianTimeShow(item.date)}
                                </Text>
                              </View>
                            }
                            <View style={{ flexDirection: language == "en" ? "row" : "row-reverse" }}>
                              <Text numberOfLines={language == "en" ? 1 : 2} style={{ fontSize: Normalize(10), fontFamily: "Outfit-Medium", color: Colors.greyText }} >
                                {strings.BROWSEFILTER.POSTEDBY}
                              </Text>
                              <Text numberOfLines={language == "en" ? 1 : 2} style={{ fontSize: Normalize(11), fontFamily: "Outfit-Medium", color: Colors.primary, paddingHorizontal: Normalize(2) }} >
                                {nameShorting(item.get_user.fname + " " + item.get_user.lname)}
                              </Text>
                            </View>

                          </View>
                          <TouchableOpacity underlayColor='#dddddd' style={{ height: "20%", width: "75%", backgroundColor: Colors.primary, alignSelf: "center", borderRadius: 5, marginVertical: Normalize(3), justifyContent: "center", alignItems: "center" }} >
                            <Text style={{
                              fontSize: Normalize(12),
                              fontFamily: "Outfit-Medium",
                              color: Colors.white,
                            }}>{strings.BROWSEFILTER.VIEWTASK}</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </MapView.Callout>
                  </Marker>
                ))
              }
            </MapView>
          </View>

        </CurveDesing_Component>
      </View >
    </SafeAreaView>
  );
}
