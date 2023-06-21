import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, TextInput, SafeAreaView } from 'react-native';
import Header from '../../../../components/Header';
import { useRtlContext } from 'react-native-easy-localization-and-rtl';
import images from '../../../../constants/images';
import axios from 'axios';
import LoaderPage from '../../../../components/LoaderPage';
import { Colors } from '../../../../constants/colors';
import strings from '../../../../constants/lng/LocalizedStrings';
import { axiosUrl } from '../../../../constants/LinkPage';
import Normalize from '../../../../helpers/Dimens';
import CurveDesing_Component from '../../../../constants/CurveDesing_Component';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';

export default function CommunityGuidelines({ navigation }) {
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
  const [loader, setLoader] = useState(false)
  const [data, setData] = useState({})
  useEffect(async () => {
    getData()
    return () => {
      getData()
    }
  }, []);

  const getData = async () => {
    try {
      setLoader(true)
      const data = await axios.post(`${axiosUrl.URL}community-guidelines`, {
        "X-localization": language == "pr" ? "fa" : "en"
      })
      if (data) {
        setData(data.data.result.community_guidelines)
      }
      setLoader(false)
    } catch (error) {
      setLoader(false)
      console.log(error)
    }
  }


  return (
    <>
      {
        loader ?
          <LoaderPage />
          :
          <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>

            <View style={{
              flex: 1,
              backgroundColor: Colors.primary,
            }}>
              <Header navigation={navigation} back name={strings.HELPTOPICS.CG} />

              <ScrollView
                showsVerticalScrollIndicator={false}
              >
                <View style={{ flex: 1, backgroundColor: Colors.white }}>
                  <View style={{ backgroundColor: Colors.primary, height: Normalize(140), width: '100%', flexDirection: 'row' }}>
                    <View style={{ flex: 1.2, flexDirection: 'column', justifyContent: 'space-evenly', alignItems: "center", paddingVertical:Normalize(3)}}>
                      <Text style={{ color: '#fff', fontSize: Normalize(15), fontFamily: "Outfit-SemiBold", marginBottom: Normalize(5) }}>{language == "en" ? data.title : data.title_fa}</Text>
                      <Text style={{ color: '#fff', fontSize: Normalize(10), fontFamily: 'Outfit-Regular', textAlign: "center" }}>{language == "en" ? data.description : data.description_fa}</Text>
                      <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around' }}>
                        <TouchableOpacity onPress={() => navigation.navigate("PrivacyPolicy")}>
                          <Text style={{ color: '#fff', fontSize: Normalize(10), fontFamily: 'Outfit-Medium' }}>{language == "en" ? data.btn_one_title : data.btn_one_title_fa}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("Termsandcondition")}>
                          <Text style={{ color: '#fff', fontSize: Normalize(10), fontFamily: 'Outfit-Medium' }}>{language == "en" ? data.btn_two_title : data.btn_two_title_fa}</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                      <Image
                        style={{ width: '90%', height: "90%", resizeMode: "contain" }}
                        source={images.cg}
                      />
                    </View>

                  </View>
                  <View style={{ flex: 1 }} >
                    <CurveDesing_Component  >
                      <View style={globalstyles.container_only_padding} >
                        <Text style={{
                          color: Colors.greyText, fontSize: Normalize(15), fontFamily: "Outfit-SemiBold", alignSelf: 'center', textAlign: 'center',
                          width: '50%', marginTop: Normalize(10)
                        }}>{language == "en" ? data.policy_title : data.policy_title_fa}</Text>
                        <Text style={{
                          color: Colors.greylightText, fontSize: Normalize(10), fontFamily: 'Outfit-Regular', alignSelf: 'center', textAlign: 'center',
                          width: '70%', marginTop: Normalize(5)
                        }}>{language == "en" ? data.policy_description : data.policy_description_fa}</Text>
                        <View style={{
                          flexDirection: language == "en" ? 'row' : "row-reverse",
                          marginTop: Normalize(20), justifyContent: 'space-between'
                        }}>
                          <TouchableOpacity style={{
                            flexDirection: 'column', width: '47%',
                            borderColor: Colors.primary,
                            borderWidth: Normalize(1),
                            borderRadius: Normalize(5),
                            height: Normalize(50),
                            paddingHorizontal: Normalize(3),
                            justifyContent: "space-evenly", alignItems: "center"
                          }}
                            onPress={() => navigation.navigate('CommunityGuidelinesTasker')}>
                            <Text style={{
                              fontSize: Normalize(14), color: Colors.primary, fontFamily: "Outfit-Medium"
                            }}>{language == "en" ? data.tasker_tittle : data.tasker_tittle_fa}</Text>
                            <Text style={{
                              color: Colors.primary, fontSize: Normalize(8),
                              marginBottom: 5, textAlign: "center"
                            }}>{language == "en" ? data.tasker_description : data.tasker_description_fa}</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={{
                            flexDirection: 'column', width: '47%',
                            borderColor: Colors.primary,
                            borderWidth: Normalize(1),
                            borderRadius: Normalize(5),
                            height: Normalize(50),
                            paddingHorizontal: Normalize(3),
                            justifyContent: "space-evenly", alignItems: "center"
                          }}
                            onPress={() => navigation.navigate('CommunityGuidelinesPoster')}>
                            <Text style={{
                              fontSize: Normalize(14),
                              color: Colors.primary,
                              fontFamily: "Outfit-Medium"
                            }}>{language == "en" ? data.poster_tittle : data.poster_tittle_fa}</Text>
                            <Text style={{
                              color: Colors.primary,
                              fontSize: Normalize(8),
                              textAlign: "center"
                            }}>{language == "en" ? data.poster_description : data.poster_description_fa}</Text>
                          </TouchableOpacity>

                        </View>
                        <Image
                          resizeMode="contain"
                          style={{ width: '80%', height: Normalize(45), alignSelf: 'center', marginVertical: Normalize(15) }}
                          source={images.icon_logo}
                        />
                        <Text style={{
                          color: Colors.greyText, fontSize: Normalize(15), fontFamily: "Outfit-SemiBold", alignSelf: 'center', textAlign: 'center',
                          width: '50%', marginTop: Normalize(5)
                        }}>{language == "en" ? data.values_title : data.values_title_fa}</Text>
                        <Text style={{
                          color: Colors.greylightText, fontSize: Normalize(10), fontFamily: 'Outfit-Regular', alignSelf: 'center', textAlign: 'center',
                          width: '70%', marginTop: Normalize(5)
                        }}>{language == "en" ? data.values_description : data.values_description_fa}</Text>
                        <View style={{
                          paddingHorizontal: "4%", height: Normalize(25), borderRadius: 20, alignSelf: 'center', marginTop: Normalize(10),
                          marginBottom: 50, backgroundColor: Colors.white, justifyContent: "center"
                        }}
                        // onPress={() => Linking.openURL(data.values_btn_link)}
                        >
                          <Text style={{
                            color: '#fff', fontSize: Normalize(10), fontFamily: 'Outfit-Medium', textAlign: 'center'
                          }}>                                 </Text>
                        </View>
                      </View>
                    </CurveDesing_Component>
                  </View>
                </View>
              </ScrollView>
            </View>
          </SafeAreaView>
      }
    </>
  );
}
