import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';
import Header from '../../../../components/Header';
import styles from './Styles2';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import images from '../../../../constants/images';
import axios from 'axios';
import LoaderPage from '../../../../components/LoaderPage';
import { backgroundColor } from 'styled-system';
import { Colors } from '../../../../constants/colors';
import HTMLView from 'react-native-htmlview';
import strings from '../../../../constants/lng/LocalizedStrings';
import { ImageBackground } from 'react-native';
import { width } from 'styled-system';
import { axiosUrl } from '../../../../constants/LinkPage';
import axiosInstance from '../../../../constants/AxiosCallPage';
import CurveDesing_Component from '../../../../constants/CurveDesing_Component';
import Normalize from '../../../../helpers/Dimens';

export default function Help({ navigation, route }) {
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
  const { value } = route.params;
  const [text, setText] = useState("");
  const [catdata, setcatdata] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    getData()
  }, []);
  // search-help


  const getData = async () => {
    try {
      setLoader(true)
      setcatdata([])
      const data = {
        "params": {
          "slug": value.slug
        }
      }
      const res = await axiosInstance.post("get-all-sections", data)
      // console.log("**************",res.data)
      setcatdata(res.data.result.help_section_articles)
      setText(res.data.result.helpSection.help_section_to_language_api.title)
      setLoader(false)
    } catch (error) {
      setLoader(false)
      console.log("----", error)
    }
  }
  return (
    <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>

      <View style={[styles.container]}>
        <Header navigation={navigation} back name={strings.HELP.HEADER} />
        {
          loader ?
            <LoaderPage />
            :
            <CurveDesing_Component  >
            <ScrollView 
            showsVerticalScrollIndicator={false}
            >
              <View style={{ flex: 1 }}>
                <View style={{
                  flexDirection: 'column', alignSelf: 'center', width: '90%',
                  marginTop: Normalize(8)
                }}>
                  <Text style={{
                    fontSize: Normalize(18), color: Colors.primary, fontFamily: "roboto-medium", marginBottom: 20,
                  }}>{text}</Text>
                  <View>
                  {catdata.map((item, index) => (
                      <TouchableOpacity key={index} onPress={() => navigation.navigate("HelpArticleDetails", { value: item.help_articles_to_language_api })}>
                        <Text style={{
                          fontSize: Normalize(14), color: "#444", fontFamily: "roboto-medium", marginTop: 20
                        }}>{item.help_articles_to_language_api.title}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
            </ScrollView>
            </CurveDesing_Component>
        }
      </View>

    </SafeAreaView>
  );
}


