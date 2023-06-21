import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, TextInput, Modal, SafeAreaView, StyleSheet } from 'react-native';
import Header from '../../../../components/Header';
import styles from './Styles2';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import images from '../../../../constants/images';
import axiosInstance from '../../../../constants/AxiosCallPage';
import LoaderPage from '../../../../components/LoaderPage';
import { Colors } from '../../../../constants/colors';
import HTMLView from 'react-native-htmlview';
import strings from '../../../../constants/lng/LocalizedStrings';
import Normalize from '../../../../helpers/Dimens';
import YoutubePlayer from "react-native-youtube-iframe";
import { addCommaAndTranslateInPersian } from '../../../../constants/NumberWithCommaAndInPersian';
import { rowOrRowreverse } from '../../../../constants/RowOrRowreverse';
import CurveDesing_Component from '../../../../constants/CurveDesing_Component';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
import { fontfmliy } from '../../../../components/WhichFontFamily';
export default function AboutUs({ navigation }) {
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
  const [loader, setLoader] = useState(false)
  const [data, setData] = useState({})
  const [faq, setFaq] = useState([])
  const [image, setImage] = useState("")
  const [image2, setImage2] = useState("")
  const [videoTemp, setVideoTemp] = useState("")
  const [videoLink, setVideoLink] = useState("")
  const [user_count, setuser_count] = useState("")
  const [task_sum, settask_sum] = useState("")
  const [task_avg, settask_avg] = useState("")
  const [questionToggle, setQuestionToggle] = useState({ id: 0, expand: false })
  const [videoModal, setVideoModal] = useState(false)


  useEffect(async () => {
    getData()
    return () => {
      getData()
    }
  }, []);

  const getData = async () => {
    try {
      setLoader(true)
      const data = await axiosInstance.post("about-us")
      if (data.data.result) {
        setData(data.data.result.about_us.about_us_to_language_api)
        setImage(data.data.result.about_us.about_us_banner_image)
        setImage2(data.data.result.about_us.caption_about_image)
        setVideoTemp(data.data.result.about_us.vedio_box_image)
        setVideoLink(data.data.result.about_us.youtube_vedio_url)
        setFaq(data.data.result.faqs)
        setuser_count(data.data.result.user_count)
        settask_avg(data.data.result.task_avg)
        settask_sum(data.data.result.task_sum)
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

  const onpressVideoBox = () => {
    setVideoModal(!videoModal)
  }
  const videoLinkTrim = (val) => {
    var linkSplit = val.split("=")
    return linkSplit[1]
  }
  const ModalVideoView = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={videoModal}
        onRequestClose={() => {
          onpressVideoBox()
        }}
      >
        <View style={{ flex: 1, backgroundColor: "rgba(52,52,52,0.8)", paddingVertical: Normalize(15) }} >
          <View style={{ height: Normalize(50), width: "100%", flexDirection: language == "en" ? "row" : "row-reverse", justifyContent: "space-between", alignItems: "center", paddingHorizontal: Normalize(15) }}>
            <View style={{ flex: 1 }} />
            <TouchableOpacity activeOpacity={0.5} onPress={onpressVideoBox} style={{ height: Normalize(50), width: Normalize(50), justifyContent: "center", alignItems: "center" }} >
              <Image source={images.cross} style={{ height: Normalize(12), width: Normalize(12), resizeMode: "contain" }} />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <View style={{ height: Normalize(180), width: "100%", backgroundColor: Colors.lightGrey }}>
              <YoutubePlayer
                height={300}
                videoId={videoLinkTrim(videoLink)}
              />
            </View>
          </View>
        </View>
      </Modal>
    )
  }
  const webViewStyle = StyleSheet.create({ div: { textAlign: "justify", fontSize: Normalize(12), color: "#444", fontFamily: fontfmliy.regular, } });
  return (
    <>
      {
        loader ?
          <LoaderPage />
          :
          <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, }}>

            <View style={styles.container}>
              <Header navigation={navigation} back name={strings.HELPTOPICS.ABOUTUS} />
              <CurveDesing_Component  >
                <View style={[globalstyles.container_only_padding]} >
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom:Normalize(30)}}
                  >
                    <View style={{ flex: 1 }}>
                      <Image
                        style={{ width: '100%', height: 285, alignSelf: 'center', borderRadius: 8, marginTop: Normalize(10) }}
                        source={{ uri: "https://changicourt.com/dev/storage/app/public/about_us/" + image }}
                      />

                      <HTMLView
                        value={"<div>"+data.tagline+"</div>"}
                        style={{ marginVertical: 15 }}
                        stylesheet={webViewStyle}
                     />


                      <View style={{ flexDirection: rowOrRowreverse(language), marginVertical: 20, justifyContent: 'space-between' }}>
                        <View style={{
                          flexDirection: 'column', width: '31%', borderColor: '#ddd',
                          borderWidth: Normalize(1), borderRadius: Normalize(5), alignSelf: 'center',
                          height: Normalize(71), justifyContent: "center"
                        }}>
                          <Text style={{
                            fontSize: Normalize(13), color: '#444', alignSelf: 'center', fontFamily: fontfmliy.regular
                          }}>+{addCommaAndTranslateInPersian(user_count, language)}</Text>
                          <Text numberOfLines={2} style={{
                            color: '#666', marginHorizontal: 1, marginTop: Normalize(8), fontSize: Normalize(9), textAlign: "center",
                          }}>People using EazyPay</Text>
                        </View>
                        <View style={{
                          flexDirection: 'column', width: '31%', borderColor: '#ddd',
                          borderWidth: Normalize(1), borderRadius: Normalize(5), alignSelf: 'center',
                          height: Normalize(71), justifyContent: "center"
                        }}>
                          <Text style={{
                            fontSize: Normalize(10), color: '#444',
                            alignSelf: 'center', fontFamily: fontfmliy.regular
                          }}>+{addCommaAndTranslateInPersian(task_sum, language)} {language === "en" ? "T" : "تومان"}</Text>
                          <Text style={{
                            color: '#666', marginHorizontal: 1, marginTop: Normalize(8), fontSize: Normalize(9), textAlign: 'center',
                          }}>{language == "en" ? "Worth of jobs created" : "ارزش کارهای ایجاد شده"}</Text>
                        </View>
                        <View style={{
                          flexDirection: 'column', width: '31%', borderColor: '#ddd',
                          borderWidth: Normalize(1), borderRadius: Normalize(5), alignSelf: 'center', height: Normalize(71), justifyContent: "center"
                        }}>
                          <Text style={{
                            fontSize: Normalize(13), color: '#444',
                            alignSelf: 'center', fontFamily: fontfmliy.regular
                          }}>+{addCommaAndTranslateInPersian(task_avg, language)}</Text>
                          <Text style={{
                            color: '#666', marginHorizontal: 1, marginTop: Normalize(8), fontSize: Normalize(9), textAlign: 'center',
                          }}>{language == "en" ? "Jobs available" : "کارها/پروژه های ایجاد‌شده"}</Text>
                        </View>
                      </View>
                      <Image
                        resizeMode="contain"
                        borderRadius={Normalize(5)}
                        style={{ width: '100%', height: Normalize(100), alignSelf: 'center', resizeMode: "cover"}}
                        source={{ uri: "https://changicourt.com/dev/storage/app/public/about_us/" + image2 }}
                      />
                      <Text style={{ fontSize: Normalize(14), color: '#555', marginTop: Normalize(10), fontFamily: fontfmliy.bold }}>{data.caption_about_title}</Text>
                      <HTMLView
                        value={"<div>"+data.caption_about_description+"</div"}
                        style={{ marginVertical: Normalize(16) }}
                        stylesheet={webViewStyle}
                      />

                      <View style={{ flexDirection: 'column', marginVertical: 20 }}>

                        <View style={{
                          flexDirection: 'column', width: '100%', borderColor: '#ddd',
                          borderWidth: Normalize(1), borderRadius: Normalize(5), alignSelf: 'center'
                        }}>
                          <Text style={{
                            fontSize: Normalize(15), color: '#444', marginHorizontal: 20, marginTop: 10,
                            alignSelf: 'center', fontFamily: fontfmliy.regular
                          }}>{data.our_vision_title}</Text>

                          <Image
                            resizeMode="contain"
                            style={{ width: 80, height: 80, alignSelf: 'center' }}
                            source={images.aui}
                          />
                          <View style={{ alignItems: 'center' }}>
                            <HTMLView
                              value={"<div>"+data.our_vision_description+"</div"}
                              style={{ margin: Normalize(16) }}
                              stylesheet={webViewStyle}
                            />
                          </View>
                        </View>


                        <View style={{
                          flexDirection: 'column', width: '100%', borderColor: '#ddd',
                          borderWidth: Normalize(1), borderRadius: Normalize(5), alignSelf: 'center', marginTop: Normalize(10)
                        }}>
                          <Text style={{
                            fontSize: Normalize(15), color: '#444', marginHorizontal: 20, marginTop: 10,
                            alignSelf: 'center', fontFamily: fontfmliy.regular
                          }}>{data.our_mission_title}</Text>

                          <Image
                            resizeMode="contain"
                            style={{ width: 80, height: 80, alignSelf: 'center' }}
                            source={images.aui}
                          />
                          <View style={{ alignItems: 'center' }}>
                            <HTMLView
                              value={"<div>"+data.our_mission_description+"</div"}
                              style={{ margin: Normalize(16) }}
                              stylesheet={webViewStyle}
                            />
                          </View>
                        </View>


                        <View style={{
                          flexDirection: 'column', width: '100%', borderColor: '#ddd',
                          borderWidth: Normalize(1), borderRadius: Normalize(5), alignSelf: 'center', marginTop: Normalize(10)
                        }}>
                          <Text style={{
                            fontSize: Normalize(15), color: '#444', marginHorizontal: 20, marginTop: 10,
                            alignSelf: 'center', fontFamily: fontfmliy.regular
                          }}>{data.our_goals_title}</Text>

                          <Image
                            resizeMode="contain"
                            style={{ width: 80, height: 80, alignSelf: 'center' }}
                            source={images.aui}
                          />
                          <View style={{  }}>
                            <HTMLView
                              value={"<div>" +data.our_goals_description+"</div"}
                              style={{ margin: Normalize(16) }}
                              stylesheet={webViewStyle}
                            />
                          </View>
                        </View>

                      </View>

                      {/* ******************Video section*********** */}

                      <TouchableOpacity
                        onPress={onpressVideoBox}
                        activeOpacity={0.9} style={{ width: '100%', height: Normalize(155), alignSelf: "center", justifyContent: "center", alignItems: "center", borderRadius: Normalize(5), borderColor: '#ddd', borderWidth: Normalize(1), overflow: "hidden" }} >
                        <Image
                          source={{ uri: "https://changicourt.com/dev/storage/app/public/about_us/" + videoTemp }}
                          style={{ height: "100%", width: "100%", resizeMode: "cover", position: "absolute" }}
                        />
                        <View style={{ height: Normalize(45), width: Normalize(45), borderRadius: Normalize(50) / 2, marginBottom: Normalize(1.5) }} >
                          <Image
                            source={images.playbutton}
                            style={{ height: "100%", width: "100%", resizeMode: "contain", position: "absolute" }}
                          />
                        </View>
                      </TouchableOpacity>
                      <ModalVideoView />
                      <Text style={{ fontSize:Normalize(16), color: '#555', marginTop: Normalize(10), fontFamily: fontfmliy.regular }}>{language == "en" ? "Frequently asked questions" : "سوالات متداول"}</Text>
                      <View style={{}} >
                        {
                          faq.map((item, index) => (
                            <View key={index} >
                              <TouchableOpacity
                                onPress={() => onpressQuestion(item.id)}
                                activeOpacity={0.8}
                                style={{ flexDirection:  "row", alignItems: "center", marginTop: Normalize(10), justifyContent: "space-between", }} >
                                <Text style={{ fontSize: Normalize(13), color: Colors.primary, fontFamily: fontfmliy.regular }}>{item.faq_detail_api.question}</Text>
                                <View style={questionToggle.expand && (item.id == questionToggle.id) ? styles.arrowViewOpen : styles.arrowViewClose} >
                                  <Image source={questionToggle.expand && (item.id == questionToggle.id) ? images.downlinearrow : language == "pr" ? images.arrowleftblack : images.arrowrightblaack} style={{ height: "100%", width: "100%", resizeMode: "contain", opacity: 0.7 }} />
                                </View>
                              </TouchableOpacity>
                              {
                                questionToggle.expand && (item.id == questionToggle.id) ?
                                  <HTMLView
                                    addLineBreaks={false}
                                    value={"<div>" + item.faq_detail_api.answer + "</div>"}
                                    style={{ marginVertical: Normalize(16) }}
                                    stylesheet={webViewStyle}
                                  /> :
                                  <View style={{ marginBottom: "2%" }} />
                              }

                              {/* <Text style={{ color:'#666',marginHorizontal:10,marginTop:10,fontSize:14,marginBottom:5,fontFamily:'Outfit-Regular'}}>{item.faq_detail_api.answer}</Text> */}
                              <View style={{ height: 1, width: '100%', backgroundColor: '#e2e4e9', }}></View>
                            </View>))}

                      </View>

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
