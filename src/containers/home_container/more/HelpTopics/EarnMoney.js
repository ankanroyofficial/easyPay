import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Image, ScrollView, TextInput, Dimensions, StyleSheet } from 'react-native';
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
import { axiosUrl } from '../../../../constants/LinkPage';
import axiosInstance from '../../../../constants/AxiosCallPage';
import HTML from 'react-native-render-html';

import Normalize from './../../../../helpers/Dimens';
import CurveDesing_Component from '../../../../constants/CurveDesing_Component';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
export default function EarnMoney({ navigation }) {
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
      const data = await axiosInstance.post("earn-money")
      if (data) {
        setData(data.data.result.earn_money.content_details_to_language_api)
        // console.log(data.data.result.earn_money.content_details_to_language_api)
      }
      setLoader(false)
    } catch (error) {
      setLoader(false)
      console.log(error)
    }
  }

  const _renderNode = (node, index, siblings, parent, defaultRenderer) => {
    if (node.name === 'img') {
      const data = node.attribs;
      return (
        <View key={index} style={{ height: Normalize(200), width: (Dimensions.get("window").width) - 30 }} >
          <Image
            source={{ uri: data.src }}
            resizeMode="contain"
            style={{ height: "100%", width: "100%" }}
          />
        </View>
      );
    }
  }
  const webViewStyle = StyleSheet.create({ div: { textAlign: "justify", fontSize: Normalize(12), color: "#444", fontFamily: "Outfit-Regular", } });
  return (
    <>
      {
        loader ?
          <LoaderPage />
          :
          <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>

            <View style={styles.container}>
              <Header navigation={navigation} back name={strings.HELPTOPICS.EARNMONEY} />
              <CurveDesing_Component  >
                <View style={globalstyles.container_only_padding} >
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                  >
                    <View style={{ flex: 1 }}>
                      <HTMLView
                        addLineBreaks={false}
                        value={"<div>"+data.description+"</div>"}
                        style={{ margin: 15 }}
                        renderNode={_renderNode}
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
