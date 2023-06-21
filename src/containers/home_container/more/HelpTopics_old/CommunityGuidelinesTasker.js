import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import Header from '../../../../components/Header';
import styles from './Styles2';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import images from '../../../../constants/images';
import axiosInstance from '../../../../constants/AxiosCallPage';
import LoaderPage from '../../../../components/LoaderPage';
import { Colors } from '../../../../constants/colors';
import Normalize from '../../../../helpers/Dimens';
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
      const data = await axiosInstance.post("community-guidelines-tasker")
      if (data) {
        setData(data.data.result.community_guidelines_tasker.content_details_to_language_api)
        setDes(data.data.result.community_guidelines_tasker.content_details_to_language_api.description)
        // console.log("////////", data.data.result.community_guidelines_tasker)
      }
      setLoader(false)
    } catch (error) {
      setLoader(false)
      console.log(error)
    }
  }
  const renderNode = (node, index, siblings, parent, defaultRenderer) => {
    if (node.name === "span") {
      let a = node.attribs.style.length
      let { style } = node.attribs
      if (a >= 17) {
        if (node.name === "span") {
          if (node.children[0].children != undefined) {
            let str = node.children[0].children[0].data
            const findBigsizeTextarr = style.split('pt;')
            if (findBigsizeTextarr[0] == "font-size: 24") {
              return <Text key={index} style={{ color: Colors.primary, fontFamily: "Outfit-SemiBold", fontSize: Normalize(16) }} >{str}</Text>
            } else {
              return <Text key={index} style={{ color: Colors.primary, fontFamily: "Outfit-SemiBold", fontSize: Normalize(14.5) }} >{str}{"\n"}</Text>
            }
          }
        }
      } else {
        const arr = style.split("#")
        if (arr.length > 1) {
          if (arr[1] == "3366ff;") {
            if (node.children[0].children != undefined) {
              let str = node.children[0].children[0].data
              return <Text key={index} style={{ color: Colors.primary }} >{str}testing</Text>
            } else {
              let strr = node.children[0].data
              if (node.children[0].data == "دستورالعمل&zwnj;های انجمن") {
                return <Text key={index} style={{ color: Colors.primary }} >دستورالعمل‌های انجمن</Text>
              } else {
                return <Text key={index} style={{ color: Colors.primary }} >{strr}</Text>
              }
            }
          } else {
            if (node.children[0].children != undefined) {
              let str = node.children[0].children[0].data
              return <Text key={index} style={{ color: Colors.primary }} >{str}testing</Text>
            } else {
              let strr = node.children[0].data
              // console.log(strr)
              return <Text key={index} style={{ color: Colors.primary }} >{strr}</Text>
            }
          }
        }
      }
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
                    <View style={{ height:Normalize(150), width: "100%", backgroundColor: Colors.white, alignItems: "center", justifyContent: "space-evenly",marginTop:Normalize(8) }} >
                        <View style={{ height: Normalize(90), width: "100%" }} >
                          <Image
                            resizeMode="contain"
                            style={{ width: '100%', height: "100%", resizeMode: "contain" }}
                            source={images.cg_tasker}
                          />
                        </View>
                        <Text style={{ color: Colors.primary, fontSize: Normalize(15), fontFamily: 'Outfit-SemiBold' }}>{data.title}</Text>
                        <Text style={{ color: Colors.primary, fontSize: Normalize(15), fontFamily: 'Outfit-SemiBold' }}>{strings.HELPTOPICS.TASKERS}</Text>
                        <TouchableOpacity 
                        style={{ backgroundColor: Colors.primary, paddingHorizontal: Normalize(8), marginTop: Normalize(3), paddingVertical: Normalize(4), borderRadius: 30 }}
                        onPress={() => navigation.navigate('CommunityGuidelinesPoster')}>
                          <Text style={{ color: Colors.white, fontSize: Normalize(11), fontFamily: 'Outfit-Medium' }}>{language == "en" ? "View Poster Guidelines" : "دستور العمل های کارفرمایان را مشاهده کنید"}</Text>
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
