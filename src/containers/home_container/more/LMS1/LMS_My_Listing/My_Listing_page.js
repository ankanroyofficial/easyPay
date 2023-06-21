import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Platform,
  BackHandler
} from 'react-native';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import Toast from 'react-native-simple-toast';
import LoaderPage from '../../../../../components/LoaderPage';
import strings from '../../../../../constants/lng/LocalizedStrings';
import Header from '../../../../../components/Header';
import { Colors } from '../../../../../constants/colors';
import { leftOrRight, rowOrRowreverse } from '../../../../../constants/RowOrRowreverse';
import { myContext } from '../../../../../constants/ContextApi';
import styles from '../Styles';
import images from '../../../../../constants/images';
import { ImageLink } from '../../../../../constants/LinkPage';
import { engToPersian } from '../../../../../constants/EnglishToPersian';
import axiosInstance from '../../../../../constants/AxiosCallPage';
import WarningPage from '../../../../../components/WarningPage';
import CurveDesing_Component from '../../../../../constants/CurveDesing_Component';
import Listing_header_button from '../../../../../components/Listing_header_button';
import globalstyles from '../../../../../constants/globalStyles/Global_Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fontfmliy } from '../../../../../components/WhichFontFamily';
import NewLoaderPage from '../../../../../components/NewLoaderPage';

