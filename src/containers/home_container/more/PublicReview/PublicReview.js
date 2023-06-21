import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView, Button, RefreshControl, Pressable, FlatList } from 'react-native';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import { Colors } from '../../../../constants/colors';
import images from '../../../../constants/images';
import Normalize from '../../../../helpers/Dimens';
import Header from '../../../../components/Header';
import strings from '../../../../constants/lng/LocalizedStrings';
import CustomTab from '../../../../components/CustomTabforReview';
import { myContext } from '../../../../constants/ContextApi';
import { isInt, lastStar, reviewShowinGraystar, reviewShowinStar } from '../../../../constants/RatingCount';
import { ImageLink } from '../../../../constants/LinkPage';
import { nameShorting } from '../../../../constants/NameShorting';
import axiosInstance from '../../../../constants/AxiosCallPage';
import LoaderPage from '../../../../components/LoaderPage';
import Toast from 'react-native-simple-toast';
import CurveDesing_Component from '../../../../constants/CurveDesing_Component';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
import { useNavigation } from '@react-navigation/native';
import { fontfmliy } from '../../../../components/WhichFontFamily';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { BackHandler } from 'react-native';
function PublicReview(props) {
  const navigation = useNavigation()
  const {active,PublicSlug} = props.route.params
  const whichTabActive = (val) => {
    if (val == "P") {
      return "poster"
    } else {
      return "tasker"
    }
  }
  const {language } = useRtlContext();
  const [review_as_poster_review_page, setReview_as_poster_review_page] = useState([])
  const [review_as_tasker_review_page, setReview_as_tasker_review_page] = useState([])
  const [taskerOrposter, setTaskerOrposter] = useState(whichTabActive(active))
  const [loader, setLoader] = useState(false)
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    autoLoad()
    Toast.show(strings.ERROR.REFRESHING)
    setRefreshing(false)
  }, [refreshing]);
  const handleTabChange = val => {
    setTaskerOrposter(val);
  };
  const getReviewData = async () => {
    try {
      setLoader(true)
      let res={
        "params": {
          "slug": PublicSlug
        }
      }
      const data = await axiosInstance.post("show-reviews-using-slug",res)
      // console.log(data.data)
      if (data.data.result) {
        setReview_as_poster_review_page(data.data.result.review_as_poster)
        setReview_as_tasker_review_page(data.data.result.review_as_tasker)
      } else {
        setP_data(true)
      }
      setLoader(false)
    } catch (error) {
      console.log("getReviewData", error)
    }
  }
  useEffect(() => {
    getReviewData()
    return () => {
      getReviewData()
    }
  }, []);


  const onPresstaskerOrposter = () => {
    if (taskerOrposter == "tasker") {
      return review_as_tasker_review_page
    } else {
      return review_as_poster_review_page
    }
  }

  const autoLoad = async () => {
    try {
      // setLoader(true)
      const data = await axiosInstance.post("reviews")
      // console.log(data.data)
      if (data.data.result) {
        setReview_as_poster_review_page(data.data.result.review_as_poster)
        setReview_as_tasker_review_page(data.data.result.review_as_tasker)
      } else {
        setP_data(true)
      }
      // setLoader(false)
    } catch (error) {
      console.log("autoLoad", error)
    }
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);
  const handleBackButtonClick = () => {
    navigation.goBack(null);
    return true;
  }

  return (
    <>
      {
        loader ?
          <LoaderPage />
          :
          <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>
            <View style={[globalstyles.container,{paddingHorizontal: Normalize(0)}]}>
              <Header
                back
                name={"Rating & Reviews"}
                navigation={navigation}
                backFunc={handleBackButtonClick}
              />
              <CurveDesing_Component>
                <CustomTab onChangeTab={handleTabChange} activeTab={taskerOrposter} />
                <View style={{ flex: 1 }} >
                  {
                    onPresstaskerOrposter().length == 0 ?
                      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Text
                          style={{
                            fontSize: Normalize(16),
                            fontFamily: fontfmliy.regular,
                            color: Colors.greylightText,
                          }}>
                          {strings.MYPROFILE.NOREVIEWFOUND2}
                        </Text>
                      </View>
                      :
                      taskerOrposter == "tasker" ?
                        <View style={{}}>
                          {
                            review_as_tasker_review_page.length == 0 ?
                              <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <Text
                                  style={{
                                    fontSize: Normalize(16),
                                    fontFamily: fontfmliy.regular,
                                    color: Colors.greylightText,
                                  }}>
                                  {strings.MYPROFILE.NOREVIEWFOUND2}
                                </Text>
                              </View>
                              :
                              <FlatList
                                refreshControl={
                                  <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                  />
                                }
                                showsVerticalScrollIndicator={false}
                                data={review_as_tasker_review_page}
                                renderItem={({ item, index }) => {
                                  return (
                                    <View
                                      key={index}
                                      style={{ width: "100%", paddingVertical: Normalize(12), borderBottomColor: Colors.boxBorder, borderBottomWidth: Normalize(1) }}>
                                      <View style={{ flexDirection: "row", width: "100%" }}>
                                        <View style={{ flex: 1.5, justifyContent: "center", alignItems: "center" }} >
                                          {/* profile picture */}
                                          <View style={{ width: Normalize(47), height: Normalize(47), borderRadius: Normalize(47) / 2, overflow: "hidden", borderColor: Colors.secondary, borderWidth: 1, justifyContent: "center", alignItems: "center" }}>
                                            {
                                              item.get_poster.profile_picture != null ?
                                                <Image
                                                  source={{ uri: ImageLink.ProfilePhoto + `${item.get_poster.profile_picture}` }}
                                                  style={{ height: "100%", width: "100%", resizeMode: "cover" }}
                                                />
                                                :
                                                <AntDesign name="user" color={Colors.secondary} size={Normalize(23)} />
                                            }
                                          </View>
                                        </View>
                                        <View style={{ flexDirection: 'column', marginRight: Normalize(15), flex: 5 }}>
                                          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                            <Text
                                              // onPress={() => { navigation.navigate("PublicProfile", { PublicSlug: item.get_poster.slug }) }}
                                              style={{ color: Colors.primary, fontFamily: 'Outfit-SemiBold', fontSize: Normalize(12), textAlign: "left" }}>
                                              {nameShorting(item.get_poster.fname + " " + item.get_poster.lname)}
                                            </Text>
                                            {/* star rating */}
                                            <View style={{ flexDirection: "row", alignItems: "center" }} >
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
                                            </View>

                                          </View>

                                          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} >
                                            <Text 
                                              numberOfLines={1}
                                              style={[globalstyles.plantext_bold, { fontSize: Normalize(13), color: Colors.grey, marginVertical: Normalize(1), width: "50%" }]}>
                                              {item.get_task.title}
                                            </Text>
                                            <Text
                                              style={[globalstyles.plantext_regular, { fontSize: Normalize(13), color: Colors.grey, marginVertical: Normalize(1) }]}>
                                              {item.get_task.get_category.name}
                                            </Text>
                                          </View>
                                          <Text
                                            style={[globalstyles.plantext_regular, { fontSize: Normalize(13), color: Colors.greyText }]}>
                                            "{item.description}"
                                          </Text>
                                        </View>
                                      </View>
                                    </View>
                                  )
                                }}
                              />
                          }
                        </View>
                        :
                        <View style={{ flex: 1, }}>
                          {
                            review_as_poster_review_page.length == 0 ?
                              <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <Text
                                  style={{
                                    fontSize: Normalize(16),
                                    fontFamily: fontfmliy.regular,
                                    color: Colors.greylightText,
                                  }}>
                                  {strings.MYPROFILE.NOREVIEWFOUND2}
                                </Text>
                              </View>
                              :
                              <FlatList
                                refreshControl={
                                  <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                  />
                                }
                                showsVerticalScrollIndicator={false}
                                data={review_as_poster_review_page}
                                renderItem={({ item, index }) => {
                                  return (
                                    <View
                                      key={index}
                                      style={{ width: "100%", paddingVertical: Normalize(12), borderBottomColor: Colors.boxBorder, borderBottomWidth: Normalize(1) }}>
                                      <View style={{ flexDirection:"row", width: "100%" }}>
                                        <View style={{ flex: 1.5, justifyContent: "center", alignItems: "center" }} >
                                          {/* profile picture */}
                                          <View style={{ width: Normalize(47), height: Normalize(47), borderRadius: Normalize(47) / 2, overflow: "hidden", borderColor: Colors.secondary, borderWidth: 1, justifyContent: "center", alignItems: "center" }}>
                                            {
                                              item.get_tasker.profile_picture != null ?
                                                <Image
                                                  source={{ uri: ImageLink.ProfilePhoto + `${item.get_tasker.profile_picture}` }}
                                                  style={{ height: "100%", width: "100%", resizeMode: "cover" }}
                                                />
                                                :
                                                <AntDesign name="user" color={Colors.secondary} size={Normalize(23)} />
                                            }
                                          </View>
                                        </View>
                                        <View style={{ flexDirection: 'column', marginRight: Normalize(15), flex: 5 }}>
                                          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                            <Text
                                              // onPress={() => { navigation.navigate("PublicProfile", { PublicSlug: item.get_tasker.slug }) }}
                                              style={{ color: Colors.primary, fontFamily: 'Outfit-SemiBold', fontSize: Normalize(12), textAlign: "left" }}>
                                              {nameShorting(item.get_tasker.fname + " " + item.get_tasker.lname)}
                                            </Text>
                                            {/* star rating */}
                                            <View style={{ flexDirection: "row", alignItems: "center" }} >
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
                                            </View>
                                          </View>
                                          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} >
                                            <Text 
                                              numberOfLines={1}
                                              style={[globalstyles.plantext_bold, { fontSize: Normalize(13), color: Colors.grey, marginVertical: Normalize(1), width: "50%" }]}>
                                              {item.get_task.title}
                                            </Text>
                                            <Text
                                              style={[globalstyles.plantext_regular, { fontSize: Normalize(13), color: Colors.grey, marginVertical: Normalize(1) }]}>
                                              {item.get_task.get_category.name}
                                            </Text>
                                          </View>
                                          <Text
                                            style={[globalstyles.plantext_regular, { fontSize: Normalize(13), color: Colors.greyText }]}>
                                            "{item.description}"
                                          </Text>
                                        </View>
                                      </View>
                                    </View>
                                  )
                                }}
                              />
                          }
                        </View>
                  }
                </View>
              </CurveDesing_Component>
            </View>
          </SafeAreaView >
      }
    </>

  );
}

export default withRtl(PublicReview);