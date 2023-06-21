import { View, Text, SafeAreaView, Image, Dimensions, Pressable, BackHandler } from 'react-native';
import React, { useContext, useRef, useState } from 'react';
import { Colors } from '../../../../constants/colors';
import Header from '../../../../components/Header';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Constant_apis } from '../../../../constants/Constant_api';
import Toast from 'react-native-simple-toast';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { myContext } from '../../../../constants/ContextApi';
import { useEffect } from 'react';
import Geolocation from '@react-native-community/geolocation';
import images from '../../../../constants/images';
import Button from '../../../../components/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import axiosInstance from '../../../../constants/AxiosCallPage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { countPage } from '../../../../components/BrowserTaskPageCount';
import { fontfmliy } from '../../../../components/WhichFontFamily';

const { height, width } = Dimensions.get("window")
export default function Filter_Location_selectPage() {
  const {
    browserLocation, setBrowserLocation,
    setBrowserLat, browserLat,
    setBrowserLng, browserLng,
    tempPostLocation, setTempPostLocation, isBrowseTaskLoad,




    distance, setDistance,
    order_by, setOrder_by,
    browsertype, setBrowsertype,
    taskData, setTaskData,
    keyWord, setKeyWord,
    isOpenOfferin_filter, setIsOpenOfferin_filter,

    filter_Categories, setFilter_Categories,
    searchToggle, setSearchToggle,
    taskOrMap, setTaskOrMap,
    isAvaliable,
    setIsBrowseTaskLoad,
    browserTaskloader, setBrowserTaskloader,
    browsertaskTotalPage, setBrowsertaskTotalPage,
    browsertaskCurrentPage, setBrowsertaskCurrentPage,setBrowserTaskFooterText,setTaskDataForMap
  } = useContext(myContext);
  const navigation = useNavigation();
  const textRef = useRef();
  const [currentLocation, setCurrentLocation] = useState({
    latitude: browserLat != "" ? parseFloat(browserLat) : 1.28967,
    longitude: browserLng != "" ? parseFloat(browserLng) : 103.85007,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  const [tempLocation, setTempLocation] = useState({
    location: browserLocation,
    lat: browserLat != "" ? parseFloat(browserLat) : "",
    lng: browserLng != "" ? parseFloat(browserLng) : "",
  });
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
          // console.log(locationName);
          setCurrentLocation({
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          });
          setTempLocation({
            location: locationName,
            lat: lat,
            lng: lng,
          });
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

  useEffect(() => {

if(browserLocation!=null){
  if (browserLocation.name != "") {
    textRef.current?.setAddressText(browserLocation)
  }
}
  }, []);
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      info => {
        getCurrentLocation(
          info.coords.latitude,
          info.coords.longitude,
        );
      },
      (error) => {
        console.log("getLocation filterLocation", error)
      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    );
  };

  const autoGetLocation = () => {
    Geolocation.getCurrentPosition(
      info => {
        getLocationName(
          info.coords.latitude,
          info.coords.longitude,
        ),
          (error) => {
            console.log("<<<<<<<<<<<<", error)
          },
          { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
      });
  };

  // useEffect(() => {
  //   if (browserLocation == "") {
  //     autoGetLocation()
  //     getLocation();
  //   }
  // }, [])

  // useEffect(() => {
  //   getLocation();
  // }, []);
  const getCurrentLocation = (lat, lon) => {
    setCurrentLocation({
      latitude: lat,
      longitude: lon,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    });
  };
  const onpressSaveLocation = () => {
    if (
      tempLocation.location == '' ||
      tempLocation.lat == '' ||
      tempLocation.lng == ''
    ) {
      Toast.show('At first select a location');
    } else {


      dataSet(tempLocation.lat, tempLocation.lng, tempLocation.location)
      getBrowserData_afterGetLocation(tempLocation.lat, tempLocation.lng);
      getBrowserData_afterGetLocation_ForMapPage(tempLocation.lat, tempLocation.lng);
      navigation.goBack();
    }
  };
  const dataSet = (lat, lng, location) => {
    setBrowserLocation(location)
    setBrowserLat(lat)
    setBrowserLng(lng)
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
  const handleBackButtonClick = () => {
    if (isBrowseTaskLoad) {
      navigation.goBack()
    } else {
      profiledata()
      navigation.goBack()
    }
    return true;
  }

  const profiledata = async () => {
    try {
      let pdata = await AsyncStorage.getItem('@profiledata');
      let p = JSON.parse(pdata)
      // console.log("p-data----",p)
      dataSet(p.lat, p.lng, p.location)
      getBrowserData_afterGetLocation(p.lat, p.lng);
      getBrowserData_afterGetLocation_ForMapPage(p.lat, p.lng);

    } catch (error) {
      console.log('reload_after_comeBack', error);
    }
  };




  useEffect(() => {
    const a = BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      a.remove();
    };
  }, []);








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
          "page":"1"
        }
      }
      console.log("browse-task====> 3.1", res)
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


  const getBrowserData_afterGetLocation_ForMapPage = async (lat,lng) => {
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
                "show_available_task_only": "Y",
            }
        }
        // console.log("getTaskForMapPage====>", res)
        let data = await axiosInstance.post("browse-task-for-map", res)
        if (data.data) {
          //  console.log((data.data.tasks).length)
           setTaskDataForMap(data.data.tasks)
        }
    } catch (error) {
        setBrowserTaskloader(false)
        console.log("getBrowserData_afterGetLocation_ForMapPage", error)
    }
}

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary }}>
      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        <Header backFunc={handleBackButtonClick} navigation={navigation} back name={'Select Location'} />
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <MapView
              mapType="standard"
              region={currentLocation}
              style={{ flex: 1 }}
              onPress={e => {
                // console.log(e.nativeEvent.coordinate);
                getLocationName(
                  e.nativeEvent.coordinate.latitude,
                  e.nativeEvent.coordinate.longitude,
                );
              }}>
              {tempLocation.lat != '' && tempLocation.lng != '' && (
                <Marker
                  title={tempLocation.location}
                  coordinate={{
                    latitude: tempLocation.lat,
                    longitude: tempLocation.lng,
                  }}>
                  <Image
                    source={images.appLogo_mapMarker}
                    style={{ height: Normalize(40), width: Normalize(40) }}
                    resizeMode="contain"
                  />
                </Marker>
              )}
            </MapView>
            <Button
              onPress={onpressSaveLocation}
              nextarrow
              name={'Save'}
              arrow
              style={{
                height: Normalize(40),
                width: '90%',
                alignSelf: 'center',
                position: 'absolute',
                backgroundColor: Colors.green_new_2,
                bottom: Normalize(15),
              }}
            />
          </View>
          <View style={{ flexDirection: "row", width: "90%", alignSelf: "center", marginTop: Normalize(10), position: "absolute" }} >
            <GooglePlacesAutocomplete
              numberOfLines={2}
              placeholder={
                tempLocation.location != ''
                  ? tempLocation.location
                  : 'Search Place'
              }

              ref={textRef}
              debounce={200}
              fetchDetails
              renderRow={results => {
                return (
                  <View style={{ width: width * 0.95, backgroundColor: Colors.white, elevation: 3, borderRadius: Normalize(8), overflow: "hidden", }}  >
                    <View style={{ width: "100%", flexDirection: "row", alignItems: "center", padding: width * 0.025 }}  >
                      <Ionicons
                        name={'ios-location-sharp'}
                        color={Colors.primary}
                        size={Normalize(20)}
                      />
                      <View style={{ flex: 1 }} >
                        <Text numberOfLines={3} style={{ width: "100%", paddingHorizontal: Normalize(3) }} >{results.description}</Text>
                      </View>
                    </View>
                  </View>
                )
              }}
              renderLeftButton={() => (
                <View style={{ alignItems: "center", justifyContent: "center" }} >
                  <Ionicons
                    name={'search-sharp'}
                    color={Colors.grey}
                    size={Normalize(22)}
                  />

                </View>
              )}
              renderRightButton={() => (
                <View style={{ justifyContent: "center", alignItems: "center" }} >
                  {tempLocation.location != "" || tempPostLocation != "" ? <Pressable
                    onPress={() => {
                      setTempPostLocation("")
                      textRef.current?.setAddressText("");
                      setTempLocation({
                        location: "",
                        lat: "",
                        lng: "",
                      })
                      // setBrowserLocation("")
                      // setBrowserLat("")
                      // setBrowserLng("")


                    }}
                    style={{
                      height: Normalize(18),
                      width: Normalize(18),
                      backgroundColor: Colors.red_old,
                      borderRadius: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Entypo
                      name="cross"
                      size={Normalize(14)}
                      color={Colors.white}
                    />
                  </Pressable> : null}

                </View>
              )}

              styles={{
                container: {
                  // flex: 1,
                  backgroundColor: "pink",
                  width: "100%",
                  backgroundColor: Colors.white,
                  elevation: 3,
                  paddingHorizontal: Normalize(5),
                  borderRadius: Normalize(8),
                  // paddingBottom: Normalize(5)
                },
                textInput: {
                  borderRadius: 0,
                  height: Normalize(42),
                  overflow: "hidden",
                  margin: 0, marginBottom: 0,


                },
                row: {
                  paddingHorizontal: Normalize(10),
                  paddingVertical: Normalize(7),
                  borderBottomWidth: 0,

                },
                separator: { height: 0 },
              }}
              textInputProps={{
                placeholderTextColor: Colors.lightGrey,
                paddingHorizontal: Normalize(12),
                backgroundColor: Colors.white,
                borderColor: Colors.textinput_bottomBorder,
                fontSize: Normalize(11.5),
                color: Colors.greyText,
                fontFamily: fontfmliy.bold,
                onChangeText: (e) => { setTempPostLocation(e) }
              }}
              onPress={(data, details = null) => {
                const { lat, lng } = details.geometry.location;
                setTempLocation({
                  location: data.description,
                  lat: lat,
                  lng: lng,
                });
                setCurrentLocation({
                  latitude: lat,
                  longitude: lng,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.0121,
                });
              }}
              enablePoweredByContainer={false}
              query={{
                key: Constant_apis.Google_Location_api,
                language: 'en',
                // components: Constant_apis.Location_components,
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