function My_Listing_page({ navigation }) {
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
  const [total_pageno, setTotal_pageno] = useState("")
  const [temp_pageno, setTemp_pageno] = useState(1)
  const [myListing, setMyListing] = useState([])
  const [loader, setLoader] = useState(false)
  const [myListloader, setMyListloader] = useState(false)
  const [deleteListing, setDeleteListing] = useState(false)
  const [listSlug, setListSlug] = useState("")

  const scrollref = useRef()
  const { token,
    setLMS_category_title,
    setLMS_subcategory_title,
    setLMS_id,
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
    setLMS_prev_Multi_Images, lMS_prev_Multi_Images,
    setOpen,
    setOpen2,
    setOpen3,
    setOpen4,
    setOpen5,
    setLMS_prev_distance,
    setDrawerTabNaviData
  } = useContext(myContext)

  const below_staticDAta = [
    {
      id: 1,
      icon: images.lms_arrow,
      title_en: "Share your listings",
      title_pr: "زمان پاسخ شما رتبه بندی بسته پیشنهادی شما را تعیین می کند",
      subTitle_en: "Copy your unique listing link and share it with your friends, family, customers and network.",
      subTitle_pr: "زمانی که برای پاسخ به درخواست رزرو مشتری صرف می کنید، عامل بزرگی است که رتبه بسته پیشنهادی شما را در نتایج جستجو تعیین می کند. شما باید به سرعت به هر درخواستی پاسخ دهید، چه آنکه پیشنهاد را قبول کنید و چه آنکه مودبانه آن را رد کنید. پاسخگوترین مجریان ما ظرف ۱ ساعت پاسخ می دهند."
    },
    {
      id: 2,
      icon: images.lms_pen,
      title_en: "Optimise your listings",
      title_pr: "هرگز یک درخواست رزرو را از دست ندهید",
      subTitle_en: "Upon receipt of the booking request, we will notify you by sending a notification. Make sure notification settings are enabled on your smartphone.",
      subTitle_pr: "پس از دریافت درخواست رزرو، ما با ارسال یک اعلان به شما اطلاع خواهیم داد. اطمینان حاصل کنید که تنظیمات نوتیفیکیشن روی گوشی هوشمند شما فعال است."
    },
    {
      id: 3,
      icon: images.lms_star,
      title_en: "Find out when your listings will be features",
      title_pr: "هرگز یک درخواست رزرو را از دست ندهید",
      subTitle_en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt incididunt ut labore et dolore magna aliqua enim labore et dolore magna aliqua enim",
      subTitle_pr: "پس از دریافت درخواست رزرو، ما با ارسال یک اعلان به شما اطلاع خواهیم داد. اطمینان حاصل کنید که تنظیمات نوتیفیکیشن روی گوشی هوشمند شما فعال است."
    }
  ]
  const ListingBox = (item, index) => (

    <View key={index} style={{ height: Normalize(83), backgroundColor: Colors.white, flexDirection: rowOrRowreverse(language), borderBottomColor: "#f5f5f5", borderBottomWidth: 1 }} >
      <View style={{ flex: 0.8, padding: Normalize(7) }} >
        <Image source={{ uri: ImageLink.ListingImage + item.image }} style={{ backgroundColor: "#f5f5f5", height: "100%", width: "100%", resizeMode: "cover" }} />
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ViewListing", { slugName: item.slug })
        }}
        style={{ flex: 1, justifyContent: "center", paddingHorizontal: Normalize(3), }} >
        {
          item.status == "1" ?
            <Text style={[styles.h1A, { textAlign: leftOrRight(language) }]} >{strings.LMS.PAUSED}</Text>
            :
            <Text style={[styles.h1, { textAlign: leftOrRight(language) }]} >{strings.LMS.PUBLISHED}</Text>
        }
        <Text
          numberOfLines={1}
          style={{
            fontSize: Normalize(11),
            color: Colors.greyText,
            fontFamily: fontfmliy.regular,
            textAlign: leftOrRight(language)
          }} >{item.title}</Text>
      </TouchableOpacity>
      <View style={{ flex: 1.2, flexDirection: rowOrRowreverse(language), justifyContent: "space-evenly", alignItems: 'center' }} >
        <TouchableOpacity
          onPress={() => {
            if (item.status == "1") {
              onpressPublishList(item.slug)
            } else {
              onpressPaushList(item.slug)

            }
          }}
          style={styles.btnStyle} >
          <Image source={item.status == "1" ? images.resume : images.pause} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onpressEditList(item.slug)}
          style={styles.btnStyle} >
          <Image source={images.edit} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setListSlug(item.slug)
            onpressDeleteListingButton()
          }}
          style={styles.btnStyle} >
          <Image source={images.delete} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
        </TouchableOpacity>
        {
          deleteListing &&
          <WarningPage
            onPress={onpressDeleteListingButton}
            ispress={deleteListing}
            warningSubTitle={language == 'en' ? 'Are you sure you want to delete this listing?' : 'آیا مطمئنید که می خواهید این فهرست را حذف کنید؟'}
            warningTitle={language == 'en' ? 'Are you Sure?' : "آیا مطمئن هستید؟"}
            okOnpress={() => onpressDeleteList(listSlug)}
            cancelOnpress={onpressDeleteListingButton} />}
      </View>
    </View>
  )
  const onpressNextButton = () => {
    var a = temp_pageno
    var b = a + 1
    get_listingData_after_NxtOrPre(b)
    setTemp_pageno(b)
  }
  const onpressPreviousButton = () => {
    var a = temp_pageno
    var b = a - 1
    get_listingData_after_NxtOrPre(b)
    setTemp_pageno(b)
  }
  const get_listingData = async () => {
    try {
      setLoader(true)
      const res = {
        "params": {
          "page": 1
        }
      }
      const data = await axiosInstance.post("my-listing", res)
      console.log("listingggg", data.data.result)
      if (data.data.result) {
        setMyListing(data.data.result.my_listing)
        setTotal_pageno(data.data.result.my_listing_page_count)
        setLoader(false)
      }
    } catch (error) {
      setLoader(false)
      console.log(error)
    }
  }
  const get_listingData_after_NxtOrPre = async (val) => {
    try {
      setMyListloader(true)
      const res = {
        "params": {
          "page": val
        }
      }
      const data = await axiosInstance.post("my-listing", res)
      if (data.data.result) {
        let a = data.data.result.my_listing
        setMyListing(a)
        if (a.length === 0) {
          navigation.navigate({
            name: "Get it done",
            params: {
              screen: "Getitdone",
            },
          })
        }
        setTotal_pageno(data.data.result.my_listing_page_count)
        setMyListloader(false)
      }
    } catch (error) {
      setMyListloader(false)
      console.log(error)
    }
  }
  useEffect(async () => {
    await get_listingData()
  }, [token]);
  const isLoad = async () => {
    const a = await AsyncStorage.getItem("islistingRefresh")
    if (a == "true") {
      get_listingData()
      AsyncStorage.setItem("islistingRefresh", "false")
    }
  }
  useEffect(() => {
    isLoad()
    const willFocusSubscription = navigation.addListener('focus', () => {
      isLoad()
    });
    return willFocusSubscription;
  }, []);
  const onpressPublishList = async (val) => {
    try {
      const data = {
        "params": {
          "slug": val
        }
      }
      const res = await axiosInstance.post("publish-listing", data)
      if (res.data.success) {
        get_listingData_after_NxtOrPre(temp_pageno)
        Toast.show(res.data.success.meaning)
      }
    } catch (error) {
      console.log("onpressPublishList", error)
    }
  }
  const onpressPaushList = async (val) => {
    try {
      const data = {
        "params": {
          "slug": val
        }
      }
      const res = await axiosInstance.post("paush-listing", data)

      if (res.data.success) {
        get_listingData_after_NxtOrPre(temp_pageno)
        Toast.show(res.data.success.meaning)
      }

    } catch (error) {
      console.log("onpressPaushList", error)
    }
  }
  const onpressEditList = (val) => {
    lms_Clean_Context()
    navigation.navigate('LMS1', { isSlug: val })
  }
  const onpressDeleteList = async (val) => {
    try {
      if (listSlug !== "") {

        setMyListloader(true)
        const data = {
          "params": {
            "slug": val
          }
        }
        const res = await axiosInstance.post("delete-listing", data)

        // console.log(">>>>>////////", res.data.success.show_info)

        if (res.data.success) {
          setDrawerTabNaviData(res.data.success.show_info)
          get_listingData_after_NxtOrPre(temp_pageno)
          Toast.show(res.data.success.meaning)
          onpressDeleteListingButton()
          setListSlug("")
        } else {
          setMyListloader(false)
        }
      }
    } catch (error) {
      setMyListloader(false)
      console.log("onpressDeleteList", error)
    }
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
  const onpressDeleteListingButton = () => {
    setDeleteListing(!deleteListing)
  }
  const haveList = (val) => {
    try {
      if (val.length > 0) {
        return true
      } else {
        // navigation.goBack()
        return false
      }
    } catch (error) {
      console.log("haveList", error)
    }
  }

  const handleBackButtonClick = () => {
    navigation.navigate({
      name: "Get it done",
      params: {
        screen: "Getitdone",
      },
    })
    return true;
  };


  useEffect(() => {
    const a = BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      a.remove();
    };
  }, []);


  return (

    <SafeAreaView style={{ backgroundColor: Colors.primary, flexDirection: 'column', flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: Colors.white }} >
        <Header
          backFunc={() => {
            navigation.navigate({
              name: "Get it done",
              params: {
                screen: "Getitdone",
              },
            })
          }}
          name={strings.LMS.MYSERVICES} back navigation={navigation} />

        {loader ?
          <LoaderPage />
          :
          <CurveDesing_Component  >
            <KeyboardAvoidingView
              behavior={(Platform.OS === 'ios') ? "padding" : null}
              style={globalstyles.container_only_padding} >

              <ScrollView
                ref={scrollref}
                showsVerticalScrollIndicator={false} >
                <View style={styles.container}>
                  <View style={{ flexDirection: rowOrRowreverse(language), margin: 15, justifyContent: "space-between" }} >
                    <Text style={[globalstyles.plantext_roboto_bold, { fontSize: Normalize(14), fontFamily: 'roboto-bold' }]} >{strings.LMS.MYSERVICES}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        lms_Clean_Context()
                        navigation.navigate('LMS1', { isSlug: "" })
                      }}
                      style={{ backgroundColor: Colors.green2, paddingHorizontal: Normalize(6), borderRadius: 6 }} >
                      <Text style={[styles.h0, { color: Colors.white, padding: Normalize(3), fontSize: Normalize(11) }]} >{strings.LMS.CREATENEWLISTING}</Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    {/* listing tasks */}
                    {

                      haveList(myListing) &&
                      myListing.map((item, index) => (
                        // <ListingBox item={item} key={index} />
                        ListingBox(item, index)
                      ))
                    }
                    {/* pagination */}
                    {
                      total_pageno > 1 &&
                      <View style={{ height: Normalize(30), marginVertical: Normalize(7), marginHorizontal: 5, flexDirection: rowOrRowreverse(language), justifyContent: "space-between" }} >
                        {
                          1 < temp_pageno ?
                            total_pageno > 1 ?
                              <TouchableOpacity
                                onPress={onpressPreviousButton}
                                style={[styles.arrowButton]}>
                                <Image
                                  style={styles.imageButton}
                                  source={language == "en" ? images.arrowleftblack : images.arrowrightblaack}
                                />
                              </TouchableOpacity>
                              :
                              <View style={[styles.arrowButton]}>
                                <Image
                                  style={styles.imageButton}
                                  source={language == "en" ? images.arrowleftgrey : images.arrowrightgrey}
                                />
                              </View>
                            :
                            <View style={[styles.arrowButton]}>
                              <Image
                                style={styles.imageButton}
                                source={language == "en" ? images.arrowleftgrey : images.arrowrightgrey}
                              />
                            </View>
                        }
                        <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", height: "100%", paddingHorizontal: Normalize(5), backgroundColor: "#f5f5f5", borderRadius: 10, elevation: 0.8 }}>
                          <Text style={[styles.h0, { fontSize: Normalize(14) }]} >

                            {
                              language == "en" ?
                                `${temp_pageno}/${total_pageno}`
                                :
                                `${engToPersian(total_pageno)}/${engToPersian(temp_pageno)}`

                            }


                          </Text>
                        </TouchableOpacity>
                        {
                          total_pageno == temp_pageno ?
                            <View style={[styles.arrowButton]}>
                              <Image
                                style={styles.imageButton}
                                source={language == "en" ? images.arrowrightgrey : images.arrowleftgrey}
                              />
                            </View> :
                            total_pageno > temp_pageno ?
                              <TouchableOpacity
                                onPress={onpressNextButton}
                                style={[styles.arrowButton]}>
                                <Image
                                  style={styles.imageButton}
                                  source={language == "en" ? images.arrowrightblaack : images.arrowleftblack}
                                />
                              </TouchableOpacity> :
                              <View style={[styles.arrowButton]}>
                                <Image
                                  style={styles.imageButton}
                                  source={language == "en" ? images.arrowrightgrey : images.arrowleftgrey}
                                />
                              </View>
                        }
                      </View>
                    }
                    <View style={{ padding: 8 }} >
                      <View style={{ flexDirection: rowOrRowreverse(language), width: "100%", marginTop: Normalize(10), alignItems: "center" }} >
                        <View style={{ height: Normalize(15), width: Normalize(15), margin: 4 }} >
                          <Image source={images.lms_info_g} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                        </View>

                        <Text style={[globalstyles.plantext_outfit_regular, { fontSize: Normalize(11), marginHorizontal: Normalize(10), textAlign: "justify" }]} >{strings.LMS.BOOKINGFORYOUR} <Text
                          onPress={() => navigation.navigate({
                            name: "My tasks",
                            params: {
                              screen: "MyTasks",
                            },
                          })}
                          style={{ color: Colors.primary, fontFamily: "Outfit-Medium" }}>{strings.LMS.MYTASK}</Text></Text>

                      </View>
                      <Text style={{
                        fontSize: Normalize(12),
                        color: "gray",
                        fontFamily: fontfmliy.bold,
                        marginTop: 12,
                        marginHorizontal: 4,
                        textAlign: leftOrRight(language)
                      }} >{strings.LMS.NEXTSTEPS}</Text>
                    </View>
                    {
                      below_staticDAta.map((item, index) => (
                        <View key={index} style={{ padding: 12 }} >
                          <View style={{ width: "100%", paddingHorizontal: "3%", flexDirection: rowOrRowreverse(language) }} >
                            <View style={{ height: Normalize(15), width: Normalize(15), marginTop: 4 }} >
                              <Image source={item.icon} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                            </View>
                            <View style={{ flex: 1, marginHorizontal: Normalize(10) }} >
                              <Text style={[globalstyles.plantext_Outfit_Medium, { fontSize: Normalize(12), }]} >{language == "en" ? item.title_en : item.title_pr}</Text>
                              <Text style={[globalstyles.plantext_outfit_regular, { fontSize: Normalize(11), textAlign: "justify", marginTop: Normalize(3) }]} >{language == "en" ? item.subTitle_en : item.subTitle_pr}</Text>
                            </View>
                          </View>
                        </View>
                      ))
                    }

                    <View style={{ paddingHorizontal: "3%" }} >
                      <Text style={{
                        fontSize: Normalize(11),
                        color: Colors.greyText,
                        fontFamily: fontfmliy.regular,
                        padding: 12,
                        textAlign: leftOrRight(language)
                      }} ><Text
                        onPress={() =>
                          navigation.navigate("Initial_listing_Page")
                        }
                        style={{
                          color: Colors.primary,
                          fontFamily: fontfmliy.bold,
                        }} >{strings.MAKEANOFFER.LEARNMORE}</Text> {strings.LMS.ABOUTLISTINGOR} <Text onPress={() => navigation.navigate("Help")} style={{
                          color: Colors.primary,
                          fontFamily: fontfmliy.bold,
                        }} >{strings.LMS.HELPCENTER}</Text></Text>
                    </View>
                  </View>
                  {
                    haveList(myListing) === false || myListing.length == 1 &&
                    <View style={{ height: Normalize(85), backgroundColor: Colors.white }} ></View>
                  }
                </View>
              </ScrollView>
              {
                myListloader &&
                <NewLoaderPage />
              }
            </KeyboardAvoidingView>
          </CurveDesing_Component>
        }
      </View>

    </SafeAreaView>

  );
}

export default withRtl(My_Listing_page);