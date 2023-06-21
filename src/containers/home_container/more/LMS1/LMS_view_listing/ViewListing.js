import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Image,
} from 'react-native';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Normalize from './../../../../../helpers/Dimens';
import Button from './../../../../../components/Button';
import LoaderPage from '../../../../../components/LoaderPage';
import strings from '../../../../../constants/lng/LocalizedStrings';
import Header from '../../../../../components/Header';
import { Colors } from '../../../../../constants/colors';
import { leftOrRight, rowOrRowreverse } from '../../../../../constants/RowOrRowreverse';
import { myContext } from '../../../../../constants/ContextApi';
import styles from '../Styles';
import images from '../../../../../constants/images';
import { addCommaAndTranslateInPersian } from '../../../../../constants/NumberWithCommaAndInPersian';
import { nameShorting } from '../../../../../constants/NameShorting';
import { ImageLink } from '../../../../../constants/LinkPage';
import { engToPersian } from '../../../../../constants/EnglishToPersian';
import Carousel from 'react-native-snap-carousel';
import axiosInstance from '../../../../../constants/AxiosCallPage';
import { isInt, lastStar, reviewShowinGraystar, reviewShowinStar } from '../../../../../constants/RatingCount';
import { questionEnglishTimeShow, questionPersianTimeShow } from '../../../../../constants/DateShow';
import CurveDesing_Component from '../../../../../constants/CurveDesing_Component';
import globalstyles from '../../../../../constants/globalStyles/Global_Styles';
import { fontfmliy } from '../../../../../components/WhichFontFamily';

