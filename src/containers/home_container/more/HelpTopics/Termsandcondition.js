import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, TextInput, SafeAreaView, Dimensions, StyleSheet, BackHandler } from 'react-native';
import Header from '../../../../components/Header';
import styles from './Styles2';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import images from '../../../../constants/images';
import axios from 'axios';
import NewLoaderPage from '../../../../components/NewLoaderPage';
import { backgroundColor } from 'styled-system';
import { Colors } from '../../../../constants/colors';
import HTMLView from 'react-native-htmlview';
import strings from '../../../../constants/lng/LocalizedStrings';
import { axiosUrl } from '../../../../constants/LinkPage';
import axiosInstance from '../../../../constants/AxiosCallPage';
import Normalize from './../../../../helpers/Dimens';
import CurveDesing_Component from '../../../../constants/CurveDesing_Component';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
import Header_Transparent from '../../../../components/Header_Transparent';
import { myContext } from '../../../../constants/ContextApi';
import { useNavigation } from '@react-navigation/native';
import LoaderPage from '../../../../components/LoaderPage';
import { fontfmliy } from '../../../../components/WhichFontFamily';
export default function Termsandcondition(props) {
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
  const navigation = useNavigation()
  const { setTermAndCoModal } = useContext(myContext)
  const [loader, setLoader] = useState(false)
  const [data, setData] = useState("")

  const fromwhere = props.route.params
  // console.log(fromwhere);

  useEffect(async () => {
    getData()
    return () => {
      getData()
    }
  }, []);

  const getData = async () => {
    try {
      setLoader(true)
      // const data = await axiosInstance.post("terms-of-service")

      const data = await axios({
        method: 'post', //you can set what request you want to be
        url: `${axiosUrl.URL}terms-of-service`,
        headers: {
          'X-localization': language === "en" ? "en" : 'fa'
        }
      })
      if (data.data.result) {
        setData(data.data.result.terms_of_services.content_details_to_language_api)
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
        loader ?
          // <NewLoaderPage />
<LoaderPage/>
          :
          <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1 }}>

            <View style={styles.container}>
              {/* <Header navigation={navigation} back name={strings.HELPTOPICS.TANDC2} /> */}
              <CurveDesing_Component>

                <View style={globalstyles.container} >

                  <ScrollView
                    showsVerticalScrollIndicator={false}
                  >
                    <Header_Transparent iswhitebackground backFunc={ismodalOpenOngoBack} />
                    <View style={{ flex: 1 }}>
                      <HTMLView
                        addLineBreaks={false}
                        value={"<div>" + data.description + "</div>"}
                        style={{ margin: 15, }}
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
