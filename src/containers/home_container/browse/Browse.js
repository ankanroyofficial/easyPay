import React, { useContext, useEffect } from 'react';
import { View, SafeAreaView, PermissionsAndroid } from 'react-native';
import styles from './Styles';
import { withRtl } from 'react-native-easy-localization-and-rtl';
import Header from '../../../components/BrowseHeader';
import BrowseTaskHeader from '../../../components/BrowseTaskHeader';
import strings from '../../../constants/lng/LocalizedStrings';
import { Colors } from '../../../constants/colors';
import { myContext } from '../../../constants/ContextApi';
import axiosInstance from '../../../constants/AxiosCallPage';
import Pusher from 'pusher-js';
import { LogBox } from 'react-native';
import pusherConfig from '../../../../pusher.json';
import BrowserTaskComponent from './BrowserComponent/BrowserTaskComponent';
import BrowserMapComponent from './BrowserComponent/BrowserMapComponent';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import { Constant_apis } from '../../../constants/Constant_api';
import Toast from 'react-native-simple-toast';
import { requestLocationPermission } from '../../../constants/permissions/LocationPremission';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosUrl } from '../../../constants/LinkPage';
import { countPage } from '../../../components/BrowserTaskPageCount';
import { Platform } from 'react-native';

function Browse({ navigation }) {
  const {
    browserLat, setBrowserLat,
    browserLng, setBrowserLng,
    distance, setDistance,
    order_by, setOrder_by,
    browsertype, setBrowserLocation,
    taskData, setTaskData,
    keyWord, setKeyWord,
    isOpenOfferin_filter, setIsOpenOfferin_filter,
    filter_Categories,
    searchToggle, setSearchToggle,
    taskOrMap, setTaskOrMap,
    isAvaliable,
    setIsBrowseTaskLoad, isBrowseTaskLoad,
    browserTaskloader, setBrowserTaskloader,
    browsertaskTotalPage, setBrowsertaskTotalPage,
    browsertaskCurrentPage, setBrowsertaskCurrentPage, setBrowserTaskFooterText,
    setTaskDataForMap, setRecent_notification_count,
    userId
  } = useContext(myContext)
  LogBox.ignoreLogs(['Setting a timer for a long period of time'])

  const onPressFilter = () => {
    navigation.navigate("FilterPage")
  };
  const onPressSearch = () => {
    if (searchToggle == false) {
      setSearchToggle(!searchToggle)
    } else {
      setSearchToggle(!searchToggle)
      searchKeyWord("")
      getTaskForMapPage_search("")
    }
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
  const searchKeyWord = async (val) => {
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
          "show_available_task_only": "Y",
          "page": "1"
        }
      }
      console.log("browse-task====> 1", res)
      const data = await axiosInstance.post("browse-task", res)
      setKeyWord(val)
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
  const dataSet = (lat, lng, location) => {
    setBrowserLocation(location)
    setBrowserLat(lat)
    setBrowserLng(lng)
  }

  const getLocation = () => {
    try {
      Geolocation.getCurrentPosition(
        info => {
          // console.log("***", info.coords.latitude, info.coords.longitude);

          setBrowserLat(info.coords.latitude);
          setBrowserLng(info.coords.longitude);
          getLocationName(info.coords.latitude, info.coords.longitude);
          getBrowserData_afterGetLocation(info.coords.latitude, info.coords.longitude);
          getTaskForMapPage_afterGetLocation(info.coords.latitude, info.coords.longitude);
        },
        (error) => {
          console.log("---:>", error)
        },
        { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
      )
    } catch (error) {
      console.log("=====|>", error)
      dataSet()
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
        // console.log("2 ----->",locationName);
      } else {
        dataSet()
        console.log('Location error');
      }
    } catch (error) {
      console.log(error);
    }
  };
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
      console.log("browse-task====> 3", res)
      const data = await axiosInstance.post("browse-task", res)
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
  const getTaskForMapPage_afterGetLocation = async (lat, lng) => {
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
          "show_available_task_only": "Y"
        }
      }
      // console.log("getTaskForMapPage====>", res)
      let data = await axiosInstance.post("browse-task-for-map", res)
      // console.log("onload.................", countPage(data.data.limit, data.data.total_result))
      if (data.data) {
        //  console.log((data.data.tasks).length)
        setTaskDataForMap(data.data.tasks)
      }
    } catch (error) {
      setBrowserTaskloader(false)
      console.log("getTaskForMapPage_afterGetLocation", error)
    }
  }

  useEffect(async () => {
    if (!isBrowseTaskLoad) {
      locationPermissiontaken()
    }
  }, [])




  const locationPermissiontaken = async () => {
    if(Platform.OS=="ios"){
      Geolocation.requestAuthorization();
      getLocation();
    }
  }




  const locationPermissiontaken1 = async () => {
    if (await AsyncStorage.getItem("anyload") == "true" && !(await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION))) {
      isLocationPermission("false")
    } else {
      console.log("permission 1---------------->")
      let a = await requestLocationPermission();
      isLocationPermission(a)
    }
  }
  const isLocationPermission = async (val) => {
    if (val == "access") {
      getLocation();
    } else {
      await AsyncStorage.setItem("anyload", "true")
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
      // console.log("onload.................", countPage(data.data.limit, data.data.total_result))
      if (data.data) {
        //  console.log((data.data.tasks).length)
        setTaskDataForMap(data.data.tasks)
      }
    } catch (error) {
      setBrowserTaskloader(false)
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
        //  console.log((data.data.tasks).length)
        setTaskDataForMap(data.data.tasks)
      }
    } catch (error) {
      setBrowserTaskloader(false)
      console.log("getTaskForMapPage_search", error)
    }
  }


  return (
    <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>
      <View style={styles.container}>
        <Header
          onPressSearch={onPressSearch}
          name={strings.BROWSE.HEADERTEXT} />
        {/* task cards */}
        <View style={{ flex: 1 }} >
          <View style={{ flex: 1 }}>
            {
              taskOrMap ?
                <BrowserTaskComponent />
                :
                <BrowserMapComponent />
            }
            <BrowseTaskHeader
              onPressFilter={onPressFilter} />
          </View>
        </View>
      </View>
    </SafeAreaView >
  );
}

export default withRtl(Browse);