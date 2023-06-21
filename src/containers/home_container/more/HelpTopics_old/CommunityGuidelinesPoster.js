import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import Header from '../../../../components/Header';
import styles from './Styles2';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import images from '../../../../constants/images';
import axiosInstance from '../../../../constants/AxiosCallPage';
import LoaderPage from '../../../../components/LoaderPage';
import { Colors } from '../../../../constants/colors';
import HTMLView from 'react-native-htmlview';
import strings from '../../../../constants/lng/LocalizedStrings';
import CurveDesing_Component from '../../../../constants/CurveDesing_Component';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';

export default function CommunityGuidelines({ navigation }) {
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
  const [loader, setLoader] = useState(false)
  const [data, setData] = useState("")
  const [des, setDes] = useState("")

  useEffect(async () => {
    getData()
    return () => {
      getData()
    }
  }, []);

  const getData = async () => {
    try {
      setLoader(true)
      const data = await axiosInstance.post("community-guidelines-poster")
      if (data) {
        setData(data.data.result.community_guidelines_poster.content_details_to_language_api)
        setDes(data.data.result.community_guidelines_poster.content_details_to_language_api.description)
      }
      setLoader(false)
    } catch (error) {
      setLoader(false)
      console.log(error)
    }
  }

  const renderNode = (node, index, siblings, parent, defaultRenderer) => {
    if (node.name == 'img') {
      const { src, height } = node.attribs;
      const imageHeight = height || 300;
      return (
        <Image
          key={index}
          resizeMode={"cover"}
          style={{ width: 450, height: 200, alignSelf: 'center', margin: 10 }}
          source={{ uri: src }} />
      );
    }

  }
  const webViewStyle = StyleSheet.create({ div: { textAlign: "justify", fontSize: Normalize(12), color: "#444", fontFamily: "Outfit-Regular", } });
  return (
    <>
      {
        loader || data == "" ?
          <LoaderPage />
          :
          <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>

            <View style={styles.container}>
              <Header navigation={navigation} back name={strings.HELPTOPICS.CG} />
              <CurveDesing_Component  >
                <View style={globalstyles.container_only_padding} >

                  <ScrollView
                    showsVerticalScrollIndicator={false}
                  >
                    <View style={{ flex: 1 }}>

                      <View style={{ height: Normalize(150), width: "100%", backgroundColor: Colors.white, alignItems: "center", justifyContent: "space-evenly", marginTop: Normalize(8) }} >
                        <View style={{ height: Normalize(90), width: "100%" }} >
                          <Image
                            resizeMode="contain"
                            style={{ width: '100%', height: "100%", resizeMode: "contain" }}
                            source={images.cg_poster}
                          />
                        </View>
                        <Text style={{ color: Colors.primary, fontSize: Normalize(15), fontFamily: 'Outfit-SemiBold' }}>{data.title}</Text>
                        <Text style={{ color: Colors.primary, fontSize: Normalize(15), fontFamily: 'Outfit-SemiBold' }}>{strings.HELPTOPICS.POSTERS}</Text>
                        <TouchableOpacity style={{ backgroundColor: Colors.primary, paddingHorizontal: Normalize(8), marginTop: Normalize(3), paddingVertical: Normalize(4), borderRadius: 30 }} onPress={() => navigation.navigate('CommunityGuidelinesTasker')}>
                          <Text style={{ color: Colors.white, fontSize: Normalize(11), fontFamily: 'Outfit-Medium' }}>{language == "en" ? "View Tasker Guidelines" : "دستورالعمل های مجریان را مشاهده کنید"}</Text>
                        </TouchableOpacity>
                      </View>

                      <HTMLView
                        addLineBreaks={false}
                        value={"<div>" + des + "</div>"}
                        style={{ marginVertical: 15 }}
                        renderNode={renderNode}
                        stylesheet={webViewStyle}
                      />
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