const { height, width } = Dimensions.get("window")
function ViewListing({ navigation, route }) {
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();

  const carouselRef = useRef()
  const { token } = useContext(myContext)
  const { slugName } = route.params;
  const [listingImages, setListingImages] = useState([])
  const [reviewArr, setReviewArr] = useState([])
  const [loader, setLoader] = useState(false)
  const [listingData, setListingData] = useState("")

  const scrollref = useRef()

  const get_listingData = async () => {
    try {
      setLoader(true)
      const res = {
        "params": {
          "slug": slugName,
        }
      }
      const data = await axiosInstance.post("listing-details", res)
      if (data.data.result) {
        var imgArr = []
        var imgArr1 = data.data.result.listing.my_listing_to_gallery
        setListingData(data.data.result.listing)
        // console.log(data.data.result.listing.get_user)
        setReviewArr(data.data.result.review_as_tasker)
        imgArr.push({ img: data.data.result.listing.image, id: new Date() })

        imgArr1.map((item, index) => {
          imgArr.push({ img: item.image, id: `${new Date()}+${index}` })
        })
        setListingImages(imgArr)
        // console.log("************************************************")
        setLoader(false)
      } else {
        setLoader(false)
      }
    } catch (error) {
      // setLoader(false)
      console.log("get_listingData", error)
    }
  }
  const PackageView = (item, index) => {
    return (
      <View key={index} style={{ marginTop: Normalize(8), }} >
        <View style={{ padding: Normalize(10), backgroundColor: Colors.white, flexDirection: rowOrRowreverse(language), borderRadius: 5 }} >
          <View style={{ flex: 1 }} >
            <Text style={[styles.hc, { textAlign: leftOrRight(language), marginBottom: 5 }]} >{item.name}</Text>
            <Text style={{
              fontSize: Normalize(11),
              fontFamily: fontfmliy.regular,
              color: '#818181',
              lineHeight: Normalize(14),
              textAlign: leftOrRight(language)
            }} >
              {item.description}
            </Text>
          </View>
          <View style={{ flex: 0.8, paddingHorizontal: Normalize(3) }} >
            <View style={{ flexDirection: rowOrRowreverse(language), alignSelf: "center" }} >
              <Text style={[styles.h1B, { fontSize: Normalize(11), marginHorizontal: Normalize(3) }]} >{strings.LMS.COST}</Text>
              <Text style={[styles.h1B, { fontSize: Normalize(11) }]} >{strings.BROWSEFILTER.TOMAN} {addCommaAndTranslateInPersian(item.price, language)}</Text>
            </View>
            <Button
              onPress={() => {
                navigation.navigate("ContinueToBook", { item: item, name: nameShorting(listingData.get_user.fname + " " + listingData.get_user.lname), title: listingData.title, isLocation: listingData.location == null && listingData.lat == null && listingData.lng == null ? "null" : "not null", image: listingData.get_user.profile_picture })
              }}
              style={{ height: Normalize(25), width: "100%", alignSelf: "center", backgroundColor: Colors.green2, marginTop: Normalize(3) }}
              name={strings.LMS.CONTINUETOBOOK}
              textStyle={{ fontSize: Normalize(11) }}
            />
          </View>
        </View>
      </View>
    )
  }
  useEffect(() => {
    get_listingData()
  }, [])
  const minBuget = (val) => {
    const arr = val
    var smallNum = arr[0].price
    arr.map((item, index) => {
      if (item.price < smallNum) {
        smallNum = item.price
      }
    })
    return addCommaAndTranslateInPersian(smallNum, language)
  }

  const _renderItem = ({ item, index }) => {
    return (
      <View style={{ height: Normalize(180), width: width * 0.95, padding: Normalize(3), backgroundColor: Colors.white }}>
        <View style={{ height: Normalize(180), width: Dimensions.get("window").width, padding: Normalize(3), backgroundColor: Colors.white }} >
          <Image source={{ uri: ImageLink.ListingImage + item.img }} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
          {/* <Image source={images.baloon} style={{ height: "100%", width: "100%", resizeMode: "contain" }} /> */}
        </View>
      </View>
    );
  }
  return (
    <SafeAreaView style={{ backgroundColor: Colors.primary, flexDirection: 'column', flex: 1 }}>
      <View style={styles.container2}>
        <Header back navigation={navigation} name={strings.LMS.LISTINGDETAILS} />
        {
          loader || listingData == "" ?
            <LoaderPage /> :
            <CurveDesing_Component  >
              <ScrollView
                ref={scrollref}
                showsVerticalScrollIndicator={false}

                style={{ flex: 1 }}>
                <View style={{ flex: 1 }} >
                  <View style={{ marginBottom: Normalize(7), backgroundColor: Colors.grayf8, borderBottomWidth: Normalize(1), borderBottomColor: Colors.boxBorder }} >
                    <Carousel
                      ref={carouselRef}
                      data={listingImages}
                      renderItem={_renderItem}
                      sliderWidth={width}
                      itemWidth={width}
                      pagingEnabled
                      layout={'default'}
                      autoplay
                      loop
                    />
                  </View>

                  <View
                    style={globalstyles.container_only_padding} >
                    <View>
                      <Text style={{
                        fontSize: Normalize(15),
                        color: Colors.primary,
                        marginVertical: Normalize(5),
                        fontFamily: fontfmliy.bold,
                        textAlign: "center"
                      }} >{listingData.title}</Text>
                      <View style={{ flexDirection: rowOrRowreverse(language), alignSelf: "center" }} >
                        <Text style={[styles.h1B, { marginHorizontal: Normalize(3) }]} >{strings.LMS.STARTINGFROM}</Text>
                        <Text style={styles.h1B} >{strings.BROWSEFILTER.TOMAN} {minBuget(listingData.my_listing_to_package)}</Text>
                      </View>
                      <Button
                        onPress={() => scrollref.current.scrollToEnd({ animated: true })}
                        style={{ height: Normalize(27), width: Normalize(120), marginTop: Normalize(5), alignSelf: "center" }}
                        name={strings.LMS.VIEWALLPACKAGE}
                        textStyle={{ fontSize: Normalize(10) }}
                      />
                    </View>
                    <View style={{ margin: Normalize(15) }} >
                      <Text style={[styles.hc, { textAlign: leftOrRight(language), color: Colors.primary }]} >{strings.LMS.ABOUTTHISTASKER}</Text>
                      <View style={{ flexDirection: rowOrRowreverse(language), marginTop: Normalize(10), alignItems: "center" }} >


                        <View style={{ height: Normalize(50), width: Normalize(50), backgroundColor: "#f5f5f5", borderRadius: Normalize(50) / 2, overflow: "hidden" }} >
                          {
                            listingData.get_user.profile_picture != null ?
                              <Image source={{ uri: ImageLink.ProfilePhoto + listingData.get_user.profile_picture }} style={{ height: "100%", width: "100%", resizeMode: "cover" }} />
                              :
                              <View style={{ flex: 1, justifyContent: "center", alignItems: "center", borderWidth: Normalize(1), borderColor: Colors.secondaryBorder, backgroundColor: Colors.secondaryBackground, borderRadius: Normalize(50) / 2 }}>
                                <AntDesign
                                  name={"user"}
                                  color={Colors.secondary}
                                  size={Normalize(25)} />
                              </View>
                          }


                        </View>





                        <View style={{ marginHorizontal: Normalize(10) }} >
                          <Text style={[styles.h1B, { textAlign: leftOrRight(language) }]} >{nameShorting(listingData.get_user.fname + " " + listingData.get_user.lname)}</Text>
                          <View style={{ flexDirection: language == "pr" ? 'row-reverse' : "row", alignItems: "center", marginVertical: "2%" }}>
                            {
                              reviewShowinStar(listingData.get_user.avg_review_as_tasker).map((item, index) => (
                                item == 0 ?
                                  <View key={index} style={{ height: Normalize(10), width: Normalize(50), marginHorizontal: Normalize(2) }} >
                                    <Image source={images.allgray} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                  </View> :
                                  isInt(item) == true ?
                                    <View key={index} style={{ height: Normalize(10), width: Normalize(10), marginHorizontal: Normalize(0.5) }} >
                                      <Image source={images.stargolden} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                    </View> :
                                    <View key={index} style={{ height: Normalize(10), width: Normalize(10), marginHorizontal: Normalize(0.5) }} >
                                      <Image source={lastStar(item, language)} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                    </View>
                              ))
                            }
                            {
                              reviewShowinGraystar(reviewShowinStar(listingData.get_user.avg_review_as_tasker)).map((item, index) => (
                                <View key={index} style={{ height: Normalize(10), width: Normalize(10), marginHorizontal: Normalize(0.5) }} >
                                  <Image source={images.stargray} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                </View>
                              ))
                            }
                            {/* <Text style={{ color: '#818181', marginLeft: 2, fontFamily: fontfmliy.regular, fontSize: Normalize(11) }}>({language == "en" ? item.rating : engToPersian(item.rating)})</Text> */}
                          </View>
                          <Text style={[styles.h1B, { textAlign: leftOrRight(language), fontSize: Normalize(11), marginTop: "1%" }]} >
                            {
                              language == "en" ?
                                `${Math.round(listingData.get_user.avg_review_as_tasker)} star from ${listingData.get_user.tot_review_as_tasker} reviews`
                                :
                                `${engToPersian(Math.round(listingData.get_user.avg_review_as_tasker))} ستاره از ${engToPersian(listingData.get_user.tot_review_as_tasker)} دیدگاه`
                            }
                          </Text>
                        </View>
                      </View>
                      {/* ******************Description*****************  */}
                      <View style={{ marginTop: 15, }} >
                        <Text style={[styles.hc, { textAlign: leftOrRight(language) }]} >{strings.LMS.DESCRIPTION}</Text>
                        <Text style={{
                          fontSize: Normalize(11),
                          fontFamily: fontfmliy.regular,
                          color: '#818181',
                          lineHeight: Normalize(14),
                          textAlign: leftOrRight(language)
                        }} >
                          {listingData.description}
                        </Text>
                      </View>
                      {/* Availability */}
                      <View style={{ marginTop: 15, }} >
                        <Text style={[styles.hc, { textAlign: leftOrRight(language) }]} >{strings.LMS.AVAILABILITY}</Text>
                        <Text style={{
                          fontSize: Normalize(11),
                          fontFamily: fontfmliy.regular,
                          color: '#818181',
                          lineHeight: Normalize(14),
                          textAlign: leftOrRight(language)
                        }} >
                          {listingData.avalibility}
                        </Text>

                        {
                          listingData.location != null ?
                            <>
                              <View style={{ flexDirection: rowOrRowreverse(language), marginTop: Normalize(5), alignItems: "center" }} >
                                <View style={{ height: Normalize(8), width: Normalize(8), opacity: 0.5 }} >
                                  <Image source={images.blackmarker} style={{ height: "100%", width: "100%", resizeMode: "cover" }} />
                                </View>
                                <View style={{ width: Normalize(3) }} />
                                <Text style={{
                                  fontSize: Normalize(11),
                                  fontFamily: fontfmliy.bold,
                                  color: '#818181',
                                  lineHeight: Normalize(14),
                                  textAlign: leftOrRight(language)
                                }} >
                                  {strings.BROWSEFILTER.LOCATION}
                                </Text>
                              </View>
                              <Text style={{
                                fontSize: Normalize(11),
                                fontFamily: fontfmliy.regular,
                                color: '#818181',
                                lineHeight: Normalize(14),
                                textAlign: leftOrRight(language)
                              }} >
                                {addCommaAndTranslateInPersian((listingData.distance), language)}{strings.BROWSEFILTER.KM} {strings.BROWSEFILTER.FROM} {listingData.location}
                              </Text>
                            </>
                            :
                            <View style={{ flexDirection: rowOrRowreverse(language), marginTop: Normalize(5), }} >
                              <View style={{ height: Normalize(13), width: Normalize(13), opacity: 0.7 }} >
                                <Image source={images.phone} style={{ height: "100%", width: "100%", resizeMode: "cover" }} />
                              </View>
                              <Text style={{
                                fontSize: Normalize(11),
                                fontFamily: fontfmliy.regular,
                                color: '#818181',
                                lineHeight: Normalize(14),
                              }} >
                                {strings.LMS.ONLINESERVICE}
                              </Text>
                            </View>
                        }
                      </View>
                      {/* Price package */}
                      <Text style={[styles.hd, { textAlign: leftOrRight(language), marginTop: 8, color: Colors.primary }]} >{strings.LMS.PRICEPACKAGES}</Text>
                      {
                        (listingData.my_listing_to_package).map((item, index) => (
                          PackageView(item, index)
                        ))
                      }
                      {/* Reviews for this tasker  */}

                      <View style={{ marginTop: Normalize(10), }} >
                        <Text style={[styles.hd, { textAlign: leftOrRight(language), marginBottom: Normalize(5), marginTop: Normalize(5), color: Colors.primary }]} >{strings.LMS.REVIEWFORTHISTASKER}</Text>
                        {reviewArr.length > 0 ?
                          <View >
                            {
                              reviewArr.map((item, index) => (
                                <View key={index} style={{ flexDirection: 'column', paddingVertical: Normalize(15), borderBottomColor: Colors.lightGrey, borderBottomWidth: 0.2 }}>
                                  <View style={{ flexDirection: language == "pr" ? "row-reverse" : "row" }}>
                                    <View style={{ flexDirection: language == "pr" ? "row-reverse" : "row" }}>
                                      <View style={{ width: 50, height: 50, backgroundColor: "#f5f5f5", borderRadius: 25, overflow: "hidden" }}>
                                        {
                                          item.get_poster.profile_picture != null ?
                                            <Image
                                              source={{ uri: ImageLink.ProfilePhoto + `${item.get_poster.profile_picture}` }}
                                              style={{ height: "100%", width: "100%", resizeMode: "cover" }}
                                            />
                                            :
                                            <Image
                                              source={{ uri: ImageLink.BlankProfileImage }}
                                              style={{ height: "100%", width: "100%", resizeMode: "cover" }}
                                            />
                                        }
                                      </View>

                                      <View style={{ flexDirection: 'column', marginHorizontal: 15 }}>
                                        <Text
                                          onPress={() => { navigation.navigate("PublicProfile", { PublicSlug: item.get_poster.slug }) }}
                                          style={{ color: Colors.primary, fontFamily: fontfmliy.bold, fontSize: Normalize(12), textAlign: language == "en" ? "left" : "right" }}>{nameShorting(item.get_poster.fname + " " + item.get_poster.lname)}</Text>
                                        <View style={{ flexDirection: language == "pr" ? 'row-reverse' : "row", alignItems: "center" }}>
                                          {
                                            reviewShowinStar(item.rating).map((item, index) => (
                                              item == 0 ?
                                                <View key={index} style={{ height: Normalize(10), width: Normalize(50), marginHorizontal: Normalize(2) }} >
                                                  <Image source={images.allgray} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                                </View> :
                                                isInt(item) == true ?
                                                  <View key={index} style={{ height: Normalize(10), width: Normalize(10), marginHorizontal: Normalize(0.5) }} >
                                                    <Image source={images.stargolden} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                                  </View> :
                                                  <View key={index} style={{ height: Normalize(10), width: Normalize(10), marginHorizontal: Normalize(0.5) }} >
                                                    <Image source={lastStar(item, language)} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                                  </View>
                                            ))
                                          }
                                          {
                                            reviewShowinGraystar(reviewShowinStar(item.rating)).map((item, index) => (
                                              <View key={index} style={{ height: Normalize(10), width: Normalize(10), marginHorizontal: Normalize(0.5) }} >
                                                <Image source={images.stargray} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                              </View>
                                            ))
                                          }
                                          {/* <Text style={{ color: '#818181', marginLeft: 2, fontFamily: fontfmliy.regular, fontSize: Normalize(11) }}>({language == "en" ? item.rating : engToPersian(item.rating)})</Text> */}
                                        </View>
                                      </View>
                                    </View>

                                    <Text style={{
                                      color: Colors.black, fontFamily: fontfmliy.regular, fontSize: Normalize(10.5),
                                      alignSelf: 'center', textAlign: 'right', marginRight: 10
                                    }}>{language == "pr" ? questionPersianTimeShow(item.created_at) : questionEnglishTimeShow(item.created_at)}</Text>
                                  </View>
                                  <Text
                                    numberOfLines={2}
                                    style={{
                                      color: Colors.primary, fontFamily: fontfmliy.bold,
                                      fontSize: Normalize(12), marginTop: 10, textAlign: language == "pr" ? "right" : "left"
                                    }}>
                                    {item.get_task.title}
                                  </Text>
                                  <Text
                                    style={[
                                      styles.reviewh3,
                                      language == 'pr'
                                        ? { ...RtlStyles.textInverse }
                                        : { ...RtlStyles.text },
                                    ]}>
                                    {item.description}
                                  </Text>
                                </View>
                              ))
                            }
                          </View>
                          :
                          <View style={{ paddingVertical: Normalize(0), backgroundColor: Colors.white, flexDirection: rowOrRowreverse(language), borderRadius: 5 }} >

                            {
                              language === "en" ?
                                <Text style={[styles.h1B, { fontSize: Normalize(11) }]} >
                                  {`${nameShorting(listingData.get_user.fname + " " + listingData.get_user.lname)} ${strings.LMS.HASNOTRECIVEDANYREVIEW}`}
                                </Text>
                                :
                                <View style={{ flexDirection: "row" }} >
                                  <Text style={[styles.h1B, { fontSize: Normalize(11) }]} >
                                    {" "}{`${strings.LMS.HASNOTRECIVEDANYREVIEW}`}
                                  </Text>
                                  <Text style={[styles.h1B, { fontSize: Normalize(11) }]} >
                                    {`${nameShorting(listingData.get_user.fname + " " + listingData.get_user.lname)}`}
                                  </Text>
                                </View>
                            }
                          </View>
                        }
                      </View>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </CurveDesing_Component>
        }
      </View>
    </SafeAreaView>
  );
}

export default withRtl(ViewListing);
