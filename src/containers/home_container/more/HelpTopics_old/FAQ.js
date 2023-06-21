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
import { axiosUrl } from '../../../../constants/LinkPage';
import axiosInstance from '../../../../constants/AxiosCallPage';

export default function FAQ({ navigation }) {
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
  const [loader, setLoader] = useState(false)
  const [data, setData] = useState({})
  const [faq, setFaq] = useState([])
  const [image, setImage] = useState("")
  const [user_count, setuser_count] = useState("")
  const [task_sum, settask_sum] = useState("")
  const [task_avg, settask_avg] = useState("")
  const [questionToggle, setQuestionToggle] = useState({ id: 0, expand: false })

  useEffect(async () => {
    getData()
    return () => {
      getData()
    }
  }, []);

  const getData = async () => {
    try {
      setLoader(true)
      const data = await axiosInstance.post("faqs")
      if (data) {
        setFaq(data.data.result.faqs)
      }
      setLoader(false)
    } catch (error) {
      setLoader(false)
      console.log(error)
    }
  }
  const onpressQuestion = (val) => {
    if (val == questionToggle.id) {
      setQuestionToggle({ id: val, expand: !questionToggle.expand })
    } else {
      setQuestionToggle({ id: val, expand: true })
    }
  }

  return (
    <>
      {
        loader ?
          <LoaderPage />
          :
          <SafeAreaView style={{backgroundColor: Colors.primary,flex:1, flexDirection:'column'}}>

          <View style={styles.container}>
            <Header navigation={navigation} back name={strings.HELPTOPICS.FAQ} />
            <ScrollView 
            showsVerticalScrollIndicator={false}
            >
              <View style={{ flex: 1 }}>
                <Image
                  resizeMode="cover"
                  style={{ width: '100%', height: 170, alignSelf: 'center', }}
                  source={images.faq}
                />

                <Text style={{ fontSize: 20, color: '#555', marginHorizontal: 10, marginTop: 20, fontFamily: "roboto-medium", alignSelf: 'center' }}> {strings.HELPTOPICS.FAQ}</Text>

                <View style={{ height: 3, width: '10%', backgroundColor: '#e2e4e9', alignSelf: 'center', marginTop: 10 }}></View>

                {
                  faq.map((item, index) => (
                    <View key={index} >
                      <TouchableOpacity
                        onPress={() => onpressQuestion(item.id)}
                        activeOpacity={0.8} style={{ flexDirection:language=="en"? "row":"row-reverse", alignItems: "center", marginTop: 20, justifyContent: "space-between", marginHorizontal: 10, }} >
                        <Text style={{ fontSize: 15, color: Colors.primary, fontFamily: "roboto-medium" }}>{item.faq_detail_api.question}</Text>
                        {/* <Image s  /> */}
                        <View style={questionToggle.expand && (item.id == questionToggle.id) ? styles.arrowViewOpen : styles.arrowViewClose} >
                          <Image source={questionToggle.expand && (item.id == questionToggle.id) ? images.downlinearrow :  language=="pr"?  images.arrowleftblack: images.arrowrightblaack} style={{ height: "100%", width: "100%", resizeMode: "contain", opacity: 0.7 }} />

                        </View>
                      </TouchableOpacity>
                      {
                        questionToggle.expand && (item.id == questionToggle.id) ?
                          <HTMLView
                            addLineBreaks={false}
                            value={"<div>" + item.faq_detail_api.answer + "</div>"}
                            style={{ margin: 15 }}
                          /> :
                          <View style={{ marginBottom: "2%" }} />
                      }
                      {/* <Text style={{ color:'#666',marginHorizontal:10,marginTop:10,fontSize:14,marginBottom:5,fontFamily:'roboto-regular'}}>{item.faq_detail_api.answer}</Text> */}
                      <View style={{ height: 1, width: '100%', backgroundColor: '#e2e4e9' }}></View>
                    </View>))}
              </View>
            </ScrollView>
          </View>

          </SafeAreaView>
      }
    </>
  );
}
