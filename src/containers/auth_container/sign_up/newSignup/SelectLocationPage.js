import { View, Text, BackHandler } from 'react-native'
import React, { Fragment, useContext, useEffect, useRef, useState } from 'react'
import { Colors } from '../../../../constants/colors'
import Normalize from '../../../../helpers/Dimens';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Header from '../../../../components/Header';
import { Constant_apis } from '../../../../constants/Constant_api';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { myContext } from '../../../../constants/ContextApi';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';

// import Geolocation from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service';


import axios from 'axios';
import { fontfmliy } from '../../../../components/WhichFontFamily';
export default function SelectLocationPage() {
    const navigation = useNavigation()
    const { signupLocation, setSignupLocation,
        tempSignupLocation, setTempSignupLocation } = useContext(myContext)
    const googleRef = useRef();

    useEffect(() => {
        if (signupLocation.name != "") {
            googleRef.current?.setAddressText(signupLocation.name);
        }
    }, []);
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, []);
    const handleBackButtonClick = () => {
        navigation.goBack(null);
        return true;
    }
    const locationSave = async (data, lat, lng) => {
        setSignupLocation({
            name: data.description,
            lat: lat,
            lng: lng,
        })
        navigation.goBack();
        let signupAddress = { "name": data.description, "lat": lat, "lng": lng }
        let modifiedJson = JSON.stringify(signupAddress)
        await AsyncStorage.setItem("signupAddress", modifiedJson)
    }
    const onpressCrossButton = async () => {
        await AsyncStorage.removeItem("signupAddress")
        setTempSignupLocation("")
        googleRef.current?.setAddressText("");
        setSignupLocation({
            name: "",
            lat: "",
            lng: "",
        })
    }
    const getLocation = async () => {
        try {

            Geolocation.getCurrentPosition(
                info => {
                    console.log(info)
                    let b = JSON.stringify(info)
                    getCurrentLocation(info)
                },
                error => {
                    // console.log("ERROR===>", error)
                    getLocation_testing()
                },
                {
                    enableHighAccuracy: true,
                    timeout: 15000,
                    // maximumAge: 10000
                }
            );
        } catch (error) {
            console.log("getLocation   >", error)
        }
    };

    const getLocation_testing = async () => {
        try {

            // Toast.show("getLocation running testing")

            Geolocation.getCurrentPosition(
                info => {
                    console.log(info)
                    let b = JSON.stringify(info)
                    getCurrentLocation(info)
                },
                error => {
                    getLocation()
                    // Toast.show("getting error for don't get lat,lng new package also")
                    // console.log("ERROR===>", error)
                    // Toast.show("testing 1 2 3")
                },
                {
                    enableHighAccuracy: true,
                    timeout: 15000,
                    // maximumAge: 10000
                }
            );
        } catch (error) {
            console.log("getLocation   >", error)
        }
    };
    const getCurrentLocation = (info) => {
        getLocationName(info.coords.latitude, info.coords.longitude)
    };
    const getLocationName = async (lat, lng) => {
        try {
            const res = await axios.post(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${lat},${lng}&key=${Constant_apis.Google_Location_api}`,
            );
            if (res.data.results) {
                var locationName = res.data.results[0].formatted_address;
                if (locationName.length > 0) {
                    var locationName = res.data.results[0].formatted_address;
                    // console.log("locationName   >", locationName);
                    // console.log("lat   >", lat);
                    // console.log("lng   >", lng);

                    googleRef.current?.setAddressText(locationName)
                    setSignupLocation({
                        name: locationName,
                        lat: lat,
                        lng: lng,
                    });
                    let signupAddress = { "name": locationName, "lat": lat, "lng": lng }
                    let modifiedJson = JSON.stringify(signupAddress)
                    await AsyncStorage.setItem("signupAddress", modifiedJson)
                    setTempSignupLocation(locationName)
                }
            } else {
                Toast.show('Location error');
            }
        } catch (error) {
            console.log("getLocationName", error);
        }
    };

    const is_getLocation_load = () => {
        if (signupLocation.lat == "" && signupLocation.lng == "" && signupLocation.name == "") {
            getLocation()
        }
    }
    useEffect(() => {
        // is_getLocation_load()
        // getLocation()
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }} >
            <Header back name={"Location"} />
            <View style={{ flex: 1 }} >
                <View style={{ flexDirection: "row", width: "90%", alignSelf: "center", marginTop: Normalize(15) }} >
                    <GooglePlacesAutocomplete
                        ref={googleRef}
                        numberOfLines={2}
                        debounce={200}
                        fetchDetails
                        placeholder={
                            (signupLocation.lat == '' || signupLocation.lng == "") ? 'Search Place' : signupLocation.name}
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
                            <Fragment>
                                {(tempSignupLocation != "" || signupLocation.name != "") ?
                                    <View style={{ justifyContent: "center", alignItems: "center" }} >
                                        <Pressable
                                            onPress={onpressCrossButton}
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
                                        </Pressable>

                                    </View>
                                    : null}
                            </Fragment>
                        )}
                        renderRow={results => {
                            return (
                                <View style={{ width: Normalize(250), backgroundColor: Colors.white, elevation: 3, borderRadius: Normalize(8), overflow: "hidden", }}  >
                                    <View style={{ width: "100%", flexDirection: "row", alignItems: "center", padding: Normalize(10) }}  >
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

                            onChangeText: (e) => { setTempSignupLocation(e) }
                        }}
                        onPress={(data, details = null) => {
                            const { lat, lng } = details.geometry.location;
                            locationSave(data, lat, lng)
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
    )
}