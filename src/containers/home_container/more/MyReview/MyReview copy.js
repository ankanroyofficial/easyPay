import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView, Button } from 'react-native';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import Entypo from 'react-native-vector-icons/Entypo';
import { Colors } from '../../../../constants/colors';
import images from '../../../../constants/images';
import Normalize from '../../../../helpers/Dimens';
import Header from '../../../../components/Header';
import styles from './Styles';
import strings from '../../../../constants/lng/LocalizedStrings';
import CustomTab from '../../../../components/CustomTabforReview';
import { myContext } from '../../../../constants/ContextApi';
import axios from 'axios';
import { leftOrRight } from '../../../../constants/RowOrRowreverse';
import { isInt, lastStar, reviewShowinGraystar, reviewShowinStar } from '../../../../constants/RatingCount';
import { questionEnglishTimeShow, questionPersianTimeShow } from '../../../../constants/DateShow';
import { axiosUrl, ImageLink } from '../../../../constants/LinkPage';
import { nameShorting } from '../../../../constants/NameShorting';
import axiosInstance from '../../../../constants/AxiosCallPage';

function MyReview({ navigation }) {
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
  const { token } = useContext(myContext)
  const [taskerOrposter, setTaskerOrposter] = useState("tasker")

  const [review_as_poster, setReview_as_poster] = useState([])
  const [review_as_tasker, setReview_as_tasker] = useState([])
  const handleTabChange = val => {
    setTaskerOrposter(val);
  };
  const getReviewData = async () => {
    try {
      const data = await axiosInstance.post("reviews")
      // console.log(data.data)
      if (data.data.result) {
        setReview_as_poster(data.data.result.review_as_poster)
        setReview_as_tasker(data.data.result.review_as_tasker)
      } else {
        setP_data(true)
      }
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
      return review_as_tasker
    } else {
      return review_as_poster
    }
  }


  return (
    <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>

      <View style={styles.container}>
        <Header
          back
          name={strings.MYREVIEW.HEADERTEXT}
          navigation={navigation}
        />
        <CustomTab onChangeTab={handleTabChange} />
        <ScrollView
        showsVerticalScrollIndicator={false}
        >
          {
            onPresstaskerOrposter().length == 0 ?
              <Text
                style={{
                  fontSize: Normalize(14),
                  fontFamily: 'roboto-medium',
                  color: Colors.greyText,
                  textAlign: "center",
                  margin: Normalize(10)
                }}>{strings.MYPROFILE.NOREVIEWFOUND2}</Text>
              :

              taskerOrposter == "tasker" ?
                <View style={{ marginTop: Normalize(10) }}>
                  {
                    review_as_tasker.length == 0 ?

                      <View style={{ padding: 15 }}>
                        <Text
                          style={{
                            fontSize: Normalize(14),
                            fontFamily: 'roboto-medium',
                            color: Colors.lightGrey,
                            textAlign: "center"
                          }}>
                          {strings.MYPROFILE.NOREVIEWFOUND2}
                        </Text>
                      </View> :
                      review_as_tasker.map((item, index) => (
                        <View key={index} style={{ flexDirection: 'column', padding: Normalize(15), paddingVertical: Normalize(15), borderBottomColor: Colors.lightGrey, borderBottomWidth: 0.2 }}>
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
                              {/* ***************as a tasker********** */}
                              <View style={{ flexDirection: 'column', marginHorizontal: 15 }}>
                                <Text 
                                onPress={() => {navigation.navigate("PublicProfile", { PublicSlug: item.get_poster.slug })}}
                                style={{ color: Colors.primary, fontFamily: 'roboto-bold', fontSize: Normalize(12), textAlign: language == "en" ? "left" : "right" }}>{nameShorting(item.get_poster.fname + " " + item.get_poster.lname)}</Text>
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
                                  {/* <Text style={{ color: '#818181', marginLeft: 2, fontFamily: 'roboto-regular', fontSize: Normalize(11) }}>({language == "en" ? item.rating : engToPersian(item.rating)})</Text> */}
                                </View>
                              </View>
                            </View>
                            <Text style={{
                              color: Colors.black, fontFamily: 'roboto-regular', fontSize: Normalize(10.5),
                              alignSelf: 'center', flex: 1, textAlign: 'right', marginRight: 10
                            }}>{language == "pr" ? questionPersianTimeShow(item.created_at) : questionEnglishTimeShow(item.created_at)}</Text>
                          </View>
                          <Text
                            onPress={() => {
                              navigation.navigate('TaskDetails', { show: item.get_task.slug })
                              // console.log(item.get_task.slug)
                            }}
                            numberOfLines={2}
                            style={{
                              color: Colors.primary, fontFamily: 'roboto-bold',
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
                <View style={{ marginTop: Normalize(10) }}>
                  {
                    review_as_poster.length == 0 ?
                      <View style={{ padding: 15 }}>
                        <Text
                          style={{

                            fontSize: Normalize(14),
                            fontFamily: 'roboto-medium',
                            color: Colors.lightGrey,
                            textAlign: "center"
                          }}>
                          {strings.MYPROFILE.NOREVIEWFOUND2}
                        </Text>
                      </View> :
                      review_as_poster.map((item, index) => (
                        <View key={index} style={{ flexDirection: 'column', padding: Normalize(15), paddingVertical: Normalize(15), borderBottomColor: Colors.lightGrey, borderBottomWidth: 0.2 }}>
                          <View style={{ flexDirection: language == "pr" ? "row-reverse" : "row" }}>
                            <View style={{ flexDirection: language == "pr" ? "row-reverse" : "row" }}>

                              <View style={{ width: 50, height: 50, backgroundColor: "#f5f5f5", borderRadius: 25, overflow: "hidden" }}>
                                {
                                  item.get_tasker.profile_picture != null ?
                                    <Image
                                      source={{ uri: ImageLink.ProfilePhoto + `${item.get_tasker.profile_picture}` }}
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
                                  onPress={() => {navigation.navigate("PublicProfile", { PublicSlug: item.get_tasker.slug })}}
                                  style={{ color: Colors.primary, fontFamily: 'roboto-bold', fontSize: Normalize(12), textAlign: language == "en" ? "left" : "right" }}>{nameShorting(item.get_tasker.fname + " " + item.get_tasker.lname)}</Text>
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
                                  {/* <Text style={{ color: '#818181', marginLeft: 2, fontFamily: 'roboto-regular', fontSize: Normalize(11) }}>({language == "en" ? item.rating : engToPersian(item.rating)})</Text> */}
                                </View>
                              </View>
                            </View>
                            <Text style={{
                              color: Colors.black, fontFamily: 'roboto-regular', fontSize: Normalize(10.5),
                              alignSelf: 'center', flex: 1, textAlign: 'right', marginRight: 10
                            }}>{language == "pr" ? questionPersianTimeShow(item.created_at) : questionEnglishTimeShow(item.created_at)}</Text>
                          </View>
                          <Text
                            onPress={() => {
                              navigation.navigate('TaskDetails', { show: item.get_task.slug })
                            }}
                            numberOfLines={2}
                            style={{
                              color: Colors.primary, fontFamily: 'roboto-bold',
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


          }
        </ScrollView>

      </View>
    </SafeAreaView>
  );
}

export default withRtl(MyReview);