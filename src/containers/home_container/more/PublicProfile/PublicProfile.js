import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Pressable,
  Dimensions,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import { Colors } from '../../../../constants/colors';
import images from '../../../../constants/images';
import Normalize from '../../../../helpers/Dimens';
import Feather from 'react-native-vector-icons/Feather';
import strings from '../../../../constants/lng/LocalizedStrings';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoaderPage from '../../../../components/LoaderPage';
import moment from 'moment';
import { engToPersian } from '../../../../constants/EnglishToPersian';
import { nameShorting } from '../../../../constants/NameShorting';
import { axiosUrl, ImageLink } from '../../../../constants/LinkPage';
import {
  isInt,
  lastStar,
  reviewShowinGraystar,
  reviewShowinStar,
} from '../../../../constants/RatingCount';
import { addCommaAndTranslateInPersian } from '../../../../constants/NumberWithCommaAndInPersian';
import { leftOrRight } from '../../../../constants/RowOrRowreverse';
import Loader_Profile from '../../../../components/loader/Profile/Loader_Profile';
import { navigateTo } from '../../../../constants/NavigationToProfile';
import CurveDesing_Component from '../../../../constants/CurveDesing_Component';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
import BlueText_doubleArrow from '../../../../components/BlueText_doubleArrow';
import { fontfmliy } from '../../../../components/WhichFontFamily';
import Header from '../../../../components/ProfileHeader';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { Modal } from 'react-native';
import { Fragment } from 'react';
import globalStyle_esyPay from '../../../../constants/globalStyles/GlobalStyle_esyPay';
import Button from '../../../../components/Button';
const { width } = Dimensions.get('window');
function PublicProfile({ navigation, route }) {
  const { language } = useRtlContext();
  const { PublicSlug } = route.params;
  const [profileData, setProfileData] = useState(null);
  const [loader, setLoader] = useState(false);
  const [getAroundData, setGetAroundData] = useState([]);
  const [getl, setl] = useState('');
  const [aboutmeExpand, setAboutmeExpand] = React.useState(false);
  const [review_as_poster, setReview_as_poster] = useState([]);
  const [review_as_tasker, setReview_as_tasker] = useState([]);
  const [reviewSection, setReviewSection] = useState('T');
  const [reviewSectionAbove, setReviewSectionAbove] = useState('T');
  const [user_completed_task_as_poster, setUser_completed_task_as_poster] =
    useState(0);
  const [user_completed_task_as_tasker, setUser_completed_task_as_tasker] =
    useState(0);
  const [listData, setListData] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [tierLogo, setTierLogo] = useState('');

  const [getAround, setGetAround] = useState([]);

  const [alllanguage, setAlllanguage] = useState([]);
  const [allSkill, setAllSkill] = useState([]);
  const [certificateList, setCertificateList] = useState([]);
  const [isNoReliabilityModal, setIsNoReliabilityModal] = React.useState(false);

  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = React.useState(false);
  const [portfolioOpenImageUrl, setPortfolioOpenImageUrl] = React.useState("");

  // console.log(portfolioOpenImageUrl)

  const onpressPortfolioImage = () => {
    if (isPortfolioModalOpen) {
      setIsPortfolioModalOpen(!isPortfolioModalOpen)
      setPortfolioOpenImageUrl("")
    } else {
      setIsPortfolioModalOpen(!isPortfolioModalOpen)
    }
  }

  const onpressNoReliability = () => {
    setIsNoReliabilityModal(!isNoReliabilityModal)
  }

  const reliabilityTextForForAsAClient = `Completion Rate is the number of times a Client has assigned a Eazypayer for their task compared to the number of times they completed an assigned task without cancelling.${'\n\n'}E.G. 100% Completion Rate = They have completed all tasks they have assigned.${"\n\n"}E.G. 50% Completion Rate = They have completed only half of the tasks they have assigned.`
  const reliabilityTextForAsAEazyPayerTasker = `A Eazypayer's Reliability Rating is how often they have reliably completed a task they were assigned to.${"\n\n"}If the Eazypayer fails to complete a task as they originally promised to or fails to show up for a task,their Reliability Rating will be negatively affected.${"\n\n"}Eazypayer are independent contractors;This feature brings further transparency and promotes Eazypayers who carry out professional and reliable work.`

  const ReliabilityModal = () => {
    return (
      <Modal
        transparent
        visible={isNoReliabilityModal}
        onRequestClose={onpressNoReliability}
      >
        <View style={{ flex: 1, backgroundColor: "rgba(52,52,52,0.5)", justifyContent: "center", alignItems: "center" }} >
          <View style={{ padding: Normalize(20), width: "80%", backgroundColor: Colors.primary, elevation: 10, borderRadius: Normalize(8) }} >
            <Fragment>
              <View style={{ alignItems: "center" }}>
                <View style={{
                  height: Normalize(60), width: Normalize(60), backgroundColor: Colors.primary, marginTop: Normalize(-50),
                  borderRadius: Normalize(30), alignItems: 'center', justifyContent: 'center'
                }}>
                  <View style={{
                    height: Normalize(50), width: Normalize(50), backgroundColor: Colors.white,
                    borderRadius: Normalize(25), alignSelf: 'center', justifyContent: 'center', alignItems: 'center'
                  }} >
                    <Entypo
                      name="info"
                      size={Normalize(30)}
                      color={Colors.primary}
                    />
                  </View>
                </View>
                <Text style={[globalStyle_esyPay.detailsText, {
                  fontSize: Normalize(14), marginVertical: Normalize(10),
                  marginHorizontal: Normalize(10), textAlign: 'left', color: Colors.white
                }]}>
                  {reviewSectionAbove == "T" ?
                    reliabilityTextForAsAEazyPayerTasker :
                    reliabilityTextForForAsAClient}
                </Text>
              </View>
            </Fragment>
          </View>
          <TouchableOpacity
            onPress={onpressNoReliability}
            style={{ height: Normalize(50), width: Normalize(50), borderRadius: Normalize(50) / 2, backgroundColor: Colors.primary, elevation: 10, justifyContent: "center", alignItems: "center", marginTop: Normalize(10) }} >
            <Entypo name="cross" color={Colors.primaryBackground} size={Normalize(35)} />
          </TouchableOpacity>
        </View>
      </Modal>
    )
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getData();
    setRefreshing(false);
  }, [refreshing]);

  const getData = async () => {
    try {
      setLoader(true)

      const data = await axios.post(`${axiosUrl.URL}public-profile`, {
        jsonrpc: '2.0',
        params: {
          slug: `${PublicSlug}`,
          // "slug": "testapp-2-31"
        },
      });

      // console.log("++++++++++++++++++", (data.data.result.user.get_around_by)[0])

      if (data.data.result) {
               setListData(data.data.result.my_listings)
        if (data.data.result.UserToCertificate != null) {
          setCertificateList(data.data.result.UserToCertificate)
        }
        setUser_completed_task_as_poster(data.data.result.user_completed_task_as_poster)
        setUser_completed_task_as_tasker(data.data.result.user_completed_task_as_tasker)
        setReview_as_poster(data.data.result.review_as_poster)
        setReview_as_tasker(data.data.result.review_as_tasker)
        setTierLogo(data.data.result.tier.tier_logo)
        const {
          display_name,
          background_image, city,
          location, online_status,
          profile_picture,
          about_me,
          get_user_to_portfolio,
          get_user_skill,
          fname,
          lname,
          tagline,
          state,
          get_country_info,
          created_at,
          avg_review_as_poster,
          tot_review_as_poster,
          tot_review_as_tasker,
          avg_review_as_tasker,
          phone, status,
          is_phone_verified, is_email_verified,
          get_around_by, get_language
        } = data.data.result.user

        let newGet_around_by = JSON.parse(get_around_by);

        setProfileData({
          about_me,
          display_name,
          background_image,
          city,
          location,
          online_status,
          profile_picture,
          get_user_to_portfolio,
          get_user_skill,
          fname, lname,
          tagline,
          state,
          get_country_info,
          created_at,
          avg_review_as_poster,
          tot_review_as_poster,
          tot_review_as_tasker,
          avg_review_as_tasker,
          phone, status, newGet_around_by, get_language
        })
        setLoader(false)
      }
    } catch (error) {
      console.log("getData", error)
      setLoader(false)
    }
  }
  useEffect(() => {
    getData();
    return getData();
  }, []);

  const renderItem = ({ item, index }) => {
    return (
      <Pressable
        onPress={() =>
          navigation.navigate('ViewListing', { slugName: item.slug })
        }
        key={index}
        style={{
          width: width * 0.37,
          height: Normalize(132),
          borderRadius: Normalize(5),
          backgroundColor: Colors.white,
          marginVertical: width * 0.015,
          borderWidth: Normalize(1),
          borderColor: Colors.boxBorder,
          marginRight: width * 0.015,
        }}>
        <View style={{ flex: 1, margin: Normalize(4) }}>
          <View
            style={{
              height: width * 0.24,
              width: '100%',
              backgroundColor: '#f5f5f5',
              borderRadius: Normalize(5),
              overflow: 'hidden',
            }}>
            <ImageBackground
              resizeMode="cover"
              style={{ height: '100%', width: '100%', resizeMode: 'cover' }}
              source={{ uri: ImageLink.ListingImage + item.image }}>
              <View
                style={{
                  height: width * 0.051,
                  width: width * 0.09,
                  backgroundColor: Colors.yellow2,
                  margin: width * 0.02,
                  borderRadius: 3,
                  alignSelf: 'flex-end',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    height: Normalize(10),
                    width: Normalize(10),
                    marginRight: Normalize(2),
                  }}>
                  <Image
                    source={images.white_star}
                    style={[globalstyles.imageFit, { resizeMode: 'cover' }]}
                  />
                </View>
                <Text
                  style={{
                    fontSize: Normalize(10),
                    color: Colors.white,
                    fontFamily: 'roboto-medium',
                    textAlign: leftOrRight(language),
                    marginHorizontal: '2%',
                  }}>
                  {Math.round(item.get_user.avg_review_as_tasker)}
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View
            style={{
              flex: 1,
              marginTop: '3%',
              padding: Normalize(3),
              justifyContent: 'space-evenly',
            }}>
            <Text
              numberOfLines={1}
              style={{
                fontSize: Normalize(11),
                color: '#595959',
                fontFamily: 'roboto-regular',
                textAlign: leftOrRight(language),
                lineHeight: Normalize(12),
              }}>
              {item.title}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                fontSize: Normalize(10),
                color: Colors.greylightText,
                fontFamily: 'roboto-regular',
                textAlign: leftOrRight(language),
              }}>
              {strings.GETITDONE.CARDTEXT}{' '}
              <Text style={{ fontFamily: 'roboto-regular', color: '#000000' }}>
                {strings.BROWSEFILTER.TOMAN}{' '}
                {Math.round(item.min_amount_package)}
              </Text>
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };
  const isAnyPortfolioApprove = (val) => {
    let count = 0;
    val.map((item) => {
      if (item.is_approved == "yes") {
        count = count + 1;
      }
    })
    return count > 0 ? true : false;
  }
  const isAnyCertificateApprove = (val) => {
    let count = 0;
    val.map((item) => {
      if (item.is_verify == "Y") {
        count = count + 1;
      }
    })
    return count > 0 ? true : false;
  }

  const PortfolioImageModal = ({ imageUrl, item }) => {
    return (
      <Modal
        transparent
        visible={isPortfolioModalOpen}
        onRequestClose={onpressPortfolioImage}
      >
        <View style={{ flex: 1, backgroundColor: "rgba(52,52,52,0.9)" }} >
          <View style={{ flex: 1 }} >
            <Image source={{ uri: ImageLink.portfolio + imageUrl }} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
          </View>
          <View style={{ paddingVertical: Normalize(5) }} >
            <Button name={"Back"} onPress={onpressPortfolioImage} style={{ alignSelf: "center", backgroundColor: Colors.secondary, height: Normalize(40), width: "96%" }} />
          </View>
        </View>
      </Modal>
    )
  }
  return (
    <>
      {
        loader || profileData == null ?
          <ScrollView showsVerticalScrollIndicator={false} >
            <View style={{ flex: 1 }} >
              <Loader_Profile />
            </View>
          </ScrollView>
          :
          <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1 }}>
            <View style={styles.container}>
              <Header
                navigation={navigation}
                back
                name={nameShorting(profileData.fname + " " + profileData.lname)}
              />
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh} />
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: Normalize(55), backgroundColor: Colors.grayf8 }}
              >
                <View
                  style={{
                    flex: 1,
                    backgroundColor: Colors.grayf8
                  }}>
                  {/* name and profile pic */}
                  <View style={{ height: Normalize(10), width: "100%", backgroundColor: Colors.primary }} />
                  <View style={{
                    width: width,
                    height: Normalize(100),
                    backgroundColor: Colors.primary,
                    flexDirection: "row",
                    alignItems: "center",
                  }}>
                    {/* profile picture */}
                    <View style={{ height: Normalize(90), width: Normalize(90), borderRadius: Normalize(7), backgroundColor: Colors.white, marginHorizontal: Normalize(10), overflow: "hidden" }} >
                      <Image
                        source={
                          profileData.profile_picture != null ?
                            { uri: `${ImageLink.ProfilePhoto}${profileData.profile_picture}` } :
                            { uri: ImageLink.BlankProfileImage }
                        }
                        style={{ height: "100%", width: "100%", resizeMode: "contain" }}
                      />
                    </View>
                    <View style={{ flex: 1, marginRight: Normalize(10) }} >
                      <Text style={[globalstyles.plantext_bold, { color: Colors.white, fontSize: Normalize(16), marginBottom: Normalize(1) }]}>{nameShorting(profileData.fname + " " + profileData.lname)}</Text>
                    </View>
                  </View>

                  {/* reviews */}
                  <View style={{ width: width, height: Normalize(140), alignItems: "center" }} >
                    <View style={{ height: "40%", width: "100%", backgroundColor: Colors.primary }} ></View>
                    <View style={{ height: Normalize(120), width: width * 0.9, borderColor: Colors.boxBorder, borderWidth: Normalize(1), borderRadius: Normalize(8), position: "absolute", top: Normalize(10), overflow: "hidden" }} >
                      <View style={{ height: Normalize(40), width: "100%", flexDirection: "row" }} >
                        <Pressable
                          onPress={() => setReviewSectionAbove('T')}
                          style={{ flex: 1, backgroundColor: reviewSectionAbove == "T" ? Colors.secondary : Colors.grayf5, justifyContent: 'center', alignItems: "center" }} >
                          <Text
                            style={{
                              fontSize: Normalize(14),
                              color: reviewSectionAbove == 'T' ? Colors.white : Colors.grey,
                              fontFamily: fontfmliy.bold
                            }}>
                            {strings.MYPROFILE.TAB1}
                          </Text>
                        </Pressable>
                        <Pressable
                          onPress={() => setReviewSectionAbove('P')}
                          style={{ flex: 1, backgroundColor: reviewSectionAbove == "P" ? Colors.secondary : Colors.grayf5, justifyContent: 'center', alignItems: "center" }} >
                          <Text
                            style={{
                              fontSize: Normalize(14),
                              color: reviewSectionAbove == 'P' ? Colors.white : Colors.grey,
                              fontFamily: fontfmliy.bold
                            }}>
                            {strings.MYPROFILE.TAB2}
                          </Text>
                        </Pressable>
                      </View>
                      {/* review */}
                      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: Colors.white }}>
                        {
                          reviewSectionAbove == "T" ?
                            // user_completed_task_as_tasker <= 0 ?
                            profileData.tot_review_as_tasker == 0 ?
                              // tasker
                              <View style={{ justifyContent: "center", alignItems: "center", paddingVertical: Normalize(10) }} >
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                                  <Pressable
                                      onPress={() => navigation.navigate("PublicReview",{active:reviewSectionAbove,PublicSlug:PublicSlug})}
                                    style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '45%', }} >
                                    <Text style={[globalstyles.plantext_outfit_regular, { color: '#343535', marginTop: Normalize(5) }]}>
                                      0.0
                                    </Text>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                      <View style={{ height: Normalize(10), width: Normalize(50), marginHorizontal: Normalize(2) }} >
                                        <Image source={images.allgray} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                      </View>
                                    </View>
                                    <Text style={[globalstyles.plantext_outfit_regular, { color: Colors.grey, marginBottom: Normalize(2) }]}>
                                      No review yet
                                    </Text>
                                  </Pressable>
                                  <View style={{ height: '100%', width: 2, backgroundColor: Colors.grey }} />

                                  <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '45%' }} >

                                    <Pressable
                                      onPress={onpressNoReliability}
                                      style={{ flexDirection: 'row' }} >
                                      <Text style={[globalstyles.plantext_outfit_regular, {
                                        color: Colors.grey, fontSize: Normalize(11),
                                        marginBottom: Normalize(2), alignSelf: 'center', marginRight: 3
                                      }]}>
                                        No Reliability Rating yet
                                      </Text>
                                      <MaterialIcons
                                        name="info"
                                        size={Normalize(10)}
                                        color={Colors.blue}
                                        style={{ alignSelf: 'center' }}
                                      />
                                    </Pressable>
                                  </View>
                                </View>
                                <Text style={[globalstyles.plantext_outfit_regular, { fontFamily: 'Lato-Bold', color: '#747474', marginTop: 5 }]}>{"No completed Task"}</Text>
                              </View>
                              :
                              <View style={{ justifyContent: "center", alignItems: "center", paddingVertical: Normalize(10) }} >

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                                  <Pressable
                                      onPress={() => navigation.navigate("PublicReview",{active:reviewSectionAbove,PublicSlug:PublicSlug})}
                                    style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '45%' }} >
                                    <Text style={[globalstyles.plantext_outfit_regular, { color: '#343535', marginTop: Normalize(5) }]}>
                                      {addCommaAndTranslateInPersian(profileData.avg_review_as_tasker, language)}.0
                                    </Text>
                                    <View style={{ flexDirection: language == "pr" ? 'row-reverse' : "row", alignItems: "center" }}>
                                      {
                                        reviewShowinStar(profileData.avg_review_as_tasker).map((item, index) => (
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
                                        reviewShowinGraystar(reviewShowinStar(profileData.avg_review_as_tasker)).map((item, index) => (
                                          <View key={index} style={{ height: Normalize(10), width: Normalize(10), marginHorizontal: Normalize(0.5) }} >
                                            <Image source={images.stargray} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                          </View>
                                        ))
                                      }
                                      <Text style={[globalstyles.plantext_outfit_regular, { color: '#343535', margin: Normalize(2) }]}>
                                        ({addCommaAndTranslateInPersian(profileData.tot_review_as_tasker, language)})
                                      </Text>
                                    </View>
                                    <Text style={[globalstyles.plantext_outfit_regular, { color: Colors.grey, marginBottom: Normalize(2) }]}>
                                      View reviews
                                    </Text>
                                  </Pressable>
                                  <View style={{ height: '100%', width: 2, backgroundColor: Colors.grey }} />

                                  <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '45%' }} >
                                    <Text style={{
                                      color: '#343535', marginTop: Normalize(5), borderColor: Colors.yellow, borderWidth: 1, borderRadius: 5,
                                      paddingHorizontal: 10, paddingVertical: 5, backgroundColor: "#FAE4B5", fontFamily: 'Lato-Bold'
                                    }}>
                                      100%</Text>
                                    <Pressable
                                      onPress={onpressNoReliability} style={{ flexDirection: 'row' }} >
                                      <Text style={[globalstyles.plantext_outfit_regular, {
                                        marginTop: 5, color: Colors.grey,
                                        marginBottom: Normalize(2), alignSelf: 'center', marginRight: 3
                                      }]}>
                                        Reliability Rating
                                      </Text>
                                      <MaterialIcons
                                        name="info"
                                        size={Normalize(10)}
                                        color={Colors.blue}
                                        style={{ alignSelf: 'center', marginTop: 5, }}
                                      />
                                    </Pressable>

                                  </View>
                                </View>


                                <Text style={[globalstyles.plantext_outfit_regular, { fontFamily: 'Lato-Bold', color: '#747474' }]}>{strings.MYPROFILE.COMPLETEDTASKS} : {addCommaAndTranslateInPersian(user_completed_task_as_tasker, language)}</Text>
                              </View>
                            :
                            // ********POSTER*******
                            profileData.tot_review_as_poster == 0 ?
                              <View style={{ justifyContent: "center", alignItems: "center", paddingVertical: Normalize(10) }} >

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                                  <Pressable
                                      onPress={() => navigation.navigate("PublicReview",{active:reviewSectionAbove,PublicSlug:PublicSlug})}
                                    style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '45%' }} >
                                    <Text style={[globalstyles.plantext_outfit_regular, { color: '#343535', marginTop: Normalize(5) }]}>
                                      0.0
                                    </Text>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                      <View style={{ height: Normalize(10), width: Normalize(50), marginHorizontal: Normalize(2) }} >
                                        <Image source={images.allgray} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                      </View>
                                    </View>
                                    <Text style={[globalstyles.plantext_outfit_regular, { color: Colors.grey, marginBottom: Normalize(2) }]}>
                                      No review yet
                                    </Text>
                                  </Pressable>
                                  <View style={{ height: '100%', width: 2, backgroundColor: Colors.grey }} />
                                  <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '45%' }} >
                                    <Pressable
                                      onPress={onpressNoReliability}
                                      style={{ flexDirection: "row" }}
                                    >
                                      <Text style={[globalstyles.plantext_outfit_regular, {
                                        color: Colors.grey, fontSize: Normalize(11),
                                        marginBottom: Normalize(2), alignSelf: 'center', marginRight: 3
                                      }]}>
                                        No Reliability Rating yet
                                      </Text>
                                      <MaterialIcons
                                        name="info"
                                        size={Normalize(10)}
                                        color={Colors.blue}
                                        style={{ alignSelf: 'center', }}
                                      />
                                    </Pressable>
                                  </View>
                                </View>


                                <Text style={[globalstyles.plantext_outfit_regular, { fontFamily: 'Lato-Bold', color: '#747474', marginTop: 5 }]}>{"No completed Task"}</Text>
                              </View>

                              :
                              <View style={{ justifyContent: "center", alignItems: "center", paddingVertical: Normalize(10) }} >
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                                  <Pressable
                                      onPress={() => navigation.navigate("PublicReview",{active:reviewSectionAbove,PublicSlug:PublicSlug})}
                                    style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '45%' }} >

                                    <Text style={[globalstyles.plantext_outfit_regular, { color: '#343535', marginTop: Normalize(5) }]}>
                                      {addCommaAndTranslateInPersian(profileData.avg_review_as_poster, language)}.0
                                    </Text>
                                    <View style={{ flexDirection: language == "pr" ? 'row-reverse' : "row", alignItems: "center" }}>

                                      {
                                        reviewShowinStar(profileData.avg_review_as_poster).map((item, index) => (
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
                                        reviewShowinGraystar(reviewShowinStar(profileData.avg_review_as_poster)).map((item, index) => (
                                          <View key={index} style={{ height: Normalize(10), width: Normalize(10), marginHorizontal: Normalize(0.5) }} >
                                            <Image source={images.stargray} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                                          </View>
                                        ))
                                      }
                                      <Text style={[globalstyles.plantext_outfit_regular, { color: '#343535', margin: Normalize(2) }]}>
                                        ({addCommaAndTranslateInPersian(profileData.tot_review_as_poster, language)})
                                      </Text>
                                    </View>
                                    <Text style={[globalstyles.plantext_outfit_regular, { color: Colors.grey, marginBottom: Normalize(2) }]}>
                                      View reviews
                                    </Text>
                                  </Pressable>
                                  <View style={{ height: '100%', width: 2, backgroundColor: Colors.grey }} />

                                  <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '45%' }} >
                                    <Text style={{
                                      color: '#343535', marginTop: Normalize(5), borderColor: Colors.yellow, borderWidth: 1, borderRadius: 5,
                                      paddingHorizontal: 10, paddingVertical: 5, backgroundColor: "#FAE4B5", fontFamily: 'Lato-Bold'
                                    }}>
                                      100%
                                    </Text>
                                    <Pressable
                                      onPress={onpressNoReliability} style={{ flexDirection: 'row' }} >
                                      <Text style={[globalstyles.plantext_outfit_regular, {
                                        marginTop: 5, color: Colors.grey,
                                        marginBottom: Normalize(2), alignSelf: 'center', marginRight: 3
                                      }]}>
                                        Reliability Rating
                                      </Text>
                                      <MaterialIcons
                                        name="info"
                                        size={Normalize(10)}
                                        color={Colors.blue}
                                        style={{ alignSelf: 'center', marginTop: 5, }}
                                      />
                                    </Pressable>

                                  </View>
                                </View>
                                <Text style={[globalstyles.plantext_outfit_regular, { fontFamily: 'Lato-Bold', color: Colors.greyText }]}>{addCommaAndTranslateInPersian(user_completed_task_as_poster, language)} {strings.MYPROFILE.COMPLETEDTASKS}</Text>

                              </View>
                        }
                      </View>

                    </View>
                  </View>
                  {/* About section */}
                  {
                    profileData.about_me != null &&
                    <View style={styles.borderwithpadding} >
                      <Text
                        style={styles.newBoxTitle}>
                        About Me
                      </Text>
                      <Text
                        numberOfLines={aboutmeExpand ? 1000 : 8}
                        style={[globalstyles.plantext_outfit_regular, { color: "#4D4E50" }]}>{profileData.about_me != null && profileData.about_me}
                      </Text>

                      {profileData.about_me != null && (profileData.about_me).length > 400 && <Text onPress={() => setAboutmeExpand(!aboutmeExpand)} style={{ fontSize: Normalize(11), fontFamily: 'Outfit-Regular', color: aboutmeExpand ? Colors.secondary : Colors.primary, textAlign: leftOrRight(language), marginVertical: "2%" }}>{aboutmeExpand ? strings.POSTTASK.READLESS : strings.POSTTASK.READMORE}</Text>}

                    </View>
                  }
                  {isAnyCertificateApprove(certificateList) && <View style={styles.borderwithpadding} >
                    <Text style={styles.newBoxTitle}>
                      Certified Qualifications
                    </Text>
                    {certificateList.map((item, index) => (

                      item.is_verify == "Y" &&
                      <Pressable
                        onPress={() => console.log(item)}
                        key={index} style={{ width: "100%", paddingVertical: Normalize(4), flexDirection: "row", alignItems: "center" }} >
                        <View style={{ height: Normalize(15), width: Normalize(15), borderRadius: Normalize(15) / 2 }} >
                          <Image source={images.greycross_new} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                        </View>
                        <View style={{ flex: 1 }} >
                          <Text numberOfLines={1} style={{
                            fontSize: Normalize(12),
                            color: Colors.greyText,
                            fontFamily: fontfmliy.regular,
                            paddingHorizontal: Normalize(12)
                          }} >{item.qualification_title}</Text>
                        </View>
                      </Pressable>
                    ))}

                  </View>}

                  {/* Langauge */}

                  {(profileData.get_language).length > 0 &&
                    <View style={styles.borderwithpadding} >
                      <Text style={styles.newBoxTitle}>
                        {strings.MYPROFILE.LANGUAGE}
                      </Text>
                      <View style={{ flexDirection: "row", flexWrap: "wrap" }} >
                        {profileData.get_language.map(
                          (item, index) => (
                            <View
                              key={index}
                              style={styles.smallBox}>
                              <Text
                                style={styles.smallBoxText}>
                                {item.get_language_name.language}
                              </Text>
                            </View>)
                        )}
                      </View>
                    </View>}

                  {/* Portfolio section */}

                  {/* is_approved portfolio yes/no */}
                  {
                    isAnyPortfolioApprove(profileData.get_user_to_portfolio) &&
                    <View style={styles.borderwithpadding} >
                      <Text style={styles.newBoxTitle}>
                        {strings.MYPROFILE.PORTFOLIO}
                      </Text>
                      <FlatList
                        data={profileData.get_user_to_portfolio}
                        style={{ marginVertical: Normalize(10) }}
                        horizontal={true}
                        renderItem={({ item, index }) => (
                          item.is_approved == "yes" &&
                          <Pressable
                            onPress={() => {
                              setPortfolioOpenImageUrl(item.image)
                              setIsPortfolioModalOpen(true)
                            }}
                            key={index} style={{ width: Normalize(95), height: Normalize(100), backgroundColor: Colors.grayf5, marginRight: width * 0.025, borderRadius: 8, overflow: "hidden", borderWidth: 1, borderColor: Colors.boxBorder }}>
                            <Image source={{ uri: ImageLink.portfolio + item.image }} style={{ height: "100%", width: "100%", resizeMode: "cover" }} />
                            {isPortfolioModalOpen && portfolioOpenImageUrl == item.image &&
                              <PortfolioImageModal imageUrl={portfolioOpenImageUrl} item={item} />
                            }
                          </Pressable>
                        )}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                      />

                      {/* <Text style={[globalstyles.plantext_outfit_regular, { color: "#4D4E50", marginVertical: Normalize(5) }]}>Portfolio not added yet</Text> */}

                    </View>}

                  {/* Listings */}
                  {
                    listData.length > 0 &&
                    <View style={styles.borderwithpadding} >
                      <Text
                        style={styles.newBoxTitle}>
                        {strings.MYPROFILE.LISTING}
                      </Text>
                      <FlatList
                        inverted={language == "en" ? false : true}
                        data={listData}
                        style={{}}
                        horizontal={true}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                      />
                    </View>
                  }

                  {/* Transportation */}

                  {
                    (profileData.newGet_around_by).length > 0 &&
                    <View style={styles.borderwithpadding} >
                      <Text style={styles.newBoxTitle}>
                        {strings.MYPROFILE.GETAROUNDBY}
                      </Text>
                      <View style={{ flexDirection: "row", flexWrap: "wrap" }} >
                        {profileData.newGet_around_by.map(
                          (item, index) => (
                            <View
                              key={index}
                              style={styles.smallBox}>
                              <Text  style={styles.smallBoxText}>
                                {item}
                              </Text>
                            </View>
                          ))
                        }
                      </View>
                    </View>}

                  {/* Skills section */}
                  {
                    profileData.get_user_skill.length != 0 &&
                    <View style={styles.borderwithpadding} >
                      <Text style={styles.newBoxTitle}>
                        {strings.MYPROFILE.SKILLS}
                      </Text>
                      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {
                          (profileData.get_user_skill).map(
                            (item, index) =>
                              <View
                                key={index}
                                style={styles.smallBox}>
                                <Text
                                  style={styles.smallBoxText}>
                                  {item.get_skill.skill}
                                </Text>
                              </View>
                          )}
                      </View>
                    </View>}
                  {/* Badges section */}
                  <View style={styles.borderwithpadding} >
                    <Text style={styles.newBoxTitle}>
                      {strings.MYPROFILE.BADGES}
                    </Text>
                    <View style={{ flexDirection: language == "en" ? 'row' : "row-reverse" }}>
                      <View style={[styles.iconStyle, { backgroundColor: Colors.grayf5, borderRadius: Normalize(30), justifyContent: "center", alignItems: "center" }]} >
                        <Image
                          source={{ uri: ImageLink.tier + tierLogo }}
                          style={{ height: "80%", width: "80%", resizeMode: "contain" }}
                          resizeMode="contain"
                        />
                      </View>
                    </View>
                  </View>
                </View>
                {
                  isNoReliabilityModal && <ReliabilityModal />
                }
              </ScrollView>
            </View>
          </SafeAreaView >
      }
    </>
  );
}

