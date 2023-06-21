import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, SafeAreaView, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Normalize from '../../../../helpers/Dimens';
import { Colors } from '../../../../constants/colors';
import axiosInstance from "../../../../constants/AxiosCallPage";
import Geolocation from '@react-native-community/geolocation'
import { useNavigation } from "@react-navigation/native"
import { myContext } from '../../../../constants/ContextApi';
import moment from "moment";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';

const { height, width } = Dimensions.get("window")
export default function BrowserMapComponent() {
  const navigation = useNavigation()

  const {
    browserLat,
    browserLng,
    taskData, setTaskdetailsData,
    currentLocation, setCurrentLocation,
    isBrowseMapLoad, setIsBrowseMapLoad,
    setNewOfferPageMessageArry, setNewOfferPageMessageWithTaskerArry
  } = useContext(myContext)
  // const [currentLocation, setCurrentLocation] = useState({
  //   latitude: 1.28967,
  //   longitude: 103.85007,
  //   latitudeDelta: 0.015,
  //   longitudeDelta: 0.0121
  // })

  useEffect(() => {
    modifyCurrentRegion()
  }, [])


  const modifyCurrentRegion = () => {
    try {
      if (!isBrowseMapLoad) {
        if (browserLat != null && browserLng != null) {
          setCurrentLocation({
            latitude: parseFloat(browserLat),
            longitude: parseFloat(browserLng),
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          })
          setIsBrowseMapLoad(true)
        }
      }
    } catch (error) {
      console.log("modifyCurrentRegion", error)
    }
  }



  const a = {
    latitude: browserLat != null ? parseFloat(browserLat) : 1.28967,
    longitude: browserLng != null ? parseFloat(browserLng) : 103.85007,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121
  }


  const getLocation = () => {
    Geolocation.getCurrentPosition(info => {
      getCurrentLocation(info.coords.latitude, info.coords.longitude, info.coords.accuracy)
    },
      (error) => {
        console.log("---:> mappage", error)
      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    );
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
  const englishTimeShow = (val) => {
    let dateTime = val.date + " " + val.time
    let m = moment(dateTime, "YYYY-MM-DD hh:mm:ss").format('ddd Do MMM,YY hh:mm A');
    return m;
  }
  const gototaskdetails = async (val) => {
    try {
      const res = {
        "jsonrpc": "2.0",
        "params": {
          "slug": val
        }
      }
      const data = await axiosInstance.post("get-task-details", res)

      // console.log(data.data)

      if (data.data.result) {
        
        setNewOfferPageMessageArry([])
        setNewOfferPageMessageWithTaskerArry([])


        let a = data.data.result;
        let oldTaskdata = data.data.result.task;

        oldTaskdata.lowest_offers = a.lowest_offers;
        oldTaskdata.highest_offers = a.highest_offers;
        oldTaskdata.nearbyfixeroffer = a.nearbyfixeroffer;
        oldTaskdata.recommended_fixer_sort_based_on_rating = a.recommended_fixer_sort_based_on_rating
       
       
        setTaskdetailsData(oldTaskdata)


        navigation.navigate('TaskDetails', { show: oldTaskdata })
      }
    } catch (error) {
      console.log("getData_taskdetails---------- browsermap", error)
    }
  }
  return (
    <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>
      <View style={{
        flex: 1,
        backgroundColor: Colors.white
      }}>
        <View style={{ flex: 1 }} >
          <MapView style={{ flex: 1 }}
            // onTouchEnd={(e)=>console.log(e)}
            showsUserLocation={true}
            followUserLocation={true}
            onResponderEnd={(e) => setCurrentLocation(e)}
            region={currentLocation}
            initialRegion={currentLocation}
          >
            {
              taskData.map((item, index) => (
                item.lat &&
                <Marker
                  key={index}
                  title="EazyPay"
                  coordinate={{ latitude: item.lat, longitude: item.lng }}
                >
                  <Image source={require("../../../../../assets/map.png")} style={{ height: Normalize(30), width: Normalize(30) }} resizeMode="contain" />
                  <MapView.Callout tooltip onPress={() => {
                    gototaskdetails(item.slug)
                  }}  >
                    <View style={{ backgroundColor: Colors.white, borderRadius: 10, borderColor: Colors.secondary, borderWidth: Normalize(1), overflow: "hidden" }} >
                      <View style={{ height: Normalize(75), width: width * 0.82, padding: Normalize(5) }}>
                        <View style={{ flex: 1, flexDirection: "row", }} >
                          <View style={{ flex: 3, flexDirection: "row", alignItems: "center" }} >
                            <View style={{ height: Normalize(50), width: Normalize(50), borderRadius: Normalize(50) / 2, backgroundColor: Colors.grayf5, paddingHorizontal: Normalize(5), justifyContent: "center", alignItems: "center", borderColor: Colors.secondary, borderWidth: Normalize(1) }} >
                              <FontAwesome5 name="user-alt" color={Colors.secondary} size={Normalize(22)} />
                            </View>
                            <View style={{ flex: 1, marginLeft: Normalize(5) }} >
                              <Text numberOfLines={1} style={[globalstyles.plantext_bold, { fontSize: Normalize(13), color: Colors.primary }]} >{item.title}</Text>
                              <Text numberOfLines={1} style={[globalstyles.plantext_bold, { fontSize: Normalize(12), color: Colors.grey }]} >{item.get_category.name}</Text>
                              <Text numberOfLines={1} style={[globalstyles.plantext_regular, { fontSize: Normalize(12), color: Colors.grey }]} >{item.date_type == "O" ? englishTimeShow(item) : "As soon as possible"}</Text>
                            </View>
                          </View>
                          <View style={{ paddingHorizontal: Normalize(10), justifyContent: "center", alignItems: "center", borderLeftWidth: Normalize(1), borderLeftColor: Colors.secondary }} >
                            {
                              item.budget == 0 ?
                                <Text style={[globalstyles.plantext_bold, { fontSize: Normalize(11), color: Colors.green_new, textAlign: "center" }]} >Open{"\n"}to{"\n"}Offer</Text>
                                :
                                <Text style={[globalstyles.plantext_bold, { fontSize: Normalize(11), color: Colors.secondary }]} >$ {item.budget}</Text>
                            }
                          </View>
                        </View>
                      </View>
                    </View>
                  </MapView.Callout>
                </Marker>
              ))
            }
          </MapView>
        </View>
      </View >
    </SafeAreaView>
  );
}

