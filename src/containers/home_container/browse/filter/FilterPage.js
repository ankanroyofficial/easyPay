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
import { engToPersian } from '../../../../constants/EnglishToPersian';
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
import { countPage } from '../../../../components/BrowserTaskPageCount';
import NewLoaderPage from '../../../../components/NewLoaderPage';
import { fontfmliy } from '../../../../components/WhichFontFamily';
function FilterPage() {
  const { language } = useRtlContext();

  const navigation = useNavigation()
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
  }, [])

  const {
    token,
    min_search_budget, setMin_search_budget,
    max_search_budget, setMax_search_budget,
    browserCategory_id, setBrowserCategory_id,
    browserSubcategory_id, setBrowserSubcategory_id,
    browserLat, setBrowserLat,
    browserLng, setBrowserLng,
    distance, setDistance,
    prevDistance, setPrevDistance,
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
    taskData, setTaskData,
    catagoryName, setCatagoryName,
    subcatagoryName, setSubcatagoryName,
    keyWord, setKeyWord,
    isOpenOfferin_filter, setIsOpenOfferin_filter,
    filter_Categories, setFilter_Categories,
    isAvaliable, setIsAvaliable,
    browsertaskTotalPage, setBrowsertaskTotalPage,
    browsertaskCurrentPage,
    setBrowsertaskCurrentPage,
    setBrowserTaskFooterText, setCurrentLocation, setTaskDataForMap
  } = useContext(myContext)
  const [loader, setLoader] = useState(false)
  const [catagory, setCatagory] = useState([]);
  const [temp_showDistance, setTemp_showDistance] = useState(prevDistance);
  const [temp_Distance, setTemp_Distance] = useState(distance);

  const handleClose = () => {
    distance_swap()
    navigation.goBack()
  };

  const distance_swap = () => {
    setDistance(temp_Distance)
    setPrevDistance(temp_showDistance)
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
      let cateIds = await getFilterCategoryIds(filter_Categories);
      setLoader(true)
      const res = {
        "jsonrpc": "2.0",
        "params": {
          "keyword": keyWord,
          "min_search_budget": "",
          "max_search_budget": "",
          "category_id": cateIds,
          "subcategory_id": "",
          "lat": browserLat,
          "lng": browserLng,
          "distance": temp_Distance,
          "type": browsertype,
          "order_by": order_by == "1" ? "1" : isOpenOfferin_filter ? "" : order_by,
          "open_offer": "false",
          "show_available_task_only": "Y",
          "page": 1
        }
      }
      console.log("browse-task====> 4", res)
      const data = await axiosInstance.post("browse-task", res)
      if (data.data) {
        var val = data.data.tasks
        // var total_result = data.data.total_result
        var total_result = (data.data.tasks).length
        getTaskForMapPage()
        setBrowserTaskFooterText("")
        setBrowsertaskCurrentPage(1)
        let a = {
          "category": cateIds,
          "distance": temp_Distance,
          "type": browsertype,
        }
        let stringify_a = JSON.stringify(a)
        await AsyncStorage.setItem('filterData', stringify_a);
        setBrowsertaskTotalPage(countPage(data.data.limit, data.data.total_result))
        setTaskData(data.data.tasks)
        setCurrentLocation({
          latitude: parseFloat(browserLat),
          longitude: parseFloat(browserLng),
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121
        })
        setLoader(false)
        handleClose()
        // Toast.show(`${language == "en" ? total_result : engToPersian(total_result)}` + " " + strings.BROWSEFILTER.TASKFOUND)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getTaskForMapPage = async () => {
    try {
      let cateIds = await getFilterCategoryIds(filter_Categories);
      const res = {
        "jsonrpc": "2.0",
        "params": {
          "keyword": keyWord,
          "min_search_budget": "",
          "max_search_budget": "",
          "category_id": cateIds,
          "subcategory_id": "",
          "lat": browserLat,
          "lng": browserLng,
          "distance": distance,
          "type": browsertype,
          "order_by": order_by == "1" ? "1" : isOpenOfferin_filter ? "" : order_by,
          "open_offer": "false",
          "show_available_task_only": "Y"
        }
      }
      // console.log("getTaskForMapPage====>", res)
      let data = await axiosInstance.post("browse-task-for-map", res)
      if (data.data) {
        // console.log((data.data.tasks).length)
        setTaskDataForMap(data.data.tasks)
      }
    } catch (error) {
      setBrowserTaskloader(false)
      console.log("getTaskForMapPage", error)
    }
  }



  const resetButton = () => {
    console.log("**************66")
    setMin_search_budget(5)
    setMax_search_budget(100000)
    setBrowserCategory_id("")
    setCatagoryName("")
    setBrowserSubcategory_id("")
    setSubcatagoryName("")

    // setBrowserLocation("")
    // setBrowserLat("")
    // setBrowserLng("")

    getLocation()

    setDistance(20)
    setPrevDistance(20)
    setIsOpenOfferin_filter(false)
    setFrom_date("")
    setTo_date("")
    setOrder_by("")
    setBrowsertype("")
    setFrom_D("")
    setFrom_M("")
    setFrom_Y("")
    setTo_D("")
    setTo_M("")
    setTo_Y("")
    resetCategory()
  }


  const resetCategory = async () => {
    let a = filter_Categories;
    let newArr = []
    a.map((item) => {
      item.isSelected = false;
      newArr.push(item)
    })
    setFilter_Categories(newArr)
  }








  const isSelectAnyCategory = (val) => {
    let arr = filter_Categories;
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
  const onpressIsAvaliable = () => {
    setIsAvaliable(!isAvaliable)
  }
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
    setBrowserLocation(location)
    setBrowserLat(lat)
    setBrowserLng(lng)
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
        setBrowserLocation(locationName);
        setBrowserLat(lat);
        setBrowserLng(lng);
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
                onPress={async () => navigation.navigate("FilterCategorySelect")}
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
                          {listOfCategory(filter_Categories)}
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
                onPress={() => navigation.navigate("Filter_Location_selectPage")}
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
                      color: browserLocation != "" ? Colors.greyText : Colors.textinput_placeholder,
                      fontFamily: fontfmliy.bold,
                    }}>
                    {browserLocation != "" ? browserLocation : "location"}
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


                <Pressable activeOpacity={0.8} onPress={() => setBrowsertype("P")}
                  style={[styles.tobedone, { flexDirection: "row" }]} >
                  <FontAwesome
                    name={browsertype == "P" ? "circle" : "circle-thin"}
                    size={Normalize(18)}
                    color={browsertype == "P" ? Colors.primary : Colors.grey}
                  />
                  <Text
                    style={[globalstyles.plantext_bold, { marginLeft: Normalize(5) }]}>
                    {strings.BROWSEFILTER.INPERSON}
                  </Text>
                </Pressable>





                <Pressable activeOpacity={0.8} onPress={() => setBrowsertype("O")}
                  style={[styles.tobedone, { flexDirection: "row" }]} >
                  <FontAwesome
                    name={browsertype == "O" ? "circle" : "circle-thin"}
                    size={Normalize(18)}
                    color={browsertype == "O" ? Colors.primary : Colors.grey}
                  />
                  <Text
                    style={[globalstyles.plantext_bold, { marginLeft: Normalize(5) }]}>
                    {strings.BROWSEFILTER.REMOTELY}
                  </Text>
                </Pressable>



                <Pressable activeOpacity={0.8} onPress={() => setBrowsertype("")}
                  style={[styles.tobedone, { flexDirection: "row" }]} >
                  <FontAwesome
                    name={browsertype == "" ? "circle" : "circle-thin"}
                    size={Normalize(18)}
                    color={browsertype == "" ? Colors.primary : Colors.grey}
                  />
                  <Text
                    style={[globalstyles.plantext_bold, { marginLeft: Normalize(5) }]}>
                    {strings.BROWSEFILTER.ALL}
                  </Text>
                </Pressable>
              </View>
            </View>

            {/* <TwoHorizantalLine />

            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: Normalize(15), paddingVertical: Normalize(8) }} >
              <Text style={[globalStyle_esyPay.detailsText, { fontSize: Normalize(12), color: Colors.grey }]}>Show available tasks only</Text>
              <Pressable
                onPress={onpressIsAvaliable}
                style={{
                  height: Normalize(16),
                  width: Normalize(34),
                  borderRadius: Normalize(50),
                  backgroundColor: isAvaliable ? Colors.primary : Colors.grey,
                  flexDirection: !isAvaliable ? "row" : "row-reverse",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: Normalize(3),
                }} >
                <FontAwesome size={Normalize(13)} name={"circle"} color="white" />
              </Pressable>
            </View> */}

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

export default withRtl(FilterPage);