export default withRtl(PublicProfile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  smallBox: {
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: Colors.secondaryboxBackground,
    borderWidth: Normalize(0.5),
    borderColor: Colors.secondaryBorder,
    margin: Normalize(4),
    borderRadius: Normalize(5),
  },
  smallBoxText: {
    paddingHorizontal: Normalize(2),
    paddingVertical: Normalize(1),
    fontSize: Normalize(10),
    color: Colors.greyText,
    margin: Normalize(3),
  },

  borderwithpadding: {
    padding: Normalize(8),
    borderRadius: 8,
    marginHorizontal: Normalize(15),
    marginBottom: Normalize(8),
    borderColor: Colors.boxBorder,
    borderWidth: Normalize(1),
    backgroundColor: Colors.white,
  },
  newBoxTitle: {
    fontFamily: fontfmliy.bold,
    color: Colors.greyText,
    fontSize: Normalize(14),
    paddingBottom: Normalize(3)
  },
  h1: {
    fontSize: Normalize(14),
    fontFamily: 'roboto-medium',
    // color: "#38393e",
    color: Colors.primary,
    marginTop: Normalize(1),
  },
  h2: {
    fontSize: Normalize(11),
    fontFamily: 'roboto-regular',
    color: '#636468',
    marginTop: Normalize(5),
  },
  h3: {
    fontSize: Normalize(11),
    fontFamily: 'roboto-regular',
    color: '#636468',
    lineHeight: Normalize(14),
    marginTop: Normalize(2),
  },
  reviewh3: {
    fontSize: 12,
    fontFamily: 'roboto-regular',
    color: '#636468',
    lineHeight: Normalize(14),
    marginTop: Normalize(5),
  },
  h4: {
    fontSize: Normalize(14),
    fontFamily: 'roboto-regular',
    color: Colors.greyText,
    marginVertical: Normalize(2),
  },
  coverPicContainer: {
    width: '100%',
    height: Normalize(150)
  },
  coverPic: {
    width: '100%',
    height: "100%",

  },
  profilePicContainer: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    width: Normalize(96),
    height: Normalize(96),
    borderRadius: Normalize(50),
    position: 'absolute',
    bottom: '-20%',
    alignSelf: 'center',
  },
  avatar: {
    width: Normalize(90),
    height: Normalize(90),
  },
  nameAddContainer: {
    alignItems: 'center',
    marginTop: '14%',
  },
  nameText: {
    fontSize: Normalize(14),
    fontFamily: 'roboto-medium',
    color: Colors.black,
  },
  addressText: {
    fontSize: Normalize(11),
    fontFamily: 'roboto-regular',
    color: Colors.greyText,
    textAlign: "center"
  },
  addressText2: {
    fontSize: Normalize(12),
    marginTop: Normalize(5),
    fontFamily: 'roboto-medium',
    color: Colors.green2,
  },
  customTab: {
    width: '100%',
    height: Normalize(36),
    alignSelf: 'center',
    justifyContent: "space-between"
  },
  tab1Style: {
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Normalize(6),
  },
  tab2Style: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: Normalize(6),
    borderBottomRightRadius: Normalize(6),
  },
  tabText: {
    fontSize: Normalize(11),
    fontFamily: 'roboto-regular',
  },
  reviewText: {
    fontSize: Normalize(11),
    fontFamily: 'roboto-regular',
    color: Colors.grey,
    textAlign: "center",
    width: Normalize(230),
    alignSelf: 'center',
    marginVertical: Normalize(10),
  },
  aboutSection: {
    paddingHorizontal: Normalize(15),
    marginVertical: Normalize(5),
  },
  aboutSection_new: {
    padding: Normalize(10),
    backgroundColor: Colors.white,
    borderRadius: 8,
    elevation: Normalize(2),
    marginBottom: Normalize(10)
  },
  iconStyle: {
    width: Normalize(60),
    height: Normalize(60),
    marginTop: Normalize(10),
  },

  lineStyle: {
    borderWidth: 0.6,
    borderColor: Colors.lightGrey,
    height: 1,
    marginVertical: Normalize(20),

  },
  lineStyle2: {
    borderWidth: 0.2,
    borderColor: Colors.lightGrey,
    height: 1,
    marginVertical: Normalize(1),
  },

  lineStyle22: {
    borderWidth: 0.2,
    borderColor: Colors.lightGrey,
    height: .5,
  },

  reviewView: {
    backgroundColor: '#ffffff',
    marginVertical: Normalize(10),
  },
  h11: {
    fontSize: Normalize(14),
    fontFamily: 'roboto-medium',
    // color: "#38393e",
    color: Colors.primary,
    marginLeft: Normalize(15),
    marginTop: Normalize(15),
  },
  customTab2: {
    width: Normalize(180),
    height: Normalize(35),
    marginLeft: Normalize(15),
    marginTop: Normalize(15),
    justifyContent: 'space-between',

  },
  tab1Style2: {
    // width: '40%',
    paddingHorizontal: "3%",
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 4,
    // backgroundColor:"red"
  },
  tab2Style2: {
    // width: '40%',
    paddingHorizontal: "3%",
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 4,
    // backgroundColor:"blue"

  },

  tabText2: {
    fontSize: Normalize(11),
    fontFamily: 'roboto-bold',
    color: Colors.black
  },
});
