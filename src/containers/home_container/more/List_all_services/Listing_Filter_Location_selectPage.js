import { View, Text, SafeAreaView, Image, Dimensions, Pressable, PermissionsAndroid } from 'react-native';
import React, { useContext, useRef, useState } from 'react';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
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

// import Geolocation from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service';


import images from '../../../../constants/images';
import Button from '../../../../components/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { ActivityIndicator } from 'react-native';
import { fontfmliy } from '../../../../components/WhichFontFamily';
const { height, width } = Dimensions.get("window")
export default function Listing_Filter_Location_selectPage() {
  const {
    listing_Location, setListing_Location,
    listing_Lat, setListing_Lat,
    listing_Lng, setListing_Lng,
    listing_tempLocation, setListing_tempLocation
  } = useContext(myContext);
  const navigation = useNavigation();
  const textRef = useRef();
  const [searchingLoader, setSearchingLoader] = useState(false)
  const [currentLocation, setCurrentLocation] = useState({
    latitude: listing_Lat != "" ? listing_Lat : 1.28967,
    longitude: listing_Lng != "" ? listing_Lng : 103.85007,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  const [tempLocation, setTempLocation] = useState({
    location: listing_Location,
    lat: listing_Lat,
    lng: listing_Lng,
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
    if (listing_Location != "") {
      textRef.current?.setAddressText(listing_Location)
    }
  }, []);
  const getLocation = () => {
    setSearchingLoader(true)
    Geolocation.getCurrentPosition(
      info => {
        // console.log("getLocation>>>>>>>>",
        //   info.coords.latitude,
        //   info.coords.longitude,
        // )
        getCurrentLocation(
          info.coords.latitude,
          info.coords.longitude,
        );
        getLocationName(
          info.coords.latitude,
          info.coords.longitude,
        );
      },
      (error) => {
        console.log("111111 ---:>", error)
      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    );
    setSearchingLoader(false)
  };
  useEffect(() => {
    let runFunc = checkDevicesLocationOnOrOff()
    const willFocusSubscription = navigation.addListener('focus', () => {
      runFunc
    });
    return willFocusSubscription;
  }, []);

  const checkDevicesLocationOnOrOff = async () => {
    if (Platform.OS != "ios") {
      let a = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
      // console.log(">>>>>>>>>>>>>1111", a)
      if (a) {
        if (listing_Location == "") {
          getLocation()
        }
      } else {
        console.log("permission naoya nai")
      }

    } else {
      getLocation()

    }
  }
  const getCurrentLocation = (lat, lng) => {
    setCurrentLocation({
      latitude: lat,
      longitude: lng,
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
      setListing_Location(tempLocation.location);
      setListing_Lat(tempLocation.lat);
      setListing_Lng(tempLocation.lng);
      navigation.goBack();
    }
  };

  // console.log(searchingLoader)     

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary }}>
      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        <Header navigation={navigation} back name={'Select Location'} />
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
                  {tempLocation.location != "" || listing_tempLocation != "" ? 
                  <Pressable
                    onPress={() => {
                      setListing_tempLocation("")
                      textRef.current?.setAddressText("");
                      setTempLocation({
                        location: listing_Location,
                        lat: listing_Lat,
                        lng: listing_Lng,
                      })
                      setListing_Location("")
                      setListing_Lat("")
                      setListing_Lng("")
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
                onChangeText: (e) => { setListing_tempLocation(e) }
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
                components: Constant_apis.Location_components,
              }}
            />
          </View>

          {
            searchingLoader &&
            <View style={{
              height: Normalize(40),
              width: Normalize(40),
              borderRadius: Normalize(40) / 2,
              position: "absolute",
              left: (width / 2) - Normalize(15),
              bottom: Normalize(300),
              justifyContent: "center", alignItems: "center",
            }}>
              <ActivityIndicator size={"large"} color={Colors.primary} />
            </View>
          }

        </View>
      </View>
    </SafeAreaView>
  );
}
