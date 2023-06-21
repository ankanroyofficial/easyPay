import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  Modal,
  StyleSheet,
  Linking,
  ImageBackground
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
import { axiosUrl, ImageLink } from '../../../../../constants/LinkPage';
import Toast from 'react-native-simple-toast';
import { engToPersian } from '../../../../../constants/EnglishToPersian';
function Initial_listing_Page({ navigation }) {
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
  const { token, setPh_email_verify,
    phone_number, setPhone_numbe,
    email_Address, setEmail_Address
  } = useContext(myContext)
  const [loader, setLoader] = useState(false)
  const [videoModal, setVideoModal] = useState(false)
  const [faq, setFaq] = useState([])
  const [questionToggle, setQuestionToggle] = useState({ id: 0, expand: false })
  const [isPhVerify, setIsPhVerify] = useState("N")
  const [isEmailVerify, setIsEmailVerify] = useState("N")
  const [verifyModal, setVerifyModal] = useState(false)
  // const [phone_number, setPhone_numbe] = useState({ isActive: false, activeTitle: "" })
  // const [email_Address, setEmail_Address] = useState({ isActive: false, activeTitle: "" })

  const [listPage_Details, setListPage_Details] = useState({})

  const pageDetails = [
    {
      id: 1,
      title: strings.MAKEANOFFER.VERIFYAMOBILENUMBER,
      BoxVerifiedTitle: phone_number.activeTitle,
      BoxUnverifiedTitle: strings.MAKEANOFFER.VERIFYYOURPHONENUMBER,
      isActive: phone_number.isActive,
      onPress: () => onPressPhone_number(),
    },
    {
      id: 2,
      title: strings.MAKEANOFFER.VERIFYAEMAILADDRESS,
      BoxVerifiedTitle: email_Address.activeTitle,
      BoxUnverifiedTitle: strings.MAKEANOFFER.VERIFYYOUREMAILADDRESS,
      isActive: email_Address.isActive,
      onPress: () => onPressEmail_Address(),
    }
  ]


  const howitworks = [
    {
      heading: listPage_Details.how_it_work_one_title,
      subheader: listPage_Details.how_it_work_one_desc,
    },
    {
      heading: listPage_Details.how_it_work_two_title,
      subheader: listPage_Details.how_it_work_two_desc
    },
  ]

  const getPageDetail = async () => {
    try {
      const res = await axiosInstance.post("listing-contents-details")
      // console.log(res.data)
      if (res.data.listing) {
        setListPage_Details(res.data.listing)
      }
      // console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  const onpressVideoBox = () => {
    setVideoModal(!videoModal)
  }
  const videoLinkTrim = (val) => {
    var linkSplit = val.split("=")
    return linkSplit[1]
  }
  useEffect(async () => {
    getFaq()
    getPageDetail()
  }, []);
  const getFaq = async () => {
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
  const onPressPhone_number = async (val) => {
    try {
      if (phone_number.activeTitle === "") {
        onpressVerify()
        navigation.navigate("BasicInfo",{fixerOredit: "Fixer" })
      } else {
        const res = await axiosInstance.post("get-phone-otp")
        if (res.data.result.error) {
          Toast.show(res.data.result.error.meaning)
        } else {
          const otp = res.data.result.otp
          Toast.show(res.data.result.success.meaning)
          onpressVerify()
          navigation.navigate("PhoneVerifyPage", { otp: otp, phoneNumber: phone_number.activeTitle })
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  const onPressEmail_Address = async () => {
    try {
      const res = await axiosInstance.post("get-email-otp")
      if (res.data.result.error) {
        Toast.show(res.data.result.error.meaning)
      } else {
        const otp = res.data.result.otp
        Toast.show(res.data.result.success.meaning)
        onpressVerify()
        navigation.navigate("EmailVerifyPage", { otp: otp, email: email_Address.activeTitle })
      }
    } catch (error) {
      console.log(error)
    }
  }
  const onpressVerify = () => {
    setVerifyModal(!verifyModal)
  }
  const verifyData = async () => {
    try {

      let slug = await AsyncStorage.getItem("slug");
      const data = await axios.post(`${axiosUrl.URL}public-profile`, {
        "jsonrpc": "2.0",
        "params": {
          "slug": `${slug}`
        }
      })
      if (data.data.result) {
        const res = data.data.result.user
        storeProfileData(data.data.result.user)
        setIsPhVerify(res.is_phone_verified)
        setIsEmailVerify(res.is_email_verified)
        if (res.phone !== null && res.email !== null) {
          if (res.is_phone_verified != "N") {
            language == "en" ? setPhone_numbe({ isActive: true, activeTitle: res.phone }) : setPhone_numbe({ isActive: true, activeTitle: engToPersian(res.phone) })
          } else {
            language == "en" ? setPhone_numbe({ isActive: false, activeTitle: res.phone }) : setPhone_numbe({ isActive: false, activeTitle: engToPersian(res.phone) })
          }
          if (res.is_email_verified != "N") {
            setEmail_Address({ isActive: true, activeTitle: res.email })
          } else {
            setEmail_Address({ isActive: false, activeTitle: res.email })
          }
        } else {
          if (res.phone !== null) {
            if (res.is_phone_verified != "N") {
              language == "en" ?
                setPhone_numbe({ isActive: true, activeTitle: res.phone })
                :
                setPhone_numbe({ isActive: true, activeTitle: engToPersian(res.phone) })
            } else {
              language == "en" ?
                setPhone_numbe({ isActive: false, activeTitle: res.phone })
                :
                setPhone_numbe({ isActive: false, activeTitle: engToPersian(res.phone) })
            }
          } else {
            setPhone_numbe({ isActive: false, activeTitle: "" })
          }
          if (res.is_email_verified != "N") {
            setEmail_Address({ isActive: true, activeTitle: res.email })
          } else {
            setEmail_Address({ isActive: false, activeTitle: res.email })
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  const storeProfileData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@profiledata', jsonValue)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    verifyData()
    const willFocusSubscription = navigation.addListener('focus', () => {
      verifyData()
    });
    return willFocusSubscription;
  }, []);
  const checkIsVerify = () => {
    if (isPhVerify == "N" || isEmailVerify == "N") {
      return false
    } else {
      return true
    }
  }
  const VerifyModalComponent = () => {
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={verifyModal}
        onRequestClose={() => {
          onpressVerify()
        }}
      >
        <View style={{ flex: 1, backgroundColor: "rgba(52,52,52,0.5)", padding: Normalize(15), justifyContent: "center" }} >
          <View style={{ backgroundColor: Colors.white, borderRadius: 4, paddingBottom: "2%" }} >
            <ScrollView showsVerticalScrollIndicator={false} >
              <View style={{ height: Normalize(50), width: "100%", flexDirection: language == "en" ? "row" : "row-reverse", justifyContent: "space-between", alignItems: "center", borderBottomColor: "#D8D8D8", borderBottomWidth: 1 }}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                  <Text style={{
                    fontSize: Normalize(14),
                    fontFamily: 'roboto-bold',
                    color: '#38393e',
                    textAlign: "center"
                  }}>{strings.GETITDONE.TOPOSTINGATASK}</Text>
                </View>
                <TouchableOpacity activeOpacity={0.5}
                  onPress={() =>
                    // setVerifyModal(!verifyModal)
                    onpressVerify()
                  }

                  style={{ height: Normalize(50), width: Normalize(50), justifyContent: "center", alignItems: "center" }} >
                  <Image source={images.cross} style={{ height: Normalize(12), width: Normalize(12), resizeMode: "contain" }} />
                </TouchableOpacity>
              </View>
              <View style={{ padding: Normalize(8) }} >
                {pageDetails.map((item, index) => (
                  <View key={index} style={{ width: "100%", marginBottom: "2%" }}>
                    <Text style={{
                      paddingVertical: Normalize(8),
                      fontSize: Normalize(14),
                      fontFamily: 'roboto-regular',
                      color: '#818181',
                      textAlign: language == "en" ? "left" : "right"
                    }}  >{item.title}</Text>
                    <TouchableOpacity
                      disabled={item.isActive}
                      onPress={item.onPress}
                      style={{ height: Normalize(43), width: "100%", borderRadius: 5, borderColor: item.isActive ? "#99b83c" : "#D8D8D8", borderWidth: Normalize(1), flexDirection: language == "en" ? "row" : "row-reverse" }} >
                      <View style={{ height: Normalize(43), width: Normalize(43), justifyContent: "center", alignItems: "center" }} >
                        <Image source={item.isActive ? images.greenTick : images.grayTick} style={{ height: "60%", width: "60%", resizeMode: "contain" }} />
                      </View>
                      <View style={{ flex: 1, justifyContent: "center", }} >
                        <Text style={{
                          fontSize: Normalize(12),
                          paddingHorizontal: "2%",
                          fontFamily: 'roboto-medium',
                          color: item.isActive ? Colors.greyText : '#636468',
                          textAlign: language == "en" ? "left" : "right"
                        }}>{item.isActive ? item.BoxVerifiedTitle : item.BoxUnverifiedTitle}</Text>
                      </View>
                      <View style={{ height: Normalize(40), width: Normalize(40), justifyContent: "center", alignItems: "center", opacity: item.isActive ? 0.7 : 0.3 }} >
                        <Image source={language == "en" ? images.rightArrow : images.leftArrow} style={{ height: "35%", width: "35%", resizeMode: "contain" }} />
                      </View>
                    </TouchableOpacity>
                  </View>
                ))
                }
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    )
  }
  const createListingButton = () => {
    if (checkIsVerify() == true) {
      navigation.navigate('LMS1', { isSlug: "" })
    } else {
      setVerifyModal(true)
    }
  }


  const fourArr = [
    {
      image: listPage_Details.box_one_image,
      heading: listPage_Details.box_one_title,
      subheader: listPage_Details.box_one_desc
    },
    {
      image: listPage_Details.box_two_image,
      heading: listPage_Details.box_two_title,
      subheader: listPage_Details.box_two_desc
    },
    {
      image: listPage_Details.box_three_image,
      heading: listPage_Details.box_three_title,
      subheader: listPage_Details.box_three_desc
    },
    {
      image: listPage_Details.box_four_image,
      heading: listPage_Details.box_four_title,
      subheader: listPage_Details.box_four_desc
    },
  ]



  return (
    <>
      {
        loader || listPage_Details === {} ?
          <LoaderPage /> :
          <SafeAreaView style={{ flex: 1 }}>
            <View style={{ backgroundColor: "#f2f2f2", flex: 1, }}>
              <Header back navigation={navigation} name={strings.LMS.CREATELISTING} />
              <ScrollView
                showsVerticalScrollIndicator={false}
                 style={{ flex: 1 }}>
                <View style={{ flex: 1, }} >

                  {/* heading */}
                  <View style={{ height: Normalize(225), width: "100%" }} >



                    <ImageBackground source={{ uri: ImageLink.Initial_ListingImage + listPage_Details.banner_image }} style={{ height: Normalize(205), backgroundColor: "#f5f5f5" }} resizeMode="cover" >



                      {/* <View style={{ height: "35%", flexDirection: rowOrRowreverse(language), justifyContent: "space-evenly", marginVertical: "3%" }} >
                        <View style={{ height: "100%", width: "30%", borderRadius: 5, overflow: "hidden", borderColor: Colors.white, borderWidth: 2 }} >
                          <Image source={images.health4} style={{ height: "100%", width: "100%", resizeMode: "cover" }} />
                        </View>
                        <View style={{ height: "100%", width: "30%", borderRadius: 5, overflow: "hidden", borderColor: Colors.white, borderWidth: 2 }} >
                          <Image source={images.health1} style={{ height: "100%", width: "100%", resizeMode: "cover" }} />
                        </View>
                        <View style={{ height: "100%", width: "30%", borderRadius: 5, overflow: "hidden", borderColor: Colors.white, borderWidth: 2 }} >
                          <Image source={images.post_img1} style={{ height: "100%", width: "100%", resizeMode: "cover" }} />
                        </View>
                      </View> */}
                      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                        <Text style={{
                          fontSize: Normalize(16),
                          color: Colors.white,
                          fontFamily: 'roboto-bold',
                          textAlign: "center"
                        }} >
                          {/* {strings.LMS.WORKLESSEARNMORE} */}
                          {listPage_Details.banner_title}
                        </Text>
                        <Text style={{
                          fontSize: Normalize(12),
                          color: Colors.white,
                          fontFamily: 'roboto-medium',
                          textAlign: "center", padding: "3%"
                        }} >
                          {/* {strings.LMS.BEONEOFTHE} */}
                          {listPage_Details.banner_desc}
                        </Text>
                      </View>
                    </ImageBackground >












                    <Button
                      activeOpacity={1}
                      onPress={createListingButton}
                      style={{ width: "70%", position: "absolute", bottom: 0, margin: 0, alignSelf: "center" }}
                      // name={strings.LMS.CREATEMYFIRST}
                      name={listPage_Details.banner_btn}
                    />

                  </View>
                  {/* small heading */}
                  <View>
                    <Text style={{
                      fontSize: Normalize(12),
                      color: Colors.greyText,
                      fontFamily: 'roboto-regular',
                      textAlign: "center",
                      margin: "3%"
                    }} >{listPage_Details.box_desc}</Text>
                    <View style={{ height: Normalize(3), width: "10%", backgroundColor: Colors.primary, alignSelf: "center" }} />
                  </View>

                  {/* four boxes */}

                  {
                    fourArr.map((item, index) => (
                      <View key={index} style={{ padding: "3%", backgroundColor: Colors.white, marginHorizontal: "4%", marginTop: "4%", borderRadius: 5, elevation:Normalize(2) }} >
                        <View style={{ height: Normalize(110), width: Normalize(190), alignSelf: "center", paddingTop: "2%" }} >
                          <Image source={{ uri: ImageLink.Initial_ListingImage + item.image }} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                        </View>
                        <Text style={{
                          fontSize: Normalize(14),
                          color: Colors.greyText,
                          fontFamily: language == "en" ? 'roboto-medium' : 'roboto-bold',
                          textAlign: "center",
                          margin: "3%"
                        }} >{item.heading}</Text>
                        <Text style={{
                          fontSize: Normalize(12),
                          color: Colors.greyText,
                          fontFamily: 'roboto-regular',
                          textAlign: "center",
                          paddingBottom: "2%"
                        }} >{item.subheader}</Text>
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
                    }} >{listPage_Details.create_first_listing_title}</Text>
                    <Button
                      activeOpacity={1}
                      onPress={createListingButton}
                      style={{ width: "70%", alignSelf: "center" }} name={listPage_Details.create_first_listing_btn} />
                  </View>


                  {/* ******************Video section*********** */}

                  <TouchableOpacity
                    // onPress={onpressVideoBox}
                    onPress={() => Linking.openURL(listPage_Details.how_it_work_youtube_link)}
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
                  {/* <ModalVideoView /> */}

                  {/* How it works */}

                  <View style={{ paddingTop: Normalize(10), marginHorizontal: "4%", margin: "3%" }}  >
                    <Text style={{
                      fontSize: Normalize(14),
                      color: Colors.greyText,
                      fontFamily: 'roboto-medium',
                      textAlign: leftOrRight(language),
                      marginBottom: Normalize(10)
                    }} >{listPage_Details.how_it_work_title}</Text>
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
                            }}>{item.heading}</Text>
                          </View>
                          <View style={{ flexDirection: rowOrRowreverse(language) }} >
                            <View style={{ height: Normalize(17), width: Normalize(17) }} />
                            <Text style={{
                              fontSize: Normalize(11),
                              color: Colors.greyText,
                              fontFamily: 'roboto-regular',
                              marginHorizontal: Normalize(6),
                              textAlign: leftOrRight(language)
                            }}>{item.subheader}</Text>
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
                    }} >{listPage_Details.earn_form_any_listing_title}</Text>
                    <Text style={{
                      fontSize: Normalize(11),
                      color: Colors.greyText,
                      fontFamily: 'roboto-regular',
                      marginHorizontal: Normalize(15),
                      textAlign: "center"
                    }}>{listPage_Details.earn_form_any_listing_desc}</Text>
                    <Button
                      activeOpacity={1}
                      onPress={createListingButton}
                      style={{ width: "75%", alignSelf: "center" }} name={listPage_Details.earn_form_any_listing_btn} />
                  </View>

                  {/* small heading and sub heading */}
                  <View>
                    <Text style={{
                      fontSize: Normalize(15),
                      color: Colors.greyText,
                      fontFamily: 'roboto-bold',
                      textAlign: "center",
                      marginTop: "5%"
                    }} >{listPage_Details.here_to_help_title}</Text>



                    <Text style={{
                      fontSize: Normalize(12),
                      color: Colors.greyText,
                      fontFamily: 'roboto-regular',
                      textAlign: "center",
                      margin: "3%"
                    }} >{listPage_Details.here_to_help_desc}</Text>
                    <Button
                      style={{ width: "50%", alignSelf: "center" }}
                      name={listPage_Details.here_to_help_btn}
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
                          <Text style={{ fontSize: 15, color: Colors.primary, fontFamily: "roboto-medium" }}>{item.faq_detail_api.question}</Text>
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

                </View>
              </ScrollView>
            </View>
          </SafeAreaView>
      }
    </>
  );
}

export default withRtl(Initial_listing_Page);


const styles = StyleSheet.create({
  arrowViewOpen: { height: 12, width: 17 },
  arrowViewClose: { height: 17, width: 12 }
})




// <View style={{ height: Normalize(205), backgroundColor: "#05435b" }} >
// <View style={{ height: "35%", flexDirection: rowOrRowreverse(language), justifyContent: "space-evenly", marginVertical: "3%" }} >
//   <View style={{ height: "100%", width: "30%", borderRadius: 5, overflow: "hidden", borderColor: Colors.white, borderWidth: 2 }} >
//     <Image source={images.health4} style={{ height: "100%", width: "100%", resizeMode: "cover" }} />
//   </View>
//   <View style={{ height: "100%", width: "30%", borderRadius: 5, overflow: "hidden", borderColor: Colors.white, borderWidth: 2 }} >
//     <Image source={images.health1} style={{ height: "100%", width: "100%", resizeMode: "cover" }} />
//   </View>
//   <View style={{ height: "100%", width: "30%", borderRadius: 5, overflow: "hidden", borderColor: Colors.white, borderWidth: 2 }} >
//     <Image source={images.post_img1} style={{ height: "100%", width: "100%", resizeMode: "cover" }} />
//   </View>
// </View>
// <View style={{ flex: 1 }} >
//   <Text style={{
//     fontSize: Normalize(16),
//     color: Colors.white,
//     fontFamily: 'roboto-bold',
//     textAlign: "center"
//   }} >
//     {/* {strings.LMS.WORKLESSEARNMORE} */}
//     {listPage_Details.banner_title}
//   </Text>
//   <Text style={{
//     fontSize: Normalize(12),
//     color: Colors.white,
//     fontFamily: 'roboto-regular',
//     textAlign: "center", padding: "3%"
//   }} >
//     {/* {strings.LMS.BEONEOFTHE} */}
//     {listPage_Details.banner_desc}
//   </Text>
// </View>
// </View>

