import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';
import Header from '../../../../components/Header';
import styles from './Styles';
import CustomTab from '../../../../components/CustomTabforDispute';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import { Colors } from '../../../../constants/colors';
import images from '../../../../constants/images';
import strings from '../../../../constants/lng/LocalizedStrings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment';
import { numberWithCommas, numberWithCommasinParsian } from '../../../../constants/NumberWithComma';
import { addCommaAndTranslateInPersian } from '../../../../constants/NumberWithCommaAndInPersian';
import { questionPersianTimeShow } from '../../../../constants/DateShow';
import { leftOrRight, rowOrRowreverse } from '../../../../constants/RowOrRowreverse';
import { engToPersian } from '../../../../constants/EnglishToPersian';
import { axiosUrl } from '../../../../constants/LinkPage';
import axiosInstance from '../../../../constants/AxiosCallPage';
import LoaderPage from '../../../../components/LoaderPage';
import CurveDesing_Component from '../../../../constants/CurveDesing_Component';

export default function Disputes({ navigation }) {
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
  const [activeTab, setActiveTab] = useState('Tasks');
  const [activedata, setActivedata] = useState([]);
  const [closeddata, setCloseddata] = useState([]);
  const [loader, setLoader] = useState(false)

  const handleTabChange = val => {
    setActiveTab(val);
  };


  useEffect(() => {
    getTokon()
  }, []);

  const getTokon = async () => {
    try {
      getData()
    } catch (error) {
      console.log(error)
    }
  }

  const getData = async (token) => {
    try {
      setLoader(true)
      const data = {
        "params": {
          "page": 1,
          "page1": 1
        }
      }
      const res = await axiosInstance.post("disputes", data)
      setActivedata(res.data.active_dispute),
        setCloseddata(res.data.closed_dispute)
      setLoader(false)
    } catch (error) {
      console.log("----", error)
    }
  }

  return (
    <>
      {
        loader ?
          <LoaderPage />
          :
          <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>
            <View style={styles.container}>
              <Header navigation={navigation} back name={strings.MORESCREEN.DISPUTES} />
              <CurveDesing_Component   >
                <View style={{ flex: 1, paddingHorizontal: Normalize(16) }} >
                  <CustomTab onChangeTab={handleTabChange} />
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                  >
                    <View style={{ marginBottom: Normalize(7) }}>
                      {activeTab == "Tasks" ?
                        activedata.length == 0 ?
                          <Text style={{
                            color: '#38393e', fontFamily: 'roboto-medium',
                            fontSize: Normalize(13), width: '50%', textAlign: leftOrRight(language), margin: 15
                          }}>{strings.DISPUTE.NODISPUTE}</Text> :
                          activedata.map((item, index) => (
                            <TouchableOpacity style={{
                              width: '99%',
                              alignSelf: "center",
                              paddingVertical: Normalize(8),
                              flexDirection: 'row',
                              elevation:Normalize(2),
                              borderRadius: 8,
                              backgroundColor: Colors.white,
                              marginTop: Normalize(8)
                            }}
                              key={index}
                              onPress={() =>
                                navigation.navigate('DisputesDetails', { id: item.id, slug: item.get_task.slug })
                              }
                            >
                              <View style={{ flexDirection: language === "en" ? 'row' : "row-reverse", flex: 1, alignSelf: 'center', marginHorizontal: 10 }}>
                                <View style={{ flexDirection: language === "en" ? 'row' : "row-reverse", width: '100%', }}>
                                  <View style={{ flexDirection: 'column', marginHorizontal: 15, flex: 1 }}>
                                    <View style={{ flexDirection: language === "en" ? 'row' : "row-reverse", justifyContent: 'space-between' }}>
                                      <Text
                                        numberOfLines={2}
                                        style={{
                                          // color: '#38393e',
                                          color: Colors.primary,
                                          fontFamily: 'roboto-medium',
                                          fontSize: Normalize(13), width: '50%', textAlign: leftOrRight(language),
                                        }}>
                                        {item.get_task.title}
                                      </Text>
                                      <View style={{ flexDirection: language === "en" ? 'row' : "row-reverse", alignSelf: 'center' }}>
                                        <Image style={{ width: Normalize(9), height: Normalize(9), opacity: .6, alignSelf: 'center' }}
                                          source={images.calander}
                                          resizeMode="contain" />
                                        <Text style={{
                                          color: "#818181", marginHorizontal: Normalize(5), fontFamily: 'roboto-regular', fontSize: Normalize(11),
                                          alignSelf: 'center'
                                        }}>{language == "en" ? moment(item.created_at, 'YYYY-MM-DD').format('Do MMMM, YYYY') : questionPersianTimeShow(item.created_at)}</Text>
                                      </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                      <Text numberOfLines={1} style={{
                                        color: '#818181', marginLeft: language === "en" ? 0 : 2, fontFamily: 'roboto-regular', lineHeight: 20,
                                        fontSize: 13, marginTop: 10, marginRight: language === "en" ? 0 : Normalize(5), textAlign: language === "en" ? "left" : "right"
                                      }}>
                                        {/* {item.get_poster.fname} */}
                                      </Text>
                                      <Text style={{
                                        color: "#1a3a4a", marginLeft: 10, fontFamily: 'roboto-medium', fontSize: Normalize(12),
                                        alignSelf: 'center', marginRight: 10, marginTop: 10,
                                      }}>{strings.BROWSEFILTER.TOMAN} {addCommaAndTranslateInPersian(item.amount, language)}</Text>
                                    </View>
                                  </View>
                                </View>
                              </View>
                            </TouchableOpacity>
                          ))
                        :
                        closeddata.length == 0 ?
                          <Text style={{
                            color: '#38393e', fontFamily: 'roboto-medium',
                            fontSize: Normalize(13), width: '50%', textAlign: leftOrRight(language), margin: 15
                          }}>{strings.DISPUTE.NODISPUTE}</Text> :
                          closeddata.map((item, index) => (

                            <TouchableOpacity style={{
                              width: '99%',
                              alignSelf: "center",
                              paddingVertical: Normalize(8),
                              flexDirection: 'row',
                              elevation:Normalize(2),
                              borderRadius: 8,
                              backgroundColor: Colors.white,
                              marginTop: Normalize(8)
                            }}
                              key={index}
                              onPress={() =>
                                navigation.navigate('DisputesDetails', { id: item.id, slug: item.get_task.slug })
                              }
                            >
                              <View style={{ flexDirection: language === "en" ? 'row' : "row-reverse", flex: 1, alignSelf: 'center', marginHorizontal: 10 }}>
                                <View style={{ flexDirection: language === "en" ? 'row' : "row-reverse", width: '100%', }}>

                                  <View style={{ flexDirection: 'column', marginHorizontal: 15, flex: 1 }}>
                                    <View style={{ flexDirection: language === "en" ? 'row' : "row-reverse", justifyContent: 'space-between' }}>
                                      <Text
                                        numberOfLines={2}
                                        style={{
                                          color: Colors.primary, fontFamily: 'roboto-medium',
                                          fontSize: Normalize(13), width: '50%', textAlign: leftOrRight(language)
                                        }}>
                                        {item.get_task.title}
                                      </Text>
                                      <View style={{ flexDirection: rowOrRowreverse(language), alignSelf: 'center' }}>
                                        <Image style={{ width: Normalize(9), height: Normalize(9), opacity: .6, alignSelf: 'center' }}
                                          source={images.calander}
                                          resizeMode="contain" />
                                        <Text style={{
                                          color: "#818181", marginHorizontal: 10, fontFamily: 'roboto-regular', fontSize: Normalize(11),
                                          alignSelf: 'center',
                                        }}>{language == "en" ? moment(item.created_at, 'YYYY-MM-DD').format('Do MMMM, YYYY') : questionPersianTimeShow(item.created_at)}</Text>
                                      </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                      <Text numberOfLines={1} style={{
                                        color: '#818181', marginLeft: language === "en" ? 0 : 2, fontFamily: 'roboto-regular', lineHeight: 20,
                                        fontSize: 13, marginTop: 10, marginRight: language === "en" ? 0 : Normalize(5), textAlign: language === "en" ? "left" : "right"
                                      }}>
                                        {/* {item.get_tasker.fname} */}
                                      </Text>
                                      <Text style={{
                                        color: "#1a3a4a", marginHorizontal: 10, fontFamily: 'roboto-medium', fontSize: Normalize(12),
                                        alignSelf: 'center', marginTop: 10,
                                      }}>{strings.BROWSEFILTER.TOMAN} {addCommaAndTranslateInPersian(item.amount, language)}</Text>
                                    </View>
                                  </View>
                                </View>
                              </View>
                            </TouchableOpacity>
                          ))
                      }
                    </View>
                  </ScrollView>
                </View>
              </CurveDesing_Component>
            </View>

          </SafeAreaView>
      }
    </>

  );
}

