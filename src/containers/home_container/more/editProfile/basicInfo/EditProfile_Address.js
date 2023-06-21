import { View, Text, SafeAreaView, Image } from 'react-native';
import React, { useContext, useRef, useState } from 'react';
import globalstyles from '../../../../../constants/globalStyles/Global_Styles';
import Header from '../../../../../components/Header';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Constant_apis } from '../../../../../constants/Constant_api';
import Toast from 'react-native-simple-toast';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { myContext } from '../../../../../constants/ContextApi';
import { useEffect } from 'react';
import Geolocation from '@react-native-community/geolocation';
import images from '../../../../../constants/images';
import Button from '../../../../../components/Button';
import { Colors } from '../../../../../constants/colors';
export default function EditProfile_Address() {
  const {editProfileaddress, setEditProfileaddress} = useContext(myContext);
  const navigation = useNavigation();
  const textRef = useRef();
  const [currentLocation, setCurrentLocation] = useState({
    latitude: editProfileaddress.lat != "" ? parseFloat(editProfileaddress.lat) : 1.28967,
    longitude: editProfileaddress.lng != "" ? parseFloat(editProfileaddress.lng) : 103.85007,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  const [tempLocation, setTempLocation] = useState({
    location: editProfileaddress.name,
    lat: parseFloat(editProfileaddress.lat),
    lng: parseFloat(editProfileaddress.lng),
  });
  const getLocationName = async (lat, lng) => {
    try {
      const res = await axios.post(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${lat},${lng}&key=${Constant_apis.Google_Location_api}`,
      );
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
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      info => {
        getCurrentLocation(
          info.coords.latitude,
          info.coords.longitude,
          info.coords.accuracy,
        );
      },
      error => { },
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 3600000 },
    );
  };
  useEffect(() => {

    if(editProfileaddress.lat == ""&&editProfileaddress.lng == ""){
      getLocation();
    }
  }, []);
  const getCurrentLocation = (lat, lon, accuracy) => {
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

      setEditProfileaddress({ name: tempLocation.location, lat: tempLocation.lat, lng: tempLocation.lng });
      // setLocation(tempLocation.location);
      // setLat(tempLocation.lat);
      // setLng(tempLocation.lng);
      navigation.goBack();
    }
  };


console.log(currentLocation)




  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary }}>
      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        <Header navigation={navigation} back name={'Select Location'} />
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <MapView
              mapType="standard"
              region={currentLocation}
              initialRegion={currentLocation}
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
                    style={{ height: Normalize(50), width: Normalize(50) }}
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
          <View
            style={{
              // flex: 1,
              width: '100%',
              backgroundColor: Colors.primary,
              position: 'absolute',
            }}>
            <GooglePlacesAutocomplete
              numberOfLines={2}
              placeholder={
                tempLocation.location != ''
                  ? tempLocation.location
                  : 'Search Place'
              }
              // ref={ref => {
              //   console.log(ref)
              //   ref?.setAddressText(searchKey)
              // }}
              ref={textRef}
              debounce={200}
              fetchDetails
              renderRow={results => {
                if (results.isPredefinedPlace) {
                  return (
                    <View style={{ width: '100%', flexDirection: 'row' }}>
                      <Text
                        style={{
                          fontSize: Normalize(11),
                          width: '100%',
                          paddingHorizontal: Normalize(3),
                        }}>
                        {results.description}
                      </Text>
                    </View>
                  );
                } else {
                  return (
                    <View style={{ width: '100%', flexDirection: 'row' }}>
                      <Text
                        style={{
                          fontSize: Normalize(11),
                          width: '100%',
                          paddingHorizontal: Normalize(3),
                        }}>
                        {results.description}
                      </Text>
                    </View>
                  );
                }
              }}
              styles={{
                textInput: [globalstyles.textinput_onlyBox_Style, { borderRadius: 0 }],
                row: {
                  padding: 13,
                  flexDirection: 'row',
                },
              }}
              textInputProps={{
                placeholderTextColor: Colors.textinput_inner_text,
                fontSize: Normalize(11.5),
                paddingHorizontal: Normalize(12),
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
