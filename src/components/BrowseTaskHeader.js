import React, { Fragment, useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Modal, PermissionsAndroid
} from 'react-native';
import { Colors } from './../constants/colors';
import Normalize from './../helpers/Dimens';
import strings from './../constants/lng/LocalizedStrings';
import { myContext } from '../constants/ContextApi';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Pressable } from 'react-native';
import Toast from 'react-native-simple-toast';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons';
import globalstyles from '../constants/globalStyles/Global_Styles';
import axiosInstance from '../constants/AxiosCallPage';
import { Constant_apis } from '../constants/Constant_api';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import { requestLocationPermission } from '../constants/permissions/LocationPremission';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { testingText } from '../constants/TestingConstant';
import { countPage } from './BrowserTaskPageCount';
import { Platform } from 'react-native';
import { fontfmliy } from './WhichFontFamily';

export default function CustomTab({ onPressFilter }) {
  const navigation = useNavigation()
  const textRef = useRef();
  const {
    min_search_budget,
    max_search_budget,
    browserCategory_id,
    browserSubcategory_id,
    browserLat, setBrowserLat,
    browserLng, setBrowserLng,
    distance,
    order_by,
    browsertype,
    browserLocation, setBrowserLocation,
    setTaskData,
    isOpenOfferin_filter, filter_Categories, keyWord,
    setKeyWord, searchToggle, setSearchToggle,
    isAvaliable, isBrowseTaskLoad, setBrowserTaskloader, setIsBrowseTaskLoad,
    setBrowsertaskTotalPage, browsertaskCurrentPage,
    setBrowsertaskCurrentPage,
    setBrowserTaskFooterText,
    setTaskDataForMap
  } = useContext(myContext)


  const [locationOnModal, setLocationOnModal] = useState(false)
  const getBrowserData_afterGetLocation = async (lat, lng) => {
    try {
      setBrowserTaskloader(true)
      setIsBrowseTaskLoad(true)
      let cateIds = await getFilterCategoryIds(filter_Categories);
      const res = {
        "jsonrpc": "2.0",
        "params": {
          "keyword": keyWord,
          "min_search_budget": "",
          "max_search_budget": "",
          "category_id": cateIds,
          "subcategory_id": "",
          "lat": lat,
          "lng": lng,
          "distance": distance,
          "type": browsertype,
          "order_by": order_by == "1" ? "1" : isOpenOfferin_filter ? "" : order_by,
          "open_offer": "false",
          "show_available_task_only": "Y",
          "page": "1"
        }
      }
      console.log("browse-task====> new", res)
      const data = await axiosInstance.post("browse-task", res)

      // console.log(data.data.tasks)

      if (data.data.tasks) {
        setBrowserTaskFooterText("")
        setBrowsertaskCurrentPage(1)
        setBrowsertaskTotalPage(countPage(data.data.limit, data.data.total_result))
        setTaskData(data.data.tasks)
        setBrowserTaskloader(false)
      }
    } catch (error) {
      setBrowserTaskloader(false)
      console.log("getData_browser", error)
    }
  }
  const getTaskForMapPage = async (lat, lng) => {
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
          "lat": lat,
          "lng": lng,
          "distance": distance,
          "type": browsertype,
          "order_by": order_by == "1" ? "1" : isOpenOfferin_filter ? "" : order_by,
          "open_offer": "false",
          "show_available_task_only": "Y"
        }
      }
      // console.log("getTaskForMapPage====>", res)
      let data = await axiosInstance.post("browse-task-for-map", res)
      // console.log("onload.................", countPage(data.data.limit, data.data.total_result))
      if (data.data) {
        setTaskDataForMap(data.data.tasks)
      }
    } catch (error) {
      console.log("getTaskForMapPage", error)
    }
  }


  const getTaskForMapPage_search = async (val) => {
    try {
      let cateIds = await getFilterCategoryIds(filter_Categories);
      const res = {
        "jsonrpc": "2.0",
        "params": {
          "keyword": `${val}`,
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
      // console.log("onload.................", countPage(data.data.limit, data.data.total_result))
      if (data.data) {
        // console.log((data.data.tasks).length)
        setTaskDataForMap(data.data.tasks)
      }
    } catch (error) {
      console.log("getTaskForMapPage_search", error)
    }
  }






  const autoGetLocation = () => {
    try {
      Geolocation.getCurrentPosition(
        info => {
          getLocationName(
            info.coords.latitude,
            info.coords.longitude,
          );
          getBrowserData_afterGetLocation(info.coords.latitude, info.coords.longitude);
          getTaskForMapPage(info.coords.latitude, info.coords.longitude);
        },
        (error) => {
          console.log("::::::>", error.message)
          if (error.message) {
            if (error.message == "No location provider available.") {
              setLocationOnModal(true)
            }
          }
        },
        { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
      )
    } catch (error) {
      console.log("Error2======>", error)
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
        textRef.current?.setAddressText(locationName)
        if (locationName.length > 0) {
          var locationName = res.data.results[0].formatted_address;
          // console.log("1 ----->", locationName);
          setBrowserLocation(locationName)
          setBrowserLat(lat)
          setBrowserLng(lng)
        } else {
          Toast.show('Enter a valid location');
        }
      } else {
        Toast.show('Location error');
      }
    } catch (error) {
      console.log(error);
    }
  };
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
  const dataSet = (lat, lng, location) => {
    setBrowserLocation(location)
    setBrowserLat(lat)
    setBrowserLng(lng)
  }


  const devicesSpecificFunction = async () => {
    try {

      if (browserLocation == "" || !isBrowseTaskLoad) {
        if (Platform.OS == "ios") {
          Geolocation.requestAuthorization();
          autoGetLocation();
          profiledata()
        } else {

          if (await AsyncStorage.getItem("anyload") == "true" && !(await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION))) {
            profiledata()
          } else {
            console.log("permission 2---------------->")
            let a = await requestLocationPermission();
            if (a == "access") {
              autoGetLocation();
            } else {
              profiledata()
              await AsyncStorage.setItem("anyload", "true")
            }
          }
        }
      }
    } catch (error) {
      console.log("devicesSpecificFunction")
    }
  }











  useEffect(async () => {
    devicesSpecificFunction()
  }, []);



  const profiledata = async () => {
    try {
      let pdata = await AsyncStorage.getItem('@profiledata');
      let p = JSON.parse(pdata)
      // console.log("p-data----",p)
      dataSet(p.lat, p.lng, p.location)
      getBrowserData_afterGetLocation(p.lat, p.lng);
    } catch (error) {
      console.log('reload_after_comeBack', error);
    }
  };
  const getCategoryTitle = (val) => {
    let arr = filter_Categories;
    let count = 0;
    let categoryName = ""
    arr.map((item) => {
      if (item.isSelected) {
        if (count == 0) {
          categoryName = item.name;
        }
        count++;
      }
    })
    if (count == 1) {
      return categoryName;
    } else if (count > 1) {
      return `${categoryName} + ${count - 1}`
    } else if (count == 0) {
      return "All categories"
    }
  }
  const searchKeyWord = async (val) => {
    try {
      let cateIds = await getFilterCategoryIds(filter_Categories);
      const res = {
        "jsonrpc": "2.0",
        "params": {
          "keyword": `${val}`,
          "min_search_budget": isOpenOfferin_filter ? "0" : min_search_budget,
          "max_search_budget": isOpenOfferin_filter ? "0" : max_search_budget,
          "category_id": cateIds,
          "subcategory_id": browserSubcategory_id,
          "lat": browserLat,
          "lng": browserLng,
          "distance": distance,
          "type": browsertype,
          "order_by": order_by == "1" ? "1" : isOpenOfferin_filter ? "" : order_by,
          "open_offer": isOpenOfferin_filter ? "true" : "false",
          "page": "1"
        }
      }
      console.log("browse-task====> search", res)
      const data = await axiosInstance.post("browse-task", res)
      // setKeyWord(val)
      if (data) {
        setBrowserTaskFooterText("")
        setBrowsertaskCurrentPage(1)
        setBrowsertaskTotalPage(countPage(data.data.limit, data.data.total_result))
        setTaskData(data.data.tasks)
      }
    } catch (error) {
      console.log("searchKeyWord", error)
    }
  }
  const onPressSearch = () => {
    if (searchToggle == false) {
      setSearchToggle(!searchToggle)
    } else {
      setSearchToggle(!searchToggle)
      searchKeyWord("")
      getTaskForMapPage_search("")
    }
  }
  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', () => {
      Keyboard.dismiss();
    })
  }, [])
  const locationOn = () => {
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000,
    })
      .then((data) => {
        autoGetLocation()
      })
      .catch((err) => {
        profiledata()
      });
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>

        <Pressable
          onPress={onPressFilter}

          style={{
            backgroundColor: Colors.secondary,
            borderRadius: Normalize(8),
            marginHorizontal: Normalize(5),
            padding: Normalize(6),
          }}>
          <AntDesign name="filter" color={Colors.white} size={Normalize(19)} />
        </Pressable>

        {/* location */}
        {
          (browserLocation != "" && browserLat != "" && browserLng != "") &&
          <Pressable onPress={onPressFilter} style={[styles.chipContainer, { flexDirection: "row" }]}>
            <SimpleLineIcons name="location-pin" color={Colors.white} size={Normalize(15)} />

            <Fragment>
              <Text numberOfLines={1} style={[styles.chipText, { marginLeft: Normalize(5), maxWidth: Normalize(120) }]}>
                {browserLocation == "" ? "Error" : browserLocation}{" "}
              </Text>
              <Text style={[styles.chipText]}>
                + {distance}{strings.BROWSEFILTER.KM}
              </Text>
            </Fragment>
          </Pressable>}
        {/* category */}
        <Pressable onPress={onPressFilter} style={styles.chipContainer}>
          <Text style={styles.chipText}>
            {getCategoryTitle(filter_Categories)}
          </Text>
        </Pressable>

        <Pressable onPress={onPressFilter} style={styles.chipContainer}>
          <Text style={styles.chipText}>
            {browsertype == ''
              ? `${strings.BROWSEFILTER.INPERSON} &  ${strings.BROWSEFILTER.REMOTELY}`
              : browsertype == 'O'
                ? strings.BROWSEFILTER.REMOTELY
                : strings.BROWSEFILTER.INPERSON}
          </Text>
        </Pressable>
      </ScrollView>
      {
        searchToggle &&
        <View style={{
          height: Normalize(50),
          flexDirection: "row",
          marginHorizontal: Normalize(16),
          alignItems: "flex-start",
          marginTop: Normalize(8)
        }} >
          <View style={{
            flex: 1,
            borderRadius: Normalize(5),
            borderWidth: Normalize(1),
            borderColor: Colors.white,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            height: "75%",
            elevation: 3,
            backgroundColor: Colors.white
          }} >
            <TouchableOpacity
              onPress={onPressSearch}
              style={{ height: "100%", width: Normalize(35), justifyContent: "center", alignItems: "center" }} >
              <Octicons
                name="search"
                size={Normalize(16)}
                color={Colors.grey}
              />
            </TouchableOpacity>
            <View style={{ flex: 1 }} >
              <TextInput
                value={keyWord}
                underlineColorAndroid={Colors.white}
                onChangeText={(e) => {
                  setKeyWord(e);
                  searchKeyWord(e);
                  getTaskForMapPage_search(e);
                }}
                placeholder={"Search on EazyPay"}
                placeholderTextColor={Colors.lightGrey}
                style={[globalstyles.textinput_onlyText_Style, { fontSize: Normalize(12), paddingHorizontal: Normalize(8), color: Colors.primary, padding: 0 }]} />
            </View>
            {keyWord.length > 0 && <TouchableOpacity
              onPress={() => {
                setKeyWord("");
                searchKeyWord("")
                getTaskForMapPage_search("")
              }
              }
              style={{ height: "100%", width: Normalize(35), justifyContent: "center", alignItems: "center" }} >
              <Entypo
                name="cross"
                size={Normalize(18)}
                color={Colors.red_old}
              />
            </TouchableOpacity>}
          </View>
        </View>
      }
      {
        locationOnModal &&
        <Modal
          animationType="fade"
          visible={locationOnModal}
          onRequestClose={() => {
            setLocationOnModal(false)
            profiledata()
            // navigation.navigate("Filter_Location_selectPage")
          }}
          transparent
        >
          <View style={{ flex: 1, backgroundColor: "rgba(52,52,52,0.5)", justifyContent: "center", alignItems: "center" }} >
            <View style={{ paddingTop: Normalize(10), backgroundColor: Colors.white, borderRadius: Normalize(10) }}>
              {(testingText.lastupdateDate).length > 0 && <Text style={{ textAlign: "center", color: Colors.green_new, fontSize: Normalize(12), fontFamily: fontfmliy.bold }} >{testingText.lastupdateDate}</Text>}
              {(testingText.text).length > 0 && <Text style={{ textAlign: "center", color: Colors.red_old, fontSize: Normalize(12), fontFamily: fontfmliy.bold }} >{testingText.text}</Text>}
              <View style={{ alignSelf: "center", paddingVertical: Normalize(15), paddingHorizontal: Normalize(25), }} >
                <MaterialIcons
                  name="location-off"
                  size={Normalize(40)}
                  color={Colors.red_old}
                />
              </View>

              <Text numberOfLines={1} style={[globalstyles.plantext_bold, { paddingHorizontal: Normalize(25), fontSize: Normalize(14), color: Colors.greyText, textAlign: "center" }]} >Devices location not enabled</Text>
              <Text numberOfLines={2} style={[globalstyles.plantext_bold, { paddingHorizontal: Normalize(25), fontSize: Normalize(14), color: Colors.grey, textAlign: "center", paddingVertical: Normalize(15), lineHeight: Normalize(19) }]} >Please enable device location to show{"\n"}task according to your location</Text>

              <Pressable
                onPress={() => {
                  setLocationOnModal(false)
                  locationOn()
                }}
                style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", borderTopColor: Colors.lightGrey, borderTopWidth: Normalize(1) }} >
                <MaterialIcons
                  name="my-location"
                  size={Normalize(18)}
                  color={Colors.red_old}
                />
                <Text style={[globalstyles.plantext_bold, { paddingLeft: Normalize(5), fontSize: Normalize(14), color: Colors.red_old, textAlign: "center", paddingVertical: Normalize(15) }]} >Enable device location</Text>
              </Pressable>
              <Pressable onPress={() => {
                setLocationOnModal(false)
                navigation.navigate("Filter_Location_selectPage")
              }}
                style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", borderTopColor: Colors.lightGrey, borderTopWidth: Normalize(1) }} >
                <FontAwesome5
                  name="search-location"
                  size={Normalize(18)}
                  color={Colors.greylightText}
                />
                <Text style={[globalstyles.plantext_bold, { paddingLeft: Normalize(5), fontSize: Normalize(14), color: Colors.greylightText, textAlign: "center", paddingVertical: Normalize(15) }]} >Enter location manually</Text>
              </Pressable>
            </View>
            <TouchableOpacity
              onPress={() => {
                setLocationOnModal(false)
                profiledata()
                // navigation.navigate("Filter_Location_selectPage")
              }}
              style={{ height: Normalize(50), width: Normalize(50), borderRadius: Normalize(50) / 2, backgroundColor: Colors.white, elevation: 10, justifyContent: "center", alignItems: "center", marginTop: Normalize(15) }} >
              <Entypo name="cross" color={Colors.textinput_inner_text} size={Normalize(35)} />
            </TouchableOpacity>
          </View>
        </Modal>
      }
    </View >
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: Normalize(6),
    paddingBottom: Normalize(10),
    position: "absolute"
  },
  chipContainer: {
    borderRadius: Normalize(8),
    marginHorizontal: Normalize(5),
    paddingHorizontal: Normalize(10),
    paddingVertical: Normalize(3),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary
  },
  chipText: {
    fontSize: Normalize(12),
    fontFamily: fontfmliy.regular,
    color: Colors.white,
  },
});