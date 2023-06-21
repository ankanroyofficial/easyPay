import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView, StyleSheet, Dimensions, BackHandler } from 'react-native';
import Header from '../../../../components/Header';
import styles from './Styles2';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import images from '../../../../constants/images';
import axiosInstance from '../../../../constants/AxiosCallPage';
import NewLoaderPage from '../../../../components/NewLoaderPage';
import HTMLView from 'react-native-htmlview';
import { axiosUrl } from '../../../../constants/LinkPage';
import axios from 'axios';
import Normalize from './../../../../helpers/Dimens';
import CurveDesing_Component from '../../../../constants/CurveDesing_Component';
import Header_Transparent from '../../../../components/Header_Transparent';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
import { Colors } from '../../../../constants/colors';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { myContext } from '../../../../constants/ContextApi';
import { fontfmliy } from '../../../../components/WhichFontFamily';
export default function PrivacyPolicy(props) {

  const navigation = useNavigation()
  const { setTermAndCoModal } = useContext(myContext)
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
  const [loader, setLoader] = useState(false)
  const [data, setData] = useState("")

  const fromwhere = props.route.params

  useEffect(async () => {
    getData()
    return () => {
      getData()
    }
  }, []);

  const getData = async () => {
    try {
      setLoader(true)
      const res = await axios({
        method: 'post',
        url: `${axiosUrl.URL}privacy-policy`,
        headers: {
          'X-localization': language === "en" ? "en" : 'fa'
        }
      })

      if (res.data.result) {
        setData(res.data.result.privacy_policy.content_details_to_language_api.description)
      }
      setLoader(false)
    } catch (error) {
      setLoader(false)
      console.log("getData", error)
    }
  }
  const _renderNode = (node, index, siblings, parent, defaultRenderer) => {
    if (node.name === 'img') {
      const data = node.attribs;
      return (
        <View
          key={index}
          style={{ height: Normalize(200), width: (Dimensions.get("window").width) - 30 }} >
          <Image
            source={{ uri: data.src }}
            resizeMode="contain"
            style={{ height: "100%", width: "100%" }}
          />
        </View>
      );
    }
  }

  const webViewStyle = StyleSheet.create({ div: { textAlign: "justify", fontSize: Normalize(12), color: "#444", fontFamily: fontfmliy.regular, } });

  const ismodalOpenOngoBack = () => {
    if (fromwhere == undefined) {
      navigation.goBack()
    } else {
      navigation.goBack()
      setTermAndCoModal(true)
    }
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);
  const handleBackButtonClick = () => {
    ismodalOpenOngoBack()
    return true;
  }


  return (
    <>
      {
        loader || data.length == 0 ?
          <NewLoaderPage />
          :
          <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>
            <View style={styles.container}>
              <View style={globalstyles.container} >
                <ScrollView
                  showsVerticalScrollIndicator={false}
                >
                  <View style={{ flex: 1 }}>
                    <Header_Transparent iswhitebackground backFunc={ismodalOpenOngoBack} />
                    <HTMLView
                      addLineBreaks={false}
                      stylesheet={webViewStyle}
                      value={"<div>" + data + "</div>"}
                      style={{ margin: 15 }}
                      renderNode={_renderNode}
                    />
                  </View>
                </ScrollView>
              </View>
            </View>

          </SafeAreaView>
      }
    </>
  );
}