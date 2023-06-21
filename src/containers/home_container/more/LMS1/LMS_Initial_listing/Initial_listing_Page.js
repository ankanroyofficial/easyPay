import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  Modal,
  StyleSheet
} from 'react-native';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import Normalize from '../../../../../helpers/Dimens';
import Button from '../../../../../components/Button';
import axiosInstance from '../../../../../constants/AxiosCallPage';
import LoaderPage from '../../../../../components/LoaderPage';
import strings from '../../../../../constants/lng/LocalizedStrings';
import Header from '../../../../../components/Header';
import { Colors } from '../../../../../constants/colors';
import { leftOrRight, rowOrRowreverse } from '../../../../../constants/RowOrRowreverse';
import { myContext } from '../../../../../constants/ContextApi';
import images from '../../../../../constants/images';
import YoutubePlayer from "react-native-youtube-iframe";
import HTMLView from 'react-native-htmlview';
import { addCommaAndTranslateInPersian } from '../../../../../constants/NumberWithCommaAndInPersian';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { axiosUrl } from '../../../../../constants/LinkPage';
import Toast from 'react-native-simple-toast';
import { engToPersian } from '../../../../../constants/EnglishToPersian';
import CurveDesing_Component from '../../../../../constants/CurveDesing_Component';
import globalstyles from '../../../../../constants/globalStyles/Global_Styles';
function Initial_listing_Page({ navigation }) {
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
  const { token, setToken,
    setLMS_id,
    setLMS_category_title,
    setLMS_subcategory_title,
    setLMS_category_id,
    setLMS_subcategory_id,
    setLMS_title,
    setLMS_search_tag,
    setLMS_description,

    setLMS_package_price_1,
    setLMS_package_id_1,
    setLMS_package_name_1,
    setLMS_package_description_1,

    setLMS_package_price_2,
    setLMS_package_id_2,
    setLMS_package_name_2,
    setLMS_package_description_2,

    setLMS_package_price_3,
    setLMS_package_id_3,
    setLMS_package_name_3,
    setLMS_package_description_3,

    setLMS_package_price_4,
    setLMS_package_id_4,
    setLMS_package_name_4,
    setLMS_package_description_4,

    setLMS_package_price_5,
    setLMS_package_id_5,
    setLMS_package_name_5,
    setLMS_package_description_5,


    setLMS_type,
    setLMS_location,
    setLMS_distance,

    setLMS_lat,
    setLMS_lng,
    setLMS_avalibility,
    setLMS_message,

    setLMS_Multi_Images,
    setLMS_single_Images,
    setLMS_prev_Multi_Images,


    setOpen,
    setOpen2,
    setOpen3,
    setOpen4,
    setOpen5,
    setLMS_prev_distance
  } = useContext(myContext)
  const [loader, setLoader] = useState(false)
  const [videoModal, setVideoModal] = useState(false)
  const [faq, setFaq] = useState([])
  const [questionToggle, setQuestionToggle] = useState({ id: 0, expand: false })
  const [verifyModal, setVerifyModal] = useState(false)
  const fourArr = [
    {
      image: images.baloon,
      heading_en: "Free and simple to set up",
      heading_pr: "راه اندازی رایگان و ساده",
      subheader_en: "Set up unlimited listings in minutes and instantly put your services in the hands of 4 million customers, for free.",
      subheader_pr: "در عرض چند دقیقه بسته های پیشنهادی خود را ایجاد کنید و خدمات خود را فوراً در اختیار تمام کاربران سایت قرار دهید.",
    },
    {
      image: images.img1,
      heading_en: "Customers come to you",
      heading_pr: "مشتری ها از راه خواهند رسید",
      subheader_en: "Spend less time looking for work and more time earning. Listings are your online billboard - always on and working while you sleep.",
      subheader_pr: "با ایجاد بسته های پیشنهادی زمان کمتری را در ارتباط با جستجوی کار صرف کنید و همچنین درآمد بیشتری را نیز بدست بیاورید. بسته های پیشنهادی به نوعی بیلبورد و مغازه آنلاین شما هستند - این مغازه ها به صورت ۲۴ ساعته بازو در حال جذب مشتری هستند.",
    },
    {
      image: images.img2,
      heading_en: "You set the terms",
      heading_pr: "شرایط را شما تعیین می کنید.",
      subheader_en: "Define the scope, price and availability of your service. Confirm or reject booking requests and be paid what you are worth.",
      subheader_pr: "قیمت و بازه زمانی در دسترس بودن خدمات خود را مشخص کنید.",
    },
    {
      image: images.img3,
      heading_en: "Turn your passions into profits",
      heading_pr: "ایده های خود را به سود تبدیل می کنید",
      subheader_en: "Tradie by day, pastry chef by night? Share your hobbies and talents and boost your earning potential in ways you never thought possible.",
      subheader_pr: "معامله گر روز باشید و شیرینی پز شب!!! استعدادهای خود را به اشتراک بگذارید و درآمد بالقوه خود را افزایش دهید.",
    },
  ]
  const howitworks = [
    {
      heading_en: "Create unlimited listings",
      heading_pr: "بسته های پیشنهادی را بدون محدودیت ایجاد کنید",
      subheader_en: "Get found by millions of customers",
      subheader_pr: "هر تعداد بسته پیشنهادی که نیاز دارید ایجاد کنید ! نوع خدماتی که می خواهید ارائه دهید، بازه زمانی در دسترس بودن خدماتتان و بسته های قیمتی خود را مشخص کنید. ما برای راهنمایی و اطمینان از ایجاد بسته های پیشنهادی مورد علاقه شما در آنجا خواهیم بود.",
    },
    {
      heading_en: "Get found by millions of customers",
      heading_pr: "مشتری ها از راه خواهند رسید",
      subheader_en: "Set up as many listings as you want! Tell us the service you would like to offer, your availability and set your price packages. We will be there to guide you and ensure you create a listing customers will love.",
      subheader_pr: "مشتریان می توانند فقط با چند کلیک ساده رزرو خدمات شما را انجام دهند. بعد از رزرو یک بسته پیشنهادی توسط مشتری، یک کار/ پروژه جدید به صورت اختصاصی برای شما ایجاد می گردد و در این ارتباط به شما اطلاع داده خواهد شد. دقیقا مانند ایجاد یک کار/ پروژه کلاسیک می توانید با مشتریان خود مذاکره کنید و به تعامل برسید. همچنین می توانید در هر زمان که بخواهید در دسترس بودن خود را در بسته های پیشنهادی به روز کنید و یا یک بسته پیشنهادی را موقتاً متوقف کنید.",
    },
  ]
  const onpressVideoBox = () => {
    setVideoModal(!videoModal)
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
                // videoId={videoLinkTrim(videoLink)}
                videoId={"m3oTx5KHGls"}
              />
            </View>
          </View>
        </View>
      </Modal>
    )
  }
  useEffect(async () => {
    getFaq()
    return () => {
      getFaq()
    }
  }, []);
  const getFaq = async () => {
    try {
      // setLoader(true)
      const data = await axiosInstance.post("faqs")
      if (data) {
        setFaq(data.data.result.faqs)
      }
      // setLoader(false)
    } catch (error) {
      // setLoader(false)
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
  const createListingButton = () => {
    lms_Clean_Context()
    navigation.navigate('LMS1', { isSlug: "" })
  }
  const lms_Clean_Context = () => {
    setLMS_id("")
    setLMS_category_id("")
    setLMS_subcategory_id("")
    setLMS_category_title("")
    setLMS_subcategory_title("")
    setLMS_title("")
    setLMS_search_tag([])
    setLMS_description("")

    setLMS_package_price_1("")
    setLMS_package_id_1("")
    setLMS_package_name_1("")
    setLMS_package_description_1("")

    setLMS_package_price_2("")
    setLMS_package_id_2("")
    setLMS_package_name_2("")
    setLMS_package_description_2("")

    setLMS_package_price_3("")
    setLMS_package_id_3("")
    setLMS_package_name_3("")
    setLMS_package_description_3("")

    setLMS_package_price_4("")
    setLMS_package_id_4("")
    setLMS_package_name_4("")
    setLMS_package_description_4("")

    setLMS_package_price_5("")
    setLMS_package_id_5("")
    setLMS_package_name_5("")
    setLMS_package_description_5("")


    setLMS_type("P")
    setLMS_location("")
    setLMS_distance(20)
    setLMS_prev_distance(20)

    setLMS_lat("")
    setLMS_lng("")
    setLMS_avalibility("")
    setLMS_message("")

    setLMS_Multi_Images([])
    setLMS_single_Images("")
    setLMS_prev_Multi_Images([])

    setOpen(false)
    setOpen2(false)
    setOpen3(false)
    setOpen4(false)
    setOpen5(false)
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary }}>
      <View style={{ backgroundColor: Colors.white, flex: 1, }}>
        <Header back navigation={navigation} name={strings.LMS.CREATELISTING} />

        {
          loader ?
            <LoaderPage /> :
            <CurveDesing_Component  >
              <View style={{ flex: 1, }} >
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  style={{ flex: 1 }}>
                  <View style={{ flex: 1 }} >

                    {/* heading */}
                    <View style={{ height: Normalize(225), width: "100%", overflow: "hidden" }} >
                      <View style={{ height: Normalize(205), backgroundColor: Colors.primary, }} >
                        <View style={{ height: "35%", flexDirection: rowOrRowreverse(language), justifyContent: "space-evenly", marginVertical: "3%" }} >
                          <View style={{ height: "100%", width: "30%", borderRadius: 5, overflow: "hidden", borderColor: Colors.white, borderWidth: 2 }} >
                            <Image source={images.health4} style={{ height: "100%", width: "100%", resizeMode: "cover" }} />
                          </View>
                          <View style={{ height: "100%", width: "30%", borderRadius: 5, overflow: "hidden", borderColor: Colors.white, borderWidth: 2 }} >
                            <Image source={images.health1} style={{ height: "100%", width: "100%", resizeMode: "cover" }} />
                          </View>
                          <View style={{ height: "100%", width: "30%", borderRadius: 5, overflow: "hidden", borderColor: Colors.white, borderWidth: 2 }} >
                            <Image source={images.post_img1} style={{ height: "100%", width: "100%", resizeMode: "cover" }} />
                          </View>
                        </View>
                        <View style={{ flex: 1 }} >
                          <Text style={{
                            fontSize: Normalize(16),
                            color: Colors.white,
                            fontFamily: 'roboto-bold',
                            textAlign: "center"
                          }} >{strings.LMS.WORKLESSEARNMORE}</Text>
                          <Text style={{
                            fontSize: Normalize(12),
                            color: Colors.white,
                            fontFamily: 'roboto-regular',
                            textAlign: "center", padding: "3%"
                          }} >{strings.LMS.BEONEOFTHE}</Text>
                        </View>
                      </View>
                      <Button
                        activeOpacity={1}
                        onPress={createListingButton}
                        style={{ width: "70%", position: "absolute", bottom: 0, margin: 0, alignSelf: "center" }}
                        name={strings.LMS.CREATEMYFIRST}
                      />
                    </View>


                    <View style={{ paddingHorizontal: Normalize(15) }} >
                      {/* small heading */}
                      <View>
                        <Text style={{
                          fontSize: Normalize(12),
                          color: Colors.greyText,
                          fontFamily: 'roboto-regular',
                          textAlign: "center",
                          margin: "3%"
                        }} >{strings.LMS.BELLOWFSTBUTTON}</Text>
                        <View style={{ height: Normalize(3), width: "10%", backgroundColor: Colors.primary, alignSelf: "center" }} />
                      </View>

                      {/* four boxes */}

                      {
                        fourArr.map((item, index) => (
                          <View key={index} style={{ padding: "3%", backgroundColor: Colors.white, marginHorizontal: "4%", marginTop: "4%", borderRadius: 5, elevation: Normalize(2) }} >
                            <View style={{ height: Normalize(110), width: Normalize(190), alignSelf: "center", paddingTop: "2%" }} >
                              <Image source={item.image} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                            </View>
                            <Text style={{
                              fontSize: Normalize(14),
                              color: Colors.greyText,
                              fontFamily: language == "en" ? 'roboto-medium' : 'roboto-bold',
                              textAlign: "center",
                              margin: "3%"
                            }} >{language == "en" ? item.heading_en : item.heading_pr}</Text>
                            <Text style={{
                              fontSize: Normalize(12),
                              color: Colors.greyText,
                              fontFamily: 'roboto-regular',
                              textAlign: "center",
                              paddingBottom: "2%"
                            }} >{language == "en" ? item.subheader_en : item.subheader_pr}</Text>
                          </View>
                        ))
                      }

                      {/* heading and button  */}
                      <View style={{ paddingVertical: Normalize(10) }}  >
                        <Text style={{
                          fontSize: Normalize(14),
                          color: Colors.greyText,
                          fontFamily: 'roboto-medium',
                          textAlign: "center",
                          margin: "3%"
                        }} >{language === "en" ? "Create your first listing" : "اولین بسته پیشنهادی خود را ایجاد کنید"}</Text>
                        <Button
                          activeOpacity={1}
                          onPress={createListingButton}
                          style={{ width: "70%", alignSelf: "center" }} name={strings.LMS.CREATEYOURFIRST} />
                      </View>


                      {/* ******************Video section*********** */}

                      <TouchableOpacity
                        onPress={onpressVideoBox}
                        activeOpacity={0.9} style={{ width: '90%', height: Normalize(155), alignSelf: "center", justifyContent: "center", alignItems: "center", borderRadius: 5, borderColor: '#ddd', borderWidth: Normalize(1), overflow: "hidden" }} >
                        <Image
                          source={images.aboutusbanner}
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

                      {/* How it works */}

                      <View style={{ paddingTop: Normalize(10), marginHorizontal: "4%", margin: "3%" }}  >
                        <Text style={{
                          fontSize: Normalize(14),
                          color: Colors.greyText,
                          fontFamily: 'roboto-medium',
                          textAlign: leftOrRight(language),
                          marginBottom: Normalize(10)
                        }} >{strings.HELPTOPICS.HIW}</Text>
                        {
                          howitworks.map((item, index) => (
                            <View key={index} style={{ marginBottom: Normalize(10) }} >
                              <View style={{ flexDirection: rowOrRowreverse(language), marginBottom: Normalize(3) }} >
                                <View style={{ height: Normalize(17), width: Normalize(17), backgroundColor: Colors.green2, borderRadius: Normalize(17) / 2, justifyContent: "center", alignItems: "center" }} >
                                  <Text style={{
                                    fontSize: Normalize(11),
                                    color: Colors.white,
                                    fontFamily: 'roboto-medium',
                                  }} >{addCommaAndTranslateInPersian((index + 1), language)}</Text>
                                </View>
                                <Text style={{
                                  fontSize: Normalize(12),
                                  color: Colors.greyText,
                                  fontFamily: 'roboto-bold',
                                  marginHorizontal: Normalize(6)
                                }}>{language == "en" ? item.heading_en : item.heading_pr}</Text>
                              </View>
                              <View style={{ flexDirection: rowOrRowreverse(language) }} >
                                <View style={{ height: Normalize(17), width: Normalize(17) }} />
                                <Text style={{
                                  fontSize: Normalize(11),
                                  color: Colors.greyText,
                                  fontFamily: 'roboto-regular',
                                  marginHorizontal: Normalize(6),
                                  textAlign: leftOrRight(language)
                                }}>{language == "en" ? item.subheader_en : item.subheader_pr}</Text>
                              </View>
                            </View>
                          ))
                        }
                      </View>

                      {/* heading,subheading and button  */}
                      <View style={{ paddingBottom: Normalize(10), backgroundColor: Colors.white, paddingHorizontal: "7%", marginHorizontal: "4%", borderRadius: 5 }}  >
                        <Text style={{
                          fontSize: Normalize(14),
                          color: Colors.greyText,
                          fontFamily: 'roboto-medium',
                          textAlign: "center",
                          margin: "3%"
                        }} >{strings.LMS.YOUCANEARN}</Text>
                        <Text style={{
                          fontSize: Normalize(11),
                          color: Colors.greyText,
                          fontFamily: 'roboto-regular',
                          marginHorizontal: Normalize(15),
                          textAlign: "center"
                        }}>{strings.LMS.THEREISNOLIMIT}</Text>
                        <Button
                          activeOpacity={1}
                          onPress={createListingButton}
                          style={{ width: "75%", alignSelf: "center", marginBottom: Normalize(5), marginTop: Normalize(10) }} name={strings.LMS.CREATEMYFIRST} />
                      </View>

                      {/* small heading and sub heading */}
                      <View>
                        <Text style={{
                          fontSize: Normalize(15),
                          color: Colors.greyText,
                          fontFamily: 'roboto-bold',
                          textAlign: "center",
                          marginTop: "5%"
                        }} >{strings.LMS.WEAREHERETOHELP}</Text>

                        {
                          language == "en" ?
                            <Text style={{
                              fontSize: Normalize(12),
                              color: Colors.greyText,
                              fontFamily: 'roboto-regular',
                              textAlign: "center",
                              margin: "3%"
                            }} >Check out our Help Centre for answers to all your questions, tips and tricks for creating an awesome listing and more</Text>
                            :
                            <Text style={{
                              fontSize: Normalize(12),
                              color: Colors.greyText,
                              fontFamily: 'roboto-regular',
                              textAlign: "center",
                              margin: "3%"
                            }} >برای آشنایی با ترفندهای ایجاد یک بسته پیشنهادی و موارد دیگر، راهنمای مرکزی م را بررسی کنید.</Text>
                        }
                        <Button
                          style={{ width: "50%", alignSelf: "center", marginTop: Normalize(4), marginBottom: Normalize(10) }}
                          name={strings.LMS.HELPCENTER_2}
                          onPress={() => navigation.navigate("Help")} />
                        <View style={{ height: Normalize(3), width: "10%", backgroundColor: Colors.lightGrey, alignSelf: "center" }} />
                      </View>

                      {/* FAQ */}

                      {
                        faq.map((item, index) => (
                          <View key={index} >
                            <TouchableOpacity
                              onPress={() => onpressQuestion(item.id)}
                              activeOpacity={0.8} style={{ flexDirection: language == "en" ? "row" : "row-reverse", alignItems: "center", marginTop: 20, justifyContent: "space-between", marginHorizontal: 10, }} >
                              <Text style={{ fontSize: Normalize(12), color: Colors.primary, fontFamily: "roboto-medium" }}>{item.faq_detail_api.question}</Text>
                              {/* <Image s  /> */}
                              <View style={questionToggle.expand && (item.id == questionToggle.id) ? styles.arrowViewOpen : styles.arrowViewClose} >
                                <Image source={questionToggle.expand && (item.id == questionToggle.id) ? images.downlinearrow : language == "pr" ? images.arrowleftblack : images.arrowrightblaack} style={{ height: "100%", width: "100%", resizeMode: "contain", opacity: 0.7 }} />

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

                      {verifyModal && <VerifyModalComponent />}
                      <View style={{ height: Normalize(62) }} />

                    </View>
                  </View>
                </ScrollView>
              </View>
            </CurveDesing_Component>
        }
      </View>
    </SafeAreaView>
  );
}

export default withRtl(Initial_listing_Page);


const styles = StyleSheet.create({
  arrowViewOpen: { height: 12, width: 17 },
  arrowViewClose: { height: 17, width: 12 }
})
