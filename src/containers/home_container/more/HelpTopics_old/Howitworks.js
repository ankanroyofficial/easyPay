import React, { useState, useEffect} from 'react';
import { View, Dimensions, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import Header from '../../../../components/Header';
import { Colors } from '../../../../constants/colors';
import strings from '../../../../constants/lng/LocalizedStrings';
import LoaderPage from '../../../../components/LoaderPage';
import axios from 'axios';
import HTMLView from 'react-native-htmlview';
import CurveDesing_Component from '../../../../constants/CurveDesing_Component';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
import { axiosUrl } from '../../../../constants/LinkPage';

export default function Howitworks({ navigation }) {
  const [loader, setLoader] = useState(false)
  const [data, setData] = useState("")

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
        url: `${axiosUrl.URL}how-it-works`,
        headers: {
          'X-localization': "en"
        }
      })
      if (res.data.result) {
        setData(res.data.result.h1.description)
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
  const webViewStyle = StyleSheet.create({ div: { textAlign: "justify", fontSize: Normalize(12), color: "#444", fontFamily: "Outfit-Regular", } });
  return (
    <>
      {
        loader ?
          <LoaderPage />
          :
          <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>
            <View style={{
              flex: 1,
              backgroundColor: Colors.white,
            }}>
              <Header navigation={navigation} back name={strings.HELPTOPICS.HIW} />
              <CurveDesing_Component  >
                <View style={globalstyles.container_only_padding} >
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                  >
                    <HTMLView
                      addLineBreaks={false}
                      value={"<div>" + data + "</div>"}
                      style={{ margin: 15 }}
                      renderNode={_renderNode}
                      stylesheet={webViewStyle}
                    />
                  </ScrollView>
                </View>
              </CurveDesing_Component>
            </View>
          </SafeAreaView>
      }
    </>
  );
}