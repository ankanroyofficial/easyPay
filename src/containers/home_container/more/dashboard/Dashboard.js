import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView, RefreshControl } from 'react-native';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import axiosInstance from '../../../../constants/AxiosCallPage';
import LoaderPage from "../../../../components/LoaderPage"
import { Colors } from './../../../../constants/colors';
import images from './../../../../constants/images';
import Normalize from './../../../../helpers/Dimens';
import Header from './../../../../components/Header';
import styles from './Styles';
import strings from './../../../../constants/lng/LocalizedStrings';
import { addCommaAndTranslateInPersian } from '../../../../constants/NumberWithCommaAndInPersian';
import { myContext } from '../../../../constants/ContextApi';
import { ImageLink } from '../../../../constants/LinkPage';
import { leftOrRight, rowOrRowreverse } from '../../../../constants/RowOrRowreverse';
import Toast from 'react-native-simple-toast';
import CurveDesing_Component from '../../../../constants/CurveDesing_Component';
import globalstyles from '../../../../constants/globalStyles/Global_Styles';
import Entypo from 'react-native-vector-icons/Entypo';
function Dashboard({ navigation }) {
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
  const { token, setToken,
    tierData, setTierData,
    userData, setUserData,
    allData, setAllData,
    next_TierData, setNext_TierData,
  } = useContext(myContext)
  const [refreshing, setRefreshing] = React.useState(false);
  const getDashBoardData = async () => {
    try {
      const res = await axiosInstance.post("my-dashboard")
      // console.log(res.data.result)


      if (res.data.result) {
        setAllData(res.data.result)
        var dataTier = res.data.result.tier
        var dataUser = res.data.result.user
        var dataNext_Tier = res.data.result.next_level
        setUserData(dataUser)
        setTierData(dataTier)
        setNext_TierData(dataNext_Tier)
      } else {
        console.log("error in response data")
      }
    } catch (error) {
      console.log("getDashBoardData", error)
    }
  }
  const isDashBoard_load = () => {
    if (userData == "" || tierData == "" || allData === "" || next_TierData == "") {
      getDashBoardData()
    }
    // else {
    //   console.log("not load")
    // }
  }
  useEffect(() => {
    isDashBoard_load()
    return () => {
      isDashBoard_load()
    }
  }, []);
  const findPercentage = (val) => {
    // val = 4.76
    var val2 = parseFloat(val)
    var avgPoint = val2.toFixed(2)
    if (val == null) {
      return "0%"
    } else {
      if (avgPoint >= 0 && avgPoint <= 3) {
        return "0%"
      }
      else if (avgPoint > 3 && avgPoint <= 3.75) {
        return "33.50%"
      } else if (avgPoint > 3.75 && avgPoint <= 4.75) {
        return "66.80%"
      } else if (avgPoint > 4.75) {
        return "100%"
      }
    }
  }
  const amountCalculate = (val) => {
    var finalAmount = 0
    if (val < allData.next_level.earn_target) {
      finalAmount = allData.next_level.earn_target - val
    }
    return addCommaAndTranslateInPersian(finalAmount, language)
  }
  const whichCompletionType = (val) => {
    if (val == "P") {
      return strings.DASHBOARD.POOR
    } else if (val == "O") {
      return strings.DASHBOARD.OKAY
    } else if (val == "G") {
      return strings.DASHBOARD.GOOD
    } else if (val == "E") {
      return strings.DASHBOARD.EXCELLENT
    }
  }
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getDashBoardData()
    Toast.show(strings.ERROR.REFRESHING)
    setRefreshing(false)
  }, [refreshing]);

  return (
    (userData != "" && tierData != "" && allData != "" && next_TierData != "") ?
      <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>
        <View style={styles.container}>
          <Header
            back
            name={strings.DASHBOARD.HEADERTEXT}
            navigation={navigation}
          />
          <CurveDesing_Component  >
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
              showsVerticalScrollIndicator={false}
              style={{ flex: 1, marginHorizontal: Normalize(15) }}>
              {/* card section */}
              <View
                style={[
                  styles.card,
                  language == 'pr'
                    ? { ...RtlStyles.containerRowInverse }
                    : { ...RtlStyles.container },
                ]}>
                {/* icon */}
                <View style={styles.iconContainer}>
                  <Image
                    source={tierData ? { uri: ImageLink.tier + tierData.tier_logo } : images.badge}
                    style={styles.iconStyle}
                    resizeMode="contain"
                  />
                </View>
                {/* body */}
                <View style={styles.bodyContainer}>
                  {
                    tierData.commission_type == "P" ?
                      userData.tax_id == null ?
                        <View style={{ flexDirection: language == "en" ? "row" : "row-reverse" }}>
                          <View style={{ flexDirection: language == "en" ? "row" : "row-reverse" }} >
                            <Text style={[globalstyles.plantext_roboto_regular, {
                              color: "#8c8d97",
                              marginVertical: Normalize(2),
                            }]}>{addCommaAndTranslateInPersian(Math.round(tierData.commission), language)}</Text>
                            <Text style={[globalstyles.plantext_roboto_regular, {
                              color: "#8c8d97",
                              marginVertical: Normalize(2),
                            }]}>%</Text>
                          </View>
                          <Text style={[globalstyles.plantext_roboto_regular, {
                            color: "#8c8d97",
                            marginVertical: Normalize(2),
                          }]}>{strings.DASHBOARD.CARDTEXT1A}</Text>
                        </View>
                        :
                        <Text style={[globalstyles.plantext_roboto_regular, {
                          color: "#8c8d97",
                          marginVertical: Normalize(2),
                        }]}>{addCommaAndTranslateInPersian(Math.round(tierData.commission_with_tax), language) + "%" + " " + strings.DASHBOARD.CARDTEXT1A}</Text>
                      :
                      userData.tax_id == null ?
                        <View style={{ flexDirection: "row" }}>
                          <Text style={[globalstyles.plantext_roboto_regular, {
                            color: "#8c8d97",
                            marginVertical: Normalize(2),
                          }]}>{addCommaAndTranslateInPersian(Math.round(tierData.fix_commission), language)}</Text>
                          <View style={{ justifyContent: "center" }}>
                            <Image
                              source={language == "en" ? images.TomanEng : images.TomanPer}
                              resizeMode="contain"
                              style={{ height: Normalize(12), width: Normalize(12), marginHorizontal: Normalize(2), opacity: .4, }}
                            />
                          </View>
                          {/* <Text style={styles.cardOfferText}>{strings.DASHBOARD.CARDTEXT1A}</Text> */}
                          <Text style={[globalstyles.plantext_roboto_regular, {
                            color: "#8c8d97",
                            marginVertical: Normalize(2),
                          }]}>{"service fee"}</Text>
                        </View>
                        :
                        <View style={{ flexDirection: "row" }}>
                          <Text style={[globalstyles.plantext_roboto_regular, {
                            color: "#8c8d97",
                            marginVertical: Normalize(2),
                          }]}>{addCommaAndTranslateInPersian(Math.round(tierData.fix_commission_with_tax), language)}</Text>
                          <View style={{ justifyContent: "center" }}>
                            <Image
                              source={language == "en" ? images.TomanEng : images.TomanPer}
                              resizeMode="contain"
                              style={{ height: Normalize(12), width: Normalize(12), marginHorizontal: Normalize(2), opacity: .4, }}
                            />
                          </View>
                          {/* <Text style={styles.cardOfferText}>{strings.DASHBOARD.CARDTEXT1A}</Text> */}
                          <Text style={[globalstyles.plantext_roboto_regular, {
                            color: "#8c8d97",
                            marginVertical: Normalize(2),
                          }]}>{"service fee"}</Text>
                        </View>
                  }

                  <Text style={[globalstyles.plantext_roboto_medium, { color: "#5f647f" }]}>
                    {strings.DASHBOARD.CARDTEXT2}
                  </Text>
                </View>
              </View>
              {/* score and rating description */}
              <View style={{ flexDirection: rowOrRowreverse(language), alignItems: "center" }} >
                <Text
                  style={[globalstyles.plantext_Outfit_Medium, { fontSize: Normalize(13), color: "#bfc0c3", }]}>
                  {strings.DASHBOARD.SCOREHEADING}
                </Text>
              </View>
              {/* *****************review progress bar****************  */}
              <View
                style={[
                  styles.ratingHeadingView,
                  language == 'pr'
                    ? { ...RtlStyles.containerRowInverse }
                    : { ...RtlStyles.containerRow },
                ]}>
                <Text style={[globalstyles.plantext_Outfit_Medium, { fontSize: Normalize(12), color: "#38393e", marginVertical: Normalize(1), }]}>
                  {
                    language == "en" ?
                      strings.DASHBOARD.COMPLETIONRATING + " " + "(" + `${strings.DASHBOARD.LAST + " " + addCommaAndTranslateInPersian(Math.round(next_TierData.task_completion_target), language) + " " + strings.DASHBOARD.TASK}` + ")"
                      :
                      `رتبه فعلی شما بر اساس  نظرات و دیدگاه های کارفرمایان :( ${addCommaAndTranslateInPersian(Math.round(next_TierData.task_completion_target), language)} کار آخر)`
                  }
                  {" "}<View style={{
                    height: Normalize(11),
                    width: Normalize(11),
                  }}>
                    <Image
                      source={images.rightgreen}
                      style={{
                        height: "100%",
                        width: "100%",
                        resizeMode: "cover"
                      }}
                    />
                  </View>{" "}
                </Text>
              </View>
              <Text style={[globalstyles.plantext_roboto_regular, { lineHeight: Normalize(15), marginVertical: Normalize(3), textAlign: leftOrRight(language) }]}>
                Kickstart your EazyPay journey and complete your assigned tasks to keep your score high!
              </Text>
              <View style={[styles.indicator, { flexDirection: language == "en" ? "row" : "row-reverse", marginVertical: Normalize(5), }]}>
                <View style={{ backgroundColor: Colors.primary, height: "100%", width: findPercentage(allData.avg_review), justifyContent: "center", alignItems: language == "en" ? "flex-end" : "flex-start", }} >
                  <Text
                    style={[globalstyles.plantext_roboto_medium, {
                      fontSize: Normalize(10),
                      color: Colors.white,
                      paddingHorizontal: Normalize(5)
                    }]}  >
                    {`${addCommaAndTranslateInPersian(allData.avg_review, language)}`}
                  </Text>
                </View>
                <View style={{ height: "100%", width: "100%", position: "absolute", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }} >
                  {[1, 2, 3, 4].map((item, index) => (
                    <View key={index} style={{ height: "100%", width: index == 1 || index == 2 ? Normalize(0.5) : Normalize(0), backgroundColor: Colors.lightGrey }} >
                    </View>
                  ))}
                </View>
              </View>
              <View
                style={[
                  styles.indicatorTexts,
                  language == 'pr'
                    ? { ...RtlStyles.containerRowInverse }
                    : { ...RtlStyles.containerRow },
                ]}>
                <Text style={[globalstyles.plantext_Outfit_Medium, {
                  fontSize: Normalize(13), color: "#bfc0c3",
                  marginBottom: 10, fontSize: Normalize(11)
                }]}>
                  {strings.DASHBOARD.POOR}
                </Text>
                <Text style={[globalstyles.plantext_Outfit_Medium, {
                  fontSize: Normalize(13), color: "#bfc0c3",
                  marginBottom: 10, fontSize: Normalize(11)
                }]}>
                  {strings.DASHBOARD.OKAY}
                </Text>
                <Text style={[globalstyles.plantext_Outfit_Medium, {
                  fontSize: Normalize(13), color: "#bfc0c3",
                  marginBottom: 10, fontSize: Normalize(11)
                }]}>
                  {strings.DASHBOARD.GOOD}
                </Text>
                <Text style={[globalstyles.plantext_Outfit_Medium, {
                  fontSize: Normalize(13), color: "#bfc0c3",
                  marginBottom: 10, fontSize: Normalize(11)
                }]}>
                  {strings.DASHBOARD.EXCELLENT}
                </Text>
              </View>
              {/* *****************amount progress bar****************  */}
              <View
                style={[
                  styles.ratingHeadingView,
                  language == 'pr'
                    ? { ...RtlStyles.containerRowInverse }
                    : { ...RtlStyles.containerRow },
                ]}>
                <Text style={[globalstyles.plantext_Outfit_Medium, { fontSize: Normalize(12), color: "#38393e", marginVertical: Normalize(1), }]}>{strings.DASHBOARD.EARNING} ( {strings.DASHBOARD.LAST + " " + addCommaAndTranslateInPersian(Math.round(next_TierData.task_completion_duration), language) + " " + strings.DASHBOARD.DAYS} )</Text>
              </View>
              {
                parseInt(allData.earn_amt) > parseInt(next_TierData.earn_target) ?
                  language == "en" ?
                    <Text style={[globalstyles.plantext_roboto_regular, { lineHeight: Normalize(15), marginVertical: Normalize(3), textAlign: leftOrRight(language) }]}>Your income has reached the quorum required to upgrade to the {next_TierData.level} tier</Text>
                    :
                    <Text style={[globalstyles.plantext_roboto_regular, { lineHeight: Normalize(15), marginVertical: Normalize(3), textAlign: leftOrRight(language) }]}>درآمد شما به حد نصاب لازم برای ارتقا به طبقه {next_TierData.level_fa} رسیده است</Text>
                  :
                  language == "en" ?
                    <Text style={[globalstyles.plantext_roboto_regular, { lineHeight: Normalize(15), marginVertical: Normalize(3), textAlign: leftOrRight(language) }]}>Your earnings are {strings.BROWSEFILTER.TOMAN} {amountCalculate(Math.round(allData.earn_amt))} away from {next_TierData && language === "en" ? next_TierData.level : next_TierData.level_fa} and lowering service fees.</Text>
                    :
                    <Text style={[globalstyles.plantext_roboto_regular, { lineHeight: Normalize(15), marginVertical: Normalize(3), textAlign: leftOrRight(language) }]}>برای رسیدن به طبقه {next_TierData.level_fa} و هزینه خدمات کمتر درآمد خود را {(amountCalculate(Math.round(allData.earn_amt)))} {strings.BROWSEFILTER.TOMAN} افزایش دهید </Text>
              }
              <View style={[styles.indicator, { flexDirection: language == "en" ? "row" : "row-reverse", marginTop: Normalize(5), alignItems: "center" }]}>
                <View style={{ backgroundColor: Colors.primary, height: "100%", width: `${(allData.earn_percentage).toFixed(2)}%` }} >
                </View>
                <View style={{ height: "100%", width: "100%", position: "absolute", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }} >
                  {[1, 2, 3, 4].map((item, index) => (
                    <View key={index} style={{ height: "100%", width: index == 1 || index == 2 ? Normalize(0.5) : Normalize(0), backgroundColor: Colors.lightGrey }} >
                    </View>
                  ))}
                </View>
                <View style={{ flexDirection: language == "pr" ? "row-reverse" : "row", paddingHorizontal: Normalize(5), position: "absolute", zIndex: 2 }} >
                  <Text
                    style={[globalstyles.plantext_roboto_medium, {
                      fontSize: Normalize(9),
                      color: Colors.greyText,
                    }]} >{strings.BROWSEFILTER.TOMAN} {Math.round(allData.earn_amt)}</Text>
                </View>
              </View>
              <View
                style={[
                  styles.indicatorTexts,
                  language == 'pr'
                    ? { ...RtlStyles.containerRowInverse }
                    : { ...RtlStyles.containerRow },
                ]}>
                <View style={{ flexDirection: language == "pr" ? "row-reverse" : "row" }} >
                  <Text style={[globalstyles.plantext_Outfit_Medium, {
                    color: "#bfc0c3",
                    marginVertical: 10, fontSize: language == "en" ? Normalize(8.2) : Normalize(10)
                  }]}>
                    {strings.BROWSEFILTER.TOMAN} {addCommaAndTranslateInPersian(Math.round(0), language)}
                  </Text>
                </View>
                <View style={{ flexDirection: language == "pr" ? "row-reverse" : "row" }} >
                  <Text style={[globalstyles.plantext_Outfit_Medium, {
                    color: "#bfc0c3",
                    marginVertical: 10, fontSize: language == "en" ? Normalize(8.2) : Normalize(10)
                  }]}>
                    {strings.BROWSEFILTER.TOMAN} {addCommaAndTranslateInPersian(Math.round(allData.tiers[1].earn_target), language)}
                  </Text>
                </View>
                <View style={{ flexDirection: language == "pr" ? "row-reverse" : "row" }} >
                  <Text style={[globalstyles.plantext_Outfit_Medium, {
                    color: "#bfc0c3",
                    marginVertical: 10, fontSize: language == "en" ? Normalize(8.2) : Normalize(10)
                  }]}>
                    {strings.BROWSEFILTER.TOMAN} {addCommaAndTranslateInPersian(Math.round(allData.tiers[2].earn_target), language)}
                  </Text>
                </View>
                <View style={{ flexDirection: language == "pr" ? "row-reverse" : "row" }} >
                  <Text style={[globalstyles.plantext_Outfit_Medium, {
                    color: "#bfc0c3",
                    marginVertical: 10, fontSize: language == "en" ? Normalize(8.2) : Normalize(10)
                  }]}>
                    {strings.BROWSEFILTER.TOMAN} {addCommaAndTranslateInPersian(Math.round(allData.tiers[3].earn_target), language)}
                  </Text>
                </View>

              </View>
              <View
                style={[
                  styles.rowView,
                  language == 'pr'
                    ? { ...RtlStyles.containerRowInverse }
                    : { ...RtlStyles.containerRow },
                ]}>


                <Entypo
                  name="info-with-circle"
                  size={Normalize(12)}
                  color={Colors.primary}
                />
                <TouchableOpacity onPress={() => { navigation.navigate("HowDoScores") }} >
                  <Text style={[globalstyles.plantext_Outfit_Medium, {
                    fontSize: Normalize(13),
                    color: Colors.primary,
                    marginHorizontal: Normalize(5),
                    marginVertical: Normalize(8),
                  }]}>{strings.DASHBOARD.QUESTEXT}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.lineStyle} />
              <Text style={[globalstyles.plantext_Outfit_Medium, {
                fontSize: Normalize(13), color: "#bfc0c3",
                marginBottom: 10, textAlign: leftOrRight(language), letterSpacing: 1
              }]}>{strings.DASHBOARD.BENEFITHEADING}</Text>
              <View
                style={[
                  styles.rowView,
                  language == 'pr'
                    ? { ...RtlStyles.containerRowInverse }
                    : { ...RtlStyles.containerRow },
                ]}>

                <Image
                  source={images.dollar}
                  resizeMode="contain"
                  style={{ height: Normalize(25), width: Normalize(25), marginHorizontal: Normalize(2), resizeMode: "contain" }}
                />
                <View style={styles.benifitDescView}>
                  <Text style={[globalstyles.plantext_roboto_regular, {
                    fontSize: Normalize(13), color: Colors.greyText,
                    marginVertical: Normalize(1), lineHeight: Normalize(17)
                  }]}>{strings.DASHBOARD.BENEFITTEXT1}</Text>
                  {
                    tierData.commission_type == "P" ?
                      userData.tax_id == null ?
                        <Text style={[globalstyles.plantext_roboto_regular, {
                          fontSize: Normalize(11),
                          color: '#636468', lineHeight: Normalize(14),
                        }]}>{strings.DASHBOARD.BENEFITTEXT2A + " " + addCommaAndTranslateInPersian(Math.round(next_TierData.commission), language) + "%"}</Text>
                        :
                        <Text style={[globalstyles.plantext_roboto_regular, {
                          fontSize: Normalize(11),
                          color: '#636468', lineHeight: Normalize(14),
                        }]}>{strings.DASHBOARD.BENEFITTEXT2A + " " + addCommaAndTranslateInPersian(Math.round(next_TierData.commission_with_tax), language) + "%"}</Text>
                      :
                      userData.tax_id == null ?
                        <View style={{ flexDirection: "row" }}>
                          {
                            language === "en" ?
                              <>
                                <Text style={[globalstyles.plantext_roboto_regular, {
                                  fontSize: Normalize(11),
                                  color: '#636468', lineHeight: Normalize(14),
                                }]}>{strings.DASHBOARD.BENEFITTEXT2A} </Text>
                                <Text style={[globalstyles.plantext_roboto_regular, {
                                  fontSize: Normalize(11),
                                  color: '#636468', lineHeight: Normalize(14),
                                }]}> {addCommaAndTranslateInPersian(Math.round(next_TierData.fix_commission), language)}</Text>
                              </>
                              :
                              <Text style={[globalstyles.plantext_roboto_regular, {
                                fontSize: Normalize(11),
                                color: '#636468', lineHeight: Normalize(14),
                              }]}>برای هزینه های خدمات کمتر به طبقه نقره برسید</Text>
                          }
                          <View style={{ justifyContent: "center" }}>
                            <Image
                              source={language == "en" ? images.TomanEng : images.TomanPer}
                              resizeMode="contain"
                              style={{ height: Normalize(12), width: Normalize(12), marginHorizontal: Normalize(2), opacity: .4, }}
                            />
                          </View>
                        </View>
                        :
                        <View style={{ flexDirection: "row" }}>
                          {
                            language === "en" ?
                              <>
                                <Text style={[globalstyles.plantext_roboto_regular, {
                                  fontSize: Normalize(11),
                                  color: '#636468', lineHeight: Normalize(14),
                                }]}>{strings.DASHBOARD.BENEFITTEXT2A} </Text>
                                <Text style={[globalstyles.plantext_roboto_regular, {
                                  fontSize: Normalize(11),
                                  color: '#636468', lineHeight: Normalize(14),
                                }]}> {addCommaAndTranslateInPersian(Math.round(next_TierData.fix_commission_with_tax), language)}</Text>
                              </>
                              :
                              <Text style={[globalstyles.plantext_roboto_regular, {
                                fontSize: Normalize(11),
                                color: '#636468', lineHeight: Normalize(14),
                              }]}>برای هزینه های خدمات کمتر به طبقه نقره برسید</Text>
                          }
                          <View style={{ justifyContent: "center" }}>
                            <Image
                              source={language == "en" ? images.TomanEng : images.TomanPer}
                              resizeMode="contain"
                              style={{ height: Normalize(12), width: Normalize(12), marginHorizontal: Normalize(2), opacity: .4, }}
                            />
                          </View>
                        </View>
                  }
                </View>
              </View>
              <View style={{ height: 40 }} />
            </ScrollView>
          </CurveDesing_Component>
        </View>
      </SafeAreaView> :
      <LoaderPage />
  );
}

export default withRtl(Dashboard);
