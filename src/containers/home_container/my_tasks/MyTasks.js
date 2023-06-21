import React, { useContext, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity, FlatList, RefreshControl, Modal, Pressable, ScrollView, Dimensions } from 'react-native';
import styles from './Styles';
import { withRtl, useRtlContext } from 'react-native-easy-localization-and-rtl';
import Header from '../../../components/Header';
import CustomTab from '../../../components/CustomTab';
import images from '../../../constants/images';
import strings from '../../../constants/lng/LocalizedStrings';
import Normalize from "./../../../helpers/Dimens"
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage"
import moment from 'moment';
import { axiosUrl, ImageLink } from '../../../constants/LinkPage';
import { myContext } from '../../../constants/ContextApi';
import axiosInstance from '../../../constants/AxiosCallPage';
import Button from '../../../components/Button';
import { Colors } from '../../../constants/colors';
import Toast from 'react-native-simple-toast';
import CurveDesing_Component from '../../../constants/CurveDesing_Component';
import globalstyles from '../../../constants/globalStyles/Global_Styles';
import LoaderPage from '../../../components/LoaderPage';
import Pusher from 'pusher-js';
import { LogBox } from 'react-native';
import pusherConfig from '../../../../pusher.json';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fontfmliy } from '../../../components/WhichFontFamily';
import NewLoaderPage from '../../../components/NewLoaderPage';
import { numberWithCommas } from '../../../constants/NumberWithComma';
const { height, width } = Dimensions.get("window")

