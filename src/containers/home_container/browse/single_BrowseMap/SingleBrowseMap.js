import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, Modal, TextInput } from 'react-native';
import styles from './Styles';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import strings from '../../../../constants/lng/LocalizedStrings';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Normalize from './../../../../helpers/Dimens';
import { Colors } from '../../../../constants/colors';
import { useNavigation } from "@react-navigation/native"
import { nameShorting } from '../../../../constants/NameShorting';
import moment from "moment";
import { addCommaAndTranslateInPersian } from '../../../../constants/NumberWithCommaAndInPersian';
import { ImageLink } from '../../../../constants/LinkPage';
import Header from '../../../../components/Header';
import { numberWithCommas } from '../../../../constants/NumberWithComma';
export default function SingleBrowseMap({ route }) {
  const navigation = useNavigation()

  const { lat, lng, slug, item } = route.params;
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
  const a = {
    latitude: lat,
    longitude: lng,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121
  }
  const questionEnglishTimeShow = (val) => {
    const a = moment(val, "YYYY-MM-DD").format("Do MMM YYYY")
    const final_time = a
    return final_time
  }
   return (
    <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>
      <Header name={item.title} navigation={navigation} back />
      <View style={styles.container}>
        <MapView style={{ flex: 1 }}
          region={a}
        >
          <Marker
            title="EazyPay"
            coordinate={{ latitude: item.lat, longitude: item.lng }}
          //  calloutOffset={{ x: 8, y: 10 }}
          //  calloutAnchor={{ x: 0.5, y: 0.2 }}
          >
            <Image source={require("../../../../../assets/map.png")} style={{ height: Normalize(50), width: Normalize(50) }} resizeMode="contain" />
            <MapView.Callout tooltip onPress={() => {
              navigation.goBack()
            }}  >
              <View style={{ padding: Normalize(5), backgroundColor: Colors.white, borderRadius: 5, borderColor: Colors.primary, borderWidth: Normalize(1) }} >
                <View style={{ height: Normalize(125), width: Normalize(180) }}>
                  <View style={{ flex: 1, flexDirection: language == "en" ? "row" : "row-reverse" }} >
                    <Text><Image style={{ height: Normalize(33), width: Normalize(33) }} borderRadius={Normalize(33) / 2} source={{ uri: item.get_user.profile_picture ? `${ImageLink.ProfilePhoto}${item.get_user.profile_picture}` : ImageLink.BlankProfileImage }} resizeMode="cover" /></Text>
                    <View style={{ flex: 0.8, justifyContent: "center", paddingHorizontal: Normalize(8), marginTop: Normalize(10) }} >
                    {
                                item.budget <= 0 ?
                                  <Text style={{ fontSize: Normalize(12), color: Colors.green_new_2, fontFamily: "Outfit-Medium", textAlign: language == "en" ? "left" : "right", }}>Open offer</Text>
                                  :
                                  <Text style={{ fontSize: Normalize(12), color: Colors.primary, fontFamily: "Outfit-Medium", textAlign: language == "en" ? "left" : "right", }}>
                                    {strings.BROWSEFILTER.TOMAN} {numberWithCommas(item.budget)}
                                  </Text>
                              }
                    </View>
                  </View>
                  <View style={{ flex: 1, justifyContent: "space-evenly" }} >
                    <Text numberOfLines={language == "en" ? 1 : 2} style={{ fontSize: Normalize(11.5), fontFamily: "Outfit-Medium", color: Colors.secondary,  textDecorationLine: "underline", textAlign: language == "en" ? "left" : "right" }} >
                      {item.title}
                    </Text>
                    {item.date &&
                      <View style={{ flexDirection: language == "en" ? "row" : "row-reverse" }} >
                        <Text style={{ fontSize: Normalize(10), fontFamily: "Outfit-Medium", color: Colors.greyText,  textAlign: "right" }} >
                          {strings.BROWSEFILTER.DUEDATE}{" "}
                        </Text>
                        <Text style={{ fontSize: Normalize(10), fontFamily: "Outfit-Medium", color: Colors.greyText,  textAlign: "right" }} >
                          {questionEnglishTimeShow(item.date)}
                        </Text>
                      </View>
                    }
                    <View style={{ flexDirection: language == "en" ? "row" : "row-reverse" }}>
                      <Text numberOfLines={language == "en" ? 1 : 2} style={{ fontSize: Normalize(10), fontFamily: "Outfit-Medium", color: Colors.greyText }} >
                        {strings.BROWSEFILTER.POSTEDBY}
                      </Text>
                      <Text numberOfLines={language == "en" ? 1 : 2} style={{ fontSize: Normalize(11), fontFamily: "Outfit-Medium", color: Colors.primary,  paddingHorizontal: Normalize(2), textAlign: language == "en" ? "left" : "right" }} >
                        {nameShorting(item.get_user.fname + " " + item.get_user.lname)}
                      </Text>
                    </View>

                  </View>
                  <TouchableOpacity underlayColor='#dddddd' style={{ height: "20%", width: "75%", backgroundColor: Colors.primary, alignSelf: "center", borderRadius: 5, marginVertical: Normalize(3), justifyContent: "center", alignItems: "center" }} >
                    <Text style={{
                      fontSize: Normalize(12),
                      fontFamily: "Outfit-Medium",
                      color: Colors.white,
                    }}>{strings.BROWSEFILTER.VIEWTASK}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </MapView.Callout>
          </Marker>
        </MapView>
      </View >
    </SafeAreaView>
  );
}
