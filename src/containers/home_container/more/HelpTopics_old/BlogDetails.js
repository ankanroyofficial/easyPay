import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Linking, Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import Header from '../../../../components/Header';
import styles from './Styles2';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import images from '../../../../constants/images';
import axiosInstance from '../../../../constants/AxiosCallPage';
import LoaderPage from '../../../../components/LoaderPage';
import { backgroundColor } from 'styled-system';
import { Colors } from '../../../../constants/colors';
import HTMLView from 'react-native-htmlview';
import strings from '../../../../constants/lng/LocalizedStrings';
import moment from 'moment';
import { questionEnglishTimeShow, questionPersianTimeShow } from '../../../../constants/DateShow';
import { rowOrRowreverse } from '../../../../constants/RowOrRowreverse';
import { axiosUrl, ImageLink } from '../../../../constants/LinkPage';
import CurveDesing_Component from '../../../../constants/CurveDesing_Component';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';



const deviceWidth = Dimensions.get("window").width

export default function BlogDetails({ navigation, route }) {
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
  const [loader, setLoader] = useState(false)
  const [data, setData] = useState("")
  const [contactus, setContactus] = useState({})
  const [similer, setSimiler] = useState([])
  const { item } = route.params;

  useEffect(async () => {
    getData()
    return () => {
      getData()
    }
  }, []);

  const getData = async () => {
    try {
      setLoader(true)
      const res = {
        "params": {
          "slug": item.slug
        }
      }
      const data = await axiosInstance.post("blog-details", res)
      if (data) {
        setData(data.data.result.blog)
        setSimiler(data.data.result.similar_blog)
        setContactus(data.data.result.contact_us)
      }
      setLoader(false)
    } catch (error) {
      setLoader(false)
      console.log(error)
    }
  }

  const renderNode = (node, index, siblings, parent, defaultRenderer) => {
    // console.log("===", node.attribs)
    if (node.name == 'img') {
      const { src, height } = node.attribs;
      const imageHeight = height || 300;
      return (
        <Image
          key={index}
          resizeMode={"contain"}
          style={{ width: 200, height: 0, alignSelf: 'center', marginTop: -100, }}
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
              <Header navigation={navigation} back name={strings.HELPTOPICS.BLOGDETAILS} />
              <CurveDesing_Component  >
                <View style={globalstyles.container_only_padding} >
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                  >
                    <View style={{ flex: 1 }}>
                      <View style={{
                        width: '100%', alignSelf: 'center'
                      }}>
                        <View style={{ width: '100%', height: Normalize(160), paddingTop: Normalize(8), backgroundColor: Colors.grayf5,borderRadius:8,overflow:"hidden" }} >
                          <Image borderRadius={8}
                            style={{ height: "100%", width: "100%", resizeMode: "stretch" }}
                            source={{ uri: item.image == null ? ImageLink.BlankBlog : ImageLink.Blog + item.image }}
                          />
                        </View>
                        <View style={{ flexDirection: language == "en" ? 'row' : "row-reverse", marginTop: 20 }}>
                          <View style={{
                            height: Normalize(12), width: Normalize(12), borderRadius: Normalize(12), backgroundColor: Colors.green2,
                            marginRight: Normalize(5), justifyContent: 'center'
                          }}>
                            <Image
                              style={{ width: "60%", height: "60%", alignSelf: 'center', resizeMode: "contain" }}
                              source={images.wuser}
                            />
                          </View>
                          <Text style={{
                            fontSize: Normalize(11.5), color: '#444',
                            alignSelf: 'center', fontFamily: "Outfit-Regular"
                          }}>Posted by : </Text>
                          <Text

                            style={{
                              fontSize: Normalize(13), color: Colors.primary,
                              alignSelf: 'center', fontFamily: "Outfit-Regular"
                            }}> {data.blog_to_language_api.author_name}</Text>

                        </View>





                        <View style={{ flexDirection: language == "en" ? 'row' : "row-reverse", marginTop: 10, marginHorizontal: 5 }}>
                          <View style={{ height:Normalize(9), width:Normalize(9), marginRight: Normalize(5) }}>
                            <Image
                              style={{ width: "100%", height: "100%", alignSelf: 'center', resizeMode: "contain" }}
                              source={images.calander}
                            />
                          </View>
                          <Text style={{
                            fontSize: Normalize(10), color: Colors.greyText,
                            alignSelf: 'center', fontFamily: "Outfit-Regular",
                          }}>
                            {moment(item.blog_to_language_api.created_at, 'YYYY-MM-DD').format('Do MMMM, YYYY')}
                          </Text>
                        </View>
                        <Text style={{
                          fontSize: Normalize(15), color: '#444', marginVertical: Normalize(10),
                          fontFamily: "Outfit-SemiBold", textAlign: language == "en" ? "left" : "right"
                        }}>{data.blog_to_language_api.title}</Text>
                        <View style={{ flexDirection: rowOrRowreverse(language), marginRight: Normalize(5), alignItems: "center" }} >
                          <View style={{ height: Normalize(11), width: Normalize(11), marginHorizontal: 5, }} >
                            <Image source={images.wrench} style={{ height: "100%", width: "100%", resizeMode: "cover" }} />
                          </View>
                          <Text style={{
                            fontSize: Normalize(11.5), color: Colors.primary,
                            fontFamily: "Outfit-Regular", textAlign: language == "en" ? "left" : "right"

                          }}>{data.get_category.blog_categories_to_language_api.title}</Text>
                        </View>
                        <View style={{ alignItems: language == "en" ? "flex-start" : "flex-end" }} >

                          <HTMLView
                            addLineBreaks={false}
                            value={"<div>"+data.blog_to_language_api.description+"</div>"}
                            style={{ marginTop: 10 }}
                            renderNode={renderNode}
                            stylesheet={webViewStyle}
                          />
                        </View>
                      </View>
                      <View style={{

                        marginVertical: Normalize(8),
                        alignItems: language == "en" ? "flex-start" : "flex-end"
                      }} >
                        <Text style={{
                          fontSize: Normalize(14),
                          color: Colors.primary,
                          fontFamily: "Outfit-Medium",
                        }}>{language == "en" ? "Similar post" : "پست مشابه"}</Text>
                      </View>



                      <View style={{ flexDirection: language == "en" ? "row" : "row-reverse", flexWrap: "wrap", justifyContent: 'space-between' }} >
                        {
                          similer.map((item, index) => (
                            <TouchableOpacity key={index}
                              onPress={() => { navigation.push('BlogDetails', { item: item }) }}
                              style={{
                                width: '46%',
                                borderWidth: Normalize(1),
                                borderColor: '#d2d7d9',
                                overflow: "hidden",
                                borderRadius: Normalize(5),

                              }}>
                              <Image
                                resizeMode="cover"
                                style={{ width: '100%', height: Normalize(100), alignSelf: 'center', backgroundColor: '#f5f5f5' }}
                                source={{ uri: item.image == null ? ImageLink.BlankBlog : ImageLink.Blog + item.image }}
                              />

                              <View style={{ padding: Normalize(5) }}>
                                <View style={{ flexDirection: language == "en" ? 'row' : "row-reverse", }} >
                                  <View style={{
                                    height: 14, width: 14, borderRadius: 13, alignSelf: 'center',
                                    marginRight: Normalize(5), justifyContent: 'center'
                                  }}>
                                    <Image
                                      resizeMode="contain"
                                      style={{ width: "100%", height: "100%", alignSelf: 'center', }}
                                      source={images.calander}
                                    />
                                  </View>
                                  <Text
                                    style={{
                                      fontSize: Normalize(11), color: '#444',
                                      alignSelf: 'center', fontFamily: "Outfit-Regular"
                                    }}>
                                    {moment(item.blog_to_language_api.created_at, 'YYYY-MM-DD').format('Do MMMM, YYYY')}
                                  </Text>
                                </View>

                                <Text
                                  numberOfLines={1}
                                  style={{
                                    fontSize: Normalize(13), color: '#444', marginVertical: Normalize(4),
                                    fontFamily: "Outfit-Medium", textAlign: language == "en" ? "left" : "right"
                                  }}>{item.blog_to_language_api.title}</Text>
                                {/* <HTMLView
                                  value={"<div>"+item.blog_to_language_api.description+"</div>"}
                                  style={{ height: 20}}
                                  stylesheet={webViewStyle}
                                /> */}
                              </View>
                            </TouchableOpacity>))}
                      </View>
                      <Text style={{
                        fontSize: Normalize(15), color: '#444', marginVertical: Normalize(8),
                        fontFamily: "Outfit-Medium", textAlign: language == "en" ? "left" : "right"
                      }}>{language == "en" ? "Follow Us" : "ما را دنبال کنید"}</Text>
                      <View style={{ flexDirection: language == "en" ? 'row' : "row-reverse",marginBottom:Normalize(8) }}>
                        <TouchableOpacity
                          onPress={() => Linking.openURL(contactus.linkedin_link)}
                        >
                          <Image
                            resizeMode="contain"
                            style={styles.iconStyle}
                            source={images.linkdin}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => Linking.openURL(contactus.facebook_link)}
                        >
                          <Image
                            resizeMode="contain"
                            style={styles.iconStyle}
                            source={images.fb}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => Linking.openURL(contactus.twitter_link)}
                        >

                          <Image
                            resizeMode="contain"
                            style={styles.iconStyle}
                            source={images.twiter}
                          />
                        </TouchableOpacity>

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