function MyTasks({ navigation }) {
  const { RtlStyles, isRtl, language, setLanguage } = useRtlContext();
  const {
    whichSection, setWhichSection,
    whichSection2, setWhichSection2,
    allNewMyTask, setAllNewMyTask,
    isMyTaskLoad, setIsMyTaskLoad,
    setIsDefaultMytask_asposter,
    setIsDefaultMytask_astasker, setTaskdetailsData,
    setNewOfferPageMessageArry, setNewOfferPageMessageWithTaskerArry,
    setRecent_notification_count,
    userId
  } = useContext(myContext)
  LogBox.ignoreLogs(['Setting a timer for a long period of time'])
  const [activeTab, setActiveTab] = useState('asTasker');
  const [loader, setLoader] = useState(false)
  const handleTabChange = val => {
    setActiveTab(val);
  };
  const getstatus = val => {
    var stat = "";
    if (val == 1) {
      stat = strings.BROWSEFILTER.DRAFT
    } else if (val == 2) {
      stat = strings.BROWSEFILTER.OPEN
    } else if (val == 3) {
      stat = strings.BROWSEFILTER.ASSIGNED
    } else if (val == 4) {
      stat = strings.BROWSEFILTER.COMPLETED
    } else if (val == 5) {
      stat = strings.BROWSEFILTER.COMPLETED
    } else if (val == 6 || val == 8) {
      stat = strings.BROWSEFILTER.CANCELLED
    }
    return stat;
  };
  const englishDate = (val) => {
    // let m = moment(val, "YYYY-MM-DD hh:mm:ss").format('ddd D MMM hh:mm A');
    let m = moment(val, "YYYY-MM-DD hh:mm:ss").format('ddd Do MMM,YYYY');
    return m;
  }
  const isLoad = async () => {
    try {
      const isMyTaskloader = await AsyncStorage.getItem("isMyTaskloader")

      // console.log(isMyTaskloader)

      if (isMyTaskloader == "true") {
        getMyTaskData_withoutLoad()
        await AsyncStorage.setItem("isMyTaskloader", "false")
      }
    } catch (error) {
      console.log("isLoad", error)
    }
  }
  useEffect(() => {
    isLoad()
    const willFocusSubscription = navigation.addListener('focus', () => {
      isLoad()
    });
    return willFocusSubscription;
  }, []);
  const isGetMyTaskData_Load = () => {
    if (!isMyTaskLoad) {
      getMyTaskData()
    }
  }
  useEffect(() => {
    isGetMyTaskData_Load()
  }, [])
  const whichText = (val) => {

    if (val.section == "Offer&Question" && val.tab == "poster") {
      return "You have't made any offers yet 💡"
    } else if (val.section == "ActiveTasks" && val.tab == "poster") {
      return "No active tasks ⚡"
    } else if (val.section == "Completed" && val.tab == "poster") {
      return "No completed tasks yet 💵"
    } else if (val.section == "Posted" && val.tab == "tasker") {
      return "No posted task ads yet ☁️"
    } else if (val.section == "Booked" && val.tab == "tasker") {
      return "No active tasks ⚡"
    } else if (val.section == "Completed" && val.tab == "tasker") {
      return "No completed tasks yet ⭐"
    } else {
      return "App Error";
    }
  }
  const testmytask = async () => {
    try {
      let data = await axiosInstance.post("new-my-task")
      console.log("....>>>>>....", data.data.as_a_client)
    } catch (error) {
      console.log("testmytask", error)
    }
  }

  // useEffect(() => {
  //   testmytask()
  // }, [])

  const getMyTaskData = async () => {
    try {
      setLoader(true)
      const data = await axiosInstance.post("new-my-task")
      // console.log(data.data.as_a_client.post_task)
      if (data.data.as_a_client && data.data.as_a_eazypayer) {
        setIsMyTaskLoad(true)
        setAllNewMyTask({
          as_a_eazypayer: {
            "active_task": data.data.as_a_eazypayer.active_task,
            "complete_task": data.data.as_a_eazypayer.complete_task,
            "offers_or_questions": data.data.as_a_eazypayer.offers_or_questions
          },
          as_a_client: {
            "booked": data.data.as_a_client.booked,
            "completed": data.data.as_a_client.completed,
            "post_task": [...data.data.as_a_client.post_task, ...data.data.as_a_client.cancelled_task]
          }
        })
        setLoader(false)
      }
    } catch (error) {
      setLoader(false)
      console.log("getMyTaskData", error)
    }
  }
  const getMyTaskData_withoutLoad = async () => {
    try {
      const data = await axiosInstance.post("new-my-task")
      // console.log("getMyTaskData_withoutLoad>>",data.data)
      if (data.data.as_a_client && data.data.as_a_eazypayer) {
        setAllNewMyTask({
          as_a_eazypayer: {
            "active_task": data.data.as_a_eazypayer.active_task,
            "complete_task": data.data.as_a_eazypayer.complete_task,
            "offers_or_questions": data.data.as_a_eazypayer.offers_or_questions
          },
          as_a_client: {
            "booked": data.data.as_a_client.booked,
            "completed": data.data.as_a_client.completed,
            "post_task": [...data.data.as_a_client.post_task, ...data.data.as_a_client.cancelled_task]
          }
        })
      }
    } catch (error) {
      console.log("getMyTaskData_withoutLoad", error)
    }
  }
  const whichArry = (val) => {
    try {
      if (val.section == "Offer&Question" && val.tab == "poster") {
        return allNewMyTask.as_a_eazypayer.offers_or_questions
      } else if (val.section == "ActiveTasks" && val.tab == "poster") {
        return allNewMyTask.as_a_eazypayer.active_task
      } else if (val.section == "Completed" && val.tab == "poster") {
        return allNewMyTask.as_a_eazypayer.complete_task
      } else if (val.section == "Posted" && val.tab == "tasker") {
        return allNewMyTask.as_a_client.post_task
      } else if (val.section == "Booked" && val.tab == "tasker") {
        return allNewMyTask.as_a_client.booked
      } else if (val.section == "Completed" && val.tab == "tasker") {
        return allNewMyTask.as_a_client.completed
      } else {
        return "App Error";
      }
    } catch (error) {
      console.log("whichArry", error)
    }
  }

  const gototaskdetails = async (val) => {
    try {
      const res = {
        "jsonrpc": "2.0",
        "params": {
          "slug": val
        }
      }
      const data = await axiosInstance.post("get-task-details", res)

      // console.log(data.data)

      if (data.data.result) {
        let a = data.data.result;
        let oldTaskdata = data.data.result.task;

        oldTaskdata.lowest_offers = a.lowest_offers;
        oldTaskdata.highest_offers = a.highest_offers;
        oldTaskdata.nearbyfixeroffer = a.nearbyfixeroffer;
        oldTaskdata.recommended_fixer_sort_based_on_rating = a.recommended_fixer_sort_based_on_rating

        // console.log(oldTaskdata)



        setTaskdetailsData(oldTaskdata)
        
        setNewOfferPageMessageArry([])
        setNewOfferPageMessageWithTaskerArry([])
        navigation.navigate('TaskDetails', { show: oldTaskdata })
      }
    } catch (error) {
      console.log("getData_taskdetails---------- mytask ", error)
    }
  }

  const MytaskCard_AsaEazyPayer = ({ item }) => {
    return (
      <Pressable
        onPress={() => {
          gototaskdetails(item.slug)
        }}
        style={{ flex: 1, flexDirection: "row", paddingRight: Normalize(1) }} >
        <View style={{ width: Normalize(34), height: "100%", }} ></View>
        <View style={{ flex: 1, borderRadius: Normalize(10), borderWidth: 1, borderColor: Colors.boxBorder, paddingLeft: Normalize(38) }} >
          <View style={{ flex: 1, paddingVertical: Normalize(13), justifyContent: "space-between", paddingRight: Normalize(10) }} >
            {/* title */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} >
              <Text numberOfLines={1} style={[globalstyles.plantext_bold, { fontSize: width * 0.038, color: Colors.primary, width: width * 0.35 }]} >{item.title}</Text>
              <Text style={[globalstyles.plantext_regular, { fontSize: width * 0.035, color: Colors.secondary }]} >Payment Done</Text>
            </View>
            {/* location */}
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} >
              <View style={{ flexDirection: "row", alignItems: "center" }} >
                <Entypo
                  name="calendar"
                  color={Colors.grey}
                  size={Normalize(12)} />
                <Text numberOfLines={1} style={[globalstyles.plantext_regular, { fontSize: Normalize(11.5), color: Colors.grey, paddingLeft: Normalize(3) }]} >{item.date_type == "O" ? englishDate((item.date)) : "As soon as possible"}</Text>
              </View>
              {
                item.budget <= 0 ?
                  <Text style={[globalstyles.plantext_roboto_medium, { color: Colors.green_new_2, textAlign: "center", fontSize: width * 0.032 }]}>Open offer</Text>
                  :
                  <Text style={[globalstyles.plantext_bold, { fontSize: width * 0.04, color: Colors.secondary }]} >
                    {strings.BROWSEFILTER.TOMAN} {numberWithCommas(item.budget)}</Text>
              }
            </View>
            {/* category */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} >
              <View style={{ flexDirection: "row", alignItems: "center" }} >
                <View style={{ height: Normalize(13), width: Normalize(13) }} >
                  <Image source={{ uri: ImageLink.homeCategory + `${(item.get_category.black_image != null) ? item.get_category.black_image : item.get_category.image}` }} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                </View>
                <Text style={[globalstyles.plantext_bold, { fontSize: Normalize(10.5), color: Colors.grey, paddingLeft: Normalize(3) }]} >{item.get_category.name}</Text>
              </View>
              <Text style={[globalstyles.plantext_bold, { fontSize: width * 0.033, color: Colors.secondary }]} >Task Price</Text>
            </View>
          </View>
        </View>
        <View style={{ width: Normalize(56), height: Normalize(56), borderRadius: Normalize(56) / 2, backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.disableText, position: "absolute", left: 0, top: Normalize(12), justifyContent: "center", alignItems: "center" }} >
          <AntDesign
            name={"user"}
            color={Colors.secondary}
            size={Normalize(23)} />
        </View>
      </Pressable>
    )
  }
  const MytaskCardFor_AsaClient = ({ item }) => {
    return (
      <Pressable
        onPress={() => gototaskdetails(item.slug)}
        style={{ flex: 1, flexDirection: "row", paddingRight: Normalize(1) }} >
        <View style={{ width: Normalize(34), height: "100%", }} ></View>
        <View style={{ flex: 1, borderRadius: Normalize(10), borderWidth: 1, borderColor: Colors.boxBorder, paddingLeft: Normalize(38) }} >
          <View style={{ flex: 1, paddingVertical: Normalize(13), justifyContent: "space-between", paddingRight: Normalize(10) }} >

            {/* title */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} >
              <Text numberOfLines={1} style={[globalstyles.plantext_bold, { fontSize: Normalize(12), color: Colors.primary, width: "68%" }]} >{item.title}</Text>
              <Text style={[globalstyles.plantext_bold, { fontSize: Normalize(11), color: Colors.secondary }]} >{getstatus(item.status)}</Text>
            </View>
            {/* location */}
            <View style={{ flexDirection: "row", alignItems: "center" }} >
              <Entypo
                name="calendar"
                color={Colors.grey}
                size={Normalize(12)} />
              <Text numberOfLines={1} style={[globalstyles.plantext_regular, { fontSize: Normalize(11.5), color: Colors.grey, paddingLeft: Normalize(3) }]} >{item.date_type == "O" ? englishDate((item.date)) : "As soon as possible"}</Text>
            </View>
            {/* category */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} >
              <View style={{ flexDirection: "row", alignItems: "center" }} >
                <View style={{ height: Normalize(13), width: Normalize(13) }} >
                  <Image source={{ uri: ImageLink.homeCategory + `${(item.get_category.black_image != null) ? item.get_category.black_image : item.get_category.image}` }} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
                </View>
                <Text style={[globalstyles.plantext_bold, { fontSize: Normalize(10.5), color: Colors.grey, paddingLeft: Normalize(3) }]} >{item.get_category.name}</Text>
              </View>
            </View>
          </View>

        </View>
        <View style={{ width: Normalize(56), height: Normalize(56), borderRadius: Normalize(56) / 2, backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.disableText, position: "absolute", left: 0, top: Normalize(12), justifyContent: "center", alignItems: "center" }} >

          <Image
            resizeMode="cover"
            source={images.logo_secondary}
            style={{
              width: "45%",
              height: "45%",
              resizeMode: "contain"
            }}
          />

        </View>
      </Pressable>
    )
  }
  const TaskScreen = ({ res }) => {
    return (
      <View style={{ flex: 1, marginBottom: Normalize(7) }} >
        {
          whichArry(res).length == 0 ?
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
              <Text style={{ fontSize: Normalize(14), fontFamily: fontfmliy.regular, color: Colors.grey }} >{whichText(res)}</Text>
            </View>
            :
            <FlatList
              showsVerticalScrollIndicator={false}
              data={whichArry(res)}
              renderItem={({ item, index }) => {
                return (
                  <View key={index} style={{ height: Normalize(80), width: "100%", marginBottom: index + 1 == whichArry(res).length ? 0 : Normalize(7) }} >
                    {
                      activeTab == "asPoster" ?
                        <MytaskCard_AsaEazyPayer item={item} />
                        :
                        <MytaskCardFor_AsaClient item={item} />
                    }


                  </View>
                )
              }}
            />
        }
      </View>
    )
  }
  const getAllData_viaPusher = () => {
    const pusher = new Pusher(pusherConfig.key, pusherConfig);
    let channel = pusher.subscribe("eazypay-development");
    channel.bind('task-assign-event', function (data) {
      if (data) {
        // console.log("My task assign ---------------")
        getMyTaskData_withoutLoad()
      }
    })
    channel.bind('post-task', function (data) {
      if (data) {
        // console.log("My task ---------------")
        getMyTaskData_withoutLoad()
      }
    })
    channel.bind('bid-apply-event', function (data) {
      if (data) {
        // console.log("My bid ---------------")
        getMyTaskData_withoutLoad()
      }
    })
    channel.bind('bid-withdraw-event', function (data) {
      if (data) {
        // console.log("My withdraw---------------")
        getMyTaskData_withoutLoad()
      }
    })
  }
  useEffect(() => {
    getAllData_viaPusher()
  }, [])
  return (
    <SafeAreaView style={{ backgroundColor: Colors.primary, flex: 1, flexDirection: 'column' }}>
      <View style={styles.container}>
        <Header
          isDrawer
          name={strings.MYTASKSCREEN.HEADERTEXT} />

        <View style={{ flex: 1, paddingHorizontal: Normalize(16), marginBottom: Normalize(62) }} >
          <CustomTab onChangeTab={handleTabChange} language={language} />
          {
            activeTab == "asPoster" ?
              <View style={{ flex: 1 }} >
                {/* as a eazypayer */}
                <TouchableOpacity
                  onPress={() => {
                    if (whichSection2.tab == "poster" && whichSection2.section == "Offer&Question" && whichSection2.active) {
                      setWhichSection2({
                        tab: "poster",
                        section: "Offer&Question",
                        active: false
                      })
                      setIsDefaultMytask_asposter(true)
                    } else {
                      setWhichSection2({
                        tab: "poster",
                        section: "Offer&Question",
                        active: true
                      })
                      setIsDefaultMytask_asposter(true)
                    }
                  }}
                  style={{
                    width: '100%',
                    alignSelf: 'center',
                    borderRadius: Normalize(6),
                    height: Normalize(42),
                    flexDirection: "row",
                    backgroundColor: Colors.primary,
                    overflow: "hidden",
                    marginBottom: Normalize(7)
                  }}>
                  <View style={{ flex: 8, justifyContent: "center", paddingLeft: Normalize(10) }} >
                    <Text style={[globalstyles.plantext_roboto_regular, { fontSize: Normalize(13), color: Colors.white }]} >Offers/Questions</Text>
                  </View>
                  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                    <Entypo
                      name={(whichSection2.section == "Offer&Question" && whichSection2.tab == "poster" && whichSection2.active) ? "chevron-small-up" : "chevron-small-down"}
                      color={Colors.white} size={Normalize(20)} />
                  </View>
                </TouchableOpacity>
                {
                  (whichSection2.section == "Offer&Question" && whichSection2.tab == "poster" && whichSection2.active) &&
                  <TaskScreen res={{ section: "Offer&Question", tab: "poster" }} />
                }
                <TouchableOpacity
                  onPress={() => {
                    if (whichSection2.tab == "poster" && whichSection2.section == "ActiveTasks" && whichSection2.active) {
                      setWhichSection2({
                        tab: "poster",
                        section: "ActiveTasks",
                        active: false
                      })
                      setIsDefaultMytask_asposter(true)
                    } else {
                      setWhichSection2({
                        tab: "poster",
                        section: "ActiveTasks",
                        active: true
                      })
                      setIsDefaultMytask_asposter(true)
                    }

                  }}
                  style={{
                    width: '100%',
                    alignSelf: 'center',
                    borderRadius: Normalize(6),
                    height: Normalize(42),
                    flexDirection: "row",
                    backgroundColor: Colors.primary,
                    overflow: "hidden",
                    marginBottom: Normalize(7)
                  }}>
                  <View style={{ flex: 8, justifyContent: "center", paddingLeft: Normalize(10) }} >
                    <Text style={[globalstyles.plantext_roboto_regular, { fontSize: Normalize(13), color: Colors.white }]} >Active Tasks</Text>
                  </View>
                  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                    <Entypo name={(whichSection2.section == "ActiveTasks" && whichSection2.tab == "poster" && whichSection2.active) ? "chevron-small-up" : "chevron-small-down"} color={Colors.white} size={Normalize(20)} />
                  </View>
                </TouchableOpacity>
                {
                  (whichSection2.section == "ActiveTasks" && whichSection2.tab == "poster" && whichSection2.active) &&
                  <TaskScreen res={{ section: "ActiveTasks", tab: "poster" }} />
                }
                <TouchableOpacity
                  onPress={() => {
                    if (whichSection2.tab == "poster" && whichSection2.section == "Completed" && whichSection2.active) {
                      setWhichSection2({
                        tab: "poster",
                        section: "Completed",
                        active: false
                      })
                      setIsDefaultMytask_asposter(true)
                    } else {
                      setWhichSection2({
                        tab: "poster",
                        section: "Completed",
                        active: true
                      })
                      setIsDefaultMytask_asposter(true)
                    }
                  }}
                  style={{
                    width: '100%',
                    alignSelf: 'center',
                    borderRadius: Normalize(6),
                    height: Normalize(42),
                    flexDirection: "row",
                    backgroundColor: Colors.primary,
                    overflow: "hidden",
                    marginBottom: Normalize(7)
                  }}>
                  <View style={{ flex: 8, justifyContent: "center", paddingLeft: Normalize(10) }} >
                    <Text style={[globalstyles.plantext_roboto_regular, { fontSize: Normalize(13), color: Colors.white }]} >Completed</Text>
                  </View>
                  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                    <Entypo
                      name={(whichSection2.section == "Completed" && whichSection2.tab == "poster" && whichSection2.active) ? "chevron-small-up" : "chevron-small-down"}
                      color={Colors.white} size={Normalize(20)} />
                  </View>
                </TouchableOpacity>
                {
                  (whichSection2.section == "Completed" && whichSection2.tab == "poster" && whichSection2.active) &&
                  <TaskScreen res={{ section: "Completed", tab: "poster" }} />
                }
              </View>
              :
              <View style={{ flex: 1 }} >
                {/* as a Client */}
                <TouchableOpacity
                  onPress={() => {
                    if (whichSection.tab == "tasker" && whichSection.section == "Posted" && whichSection.active) {
                      setWhichSection({
                        tab: "tasker",
                        section: "Posted",
                        active: false
                      })
                      setIsDefaultMytask_astasker(true)
                    } else {
                      setWhichSection({
                        tab: "tasker",
                        section: "Posted",
                        active: true
                      })
                      setIsDefaultMytask_astasker(true)
                    }
                  }}
                  style={{
                    width: '100%',
                    alignSelf: 'center',
                    borderRadius: Normalize(6),
                    height: Normalize(42),
                    flexDirection: "row",
                    backgroundColor: Colors.primary,
                    overflow: "hidden",
                    marginBottom: Normalize(7)
                  }}>
                  <View style={{ flex: 8, justifyContent: "center", paddingLeft: Normalize(10) }} >
                    <Text style={[globalstyles.plantext_roboto_regular, { fontSize: Normalize(13), color: Colors.white }]} >Posted Ads</Text>
                  </View>
                  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                    <Entypo
                      name={(whichSection.section == "Posted" && whichSection.tab == "tasker" && whichSection.active) ? "chevron-small-up" : "chevron-small-down"}
                      color={Colors.white} size={Normalize(20)} />
                  </View>
                </TouchableOpacity>
                {
                  (whichSection.section == "Posted" && whichSection.tab == "tasker" && whichSection.active) &&
                  <TaskScreen res={{ section: "Posted", tab: "tasker" }} />
                }
                <TouchableOpacity
                  onPress={() => {
                    if (whichSection.tab == "tasker" && whichSection.section == "Booked" && whichSection.active) {
                      setWhichSection({
                        tab: "tasker",
                        section: "Booked",
                        active: false
                      })
                      setIsDefaultMytask_astasker(true)
                    } else {
                      setWhichSection({
                        tab: "tasker",
                        section: "Booked",
                        active: true
                      })
                      setIsDefaultMytask_astasker(true)
                    }
                  }}
                  style={{
                    width: '100%',
                    alignSelf: 'center',
                    borderRadius: Normalize(6),
                    height: Normalize(42),
                    flexDirection: "row",
                    backgroundColor: Colors.primary,
                    overflow: "hidden",
                    marginBottom: Normalize(7)
                  }}>
                  <View style={{ flex: 8, justifyContent: "center", paddingLeft: Normalize(10) }} >
                    <Text style={[globalstyles.plantext_roboto_regular, { fontSize: Normalize(13), color: Colors.white }]} >Booked</Text>
                  </View>
                  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                    <Entypo
                      name={(whichSection.section == "Booked" && whichSection.tab == "tasker" && whichSection.active) ? "chevron-small-up" : "chevron-small-down"}
                      color={Colors.white} size={Normalize(20)} />
                  </View>
                </TouchableOpacity>
                {
                  (whichSection.section == "Booked" && whichSection.tab == "tasker" && whichSection.active) &&
                  <TaskScreen res={{ section: "Booked", tab: "tasker" }} />
                }
                <TouchableOpacity
                  onPress={() => {
                    if (whichSection.tab == "tasker" && whichSection.section == "Completed" && whichSection.active) {
                      setWhichSection({
                        tab: "tasker",
                        section: "Completed",
                        active: false
                      })
                      setIsDefaultMytask_astasker(true)
                    } else {
                      setWhichSection({
                        tab: "tasker",
                        section: "Completed",
                        active: true
                      })
                      setIsDefaultMytask_astasker(true)
                    }
                  }}
                  style={{
                    width: '100%',
                    alignSelf: 'center',
                    borderRadius: Normalize(6),
                    height: Normalize(42),
                    flexDirection: "row",
                    backgroundColor: Colors.primary,
                    overflow: "hidden",
                    marginBottom: Normalize(7)
                  }}>
                  <View style={{ flex: 8, justifyContent: "center", paddingLeft: Normalize(10) }} >
                    <Text style={[globalstyles.plantext_roboto_regular, { fontSize: Normalize(13), color: Colors.white }]} >Completed</Text>
                  </View>
                  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                    <Entypo
                      name={(whichSection.section == "Completed" && whichSection.tab == "tasker" && whichSection.active) ? "chevron-small-up" : "chevron-small-down"}
                      color={Colors.white} size={Normalize(20)} />
                  </View>
                </TouchableOpacity>
                {
                  (whichSection.section == "Completed" && whichSection.tab == "tasker" && whichSection.active) &&
                  <TaskScreen res={{ section: "Completed", tab: "tasker" }} />
                }
              </View>
          }
          {loader &&
            <NewLoaderPage />}
        </View>
      </View>
    </SafeAreaView>
  );
}
export default withRtl(MyTasks);