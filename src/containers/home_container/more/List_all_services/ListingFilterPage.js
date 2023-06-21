import React, { Fragment, useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  LogBox,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import Toast from "react-native-simple-toast"
import styles from './Styles';
import Header from '../../../../components/Header';
import { Colors } from '../../../../constants/colors';
import strings from '../../../../constants/lng/LocalizedStrings';
import Normalize from '../../../../helpers/Dimens';
import { myContext } from '../../../../constants/ContextApi';
import axiosInstance from '../../../../constants/AxiosCallPage';
import { numberWithCommas } from '../../../../constants/NumberWithComma';
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
import Button from '../../../../components/Button';
import { useNavigation } from '@react-navigation/native';
import globalStyle_esyPay from '../../../../constants/globalStyles/GlobalStyle_esyPay';
import TwoHorizantalLine from '../../../../components/TwoHorizantalLine';
import axios from 'axios';
import { Constant_apis } from '../../../../constants/Constant_api';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NewLoaderPage from '../../../../components/NewLoaderPage';
import { fontfmliy } from '../../../../components/WhichFontFamily';
function ListingFilterPage() {
  const navigation = useNavigation()
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
  }, [])

  const {
    setListAllServicesData,
    setListAllServicesDataForMap,
    listing_Categories, setListing_Categories,
    listing_KeyWord, setListing_KeyWord,
    listing_Location, setListing_Location,
    listing_Lat, setListing_Lat,
    listing_Lng, setListing_Lng,
    listing_Type, setListing_Type,
    listing_distance, setListing_distance,
    listing_prevDistance, setListing_prevDistance
  } = useContext(myContext)
  const [loader, setLoader] = useState(false)
  const [temp_showDistance, setTemp_showDistance] = useState(listing_prevDistance);
  const [temp_Distance, setTemp_Distance] = useState(listing_distance);

  const handleClose = () => {
    distance_swap()
    navigation.goBack()
  };

  const distance_swap = () => {
    setListing_distance(temp_Distance)
    setListing_prevDistance(temp_showDistance)
  }
  const getFilterCategoryIds = async (val) => {
    let a = val;
    let newArr = []
    a.map((item) => {
      if (item.isSelected) {
        newArr.push(item.id)
      }
    })
    return newArr.toString();
  }
  const applyButton = async () => {
    try {
      let cateIds = await getFilterCategoryIds(listing_Categories);
      setLoader(true)
      const res = {
        "params": {
          "keyword": listing_KeyWord,
          "category": cateIds,
          "lat": listing_Lat,
          "lng": listing_Lng,
          "distance": temp_Distance,
          "type": listing_Type
        }
      }
      // console.log(res)
      const data = await axiosInstance.post("show-service-listings", res)
      if (data.data) {
        setListAllServicesData(data.data.result.listing_categories)
        setListAllServicesDataForMap(data.data.result.listing_for_map)
        handleClose()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const resetButton = () => {
    setListing_KeyWord("")
    setListing_Location("")
    setListing_Lat("")
    setListing_Lng("")
    setListing_Type("A")
    setListing_distance(20)
    setListing_prevDistance(20)
    setTemp_showDistance(20)
    setTemp_Distance(20)
    resetCategory()
  }


  const resetCategory = async () => {
    let a = listing_Categories;
    let newArr = []
    a.map((item) => {
      item.isSelected = false;
      newArr.push(item)
    })
    setListing_Categories(newArr)
  }
  const isSelectAnyCategory = (val) => {
    let arr = listing_Categories;
    let count = 0;
    arr.map((item) => {
      if (item.isSelected) {
        count++;
      }
    })
    if (count > 0) {
      return true;
    } else {
      return false;
    }
  }
  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', () => {
      Keyboard.dismiss();
    })
  }, [])
  const listOfCategory = (val) => {
    let originalArr = val;
    let newArr = [];

    originalArr.map((item) => {
      if (item.isSelected) {
        newArr.push(item.name)
      }
    })
    return newArr.toString();
  }
  const getLocation = () => {
    try {

      console.log("*************")
      Geolocation.getCurrentPosition(
        info => {
          console.log("---",
            info.coords.latitude,
            info.coords.longitude,
          );
          getLocationName(info.coords.latitude, info.coords.longitude);
        },
        error => {
          console.log(error)
          Toast.show("lat lng not getting");
          profiledata()
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          // maximumAge: 10000
        }
      )
    } catch (error) {
      console.log(error)
      profiledata()
    }
  };
  const dataSet = (lat, lng, location) => {
    setListing_Location(location)
    setListing_Lat(lat)
    setListing_Lng(lng)
  }
  const profiledata = async () => {
    try {
      let pdata = await AsyncStorage.getItem('@profiledata');
      let p = JSON.parse(pdata)
      // console.log("p-data----",p)
      dataSet(p.lat, p.lng, p.location)

    } catch (error) {
      console.log('reload_after_comeBack', error);
    }
  };
  const getLocationName = async (lat, lng) => {
    try {
      const res = await axios.post(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${lat},${lng}&key=${Constant_apis.Google_Location_api}`,
      );
      // console.log(res.data)
      if (res.data.results) {
        var locationName = res.data.results[0].formatted_address;
        setListing_Location(locationName);
        setListing_Lat(lat);
        setListing_Lng(lng);
        console.log("3 ----->", locationName);
      } else {
        profiledata()
        console.log('Location error');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>
      <KeyboardAvoidingView
        behavior={(Platform.OS === 'ios') ? "padding" : null} style={{ flex: 1, backgroundColor: Colors.white }}>
        <Header back name={strings.BROWSEFILTER.HEADERTEXT} />
        <View style={{ flex: 1, }} >
          <ScrollView
            showsVerticalScrollIndicator={false}
          >
            {/* category */}

            <View style={{ marginVertical: Normalize(10), paddingHorizontal: Normalize(15) }}>
              <Text style={globalStyle_esyPay.inputHeader}>
                Category
              </Text>
              <Pressable
                onPress={async () => navigation.navigate("ListingFilterCategorySelect")}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderBottomWidth: Normalize(1),
                  borderBottomColor: Colors.textinput_bottomBorder,
                }}>
                <View
                  style={{
                    borderBottomColor: Colors.textinput_bottomBorder,
                    borderBottomWidth: Normalize(1),
                    paddingVertical: Normalize(7),
                    height: '100%',
                    borderBottomWidth: 0,
                    width: '90%',

                  }}>
                  {
                    isSelectAnyCategory() ?
                      <Fragment>
                        <Text numberOfLines={10}
                          style={{
                            paddingVertical: Normalize(5),
                            fontSize: Normalize(11.5),
                            color: Colors.greyText,
                            fontFamily: fontfmliy.bold,
                            lineHeight: Normalize(14)
                          }}>
                          {listOfCategory(listing_Categories)}
                        </Text>
                      </Fragment>
                      :
                      <Text
                        style={{
                          paddingVertical: Normalize(5),
                          fontSize: Normalize(11.5),
                          color: Colors.textinput_placeholder,
                          fontFamily: fontfmliy.bold,
                        }}>
                        Select category
                      </Text>
                  }
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Entypo
                    name={'chevron-small-right'}
                    color={Colors.grey}
                    size={Normalize(22)}
                  />
                </View>
              </Pressable>
            </View>
            <TwoHorizantalLine />
            {/* location */}

            <View style={{ marginVertical: Normalize(10), paddingHorizontal: Normalize(15) }}>
              <Text style={globalStyle_esyPay.inputHeader}>
                Where would you like to fine tasks?
              </Text>
              <Pressable
                onPress={() => navigation.navigate("Listing_Filter_Location_selectPage")}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderBottomWidth: Normalize(1),
                  borderBottomColor: Colors.textinput_bottomBorder,
                }}>
                <View
                  style={{
                    borderBottomColor: Colors.textinput_bottomBorder,
                    borderBottomWidth: Normalize(1),
                    paddingVertical: Normalize(7),
                    height: '100%',
                    borderBottomWidth: 0,
                    width: '88%',
                  }}>
                  <Text numberOfLines={1}
                    style={{
                      paddingVertical: Normalize(5),
                      fontSize: Normalize(11.5),
                      color: listing_Location != "" ? Colors.greyText : Colors.textinput_placeholder,
                      fontFamily: fontfmliy.bold,
                    }}>
                    {listing_Location != "" ? listing_Location : "location"}
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <SimpleLineIcons name="location-pin" color={Colors.grey} size={Normalize(15)} />
                </View>
              </Pressable>
            </View>
            <TwoHorizantalLine />
            {/* ******************distance slider****************** */}
            <View style={{ paddingHorizontal: Normalize(15) }} >

              <View
                style={[styles.rowView, {}]}>
                <Text style={globalstyles.textinput_Header_Style}>Radius</Text>
                <Text
                  style={[globalstyles.plantext_roboto_regular, { color: Colors.greyText }]}>
                  {strings.BROWSEFILTER.KM}
                </Text>
              </View>
              <View style={{}} >
                <Slider
                  value={temp_Distance}
                  minimumValue={1}
                  maximumValue={50}
                  step={1}
                  minimumTrackTintColor={Colors.secondary}
                  maximumTrackTintColor={Colors.borderColor}
                  onValueChange={(val) => {
                    setTemp_showDistance(Math.round(val))
                  }}
                  onSlidingComplete={val =>
                    setTemp_Distance(Math.round(val))
                  }
                  style={{ height: 30, width: "100%" }}

                  thumbTintColor={Colors.secondary}
                />
              </View>
              <Text
                style={[globalstyles.plantext_roboto_regular, { color: Colors.greyText, textAlign: "right" }]}>
                {numberWithCommas(temp_showDistance)}
              </Text>
            </View>

            <TwoHorizantalLine />

            {/* ******************to be done tabs****************** */}
            <View style={{ paddingHorizontal: Normalize(15), paddingTop: Normalize(8) }} >
              <Text style={[globalstyles.textinput_Header_Style, { marginVertical: Normalize(0), }]}>Type of tasks </Text>
              <View style={styles.customtab}>
                <Pressable activeOpacity={0.8} onPress={() => setListing_Type("P")}
                  style={[styles.tobedone, { flexDirection: "row" }]} >
                  <FontAwesome
                    name={listing_Type == "P" ? "circle" : "circle-thin"}
                    size={Normalize(18)}
                    color={listing_Type == "P" ? Colors.primary : Colors.grey}
                  />
                  <Text
                    style={[globalstyles.plantext_bold, { marginLeft: Normalize(5) }]}>
                    {strings.BROWSEFILTER.INPERSON}
                  </Text>
                </Pressable>
                <Pressable activeOpacity={0.8} onPress={() => setListing_Type("O")}
                  style={[styles.tobedone, { flexDirection: "row" }]} >
                  <FontAwesome
                    name={listing_Type == "O" ? "circle" : "circle-thin"}
                    size={Normalize(18)}
                    color={listing_Type == "O" ? Colors.primary : Colors.grey}
                  />
                  <Text
                    style={[globalstyles.plantext_bold, { marginLeft: Normalize(5) }]}>
                    {strings.BROWSEFILTER.REMOTELY}
                  </Text>
                </Pressable>
                <Pressable activeOpacity={0.8} onPress={() => setListing_Type("A")}
                  style={[styles.tobedone, { flexDirection: "row" }]} >
                  <FontAwesome
                    name={listing_Type == "A" ? "circle" : "circle-thin"}
                    size={Normalize(18)}
                    color={listing_Type == "A" ? Colors.primary : Colors.grey}
                  />
                  <Text
                    style={[globalstyles.plantext_bold, { marginLeft: Normalize(5) }]}>
                    {strings.BROWSEFILTER.ALL}
                  </Text>
                </Pressable>
              </View>
            </View>

            <TwoHorizantalLine />
            <Pressable
              onPress={resetButton}
              style={{ flexDirection: "row", alignSelf: "center", marginTop: Normalize(30) }} >

              <MaterialCommunityIcons
                name="reload"
                size={Normalize(18)}
                color={Colors.primary}
              />

              <Text style={[globalstyles.plantext_Outfit_Medium, { color: Colors.primary, marginLeft: Normalize(2) }]} >Reset</Text>
            </Pressable>

            <Button
              // disabled={loader}
              name={"Apply Filter"}
              onPress={applyButton}
              style={{ margin: Normalize(15) }}
            />
          </ScrollView>
          {loader && <NewLoaderPage />}
        </View>


      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default withRtl(ListingFilterPage);