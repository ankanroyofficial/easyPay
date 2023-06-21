import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, SafeAreaView, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Normalize from '../../../../../helpers/Dimens';
import { Colors } from '../../../../../constants/colors';
import axiosInstance from "../../../../../constants/AxiosCallPage";
import Geolocation from '@react-native-community/geolocation'
import { useNavigation } from "@react-navigation/native"
import { myContext } from '../../../../../constants/ContextApi';
import images from '../../../../../constants/images';

const { height, width } = Dimensions.get("window")
export default function ListingMapComponent() {
  const navigation = useNavigation()

  const {
    listAllServicesDataForMap,
    listing_Lat,
    listing_Lng, 
    listing_currentLocation,setListing_currentLocation,
    isListingMapLoad, setIsListingMapLoad
  } = useContext(myContext)
  useEffect(() => {
    modifyCurrentRegion()
  }, [])
  const modifyCurrentRegion = () => {
    try {
      if (!isListingMapLoad) {
        if (listing_Lat != null && listing_Lng != null) {
          setListing_currentLocation({
            latitude: parseFloat(listing_Lat),
            longitude: parseFloat(listing_Lng),
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          })
          setIsListingMapLoad(true)
        }
      }
    } catch (error) {
      console.log("modifyCurrentRegion", error)
    }
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
    setListing_currentLocation({
      latitude: lat,
      longitude: lon,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121
    })
  }
  return (
    <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>
      <View style={{
        flex: 1,
        backgroundColor: Colors.white
      }}>
        <View style={{ flex: 1 }} >
          <MapView style={{ flex: 1 }}
            showsUserLocation={true}
            followUserLocation={true}
            initialRegion={listing_currentLocation}
            region={listing_currentLocation}
          >
            {
              listAllServicesDataForMap.map((item, index) => (
                item.lat &&
                <Marker
                  key={index}
                  title={item.title}
                  coordinate={{ latitude: parseFloat(item.lat), longitude: parseFloat(item.lng) }}
                  onPress={() => navigation.navigate("ViewListing", { slugName: item.slug })}
                >
                  <Image source={images.mapMarker} style={{ height: Normalize(30), width: Normalize(30) }} resizeMode="contain" />
                </Marker>
              ))
            }
          </MapView>
        </View>
      </View >
    </SafeAreaView>
  );
}

